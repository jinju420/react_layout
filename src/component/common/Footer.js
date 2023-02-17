import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { faSquareInstagram } from '@fortawesome/free-brands-svg-icons';
function Footer() {
	return (
		<footer>
			<div className='inner'>
				<div className='wrap'>
					<article>
						<NavLink to='/contact' className='map'>
							<FontAwesomeIcon icon={faMapLocationDot} />
						</NavLink>
						<span>LOCATION</span>
					</article>
					<article>
						<NavLink to='/notice' className='mail'>
							<FontAwesomeIcon icon={faCircleQuestion} />
						</NavLink>
						<span>INQUIRY</span>
					</article>
					<article>
						<NavLink to='/contact' className='sns'>
							<FontAwesomeIcon icon={faSquareInstagram} />
						</NavLink>
						<span>SNS</span>
					</article>
				</div>
			</div>
			<div className='ft_txt'>
				<span>LJJSHLOVE@NAVER.COM</span>
				<p>Copyrightⓒ 2023 All rights reserved</p>
			</div>
		</footer>
	);
}

export default Footer;
