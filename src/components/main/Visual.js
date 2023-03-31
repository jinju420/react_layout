import { memo, useEffect, useRef, useState } from 'react';
import axios from 'axios';

function Visual() {
	const [Info, setInfo] = useState([]);
	const getData = async () => {
		const data = await axios.get(process.env.PUBLIC_URL + '/DB/data.json');
		setInfo(data.data.info);
	};

	useEffect(() => getData(), []);
	// const [Img, setImg] = useState([]);
	// const list = useRef(null);
	// const prev = useRef(null);
	// const next = useRef(null);
	// const li = useRef(null);
	// const inner = useRef(true);

	// useEffect(() => {
	// 	axios.get(`${process.env.PUBLIC_URL}/DB/swiper.json`).then((json) => {
	// 		setImg(json.data.swiper);
	// 	});

	// 	prev.current.addEventListener('click', () => {
	// 		list.current.append(list.current.firstElementChild);
	// 		prev.current.classList.add('on');
	// 		setTimeout(() => prev.current.classList.remove('on'), 500);
	// 	});

	// 	next.current.addEventListener('click', () => {
	// 		list.current.prepend(list.current.lastElementChild);
	// 		next.current.classList.add('on');
	// 		setTimeout(() => next.current.classList.remove('on'), 500);
	// 	});
	// }, []);

	return (
		<div id='visual' className='myScroll'>
			<div className='inner'>
				<ul className='list'>
					{/* {Img.map((img, idx) => {
						return (
							<li key={idx} ref={li}>
								<div className='inner' ref={inner}>
									<img src={`${process.env.PUBLIC_URL}/img/swiper/${img.pic}`} alt={img.pic} />
									<h2>{img.title}</h2>
								</div>
							</li>
						);
					})} */}
				</ul>
			</div>
		</div>
	);
}

export default memo(Visual);
