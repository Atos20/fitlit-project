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


})
