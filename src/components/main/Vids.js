import { memo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from '../common/Modal';

function Vids() {
	const { youtube } = useSelector((store) => store.youtubeReducer);
	const open = useRef(null);
	const [Index, setIndex] = useState(0);

	return (
		<>
			<section id='vids' className='myScroll'>
				<h1>Youtube</h1>
				<div className='inner'>
					{youtube.map((vid, idx) => {
						if (idx >= 4) return null;
						const tit = vid.snippet.title;
						const desc = vid.snippet.description;
						const date = vid.snippet.publishedAt;
						return (
							<article key={vid.id}>
								<div
									className='pic'
									onClick={() => {
										open.current.setOpen();
										setIndex(idx);
									}}
								>
									<img src={vid.snippet.thumbnails.medium.url} alt={vid.snippet.title} />
								</div>
								<div className='txt'>
									<h3>{tit.length > 40 ? tit.substr(0, 30) + '...' : tit}</h3>
									<p>{desc.length > 100 ? desc.substr(0, 80) + '...' : desc}</p>
									<span>{date.split('T')[0]}</span>
								</div>
							</article>
						);
					})}
				</div>
			</section>

			<Modal ref={open}>
				<div className='frame'>
					<iframe
						title={youtube[Index]?.id}
						src={`https://www.youtube.com/embed/${youtube[Index]?.snippet.resourceId.videoId}`}
					></iframe>
				</div>
			</Modal>
		</>
	);
}

export default memo(Vids);
