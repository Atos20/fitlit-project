class HydrationRepository {
  constructor(data){
    this.data = data
  }
  calculateAverageOzAllTime(id){
    let daysById = this.data.filter((dataDay)=> dataDay.userID === id)
    let totalOz = daysById.reduce(((ozTotal, dataDay)=> ozTotal + dataDay.numOunces), 0)
    let average = (totalOz / daysById.length) * 10;
    return Math.round(average)/10
  }
  returnDaysHydration(id, date){
    let dayData = this.data.find((dataDay) => dataDay.userID === id && dataDay.date === date)
    return dayData.numOunces
  }
}

if(typeof module !== 'undefined'){
  module.exports = HydrationRepository
}
