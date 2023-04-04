import Layout from '../common/Layout';
import { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Masonry from 'react-masonry-component';
import Modal from '../common/Modal';
import * as types from '../../redux/actionType';

function Gallery() {
	const dispatch = useDispatch();
	const Items = useSelector((store) => store.flickrReducer.flickr);
	const open = useRef(null);
	const frame = useRef(null);
	const input = useRef(null);
	const btnInt = useRef(null);
	const btnMy = useRef(null);
	const [Index, setIndex] = useState(0);
	const [Loading, setLoading] = useState(true);
	const [Opt, setOpt] = useState({ type: 'user', user: '195427004@N07' });

	const showInterest = () => {
		frame.current.classList.remove('on');
		setLoading(true);
		setOpt({ type: 'interest' });
	};
	const showMine = () => {
		frame.current.classList.remove('on');
		setLoading(true);
		setOpt({ type: 'user', user: '195427004@N07' });
	};
	const showUser = (e) => {
		frame.current.classList.remove('on');
		setLoading(true);
		setOpt({ type: 'user', user: e.target.innerText });
	};

	const showSearch = () => {
		const result = input.current.value.trim();
		if (!result) return alert('검색어를 입력하세요.');
		input.current.value = '';
		frame.current.classList.remove('on');
		setLoading(true);
		setOpt({ type: 'search', tags: result });
	};

	let handleKeyUp = (e) => {
		e.key === 'Enter' && showSearch();
	};
	//마운트됐을 때 기본 interest가 실행
	useEffect(() => {
		dispatch({ type: types.FLICKR.start, Opt });
	}, [Opt, dispatch]);

	useEffect(() => {
		setTimeout(() => {
			frame.current.classList.add('on');
			setLoading(false);
		}, 500);
	}, [Items]);

	return (
		<>
			<Layout name={'GALLERY'}>
				<div className='btnSet'>
					<div className='controls'>
						<nav>
							<button
								ref={btnInt}
								onClick={() => {
									showInterest();
									if (!btnInt.current.classList.contains('on')) btnMy.current.classList.remove('on');
									btnInt.current.classList.add('on');
								}}
							>
								Interest Gallery
							</button>
							<button
								ref={btnMy}
								className='on'
								onClick={() => {
									showMine();
									if (btnMy.current.classList.contains('on')) return;
									btnInt.current.classList.remove('on');
									btnMy.current.classList.add('on');
								}}
							>
								My Gallery
							</button>
						</nav>
					</div>
					<div className='searchBox'>
						{/* 키보드 이벤트 발생시 이벤트가 발생한 키보드 이름이 enter면 함수호출 */}
						<input type='text' ref={input} onKeyPress={handleKeyUp} placeholder='검색어를 입력하세요.' />
						<button onClick={showSearch}>Search</button>
					</div>
				</div>

				{Loading && <img className='loader' src={`${process.env.PUBLIC_URL}/img/gallery/load.gif`} alt='loading' />}
				<div className='frame' ref={frame}>
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
														e.target.setAttribute('src', `${process.env.PUBLIC_URL}/img/gallery/icon.jpeg`);
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
