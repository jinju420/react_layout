import Layout from '../common/Layout';
import Modal from '../common/Modal';
import { useRef, useState } from 'react';
import { useSelector } from 'react-redux';

function Youtube() {
	const Vids = useSelector((store) => store.youtube.data);
	const open = useRef(null);
	// const [Vids, setVids] = useState([]);
	const [Index, setIndex] = useState(0);

	// useEffect(() => {
	// 	const key = 'AIzaSyBGee4MUXU3jusXj7YwDBzdXI5Sn3gAkIA';
	// 	const playlistId = 'PLY0voYdGZtAipraMUx-_pnepD9KKaUDdm';
	// 	const num = 8;
	// 	const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;

	// 	axios.get(url).then((json) => {
	// 		setVids(json.data.items);
	// 	});
	// }, []);

	// useEffect(() => {}, [Vids]);
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
