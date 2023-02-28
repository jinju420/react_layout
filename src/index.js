import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
	<React.StrictMode>
		<HashRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</HashRouter>
	</React.StrictMode>,
	document.getElementById('root')
);

/*
saga.js : reducer에 추가 기능 확장을 위한 미들웨어 (비동기 데이터 요청을 컴포넌트 외부에서 관리)
api.js : 외부 비동기 데이터 호출문을 이곳에 컴포넌트 외부파일로 따로 관리
store.js : state가 저장될 전역공간 (saga적용이 가능하도록 미들웨어 설정)

위의 파일들은 부수효과(Side Effect)를 발생시키지 않는 순수함수(Pure function) 형태로 동작이 되야함
- 부수효과 : DOM같이 web api가 개입해야 되는 효과들 순수 자바스크립트만으로 동작할 수 없는 기능들
- 순수함수 : 부수효과를 발생시키지 않는 순수 자바스크립트로만 동작되는 함수
: 동일한 인풋에는 항상 동일한 결과값 반환
: 함수 외부의 상태변경이나 영향을 받지 않음
*/
