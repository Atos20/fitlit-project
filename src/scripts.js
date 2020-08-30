// const HydrationRepository = require("./hydrationRepository");

const cardName = document.querySelector(".card-name");
const address = document.querySelector(".address");
const email = document.querySelector(".email");
const dailyStepGoal = document.querySelector(".daily-step-goal");
const averageStepGoal = document.querySelector(".average-step-goal")
const welMessage = document.querySelector(".wel-message");
const waterDailyChart = document.querySelector("#daily-hydration-chart").getContext('2d');
const waterWeeklyChart = document.querySelector("#weekly-hydration-chart").getContext('2d');
// const sleepDailyChart = document.querySelector("#daily-sleep-hours-and-quality").getContext('2d');
const sleepWeeklyHChart = document.querySelector("#pastWeek-sleep-hours").getContext('2d');
// const sleepWeeklyQChart = document.querySelector("#pastWeek-sleep-quality").getContext('2d');
const sleepAllTimeChart = document.querySelector("#allTime-sleep-hours-and-quality").getContext('2d');
const dailySteps = document.querySelector("#daily-steps")
const minutesActive = document.querySelector("#minutes-active")
const distanceWalked = document.querySelector("#distance-walked")
const activityVsAllChart = document.querySelector("#activity-data-vs-all-daily").getContext('2d');
const activityWeeklyChart = document.querySelector("#weekly-activty").getContext('2d');


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
let otherToday = "2020/08/22";
let user1 = new User(dummyUserData[0])
let user2 = new User(trialData2)
let userRepo = new UserRepository([user1, user2])
let hydrationRepo = new HydrationRepository(dummyHydrationData);
let sleepRepo = new SleepRepository(sleepTestData);
let activityRepo = new ActivityRepository(activityTestData);

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
  const dailyHydrationTemplate = new ChartTemplate('polarArea', labels, 'Daily Water Consumption',[result, 50])
  const dailyHydrationChart = new Chart(waterDailyChart, dailyHydrationTemplate);
  return result;
}

let displayWeeklyWaterConsumption = (user, today) => {
  const data = hydrationRepo.returnWeeksHydration(user.id, today);
  const labels = hydrationRepo.retriveHydrationDates(user.id, today) ;
  const values = hydrationRepo.retriveHydrationValues(user.id, today) ;
  const weeklyHydrationTemplate = new ChartTemplate('bar', labels, 'Weekly Water Consumption', values)
  const weeklyHydrationChart = new Chart(waterWeeklyChart, weeklyHydrationTemplate);
}

// let displayAllTimeSleepData = (user) => {
//   const data = [sleepRepo.averageSleepHoursAllTime(user.id), sleepRepo.averageSleepQualityAllTime(user.id)];
//   const labels = ['AveHoursAllTime', 'AveQualityAllTime'];
//   const allTimeSleepTemplate = new ChartTemplate('bar', labels, "All Time Sleep Data", data)
//   const alltimeSleepChart = new Chart(sleepAllTimeChart, allTimeSleepTemplate);
// }

// let displayDailySleepData = (user, today) => {
//   const data = [sleepRepo.specificNightsHours(user.id, today), sleepRepo.specificNightsQuality(user.id, today)];
//   const labels = ['LastNightHours', 'LastNightQuality'];
//   const dailySleepTemplate = new ChartTemplate('bar', labels, "Last Night's Sleep Data", data)
//   const dailySleepChart = new Chart(sleepDailyChart, dailySleepTemplate);
// }

