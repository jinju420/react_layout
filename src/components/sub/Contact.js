import Layout from '../common/Layout';
import { useRef, useEffect, useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faEnvelope, faPhoneVolume, faClock } from '@fortawesome/free-solid-svg-icons';

function ContactUs() {
	const init = useRef(true);
	const txt = useRef(false);
	//get in touch
	const initVal = useMemo(
		() => ({
			username: '',
			email: '',
			comments: '',
		}),
		[]
	);

	const [Val, setVal] = useState(initVal);
	const [Err, setErr] = useState({});
	const Submit = useRef(false);

	const check = (value) => {
		const errs = {};
		if (value.username === '') {
			errs.username = '이름을 입력하세요';
		}
		if (value.email === '' || !/@/.test(value.email)) {
			errs.email = '이메일 주소를 입력하세요';
		}
		if (value.comments.length < 10) {
			errs.comments = '10글자 이상 입력하세요';
		}
		return errs;
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setErr(check(Val));
		init.current = false;
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};
	//실제 윈도우객체에서 카카오객체를 비구조화할당으로 바로 할당
	const { kakao } = window;

	//지도 정보가 담길 가상돔 참조 객체
	const container = useRef(null);

	const [Traffic, setTraffic] = useState(false);
	const [Index, setIndex] = useState(0);

	const mapInstance = useRef(null);
	const option = useRef(null);
	const info = useRef(null);
	info.current = [
		{
			title: 'Mapo',
			latlng: new kakao.maps.LatLng(37.5559436, 126.9302956),
			imgUrl: `${process.env.PUBLIC_URL}/img/contact/marker1.png`,
			imgSize: new kakao.maps.Size(232, 73),
			imgPos: { offset: new kakao.maps.Point(116, 36) },
			add: '9, Wausan-ro 37-gil, Mapo-gu, Seoul',
			tel: '02-333-6525',
		},
		{
			title: 'SeoCheon',
			latlng: new kakao.maps.LatLng(37.5771945, 126.9730108),
			imgUrl: `${process.env.PUBLIC_URL}/img/contact/marker2.png`,
			imgSize: new kakao.maps.Size(232, 73),
			imgPos: { offset: new kakao.maps.Point(116, 36) },
			add: '14-2, Jahamun-ro 4-gil, Jongno-gu, Seoul',
			tel: '02-333-6525',
		},
		{
			title: 'NamSan',
			latlng: new kakao.maps.LatLng(37.5489259, 126.9822293),
			imgUrl: `${process.env.PUBLIC_URL}/img/contact/marker3.png`,
			imgSize: new kakao.maps.Size(232, 73),
			imgPos: { offset: new kakao.maps.Point(116, 36) },
			add: '358-194, Huam-dong, Yongsan-gu, Seoul',
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

	const markerPosition = option.current.center;
	const markerImage = useMemo(
		() => new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
		[kakao, imageOption, imageSrc, imageSize]
	);

	const mapTypeControl = useMemo(() => new kakao.maps.MapTypeControl(), [kakao]);
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

	useEffect(() => {
		const len = Object.keys(Err).length;
		if (len === 0 && Submit.current) {
			setVal(initVal);
			alert('전송이 완료되었습니다');
		}
	}, [Err, initVal]);

	//Index state변경될때마다 지도 인스턴스 새로 갱신 및 렌더링
	useEffect(() => {
		container.current.innerHTML = '';

		mapInstance.current = new kakao.maps.Map(container.current, option.current);
		marker.setMap(mapInstance.current);

		mapInstance.current.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
		mapInstance.current.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

		const setCenter = () => mapInstance.current.setCenter(info.current[Index].latlng);
		mapInstance.current.setZoomable(false);

		window.addEventListener('resize', setCenter);
		return () => window.removeEventListener('resize', setCenter);
	}, [Index, kakao, mapTypeControl, marker, zoomControl]);

	useEffect(() => {
		Traffic
			? mapInstance.current.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC)
			: mapInstance.current.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
		Traffic ? txt.current.classList.add('on') : txt.current.classList.remove('on');
	}, [Traffic, kakao]);

	return (
		<Layout name={'LOCATION'}>
			<div className='touch'>
				<div className='left'>
					<article>
						<FontAwesomeIcon icon={faLocationDot} />
						<h2>ADDRESS</h2>
						<p>9, Wausan-ro 37-gil, Mapo-gu, Seoul</p>
					</article>
					<article>
						<FontAwesomeIcon icon={faClock} />
						<h2>OPENING TIME</h2>
						<p>Mon - Fri / 9 to 6</p>
					</article>
					<article>
						<FontAwesomeIcon icon={faEnvelope} />
						<h2>E-MAIL</h2>
						<p>hello@granhand.com</p>
					</article>
					<article>
						<FontAwesomeIcon icon={faPhoneVolume} />
						<h2>PHONE</h2>
						<p>02-333-6525</p>
					</article>
				</div>
				<div className='right'>
					<div className='title'>
						<h1>Get In Touch</h1>
					</div>

					<form onSubmit={handleSubmit}>
						<fieldset></fieldset>
						<legend className='hide'>찾아오시는 길 폼 양식</legend>
						<div className='input_box'>
							<input
								type='submit'
								value='SEND'
								onClick={() => {
									Submit.current = true;
								}}
							/>
							<div className='input_touch'>
								<div className='input'>
									<label htmlFor='username'>NAME</label>
									<input type='text' id='username' name='username' value={Val.username} onChange={handleChange} />
									<span className='err'>{Err.username}</span>

									<label htmlFor='email'>E-MAIL</label>
									<input type='text' id='email' name='email' value={Val.email} onChange={handleChange} />
									<span className='err'>{Err.email}</span>
								</div>

								<div className='txtarea'>
									<label htmlFor='comments'>MESSAGE</label>
									<textarea
										cols='30'
										rows='5'
										placeholder='comments'
										name='comments'
										id='comments'
										onChange={handleChange}
										value={Val.comments}
									></textarea>
									<span className='err'>{Err.comments}</span>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
			<button ref={txt} onClick={() => setTraffic(!Traffic)}>
				{Traffic ? 'Traffic ON' : 'Traffic OFF'}
			</button>

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
