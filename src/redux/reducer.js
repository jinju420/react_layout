import { combineReducers } from 'redux';

const youtubeReducer = (state = { youtube: [] }, action) => {
	switch (action.type) {
		case 'SET_YOUTUBE':
			//deep copy한 뒤  덮어쓰기할 youtube객체키값에 payload: json.data.items값이 들어옴
			return { ...state, youtube: action.payload };
		default:
			return state;
	}
};

const reducers = combineReducers({ youtubeReducer });
export default reducers;
