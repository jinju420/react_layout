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
							The offline store is a space that contains everything Grand Hand wants to show.
							<br />
							It becomes a time and experience to catch your breath for a while in your busy daily life.
						</p>
						<NavLink to='/contact' className='map'>
							<FontAwesomeIcon icon={faArrowRightLong} />
							Offline Store Guidance
						</NavLink>
					</article>
					<article>
						<h1>Newsletter</h1>
						<p>
							<input type='text' placeholder='Your email address.' />
						</p>

						<NavLink to='/notice' className='map'>
							<FontAwesomeIcon icon={faArrowRightLong} />
							Newsletter
						</NavLink>
					</article>
					<article>
						<h1>Support</h1>
						<p>
							<Link to='/notice'>Notice</Link>
							<Link to='/brand'>Brand</Link>
							<Link to='/contact'>Contact</Link>
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
							Inside the drawer, which had never been opened, there was a familiar smell of minutes between scarves, accessories,
							and various miscellaneous things. When I opened an old notebook with a coated four-leaf clover, there were names and
							phone numbers of my acquaintances written on one side, and a faded photo next to it showed a young woman who looked.
						</p>
					</div>
				</div>
			</div>
			<p>Copyrightⓒ 2023 All rights reserved</p>
		</footer>
	);
}

export default Footer;
