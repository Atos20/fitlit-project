class UserRepository {
  constructor(data){
    this.usersData = data
  }
}

if (typeof module !== 'undefined'){
  module.exports = UserRepository
}
