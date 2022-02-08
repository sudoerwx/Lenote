import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import App from '../App/App'
import Admin from 'components/Admin'
import { requestUserData } from 'actions/user'

const RootRouter = ({ user, requestUserData }) => {
	useEffect(() => {
		requestUserData()
	}, [])
	if (user.isLoading) return 'Loading...'

	return (
		<Router>
			<Switch>
				<Route
					path="/admin"
					user={user}
					render={(props) => {
						// eslint-disable-next-line no-console
						console.log({ user })
						return user.isAdmin ? <Admin {...props} /> : <Redirect to="/" />
					}}
				/>
				<Route path="/:nameHash" component={App} />
				{user.ownFiles.length ? <Redirect to={`/${user.ownFiles[0].nameHash}`} /> : <Route component={App} />}
			</Switch>
		</Router>
	)
}

const mapStateToProps = ({ user }) => ({ user })
const mapDispatchToProps = { requestUserData }
export default connect(mapStateToProps, mapDispatchToProps)(RootRouter)
