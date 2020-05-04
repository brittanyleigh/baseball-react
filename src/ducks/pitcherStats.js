import mlbStats from "../apis/mlbStats";

const REQUEST = "mlbStats/pitcherStats/REQUEST";
const SUCCESS = "mlbStats/pitcherStats/SUCCESS";
const FAILURE = "mlbStats/pitcherStats/FAILURE";

const initialState = { data: [] };
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case REQUEST:
      return { ...state, isFetching: true };
    case SUCCESS:
      return {
        ...state,
        isFetching: false,
        data: action.payload
      };
    case FAILURE:
      return {
        ...state,
        isFetching: false,
        data: [],
        error: action.payload
      };
    default:
      return state;
  }
}

export const getPitcherStats = year => (dispatch, getState) => {
  const team = getState().team.team.id;
  const numberOfLeaders = 3;
  dispatch({ type: REQUEST });

  return mlbStats
    .get(`teams/${team}/leaders`, {
      params: {
        leaderCategories: "wins,earnedRunAverage",
        season: year
      }
    })
    .then(results => {
      const statLeaders = {};
      results.data.teamLeaders.forEach(record => {
        if (record.statGroup === "pitching") {
          statLeaders[record.leaderCategory] = record.leaders.slice(
            0,
            numberOfLeaders
          );
        }
      });
      dispatch({ type: SUCCESS, payload: statLeaders });
    })
    .catch(error => dispatch({ type: FAILURE, payload: error }));
};
