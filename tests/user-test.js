const chai = require('chai');
const expect = chai.expect;

const User = require('../src/user');

describe('User', () => {

  let user;
  let userData;

  beforeEach(() => {

    userData = { 
    "id": 2,
    "name": "Christopher",
    "address": "123 5th Street, Denver CO 12345",
    "email": "Christopher@hotmail.com",
    "strideLength": 4,
    "dailyStepGoal": 20000,
    "friends": [ 1, 3, 4]
  };
    user = new User(userData);

  });

  it('should intantiate a user', () => {
    expect(user).to.be.an.instanceof(User);
  });

  it('should be able to havea an id', () => {
    expect(user.id).to.equal(2);
  });

  it('should be able to have a name', () => {
    expect(user.name).to.equal('Christopher');
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
    expect(user.friends).to.deep.equal([]);
  });

});