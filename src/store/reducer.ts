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
import applicantReferences from 'store/slices/applicant/applicantReferences';
import rankReducer from 'store/slices/rank';
import languageReducer from 'store/slices/language';
import departmentReducer from 'store/slices/department';

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

  department: departmentReducer,
  applicant: applicantReferences,
  customer: customerReducer,
  rank: rankReducer,
  language: languageReducer
});

export default reducer;