let displayDailyAndAverageSleepData = (user, today) => {
  const aveData = [sleepRepo.averageSleepHoursAllTime(user.id), sleepRepo.averageSleepQualityAllTime(user.id)];
  const dailyData = [sleepRepo.specificNightsHours(user.id, today), sleepRepo.specificNightsQuality(user.id, today)];
  let sleepTemplate = {
    type: 'bar',
    data: {
        labels: ['Sleep Hours', 'Sleep Quality'],
        datasets: [{
            label: 'Daily Data',
            data: dailyData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        },{
            label: 'Average', 
            data: aveData,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
};
new Chart(sleepAllTimeChart, sleepTemplate)
}

// let displayWeeklySleepHours= (user, today) => {//=1
//   const results= sleepRepo.specificWeeksHours(user.id, today)
//   const data = Object.values(results)
//   const labels = Object.keys(results)
//   const weeklySleepHTemplate = new ChartTemplate('bar', labels, "Last Week's Sleep Hours", data)
//   const weeklySleepHChart = new Chart(sleepWeeklyHChart, weeklySleepHTemplate);
// }

let displayWeeklySleepQuality = (user, today) => {//= 2
  const results = sleepRepo.specificWeeksQuality(user.id, today);
  const data = Object.values(results)
  const labels = Object.keys(results)
  const weeklySleepQTemplate = new ChartTemplate('bar', labels, "Last Week's Sleep Quality", data)
  const weeklySleepQChart = new Chart(sleepWeeklyQChart, weeklySleepQTemplate);
}

let weeklySleepQualityAndSleepHours = (user, today) => {
  const hoursSlept = sleepRepo.specificWeeksHours(user.id, today);//=> data1
  const sleepQuality = sleepRepo.specificWeeksQuality(user.id, today);//=> data2
  const data1 = Object.values(hoursSlept);
  const data2 = Object.values(sleepQuality)
  const labels = Object.keys(sleepQuality) //=> dates

  let sleepTemplate = {
    type: 'bar',
    data: {
        labels: labels,// => dates
        datasets: [{
            label: 'Hours Slept',
            data: data1,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        },{
            label: 'Sleep Quality', 
            data: data2,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
};
new Chart(sleepWeeklyHChart, sleepTemplate)
}

let displayDailySteps = (user, date) => {
  dailySteps.innerText = activityRepo.stepGoalSuccess(user, date)
  // console.log(activityRepo.returnPriorWeekDates(user, date))
}

let displayDailyMiles = (user, date) => {
  distanceWalked.innerText = `${activityRepo.getMilesPerDay(user, date)} miles`
}

let displayDailyActivityVsAll = (user, date) => {
  let dailyStepsUser = activityRepo.getStepsPerDay(user, date)
  let dailyMinsUser = activityRepo.minutesActiveByDate(user, date)
  let dailyFlightsUser = activityRepo.getFlightsPerDay(user, date)
  let aveSteps = activityRepo.averageAllUserActivities(date).numStepsAverage
  let aveMins = activityRepo.averageAllUserActivities(date).numStepsAverage
  let aveFlights = activityRepo.averageAllUserActivities(date).numStepsAverage
  let vsAllActivityTemplate = {
    type: 'bar',
    data: {
        labels: ['Daily Steps', 'Minutes Active', 'Flights'],
        datasets: [{
            label: 'User',
            data: [dailyStepsUser, dailyMinsUser, dailyFlightsUser],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        },{
            label: 'Average All',
            data: [aveSteps, aveMins, aveFlights],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
};
  const dailyActivityvsAllChart = new Chart(activityVsAllChart, vsAllActivityTemplate);
}

let displayWeeklyActivity = (user, date) => {
  const weekDates = activityRepo.returnPriorWeekDates(user, date)
  const weeklyMiles = weekDates.map((time)=> {
    return activityRepo.getMilesPerDay(user, time)
  })
  const weeklyActiveMin = weekDates.map((time)=> {
    return activityRepo.minutesActiveByDate(user, time)
  })
  const weeklyFlights = weekDates.map((time)=> {
    return activityRepo.getFlightsPerDay(user, time)
  })
  let weeklyActivityTemplate = {
    type: 'line',
    data: {
        labels: weekDates,
        datasets: [{
            label: 'Miles',
            data: weeklyMiles,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        },{
            label: 'Active Minutes',
            data: weeklyActiveMin,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        },{
            label: 'Flights',
            data: weeklyFlights,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
};
  const weeklyActivityChart = new Chart(activityWeeklyChart, weeklyActivityTemplate);
}

let updateWelcomeMessage = (user) => {
  welMessage.innerText = `Welcome ${user.getFirstName()}! Let's have another great day!`
}

let loadUserData = (user, userRepo) => {
  loadCardInfo(user, userRepo);
  updateWelcomeMessage(user);
  displayDailyWaterConsumption(user, today)
  displayWeeklyWaterConsumption(user, today)
  displayDailyAndAverageSleepData(user, otherToday)
  // displayDailySleepData(user, otherToday)
  weeklySleepQualityAndSleepHours(user, otherToday)
  // displayWeeklySleepHours(user, otherToday)
  // displayWeeklySleepQuality(user, otherToday)
  displayDailySteps(user, otherToday)
  displayDailyMiles(user, otherToday)
  displayWeeklyActivity(user, otherToday)
  displayDailyActivityVsAll(user, otherToday)
}


window.onload = loadUserData(user1, userRepo)
