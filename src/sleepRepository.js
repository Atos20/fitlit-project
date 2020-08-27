class SleepRepository {
  constructor(data){
    this.data = data
  }
  averageSleepHoursAllTime(id){
    let userData = this.data.filter((entry) => entry.userID === id)
    let userTotal = userData.reduce((sum, entry)=> {
      return sum + entry.hoursSlept
    },0)
    let average = Math.round(userTotal / userData.length * 10)
    return (average / 10)
  }

  averageSleepQualityAllTime(id){
    let userData = this.data.filter((entry) => entry.userID === id)
    let userTotal = userData.reduce((sum, entry)=> {
      return sum + entry.sleepQuality
    },0)
    let average = Math.round(userTotal / userData.length * 10)
    return (average / 10)
  }
}

if(typeof module !== 'undefined'){
  module.exports = SleepRepository
}
