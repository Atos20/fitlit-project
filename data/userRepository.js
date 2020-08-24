class UserRepository {
  constructor(data){
    this.usersData = data
  }
  retrieveUserInfo(id){
    let userInfo = this.usersData.filter(user =>
    user.id == id)
    return userInfo
  }
}

if (typeof module !== 'undefined'){
  module.exports = UserRepository
}
