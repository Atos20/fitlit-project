class HydrationRepository {
  constructor(data) {
    this.data = data;
  }

  calculateAverageOzAllTime(id) {
    let daysById = this.data.filter((dataDay)=> dataDay.userID === id)
    let totalOz = daysById.reduce(((ozTotal, dataDay) =>
      ozTotal + dataDay.numOunces), 0)
    let average = (totalOz / daysById.length) * 10;
    return Math.round(average) / 10
  }

  returnDaysHydration(id, date) {
    let dayData = this.data.find((dataDay) =>
      dataDay.userID === id && dataDay.date === date)
    return dayData.numOunces
  }

  returnWeeksHydration(id, date) {
    const userInfo = this.data.filter(data => data.userID === id);
    const locateDate = userInfo.find(user => user.date === date)
    const indexOfDate = userInfo.indexOf(locateDate);
    const weekData = userInfo.slice(indexOfDate - 6, indexOfDate + 1)
    const weekOz = weekData.map(data => ({[data.date]: data.numOunces}))
    return weekOz
  }

  retriveHydrationDates(id, date) {
    const datesList = this.returnWeeksHydration(id, date)
    const dates = datesList.reduce((acc, curr) => {
      acc.push(...Object.keys(curr))
      return acc
    }, [])
    return dates
  }

  retriveHydrationValues(id, date) {
    const datesList = this.returnWeeksHydration(id, date)
    const values = datesList.reduce((acc, curr) => {
      acc.push(...Object.values(curr))
      return acc
    }, [])
    return values
  }
}

if (typeof module !== 'undefined') {
  module.exports = HydrationRepository
}
