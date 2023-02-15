import Layout from '../common/Layout';

function ContactUs() {
	return (
		<Layout name={'Contact'}>
			<span className='address'></span>
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
			</div>
		</Layout>
		// <section className='content contactUs'>
		// 	<figure></figure>
		// 	<div className='inner'>
		// 		<h1>Contact Us</h1>
		// 	</div>
		// </section>
	);
}

export default ContactUs;
