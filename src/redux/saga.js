import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import { fetchYoutube, fetchFlickr } from './api';
import * as types from './actionType';

/*
takeLatest(제일 마지막에 들어온 요청만 수행), takeEvery(들어오는 모든 요청을 수행)
  put (saga에서 만들어진 액션객체를 리듀서에 전달, saga가 전용 dispatch함수라고 이해해도 무방)
  call (saga에서 api관련 axios함수를 호출할때 쓰는 함수, 두번째 파라미터로 인수값 전달 가능)
  fork (saga관련 명령어들을 실행해주는 함수)
  all (fork로 실행해야 될 함수가 복수개일때 해당 함수를 모두 호출할때 쓰는 함수)
*/

function* callYoutube() {
	yield takeLatest(types.YOUTUBE.start, returnYoutube);
}

function* returnYoutube() {
	try {
		const response = yield call(fetchYoutube);
		yield put({ type: types.YOUTUBE.success, payload: response.data.items });
	} catch (err) {
		yield put({ type: types.YOUTUBE.fail, payload: err });
	}
}

//flickr
function* callFlickr() {
	yield takeLatest(types.FLICKR.start, returnFlickr);
}
function* returnFlickr(action) {
	try {
		const response = yield call(fetchFlickr, action.Opt);
		yield put({ type: types.FLICKR.success, payload: response.data.photos.photo });
	} catch (err) {
		yield put({ type: types.FLICKR.fail, payload: err });
	}
}
export default function* rootSaga() {
	yield all([fork(callYoutube), fork(callFlickr)]);
}
