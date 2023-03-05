import { memo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import Modal from '../common/Modal';

function Vids() {
	const { youtube } = useSelector((store) => store.youtubeReducer);
	const open = useRef(null);
	const [Index, setIndex] = useState(0);

	return (
		<>
			<section id='vids' className='myScroll'>
				<div className='inner'>
					<div className='title'>
						<h1>
							about perfume
							<br />
							collection
						</h1>
						<span>Perfume Flower</span>
					</div>
					<div className='vid_box'>
						{youtube.map((vid, idx) => {
							if (idx >= 6) return null;
							const tit = vid.snippet.title;
							const desc = vid.snippet.description;
							return (
								<article key={vid.id}>
									<div
										className='pic'
										onClick={() => {
											open.current.setOpen();
											setIndex(idx);
										}}
									>
										{/* <FontAwesomeIcon icon={faYoutube} /> */}
										<img src={vid.snippet.thumbnails.medium.url} alt={vid.snippet.title} />
									</div>
									<div className='txt'>
										<h3>{tit.length > 40 ? tit.substr(0, 30) + '...' : tit}</h3>
										<p>{desc.length > 100 ? desc.substr(0, 80) + '...' : desc}</p>
									</div>
								</article>
							);
						})}
					</div>
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
