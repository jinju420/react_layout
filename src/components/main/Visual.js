import { memo, useEffect, useState, useRef } from 'react';
import axios from 'axios';
import List from './List';

function Visual() {
	const [Info, setInfo] = useState([]);
	const getData = async () => {
		const data = await axios.get(process.env.PUBLIC_URL + '/DB/data.json');
		setInfo(data.data.info);
	};
	const openFunc = useRef(null);

	useEffect(() => getData(), []);

	return (
		<section id='visual' className='myScroll'>
			<div className='inner'>
				{Info.map((el) => (
					<List key={el.tit} src={el.src} tit={el.tit} con={el.con} bg={el.bg} ref={openFunc} />
				))}
			</div>
		</section>
	);
}

export default memo(Visual);
