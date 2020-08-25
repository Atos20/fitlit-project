const chai = require('chai');
const expect = chai.expect

const User = require('../src/user');
const HydrationRepository = require('../src/hydrationRepository');
const dummyHydrationData = require('../data/dummyHydrationData');

describe('HydrationRepository', () => {
  let hydrationRepo
  // const dummyHydrationData
  let user
  beforeEach(()=> {
    hydrationRepo = new HydrationRepository(dummyHydrationData);
  })

  it('Should store hydration Data', () => {
    expect(hydrationRepo.data).to.deep.equal(dummyHydrationData)
  })

  it('Should be able to calculate average oz all time by user ID', () => {
    expect(hydrationRepo.calculateAverageOzAllTime(1)).to.equal(32.3)
  })

  it('Should be able to return oz on specific day for user', ()=> {
    expect(hydrationRepo.returnDaysHydration(1, "2019/06/6")).to.equal(30)
  })
})
