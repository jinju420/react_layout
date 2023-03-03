import { useEffect, useState } from 'react';

function News() {
	/*
	로컬스토리지의 데이터를 반환하는 함수
	로컬스토리지의 값이 있으면 해당 값을 다시 json형태로 변경해서 반환
	로컬스토리지의 값이 없으면 빈 배열을 반환
	*/
	const getLocalData = () => {
		const dummys = [
			{
				title: 'New Arrival',
				content:
					'2년 만에 그랑핸드에서 새로운 향과 제품을 선보입니다. 향은 보이지도, 잡히지도, 않지만, 우리에게 수많은 기억과 감정을 각인시키고, 나아가 우리 삶 속에서 많은 부분을 결정합니다',
			},
			{
				title: 'Susie Salmon',
				content:
					'달콤한 과일을 먹은 뒤의 낮잠, 그랑핸드는 향의 가치를 믿으며, 이를 매개로 한 끊임없는 시도를 통해 향의 일상화를 꿈꿉니다.',
			},
			{
				title: 'NOLL',
				content:
					'NOLL, 놀, MUNAKI 모나키, NUBE 누베로 구성된 세가지 퍼퓸 라인의 향을 만나보세요. 그랑핸드는 쉽게 소비되고 잊혀질 무언가가 아닌, 보이지 않는 곳에서 뚜력한 존재감으로 모든 사람들에게 우리의 마음과 온기를 전하고 싶습니다.',
			},
			// {
			// 	title: 'Slogan Milk Glass',
			// 	content: 'Sometimes you win, Sometimes you learn. New Renewal Oepn: GRANHAND Sogyeok',
			// },
		];

		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return dummys;
	};
	const [Posts] = useState(getLocalData());

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Posts));
	}, [Posts]);

	// const base = -window.innerHeight / 3;
	// let scroll = Scrolled - base - Pos || 0;
	// scroll < 0 && (scroll = 0);
	return (
		<section id='news' className='myScroll'>
			{/* <h1 style={{ transform: `translateX(${scroll}px)` }}>News</h1> */}
			<div className='inner'>
				<div className='title'>
					<h1>Recent Work</h1>
					{/* <span>What's New?</span> */}
				</div>
				<div className='post_box'>
					{Posts.map((post, idx) => {
						if (idx >= 6) return null;
						return (
							<article key={idx}>
								<h3>{post.title}</h3>
								<p>{post.content}</p>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}

export default News;
