import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import App from '../App/App'

const RootRouter = ({ user }) => (
	<Router>
		<Switch>
			<Route path="/:nameHash" component={App} />
			{user.ownFiles.length ? <Redirect to={`/${user.ownFiles[0].nameHash}`} /> : <Route component={App} />}
		</Switch>
	</Router>
)

const mapStateToProps = ({ user }) => ({ user })

export default connect(mapStateToProps)(RootRouter)
