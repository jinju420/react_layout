import Layout from '../common/Layout';
import Modal from '../common/Modal';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
// usestate 스테이는 변경을 원할하게 관리하도록 하는 것
//useEffect 효과주는 내용들을 코드에 넣고 효과를 줄지 정하는 거죠

function Youtube() {
	//앞부분은 결과적으로 보여 주는 값
	const [Vids, setVids] = useState([]); //가지고 오는 값에 따라 초기값 뭐 넣을건지 구분
	const [Open, setOpen] = useState(false);
	const [Index, setIndex] = useState(0);

	useEffect(() => {
		const key = 'AIzaSyBGee4MUXU3jusXj7YwDBzdXI5Sn3gAkIA';
		const playlistId = 'PLY0voYdGZtAgPCRyH8libB1_TbuzvCR_a';
		const num = 8;
		const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

		axios.get(url).then((json) => {
			console.log(json);
			setVids(json.data.items); //빈 배열(Vids)에 배열을 (setVids)에 담아서 Vids로 보내주기 때문에 setVids에 담는다.
		});
	}, []);
	useEffect(() => {
		console.log(Vids);
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
									setOpen(true);
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
				{/* <div className='wrap'></div> */}
			</Layout>
			{Open && (
				<Modal setOpen={setOpen}>
					{/*setOpen이라는 props에 setOpen함수를 담았다.자식 Modal에 props전달하기위해 */}
					<iframe
						title={Vids[0].id}
						src={`https://www.youtube.com/embed/${Vids[Index].snippet.resourceId.videoId}`}
					></iframe>
					{/* Modal.js의 props.children으로 들어가는 값 
						youtube안에서 불러오는 모달이기 때문에 youtube가 부모고 modal이 자식					
					*/}
				</Modal>
			)}
			{/* open이 참이면 &&뒤의 부분이 실행 */}
		</>
	);
}

export default Youtube;
