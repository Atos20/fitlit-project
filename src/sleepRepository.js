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

  specificNightsHours(id, date){
    let specificNight = this.data.find((entry) => {
      return entry.userID === id && entry.date === date
    })
    return specificNight.hoursSlept
  }

  specificNightsQuality(id, date){
    let specificNight = this.data.find((entry) => {
      return entry.userID === id && entry.date === date
    })
    return specificNight.sleepQuality
  }
}

if(typeof module !== 'undefined'){
  module.exports = SleepRepository
}
