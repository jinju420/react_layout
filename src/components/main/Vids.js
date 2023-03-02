import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper';
import { Autoplay, Pagination, Navigation } from 'swiper';
import { EffectCoverflow } from 'swiper';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css';
// import 'swiper/css/effect-coverflow';
// import 'swiper/css/pagination';

function Vids() {
	const Vids = useSelector((store) => store.youtube.data);
	return (
		<section id='vids' className='myScroll'>
			{/* <h1>Youtube</h1> */}
			<Swiper
				slidesPerView={3}
				spaceBetween={50}
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
				effect={'coverflow'}
				coverflowEffect={{
					rotate: 50,
					stretch: 0,
					depth: 100,
					modifier: 1,
					slideShadows: false,
				}}
			>
				{Vids.map((vid, idx) => {
					if (idx >= 6) return null;
					return (
						<SwiperSlide key={idx}>
							<div className='inner'>
								<div className='pic'>
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
	);
}

export default memo(Vids);
