import Layout from '../common/Layout';

function Gallery() {
	return (
		<Layout name={'Gallery'}>
			{/* <div className='tab_title'>
				<h2>POPULAR</h2>
				<h2>YOUTUBE</h2>
			</div> */}
			<div className='tab_cont'>
				<div className='cont vids'>
					<article>1</article>
					<article>2</article>
					<article>3</article>
					<article>4</article>
					<article>5</article>
					<article>6</article>
				</div>
				<div className='cont gal'>
					<article>1</article>
					<article>2</article>
					<article>3</article>
					<article>4</article>
					<article>5</article>
					<article>6</article>
				</div>
			</div>
		</Layout>
		// <section className='content gallery'>
		// 	<figure></figure>
		// 	<div className='inner'>
		// 		<h1>Gallery</h1>
		// 	</div>
		// </section>
	);
}

export default Gallery;
