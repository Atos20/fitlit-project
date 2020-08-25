

const cardName = document.querySelector(".card-name");
const address = document.querySelector(".address");
const email = document.querySelector(".email");
const dailyStepGoal = document.querySelector(".daily-step-goal");
const welMessage = document.querySelector(".wel-message")

let trialData = { 
    "id": 2,
    "name": "Christopher Jonson",
    "address": "123 5th Street, Denver CO 12345",
    "email": "Christopher@hotmail.com",
    "strideLength": 4,
    "dailyStepGoal": 20000,
    "friends": [ 1, 3, 4] 
};

let user = new User(trialData)

let loadCardInfo = (user) => {
    cardName.innerText = user.name;
    address.innerText = user.address;
    email.innerText = user.email;
    dailyStepGoal.innerText = user.dailyStepGoal
}

let updateWelcomeMessage = (user) => {
    welMessage.innerText = `Welcome ${user.getFirstName()}! Let's have another great day!`
}

let loadUserData = (user) => {
    loadCardInfo(user);
    updateWelcomeMessage(user);
}


window.onload = loadUserData(user)