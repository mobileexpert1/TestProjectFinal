import {combineReducers} from 'redux';

import {notifications} from './reducer/Notifications';

export const rootReducer = combineReducers({
  notifications: notifications,
});
