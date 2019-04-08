export default (state = [], action) => {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return action.payload;
    default:
      return state;
  }
}