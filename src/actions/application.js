import ActionTypes from '../constants/ActionTypes';
import * as Api from '../util/api';

function archiveSucceeded() {
  return {
    type: ActionTypes.archiveSucceeded
  };
}

export function loginRequired(request) {
  return {
    type: ActionTypes.loginRequired,
    payload: {
      request: request
    }
  };
}

export function archive() {
  return dispatch => {
    Api.post('/archive')
        .then(() => {
          dispatch(archiveSucceeded());
        });
  };
}

export function login(form, success) {
  return dispatch => {
    Api.post('/login', form, true)
        .then(() => {
          dispatch({
            type: ActionTypes.loggedIn
          });
          if (success) success();
        })
  };
}