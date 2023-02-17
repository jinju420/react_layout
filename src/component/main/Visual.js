import axios from 'axios';
import React from 'react';
// import { useState, useEffect } from 'react';

function Visual() {
	// const [Visual, setVisual] = useState([]);
	// useEffect(() => {
	// 	axios.get(`${process.env.PUBLIC_URL}/subVisual/main.jpg`).then((json) => {
	// 		setVisual(json.config.url);
	// 	});
	// }, []);
	return (
		<figure id='visual' className='myScroll'>
			<img src={`${process.env.PUBLIC_URL}/sub/sub1.jpg`} alt='화장품' />
			<div className='inner'>
				{/* <div className='title_txt'>
					<h1>LEEJINJU'S</h1>
					<div className='intoTxt'>
						<span>P</span>
						<span>O</span>
						<span>R</span>
						<span>T</span>
						<span>F</span>
						<span>O</span>
						<span>L</span>
						<span>I</span>
						<span>O</span>
					</div>
				</div> */}
			</div>
		</figure>
	);
}

export default Visual;
