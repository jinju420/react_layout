import { memo } from 'react';

function Visual() {
	return (
		<figure id='visual' className='myScroll'>
			<div className='inner'>
				<div className='title'>
					<h1>
						FIND
						<br />
						YOUT
						<br />
						STYLE
						{/* Sometimes You Win Sometimes <br />
						You Learn : Inside the drawer, <br />
						which had never been opened <br />
						there was a familiar smell */}
						{/* of minutes between scarves accessories */}
						{/* VIOLETTE */}
						{/* <br />
						NUBE */}
					</h1>
					<span>PERFUME : VIOLETTE NUBE_</span>
					<div className='des_txt'>
						<p>
							Sometimes You Win Sometimes You Learn : When I opened an old notebook with a coated
							four-leaf clover, phone numbers of my acquaintances written on one side, and a faded
							photo next to it showed a young woman who looked just like me in high heels
						</p>
						{/* <p>
							Sometimes You Win Sometimes You Learn : Inside the drawer, which had never been
							opened, there was a familiar smell of minutes between scarves accessories , and
							various miscellaneous things and clothing smiling broadly
						</p> */}
					</div>
					{/* 
					<div className='desc'>
						<p>
							When I opened an old notebook with a coated four-leaf clover, there were names and
							phone numbers of my acquaintances written on one side, and a faded photo next to it
							showed a young woman who looked just like me
							in high heels
						</p>
						<p>
							Sometimes You Win Sometimes You Learn : Inside the drawer, which had never been
							opened, there was a familiar smell of minutes between scarves accessories , and
							various miscellaneous things and clothing
							smiling broadly
						</p>
					</div> */}
					{/* <span> Sometimes You Win Sometimes You Learn :</span>
					<p>
						<span> Sometimes You Win, Sometimes You Learn : </span>
						'Inside the drawer, which had never been opened, there was a familiar smell of <br />
						minutes between scarves accessories, and various miscellaneous things' */}
					{/* </p> */}
				</div>
				<div className='img'>
					<img src={`${process.env.PUBLIC_URL}/img/mainVis.jpeg`} alt='granhand' />
				</div>
			</div>
		</figure>
	);
}

export default memo(Visual);
