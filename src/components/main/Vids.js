import { memo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import { EffectCoverflow } from 'swiper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import Modal from '../common/Modal';
// import 'swiper/css/effect-coverflow';

function BtnRolling() {
	const swiper = useSwiper();
	const btnRun = useRef(null);
	const btnPause = useRef(null);
	return (
		<nav className='controls'>
			<FontAwesomeIcon
				className='on'
				ref={btnRun}
				icon={faPlay}
				onClick={() => {
					if (!swiper.autoplay.paused) return;
					swiper.autoplay.run();
					btnRun.current.classList.add('on');
					btnPause.current.classList.remove('on');
				}}
			/>
			<FontAwesomeIcon
				ref={btnPause}
				icon={faPause}
				onClick={() => {
					if (swiper.autoplay.paused) return;
					swiper.autoplay.pause();
					btnRun.current.classList.remove('on');
					btnPause.current.classList.add('on');
				}}
			/>
		</nav>
	);
}

function Vids() {
	const Vids = useSelector((store) => store.youtube.data);
	const open = useRef(null);
	const [Index, setIndex] = useState(0);
	return (
		<>
			<section id='vids' className='myScroll'>
				{/* <h1>Youtube</h1> */}
				<Swiper
					slidesPerView={1}
					spaceBetween={30}
					loop={true}
					centeredSlides={true}
					grabCursor={true}
					navigation={true}
					pagination={{ clickable: true }}
					modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
					autoplay={{
						delay: 2000,
						disableOnInteraction: true,
					}}
					breakpoints={{
						1180: {
							slidesPerView: 3,
							spaceBetween: 30,
						},
					}}
					effect={'coverflow'}
					coverflowEffect={{
						rotate: 50,
						stretch: 0,
						depth: 100,
						modifier: 1,
						slideShadows: false,
					}}
				>
					<BtnRolling />
					{Vids.map((vid, idx) => {
						if (idx >= 6) return null;
						return (
							<SwiperSlide key={idx}>
								<div className='inner'>
									<div
										className='pic'
										onClick={() => {
											setIndex(idx);
											open.current.setOpen();
										}}
									>
										<img src={vid.snippet.thumbnails.maxres.url} alt={vid.snippet.title} />
									</div>
									<h2>
										{vid.snippet.title.length >= 30
											? vid.snippet.title.substr(0, 35) + '...'
											: vid.snippet.title}
									</h2>
									<p>
										{vid.snippet.description.length >= 100
											? vid.snippet.description.substr(0, 150) + '...'
											: vid.snippet.description}
									</p>
								</div>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</section>

			<Modal ref={open}>
				<div className='frame'>
					<iframe
						title={Vids[Index]?.id}
						src={`https://www.youtube.com/embed/${Vids[Index]?.snippet.resourceId.videoId}`}
					></iframe>
				</div>
			</Modal>
		</>
	);
}

export default memo(Vids);
