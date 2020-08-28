const activityTestData = [
    {
      "userID": 1,
      "date": "2020/08/13",
      "numSteps": 8705,
      "minutesActive": 67,
      "flightsOfStairs": 50
    },
    {
      "userID": 2,
      "date": "2020/08/13",
      "numSteps": 13206,
      "minutesActive": 289,
      "flightsOfStairs": 29
    },
    {
      "userID": 3,
      "date": "2020/08/13",
      "numSteps": 10840,
      "minutesActive": 97,
      "flightsOfStairs": 28
    },
    {
      "userID": 4,
      "date": "2020/08/13",
      "numSteps": 4057,
      "minutesActive": 204,
      "flightsOfStairs": 10
    },
    {
      "userID": 1,
      "date": "2020/08/14",
      "numSteps": 4559,
      "minutesActive": 153,
      "flightsOfStairs": 44
    },
    {
      "userID": 2,
      "date": "2020/08/14",
      "numSteps": 10872,
      "minutesActive": 153,
      "flightsOfStairs": 2
    },
    {
      "userID": 3,
      "date": "2020/08/14",
      "numSteps": 10691,
      "minutesActive": 245,
      "flightsOfStairs": 1
    },
    {
      "userID": 4,
      "date": "2020/08/14",
      "numSteps": 7255,
      "minutesActive": 36,
      "flightsOfStairs": 19
    },
    {
      "userID": 1,
      "date": "2020/08/15",
      "numSteps": 3577,
      "minutesActive": 140,
      "flightsOfStairs": 16
    },
    {
      "userID": 2,
      "date": "2020/08/15",
      "numSteps": 4294,
      "minutesActive": 138,
      "flightsOfStairs": 10
    },
    {
      "userID": 3,
      "date": "2020/08/15",
      "numSteps": 7402,
      "minutesActive": 116,
      "flightsOfStairs": 33
    },
    {
      "userID": 4,
      "date": "2020/08/15",
      "numSteps": 3486,
      "minutesActive": 114,
      "flightsOfStairs": 32
    },
    {
      "userID": 1,
      "date": "2020/08/16",
      "numSteps": 6637,
      "minutesActive": 175,
      "flightsOfStairs": 36
    },
    {
      "userID": 2,
      "date": "2020/08/16",
      "numSteps": 4112,
      "minutesActive": 220,
      "flightsOfStairs": 37
    },
    {
      "userID": 3,
      "date": "2020/08/16",
      "numSteps": 12304,
      "minutesActive": 152,
      "flightsOfStairs": 8
    },
    {
      "userID": 4,
      "date": "2020/08/16",
      "numSteps": 10689,
      "minutesActive": 204,
      "flightsOfStairs": 10
    },
    {
      "userID": 1,
      "date": "2020/08/17",
      "numSteps": 4901,
      "minutesActive": 288,
      "flightsOfStairs": 10
    },
    {
      "userID": 2,
      "date": "2020/08/17",
      "numSteps": 2813,
      "minutesActive": 277,
      "flightsOfStairs": 2
    },
    {
      "userID": 3,
      "date": "2020/08/17",
      "numSteps": 4993,
      "minutesActive": 191,
      "flightsOfStairs": 43
    },
    {
      "userID": 4,
      "date": "2020/08/17",
      "numSteps": 12457,
      "minutesActive": 144,
      "flightsOfStairs": 30
    },
    {
      "userID": 1,
      "date": "2020/08/18",
      "numSteps": 19974,
      "minutesActive": 80,
      "flightsOfStairs": 40
    },
    {
      "userID": 2,
      "date": "2020/08/18",
      "numSteps": 8664,
      "minutesActive": 142,
      "flightsOfStairs": 3
    },
    {
      "userID": 3,
      "date": "2020/08/18",
      "numSteps": 12102,
      "minutesActive": 270,
      "flightsOfStairs": 6
    },
    {
      "userID": 4,
      "date": "2020/08/18",
      "numSteps": 13546,
      "minutesActive": 92,
      "flightsOfStairs": 40
    },
    {
      "userID": 1,
      "date": "2020/08/19",
      "numSteps": 12083,
      "minutesActive": 218,
      "flightsOfStairs": 20
    },
    {
      "userID": 2,
      "date": "2020/08/19",
      "numSteps": 5773,
      "minutesActive": 181,
      "flightsOfStairs": 3
    },
    {
      "userID": 3,
      "date": "2020/08/19",
      "numSteps": 8901,
      "minutesActive": 50,
      "flightsOfStairs": 6
    },
    {
      "userID": 4,
      "date": "2020/08/19",
      "numSteps": 10889,
      "minutesActive": 270,
      "flightsOfStairs": 44
    },
    {
      "userID": 1,
      "date": "2020/08/20",
      "numSteps": 14000,
      "minutesActive": 262,
      "flightsOfStairs": 17
    },
    {
      "userID": 2,
      "date": "2020/08/20",
      "numSteps": 2969,
      "minutesActive": 273,
      "flightsOfStairs": 6
    },
    {
      "userID": 3,
      "date": "2020/08/20",
      "numSteps": 9383,
      "minutesActive": 271,
      "flightsOfStairs": 4
    },
    {
      "userID": 4,
      "date": "2020/08/20",
      "numSteps": 5259,
      "minutesActive": 165,
      "flightsOfStairs": 15
    },
    {
      "userID": 1,
      "date": "2020/08/21",
      "numSteps": 5711,
      "minutesActive": 137,
      "flightsOfStairs": 43
    },
    {
      "userID": 2,
      "date": "2020/08/21",
      "numSteps": 7505,
      "minutesActive": 48,
      "flightsOfStairs": 40
    },
    {
      "userID": 3,
      "date": "2020/08/21",
      "numSteps": 8855,
      "minutesActive": 235,
      "flightsOfStairs": 17
    },
    {
      "userID": 4,
      "date": "2020/08/21",
      "numSteps": 7144,
      "minutesActive": 212,
      "flightsOfStairs": 9
    },
    {
      "userID": 1,
      "date": "2020/08/22",
      "numSteps": 8072,
      "minutesActive": 239,
      "flightsOfStairs": 23
    },
    {
      "userID": 2,
      "date": "2020/08/22",
      "numSteps": 9050,
      "minutesActive": 25,
      "flightsOfStairs": 0
    },
    {
      "userID": 3,
      "date": "2020/08/22",
      "numSteps": 4831,
      "minutesActive": 144,
      "flightsOfStairs": 21
    },
    {
      "userID": 4,
      "date": "2020/08/22",
      "numSteps": 3030,
      "minutesActive": 285,
      "flightsOfStairs": 45
    }
  ];
  
  module.exports =  activityTestData;