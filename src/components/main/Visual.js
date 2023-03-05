import { memo, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import axios from 'axios';

function Visual() {
	const [Img, setImg] = useState([]);
	useEffect(() => {
		axios.get(`${process.env.PUBLIC_URL}/DB/swiper.json`).then((json) => {
			setImg(json.data.swiper);
		});
	}, []);
	return (
		<figure id='visual' className='myScroll'>
			<div className='inner'>
				<div className='title'>
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
				</div>
				<div className='img'>
					<Swiper
						pagination={{
							type: 'progressbar',
						}}
						loop={true}
						grabCursor={true}
						modules={[Autoplay, Pagination]}
						autoplay={{
							delay: 2000,
							disableOnInteraction: false,
						}}
					>
						{Img.map((img, idx) => {
							return (
								<SwiperSlide key={idx}>
									<img src={`${process.env.PUBLIC_URL}/img/swiper/${img.pic}`} alt={img.pic} />
								</SwiperSlide>
							);
						})}
					</Swiper>
				</div>
			</div>
		</figure>
	);
}

export default memo(Visual);
