import { memo, useEffect, useRef, useState } from 'react';
import axios from 'axios';

function Visual() {
	const [Img, setImg] = useState([]);
	const list = useRef(null);
	const prev = useRef(null);
	const next = useRef(null);
	const li = useRef(null);
	const inner = useRef(true);

	useEffect(() => {
		axios.get(`${process.env.PUBLIC_URL}/DB/swiper.json`).then((json) => {
			setImg(json.data.swiper);
		});
	}, []);

	useEffect(() => {
		prev.current.addEventListener('click', (e) => {
			console.log(e.currentTarget);
			list.current.append(list.current.firstElementChild);
			prev.current.classList.add('on');
			setTimeout(() => prev.current.classList.remove('on'), 500);
		});

		next.current.addEventListener('click', () => {
			list.current.prepend(list.current.lastElementChild);
			next.current.classList.add('on');
			setTimeout(() => next.current.classList.remove('on'), 500);
		});
	}, []);

	return (
		<figure id='visual' className='myScroll'>
			<div className='inner'>
				<ul className='list' ref={list}>
					{Img.map((img, idx) => {
						const [Txt, setTxt] = img.title.split(' ');
						return (
							<li key={idx} ref={li}>
								<div className='inner' ref={inner}>
									<img src={`${process.env.PUBLIC_URL}/img/swiper/${img.pic}`} alt={img.pic} />

									<h2>
										{Txt}
										<br />
										{setTxt}
									</h2>
								</div>
							</li>
						);
					})}
				</ul>

				<nav className='navi'>
					<p className='prev' ref={prev}>
						<span></span>
					</p>
					<p className='next' ref={next}>
						<span></span>
					</p>
				</nav>
			</div>
		</figure>
	);
}

export default memo(Visual);
