// THIRD-PARTY
import { combineReducers } from 'redux';

// PROJECT IMPORTS
import menuReducer from './slices/menu';

const reducer = combineReducers({
  menu: menuReducer
});

export default reducer;
