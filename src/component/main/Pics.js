function Pics({ Scrolled, Pos }) {
	const base = -window.innerHeight / 3;
	let scroll = Scrolled - base - Pos || 0;
	scroll < 0 && (scroll = 0);
	return (
		<section id='pics' className='myScroll'>
			<div className='inner'>
				<div className='title'>
					<h1
						style={{
							transform: `translateX(${scroll}px) scale(${1 + scroll / 60})`,
							opacity: 1 - scroll / 300,
						}}
					>
						Flickr
					</h1>
					<h2>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, inventore.
					</h2>
				</div>
				<div className='pic_box'>
					<article></article>
					<article></article>
					<article></article>
					<article></article>
				</div>
			</div>
		</section>
	);
}

export default Pics;
