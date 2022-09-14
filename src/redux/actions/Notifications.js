import axios from 'axios';
import {VIDEO_LIST} from '../reducer/Notifications';
export const axiosInstanceAuth = authHeaderToken => {
  return axios.create({
    baseURL: 'https://ucat-olp-test.medentry.edu.au/test',
    timeout: 10000,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export const getNotifications = params => dispatch => {
  dispatch({
    type: VIDEO_LIST.REQUEST_VIDEO_LIST,
  });
  axios
    .get('https://ucat-olp-test.medentry.edu.au/test')
    .then(function (response) {
      dispatch({
        payload: response?.data,
        type: VIDEO_LIST.RESPONSE_VIDEO_LIST,
      });
    })
    .catch(function (error) {
      console.log('Error', error);
      dispatch({
        payload: error?.response?.data?.message,
        type: VIDEO_LIST.ERROR_VIDEO_LIST,
      });
    });
};
