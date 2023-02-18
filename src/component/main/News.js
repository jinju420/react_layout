function News({ Scrolled, Pos }) {
	// console.log('scrolled', Scrolled);
	return (
		<section id='news' className='myScroll'>
			<h1 style={{ transform: `translateX(${Scrolled - Pos}px)` }}>News</h1>
			{/* <h2 style={{ transform: `translateX(${(Scrolled - Pos) * 3}px)` }}>News</h2> */}
			<article></article>
			<article></article>
			<article></article>
			<article></article>
			<article></article>
			<article></article>
			<article></article>
			<article></article>
			<article></article>
			<article></article>
		</section>
	);
}

export default News;
