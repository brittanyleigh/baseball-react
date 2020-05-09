const mockData = {
  teams: [
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
  ],
  season: {
    seasons: [
      {
        seasonStartDate: "2020-02-21",
        seasonEndDate: "2020-10-28"
      }
    ]
  },
  stats: {
    teamLeaders: [
      {
        leaderCategory: "wins",
        leaders: [
          {
            person: {
              fullName: "Wins One",
              id: 123456
            },
            rank: 1,
            value: "15"
          },
          {
            person: {
              fullName: "Wins Two",
              id: 345678
            },
            rank: 2,
            value: "12"
          },
          {
            person: {
              fullName: "Wins Three",
              id: 567890
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
              fullName: "ERA One",
              id: 123456
            },
            rank: 1,
            value: "3.00"
          },
          {
            person: {
              fullName: "ERA Two",
              id: 345678
            },
            rank: 2,
            value: "2.75"
          },
          {
            person: {
              fullName: "ERA Three",
              id: 567890
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
              fullName: "HR One",
              id: 123456
            },
            rank: 1,
            value: "30"
          },
          {
            person: {
              fullName: "HR Two",
              id: 345678
            },
            rank: 2,
            value: "27"
          },
          {
            person: {
              fullName: "HR Three",
              id: 567890
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
              fullName: "RBI One",
              id: 123456
            },
            rank: 1,
            value: "60"
          },
          {
            person: {
              fullName: "RBI Two",
              id: 345678
            },
            rank: 2,
            value: "50"
          },
          {
            person: {
              fullName: "RBI Three",
              id: 567890
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
              fullName: "AVG One",
              id: 123456
            },
            rank: 1,
            value: ".300"
          },
          {
            person: {
              fullName: "AVG Two",
              id: 345678
            },
            rank: 2,
            value: ".275"
          },
          {
            person: {
              fullName: "AVG Three",
              id: 567890
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
              fullName: "OPS One",
              id: 123456
            },
            rank: 1,
            value: ".300"
          },
          {
            person: {
              fullName: "OPS Two",
              id: 345678
            },
            rank: 2,
            value: ".275"
          },
          {
            person: {
              fullName: "OPS Three",
              id: 567890
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
              fullName: "MISC One",
              id: 123456
            },
            rank: 1,
            value: ".300"
          },
          {
            person: {
              fullName: "MISC Two",
              id: 345678
            },
            rank: 2,
            value: ".275"
          },
          {
            person: {
              fullName: "MISC Three",
              id: 567890
            },
            rank: 3,
            value: ".250"
          }
        ],
        statGroup: "hitting"
      }
    ]
  },
  schedule: {
    dates: [
      {
        games: [
          {
            gamePk: 123456,
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
  },
  score: {
    dates: [
      {
        games: [
          {
            gamePk: 123456,
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
  },
  standings: {
    records: [
      {
        teamRecords: [
          {
            divisionGamesBack: "-",
            leagueRecord: { wins: 91, losses: 71, pct: ".562" }
          }
        ]
      }
    ]
  },
  news: {
    articles: [
      {
        author: "John Doe",
        source: { name: "Espn.com" },
        title: "Chicago Cubs News Article One",
        url: "https://www.espn.com/",
        urlToImage: "https://via.placeholder.com/150"
      },
      {
        author: "Jane Doe",
        source: { name: "bleacherreport.com" },
        title: "Another Fantastic Chicago Cubs News Article",
        url: "https://www.espn.com/",
        urlToImage: "https://via.placeholder.com/150"
      }
    ]
  }
};
export default mockData;
