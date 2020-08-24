const chai = require('chai');
const expect = chai.expect;

const User = require('../src/user');

describe('User', () => {

  let user;
  let user2;
  let userData;

  beforeEach(() => {

  userData = { 
    "id": 2,
    "name": "Christopher Jonson",
    "address": "123 5th Street, Denver CO 12345",
    "email": "Christopher@hotmail.com",
    "strideLength": 4,
    "dailyStepGoal": 20000,
    "friends": [ 1, 3, 4]
  };

   userData2 = { 
    "id": 10,
    "name": "Mar Matlak",
    "address": "321 100th Street, Boulder CO 54321",
    "email": "Mar@hotmail.com",
    "strideLength": 10,
    "dailyStepGoal": 20,
    "friends": [ 10, 30, 40]
  };
    user = new User(userData);
    user2 = new User(userData2)
  });

  it('should intantiate a user', () => {
    expect(user).to.be.an.instanceof(User);
  });

  it('should be able to have an id', () => {
    expect(user.id).to.equal(2);
  });

  it('should be able to have a name', () => {
    expect(user.name).to.equal('Christopher Jonson');
  });

  it('should be able to have an address', () => {
    expect(user.address).to.equal("123 5th Street, Denver CO 12345");
  });

  it('should be able to have an email', () => {
    expect(user.email).to.equal("Christopher@hotmail.com");
  });

  it('should be able to have a strideLength', () => {
    expect(user.strideLength).to.equal(4);
  });

  it('should be able to have a stepGoal', () => {
    expect(user.dailyStepGoal).to.equal(20000);
  });

  it('should be able to keep track of friends', () => {
    expect(user.friends).to.deep.equal([ 1, 3, 4]);
  });

  it('should be able to have different values', () => {
    expect(user2.id).to.equal(10)
    expect(user2.name).to.equal('Mar Matlak')
    expect(user2.address).to.equal("321 100th Street, Boulder CO 54321")
    expect(user2.email).to.equal("Mar@hotmail.com")
    expect(user2.strideLength).to.equal(10)
    expect(user2.dailyStepGoal).to.equal(20)
    expect(user2.friends).to.deep.equal([ 10, 30, 40])
  });

  it('should be able to return the name of the user', () => {
    expect(user.getFirstName()).to.equal('Christopher')
    expect(user2.getFirstName()).to.equal('Mar')
  });
});