import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
/*
기존 공통레이아웃으로 각 서브페이지 분산되어있던 스타일을 Layout.js로 합쳐서 따로 분리
그리고 각각의 세부 컨텐츠들은 props라는 걸로 전달할 수 있도록 한다
리액트에서는 기능단위를 컴포넌트화 해서 분리하고 분리된 컴포넌트 안에서 함수를 선언한 뒤 export로 내보내고
해당 컴포넌트를 호출하는 곳에서 import해서 사용하는데 

출처: 공식싸이트
여는 태그와 닫는 태그가 있는 JSX표현에서는 두 태그 사이의 내용을 props.children으로 특수한 props로 넘겨줄수있습니다
같은 레이아웃안에 다른 내용을 보여줘야 할때, children을 사사용해서 효율적으로 Layout.js 컴포넌트를 재활용해서 각 서브페이지를 관리할수있다
*/
function Layout(props) {
	//props는 부모로부터 전달받은 인수값
	const frame = useRef(null); //queryselector 느낌/만들어지지않은 걸 선택
	//console.log(frame);
	const [Subimg, setSubimg] = useState([]);
	useEffect(() => {
		frame.current.classList.add('on');
		axios.get(`${process.env.PUBLIC_URL}/DB/sub.json`).then((json) => {
			console.log(json);
			setSubimg(json.data.sub);
		});
	}, [Subimg]); //[]비어있으면 build됐을 때 1반민
	return (
		// //frame안에 sec들어온것
		<section className={`content ${props.name}`} ref={frame}>
			<figure></figure>
			<div className='sub_con'>
				<div className='inner'>
					<h1>{props.name}</h1>
					{props.children}
					{/* 공통 레이아웃 이외의 것들 */}
				</div>
			</div>
		</section>
	);
}

export default Layout;
