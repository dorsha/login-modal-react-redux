import Immutable from 'immutable';
import ActionTypes from '../constants/ActionTypes';
import createReducer from '../util/createReducer';

export const initialState = Immutable.fromJS({
  loginRequired: false,
  retriesQueue: [],
  archived: false
});

export const actionHandlers = {
  [ActionTypes.loginRequired]: (state, action) => {
    var request = action.payload.request;
    var newState = state.update('loginRequired', () => true);
    if (request) {
      newState = newState.update('retriesQueue', () => Immutable.List.of(request));
    }
    return newState;
  },
  [ActionTypes.archiveSucceeded]: (state, action) => {
    return state.set('archived', true);
  }
};

export default createReducer(initialState, actionHandlers);
