import React, { useLayoutEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import otText from 'ot-text'
import ShareDB from 'sharedb/lib/client'
import io from 'socket.io-client'

import { setCmInstance } from '../../actions/editor'
import { baseApiUrl } from '../../config/constants'

import { default as PagedownConverter } from '../../vendor/Markdown.Converter'
import { default as PagedownEditor } from '../../vendor/Markdown.Editor'

import CodeMirror from 'codemirror'
//import 'codemirror/mode/gfm/gfm'
import '../../vendor/modifiedGfm'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/clike/clike'
import '../../static/css/CodeMirrorStyle.css'

const FakeButtonsElement = styled.div`
	display: none;
`

const UserList = styled.ul`
	list-style: none;
	margin: 0;
	& li {
		margin: 2px;
		color: white;
		float: right;
		text-align: center;
		line-height: 25px;
		img {
			width: 25px;
			height: 25px;
			border-radius: 50%;
		}
	}
`

const Editor = ({ user, setCmInstance, match, history }) => {
	const editorRef = useRef()
	const userListRef = useRef()

	const currentFile =
		match.params.nameHash === '404'
			? { nameHash: 404, name: '404' }
			: [...user.ownFiles, ...user.secondFiles].find(file => file.nameHash === match.params.nameHash) || {}

	useLayoutEffect(
		() => {
			if (user.ownFiles.length && match.params.nameHash && !currentFile.nameHash) history.push('/404')
		},
		[user, match.params.nameHash, currentFile]
	)

	useLayoutEffect(
		() => {
			const pagedownConverter = new PagedownConverter.Converter()
			const pagedownEditor = new PagedownEditor.Editor(pagedownConverter)
			const codeMirror = CodeMirror.fromTextArea(editorRef.current, {
				value: '',
				mode: {
					name: 'markdown',
					highlightFormatting: true,
					maxBlockquoteDepth: 3,
					fencedCodeBlockHighlighting: true,
				},
				shared: true,
				lineWrapping: true,
			})
			pagedownEditor.run(codeMirror)
			const doClick = name =>
				pagedownEditor.uiManager.buttons[name] && pagedownEditor.uiManager.buttons[name].onclick()
			setCmInstance({ codeMirror, doClick })

			if (match.params.nameHash === '404')
				codeMirror.setValue(`Don't panic
=========
### Page not found

Looks like you have opened a wrong url or the file no longer exists

If not, we're probably already working on resolving the issue`)

			if (!currentFile.nameHash || match.params.nameHash === '404') return codeMirror.toTextArea

			let stopWatch = false

			ShareDB.types.register(otText.type)

			const sharews = new WebSocket(`ws://${baseApiUrl.replace(/(:5000)?$/, ':5000')}`)
			const shareconn = new ShareDB.Connection(sharews)
			const sharedoc = shareconn.get('docs', currentFile.nameHash)
			/*
            sharedoc.fetch(function(err) {
                if (err) throw err
                console.log('asdf', sharedoc.type)
                if (sharedoc.type === null) {
                    sharedoc.create('', 'text')
                }
            })
            */
			codeMirror.on('change', (ed, chg) => {
				if (stopWatch) return

				const stindex = ed.indexFromPos(chg.from)
				const delta = chg.removed.join('\n').length
				const addedText = chg.text.join('\n')

				try {
					if (delta) sharedoc.submitOp([stindex, { d: delta }])
					if (addedText) sharedoc.submitOp([stindex, addedText])
				} catch (err) {
					history.push('/404')
				}
			})

			codeMirror.on('cursorActivity', () => {
				const stPos = codeMirror.getCursor('start')
				const edPos = codeMirror.getCursor('end')
				const hdPos = codeMirror.getCursor('head')

				const stindex = codeMirror.indexFromPos(stPos)
				const edindex = codeMirror.indexFromPos(edPos)
				const hdindex = codeMirror.indexFromPos(hdPos)
				const prefixed = hdindex === stindex && stindex !== edindex

				socket.emit('anchor-update', { stindex, edindex, prefixed })
			})

			sharedoc.subscribe(() => {
				stopWatch = true

				codeMirror.setValue(sharedoc.data || '')
				codeMirror.setCursor(0, 0)
				codeMirror.focus()
				stopWatch = false
			})

			sharedoc.on('op', (op, mine) => {
				if (mine) return
				const index = op.length === 2 ? op[0] : 0
				const data = op.length === 2 ? op[1] : op[0]

				if (typeof data === 'string') {
					const pos = codeMirror.posFromIndex(index)

					stopWatch = true
					codeMirror.replaceRange(data, pos, pos)
					stopWatch = false
				} else {
					const delCt = data.d
					const stPos = codeMirror.posFromIndex(index)
					const edPos = codeMirror.posFromIndex(index + delCt)
					// const range = { start: stPos, end: edPos }

					stopWatch = true
					codeMirror.replaceRange('', stPos, edPos)
					stopWatch = false
				}
			})

			const addName = (id, photoURL) => {
				const userslist = userListRef.current
				const usericon = document.createElement('li')
				usericon.classList.add(`u-${id}`)
				usericon.innerHTML = `<img src="${photoURL}" alt="" />`
				userslist.appendChild(usericon)

				const color = idToColor(id)
				const styleTag = document.createElement('style')
				styleTag.id = `style-${id}`
				styleTag.innerHTML = `
                .CodeMirror-line .u-${id}                   { background-color: ${hexToRgbaStyle(color, 0.35)}; }
                .CodeMirror-line .u-${id}.cursor            { opacity: 1; }
                .CodeMirror-line .u-${id}.cursor.left       { border-left: 2px solid ${color}; }
                .CodeMirror-line .u-${id}.cursor.right      { border-right: 2px solid ${color}; }
                .CodeMirror-line .u-${id}.empty             { background-color: transparent; }

            `
				document.querySelector('head').appendChild(styleTag)
			}

			const anchorMap = {}
			const setAnchor = (id, anchor) => {
				if (id in anchorMap) {
					anchorMap[id].forEach(m => m.clear())
					delete anchorMap[id]
				}

				// Whether or not the cursor is actually at the beginning
				// or end of the selection
				let emptyClass = ''
				let stindex = anchor.stindex
				const edindex = anchor.edindex

				// Add selection
				let stPos, edPos
				anchorMap[id] = []

				if (stindex !== edindex) {
					stPos = codeMirror.posFromIndex(stindex)
					edPos = codeMirror.posFromIndex(edindex)

					anchorMap[id].push(codeMirror.markText(stPos, edPos, { className: `u-${id}` }))
				}

				if (stindex === edindex) {
					stindex = Math.max(0, stindex - 1)
					emptyClass = 'empty'
				}

				// Add cursor
				const index = anchor.prefixed ? stindex : edindex
				stPos = codeMirror.posFromIndex(index + (anchor.prefixed ? 0 : -1))
				edPos = codeMirror.posFromIndex(index + (anchor.prefixed ? 1 : 0))

				anchorMap[id].push(
					codeMirror.markText(stPos, edPos, {
						className: `u-${id} ${emptyClass} cursor ${anchor.prefixed ? 'left' : 'right'}`,
					})
				)
			}

			const removeId = id => {
				userListRef.current.querySelector(`li.u-${id}`).remove()
				document.querySelector(`#style-${id}`).remove()
				if (id in anchorMap) {
					anchorMap[id].forEach(m => m.clear())
					delete anchorMap[id]
				}
			}

			const idToColor = id => {
				let total = 0
				for (let c of id) total += c.charCodeAt(0)

				let hex = total.toString(16)
				while (hex.length < 3) hex += hex[hex.length - 1]
				hex = hex.substr(0, 3)

				let color = '#'
				for (let c of hex) color += `${c}0`

				return color
			}

			const hexToRgbaStyle = (hex, opacity) => {
				hex = hex.replace('#', '')
				let r, g, b
				if (hex.length === 3) {
					r = hex[0] + hex[0]
					g = hex[1] + hex[1]
					b = hex[2] + hex[2]
				} else {
					r = hex.substr(0, 2)
					g = hex.substr(2, 2)
					b = hex.substr(4, 2)
				}

				r = parseInt(r, 16)
				g = parseInt(g, 16)
				b = parseInt(b, 16)

				return `rgba(${r},${g},${b},${opacity})`
			}

			const clearAll = () => {
				for (let key in anchorMap) removeId(key)
			}

			const socket = io(`http://${baseApiUrl}`)
			socket.on('connect', () => {
				socket.emit('joinRoom', currentFile.nameHash)

				socket.on('disconnect', () => clearAll())

				socket.once('initialize', e => {
					for (let id in e.anchors) socket.id !== id && setAnchor(id, e.anchors[id])
					for (let id in e.names) {
						socket.id !== id && addName(id, e.names[id])
					}
				})
				socket.on('anchor-update', e => {
					if (socket.id === e.id) return

					setAnchor(e.id, e.anchor)
				})
				socket.on('id-join', e => {
					if (socket.id === e.id) return

					addName(e.id, e.name)
					setAnchor(e.id, e.anchor)
				})
				socket.on('id-left', e => {
					if (socket.id === e.id) return

					removeId(e.id)
				})
			})
			return () => {
				sharedoc.destroy()
				socket.disconnect()
				codeMirror.toTextArea()
			}
		},
		[currentFile.nameHash]
	)

	return (
		<>
			<UserList ref={userListRef} />
			<textarea ref={editorRef} />
			<FakeButtonsElement id="wmd-button-bar" />
		</>
	)
}

const mapStateToProps = ({ editor: { codeMirror }, user }) => ({ codeMirror, user })

const mapDispatchToProps = { setCmInstance }

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Editor)
)
