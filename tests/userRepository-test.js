const chai = require('chai');
const expect = chai.expect;

const UserRepository = require('../data/userRepository')

describe('UserRepository',() => {
  let userRepository
  let data
  beforeEach(() => {
    data = [{ "id": 1,
    "name": "Orlando",
    "address": "123 1st Street, Denver CO 12345",
    "email": "Orlando@hotmail.com",
    "strideLength": 4.5,
    "dailyStepGoal": 10000,
    "friends": [
      2,
      3,
      4
    ]}, { "id": 2,
    "name": "Nathaniel",
    "address": "123 5th Street, Denver CO 12345",
    "email": "nathaniel@hotmail.com",
    "strideLength": 4,
    "dailyStepGoal": 15000,
    "friends": [
      1,
      3,
      4
    ]},
  ]
    userRepository = new UserRepository(data)
  })
  it('Should be a function',()=>{
    expect(UserRepository).to.be.a('function')
  })

  it('Should instantiate UserRepository',() => {
    expect(userRepository).to.be.an.instanceof(UserRepository)
  })

  it('Should store user data', ()=> {
    expect(userRepository.usersData).to.deep.equal(data)
  })
});
