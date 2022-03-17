import { combineReducers } from 'redux';
import config from './config';
import layouts from './layouts';

const rootReducer = combineReducers({
  // 각각의 리듀서가 createStore 넘길 수 있는 리듀싱 함수로 바꿔준다.

  config,
  layouts
});

export default rootReducer;
