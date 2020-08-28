const chai = require('chai');
const expect = chai.expect;
const dummyUserData = require('../data/dummyUserData');
const User = require('../src/user');
const dummyActivityData = require('../data/dummyActivityData');
const ActivityRepository = require('../src/activityRepository');

describe('ActivityRepository', () => {
  let today ;
  let anotherDay;
  let activityTestData;
  let userTestData;
  let user1;
  let user;
  let activityRepo;

  beforeEach(() => {
    today = '2020/08/22';
    anotherDay = '2020/08/21'
    activityTestData = dummyActivityData ;
    userTestData = dummyUserData;
    user1 = userTestData[0] 
    user = new User(user1);
    activityRepo = new ActivityRepository(activityTestData);
});

it('should be a function', () => {

    expect(ActivityRepository).to.be.a('function');
  });

  it('should be able to instantiate a new activity repository class', () => {
    expect(activityRepo).to.be.an.instanceOf(ActivityRepository);
  })

  it('should be able to store all activity Data', () => {
    expect(activityRepo.data).to.deep.equal(activityTestData);
  });
//return the miles a user has walked based on their number of steps
  it('return the miles a user has walked based on their number of steps by date', () => {
    expect(activityRepo.getMilesPerDay(user1, today)).to.equal(6);
  })
//how many minutes were they active for a given day (specified by a date)?
  it('should be able return minutes active for a given day', () => {
    expect(activityRepo.minutesActiveByDate(user1, today)).to.equal(239);
  })
//how many minutes active they average for a given week (7 days)
  it('minutes active for a given week', () => {
    expect(activityRepo.averageMinutesByWeek(user,today)).to.equal(38);
  })
////For a user, did they reach their step goal for a given day (specified by a date)?
  it('should evaluate if users reached their desired step goal or not' , () => {
    expect(activityRepo.stepGoalSuccess(user, today)).to.equal('Paco diPoi, keep walking')
  })
  ////For a user, find all the days where they exceeded their step goal
  it('should be able return all the dates where the users exceeded their daily step goal', () => {
    expect(activityRepo.getReachedStepGoalDays(user)).to.deep.equal(['2020/08/18', '2020/08/19', '2020/08/20']);
  })
//find their all-time stair climbing record
  it('should be able to return the user\'s , all-time stair climbing record',() => {
    expect(activityRepo.bestSatirClimbRecord(user)).to.equal(50);
}) 
// average from all users from a spicific date
  it('should be able to list the average of all activities by date for all users', () => {
    expect(activityRepo.averageAllUserActivities(date)).to.deep.equal(
      {
        numStepsAverage: 1233,
        minutesActiveAverage: 82,
        flightsOfStairsAverage: 13
      })
  })

});