export const baseApiUrl =
	process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_BASE_URL : window.location.hostname

export const mobileMediaQuery = '(max-width: 1160px)'
