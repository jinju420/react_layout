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
				<h2>ABOUT US</h2>
				<p>
					'한 번도 열어본 적 없던 서랍 안에선 스카프와 장신구, 각종 잡동사니 사이로 익숙한
					분 냄새가 일었다. 코팅된 네잎클로버가 끼워진 오래된 수첩을 펴자 한 쪽에는 손으로
					쓴 지인들의 이름과 전화번호가 적혀있었고, 그 옆에 놓은 빛바랜 사진에는 양장에
					하이힐을 신은 나와 꼭 닮은 젊은 여자가 활짝 웃고 있었다.'
					<span>- NUBE, Perfume, GRANHAND.</span>
					{/* <span>- NUBE, Perfume, GRANHAND.</span> */}
					{/* 오브젝트 브랜드는 [생각에서 비롯된 사물] 이라는 접근을 통해 일상에서 사용하는
					사물을 재해석해 소비자의 행동에 작은 변화를 이끌어냅니다. 또한 물건을 오랫동안
					사용할 수 있는 방법을 고민하고 이를 다양한 고객 접점의 서비스와 상품개발을 통해
					제안합니다. 오브젝트 브랜드는 사물의 의미를 재해석하고 현명한 소비로 나아가지는
					브랜드입니다. */}
				</p>
			</div>
			<div className='members'>
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
