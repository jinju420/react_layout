import Layout from '../common/Layout';
import { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faSquareInstagram } from '@fortawesome/free-brands-svg-icons';

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

	const [Val, setVal] = useState(initVal);
	const [Err, setErr] = useState({});
	const Submit = useRef(false);

	const check = (value) => {
		const errs = {};
		const eng = /[a-zA-Z]/;
		const num = /[0-9]/;
		const spc = /[~!@#$%^&*()]/;

		if (value.userid.length < 5) {
			errs.userid = '아이디를 5글자 이상 입력하세요';
		}
		if (value.pwd1.length < 5 || !eng.test(value.pwd1) || !num.test(value.pwd1) || !spc.test(value.pwd1)) {
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
		if (!value.gender) {
			errs.gender = '성별을 선택하세요.';
		}

		if (!value.perfume) {
			errs.perfume = '좋아하는 종류를 하나만 선택해주세요';
		}
		if (value.comments.length < 20) {
			errs.comments = '20글자 이상 입력하세요';
		}
		if (value.age === '') {
			errs.age = '연령을 선택하세요';
		}
		//조건에 부합하지 않으면 errs빈환
		return errs;
	};
	//인풋 요소에 변화가 생길때마다 val state업데이트 함수
	const handleChange = (e) => {
		const { name, value } = e.target;
		setVal({ ...Val, [name]: value });
	};

	//라디오버튼 체크시 Val state업데이트 함수
	const handleRadio = (e) => {
		const { name } = e.target;
		const isChecked = e.target.checked;
		setVal({ ...Val, [name]: isChecked });
	};

	//체크박스 체크 시 Val state업데이트 함수
	const handleCheck = (e) => {
		const { name } = e.target;
		let isChecked = false;
		const inputs = e.target.parentElement.querySelectorAll('input');

		//모든 체크박스 반복을 돌면서 하나라도 체크된게 있으면 true값으로 변경 후 리턴
		inputs.forEach((el, idx) => el.checked && (isChecked = true));
		setVal({ ...Val, [name]: isChecked });
	};

	const handleSelect = (e) => {
		const { name } = e.target;
		const selected = e.target.value;
		setVal({ ...Val, [name]: selected });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setErr(check(Val));
	};

	useEffect(() => {
		const len = Object.keys(Err).length;
		//len의 키값이 0이고 submit값이 true여아지만 인증통과/send버튼을 한번 이상 클릭했을 때
		if (len === 0 && Submit.current) {
			alert('회원가입이 완료되었습니다.');
			history.push('/');
		}
	}, [Err, history]);

	return (
		<Layout name={'MEMBERS'}>
			<div className='mypage'>
				<div className='aside'>
					<h3>
						The first step is
						<br />
						just to reach out.
					</h3>
					<p>
						NUBE, Perfume, GRANHAND.
						<br />
						Join with GRANHAND.
					</p>
					<div className='sns'>
						<span>
							<FontAwesomeIcon icon={faFacebookF} />
						</span>
						<span>
							<FontAwesomeIcon icon={faTwitter} />
						</span>
						<span>
							<FontAwesomeIcon icon={faSquareInstagram} />
						</span>
					</div>
				</div>
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

									<input type='radio' name='gender' value='female' id='female' onChange={handleRadio} />
									<label htmlFor='female'>Female</label>

									<span className='err'>{Err.gender}</span>
								</td>
							</tr>

							{/* interest */}
							<tr>
								<th scope='row'>KIND OF</th>
								<td>
									<input type='checkbox' name='perfume' value='citrus' id='citrus' onChange={handleCheck} />
									<label htmlFor='citrus'>Citrus</label>

									<input type='checkbox' name='perfume' value='floral' id='floral' onChange={handleCheck} />
									<label htmlFor='floral'>Floral</label>

									<input type='checkbox' name='perfume' value='marine' id='marine' onChange={handleCheck} />
									<label htmlFor='marine'>Marine</label>

									<input type='checkbox' name='perfume' value='musk' id='musk' onChange={handleCheck} />
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
			</div>
		</Layout>
	);
}

export default Mypage;
