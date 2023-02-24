import { useEffect, useState } from 'react';

function News({ Scrolled, Pos }) {
	/*
	로컬스토리지의 데이터를 반환하는 함수
	로컬스토리지의 값이 있으면 해당 값을 다시 json형태로 변경해서 반환
	로컬스토리지의 값이 없으면 빈 배열을 반환
	*/
	const getLocalData = () => {
		const dummys = [
			{
				title: 'New Arrival: Perfume Line',
				content: '2년 만에 그랑핸드에서 새로운 향과 제품을 선보입니다.',
			},
			{ title: 'Susie Salmon', content: '달콤한 과일을 먹은 뒤의 낮잠' },
			{
				title: 'NOLL',
				content:
					'NOLL, 놀, MUNAKI 모나키, NUBE 누베로 구성된 세가지 퍼퓸 라인의 향을 만나보세요.',
			},
			{ title: 'Slogan Milk Glass', content: 'Sometimes you win, Sometimes you learn.' },
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
