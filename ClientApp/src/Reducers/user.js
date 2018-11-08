export default (state = { isAuthorized: false }, action = {}) => {
  switch(action.type) {
    case 'UNAUTHORIZED':
      return { isAuthorized: false }
    case 'LOGIN':
      return { isAuthorized: true, ...action.payload };
    default:
      return state;
  }
}
