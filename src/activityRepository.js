class ActivityRepository {
  constructor(activityData) {
      this.data = activityData;
  }
  
  getMilesPerDay(user, date){
    const usersActivity = this.data.find(data => data.userID === user.id && data.date === date);
    const numberStepsPerMile = 5280 / user.strideLength;
    // console.log('steps per mile',numberStepsPerMile)
    const userDistanceinMiles = usersActivity.numSteps / numberStepsPerMile
    // console.log(userDistanceinMiles)
    return Math.round(userDistanceinMiles * 10) / 10 //=> 6 total
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
    // console.log(indexOfDate)
    const retrievedWeek = retrievedUsersInfo.slice(indexOfDate -6, indexOfDate +1 );
  
    const average = retrievedWeek.reduce((total, entry) => {
      total += entry.minutesActive
      return Math.round(total / retrievedWeek.length)
    }, 0)
    return average
  }

  stepGoalSuccess(user, date) {
    const retrievedUsersInfo = this.data.filter(userInfo => userInfo.userID === user.id);
    const desiredDate = retrievedUsersInfo.find(info => info.date === date);
    if (desiredDate.numSteps > user.dailyStepGoal) {
        return `Congratulation ${user.name}, you have reached your goal of ${user.dailyStepGoal} steps!!`
    } else {
        return `${user.name}, keep walking` 
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
    // console.log(user.dailyStepGoal)
    //  console.log(getBestDatesInfo )
    const justDates = getBestDatesInfo.map( date => date.date);
    // console.log(justDates)
    return justDates
  }

  bestSatirClimbRecord(user) {
    const retrievedUsersInfo = this.data.filter(userInfo => userInfo.userID === user.id);
    // console.log(retrievedUsersInfo )
    const bestRecord = retrievedUsersInfo.reduce((record, activityInfo) => {
      if (activityInfo.flightsOfStairs > record.bestClimb) {
        record.bestClimb = activityInfo.flightsOfStairs
      }
      return record
    },{bestClimb: 0})
      return bestRecord.bestClimb
  }

  averageAllUserActivities(date) {
    const retrieveInfoByDate = this.data.filter(data => data.date === date)
    // console.log(retrieveInfoByDate)
    const averageData = retrieveInfoByDate.reduce((averageList, data)=> {
      averageList.numStepsAverage += data.numSteps 
      averageList.numStepsAverage = Math.round(averageList.numStepsAverage / retrieveInfoByDate.length)
      
      averageList.minutesActiveAverage += data.minutesActive
      averageList.minutesActiveAverage =   Math.round(averageList.minutesActiveAverage/ retrieveInfoByDate.length)
  
      averageList.flightsOfStairsAverage += data.flightsOfStairs
      averageList.flightsOfStairsAverage =  Math.round(averageList.flightsOfStairsAverage / retrieveInfoByDate.length)
      return averageList
    }, {numStepsAverage: 0, minutesActiveAverage: 0, flightsOfStairsAverage : 0, })
    return averageData
  }
  //I am thinking about writting a function that would be able to calculate the average
  //so this part could be better refactored 

  getMostActivePeople(usersData, date){
    const listByDate = this.data.filter(entry => entry.date === date);
    const getIDs = listByDate.reduce((names, entry) => { 
        if(entry.minutesActive > 250){
            names.push(entry.userID)
        }
        return names
    }, [])
    // console.log(getIDs)
    const getNames = getIDs.map(id => {
        const user = usersData.find(user => user.id === id);
        console.log(user)
        return user.name
    })
    return getNames
  }
  
}

if (typeof module !== 'undefined') {
  module.exports = ActivityRepository;
}
/*
  getMostActivePeople(usersData, date){
    const listByDate = this.data.filter(entry => entry.date === date);
    const getIDs = listByDate.reduce((names, entry) => { 
        if(entry.minutesActive > 250){
            names.push(entry.userID)
        }
        return names
    }, [])
    console.log(getIDs)//[1, 4]
    console.log(usersData)

    return getIDs
  }
*/