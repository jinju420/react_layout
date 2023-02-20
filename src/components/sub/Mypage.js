import Layout from '../common/Layout';
import { useEffect, useState } from 'react';
function Mypage() {
	//name이라는 프로퍼티로 불러오기 위해
	const initVal = {
		userid: '',
		pwd1: '',
		pwd2: '',
		email: '',
	};

	/* */
	const [Val, setVal] = useState(initVal);
	const [Err, setErr] = useState({});
	const [Sumbit, setSumbit] = useState(false);

	//인증체크함수
	const check = (value) => {
		const errs = {};
		const eng = /[a-zA-Z]/;
		const num = /[0-9]/;
		const spc = /[~!@#$%^&*()]/;
		if (value.userid.length < 5) {
			errs.userid = '아이디를 5글자 이상 입력하세요';
		}
		if (
			value.pwd1.length < 5 ||
			!eng.test(value.pwd1) ||
			!num.test(value.pwd1) ||
			!spc.test(value.pwd1)
		) {
			errs.pwd1 = '비밀번호는 5글자 이상, 영문, 숫자, 특수문자를 모두 포함하세요';
		}
		if (value.pwd1 !== value.pwd2 || !value.pwd2) {
			errs.pwd2 = '두개의 비밀번호를 동일하게 입력하세요';
		}
		if (value.email.length < 8 || !/@/.test(value.email)) {
			errs.email = '이메일은 8글자 이상 @를 포함하세요';
		}
		return errs;
	};
	//인풋 요소에 변화가 생길때마다 val state업데이트 함수
	const handleChange = (e) => {
		const { name, value } = e.target;
		//현재 val값을 deep copy한 다음에 그중에 userid라는 키값의 value값만 계속 갱신
		setVal({ ...Val, [name]: value });
	};
	//전송 버튼 클릭시 인증 체크호출하고 에러메시지 생성 함수
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(check(Val));
		setErr(check(Val));
	};
	useEffect(() => {
		const len = Object.keys(Err).length;
		if (len === 0 && Sumbit) {
			alert('모든 인증을 통과했습니다');
			setVal(initVal);
		}
	}, [Err]);
	return (
		<Layout name={'JOIN'}>
			<form onSubmit={handleSubmit}>
				<fieldset></fieldset>
				<legend className='hide'>회원가입 폼 양식</legend>
				<table>
					<tbody>
						{/* userid */}
						<tr>
							<th scope='row'>
								<label htmlFor='userid'>USER ID</label>
							</th>
							<td>
								{/* 해당 input요소에 onchange이벤트가 발생할때마다 handleCnange함수 호출 */}
								<input
									type='text'
									name='userid'
									id='userid'
									placeholder='아이디를 입력하세요'
									onChange={handleChange}
									value={Val.userid}
								/>
								<span className='err'>{Err.userid}</span>
							</td>
						</tr>

						{/* password */}
						<tr>
							<th scope='row'>
								<label htmlFor='pwd1'>PASSWORD</label>
							</th>
							<td>
								<input
									type='password'
									name='pwd1'
									id='pwd1'
									placeholder='비밀번호를 입력하세요'
									onChange={handleChange}
									value={Val.pwd1}
								/>
								<span className='err'>{Err.pwd1}</span>
							</td>
						</tr>
						{/* re-password */}
						<tr>
							<th scope='row'>
								<label htmlFor='pwd2'>RE-PASSWORD</label>
							</th>
							<td>
								<input
									type='password'
									name='pwd2'
									id='pwd2'
									placeholder='비밀번호를 재입력하세요'
									onChange={handleChange}
									value={Val.pwd2}
								/>
								<span className='err'>{Err.pwd2}</span>
							</td>
						</tr>

						{/* email */}
						<tr>
							<th scope='row'>
								<label htmlFor='email'>E-MAIL</label>
							</th>
							<td>
								<input
									type='text'
									name='email'
									id='email'
									placeholder='이메일 주소를 입력하세요'
									onChange={handleChange}
									value={Val.email}
								/>
								<span className='err'>{Err.email}</span>
							</td>
						</tr>

						{/* btnSet */}
						<tr>
							<th colSpan='2'>
								<input
									type='reset'
									value='cancel'
									onClick={() => {
										setVal(initVal);
									}}
								/>
								<input
									type='submit'
									value='send'
									onClick={() => {
										setSumbit(true);
									}}
								/>
							</th>
						</tr>
					</tbody>
				</table>
				{/* <table>
					<caption className='hide'>
						회원가입을 위한 아이디, 비밀번호, 이메일, 나이 입력 테이블
					</caption>
				</table>
				<table>
					<caption className='hide'>
						회원가입을 위한 아이디, 비밀번호, 이메일, 나이 입력 테이블
					</caption>
				</table> */}
			</form>
		</Layout>
	);
}

export default Mypage;
