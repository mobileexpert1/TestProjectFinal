export const VIDEO_LIST = {
  REQUEST_VIDEO_LIST: 'REQUEST_VIDEO_LIST',
  RESPONSE_VIDEO_LIST: 'RESPONSE_VIDEO_LIST',
  ERROR_VIDEO_LIST: 'ERROR_VIDEO_LIST',
  CLEAR_VIDEO_LIST: 'CLEAR_VIDEO_LIST',
  // REQUEST_NOTIFICATIONS_LODE_MORE: 'REQUEST_NOTIFICATIONS_LODE_MORE',
};
let initState = {loading: false, response: null, error: null};
export const notifications = (state = initState, action) => {
  console.log('NOTIFICATIONS))',action.type);
  switch (action.type) {
    case VIDEO_LIST.REQUEST_VIDEO_LIST:
      return {loading: true, response: null, error: null};
    case VIDEO_LIST.RESPONSE_VIDEO_LIST:
      return {loading: false, response: action.payload, error: null};
    case VIDEO_LIST.ERROR_VIDEO_LIST:
      return {loading: false, response: null, error: action.payload};
    case VIDEO_LIST.CLEAR_VIDEO_LIST:
      return {
        loading: false,
        response: null,
        error: null,
      };
    default:
      return state;
  }
};
