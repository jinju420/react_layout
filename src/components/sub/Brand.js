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

	useEffect(() => {
		// console.log(Members);
	}, [Members]); //member가 바뀔때마다 렌더링
	return (
		<Layout name={'BRAND'}>
			<div className='about'>
				<h2>ABOUT US</h2>
				{/* <h2>
					About<span> Object</span>
				</h2> */}
				<p>
					오브젝트 브랜드는 [생각에서 비롯된 사물] 이라는 접근을 통해 일상에서 사용하는
					사물을 재해석해 소비자의 행동에 작은 변화를 이끌어냅니다. 또한 물건을 오랫동안
					사용할 수 있는 방법을 고민하고 이를 다양한 고객 접점의 서비스와 상품개발을 통해
					제안합니다. 오브젝트 브랜드는 사물의 의미를 재해석하고 현명한 소비로 나아가지는
					브랜드입니다.
				</p>
			</div>
			{/* <div className='mamber'>
				<h2>MEMBER</h2>
			</div> */}
			{/* 리액트에서 js문법을 사용할 때 {}안에 적는다 */}
			{Members.map((el, idx) => {
				const [name, sirName] = el.name.split(' ');
				return (
					<article key={idx}>
						<div className='inner'>
							<div className='pic'>
								<img
									src={`${process.env.PUBLIC_URL}/img/${el.pic}`}
									alt={el.name}
								/>
							</div>
							<div className='txt'>
								<h2>
									{name}
									<br />
									{sirName}
								</h2>
								<span>{el.position}</span>
							</div>
						</div>
					</article>
				);
			})}
		</Layout>
	);
}

export default Brand;
