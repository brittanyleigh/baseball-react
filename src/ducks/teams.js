import mlbStats from "../apis/mlbStats";

const REQUEST = "mlbStats/teams/REQUEST";
const SUCCESS = "mlbStats/teams/SUCCESS";
const FAILURE = "mlbStats/teams/FAILURE";

const initialState = { data: [], isFetching: true };
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

export const fetchTeamData = () => async dispatch => {
  dispatch({ type: REQUEST });

  return mlbStats
    .get("teams", {
      params: {
        sportId: 1
      }
    })
    .then(results => dispatch({ type: SUCCESS, payload: results.data.teams }))
    .catch(error => dispatch({ type: FAILURE, payload: true }));
};
