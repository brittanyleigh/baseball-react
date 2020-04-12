import mlbStats from "../apis/mlbStats";

const REQUEST = "mlbStats/standings/REQUEST";
const SUCCESS = "mlbStats/standings/SUCCESS";
const FAILURE = "mlbStats/standings/FAILURE";

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

export const getDivisionStandings = year => (dispatch, getState) => {
  const team = getState().team.team.id;

  dispatch({ type: REQUEST });

  return mlbStats
    .get("standings", {
      params: {
        leagueId: "103,104",
        season: year
      }
    })
    .then(results => {
      let division;
      results.data.records.forEach(record => {
        if (record.teamRecords.find(item => item.team.id === team)) {
          division = record.teamRecords;
        }
      });

      dispatch({ type: SUCCESS, payload: division });
    })
    .catch(error => dispatch({ type: FAILURE, payload: error }));
};
