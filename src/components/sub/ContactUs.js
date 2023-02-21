import Layout from '../common/Layout';
import { useRef, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faSquareInstagram } from '@fortawesome/free-brands-svg-icons';

function ContactUs() {
	//실제 윈도우객체에서 카카오객체를 비구조화할당으로 바로 할당
	//윈도우 객체 안에 kakao라는 키값을 변수로 활용하여 뽑아냄
	const { kakao } = window;
	const info = [
		{
			title: '마포 본점',
			latlng: new kakao.maps.LatLng(37.5559436, 126.9302956),
			imgUrl: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.maps.Size(88, 108),
			imgPos: { offset: new kakao.maps.Point(44, 54) },
			add: '서울 마포구 와우산로37길 9',
			tel: '02-333-6525',
		},
		{
			title: '서촌 지점',
			latlng: new kakao.maps.LatLng(37.5771945, 126.9730108),
			imgUrl: `${process.env.PUBLIC_URL}/img/marker2.png`,
			imgSize: new kakao.maps.Size(88, 108),
			imgPos: { offset: new kakao.maps.Point(44, 54) },
			add: '서울 종로구 자하문로4길 14-2',
			tel: '02-333-6525',
		},
		{
			title: '남산 지점',
			latlng: new kakao.maps.LatLng(37.5489259, 126.9822293),
			imgUrl: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.maps.Size(88, 108),
			imgPos: { offset: new kakao.maps.Point(44, 54) },
			add: '서울 용산구 후암동 358-194',
			tel: '02-333-6525',
		},
	];
	//지도 정보가 담길 가상돔 참조 객체
	const container = useRef(null);
	//traffic 레이어를 토글 시킬 state생성
	const [Traffic, setTraffic] = useState(false);
	const [Index, setIndex] = useState(0);
	//맵 인스턴스 컴포넌트내에서 자유롭게 사용하기 위한 state생성
	const [Location, setLocation] = useState(null);

	//지도의 위치값과 줌 레벨이 있는 옵션 객체
	const option = {
		center: info[Index].latlng,
		level: 3,
	};
	//마커이미지의 url,size,offset정보값 생성
	const imageSrc = info[Index].imgUrl;
	const imageSize = info[Index].imgSize;
	const imageOption = info[Index].imgPos;

	//마커위치 인스턴스 생성
	const markerPosition = option.center;
	//마커 이미지 인스턴스 생성
	const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
	//타입 컨트롤 인스턴스 생성
	const mapTypeControl = new kakao.maps.MapTypeControl();
	//줌컨트롤 인스턴스 생성
	const zoomControl = new kakao.maps.ZoomControl();
	//마커 지도위 생성
	const marker = new kakao.maps.Marker({
		position: markerPosition,
		image: markerImage,
	});

	useEffect(() => {
		container.current.innerHTML = '';
		//처음 마운트 됐을 때 한번만
		const mapInstance = new kakao.maps.Map(container.current, option);
		marker.setMap(mapInstance);
		setLocation(mapInstance);
		mapInstance.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
		mapInstance.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

		//지도 센터위치
		const setCenter = () => {
			mapInstance.setCenter(info[Index].latlng);
		};
		//지도 확대축소막기
		mapInstance.setZoomable(false);
		window.addEventListener('resize', setCenter);
		return () => {
			window.removeEventListener('resize', setCenter);
		};
	}, [Index]);

	useEffect(() => {
		//마커생성 호출구문	//교통정보표시
		//의존성 배열에 Traffic state를 등록하고 해당 값이 변경될때마다 traffic 레이어 분기처리
		//첫번째 렌더링 사이클시 Location값이 비어있을때는 실행하지 않고 해당 값이 있을때만 실행
		//(Optional Chaining) 객체?.메서드 (객체값이 있을때에만 해당 객체에 종속된 메서드 호출)
		Traffic
			? Location?.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: Location?.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);
	return (
		//클릭할때마다 변경 =. usestate
		<Layout name={'CONTACT'}>
			<h2>LOCATION</h2>
			<div className='sub'>
				<div className='sub_box'>
					<h3>On the way to Lorem ipsum dolor</h3>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor
						sit amet consectetur adipisicing elit.
					</p>
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
					{info.map((el, idx) => {
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
