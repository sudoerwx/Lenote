export default (state = {}, action = {}) => {
  switch(action.type) {
    case 'UNAUTHORIZED':
      return {}
    case 'LOGIN':
      return action.payload;
    default:
      return state;
  }
}
