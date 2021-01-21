import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import sessionTypes from './session/session.types';

import sessionReducer from './session/session.reducer';
import challengeReducer from './challenge/challenge.reducer';
import commitmentsReducer from './commitments/commitments.reducer';
import userReducer from './user/user.reducer';
import commitmentFormReducer from './commitment-form/commitment-form.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['session', 'user', 'challenge']
};

const appReducer = combineReducers({
  session: sessionReducer,
  challenge: challengeReducer,
  commitments: commitmentsReducer,
  user: userReducer,
  commitmentForm: commitmentFormReducer,
});

const rootReducer = (state, action) => {
  if (action.type === sessionTypes.SESSION_LOGOUT ) {
    window.localStorage.removeItem('persist:root')
    window.localStorage.removeItem('persist:rootReducer')
    state = undefined;
}
return appReducer(state, action);
}


export default persistReducer(persistConfig, rootReducer)