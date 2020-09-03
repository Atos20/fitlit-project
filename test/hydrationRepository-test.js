const chai = require('chai');
const expect = chai.expect
const moment = require('moment')

const User = require('../src/user');
const HydrationRepository = require('../src/hydrationRepository');
const dummyHydrationData = require('../data/dummyHydrationData');

describe('HydrationRepository', () => {
  let hydrationRepo
  let today
  beforeEach(()=> {
    hydrationRepo = new HydrationRepository(dummyHydrationData);
    today = "2019/06/7"
  })

  it('Should store hydration Data', () => {
    expect(hydrationRepo.data).to.deep.equal(dummyHydrationData)
  })

  it('Should be able to calculate average oz all time by user ID', () => {
    expect(hydrationRepo.calculateAverageOzAllTime(1)).to.equal(32.3)
  })

  it('Should be able to return oz on specific day for user', () => {
    expect(hydrationRepo.returnDaysHydration(1, "2019/06/6")).to.equal(30)
  })

  it('Should be bale to return oz drinken over the course of 7 days', () => {
    expect(hydrationRepo.returnWeeksHydration(1, today)).to.deep.equal(
      [
        {"2019/06/1": 20},
        {"2019/06/2": 27},
        {"2019/06/3": 37},
        {"2019/06/4": 30},
        {"2019/06/5": 50},
        {"2019/06/6": 30},
        {"2019/06/7": 32}
      ]
    )
  })
  it('should be able to return the dates from the desired week', () => {
    hydrationRepo.returnWeeksHydration(1, today);
    const test = hydrationRepo.retriveHydrationDates(1, today);
    expect(test).to.deep.equal(["2019/06/1", "2019/06/2", "2019/06/3", "2019/06/4", "2019/06/5", "2019/06/6", "2019/06/7"])
  })
})
