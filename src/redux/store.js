import { combineReducers, createStore } from 'redux';
import promptReducer from './promptReducer';

const rootReducer = combineReducers({
  promptSlice: promptReducer
});

const store = createStore(rootReducer);
export default store;