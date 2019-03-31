export default (state = [], action) => {
  switch (action.type) {
    case 'TODAY_GAME':
      return action.payload;
    default:
      return state;
  }
}