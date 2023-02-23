import Layout from '../common/Layout';
import Modal from '../common/Modal';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
// usestate 스테이는 변경을 원할하게 관리하도록 하는 것
//useEffect 효과주는 내용들을 코드에 넣고 효과를 줄지 정하는 거죠

function Youtube() {
	//앞부분은 결과적으로 보여 주는 값
	const open = useRef(null);
	//가지고 오는 값에 따라 초기값 뭐 넣을건지 구분
	const [Vids, setVids] = useState([]);
	const [Index, setIndex] = useState(0);

	useEffect(() => {
		const key = 'AIzaSyBGee4MUXU3jusXj7YwDBzdXI5Sn3gAkIA';
		const playlistId = 'PLY0voYdGZtAgPCRyH8libB1_TbuzvCR_a';
		const num = 8;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

		axios.get(url).then((json) => {
			setVids(json.data.items); //빈 배열(Vids)에 배열을 (setVids)에 담아서 Vids로 보내주기 때문에 setVids에 담는다.
		});
	}, []);
	useEffect(() => {
		// console.log(Vids);
	}, [Vids]);
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
			{/* open이 참이면 &&뒤의 부분이 실행 */}
		</>
	);
}

export default Youtube;
