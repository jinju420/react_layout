import { forwardRef, useRef } from 'react';
import Detail from './Detail';

const List = forwardRef((props, { src, tit, con, bg }) => {
	const listEl = useRef(null);
	const openFunc = useRef(null);

	const handleClick = () => {
		openFunc.current.open();
		listEl.current.classList.add('off');
	};
	return (
		<>
			<article className='list'>
				<div className='pic'>
					<img src={`${process.env.PUBLIC_URL}/img/${src}`} alt={tit} />
				</div>

				<div className='txt'>
					<h2>{tit}</h2>
					<span onClick={handleClick}>View Detail</span>
				</div>
			</article>

			<Detail ref={openFunc} listEl={listEl} tit={tit} con={con} src={src} bg={bg} />
		</>
	);
});

export default List;
