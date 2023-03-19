import { useEffect, useRef } from 'react';

function Layout(props) {
	//props는 부모로부터 전달받은 인수값
	const frame = useRef(null); //queryselector 느낌/만들어지지않은 걸 선택
	useEffect(() => {
		frame.current.classList.add('on');
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}, []);
	return (
		// //frame안에 sec들어온것
		<section className={`content ${props.name}`} ref={frame}>
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
