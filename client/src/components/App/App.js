import React, { createContext, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { createGlobalStyle } from 'styled-components'

import Toolbar from '../Toolbar/Toolbar'
import Sidebar from '../Sidebar/Sidebar'
import Paper from '../Paper/Paper'
import { mobileMediaQuery } from '../../config/constants'

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
        @media (max-width: 1160px) {
            padding-bottom: 100px;
        }
    }

    body, html{
        overflow-x: hidden;
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
			--container-width: 60%;
			--max-width: calc(60% + 500px);
		}
		@media (max-width: 1680px) {
			--container-width: 70%;
			--max-width: 100%;
		}
        @media (max-width: 1160px) {
            --container-width: calc(100% - 40px);
            --max-width: 100%;
        }
    }
`

export const IsMobileContext = createContext()

export const App = ({ requestUserData }) => {
	const mobileState = useState(matchMedia(mobileMediaQuery).matches)
	const [mobileSidebarOpen, toggleMobileSidebar] = useState(false)

	return (
		<IsMobileContext.Provider value={mobileState}>
			<Toolbar toggleMobileSidebar={toggleMobileSidebar} />
			<Sidebar mobileSidebarOpen={mobileSidebarOpen} toggleMobileSidebar={toggleMobileSidebar} />
			<Paper mobileSidebarOpen={mobileSidebarOpen} />
			<GlobalStyle />
		</IsMobileContext.Provider>
	)
}

const mapDispatchToProps = { requestUserData }

export default connect(null, mapDispatchToProps)(App)
