import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function News() {
	const getLocalData = () => {
		const dummys = [
			{
				title: 'New Arrival',
				content:
					'Grandhand is introducing a new scent and product for the first time in two years. Fragrance can not be seen, it can not be caught, it imprints on us a lot of memories and emotions, and it determines a lot in our lives.',
			},
			{
				title: 'Susie Salmon',
				content:
					'The nap after eating sweet fruits, Grandhand believes in the value of scent, and dreams of becoming a daily life of scent through constant attempts through it. It imprints a lot of memories and emotions, and it further determines a lot of things in our lives.',
			},
			{
				title: 'NOLL',
				content:
					'Meet the scent of three perfume lines: NOLL, NOL, MUNAKI Monaki, and NUBE Nouve. Grandhand wants to convey our hearts and warmth to everyone with a strong presence in invisible, not something that will be easily',
			},
			{
				title: 'Slogan Milk Glass',
				content: 'Sometimes you win, Sometimes you learn. New Renewal Oepn: GRANHAND Sogyeok',
			},
			{
				title: 'Susie Salmon',
				content:
					'Inside the drawer, which had never been opened, there was a familiar smell of minutes between scarves, accessories, and various miscellaneous things. When I opened an old notebook with a coated four-leaf clover',
			},
			{
				title: 'RoseWood',
				content:
					'There were names and phone numbers of my acquaintances written on one side, and a faded photo next to it showed a young woman who looked just like me in high heels in a sheeps clothing smiling broadly',
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

	return (
		<section id='news' className='myScroll'>
			<div className='inner'>
				<div className='title'>
					<h1>Recent Work</h1>
					<span>GRANHAND. Perfume Line</span>
				</div>
				<div className='post_box'>
					<Link to='/notice'>
						View More
						<FontAwesomeIcon icon={faArrowRightLong} />
					</Link>
					<div className='postContainer'>
						{Posts.map((post, idx) => {
							if (idx >= 7) return null;
							return (
								<article key={idx}>
									<h1>{'0' + (idx + 1)}</h1>
									<h3>{post.title}</h3>
									<p>{post.content.length > 100 ? post.content.substr(0, 80) + '...' : post.content}</p>
								</article>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}

export default News;
