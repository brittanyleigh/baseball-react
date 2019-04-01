export default (state = [], action) => {
  switch (action.type) {
    case 'STANDINGS':
      return action.payload;
    default:
      return state;
  }
}