import mlbStats from "../apis/mlbStats";

const REQUEST = "mlbStats/seasons/REQUEST";
const SUCCESS = "mlbStats/seasons/SUCCESS";
const FAILURE = "mlbStats/seasons/FAILURE";

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

export const getSeasonDates = () => dispatch => {
  dispatch({ type: REQUEST });

  return mlbStats
    .get("seasons?sportId=1", {
      params: {
        sportId: 1
      }
    })
    .then(results => {
      const dates = results.data.seasons[0];
      const season = { start: dates.seasonStartDate, end: dates.seasonEndDate };
      dispatch({ type: SUCCESS, payload: season });
    })
    .catch(error => dispatch({ type: FAILURE, payload: error }));
};
