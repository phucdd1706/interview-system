// THIRD-PARTY
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';

// PROJECT IMPORTS
import menuReducer from 'store/slices/menu';
import snackbarReducer from 'store/slices/snackbar';
import userReducer from 'store/slices/user';
import applicantReferences from 'store/slices/applicantReferences';
import customerReducer from 'store/slices/customer';
import rankReducer from 'store/slices/rank';
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

  department: departmentReducer,
  applicant: applicantReferences,
  customer: customerReducer,
  rank: rankReducer,
  menu: menuReducer
});

export default reducer;
