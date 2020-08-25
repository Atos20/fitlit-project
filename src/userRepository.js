class UserRepository {
  constructor(data) {
    this.usersData = data
  }

  retrieveUserInfo(id) {
    let userInfo = this.usersData.filter(user =>
    user.id === id)
    return userInfo
  }

  calculateAverageStepGoalAll() {
    let totalStepGoals = this.usersData.reduce(((acc, user) =>
    acc + user["dailyStepGoal"]), 0)
    let average = totalStepGoals / this.usersData.length
    return average
  }
}

if (typeof module !== 'undefined') {
  module.exports = UserRepository
}