const chai = require('chai');
const expect = chai.expect;
const dummyUserData = require('../data/dummyUserData');
const User = require('../src/user');
const dummyActivityData = require('../data/dummyActivityData');
const ActivityRepository = require('../src/activityRepository');

describe('ActivityRepository', () => {
  let today;
  let anotherDay;
  let activityTestData;
  let userTestData;
  let user1;
  let user;
  let activityRepo;

  beforeEach(() => {
    today = '2020/08/22';
    anotherDay = '2020/08/21';
    activityTestData = dummyActivityData;
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

  it('return the miles a user has walked based on their number of steps by date', () => {
    expect(activityRepo.getMilesPerDay(user1, today)).to.equal(6);
  });

  it('should be able return minutes active for a given day', () => {
    expect(activityRepo.minutesActiveByDate(user1, today)).to.equal(239);
  });

  it('minutes active for a given week', () => {
    expect(activityRepo.averageMinutesByWeek(user, today)).to.equal(40);
  });

  it('should evaluate if users reached their desired step goal or not', () => {
    expect(activityRepo.stepGoalSuccess(user, today)).to.equal("Let's keep walking to meet your goal!")
  });

  it('should be able return all the dates where the users exceeded their daily step goal', () => {
    expect(activityRepo.getReachedStepGoalDays(user)).to.deep.equal(['2020/08/18', '2020/08/19', '2020/08/20']);
  });

  it('should be able to return the user\'s , all-time stair climbing record', () => {
    expect(activityRepo.bestSatirClimbRecord(user)).to.equal(50);
  });

  it('should be able to list the average of all activities by date for all users', () => {
    activityRepo.getAverage([], '')
    expect(activityRepo.averageAllUserActivities(today)).to.deep.equal(
      {
        numStepsAverage: 6245.75,
        minutesActiveAverage: 173.25,
        flightsOfStairsAverage: 22.25
      })
  });

  it('should return an array of the keys from the average all activities by date', () => {
    activityRepo.averageAllUserActivities(today)
    expect(activityRepo.getKeyAllActivities(today)).to.deep.equal(['numStepsAverage', 'minutesActiveAverage', 'flightsOfStairsAverage'])
  });

  it('should return an array of the values from the average all activities by date', () => {
    activityRepo.averageAllUserActivities(today)
    expect(activityRepo.getValuesAllActivities(today)).to.deep.equal([6245.75, 173.25, 22.25])
  });

  it('should be able to return a list of all user\'s names who have exceeded 250 minutes of activity by date', () => {
    expect(activityRepo.getMostActivePeople(userTestData, anotherDay)).to.deep.equal(['Paco diPoi', 'Gerardo Connelly'])
  })

});
