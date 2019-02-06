import React, { useState, useEffect, useRef, createRef } from 'react'
import styled from 'styled-components'

const Container = styled.div`
	position: relative;
`

const OptionsWrapper = styled.div`
	position: absolute;
	top: 100%;
	display: ${props => (props.visible ? 'block' : 'none')};
`

export const OpenMenu = () => null

const Menu = ({ children, ContainerTag = Container, OptionsContainer = 'div', value, onChange }) => {
	const clickAwayRef = useRef(createRef())
	const [isMenuOpen, toggleMenu] = useState(false)
	const open = children.find(child => child.type === OpenMenu)
	const options = children.filter(child => child.type !== OpenMenu)

	const hideOnClickAway = event => {
		if (!event.path.some(el => el === clickAwayRef.current)) {
			toggleMenu(false)
		}
	}

	useEffect(() => {
		window.addEventListener('click', hideOnClickAway)
		return () => window.removeEventListener('click', hideOnClickAway)
	}, [])

	return (
		<ContainerTag onClick={() => toggleMenu(!isMenuOpen)} ref={clickAwayRef}>
			{open && open.props.children}
			<OptionsWrapper visible={isMenuOpen}>
				<OptionsContainer>
					{options &&
						React.Children.map(options, option =>
							React.cloneElement(option, {
								onClick: e => onChange(option.props.value, e),
								...option.props,
							})
						)}
				</OptionsContainer>
			</OptionsWrapper>
		</ContainerTag>
	)
}

export default Menu
