const chai = require('chai');
const expect = chai.expect;
const User = require('../src/user');
const dummyActivityData = require('../data/dummyActivityData');
const dummyUserData = require('../data/dummyUserData');

describe('User', () => {
  let today;
  let user;
  let user2;
  let user3;
  let user4;
  let userData;
  let userData2;
  let activityTestData;
  let userTestData;

  beforeEach(() => {
    today = '2020/08/22';
    activityTestData = dummyActivityData;
    userTestData = dummyUserData;
    user = new User(userTestData[0]);
    user2 = new User(userTestData[1]);
    user3 = new User(userTestData[2]);
    user4 = new User(userTestData[3])

  });

  it('should intantiate a user', () => {
    expect(user).to.be.an.instanceof(User);
  });

  it('should be able to have an id', () => {
    expect(user.id).to.equal(1);
  });

  it('should be able to have a name', () => {
    expect(user.name).to.equal('Paco diPoi');
  });

  it('should be able to have an address', () => {
    expect(user.address).to.equal("123 Nakia Tunnel, Oaxaca VA 19901-1697");
  });

  it('should be able to have an email', () => {
    expect(user.email).to.equal("Paco@gmail.com");
  });

  it('should be able to have a strideLength', () => {
    expect(user.strideLength).to.equal(3.9);
  });

  it('should be able to have a stepGoal', () => {
    expect(user.dailyStepGoal).to.equal(10000);
  });

  it('should be able to keep track of friends', () => {
    expect(user.friends).to.deep.equal([ 2, 3, 4]);
  });

  it('should be able to have different values', () => {
    expect(user2.id).to.equal(2)
    expect(user2.name).to.equal("Viridiana Monsidine")
    expect(user2.address).to.equal("123 Kathryn Port, Puebla NE 07273")
    expect(user2.email).to.equal("Viridiana@gmail.com")
    expect(user2.strideLength).to.equal(5.0)
    expect(user2.dailyStepGoal).to.equal(2000)
    expect(user2.friends).to.deep.equal([ 1, 3, 4])
  });

  it('should be able to return the name of the user', () => {
    expect(user.getFirstName()).to.equal('Paco')
    expect(user2.getFirstName()).to.equal('Viridiana')
  });

  it('should be able to list the information about the user\'s friends', () => {
    const getMyFriends = user.retrieveFriendsList(user, userTestData)
    expect(getMyFriends ).to.deep.equal([user2, user3, user4])
  })
  it('should be able to get the users average step count for a given week', () => {
    expect(user.getUserStepCount(user, activityTestData, today)).to.equal(71378)
  })

  it('should be able to get the users friends average step count for a given week with it\'s id\'s', () => {
    expect(user. getFriendsStepCount(user, userTestData, activityTestData, today)).to.deep.equal(
      [
        { id: 2, averageStep: 40886 },
        { id: 3, averageStep: 61369 },
        { id: 4, averageStep: 63014 }
      ]);
  })

  it('should be able to to return the information from the person who have walked the most', () => {
    expect(user. getBestWalkersData(user, userTestData, activityTestData, today)).to.deep.equal(user4)
  })
});