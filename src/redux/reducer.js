import { combineReducers } from 'redux';
import * as types from './actionType';

const youtubeReducer = (state = { youtube: [] }, action) => {
	switch (action.type) {
		/*
    	컴포넌트에서 넘어오는 action type ('YOUTUBE_START')
		해당 요청이 넘어오면 작업을 saga.js로 넘김
		saga가 해당 액션요청을 받아서 비동기 서버통신 함수 호출해서
		결과값에 따라 액션객체를 다시 리듀서에 전달해줌
    */
		case types.YOUTUBE.start:
			return state;

		/*
      saga에서 데이터 요청이 성공하면 다음의 액션객체가 리듀서에 전달됨
		{type: 'YOUTUBE_SUCCESS': payload: 유튜브데이터 배열 }
      */
		case types.YOUTUBE.success:
			return { ...state, youtube: action.payload };

		/* 
      saga에서 데이터 요청이 실패하면 다음의 액션객체가 리듀서에 전달됨
		{type: 'YOUTUBE_FAIL': payload: 에러문구 }
    */
		case types.YOUTUBE.fail:
			return { ...state, youtube: action.payload };
		default:
			return state;
	}
};

const reducers = combineReducers({ youtubeReducer });
export default reducers;
