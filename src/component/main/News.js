function News({ Scrolled, Pos }) {
	// console.log('scrolled', Scrolled);
	return (
		<section id='news' className='myScroll'>
			<h1 style={{ transform: `translateX(${Scrolled - Pos}px)` }}>News</h1>
			{/* <h2 style={{ transform: `translateX(${(Scrolled - Pos) * 3}px)` }}>News</h2> */}
			<div className='inner'>
				<article>
					<h2>Title comes here</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
						excepturi.
					</p>
				</article>
				<article>
					<h2>Title comes here</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
						excepturi.
					</p>
				</article>
				<article>
					<h2>Title comes here</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
						excepturi.
					</p>
				</article>
				<article>
					<h2>Title comes here</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
						excepturi.
					</p>
				</article>
				<article>
					<h2>Title comes here</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
						excepturi.
					</p>
				</article>
				<article>
					<h2>Title comes here</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
						excepturi.
					</p>
				</article>
				<article>
					<h2>Title comes here</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
						excepturi.
					</p>
				</article>
				<article>
					<h2>Title comes here</h2>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium,
						excepturi.
					</p>
				</article>
			</div>
		</section>
	);
}

export default News;
