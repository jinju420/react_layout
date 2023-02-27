import Layout from '../common/Layout';
import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Mypage() {
	const history = useHistory();
	const initVal = {
		userid: '',
		pwd1: '',
		pwd2: '',
		email: '',
		sns: false,
		perfume: false,
		comments: '',
		age: '',
		mail: '',
	};

	/* 실시간 담아둘 공간*/
	const [Val, setVal] = useState(initVal);
	const [Err, setErr] = useState({});
	/*
	Submit버튼을 클릭했는지 확인하는 Submit정보를 기존처럼 State로 처리하면
	아래 useEFfect에 의존성 배열로 등록을 해야되고 의존성 배열 등록시 처음 컴포넌트 마운트시에 호출되며 전송버튼 클릭전에 회원가입 성공 경고창이 뜸
	해당 문제를 막기위해 Sumbit을 의존성 배열에 등록하지 않아도 되도록 useRef로 값 지정
	 */
	const Submit = useRef(false);

	//인증체크함수value값은 check(Val)에서 Val 값을 뜻함 Val == value
	const check = (value) => {
		//3. errs가 담길 빈 객체를 지역변수 errs로 만들어놓고
		const errs = {};
		const eng = /[a-zA-Z]/;
		const num = /[0-9]/;
		const spc = /[~!@#$%^&*()]/;
		//Val.userid.length < 5와 같음
		if (value.userid.length < 5) {
			//errs라는 빈 객체에 userid라는 키값(property를 만들어서)으로 해당 에러 메세지를 담고 조건에 부합되지 않으면 메시지를 errs객체에 담아놓고 errs객체를 리턴 init
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
		if (value.email === '' || value.mail === '') {
			errs.email = '이메일 주소를 입력하세요';
		}
		if (value.email === '' || value.mail === '') {
			errs.mail = '이메일 주소를 입력하세요';
		}
		// if (value.email.length < 8 || !/@/.test(value.email)) {
		// 	errs.email = '이메일은 8글자 이상 @를 포함하세요';
		// }
		//true가 아니면 === false일때
		if (!value.gender) {
			errs.gender = '성별을 선택하세요.';
		}
		//true가 아니면 === false일때
		if (!value.perfume) {
			errs.perfume = '좋아하는 종류를 하나만 선택해주세요';
		}
		if (value.comments.length < 20) {
			errs.comments = '20글자 이상 입력하세요';
		}
		if (value.age === '') {
			errs.age = '연령을 선택하세요';
		}
		//4.조건에 부합하지 않으면 errs빈환
		return errs;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	const handleRadio = (e) => {
		const { name } = e.target;
		const isChecked = e.target.checked;
		setVal({ ...Val, [name]: isChecked });
	};

	const handleCheck = (e) => {
		const { name } = e.target;
		let isChecked = false;
		const inputs = e.target.parentElement.querySelectorAll('input');

		inputs.forEach((el, idx) => el.checked && (isChecked = true));
		setVal({ ...Val, [name]: isChecked });
	};
	const handleSelect = (e) => {
		const { name } = e.target;
		const selected = e.target.value;
		setVal({ ...Val, [name]: selected });
	};
	//1. 전송 버튼 클릭시 handleSubmit실행 => 인증 체크호출하고 에러메시지 생성 함수
	const handleSubmit = (e) => {
		e.preventDefault();
	};

	useEffect(() => {
		const len = Object.keys(Err).length;

		if (len === 0 && Submit.current) {
			alert('회원가입이 완료되었습니다.');
			history.push('/');
		}
	}, [Err, history]);

	return (
		<Layout name={'MEMBERS'}>
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
								<select name='mail' id='mail' onChange={handleSelect}>
									<option value=''>이메일 주소를 선택해주세요</option>
									<option value='naver'>@naver.com</option>
									<option value='gmail'>@gmail.com</option>
									<option value='nate'>@nate.com</option>
								</select>
								<span className='err'>{Err.mail}</span>
							</td>
						</tr>

						{/* gender */}
						<tr>
							<th scope='row'>GENDER</th>
							<td>
								<input type='radio' name='gender' value='male' id='male' onChange={handleRadio} />
								<label htmlFor='male'>Male</label>

								<input
									type='radio'
									name='gender'
									value='female'
									id='female'
									onChange={handleRadio}
								/>
								<label htmlFor='female'>Female</label>

								<span className='err'>{Err.gender}</span>
							</td>
						</tr>

						{/* interest */}
						<tr>
							<th scope='row'>KIND OF</th>
							<td>
								<input
									type='checkbox'
									name='perfume'
									value='citrus'
									id='citrus'
									onChange={handleCheck}
								/>
								<label htmlFor='citrus'>Citrus</label>

								<input
									type='checkbox'
									name='perfume'
									value='floral'
									id='floral'
									onChange={handleCheck}
								/>
								<label htmlFor='floral'>Floral</label>

								<input
									type='checkbox'
									name='perfume'
									value='marine'
									id='marine'
									onChange={handleCheck}
								/>
								<label htmlFor='marine'>Marine</label>

								<input
									type='checkbox'
									name='perfume'
									value='musk'
									id='musk'
									onChange={handleCheck}
								/>
								<label htmlFor='musk'>Musk</label>

								<span className='err'>{Err.perfume}</span>
							</td>
						</tr>

						{/* age */}
						<tr>
							<th scope='row'>
								<label htmlFor='age'>Age</label>
							</th>
							<td>
								<select name='age' id='age' onChange={handleSelect}>
									<option value=''>연령을 선택하세요</option>
									<option value='teenage'>10대</option>
									<option value='twenties'>20대</option>
									<option value='thirties'>30대</option>
									<option value='forties'>40대 이상</option>
								</select>
								<span className='err'>{Err.age}</span>
							</td>
						</tr>

						{/* comments */}
						<tr>
							<th scope='row'>
								<label htmlFor='comments'>COMMENTS</label>
							</th>
							<td>
								<textarea
									name='comments'
									id='comments'
									cols='30'
									rows='5'
									placeholder='남기는 말을 입력하세요'
									onChange={handleChange}
									value={Val.comments}
								></textarea>
								<span className='err'>{Err.comments}</span>
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
										Submit.current = true;
									}}
								/>
							</th>
						</tr>
					</tbody>
				</table>
			</form>
		</Layout>
	);
}

export default Mypage;
