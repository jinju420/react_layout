import Layout from '../common/Layout';
import axios from 'axios'; //fetch와 비슷한 개념
import { useState, useEffect } from 'react';
/*
리액트에서의 기본적인 제작 흐름
process.env.PUBLIC_URL => 퍼블릭폴더까지의 경로를 절대적으로 구하는 것
axios로 외부 데이터를 호출해서 useeffect의 의존성배열을 비워서 처음 마운트 될대 한번만
데이터를 요청
usestate를 이용해서 state로 데이터 관리하면서 담겨있는 값으로 동적 가상돔을 생성
*/
function Brand() {
	const [Members, setMembers] = useState([]);
	//처음 컴포넌트가 마운트 되었을 때 한번만 외부 데이터를 호출해서 state에 담음
	useEffect(() => {
		axios.get(`${process.env.PUBLIC_URL}/DB/member.json`).then((json) => {
			setMembers(json.data.members);
		});
	}, []);

	useEffect(() => {}, [Members]);
	return (
		<Layout name={'BRAND'}>
			<div className='about'>
				<p>
					'Inside the drawer, which had never been opened, there was a familiar smell of minutes between scarves, accessories, and
					various miscellaneous things. When I opened an old notebook with a coated four-leaf clover, there were names and phone
					numbers of my acquaintances written on one side, and a faded photo next to it showed a young woman who looked just like
					me in high heels in a sheep's clothing smiling broadly.'
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
