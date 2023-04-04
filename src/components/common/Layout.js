import { useEffect, useRef } from 'react';

function Layout(props) {
	const frame = useRef(null);
	useEffect(() => {
		frame.current.classList.add('on');
		window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
	}, []);
	return (
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
