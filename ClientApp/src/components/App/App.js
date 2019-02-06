import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { createGlobalStyle } from 'styled-components'

import Toolbar from '../Toolbar/Toolbar'
import Sidebar from '../Sidebar/Sidebar'
import Paper from '../Paper/Paper'

import { requestUserData } from '../../actions/user'

const GlobalStyle = createGlobalStyle`
	* {
        margin: 0;
        padding: 0;
	}
    body {
        font-family: Roboto;
		background-color: var(--c-lightgrey-bg);
		padding-top: 60px;
    }
    :root {
        font-size: 18px;

		--container-width: 1200px;
		--max-width: 1700px;
	
        --c-lightgrey-bg: #eee;
		--c-darkgrey-bg: #3E3E3E;
		--c-white-hl: rgba(255, 255, 255, 0.65);
		--c-blue-hl: #00B2FF;
        --c-red-hl: rgba(255, 0, 0, 0.46);
        --c-lightgrey-text: #eee;
		--c-grey-text: #B9B9B9;
        --c-darkgrey-text: #555;

		@media (max-width: 1920px) {
			--container-width: 60vw;
			--max-width: calc(60vw + 500px);
		}
		@media (max-width: 1680px) {
			--container-width: 70vw;
			--max-width: 100vw;
		}
    }
`

const App = ({ requestUserData }) => {
	useEffect(() => {
		requestUserData()
	}, [])

	return (
		<div>
			<Toolbar />
			<Sidebar />
			<Paper />
			<GlobalStyle />
		</div>
	)
}

const mapDispatchToProps = { requestUserData }

export default connect(
	null,
	mapDispatchToProps
)(App)
