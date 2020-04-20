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
  const mockTeams = [
    {
      id: 112,
      name: "Chicago Cubs",
      abbreviation: "CHC",
      teamName: "Cubs",
      division: {
        id: 205,
        name: "National League Central",
        link: "/api/v1/divisions/205"
      }
    }
  ];

  mockAxios.get.mockImplementationOnce(() =>
    Promise.resolve({ data: { teams: mockTeams } })
  );

  //await store.dispatch(fetchTeamData());
  render(<App />);

  //console.log(store.getActions());

  await waitFor(() => {
    expect(screen.getByText("scoreboard")).toBeInTheDocument();
  });
});
