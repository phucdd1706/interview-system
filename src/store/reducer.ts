// THIRD-PARTY
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

// PROJECT IMPORTS
import menuReducer from 'store/slices/menu';
import snackbarReducer from 'store/slices/snackbar';
import userReducer from 'store/slices/user';
import completeReducer from 'store/slices/complete';
import inProgressReducer from 'store/slices/inProgress';
import customerReducer from './slices/customer';
import rankReducer from 'store/slices/rank';

const reducer = combineReducers({
  snackbar: snackbarReducer,
  user: persistReducer(
    {
      key: 'user',
      storage,
      keyPrefix: 'beetsoft-'
    },
    userReducer
  ),
  menu: menuReducer,
  complete: completeReducer,
  inProgress: inProgressReducer,
  rank: rankReducer,
  customer: persistReducer(
    {
      key: 'customer',
      storage,
      keyPrefix: 'beetsoft-'
    },
    customerReducer
  )
});

export default reducer;
