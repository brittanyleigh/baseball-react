/* eslint-disable no-undef */
import React from "react";
import { render, fireEvent, screen, waitFor } from "./test-utils";
import "@testing-library/jest-dom/extend-expect";
import App from "../components/App";
import mockAxios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { fetchTeamData } from "../ducks/teams";

test("can render with redux with defaults", async () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);
  const store = mockStore();

  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({ data: { teams: ["Cubs"] } })
  );

  await store.dispatch(fetchTeamData());
  render(<App />);

  console.log(store.getActions());

  await waitFor(() => {
    //expect(screen.getByText("scoreboard")).toBeInTheDocument();
  });
});
