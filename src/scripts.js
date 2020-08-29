// const HydrationRepository = require("./hydrationRepository");

const cardName = document.querySelector(".card-name");
const address = document.querySelector(".address");
const email = document.querySelector(".email");
const dailyStepGoal = document.querySelector(".daily-step-goal");
const averageStepGoal = document.querySelector(".average-step-goal")
const welMessage = document.querySelector(".wel-message");
const waterDailyChart = document.querySelector("#daily-hydration-chart").getContext('2d');
const waterWeeklyChart = document.querySelector("#weekly-hydration-chart").getContext('2d');
const sleepDailyChart = document.querySelector("#daily-sleep-hours-and-quality").getContext('2d');
const sleepWeeklyHChart = document.querySelector("#pastWeek-sleep-hours").getContext('2d');
const sleepWeeklyQChart = document.querySelector("#pastWeek-sleep-quality").getContext('2d');
const sleepAllTimeChart = document.querySelector("#allTime-sleep-hours-and-quality").getContext('2d');


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
let otherToday = "2020/8/22";
let user1 = new User(trialData1)
let user2 = new User(trialData2)
let userRepo = new UserRepository([user1, user2])
let hydrationRepo = new HydrationRepository(dummyHydrationData);
let sleepRepo = new SleepRepository(sleepTestData);

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
  const dailyHydrationTemplate = new ChartTemplate('bar', labels, 'Daily Water Consumption',[result, 100] ,1)
  const dailyHydrationChart = new Chart(waterDailyChart, dailyHydrationTemplate);
  return result;
}

let displayWeeklyWaterConsumption = (user, today) => {
  const data = hydrationRepo.returnWeeksHydration(user.id, today);
  const labels = hydrationRepo.retriveHydrationDates(user.id, today) ;
  const values = hydrationRepo.retriveHydrationValues(user.id, today) ;
  const weeklyHydrationTemplate = new ChartTemplate('bar', labels, 'Weekly Water Consumption', values, 1)
  const weeklyHydrationChart = new Chart(waterWeeklyChart, weeklyHydrationTemplate);
}

let displayAllTimeSleepData = (user) => {
  const data = [sleepRepo.averageSleepHoursAllTime(user.id), sleepRepo.averageSleepQualityAllTime(user.id)];
  const labels = ['AveHoursAllTime', 'AveQualityAllTime'];
  const allTimeSleepTemplate = new ChartTemplate('bar', labels, "All Time Sleep Data", data, 1)
  const alltimeSleepChart = new Chart(sleepAllTimeChart, allTimeSleepTemplate);
}

let displayDailySleepData = (user, today) => {
  const data = [sleepRepo.specificNightsHours(user.id, today), sleepRepo.specificNightsQuality(user.id, today)];
  const labels = ['LastNightHours', 'LastNightQuality'];
  const dailySleepTemplate = new ChartTemplate('bar', labels, "Last Night's Sleep Data", data, 1)
  const dailySleepChart = new Chart(sleepDailyChart, dailySleepTemplate);
}

let displayWeeklySleepHours= (user, today) => {
  const results= sleepRepo.specificWeeksHours(user.id, today)
  const data = Object.values(results)
  const labels = Object.keys(results)
  const weeklySleepHTemplate = new ChartTemplate('bar', labels, "Last Week's Sleep Hours", data, 1)
  const weeklySleepHChart = new Chart(sleepWeeklyHChart, weeklySleepHTemplate);
}

let displayWeeklySleepQuality = (user, today) => {
  const results = sleepRepo.specificWeeksQuality(user.id, today);
  const data = Object.values(results)
  const labels = Object.keys(results)
  const weeklySleepQTemplate = new ChartTemplate('bar', labels, "Last Week's Sleep Quality", data, 1)
  const weeklySleepQChart = new Chart(sleepWeeklyQChart, weeklySleepQTemplate);
}

let updateWelcomeMessage = (user) => {
  welMessage.innerText = `Welcome ${user.getFirstName()}! Let's have another great day!`
}

let loadUserData = (user, userRepo) => {
  loadCardInfo(user, userRepo);
  updateWelcomeMessage(user);
  displayDailyWaterConsumption(user1, today)
  displayWeeklyWaterConsumption(user1, today)
  displayAllTimeSleepData(user1)
  displayDailySleepData(user1, otherToday)
  displayWeeklySleepHours(user1, otherToday)
  displayWeeklySleepQuality(user1, otherToday)
}


window.onload = loadUserData(user1, userRepo)
