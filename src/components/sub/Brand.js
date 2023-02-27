import Layout from '../common/Layout';
import axios from 'axios'; //fetch와 비슷한 개념
import { useState, useEffect } from 'react';

function Brand() {
	const [Members, setMembers] = useState([]);

	useEffect(() => {
		axios.get(`${process.env.PUBLIC_URL}/DB/member.json`).then((json) => {
			setMembers(json.data.members);
		});
	}, []);

	useEffect(() => {}, [Members]);
	return (
		<Layout name={'BRAND'}>
			<div className='about'>
				<h2>ABOUT US</h2>
				<p>
					'Inside the drawer, which had never been opened, there was a familiar smell of minutes
					between scarves, accessories, and various miscellaneous things. When I opened an old
					notebook with a coated four-leaf clover, there were names and phone numbers of my
					acquaintances written on one side, and a faded photo next to it showed a young woman who
					looked just like me in high heels in a sheep's clothing smiling broadly.'
					<span>- NUBE, Perfume, GRANHAND.</span>
				</p>
			</div>
			<div className='members'>
				{Members.map((el, idx) => {
					const [name, sirName] = el.name.split(' ');
					return (
						<article key={idx}>
							<div className='inner'>
								<div className='pic'>
									<img src={`${process.env.PUBLIC_URL}/img/brand/${el.pic}`} alt={el.name} />
								</div>
								<div className='txt'>
									<h2>
										{name}
										<br />
										{sirName}
									</h2>
									<em>{el.position}</em>
									<span className='mail'>{el.mail}</span>
									<p>{el.txt}</p>
								</div>
							</div>
						</article>
					);
				})}
			</div>
		</Layout>
	);
}

export default Brand;
