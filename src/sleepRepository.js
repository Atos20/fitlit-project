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

  specificWeeksHours(id, date){
    let userData = this.data.filter((entry) => entry.userID === id)
    let endWeek = userData.find((entry) => entry.date === date)
    let index = userData.indexOf(endWeek)
    let priorWeek = userData.slice(index - 6, index + 1)
    return priorWeek.map((entry) => {
      return {[entry.date]: entry.hoursSlept}
    })
  }

  specificWeeksQuality(id, date){
    let userData = this.data.filter((entry) => entry.userID === id)
    let endWeek = userData.find((entry) => entry.date === date)
    let index = userData.indexOf(endWeek)
    let priorWeek = userData.slice(index - 6, index + 1)
    return priorWeek.map((entry) => {
      return {[entry.date]: entry.sleepQuality}
    })
  }

  allTimeQualityAverage(){
    const allHours = this.data.reduce((sum, entry) => {
      return sum + entry.sleepQuality
    },0)
    const average = Math.round(allHours / this.data.length * 10)
    return average / 10
  }

  weeksGoodSleepers(date){
    const allUsersAndData = this.data.reduce((acc, obj) => {
      let key = obj.userID
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(obj)
      return acc
    },{})
    const usersWeeks =
  }
}

if(typeof module !== 'undefined'){
  module.exports = SleepRepository
}
