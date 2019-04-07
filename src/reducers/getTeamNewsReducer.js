export default (state = [], action) => {
  switch (action.type) {
    case 'TEAM_NEWS':
      return action.payload;
    default:
      return state;
  }
}