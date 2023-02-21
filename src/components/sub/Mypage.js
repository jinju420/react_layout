import Layout from '../common/Layout';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Mypage() {
	const history = useHistory();
	//name이라는 프로퍼티로 불러오기 위해
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

	/* 실시간 담아둘 공ㅏ*/
	const [Val, setVal] = useState(initVal);
	const [Err, setErr] = useState({});
	// console.log(Err);
	const [Sumbit, setSumbit] = useState(false);

	/*
 	매개변수(파라미터) - 특정 값을 함수 내부로 전달해주는 통로명 = (value)
	인수(argument)- 해당 통로를 통해서 전달되는 값 = Val
	*/

	//인증체크함수value값은 check(Val)에서 Val 값을 뜻함
	//value값으로 Val state가 전달되고 있음/파라미터로 전달되고 있는 Val == value값에
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
		if (value.mail === '') {
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
	//인풋 요소에 변화가 생길때마다 val state업데이트 함수
	const handleChange = (e) => {
		const { name, value } = e.target;
		//현재 val값을 deep copy한 다음에 그중에 userid라는 키값의 value값만 계속 갱신
		/*문자,숫자,boolean값 같은 원시형 자료를 바꿀때에는 바로 값을 바꾸면 되지만
		참조형(배열,객체)같은 값은 원본이 바뀌기때문에 copy 꼭 하기!원본 유지/복사본 변경위해 deep copy/ 덮어쓰기 실시간으로*/
		setVal({ ...Val, [name]: value });
	};

	//라디오버튼 체크시 Val state업데이트 함수
	const handleRadio = (e) => {
		const { name } = e.target;
		//체크가 되면 checked가 된다.
		//둘중에 무조건 하나만 선택이기 때문에 초기값에 false넣어놓는것 반복돌릴 필요가 없어서
		//체크박스처럼 false로 해 놓으면 체크를 풀었을 때 에러가 생겼음
		const isChecked = e.target.checked;
		//false값이 들어가 있어서 착각할 수 있지만
		//객체값(initVal)에 들어가 있기 떄문에 deep copy
		setVal({ ...Val, [name]: isChecked });
	};

	//체크박스 체크 시 Val state업데이트 함수
	const handleCheck = (e) => {
		const { name } = e.target;
		let isChecked = false;
		const inputs = e.target.parentElement.querySelectorAll('input');

		//모든 체크박스 반복을 돌면서 하나라도 체크된게 있으면 true값으로 변경 후 리턴
		//&&뒤에 대입 연산자 있음 안됨()로묶음 체크가 되어있는거 확인해야돼서
		inputs.forEach((el, idx) => el.checked && (isChecked = true));
		setVal({ ...Val, [name]: isChecked });
	};

	//select요소 선택시 Val state 업데이트 함수
	const handleSelect = (e) => {
		const { name } = e.target;
		const selected = e.target.value;
		setVal({ ...Val, [name]: selected });
	};
	//1. 전송 버튼 클릭시 handleSubmit실행 => 인증 체크호출하고 에러메시지 생성 함수
	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log(check(Val));
		//errs객체가 만들어진 return값을 setErr변경 스테이트 함수에 담아서 조건에 부합하지 않으면 Err스테이트 나타남
		//2.전송 버튼 클릭시 체크함수 실행
		setErr(check(Val));
		//옮겨담음 에러문구 출력해야돼서 스테이트값에 담는다
	};
	//5.Err문구가 뜰때마다 실행
	useEffect(() => {
		//객체의 키값 반복돌기
		//객체의 키값이 하나도 없으면 인증 통과
		const len = Object.keys(Err).length;
		//len의 키값이 0이고 submit값이 true여아지만 인증통과/send버튼을 한번 이상 클릭했을 때
		if (len === 0 && Sumbit) {
			alert('회원가입이 완료되었습니다.');
			setVal(initVal);
			history.push('/');
		}
	}, [Err]);

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
								<input
									type='radio'
									name='gender'
									value='male'
									id='mail'
									onChange={handleRadio}
								/>
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
										setSumbit(true);
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
