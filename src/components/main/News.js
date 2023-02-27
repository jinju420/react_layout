import { useEffect, useState } from 'react';

function News({ Scrolled, Pos }) {
	const getLocalData = () => {
		const dummys = [
			{
				num: '01',
				title: 'New Arrival',
				content:
					'2년 만에 그랑핸드에서 새로운 향과 제품을 선보입니다. 향은 보이지도, 잡히지도, 않지만, 우리에게 수많은 기억과 감정을 각인시키고, 나아가 우리 삶 속에서 많은 부분을 결정합니다',
			},
			{
				num: '02',
				title: 'Susie Salmon',
				content:
					'달콤한 과일을 먹은 뒤의 낮잠, 그랑핸드는 향의 가치를 믿으며, 이를 매개로 한 끊임없는 시도를 통해 향의 일상화를 꿈꿉니다.',
			},
			{
				num: '03',
				title: 'NOLL',
				content:
					'NOLL, 놀, MUNAKI 모나키, NUBE 누베로 구성된 세가지 퍼퓸 라인의 향을 만나보세요. 그랑핸드는 쉽게 소비되고 잊혀질 무언가가 아닌, 보이지 않는 곳에서 뚜력한 존재감으로 모든 사람들에게 우리의 마음과 온기를 전하고 싶습니다.',
			},
			{
				num: '04',
				title: 'Slogan Milk Glass',
				content: 'Sometimes you win, Sometimes you learn. New Renewal Oepn: GRANHAND Sogyeok',
			},
		];

		const data = localStorage.getItem('post');
		if (data) return JSON.parse(data);
		else return dummys;
	};
	const [Posts] = useState(getLocalData());

	useEffect(() => {
		localStorage.setItem('post', JSON.stringify(Posts));
	}, [Posts]);

	const base = -window.innerHeight / 3;
	let scroll = Scrolled - base - Pos || 0;
	scroll < 0 && (scroll = 0);
	return (
		<section id='news' className='myScroll'>
			<h1 style={{ transform: `translateX(${scroll}px)` }}>News</h1>
			<div className='inner'>
				{Posts.map((post, idx) => {
					if (idx >= 6) return null;
					return (
						<article key={idx}>
							<h1>{post.num}</h1>
							<h3>{post.title}</h3>
							<p>{post.content}</p>
						</article>
					);
				})}
			</div>
		</section>
	);
}

export default News;
