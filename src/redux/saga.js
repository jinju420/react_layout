import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import { fetchYoutube, fetchFlickr } from './api';
import * as types from './actionType';

/*
saga = 비동기를 동기처리하기위한 것
takeLatest(제일 마지막에 들어온 요청만 수행), takeEvery(들어오는 모든 요청을 수행)
  put (saga에서 만들어진 액션객체를 리듀서에 전달, saga가 전용 dispatch함수라고 이해해도 무방)
  call (saga에서 api관련 axios함수를 호출할때 쓰는 함수, 두번째 파라미터로 인수값 전달 가능)
  fork (saga관련 명령어들을 실행해주는 함수)
  all (fork로 실행해야 될 함수가 복수개일때 해당 함수를 모두 호출할때 쓰는 함수)

*/
//1- 컴포넌트로 들어온 YOUTUBE_START라는 액션요청을 리듀서 함수를 통해서 전달 받으면 유튜브 호출함수를 실행해주는 함수

//순서3 - takeLatest로 'YOUTUBE_START'액션타입이 들어오면 returnYoutube호출
function* callYoutube() {
	yield takeLatest(types.YOUTUBE.start, returnYoutube);
}
//2- 유튜브 데이터 호출한뒤 결과값을 가지고 다시 새로운 액션객체를 반환해서 리듀서로 전달해주는 함수
//순서4- api.js에서 가져온 fetchYoutube함수를 호출해서 응답 성공 유무에 따라서 액션객체를 다시 리듀서에 전달
function* returnYoutube() {
	try {
		//데이터 응답에 성공하면 성공 액션객체를 put으로 리듀서에 전달
		//call == axios랑 비슷
		const response = yield call(fetchYoutube);
		//put == dispatch랑 비슷
		yield put({ type: types.YOUTUBE.success, payload: response.data.items });
	} catch (err) {
		//데이터 응답에 실패하면 에러 액션객체를 put으로 리듀서에 전달
		yield put({ type: types.YOUTUBE.fail, payload: err });
	}
}

//flickr
function* callFlickr() {
	yield takeLatest(types.FLICKR.start, returnFlickr);
}
function* returnFlickr(action) {
	try {
		//fetchFlcker에는 인수로 Opt객체가 전달되야 되기 때문에 컴포넌트에서 {type: 'FLICKR_START', Opt: {type: 'user', user:'사용자아이디'}}
		const response = yield call(fetchFlickr, action.Opt);
		yield put({ type: types.FLICKR.success, payload: response.data.photos.photo });
	} catch (err) {
		yield put({ type: types.FLICKR.fail, payload: err });
	}
}
//3- 위의 최종적으로 호출해주는 함수를 만든뒤 최종 export
export default function* rootSaga() {
	yield all([fork(callYoutube), fork(callFlickr)]);
}
