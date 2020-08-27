const chai = require('chai');
const expect = chai.expect
const moment = require('moment')

const User = require('../src/user');
const SleepRepository = require('../src/sleepRepository');
const dummySleepData = require('../data/dummySleepData');

describe('SleepRepository', function(){
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
})
