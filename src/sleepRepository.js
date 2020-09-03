class SleepRepository {
  constructor(data) {
    this.data = data
  }

  averageSleepHoursAllTime(id) {
    let userData = this.data.filter(entry => entry.userID === id);
    let userTotal = userData.reduce((sum, entry) => sum + entry.hoursSlept, 0);
    let average = userTotal / userData.length;
    return parseFloat(average.toFixed(1));
  }

  averageSleepQualityAllTime(id) {
    let userData = this.data.filter(entry => entry.userID === id);
    let userTotal = userData.reduce((sum, entry) => sum + entry.sleepQuality, 0);
    let average = userTotal / userData.length;
    return parseFloat(average.toFixed(1));
  }

  specificNightsHours(id, date) {
    return this.data.find(entry => entry.userID === id && entry.date === date).hoursSlept
  }

  specificNightsQuality(id, date) {
    return this.data.find(entry => entry.userID === id && entry.date === date).sleepQuality
  }

  specificWeeksHours(id, date) {
    let userData = this.data.filter(entry => entry.userID === id)
    let index = userData.indexOf(userData.find(entry => entry.date === date))
    let priorWeek = userData.slice(index - 6, index + 1)
    let arrWeek = priorWeek.map(entry => ({[entry.date]: entry.hoursSlept}))
    return arrWeek.reduce((acc, obj) => {
      acc[Object.keys(obj)[0]] = Object.values(obj)[0]
      return acc
    }, {})
  }

  specificWeeksQuality(id, date) {
    let userData = this.data.filter(entry => entry.userID === id)
    let index = userData.indexOf(userData.find(entry => entry.date === date))
    let priorWeek = userData.slice(index - 6, index + 1)
    let arrWeek = priorWeek.map((entry) => {
      return {[entry.date]: entry.sleepQuality}
    })
    return arrWeek.reduce((acc, obj) => {
      acc[Object.keys(obj)[0]] = Object.values(obj)[0]
      return acc
    }, {});
  }

  allTimeQualityAverage() {
    const allHours = this.data.reduce((sum, entry) => sum + entry.sleepQuality, 0)
    const average = allHours / this.data.length
    return parseFloat(average.toFixed(1));
  }

  weeksGoodSleepers(date) {
    let allUsersAndData = this.data.reduce((acc, obj) => {
      !acc[obj.userID] ? acc[obj.userID] = [] : false
      acc[obj.userID].push(obj)
      return acc
    }, {})
    const dateIndex = allUsersAndData['1'].findIndex(entry => entry.date === date)
    Object.keys(allUsersAndData).forEach((item) => {
      allUsersAndData[item] = allUsersAndData[item].slice(dateIndex - 6, dateIndex + 1)
      allUsersAndData[item] = allUsersAndData[item].reduce((sum, day) => {
        return sum + day.sleepQuality
      }, 0) / 7
    })
    return Object.entries(allUsersAndData).reduce((list, user) => {
      user[1] > 3 ? list.push(user[0]) : false
      return list
    }, [])
  }

  topSleeper(date) {
    const allOnDay = this.data.filter(entry => entry.date === date);
    return allOnDay.sort((a, b) => b.hoursSlept - a.hoursSlept)[0].userID
  }

  findAverageSleepQualityByMonth(date) {
    let newObj = this.data.reduce((acc, entry) => {
      entry.date = moment(entry.date)
      let key = entry.date.month()
      !acc[key] ? acc[key] = [] : false
      acc[key].push(entry.sleepQuality)
      let total = acc[key].reduce((acc, value) => acc += value)
      acc[key] = [total / acc[key].length]
      return acc
    }, {})
    let month = moment(date).month()
    return parseFloat(newObj[month][0].toFixed(1))
  }
}

if (typeof module !== 'undefined') {
  module.exports = SleepRepository
}
