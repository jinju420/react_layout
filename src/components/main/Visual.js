import { memo } from 'react';

function Visual() {
	return (
		<figure id='visual' className='myScroll'>
			<img src={`${process.env.PUBLIC_URL}/img/main.jpg`} alt='granhand' />
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

export default memo(Visual);
