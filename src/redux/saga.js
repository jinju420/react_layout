import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import { fetchYoutube } from './api';
import * as types from './actionType';

/*
takeLatest(제일 마지막에 들어온 요청만 수행), takeEvery(들어오는 모든 요청을 수행)
  put (saga에서 만들어진 액션객체를 리듀서에 전달, saga가 전용 dispatch함수라고 이해해도 무방)
  call (saga에서 api관련 axios함수를 호출할때 쓰는 함수, 두번째 파라미터로 인수값 전달 가능)
  fork (saga관련 명령어들을 실행해주는 함수)
  all (fork로 실행해야 될 함수가 복수개일때 해당 함수를 모두 호출할때 쓰는 함수)

*/
//1- 컴포넌트로 들어온 YOUTUBE_START라는 액션요청을 리듀서 함수를 통해서 전달 받으면 유튜브 호출함수를 실행해주는 함수
function* callYoutube() {
	yield takeLatest('types.YOUTUBE.start', returnYoutube);
}
//2- 유튜브 데이터 호출한뒤 결과값을 가지고 다시 새로운 액션객체를 반환해서 리듀서로 전달해주는 함수
function* returnYoutube() {
	try {
		//데이터 응답에 성공하면 성공 액션객체를 put으로 리듀서에 전달
		const response = yield call(fetchYoutube);
		yield put({ type: types.YOUTUBE.success, payload: response.data.items });
	} catch (err) {
		//데이터 응답에 실패하면 에러 액션객체를 put으로 리듀서에 전달
		yield put({ type: types.YOUTUBE.fail, payload: err });
	}
}
//3- 위의 최종적으로 호출해주는 함수를 만든뒤 최종 export
export default function* rootSaga() {
	yield all([fork(callYoutube)]);
}
