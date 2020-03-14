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
  team.className = team.teamName.replace(" ", "").toLowerCase();
  dispatch({ type: SELECT, payload: team });
};

export const getPreviousTeam = () => async (dispatch, getState) => {
  if (localStorage.hasOwnProperty("selected_team")) {
    var previous_team = localStorage.getItem("selected_team");

    try {
      previous_team = JSON.parse(previous_team);
      previous_team.className = previous_team.teamName
        .replace(" ", "")
        .toLowerCase();
    } catch (e) {
      previous_team = undefined;
    }

    dispatch({
      type: SELECT,
      payload: previous_team
    });
  }
};
