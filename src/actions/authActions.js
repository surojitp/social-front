import axios from 'axios';
import {GET_ERRORS, SET_CURRENT_USER} from './types';
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from 'jwt-decode';


// REgister User
export const registeruser = (userData, history) => dispatch => {
  // return{
  //   type: TEST_DISPATCH,
  //   payload: userData
  // }
  axios.post('http://localhost:5000/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => {
        console.log("error",err);
        console.log("error responce",err.response);
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
      }
    )
}

//Login user
export const loginUser = userData => dispatch => {
  axios.post('http://localhost:5000/api/users/login', userData)
  .then(res =>{
    // save to local storage
    const { token } = res.data;
    // set token to local storage
    localStorage.setItem('jwtToken', token);
    // set token to Auth header
    setAuthToken(token);
    //decode token to get user data
    const decode = jwt_decode(token);
    // set current user
    dispatch(setCurrentuser(decode));
  })
  .catch(err =>{
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  })
  
}

//set logged in user
export const setCurrentuser = (decode) =>{
  return {
    type: SET_CURRENT_USER,
    payload: decode
  }
}

//log user out
export const logoutUser = () => dispatch => {
  //remove token from local storage
  localStorage.removeItem('jwtToken');
  //REmove auth header for future request
  setAuthToken(false);
  //set current user to {} which will set authenticated to false
  dispatch(setCurrentuser({}));
}