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
  
  retrieveFriendsList(user){
    
  }

}

if (typeof module !== 'undefined') {
  module.exports = User;
}
