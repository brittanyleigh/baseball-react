export default (state = [], action) => {
  switch (action.type) {
    case 'TODAY_GAME':
      action.payload.ready = true;
      return action.payload;
    default:
      return state;
  }
}