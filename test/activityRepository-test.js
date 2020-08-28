const chai = require('chai');
const expect = chai.expect;
const dummyUserData = require('../data/dummyUserData');
const User = require('../src/user');
const activityTestData = require('../data/dummyActivityData');
const ActivityRepository = require('../src/activityRepository');

describe('ActivityRepository', () => {
  let today ;
  let anotherDay;
  let testActivityData;
  let testUsersData;
  let user1;
  let user;
  let newActivity;

  beforeEach(() => {
    today = '2020/08/22';
    anotherDay = '2020/08/21'
    testActivityData = activityTestData;
    testUsersData = dummyUserData;
    user1 = testUsersData[0] 
    user = new User(user1);
    newActivityRepo = new ActivityRepository(testActivityData);
});

it('should be a function', () => {
    expect(ActivityRepository).to.be.a('function');
  });

  it('should be able to instantiate a new activity repository class', () => {
    expect(newActivityRepo).to.be.an.instanceOf(ActivityRepository);
  })

  it('should be able to store all activity Data', () => {

    expect(newActivityRepo.data).to.deep.equal(testActivityData);
  });
//return the miles a user has walked based on their number of steps
  it('return the miles a user has walked based on their number of steps by date', () => {
    expect(newActivityRepo.getMilesPerDay(user1, today)).to.equal(6);
  })
//how many minutes were they active for a given day (specified by a date)?
  it('should be able return minutes active for a given day', () => {
    expect(newActivityRepo.minutesActiveByDate(today)).to.equal(239);
  })
//how many minutes active they average for a given week (7 days)
  it('minutes active for a given week', () => {
    expect(newActivityRepo.averageMinutesByWeek(user, date)).to.equal(38);
  })

});