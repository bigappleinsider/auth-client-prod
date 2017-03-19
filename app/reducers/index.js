import { combineReducers } from 'redux';

import { reducer as form } from 'redux-form';

import authReducer from './auth_reducer';
import questionaireReducer from './questionaire_reducer';
import submissionsReducer from './submissions_reducer';


const rootReducer = combineReducers({
  form,
  auth: authReducer,
  questionaire: questionaireReducer,
  submissions: submissionsReducer
});

export default rootReducer;
