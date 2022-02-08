import { useEffect } from 'react'

const Admin = () => {
	useEffect(() => {
		fetch('/user/statistics')
	}, [])

	return <>Admin Panel</>
}

// const mapStateToProps = ({ user }) => ({ user })

export default Admin
