class ActivityRepository {
  constructor(activityData) {
      this.data = activityData;
  }
  
  getMilesPerDay(user, date){
    const usersActivity = this.data.find(data => data.userID === user.id && data.date === date);
    const numberStepsPerMile = 5280 / user.strideLength;
    console.log('steps per mile',numberStepsPerMile)
    const userDistanceinMiles = usersActivity.numSteps / numberStepsPerMile
    console.log(userDistanceinMiles)
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

  
}

if (typeof module !== 'undefined') {
  module.exports = ActivityRepository;
}