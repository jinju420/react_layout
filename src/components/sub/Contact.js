import Layout from '../common/Layout';
import { useRef, useEffect, useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faSquareInstagram } from '@fortawesome/free-brands-svg-icons';

function ContactUs() {
	//실제 윈도우객체에서 카카오객체를 비구조화할당으로 바로 할당
	//윈도우 객체 안에 kakao라는 키값을 변수로 활용하여 뽑아냄
	const { kakao } = window;

	//지도 정보가 담길 가상돔 참조 객체
	const container = useRef(null);
	//traffic 레이어를 토글 시킬 state생성
	const [Traffic, setTraffic] = useState(false);
	const [Index, setIndex] = useState(0);

	//mapInstance, option, info, container  state가 아닌 useRef로 담기
	//해당 값은 변하지 않는 정적인 정보이기 때문에 굳이 state에 담을 필요가 없음
	const mapInstance = useRef(null);
	const option = useRef(null);
	const info = useRef(null);
	info.current = [
		{
			title: '마포 본점',
			latlng: new kakao.maps.LatLng(37.5559436, 126.9302956),
			imgUrl: `${process.env.PUBLIC_URL}/img/contact/marker1.png`,
			imgSize: new kakao.maps.Size(232, 73),
			imgPos: { offset: new kakao.maps.Point(116, 36) },
			add: '서울 마포구 와우산로37길 9',
			tel: '02-333-6525',
		},
		{
			title: '서촌 지점',
			latlng: new kakao.maps.LatLng(37.5771945, 126.9730108),
			imgUrl: `${process.env.PUBLIC_URL}/img/contact/marker2.png`,
			imgSize: new kakao.maps.Size(232, 73),
			imgPos: { offset: new kakao.maps.Point(116, 36) },
			add: '서울 종로구 자하문로4길 14-2',
			tel: '02-333-6525',
		},
		{
			title: '남산 지점',
			latlng: new kakao.maps.LatLng(37.5489259, 126.9822293),
			imgUrl: `${process.env.PUBLIC_URL}/img/contact/marker3.png`,
			imgSize: new kakao.maps.Size(232, 73),
			imgPos: { offset: new kakao.maps.Point(116, 36) },
			add: '서울 용산구 후암동 358-194',
			tel: '02-333-6525',
		},
	];

	//지도의 위치값과 줌 레벨이 있는 옵션 객체
	option.current = {
		center: info.current[Index].latlng,
		level: 3,
	};
	//마커 생성을 위한 정보값 info로 부터 가져옴
	const imageSrc = info.current[Index].imgUrl;
	const imageSize = info.current[Index].imgSize;
	const imageOption = info.current[Index].imgPos;

	//마커위치 인스턴스 생성
	const markerPosition = option.current.center;
	//마커 이미지 인스턴스 생성
	const markerImage = useMemo(
		() => new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
		[kakao, imageOption, imageSrc, imageSize]
	);

	//타입 컨트롤 인스턴스 생성
	const mapTypeControl = useMemo(() => new kakao.maps.MapTypeControl(), [kakao]);
	//줌컨트롤 인스턴스 생성
	const zoomControl = useMemo(() => new kakao.maps.ZoomControl(), [kakao]);
	//마커 인스턴스에 이미지와 위치값 최종 세팅
	const marker = useMemo(
		() =>
			new kakao.maps.Marker({
				position: markerPosition,
				image: markerImage,
			}),
		[kakao, markerImage, markerPosition]
	);
	//Index state변경될때마다 지도 인스턴스 새로 갱신 및 렌더링
	useEffect(() => {
		container.current.innerHTML = '';
		//처음 마운트 됐을 때 한번만
		mapInstance.current = new kakao.maps.Map(container.current, option.current);
		marker.setMap(mapInstance.current);
		// setLocation(mapInstance);
		mapInstance.current.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
		mapInstance.current.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

		//지도 가운데 유지시키는 함수정의
		const setCenter = () => mapInstance.current.setCenter(info.current[Index].latlng);
		//지도 확대축소막기
		mapInstance.current.setZoomable(false);
		//윈도우 리사이즈시 setCenter 함수 이벤트 연결 및 제거
		window.addEventListener('resize', setCenter);
		return () => window.removeEventListener('resize', setCenter);
	}, [Index, kakao, mapTypeControl, marker, zoomControl]);

	useEffect(() => {
		//마커생성 호출구문	//교통정보표시
		//첫번째 렌더링 사이클시 Location값이 비어있을때는 실행하지 않고 해당 값이 있을때만 실행
		//(Optional Chaining) 객체?.메서드 (객체값이 있을때에만 해당 객체에 종속된 메서드 호출)
		Traffic
			? mapInstance.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: mapInstance.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic, kakao]);
	return (
		<Layout name={'LOCATION'}>
			{/* <h1>LOCATION</h1> */}
			<div className='sub'>
				<div className='sub_box'>
					<h3>On the way to GRANHAND</h3>
					<p>- NUBE, Perfume, GRANHAND.</p>
					<div className='sns'>
						<span>
							<FontAwesomeIcon icon={faFacebookF} />
						</span>
						<span>
							<FontAwesomeIcon icon={faTwitter} />
						</span>
						<span>
							<FontAwesomeIcon icon={faSquareInstagram} />
						</span>
					</div>
				</div>
				<button onClick={() => setTraffic(!Traffic)}>
					{Traffic ? 'Traffic OFF' : 'Traffic ON'}
				</button>
			</div>
			<div id='map' ref={container}></div>
			<nav>
				{/* info배열의 정보값에 따라 지점 보기 버튼을 생성 
				ul안에서 li를 반복돌려야되니까 ul안에 반복문 생성*/}
				<ul className='branch'>
					{info.current.map((el, idx) => {
						return (
							<li
								key={idx}
								className={Index === idx ? 'on' : ''}
								onClick={() => {
									setIndex(idx);
									setTraffic(false);
								}}
							>
								{el.title}
								<p>{el.add}</p>
								<span>{el.tel}</span>
							</li>
						);
					})}
				</ul>
			</nav>
		</Layout>
	);
}

export default ContactUs;
