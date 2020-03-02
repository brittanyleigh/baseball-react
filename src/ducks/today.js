import mlbStats from "../apis/mlbStats";

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

export const getTodayGame = () => async (dispatch, getState) => {
  dispatch({ type: REQUEST });

  const today = new Date(Date.now());
  const to_year = today.getFullYear();
  const to_month = ("0" + (today.getMonth() + 1)).slice(-2);
  const to_date = today.getDate();
  //const scoreDate = `${to_year}-${to_month}-${to_date}`;
  const team = getState().team.team.id;
  const scoreDate = `${to_year}-${to_month}-02`;

  return mlbStats
    .get("schedule/games", {
      params: {
        sportId: 1,
        teamId: team,
        date: scoreDate
      }
    })
    .then(results => {
      dispatch({ type: SUCCESS, payload: results.data.dates[0].games });
    })
    .catch(error => dispatch({ type: FAILURE, payload: true }));
};
