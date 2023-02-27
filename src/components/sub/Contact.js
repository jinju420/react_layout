import Layout from '../common/Layout';
import { useRef, useEffect, useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faSquareInstagram } from '@fortawesome/free-brands-svg-icons';

function ContactUs() {
	const { kakao } = window;

	const [Traffic, setTraffic] = useState(false);
	const [Index, setIndex] = useState(0);

	const container = useRef(null);
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

	option.current = {
		center: info.current[Index].latlng,
		level: 3,
	};

	const imageSrc = info.current[Index].imgUrl;
	const imageSize = info.current[Index].imgSize;
	const imageOption = info.current[Index].imgPos;

	const markerPosition = option.current.center;

	const markerImage = useMemo(
		() => new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
		[kakao, imageOption, imageSrc, imageSize]
	);

	const mapTypeControl = useMemo(() => new kakao.maps.MapTypeControl(), [kakao]);
	const zoomControl = useMemo(() => new kakao.maps.ZoomControl(), [kakao]);

	//화살표뒤에 {}가 생략되어있으면 화살표 다음에 있는 값을 **무조건 리턴!한다는 뜻({}가 생략되어있으면 자동적으로 내보냄)/{}return생략한게 =>뒤에 바로 있는 코드임/만약에 {}가 있다면 return을 써줘야 반환됨
	const marker = useMemo(
		() =>
			new kakao.maps.Marker({
				position: markerPosition,
				image: markerImage,
			}),
		[kakao, markerImage, markerPosition]
	);

	useEffect(() => {
		container.current.innerHTML = '';

		mapInstance.current = new kakao.maps.Map(container.current, option.current);

		marker.setMap(mapInstance.current);
		// setLocation(mapInstance);

		mapInstance.current.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
		mapInstance.current.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

		mapInstance.current.setZoomable(false);

		const setCenter = () => mapInstance.current.setCenter(info.current[Index].latlng);

		window.addEventListener('resize', setCenter);
		return () => window.removeEventListener('resize', setCenter);
	}, [Index, kakao, mapTypeControl, marker, zoomControl]);

	useEffect(() => {
		Traffic
			? mapInstance.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: mapInstance.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	}, [Traffic, kakao]);
	return (
		<Layout name={'CONTACT'}>
			<h2>LOCATION</h2>
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
				{/* 버튼 클릭시 트래픽 레이어 토글 */}
				<button onClick={() => setTraffic(!Traffic)}>
					{Traffic ? 'Traffic OFF' : 'Traffic ON'}
				</button>
			</div>
			<div id='map' ref={container}></div>
			<nav>
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
