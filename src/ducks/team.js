import mlbStats from "../apis/mlbStats";

const SELECT = "mlbStats/team/SELECT";

const initialState = { team: undefined };
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case SELECT:
      return { ...state, team: action.payload };
    default:
      return state;
  }
}

export const selectTeam = team => dispatch => {
  localStorage.setItem("selected_team", JSON.stringify(team));
  dispatch({ type: SELECT, payload: team });
};

export const getPreviousTeam = () => async (dispatch, getState) => {
  if (localStorage.hasOwnProperty("selected_team")) {
    var previous_team = localStorage.getItem("selected_team");

    try {
      previous_team = JSON.parse(previous_team);
    } catch (e) {
      previous_team = undefined;
    }
    dispatch({
      type: SELECT,
      payload: previous_team
    });
  }
};
