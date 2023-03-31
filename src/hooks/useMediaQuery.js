import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
	const [Mobile, setMobile] = useState(false);

	useEffect(() => {
		const media = window.matchMedia(query);
		media.matches !== Mobile && setMobile(media.matches);
		const convert = () => setMobile(media.matches);

		typeof media.addEventListener === 'function' ? media.addEventListener('change', convert) : media.addListener(convert);
		return () =>
			typeof media.removeEventListener === 'function'
				? media.removeEventListener('change', convert)
				: media.removeListener(convert);
	}, [Mobile, query]);
}
