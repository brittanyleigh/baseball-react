export default (state = [], action) => {
  switch (action.type) {
    case 'STANDINGS':
      action.payload.ready = true;
      return action.payload;
    default:
      return state;
  }
}