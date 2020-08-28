class ActivityRepository {
  constructor(activityData) {
      this.data = activityData;
  }
  
  getMilesPerDay(user, date){
    const usersActivity = this.data.find(data => data.userID === user.id && data.date === date);
    console.log(usersActivity)
    console.log(user)
    const numberStepsPerMile = 5280 / user.strideLength;
    console.log('steps per mile',numberStepsPerMile)
    const userDistanceinMiles = usersActivity.numSteps / numberStepsPerMile
    console.log(userDistanceinMiles)
    return Math.round(userDistanceinMiles * 10) / 10 //=> 6 total
  }

  
}

if (typeof module !== 'undefined') {
  module.exports = ActivityRepository;
}