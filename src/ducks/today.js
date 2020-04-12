import mlbStats from "../apis/mlbStats";
import moment from "moment";

const REQUEST = "mlbStats/today/REQUEST";
const SUCCESS = "mlbStats/today/SUCCESS";
const FAILURE = "mlbStats/today/FAILURE";

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

export const getTodayGame = () => (dispatch, getState) => {
  dispatch({ type: REQUEST });

  const today = moment().format("YYYY-MM-DD");
  const team = getState().team.team.id;

  return mlbStats
    .get("schedule/games", {
      params: {
        sportId: 1,
        teamId: team,
        date: today
      }
    })
    .then(results => {
      dispatch({ type: SUCCESS, payload: results.data.dates[0].games });
    })
    .catch(error => dispatch({ type: FAILURE, payload: error }));
};
