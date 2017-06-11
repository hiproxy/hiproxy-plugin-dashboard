/**
 * @file
 * @author zdying
 */

import { combineReducers } from 'redux';

import HomeReducer from './pages/home/reducer';

const reducer = combineReducers({
  home: HomeReducer
});
export default reducer;
