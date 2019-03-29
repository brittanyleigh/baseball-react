export default (state = [], action) => {
  switch (action.type) {
    case 'TEAM_SELECTED':
      return action.payload;
    default:
      return state;
  }
}