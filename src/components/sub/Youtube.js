import Layout from '../common/Layout';
import Modal from '../common/Modal';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function Youtube() {
	//reducer에 데이터변경 요청을 위해 **action객체를 전달해주는 함수
	const dispatch = useDispatch();
	//store 전역 데이터를 가져올때 쓰는 함수 store라는 객체로 store.youtubeReducer.youtube데어터 가져옴
	const Vids = useSelector((store) => store.youtubeReducer.youtube);
	const open = useRef(null);
	// const [Vids, setVids] = useState([]);
	const [Index, setIndex] = useState(0);

	useEffect(() => {
		const key = 'AIzaSyBGee4MUXU3jusXj7YwDBzdXI5Sn3gAkIA';
		const playlistId = 'PLY0voYdGZtAipraMUx-_pnepD9KKaUDdm';
		const num = 8;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

		axios.get(url).then((json) => {
			// setVids(json.data.items);
			dispatch({ type: 'SET_YOUTUBE', payload: json.data.items });
		});
	}, [dispatch]);

	return (
		<>
			<Layout name={'YOUTUBE'}>
				{Vids.map((el, idx) => {
					const tit = el.snippet.title;
					const desc = el.snippet.description;
					const date = el.snippet.publishedAt;

					return (
						<article key={el.id}>
							<div
								className='pic'
								onClick={() => {
									open.current.setOpen();
									setIndex(idx);
								}}
							>
								<img src={el.snippet.thumbnails.high.url} alt={el.snippet.title} />
							</div>
							<div className='txt'>
								<h3>{tit.length > 40 ? tit.substr(0, 30) + '...' : tit}</h3>
								<p>{desc.length > 100 ? desc.substr(0, 80) + '...' : desc}</p>
								<span>{date.split('T')[0]}</span>
							</div>
						</article>
					);
				})}
			</Layout>

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

export default Youtube;
