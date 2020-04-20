/* eslint-disable no-undef */
import React from "react";
import { render, fireEvent, screen, waitFor } from "./test-utils";
import "@testing-library/jest-dom/extend-expect";
import App from "../components/App";
import mockAxios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

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
  const mockSeason = {
    seasons: [
      {
        seasonStartDate: "2020-02-21",
        seasonEndDate: "2020-10-28"
      }
    ]
  };

  mockAxios.get.mockImplementation(url => {
    switch (url) {
      case "teams":
        return Promise.resolve({ data: { teams: mockTeams } });
      case "seasons?sportId=1":
        return Promise.resolve({ data: mockSeason });
      default:
        return Promise.reject(new Error("not found"));
    }
  });

  render(<App />);

  await waitFor(() => {
    expect(screen.getByText(/scoreboard/i)).toBeInTheDocument();
  });
});
