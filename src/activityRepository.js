class ActivityRepository {
  constructor(activityData) {
    this.data = activityData;
  }

  getMilesPerDay(user, date) {
    const usersActivity = this.data.find(data => data.userID === user.id && data.date === date);
    const userDistanceinMiles = usersActivity.numSteps / (5280 / user.strideLength)
    return parseFloat(userDistanceinMiles.toFixed(1))
  }

  getStepsPerDay(user, date) {
    const usersActivity = this.data.find(data => data.userID === user.id && data.date === date);
    return usersActivity.numSteps
  }

  getFlightsPerDay(user, date) {
    const usersActivity = this.data.find(data => data.userID === user.id && data.date === date);
    return usersActivity.flightsOfStairs
  }

  minutesActiveByDate(user, date) {
    const retrievedUser =  this.data.filter(userInfo => userInfo.userID === user.id)
    const desiredDate = retrievedUser.find(info => info.date === date).minutesActive
    return desiredDate
  }

  averageMinutesByWeek(user, date) {
    const retrievedUsersInfo = this.data.filter(userInfo => userInfo.userID === user.id);
    const desiredDate = retrievedUsersInfo.find(info => info.date === date)
    const indexOfDate = retrievedUsersInfo.indexOf(desiredDate)
    const retrievedWeek = retrievedUsersInfo.slice(indexOfDate - 6, indexOfDate + 1 );
    return retrievedWeek.reduce((total, entry) => {
      total += entry.minutesActive
      return Math.round(total / retrievedWeek.length)
    }, 0)
  }

  stepGoalSuccess(user, date) {
    const retrievedUsersInfo = this.data.filter(userInfo => userInfo.userID === user.id);
    const desiredDate = retrievedUsersInfo.find(info => info.date === date);
    if (desiredDate.numSteps > user.dailyStepGoal) {
      return `Congratulation's, you have reached your goal of ${user.dailyStepGoal} steps!!`
    } else {
      return `Let's keep walking to meet your goal!`
    }
  }

  getReachedStepGoalDays(user) {
    const retrievedUsersInfo = this.data.filter(userInfo => userInfo.userID === user.id);
    const getBestDatesInfo = retrievedUsersInfo.reduce((bestDates, activityInfo) => {
      if (activityInfo.numSteps > user.dailyStepGoal) {
        bestDates.push(activityInfo)
      }
      return bestDates
    }, [])
    return getBestDatesInfo.map( date => date.date);
  }

  bestSatirClimbRecord(user) {
    const retrievedUsersInfo = this.data.filter(userInfo => userInfo.userID === user.id);
    const bestRecord = retrievedUsersInfo.reduce((record, activityInfo) => {
      if (activityInfo.flightsOfStairs > record.bestClimb) {
        record.bestClimb = activityInfo.flightsOfStairs
      }
      return record
    }, {bestClimb: 0})
    return bestRecord.bestClimb
  }

  getAverage(data, activity) {
    const total = data.reduce((acc, curr) => {
      acc += curr[activity]
      return acc
    }, 0)
    return total / data.length;
  }

  averageAllUserActivities(date) {
    const retrieveInfoByDate = this.data.filter(data => data.date === date);
    return retrieveInfoByDate.reduce((averageList) => {
      averageList.numStepsAverage = this.getAverage(retrieveInfoByDate, 'numSteps');
      averageList.minutesActiveAverage = this.getAverage( retrieveInfoByDate, 'minutesActive');
      averageList.flightsOfStairsAverage = this.getAverage(retrieveInfoByDate, 'flightsOfStairs');
      return averageList
    }, {numStepsAverage: 0, minutesActiveAverage: 0, flightsOfStairsAverage: 0, });
  }

  getKeyAllActivities(date) {
    const result = [this.averageAllUserActivities(date)]
    const dates = result.reduce((acc, curr) => {
      acc.push(...Object.keys(curr))
      return acc
    }, [])
    return dates
  }

  getValuesAllActivities(date) {
    const result = [this.averageAllUserActivities(date)]
    const dates = result.reduce((acc, curr) => {
      acc.push(...Object.values(curr))
      return acc
    }, [])
    return dates
  }

  getMostActivePeople(usersData, date) {
    const listByDate = this.data.filter(entry => entry.date === date);
    const getIDs = listByDate.reduce((names, entry) => {
      if (entry.minutesActive > 250) {
        names.push(entry.userID)
      }
      return names
    }, [])
    const getNames = getIDs.map(id => {
      const user = usersData.find(user => user.id === id);
      return user.name
    })
    return getNames
  }

  returnPriorWeekDates(user, date) {
    const userEntries = this.data.filter((entry)=>{
      return entry.userID === user.id
    })
    const specificDate = userEntries.find((entry)=>{
      return entry.date === date
    })
    const entryDateIndex = userEntries.indexOf(specificDate)
    const priorUserWeek = userEntries.slice(entryDateIndex - 6, entryDateIndex + 1)
    return priorUserWeek.map((entry)=>{
      return entry.date
    })
  }

}

if (typeof module !== 'undefined') {
  module.exports = ActivityRepository;
}
