const chai = require('chai');
const expect = chai.expect
const moment = require('moment')

const User = require('../src/user');
const SleepRepository = require('../src/sleepRepository');
const dummySleepData = require('../data/dummySleepData');

describe('SleepRepository', function() {
  let sleepRepo

  beforeEach(() => {
    sleepRepo = new SleepRepository(dummySleepData)
  })

  it('Should store sleep data', () => {
    expect(sleepRepo.data).to.deep.equal(dummySleepData)
  })

  it('Should calculate average sleep hours all time', () => {
    expect(sleepRepo.averageSleepHoursAllTime(1)).to.equal(7.4)
  })

  it('Should calculate average sleep quality all time', () => {
    expect(sleepRepo.averageSleepQualityAllTime(1)).to.equal(2.6)
  })

  it('Should find hours slept on a day for a user', () => {
    expect(sleepRepo.specificNightsHours(1, "2020/08/22")).to.equal(4.6)
  })

  it('Should find quality of sleep on a day for a user', () => {
    expect(sleepRepo.specificNightsQuality(1, "2020/08/22")).to.equal(1.4)
  })

  it('Should find hours of sleep over a week for a user', () => {
    expect(sleepRepo.specificWeeksHours(1, "2020/08/20")).to.deep.equal({
      '2020/08/14': 6.5,
      '2020/08/15': 6.8,
      '2020/08/16': 8.8,
      '2020/08/17': 6.3,
      '2020/08/18': 4.1,
      '2020/08/19': 9.9,
      '2020/08/20': 8.6
    })
  })

  it('Should find quality of sleep over a week for a user', () => {
    expect(sleepRepo.specificWeeksQuality(1, "2020/08/20")).to.deep.equal({
      '2020/08/14': 4.2,
      '2020/08/15': 2,
      '2020/08/16': 1.8,
      '2020/08/17': 3.2,
      '2020/08/18': 2.2,
      '2020/08/19': 1.7,
      '2020/08/20': 2.6
    })
  })

  it('Should find average sleep quality of all users all time', () => {
    expect(sleepRepo.allTimeQualityAverage()).to.equal(3.2)
  })

  it('Should find users averaging a sleep quality over 3 in a given week', () => {
    expect(sleepRepo.weeksGoodSleepers("2020/08/22")).to.deep.equal(['3'])
  })

  it('Should find user with most hours sleep on day', () => {
    expect(sleepRepo.topSleeper("2020/08/20")).to.equal(1)
  })

  it('Should find the month with the best Quality sleep all users and all time', () => {
    expect(sleepRepo.findAverageSleepQualityByMonth("2020/08/20")).to.equal(3.9)
  })
  //This will require implimentation of moment.js or at least javascript Dates Object
  //my goal is not to do this now, but to come back later when I refactor all my other code
})
