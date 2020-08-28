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
}

if (typeof module !== 'undefined') {
  module.exports = ActivityRepository;
}