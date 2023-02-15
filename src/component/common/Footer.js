import { NavLink } from 'react-router-dom';

function Footer() {
	return (
		<footer>
			<div className='inner'>
				<div className='wrap'>
					<article className='map'>
						<NavLink to='/contact'>LOCATION</NavLink>
					</article>
					<article className='mail'>
						<NavLink to='/notice'>INQUIRY</NavLink>
					</article>
					<article className='sns'>
						<NavLink to='/contact'>SNS</NavLink>
					</article>
				</div>
				<div className='ft_txt'>
					<span>LJJSHLOVE@NAVER.COM</span>
					<p>Copyrightⓒ 2023 All rights reserved</p>
				</div>
				{/* <p>2023 &copy All Right RESERVED</p> */}
			</div>
		</footer>
	);
}

export default Footer;
