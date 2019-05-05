import { useContext, useEffect } from 'react'
import { mobileMediaQuery } from '../../config/constants'
import { IsMobileContext } from '../App/App'

const useMatchMobile = () => {
	const [isMobile, setMobile] = useContext(IsMobileContext)

	useEffect(() => {
		const handleResize = () => {
			const { matches } = matchMedia(mobileMediaQuery)
			if (matches !== isMobile) {
				setMobile(matches)
			}
		}

		window.addEventListener('resize', handleResize)
		return () => window.removeEventListener('resize', handleResize)
	})

	return isMobile
}

export default useMatchMobile
