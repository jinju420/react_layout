import { memo, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';
import { EffectCoverflow } from 'swiper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause } from '@fortawesome/free-solid-svg-icons';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
import Modal from '../common/Modal';
// import 'swiper/css/effect-coverflow';

function Vids() {
	const Vids = useSelector((store) => store.youtube.data);
	const open = useRef(null);
	//Swiper 컴포넌트에서 생성되는 인스턴스를 담을 객체
	const [Instance, setInstance] = useState(null);
	const [Index, setIndex] = useState(0);
	const btnStart = useRef(null);
	const btnStop = useRef(null);

	useEffect(() => {
		//pagination, prev, next버튼을 처음 마운트시 한번 담고
		const btnPagination = document.querySelector('.swiper-pagination');
		const btnPrev = document.querySelector('.swiper-button-prev');
		const btnNext = document.querySelector('.swiper-button-next');

		//위의 버튼을 클릭시 정지버튼 활성화
		[btnPagination, btnPrev, btnNext].map((el) => {
			el.addEventListener('click', () => {
				btnStart.current.classList.remove('on');
				btnStop.current.classList.add('on');
			});
		});
	}, []);
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
					onSwiper={(swiper) => setInstance(swiper)}
				>
					<nav className='controls'>
						<FontAwesomeIcon
							className='on'
							ref={btnStart}
							icon={faPlay}
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
							ref={btnStop}
							icon={faPause}
							onClick={() => {
								if (!Instance.autoplay.running) return;
								Instance.autoplay.stop();
								btnStart.current.classList.remove('on');
								btnStop.current.classList.add('on');
							}}
						/>
					</nav>
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
											Instance.autoplay.stop();
											document.querySelector('.fa-play').classList.remove('on');
											document.querySelector('.fa-pause').classList.add('on');
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
