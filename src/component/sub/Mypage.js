import Layout from '../common/Layout';

function Mypage() {
	return (
		<Layout name={'Join'}>
			<form action='result.html' method='get'>
				<fieldset></fieldset>
				<legend className='hide'></legend>
				<table>
					<caption className='hide'>
						회원가입을 위한 아이디, 비밀번호, 이메일, 나이 입력 테이블
					</caption>
				</table>
				<table>
					<caption className='hide'>
						회원가입을 위한 아이디, 비밀번호, 이메일, 나이 입력 테이블
					</caption>
				</table>
			</form>
		</Layout>
		// <Layout name={'Join us'}>
		// 	<p>회원가입</p>
		// </Layout>
		// <section className='content mypage'>
		// 	<figure></figure>
		// 	<div className='inner'>
		// 		<h1>Join us</h1>
		// 	</div>
		// </section>
	);
}

export default Mypage;
