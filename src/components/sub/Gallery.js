import Layout from '../common/Layout';
import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import Masonry from 'react-masonry-component';
import Modal from '../common/Modal';
// import { useSelector } from 'react-redux';
//npm i react-masonry-component
//npm i interval-call (일정시간동안 중복되는 요청을 무시하고 첫번째 이벤트요청만 발생시켜주는 라이브러리)
//npm i framer-motion@6 //팝업뜰때 모션처리

function Gallery() {
	// const pics=useSelector(store=>store.flickr.data);
	const open = useRef(null);
	const frame = useRef(null);
	const input = useRef(null);
	const [Items, setItems] = useState([]);
	const [Index, setIndex] = useState(0);
	const [Loading, setLoading] = useState(true);

	const getFlickr = async (opt) => {
		//객체 타입을 opt로 받아서
		const baseURL = 'https://www.flickr.com/services/rest/?format=json&nojsoncallback=1';
		const key = '8dfeab6f923483f4b3694e700652632a';
		const method_interest = 'flickr.interestingness.getList';
		// const method_favorite= 'flickr.favorites.getList';
		const method_search = 'flickr.photos.search';
		const method_user = 'flickr.people.getPhotos';
		const num = 20;
		let url = '';

		if (opt.type === 'interest')
			url = `${baseURL}&api_key=${key}&method=${method_interest}&per_page=${num}`;
		if (opt.type === 'search')
			url = `${baseURL}&api_key=${key}&method=${method_search}&per_page=${num}&tags=${opt.tags}`;
		if (opt.type === 'user')
			url = `${baseURL}&api_key=${key}&method=${method_user}&per_page=${num}&user_id=${opt.user}`;
		const result = await axios.get(url);

		if (result.data.photos.photo.length === 0) {
			frame.current.classList.add('on');
			setLoading(false);
			return alert('해당 검색어의 결과 이미지가 없습니다.');
		}
		setItems(result.data.photos.photo);

		setTimeout(() => {
			setLoading(false);
			frame.current.classList.add('on');
		}, 500);
	};

	const showInterest = () => {
		frame.current.classList.remove('on');
		setLoading(true);
		getFlickr({ type: 'interest' });
	};
	const showMine = () => {
		frame.current.classList.remove('on');
		setLoading(true);
		getFlickr({ type: 'user', user: '195427004@N07' });
	};
	const showUser = (e) => {
		frame.current.classList.remove('on');
		setLoading(true);
		getFlickr({ type: 'user', user: e.target.innerText });
	};

	const showSearch = () => {
		const result = input.current.value.trim();
		if (!result) return alert('검색어를 입력하세요.');
		input.current.value = '';
		frame.current.classList.remove('on');
		setLoading(true);
		getFlickr({ type: 'search', tags: result });
	};

	let handleKeyUp = (e) => {
		e.key === 'Enter' && showSearch();
	};

	useEffect(() => {
		getFlickr({ type: 'user', user: '195427004@N07' });
	}, []);

	return (
		<>
			<Layout name={'GALLERY'}>
				<div className='inner'>
					<div className='btnSet'>
						<div className='controls'>
							<nav>
								<button onClick={showInterest}>Interest Gallery</button>
								<button onClick={showMine}>My Gallery</button>
							</nav>
						</div>
						<div className='searchBox'>
							<input
								type='text'
								ref={input}
								onKeyPress={handleKeyUp}
								placeholder='검색어를 입력하세요.'
							/>
							<button onClick={showSearch}>Search</button>
						</div>
					</div>

					{Loading && (
						<img
							className='loader'
							src={`${process.env.PUBLIC_URL}/img/gallery/load.gif`}
							alt='loading'
						/>
					)}
					<div className='frame' ref={frame}>
						{/* 감싸주고 싶은 태그 넣기 elementType*/}
						<Masonry elementType={'div'} options={{ transitionDuration: '0.5s' }}>
							{Items.map((item, idx) => {
								return (
									<article key={idx}>
										<div className='inner'>
											<div className='picTitle'>
												<h2>{item.title}</h2>
												<div className='profile'>
													<img
														src={`http://farm${item.farm}.staticflickr.com/${item.server}/buddyicons/${item.owner}.jpg`}
														alt={item.owner}
														onError={(e) => {
															e.target.setAttribute(
																'src',
																`${process.env.PUBLIC_URL}/img/gallery/icon.jpeg`
															);
														}}
													/>
													<span onClick={showUser}>{item.owner}</span>
												</div>
											</div>

											<div
												className='pic'
												onClick={() => {
													open.current.setOpen();
													setIndex(idx);
												}}
											>
												<img
													className='flickr_img'
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

			<Modal ref={open}>
				<div className='flickr_img'>
					<img
						src={`https://live.staticflickr.com/${Items[Index]?.server}/${Items[Index]?.id}_${Items[Index]?.secret}_b.jpg`}
						alt={Items[Index]?.title}
					/>
				</div>
			</Modal>
		</>
	);
}

export default Gallery;
