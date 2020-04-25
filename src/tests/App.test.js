/* eslint-disable no-undef */
import React from "react";
import { render, fireEvent, screen, waitFor, cleanup } from "./test-utils";
import "@testing-library/jest-dom/extend-expect";
import App from "../components/App";
import mockAxios from "axios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let store = mockStore();
const mockTeams = [
  {
    id: 111,
    name: "Boston Red Sox",
    abbreviation: "BOS",
    teamName: "Red Sox"
  },
  {
    id: 112,
    name: "Chicago Cubs",
    abbreviation: "CHC",
    teamName: "Cubs"
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

Object.defineProperty(window, "localStorage", {
  value: {
    getItem: jest.fn(() => null),
    setItem: jest.fn(() => null)
  },
  writable: true
});

test("can render with redux with defaults", async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText(/scoreboard/i)).toBeInTheDocument();
    expect(screen.getByTestId("menu")).toBeInTheDocument();
  });
});

test("can select different team by clicking", async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByTestId("menu")).toBeInTheDocument();
  });
  fireEvent.click(screen.getByText(/red/i));
  expect(screen.getByText(/cubs/i)).toBeInTheDocument();
  fireEvent.click(screen.getByText(/cubs/i));
  expect(screen.queryByText(/red/i)).toBeNull();
});

test("can select different team by keypress", async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByTestId("menu")).toBeInTheDocument();
  });
  fireEvent.keyUp(screen.getByTestId("menu"), {
    key: "Enter",
    code: "Enter",
    keyCode: 13
  });
  await waitFor(() => {
    expect(screen.getByText(/cubs/i)).toBeInTheDocument();
  });
  fireEvent.keyUp(screen.getByText(/cubs/i), {
    key: "Enter",
    code: "Enter",
    keyCode: 13
  });
  expect(screen.queryByText(/red/i)).toBeNull();
});
