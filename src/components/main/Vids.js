import { memo } from 'react';
import { useSelector } from 'react-redux';

function Vids() {
	const { youtube } = useSelector((store) => store.youtubeReducer);

	return (
		<section id='vids' className='myScroll'>
			<h1>Youtube</h1>
			<div className='inner'>
				{youtube.map((vid, idx) => {
					if (idx >= 4) return null;
					return (
						<article key={vid.id}>
							<div className='pic'>
								<img src={vid.snippet.thumbnails.medium.url} alt={vid.snippet.title} />
							</div>
						</article>
					);
				})}
			</div>
		</section>
	);
}

export default memo(Vids);
