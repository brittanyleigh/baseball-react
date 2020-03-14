import mlbStats from "../apis/mlbStats";

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
        error: action.payload
      };
    default:
      return state;
  }
}

export const getYesterdayScore = () => (dispatch, getState) => {
  dispatch({ type: REQUEST });
  const oneDay = 864e5;
  const negativeTwo = -2;

  const yesterday = new Date(Date.now() - oneDay);
  const yester_year = yesterday.getFullYear();
  const yester_month = `0${yesterday.getMonth() + 1}`.slice(negativeTwo);
  const yester_date = yesterday.getDate();
  /* eslint-disable no-unused-vars*/
  const scoreDate = `${yester_year}-${yester_month}-${yester_date}`;
  const tempYesterday = "2019-06-11";
  const team = getState().team.team.id;

  return mlbStats
    .get("schedule/games", {
      params: {
        sportId: 1,
        teamId: team,
        date: tempYesterday
      }
    })
    .then(results => {
      dispatch({ type: SUCCESS, payload: results.data.dates[0].games });
    })
    .catch(dispatch({ type: FAILURE, payload: true }));
};
