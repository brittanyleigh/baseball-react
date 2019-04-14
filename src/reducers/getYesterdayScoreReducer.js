export default (state = [], action) => {
  switch (action.type) {
    case 'YESTERDAY_SCORE':
      action.payload.ready = true;
      return action.payload;
    default:
      return state;
  }
}