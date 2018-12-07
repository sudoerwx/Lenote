import React from 'react'
import Toolbar from '../Toolbar/Toolbar'
import AppContainer from '../AppContainer/AppContainer'
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
	* {
        margin: 0;
        padding: 0;
	}
    body {
        font-family: Roboto;
        font-size: 18px;
		background-color: var(--c-grey-bg);
    }
    :root {
	    --container-width: 960px;
	    --max-width: 1336px;
	
        --c-grey-bg: #eee;
		--c-white-hl: rgba(255, 255, 255, 0.65);
		--c-blue-hl: #00B2FF;
		--c-darkgrey-text: #555;
    }
`

const App = () => (
    <div>
		<Toolbar />
	    <AppContainer />
        <GlobalStyle></GlobalStyle>
    </div>
)

export default App
