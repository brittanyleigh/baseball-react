import mlbStats from "../apis/mlbStats";

const REQUEST = "mlbStats/hitterStats/REQUEST";
const SUCCESS = "mlbStats/hitterStats/SUCCESS";
const FAILURE = "mlbStats/hitterStats/FAILURE";

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

export const getHitterStats = teamId => async (dispatch, getState) => {
  const team = getState().team.team.id;
  dispatch({ type: REQUEST });

  return mlbStats
    .get(`teams/${team}/leaders`, {
      params: {
        leaderCategories:
          "homeRuns,runsBattedIn,battingAverage,onBasePlusSlugging",
        // TODO: dynamically update season year
        season: "2019"
      }
    })
    .then(results => {
      let statLeaders = {};
      results.data.teamLeaders.forEach((record, i) => {
        if (record.statGroup == "hitting") {
          statLeaders[record.leaderCategory] = record.leaders.slice(0, 3);
        }
      });
      dispatch({ type: SUCCESS, payload: statLeaders });
    })
    .catch(error => dispatch({ type: FAILURE, payload: true }));
};
