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
const mockStats = {
  teamLeaders: [
    {
      leaderCategory: "wins",
      leaders: [
        {
          person: {
            fullName: "Wins One"
          },
          rank: 1,
          value: "15"
        },
        {
          person: {
            fullName: "Wins Two"
          },
          rank: 2,
          value: "12"
        },
        {
          person: {
            fullName: "Wins Three"
          },
          rank: 3,
          value: "10"
        }
      ],
      statGroup: "pitching"
    },
    {
      leaderCategory: "earnedRunAverage",
      leaders: [
        {
          person: {
            fullName: "ERA One"
          },
          rank: 1,
          value: "3.00"
        },
        {
          person: {
            fullName: "ERA Two"
          },
          rank: 2,
          value: "2.75"
        },
        {
          person: {
            fullName: "ERA Three"
          },
          rank: 3,
          value: "2.50"
        }
      ],
      statGroup: "pitching"
    },
    {
      leaderCategory: "homeRuns",
      leaders: [
        {
          person: {
            fullName: "HR One"
          },
          rank: 1,
          value: "30"
        },
        {
          person: {
            fullName: "HR Two"
          },
          rank: 2,
          value: "27"
        },
        {
          person: {
            fullName: "HR Three"
          },
          rank: 3,
          value: "25"
        }
      ],
      statGroup: "hitting"
    },
    {
      leaderCategory: "runsBattedIn",
      leaders: [
        {
          person: {
            fullName: "RBI One"
          },
          rank: 1,
          value: "60"
        },
        {
          person: {
            fullName: "RBI Two"
          },
          rank: 2,
          value: "50"
        },
        {
          person: {
            fullName: "RBI Three"
          },
          rank: 3,
          value: "40"
        }
      ],
      statGroup: "hitting"
    },
    {
      leaderCategory: "battingAverage",
      leaders: [
        {
          person: {
            fullName: "AVG One"
          },
          rank: 1,
          value: ".300"
        },
        {
          person: {
            fullName: "AVG Two"
          },
          rank: 2,
          value: ".275"
        },
        {
          person: {
            fullName: "AVG Three"
          },
          rank: 3,
          value: ".250"
        }
      ],
      statGroup: "hitting"
    },
    {
      leaderCategory: "onBasePlusSlugging",
      leaders: [
        {
          person: {
            fullName: "OPS One"
          },
          rank: 1,
          value: ".300"
        },
        {
          person: {
            fullName: "OPS Two"
          },
          rank: 2,
          value: ".275"
        },
        {
          person: {
            fullName: "OPS Three"
          },
          rank: 3,
          value: ".250"
        }
      ],
      statGroup: "hitting"
    },
    {
      leaderCategory: "MISC",
      leaders: [
        {
          person: {
            fullName: "MISC One"
          },
          rank: 1,
          value: ".300"
        },
        {
          person: {
            fullName: "MISC Two"
          },
          rank: 2,
          value: ".275"
        },
        {
          person: {
            fullName: "MISC Three"
          },
          rank: 3,
          value: ".250"
        }
      ],
      statGroup: "hitting"
    }
  ]
};
const mockSchedule = {
  dates: [
    {
      games: [
        {
          status: {
            abstractGameState: "Final",
            codedGameState: "D",
            detailedState: "Postponed",
            statusCode: "DO"
          },
          teams: {
            away: {
              team: { id: 111, name: "Game One" }
            },
            home: {
              team: {
                id: 109,
                name: "Game Two"
              }
            }
          }
        }
      ]
    }
  ]
};
const mockScore = {
  dates: [
    {
      games: [
        {
          status: {
            abstractGameState: "Final",
            codedGameState: "F",
            detailedState: "Final",
            statusCode: "F"
          },
          teams: {
            away: {
              isWinner: true,
              score: 7,
              team: { id: 112, name: "Away Team" }
            },
            home: {
              isWinner: false,
              score: 2,
              team: {
                id: 146,
                name: "Home Team"
              }
            }
          }
        }
      ]
    }
  ]
};

mockAxios.get.mockImplementation(url => {
  switch (url) {
    case "teams":
      return Promise.resolve({ data: { teams: mockTeams } });
    case "seasons?sportId=1":
      return Promise.resolve({ data: mockSeason });
    case "teams/111/leaders":
      return Promise.resolve({ data: mockStats });
    case "schedule/games":
      return Promise.resolve({ data: mockSchedule });
    case "schedule":
      return Promise.resolve({ data: mockScore });
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
