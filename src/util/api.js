import { loginRequired } from '../actions/application';

var constants = {
  'APP_JSON_HEADER': 'application/json',
  'SAME_ORIGIN': 'same-origin'
};

const HttpCodes = {
  OK: 200,
  UNAUTHORIZED: 401
};

let store;

function checkStatus(response) {
  var quiet = this.quiet;
  if (quiet === undefined) {
    quiet = false;
  }
  if (response.status === HttpCodes.UNAUTHORIZED && !quiet) {
    var request = this.request;
    var promise = new Promise((resolve, reject) => {
      request.resolve = resolve;
      request.reject = reject;
    });
    store.dispatch(loginRequired(request));
    return promise;
  }

  if (response.status < HttpCodes.OK || response.status >= 300) {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }

  return response;
}

function parseJSON(response) {
  if (response.constructor.name !== 'Response') {
    return response;
  }

  if (response.statusText === 'No Content') {
    return '';
  }
  return response.json();
}

function postPut() {
  var uri = arguments[0];
  var method = arguments[1] || 'POST';
  var data = arguments[2] || '';
  var quiet = arguments[3];
  return fetch(uri,
    {
      method: method,
      credentials: constants.SAME_ORIGIN,
      headers: {
        'Accept': constants.APP_JSON_HEADER,
        'Content-Type': constants.APP_JSON_HEADER
      },
      body: JSON.stringify(data)
    })
    .then(checkStatus.bind({request: postPut.bind(undefined, uri, method, data, true), quiet: quiet}))
    .then(parseJSON);
}

export function get() {
  var uri = arguments[0];
  var quiet = arguments[1];
  return fetch(uri,
    {
      method: 'GET',
      credentials: constants.SAME_ORIGIN,
      headers: {
        'Accept': constants.APP_JSON_HEADER
      }
    })
    .then(checkStatus.bind({request: get.bind(undefined, uri, true), quiet: quiet}))
    .then(parseJSON);
}

export function post(uri, data = '', quiet = false) {
  return postPut(uri, 'POST', data, quiet);
}

export function put(uri, data = '', quiet = false) {
  return postPut(uri, 'PUT', data, quiet);
}

export function setStore(s) {
  store = s;
}
