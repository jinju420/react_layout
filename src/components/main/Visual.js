import { memo, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
// import 'swiper/css/pagination';
import axios from 'axios';

function Visual() {
	const [Img, setImg] = useState([]);
	const prev = useRef(null);
	const next = useRef(null);
	useEffect(() => {
		axios.get(`${process.env.PUBLIC_URL}/DB/swiper.json`).then((json) => {
			setImg(json.data.swiper);
		});
	}, []);
	useEffect(() => {
		const list = document.querySelector('.list');
		const prev = document.querySelector('.prev');
		const next = document.querySelector('.next');

		prev.addEventListener('click', () => {
			list.append(list.firstElementChild);
			prev.classList.add('on');
			setTimeout(() => prev.classList.remove('on'), 500);
		});

		next.addEventListener('click', () => {
			list.prepend(list.lastElementChild);
			next.classList.add('on');
			setTimeout(() => next.classList.remove('on'), 500);
		});
	}, []);

	// useEffect(() => {
	// 	prev.current.addEventListener('mousedown', () => {
	// 		const swiperP = document.querySelector('.swiper .swiper-wrapper');
	// 		swiperP.append(swiperP.firstElementChild);
	// 		prev.current.classList.add('on');
	// 		// setTimeout(() => prev.current.classList.remove('on'), 500);
	// 	});
	// 	prev.current.addEventListener('mouseup', () => {
	// 		prev.current.classList.remove('on');
	// 	});
	// 	next.current.addEventListener('mousedown', () => {
	// 		const swiperN = document.querySelector('.swiper .swiper-wrapper');
	// 		swiperN.prepend(swiperN.lastElementChild);
	// 		next.current.classList.add('on');
	// 		// setTimeout(() => next.current.classList.remove('on'), 500);
	// 	});
	// 	next.current.addEventListener('mouseup', () => {
	// 		next.current.classList.remove('on');
	// 	});
	// }, []);

	return (
		<figure id='visual' className='myScroll'>
			<div className='inner'>
				{/* <div className='title'>
					<h1>
						FIND
						<br />
						YOUR
						<br />
						STYLE
					</h1>
					<span>PERFUME : VIOLETTE NUBE</span>
					<div className='des_txt'>
						<p>
							Sometimes You Win Sometimes You Learn : When I opened an old notebook with a coated
							four-leaf clover, phone numbers of my acquaintances written on one side, and a faded
							photo next to it showed a young woman who looked just like me in high heels
						</p>
					</div>
				</div> */}

				<ul className='list'>
					{Img.map((img, idx) => {
						return (
							<li>
								<div className='inner' key={idx}>
									<img src={`${process.env.PUBLIC_URL}/img/swiper/${img.pic}`} alt={img.pic} />
									<h2>{img.title}</h2>
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
