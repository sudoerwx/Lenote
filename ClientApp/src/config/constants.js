export const baseApiUrl =
	process.env.NODE_ENV === 'development'
		? process.env.REACT_APP_API_BASE_URL
		: window.location.href.replace(/^https/g, 'http')

export const mobileMediaQuery = '(max-width: 1160px)'
