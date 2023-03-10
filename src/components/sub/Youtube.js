import Layout from '../common/Layout';
import Modal from '../common/Modal';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

function Youtube() {
	const open = useRef(null);
	const Vids = useSelector((store) => store.youtubeReducer.youtube);
	const [Index, setIndex] = useState(0);

	return (
		<>
			<Layout name={'YOUTUBE'}>
				{Vids.map((el, idx) => {
					const tit = el.snippet.title;
					const desc = el.snippet.description;
					// const date = el.snippet.publishedAt;

					return (
						<article key={el.id}>
							<h3>{tit.length > 100 ? tit.substr(0, 20) + '...' : tit}</h3>
							<span>GRANHAND.</span>
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
								<p>{desc.length > 150 ? desc.substr(0, 130) + '...' : desc}</p>
								{/* <span>{date.split('T')[0]}</span> */}
							</div>
						</article>
					);
				})}
			</Layout>
			{/* 모달 여는 함수를 open참조객체에 연결 */}
			<Modal ref={open}>
				{/* Youtube컴포넌트 첨 마운트시 Modal컴포넌트 자체는 동작되기 때문에 첫번째 랜더링 싸이클일떄 Vids[Index]값이 비어있으므로 에러 따라서 Optional Chaining으로 해당 객체값이 비어있을때는 id값을 읽지않고 값이 담겨 있을떄에만 실행 */}
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
