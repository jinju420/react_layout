import Layout from '../common/Layout';

function Notice() {
	return (
		<Layout name={'NOTICE'}>
			<div className='wrap'>
				<article>
					<table>
						<caption className='hide'>notice게시글 공지사항</caption>
						{/* <thead>
							<tr>
								<th scope='col'>NO.1</th>
								<th scope='col'>NOTICE</th>
								<th scope='col'>NAME</th>
								<th scope='col'>DATE</th>
							</tr>
						</thead>
						<tbody>
							<tr></tr>
							<tr></tr>
							<tr></tr>
							<tr></tr>
							<tr></tr>
							<tr></tr>
							<tr></tr>
							<tr></tr>
							<tr></tr>
						</tbody> */}
					</table>
				</article>
				<div className='pagination'>
					<p className='num'></p>
				</div>
			</div>
		</Layout>
		// <section className='content notice'>
		// 	<figure></figure>
		// 	<div className='inner'>
		// 		<h1>Notice</h1>
		// 	</div>
		// </section>
	);
}

export default Notice;
