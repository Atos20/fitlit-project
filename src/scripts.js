// const HydrationRepository = require("./hydrationRepository");

const cardName = document.querySelector(".card-name");
const address = document.querySelector(".address");
const email = document.querySelector(".email");
const dailyStepGoal = document.querySelector(".daily-step-goal");
const averageStepGoal = document.querySelector(".average-step-goal")
const welMessage = document.querySelector(".wel-message");
const waterDailyChart = document.querySelector("#daily-hydration-chart").getContext('2d');
const waterWeeklyChart = document.querySelector("#weekly-hydration-chart").getContext('2d');

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

let today = "2019/06/7";
let user1 = new User(trialData1)
let user2 = new User(trialData2)
let userRepo = new UserRepository([user1, user2])
let hydrationRepo = new HydrationRepository(dummyHydrationData);



let loadCardInfo = (user, userRepo) => {
  cardName.innerText = user.name;
  address.innerText = user.address;
  email.innerText = user.email;
  dailyStepGoal.innerText = `Your Step Goal: ${user.dailyStepGoal}`
  averageStepGoal.innerText = `Average Step Goal of All Users: ${userRepo.calculateAverageStepGoalAll()}`
}


let displayDailyWaterConsumption = (user, today) => {
  const result = hydrationRepo.returnDaysHydration(user.id, today);
  const labels = ['Daily Water Consumption']
  const listOfDates = [];
  const dailyTemplate = new ChartTemplate('bar', labels, 'Daily Water Consumption',[result, 100] ,1)
  new Chart(waterDailyChart, dailyTemplate);
  return result;
}

let displayWeeklyWaterConsumption = (user, today) => {
  const result = hydrationRepo.returnWeeksHydration(user.id, today);
  const labels = [1, 2, 3, 4, 5, 6, 7];
  const weeklyTemplate = new ChartTemplate('bar', labels, 'Weekly Water Consumption',result ,1)
  const weeklyChart = new Chart(waterWeeklyChart, weeklyTemplate);
}



let updateWelcomeMessage = (user) => {
  welMessage.innerText = `Welcome ${user.getFirstName()}! Let's have another great day!`
}

let loadUserData = (user, userRepo) => {
  loadCardInfo(user, userRepo);
  updateWelcomeMessage(user);
  displayDailyWaterConsumption(user1, today)
  displayWeeklyWaterConsumption(user1, today)
}


window.onload = loadUserData(user1, userRepo)
