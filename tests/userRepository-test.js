const chai = require('chai');
const expect = chai.expect;

const UserRepository = require('../data/userRepository')

describe('UserRepository', function(){
  it('Should be a function', function(){
    expect(UserRepository).to.be.a('function')
  })
  it('Should instantiate UserRepository', function(){
    const userRepository = new UserRepository()
    expect(userRepository).to.be.an.instanceof(UserRepository)
  })
});
