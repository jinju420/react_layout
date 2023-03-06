import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
function Footer() {
	return (
		<footer>
			<div className='inner'>
				<div className='wrap'>
					<article>
						<h1>Store</h1>
						<p>
							오프라인 스토어는 그랑핸드가 보여주고 싶은 모든 것이 담겨있는 공간입니다.
							<br /> 바쁜 일상 속 잠시 숨을 돌리는 시간과 경험이 됩니다.
						</p>
						<NavLink to='/contact' className='map'>
							<FontAwesomeIcon icon={faArrowRightLong} />
							오프라인 스토어 안내
						</NavLink>
					</article>
					<article>
						<h1>Newsletter</h1>
						<p>
							<input type='text' placeholder='이메일 주소를 입력해주세요.' />
						</p>

						<NavLink to='/contact' className='map'>
							<FontAwesomeIcon icon={faArrowRightLong} />
							뉴스레터 구독하기
						</NavLink>
					</article>
					<article>
						<h1>Support</h1>
						<p>
							<Link to='/notice'>공지사항</Link>
							<Link to='/brand'>회사소개</Link>
							<Link to='/contact'>오시는 길</Link>
						</p>
					</article>
				</div>
				<div className='ft_txt'>
					<div className='desc'>
						<NavLink to='/contact' className='sns'>
							<FontAwesomeIcon icon={faInstagram} />
						</NavLink>
						<span>
							Sometimes you win,
							<br />
							Sometimes you learn.
						</span>
						<p>
							향은 보이지도, 잡히지도 않지만, 우리에게 수많은 기억과 감정을 각인시키고, 나아가 우리
							삶 속에서 많은 부분을 결정합니다. 그랑핸드는 이러한 향의 가치를 믿으며, 이를 매개로 한
							끊임없는 시도를 통해 향의 일상화를 꿈꿉니다. 그랑핸드는 쉽게 소비되고 잊혀질 무언가가
							아닌, 보이지 않은 곳에서 뚜렷한 존재감으로 모든 사람들에게 우리의 마음과 온기를 전하고
							싶습니다.
						</p>
					</div>
				</div>
			</div>
			<p>Copyrightⓒ 2023 All rights reserved</p>
		</footer>
	);
}

export default Footer;
