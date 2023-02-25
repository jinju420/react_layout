import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Visual({ Scrolled, Pos }) {
	const [Opacity, setOpacity] = useState(false);
	useEffect(() => {}, []);
	return (
		<figure id='visual' className='myScroll'>
			<img src={`${process.env.PUBLIC_URL}/img/main.jpeg`} alt='화장품' />
			<div className='inner'>
				{/* <div className='title_txt'>
					<h1>LEEJINJU'S</h1>
					<p>
						PORTFOLIO
						<span>P</span>
						<span>O</span>
						<span>R</span>
						<span>T</span>
						<span>F</span>
						<span>O</span>
						<span>L</span>
						<span>I</span>
						<span>O</span>
					</p>
				</div> */}
			</div>
		</figure>
	);
}

export default Visual;
