import mlbStats from "../apis/mlbStats";
import { alphabetize } from "../utils";

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

export const fetchTeamData = () => dispatch => {
  dispatch({ type: REQUEST });

  return mlbStats
    .get("teams", {
      params: {
        sportId: 1
      }
    })
    .then(results =>
      dispatch({
        type: SUCCESS,
        payload: alphabetize(results.data.teams)
      })
    )
    .catch(dispatch({ type: FAILURE, payload: true }));
};
