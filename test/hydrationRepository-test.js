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

  it('Should store hydration Data', ()=> {
    expect(hydrationRepo.data).to.deep.equal(dummyHydrationData)
  })
})
