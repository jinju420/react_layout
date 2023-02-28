import Layout from '../common/Layout';
import Modal from '../common/Modal';
import { useState, useRef } from 'react';
import { useSelector } from 'react-redux';

function Youtube() {
	/*
	store 전역 데이터를 가져올때 쓰는 함수 store라는 객체로 store.youtubeReducer.youtube데어터 가져옴
	컴포넌트 마운트시 일단 전역 state에 있는 빈 배열값을 가져옴
	*/
	const Vids = useSelector((store) => store.youtubeReducer.youtube);
	const open = useRef(null);
	// const [Vids, setVids] = useState([]);
	const [Index, setIndex] = useState(0);

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
