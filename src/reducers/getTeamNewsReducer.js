export default (state = [], action) => {
  switch (action.type) {
    case 'TEAM_NEWS':
      action.payload.ready = true;
      return action.payload;
    default:
      return state;
  }
}