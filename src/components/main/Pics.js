import { memo } from 'react';
import { useSelector } from 'react-redux';

function Pics({ Scrolled, Pos }) {
	const { flickr } = useSelector((store) => store.flickrReducer);
	const base = -window.innerHeight / 3;

	let scroll = Scrolled - base - Pos || 0;
	scroll < 0 && (scroll = 0);

	return (
		<section id='pics' className='myScroll'>
			<div className='inner'>
				<div className='title'>
					<h1
						style={{
							transform: `translateX(${scroll}px) scale(${1 + scroll / 60})`,
							opacity: 1 - scroll / 300,
						}}
					>
						Flickr
					</h1>
					<h2>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, inventore.</h2>
				</div>
				<div className='pic'>
					{flickr.map((pic, idx) => {
						if (idx >= 4) return null;
						return (
							<img
								key={idx}
								className='flickr_img'
								src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`}
								alt={pic.title}
							/>
						);
					})}
				</div>
			</div>
		</section>
	);
}

export default memo(Pics);
