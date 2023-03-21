import { memo, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import Modal from '../common/Modal';

function Pics() {
	const { flickr } = useSelector((store) => store.flickrReducer);
	const open = useRef(null);
	//Swiper 컴포넌트에서 생성되는 인스턴스를 담을 객체
	const [Instance, setInstance] = useState(null);
	const [Index, setIndex] = useState(0);
	const btnStart = useRef(null);
	const btnStop = useRef(null);

	useEffect(() => {
		const btnPrev = document.querySelector('.swiper-button-prev');
		const btnNext = document.querySelector('.swiper-button-next');

		//위의 버튼을 클릭시 정지버튼 활성화
		[btnPrev, btnNext].map((el) => {
			el.addEventListener('click', () => {
				btnStart.current.classList.remove('on');
				btnStop.current.classList.add('on');
			});
		});
	}, []);
	return (
		<>
			<section id='pics' className='myScroll'>
				<div className='inner'>
					<div className='title'>
						<h1>
							Our latest <br />
							Interest Photos
						</h1>
						<div className='controls_box'>
							<span>What's New?</span>
							<nav className='controls'>
								<FontAwesomeIcon
									icon={faPlay}
									className='on'
									ref={btnStart}
									onClick={() => {
										//pagination, 좌우버튼 클릭시 일지 정지가 되는 것이 아닌 autoplay기능 자체가 비활성화 됨
										//현재 자동롤링 동작 유무는 swiper.autoplay.running값으로 확인
										//자동롤링 시작, 정지 함수도 start, stop으로 변경
										if (Instance.autoplay.running) return;
										Instance.autoplay.start();
										btnStart.current.classList.add('on');
										btnStop.current.classList.remove('on');
									}}
								/>
								<FontAwesomeIcon
									icon={faPause}
									ref={btnStop}
									onClick={() => {
										if (!Instance.autoplay.running) return;
										Instance.autoplay.stop();
										btnStart.current.classList.remove('on');
										btnStop.current.classList.add('on');
									}}
								/>
							</nav>
						</div>
					</div>

					<Swiper
						slidesPerView={'auto'}
						// spaceBetween={20}
						loop={true}
						centeredSlides={true}
						grabCursor={true}
						navigation={true}
						modules={[Navigation, Autoplay]}
						autoplay={{
							delay: 2000,
							disableOnInteraction: true,
						}}
						breakpoints={{
							1180: {
								slidesPerView: 4,
								// spaceBetween: 0,
							},
						}}
						onSwiper={(swiper) => setInstance(swiper)}
					>
						{flickr.map((vid, idx) => {
							if (idx >= 6) return null;
							return (
								<SwiperSlide key={idx}>
									<div className='inner'>
										<div
											className='pic'
											onClick={() => {
												setIndex(idx);
												open.current.setOpen();
												Instance.autoplay.stop();
												document.querySelector('.fa-play').classList.remove('on');
												document.querySelector('.fa-pause').classList.add('on');
											}}
										>
											<img
												className='flickr_img'
												src={`https://live.staticflickr.com/${vid.server}/${vid.id}_${vid.secret}_b.jpg`}
												alt={vid.title}
											/>
										</div>
										<div className='txt'>
											<h2>{vid.title.length > 10 ? vid.title.substr(0, 7) + '...' : vid.title}</h2>
											<Link to='/gallery'>View More</Link>
										</div>
									</div>
								</SwiperSlide>
							);
						})}
					</Swiper>
				</div>
			</section>

			<Modal ref={open}>
				<div className='flickr_img'>
					<img
						src={`https://live.staticflickr.com/${flickr[Index]?.server}/${flickr[Index]?.id}_${flickr[Index]?.secret}_b.jpg`}
						alt={flickr[Index]?.title}
					/>
				</div>
			</Modal>
		</>
	);
}

export default memo(Pics);
