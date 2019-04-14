export default (state = [], action) => {
  switch (action.type) {
    case 'PLAYER_STATS':
      action.payload.ready = true;
      return action.payload;
    default:
      return state;
  }
}