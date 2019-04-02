export default (state = [], action) => {
  switch (action.type) {
    case 'PLAYER_STATS':
      return action.payload;
    default:
      return state;
  }
}