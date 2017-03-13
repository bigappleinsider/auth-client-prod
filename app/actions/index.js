import axios from 'axios';

import { browserHistory } from 'react-router';

import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE, FETCH_QUESTIONAIRE, FETCH_QUESTIONAIRES } from './types';

import Config from 'Config';

function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}
export function fetchMessage() {
  return function(dispatch) {
    axios.get(Config.serverUrl, {
      headers: { authorization: localStorage.getItem('token')}
    })
      .then(response => {
        dispatch({
          type: FETCH_MESSAGE,
          payload: response.data.message
        });
      });
  };
}

export function fetchQuestionaires() {
  return function(dispatch) {
    axios.get(`${Config.serverUrl}/questionaire`, {
      headers: { authorization: localStorage.getItem('token')}
    })
      .then(response => {
        console.log("response", response.data);
        dispatch({
          type: FETCH_QUESTIONAIRES,
          payload: response.data
        });
      });
  };
}

export function fetchQuestionaire(id) {
  return function(dispatch) {
    axios.get(`${Config.serverUrl}/questionaire/${id}`, {
      headers: { authorization: localStorage.getItem('token')}
    })
      .then(response => {
        console.log("fetchQuestionaire", response.data);
        dispatch({
          type: FETCH_QUESTIONAIRE,
          payload: response.data
        });
      });
  };
}

export function deleteQuestionaire(id) {
  return function(dispatch) {
    axios.delete(`${Config.serverUrl}/questionaire/${id}`, {
      headers: { authorization: localStorage.getItem('token')}
    })
      .then(response => {
        //console.log("dfnsdkjfnkjsdnfjk");
        //browserHistory.push(null, '/questionaire');
        dispatch(fetchQuestionaires());
      });
  };
}



export function createQuestionaire({ name }) {
  return function(dispatch) {
    axios.post(`${Config.serverUrl}/questionaire`, {
      name
    }, {
      headers: { authorization: localStorage.getItem('token')}
    })
      .then(response => {
        browserHistory.push('/questionaire');
      });
  };
}


export function updateQuestionaire({ id, name }) {
  return function(dispatch) {
    axios.patch(`${Config.serverUrl}/questionaire/${id}`, {
      name
    }, {
      headers: { authorization: localStorage.getItem('token')}
    })
      .then(response => {
        browserHistory.push('/questionaire');
      });
  };
}


export function signupUser({ email, password }) {
  return function(dispatch) {
    axios.post(`${Config.serverUrl}/signup`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch( (response) => {
        dispatch(authError(response.response.data.error));
      });
    // dispatch({ type: })
  };
}


export function signinUser({ email, password }) {
  // Submit email/password to the server

  /*
  If request is good...
  - Update state to indicate user is authenticated
  - Save the JWT token
  - redirect to the route '/feature'

  If the request is bad
  - show erros to the user
  JS promises

  Localstorage is not shared accross domains
  */
  // We can dispatch any functions we want
  return function(dispatch) {
    axios.post(`${Config.serverUrl}/signin`, { email, password })
      .then(response => {
        dispatch({ type: AUTH_USER });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch(() => {
        dispatch(authError('Bad login info'));
      });
    // dispatch({ type: })
  };
}

export function signoutUser() {
  localStorage.removeItem('token');
  return {
    type: UNAUTH_USER
  };
}


export {authError};
