import mlbStats from "../apis/mlbStats";
import moment from "moment";

const REQUEST = "mlbStats/yesterday/REQUEST";
const SUCCESS = "mlbStats/yesterday/SUCCESS";
const FAILURE = "mlbStats/yesterday/FAILURE";

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

export const getYesterdayScore = () => (dispatch, getState) => {
  dispatch({ type: REQUEST });

  const yesterday = moment()
    .subtract(1, "days")
    .format("YYYY-MM-DD");
  const team = getState().team.team.id;

  return mlbStats
    .get("schedule/games", {
      params: {
        sportId: 1,
        teamId: team,
        date: yesterday
      }
    })
    .then(results => {
      console.log(results);
      dispatch({ type: SUCCESS, payload: results.data.dates[0].games });
    })
    .catch(error => dispatch({ type: FAILURE, payload: error }));
};
