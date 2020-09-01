class User {
  constructor(userData) {
    this.id = userData.id;
    this.name = userData.name;
    this.address = userData.address;
    this.email = userData.email;
    this.strideLength = userData.strideLength;
    this.dailyStepGoal = userData.dailyStepGoal;
    this.friends = userData.friends;
  }

  getFirstName() {
    const firstName = this.name.split(' ');
    return firstName[0];
  }

  retrieveFriendsList(user, usersData){
    const friendsList = user.friends.map( friendId => {
      const locateInformation = usersData.find(entry => entry.id === friendId)
      return locateInformation
    })
    return friendsList
  }

  getUserStepCount(user, activityData, date) {
    const userDesiredDate = activityData.filter(entry => entry.userID=== user.id);
    const locateDate = userDesiredDate.find( entry => entry.date === date);
    const findIndex = userDesiredDate.indexOf(locateDate);
    const getDesiredWeek = userDesiredDate.slice(findIndex -6, findIndex +1);
    const getAverageStepCount = getDesiredWeek.reduce((totalAverage, userData) => {
      totalAverage += userData.numSteps
      return totalAverage
    }, 0)
    return getAverageStepCount
  }

  getFriendsStepCount(user, usersData, activityData, date) {
    const friendsList = this.retrieveFriendsList(user, usersData);
    const  weeklyFriendsStepAverage = friendsList.map(friend => { 
      const total = this.getUserStepCount(friend, activityData, date)
      return { 'id': friend.id, 'averageStep':total};
    })
    return weeklyFriendsStepAverage
  }

  getBestWalkersData(user, usersData, activityData, date) {
    const friendsWeeklyStepsAverage = this.getFriendsStepCount(user, usersData, activityData, date);
    const sortedFriendsByStepCount = friendsWeeklyStepsAverage.sort((a, b) => b.averageStep - a.averageStep);
    let bestWalkers = [sortedFriendsByStepCount[0], sortedFriendsByStepCount[1], sortedFriendsByStepCount[2]];
    return bestWalkers
  }
}

if (typeof module !== 'undefined') {
  module.exports = User;
}
