import mlbStats from "../apis/mlbStats";

const REQUEST = "mlbStats/stats/REQUEST";
const SUCCESS = "mlbStats/stats/SUCCESS";
const FAILURE = "mlbStats/stats/FAILURE";

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
        error: action.payload
      };
    default:
      return state;
  }
}

export const getPlayerStats = (teamId) => async (dispatch) => {
  // TODO: use teamId
  const team = '112';
  dispatch({ type: REQUEST});

  return mlbStats.get(`teams/${team}/leaders`, {
    params: {
      leaderCategories: 'homeRuns,runsBattedIn,battingAverage,onBasePlusSlugging',
      // TODO: dynamically update season year
      season: '2019'
    }
  })
  .then((results) => {
    let hittingLeaders = {};
    results.data.teamLeaders.forEach((record, i) => {
      if (record.statGroup == "hitting") {
        hittingLeaders[record.leaderCategory] = record.leaders.slice(0, 3);
      }
    });
    dispatch({ type: SUCCESS, payload: hittingLeaders})
  })
  .catch((error) => dispatch({ type: FAILURE, payload: true}))
}
