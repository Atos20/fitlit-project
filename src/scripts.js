
const cardName = document.querySelector(".card-name");
const address = document.querySelector(".address");
const email = document.querySelector(".email");
const dailyStepGoal = document.querySelector(".daily-step-goal");
const averageStepGoal = document.querySelector(".average-step-goal")
const welMessage = document.querySelector(".wel-message")

let trialData1 = { 
    "id": 2,
    "name": "Christopher Jonson",
    "address": "123 5th Street, Denver CO 12345",
    "email": "Christopher@hotmail.com",
    "strideLength": 4,
    "dailyStepGoal": 20000,
    "friends": [ 1, 3, 4] 
};

let trialData2 = { 
    "id": 10,
    "name": "Mar Matlak",
    "address": "321 100th Street, Boulder CO 54321",
    "email": "Mar@hotmail.com",
    "strideLength": 10,
    "dailyStepGoal": 10000,
    "friends": [ 10, 30, 40]
  };

let user1 = new User(trialData1)
let user2 = new User(trialData2)

let userRepo = new UserRepository([user1, user2])

let loadCardInfo = (user, userRepo) => {
    cardName.innerText = user.name;
    address.innerText = user.address;
    email.innerText = user.email;
    dailyStepGoal.innerText = `Your Step Goal: ${user.dailyStepGoal}`
    averageStepGoal.innerText = `Average Step Goal of All Users: ${userRepo.calculateAverageStepGoalAll()}`
}

let updateWelcomeMessage = (user) => {
    welMessage.innerText = `Welcome ${user.getFirstName()}! Let's have another great day!`
}

let loadUserData = (user, userRepo) => {
    loadCardInfo(user, userRepo);
    updateWelcomeMessage(user);
}


window.onload = loadUserData(user1, userRepo)