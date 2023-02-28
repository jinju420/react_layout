import { createStore, applyMiddleware } from 'redux';
import reducers from './reducer';
import createSagaMiddleware from '@redux-saga/core';
//미들웨어로 적용할 saga파일 import
import rootSaga from './saga';

//sagaMiddleware함수 활성화
const sagaMiddleware = createSagaMiddleware();

//store공간에 reducer데이터를 전달할때 sagaMiddleware를 설정해서 연동
//순서6 - 리듀서에서 변경된 데이터가 스토에 전달 (이때 리듀서에 saga미들웨어 설정)
const store = createStore(reducers, applyMiddleware(sagaMiddleware));

//미들웨어로 연결된 saga에 rootSaga함수 적용
sagaMiddleware.run(rootSaga);

//saga 미들웨어가 최종 적용된 reducer데이터를 store에 저장하고 해당 store export
export default store;
