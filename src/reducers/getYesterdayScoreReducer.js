export default (state = [], action) => {
  switch (action.type) {
    case 'YESTERDAY_SCORE':
      return action.payload;
    default:
      return state;
  }
}