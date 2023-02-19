import Layout from '../common/Layout';
import { useRef, useEffect } from 'react';

function ContactUs() {
	//지도 정보가 담길 가상돔 참조 객체
	const container = useRef(null);
	//실제 윈도우객체에서 카카오객체를 비구조화할당으로 바로 할당
	//윈도우 객체 안에 kakao라는 키값을 변수로 활용하여 뽑아냄
	const { kakao } = window;
	//지도의 위치값과 줌 레벨이 있는 옵션 객체
	const option = {
		center: new kakao.maps.LatLng(35.1553121, 129.0644697),
		level: 3,
	};
	//마커위치 인스턴스 생성
	const markerPosition = option.center;
	//마커 지도위 생성
	const marker = new kakao.maps.Marker({
		position: markerPosition,
	});
	useEffect(() => {
		const mapInstance = new kakao.maps.Map(container.current, option);
		//마커생성 호출구문
		marker.setMap(mapInstance);
	}, []);
	return (
		<Layout name={'Contact'}>
			<div id='map' ref={container}></div>
			{/* <span className='address'></span>
			<span className='line'></span>
			<span className='mail'></span>
			<div className='sns'>
				<span></span>
				<span></span>
				<span></span>
			</div>

			<div id='map'></div>
			<div className='map_guide'>
				<ul className='traffic'>
					<li></li>
					<li></li>
				</ul>
				<ul className='store'>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div> */}
		</Layout>
	);
}

export default ContactUs;
