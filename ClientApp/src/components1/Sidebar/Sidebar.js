import React from 'react'
import styled from 'styled-components'

const StyledSidebar = styled.div`
	margin-top: 40px;
	width: calc((var(--max-width) - var(--container-width)) / 2);
`

const Item = styled.div`
	background-color: ${({ hl }) => hl ? 'var(--c-white-hl)' : 'transparent'};
	border-left: ${({ hl }) => hl ? '4px' : 0} solid var(--c-blue-hl);
	padding: 8px 21px;
	padding-left: ${({ hl }) => hl ? '17px' : '21px'};
	font-weight: 200;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	color: var(--c-darkgrey-text);
	cursor: pointer;
	&:hover {
		color: black;
	}
`

const Text = styled.p`
	margin: 50px 0 3px 21px;
	font-weight: 500;
	font-size: .9rem;
	text-transform: uppercase;
	color: var(--c-grey-text);
`

const mockData = {
	'Own files': [
		{ name: 'Lorem Ipsum Dolor', id: 1, highlighted: true },
		{ name: 'Sit Amet Consectetur', id: 1 },
		{ name: 'Sed do eiusmod', id: 1 },
		{ name: 'Tempor ut dolore', id: 1 },
	],
	'Other\'s files': [
		{ name: 'Lorem Ipsum Dolor', id: 1 },
		{ name: 'Sit Amet Consectetur', id: 1 },
		{ name: 'Sed do eiusmod', id: 1 },
		{ name: 'Tempor ut dolore', id: 1 },
	],
}

const Sidebar = ({ empty }) => (
	<StyledSidebar>
		{!empty && Object.keys(mockData).map(key => (
			<>
				<Text>{key}</Text>
				{mockData[key].map(({ name, highlighted, id }) => (
					<Item key={id} hl={highlighted}>{name}</Item>
				))}
			</>
		))}
	</StyledSidebar>
)

export default Sidebar
