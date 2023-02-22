import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Masonry from 'react-masonry-component';

function Gallery() {
	const frame = useRef(null);
	const [Btn, setBtn] = useState(false);
	const [Items, setItems] = useState([]);
	const [Loading, setLoading] = useState(true);

	const getFlickr = async (opt) => {
		//객체 타입을 opt로 받아서
		const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
		const key = '8dfeab6f923483f4b3694e700652632a';
		const method_interest = 'flickr.interestingness.getList';
		// const method_favorite= 'flickr.favorites.getList';
		const method_search = 'flickr.photos.search';
		const method_user = 'flickr.people.getPhotos';
		// const user_id = '195427004@N07';
		const num = 20;
		let url = '';

		if (opt.type === 'interest')
			url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
		if (opt.type === 'search')
			url = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${opt.tags}`;

		if (opt.type === 'user')
			url = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${opt.user}`;
		//동기 == 순서가 정해져 있는 순서대로 일의 진행이 끝난다.
		//비동기 == 순서는 정해가 있지만 어떤 업무가 먼저 끝날지 모른다.
		//브러우저가 실행함
		//async await /promise객체를 반환하는 앞에 await붙이면 다음코드 동기화 실행됨
		const result = await axios.get(url);
		console.log(result.data.photos.photo);
		setItems(result.data.photos.photo);
		setTimeout(() => {
			setLoading(false);
			frame.current.classList.add('on');
		}, 1000);

		//promise, then방식보다 async await가 코드 가독성이 더 좋음 (두 방식의 성능, 결과차이는 없음)
	};

	useEffect(() => {
		getFlickr({ type: 'interest' });
		// getFlickr({ type: 'user', user: '195427004@N07' });
		//getFlickr({ type: 'search', tags: '바다' });
	}, []);
	// const url1 = `${base}method=${method}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&user_id=${user_id}`;

	return (
		<Layout name={'GALLERY'}>
			<div className='inner'>
				<div className='btnSet'>
					<button
						onClick={() => {
							frame.current.classList.remove('on');
							setLoading(true);
							getFlickr({ type: 'interest' });
						}}
					>
						Interest Gallery
					</button>
					<button
						onClick={() => {
							frame.current.classList.remove('on');
							setLoading(true);
							getFlickr({ type: 'user', user: '195427004@N07' });
						}}
					>
						My Gallery
					</button>
				</div>

				{Loading && (
					<img
						className='loader'
						src={`${process.env.PUBLIC_URL}/img/load.gif`}
						alt='loading'
					/>
				)}
				<div className='frame' ref={frame}>
					{/* 감싸주고 싶은 태그 넣기 elementType*/}
					<Masonry elementType={'div'} options={{ transitionDuration: '1s' }}>
						{Items.map((item, idx) => {
							return (
								<article key={idx}>
									<div className='inner'>
										<h2>{item.title}</h2>
										<div className='pic'>
											<img
												src={`https://live.staticflickr.com/${item.server}/${item.id}_${item.secret}_m.jpg`}
												alt={item.title}
											/>
										</div>
									</div>
								</article>
							);
						})}
					</Masonry>
				</div>
			</div>
		</Layout>
	);
}

export default Gallery;
