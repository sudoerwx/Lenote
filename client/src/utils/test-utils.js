/* eslint-disable */
import React from 'react'
import { render } from 'react-testing-library'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import '__mocks__/mocks'
import { IsMobileContext } from '../components/App/App'
import configureStore from 'redux-mock-store'

import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureStore(middlewares)

const store = mockStore({
	editor: {
		codeMirror: {
			options: {
				value: '',
				mode: {
					name: 'markdown',
					highlightFormatting: true,
					maxBlockquoteDepth: 3,
					fencedCodeBlockHighlighting: true,
					taskLists: false,
					strikethrough: false,
					emoji: false,
					xml: true,
					tokenTypeOverrides: {},
				},
				shared: true,
				lineWrapping: true,
				autofocus: false,
				indentUnit: 2,
				indentWithTabs: false,
				smartIndent: true,
				tabSize: 4,
				lineSeparator: null,
				specialChars: {},
				electricChars: true,
				inputStyle: 'textarea',
				spellcheck: false,
				autocorrect: false,
				autocapitalize: false,
				rtlMoveVisually: false,
				wholeLineUpdateBefore: true,
				theme: 'default',
				keyMap: 'default',
				extraKeys: null,
				configureMouse: null,
				gutters: [],
				fixedGutter: true,
				coverGutterNextToScrollbar: false,
				scrollbarStyle: 'native',
				lineNumbers: false,
				firstLineNumber: 1,
				showCursorWhenSelecting: false,
				resetSelectionOnContextMenu: true,
				lineWiseCopyCut: true,
				pasteLinesPerSelection: true,
				selectionsMayTouch: false,
				readOnly: false,
				disableInput: false,
				dragDrop: true,
				allowDropFileTypes: null,
				cursorBlinkRate: 530,
				cursorScrollMargin: 0,
				cursorHeight: 1,
				singleCursorHeightPerLine: true,
				workTime: 100,
				workDelay: 100,
				flattenSpans: true,
				addModeClass: false,
				pollInterval: 100,
				undoDepth: 200,
				historyEventDelay: 1250,
				viewportMargin: 10,
				maxHighlightLength: 10000,
				moveInputWithCursor: true,
				tabindex: null,
				direction: 'ltr',
				phrases: null,
			},
			doc: {
				children: [{}],
				getValue: jest.fn(() => 'asdf'),
				size: 2,
				height: 94,
				parent: null,
				first: 0,
				scrollLeft: 0,
				scrollTop: 0,
				cantEdit: false,
				cleanGeneration: 1,
				highlightFrontier: 2,
				modeFrontier: 2,
				sel: {},
				history: {},
				id: 2,
				modeOption: {},
				lineSep: null,
				direction: 'ltr',
				extend: false,
				cm: '[CIRCULAR]',
				mode: {},
			},
			display: {
				input: {},
				scrollbarFiller: {},
				gutterFiller: {},
				lineDiv: {},
				selectionDiv: {},
				cursorDiv: {},
				measure: {},
				lineMeasure: {},
				lineSpace: {},
				mover: {},
				sizer: {},
				sizerWidth: null,
				heightForcer: {},
				gutters: {},
				lineGutter: null,
				scroller: {},
				wrapper: {
					CodeMirror: '[CIRCULAR]',
				},
				viewTo: 2,
				viewFrom: 0,
				reportedViewTo: 2,
				reportedViewFrom: 0,
				view: [],
				renderedView: [],
				externalMeasured: null,
				viewOffset: 0,
				lastWrapWidth: 390,
				lastWrapHeight: 580,
				updateLineNumbers: null,
				barWidth: 0,
				barHeight: 0,
				nativeBarWidth: 0,
				scrollbarsClipped: true,
				lineNumChars: null,
				lineNumInnerWidth: null,
				lineNumWidth: null,
				alignWidgets: false,
				cachedPaddingH: null,
				cachedTextHeight: null,
				cachedCharWidth: null,
				maxLine: null,
				maxLineLength: 0,
				maxLineChanged: false,
				wheelStartY: null,
				wheelStartX: null,
				wheelDY: null,
				wheelDX: null,
				shift: false,
				selForContextMenu: null,
				activeTouch: null,
				gutterSpecs: [],
				externalMeasure: null,
				scrollbars: {},
				dragFunctions: {},
			},
			state: {
				keyMaps: [{}],
				overlays: [],
				modeGen: 1,
				overwrite: false,
				delayingBlurEvent: false,
				focused: false,
				suppressEdits: false,
				pasteIncoming: -1,
				cutIncoming: -1,
				selectingText: false,
				draggingText: false,
				highlight: {
					id: 54,
				},
				keySeq: null,
				specialChars: {},
			},
			curOp: null,
			_handlers: {},
		},
	},
	renderMarkdown: false,
	user: {
		_id: '117399602161978101252',
		name: 'Євстахій',
		secondName: 'Круль',
		email: 'ironimus13@gmail.com',
		photoURI:
			'https://lh5.googleusercontent.com/-Nt4KkjzR05M/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3re6OWUQHVc4UWDPhJOMkHygUmO95A/s50-mo/photo.jpg',
		ownFiles: [
			{
				allowedPeople: [],
				name: 'Welcome',
				nameHash: 'e616951d1658240b4921e1a3b914309a',
				ownerId: '117399602161978101252',
				ownerName: 'Євстахій',
			},
			{
				allowedPeople: [],
				name: 'Lorem Ipsum Dolor',
				nameHash: '58334056eec1ffb32d5b2af3573a5f42',
				ownerId: '117399602161978101252',
			},
		],
		secondFiles: [],
		__v: 5,
		currentFile: {
			allowedPeople: [],
			name: 'Welcome',
			nameHash: 'e616951d1658240b4921e1a3b914309a',
			ownerId: '117399602161978101252',
			ownerName: 'Євстахій',
		},
	},
	shareLink: {},
})

const Providers = (Wrapper = React.Fragment) => ({ children }) => (
	<Wrapper>
		<Provider store={store}>
			<IsMobileContext.Provider value={[true, () => true]}>
				<MemoryRouter>{children}</MemoryRouter>
			</IsMobileContext.Provider>
		</Provider>
	</Wrapper>
)

export const customRender = (ui, ...rest) =>
	render(ui, {
		...rest,
		wrapper: Providers(rest.wrapper),
	})

export * from 'react-testing-library'
