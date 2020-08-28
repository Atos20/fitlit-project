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

  weeksGoodSleepers(date) {
    let allUsersAndData = this.data.reduce((acc, obj) => {
      let key = obj.userID
      if (!acc[key]) {
        acc[key] = []
      }
      acc[key].push(obj)
      return acc
    },{})
    console.log(allUsersAndData)
    const numUsers = Object.keys(allUsersAndData)
    console.log(numUsers)
    const user1Date = (entry) => entry.date === date
    console.log(allUsersAndData['1'])
    const dateIndex = allUsersAndData['1'].findIndex(user1Date)
    console.log(dateIndex)
    numUsers.forEach((item) => {
      allUsersAndData[item] = allUsersAndData[item].slice(dateIndex - 6, dateIndex + 1)
      allUsersAndData[item] = allUsersAndData[item].reduce((sum, day) => {
        return sum + day.sleepQuality
      }, 0)
      allUsersAndData[item] = allUsersAndData[item]/7
    })
    console.log(allUsersAndData)
    const allHours = this.data.reduce((sum, entry) => {
      return sum + entry.sleepQuality
    },0)
    const averageQualityThisWeekAllUsers = Object.entries(allUsersAndData)
    console.log(averageQualityThisWeekAllUsers)
    averageQualityThisWeekAllUsers.sort((a,b) => {
        return b[1] - a[1]
    })
    console.log(averageQualityThisWeekAllUsers)
    let averagingOver3 = []
    averageQualityThisWeekAllUsers.forEach((user)=> {
      if (user[1] > 3) averagingOver3.push(user[0])
    })
    return averagingOver3
  }
  //Would like this to pass a test where expected end result is numbers not strings
  //obviously this is a hefty chunck of code I want to pare down.

  topSleeper(date){
    const allOnDay = this.data.filter((entry) => {
      return entry.date === date
    })
    const reOrder = allOnDay.sort((a, b) =>{
      return a.hoursSlept - b.hoursSlept
    })
    const topSleeper= reOrder.pop()
    return topSleeper.userID
  }
}

if(typeof module !== 'undefined'){
  module.exports = SleepRepository
}
