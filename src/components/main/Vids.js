import { memo } from 'react';
import { useSelector } from 'react-redux';

function Vids() {
	const Vids = useSelector((store) => store.youtube.data);
	return (
		<section id='vids' className='myScroll'>
			<h1>Youtube</h1>

			<div className='inner'>
				{Vids.map((vid, idx) => {
					if (idx >= 4) return null;
					return (
						<article key={idx}>
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
