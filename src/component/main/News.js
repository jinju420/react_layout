function New({ Scrolled, currentPos }) {
	const base = -window.innerHeight / 3;
	//스크롤값이 음수라면(아직 해당 컴포넌트에 도달하지 않음) 0으로 고정
	//스크롤 값이 음수값이 아니라면 양수라면 효과가 적용되도록
	//양수값으로 적용시키려는 식
	let scroll = Scrolled - base - currentPos || 0;
	//스크롤 값이 음수일 때 화면에 안보이거나 잘리는 현상을 없애기 위해서
	scroll < 0 && (scroll = 0);
	return (
		<section id='news' className='myScroll'>
			<h1 style={{ transform: `translateX(${scroll}px)` }}>News</h1>
			<h2
				style={{
					transform: `translateX(${100 + scroll * 2}px) scale(${1 + scroll / 50})`,
					opacity: 1 - scroll / 150,
				}}
			>
				안녕하세요
			</h2>
		</section>
	);
}

export default New;
