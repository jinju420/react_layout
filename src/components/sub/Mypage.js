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
	// console.log(Err);
	const [Sumbit, setSumbit] = useState(false);

	//인증체크함수value값은 check(Val)에서 Val 값을 뜻함
	//value값으로 Val state가 전달되고 있음/파라미터로 전달되고 있는 Val == value값에
	const check = (value) => {
		//errs가 담길 빈 객체를 지역변수 errs로 만들어놓고
		const errs = {};
		console.log(errs);
		const eng = /[a-zA-Z]/;
		const num = /[0-9]/;
		const spc = /[~!@#$%^&*()]/;
		//Val.userid.length < 5와 같음
		if (value.userid.length < 5) {
			//errs라는 빈 객체에 userid라는 키값(property를 만들어서)으로 해당 에러 메세지를 담고 조건에 부합되지 않으면 메시지를 errs객체에 담아놓고 errs객체를 리턴
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
		//pwd1과pwd2의 값이 같지 않거나 pwd2의 값이 없을 때
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
		/*문자,숫자,boolean값 같은 원시형 자료를 바꿀때에는 바로 값을 바꾸면 되지만
		참조형(배열,객체)같은 값은 원본이 바뀌기때문에 copy 꼭 하기!원본 유지/복사본 변경위해 deep copy*/
		setVal({ ...Val, [name]: value });
	};
	//전송 버튼 클릭시 handleSubmit실행 => 인증 체크호출하고 에러메시지 생성 함수
	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(check(Val));
		//errs객체가 만들어진 return값을 setErr변경 스테이트 함수에 담아서 조건에 부합하지 않으면 Err스테이트 나타남
		setErr(check(Val));
	};
	useEffect(() => {
		//객체의 키값 반복돌기
		//객체의 키값이 하나도 없으면 인증 통과
		const len = Object.keys(Err).length;
		//len의 키값이 0이고 submit값이 true여아지만 인증통과/send버튼을 한번 이상 클릭했을 때
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
