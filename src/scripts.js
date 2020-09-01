// const HydrationRepository = require("./hydrationRepository");

const cardName = document.querySelector(".card-name");
const address = document.querySelector(".address");
const email = document.querySelector(".email");
const dailyStepGoal = document.querySelector(".daily-step-goal");
const averageStepGoal = document.querySelector(".average-step-goal")
const welMessage = document.querySelector(".wel-message");
const waterDailyChart = document.querySelector("#daily-hydration-chart").getContext('2d');
const waterWeeklyChart = document.querySelector("#weekly-hydration-chart").getContext('2d');
const sleepWeeklyHChart = document.querySelector("#pastWeek-sleep-hours").getContext('2d');
const sleepAllTimeChart = document.querySelector("#allTime-sleep-hours-and-quality").getContext('2d');
const dailySteps = document.querySelector("#daily-steps")
const minutesActive = document.querySelector("#minutes-active")
const distanceWalked = document.querySelector("#distance-walked")
const activityVsAllChart = document.querySelector("#activity-data-vs-all-daily").getContext('2d');
const activityWeeklyChart = document.querySelector("#weekly-activty").getContext('2d');
const statusMessage = document.querySelector(".status-message")
const firstPlaceCard = document.querySelector(".first-place")
const secondPlaceCard = document.querySelector(".second-place")
const thirdPlaceCard = document.querySelector(".third-place")
const friendsList = document.querySelector(".cards-wrap-friends")




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
  console.log(user)
  const result = hydrationRepo.returnDaysHydration(user.id, today);
  const labels = ['Daily Water Consumption']
  const listOfDates = [];
  const dailyHydrationTemplate = new ChartTemplate('polarArea', labels, 'Daily Water Consumption',[result, 50])
  const dailyHydrationChart = new Chart(waterDailyChart, dailyHydrationTemplate);
  return result;
}

let displayWeeklyWaterConsumption = (user, today) => {
  const data = hydrationRepo.returnWeeksHydration(user.id, today);
  const weekDates = hydrationRepo.retriveHydrationDates(user.id, today) ;
  const formatedDates = weekDates.map(newDate => moment(newDate).format('MM-DD'));
  const values = hydrationRepo.retriveHydrationValues(user.id, today) ;
  const weeklyHydrationTemplate = new ChartTemplate('bar', formatedDates, 'Weekly Water Consumption', values)
  const weeklyHydrationChart = new Chart(waterWeeklyChart, weeklyHydrationTemplate);

}



let displayFriends = (user, data) => {
  friendsList.innerHTML = ''
  let friends = user.retrieveFriendsList(data)
  friends.forEach((friend) => {
    friendsList.insertAdjacentHTML('beforeEnd',
    `<div class="friends-card">
      <h3>${friend.name}</h3>
      <!-- <img class="user-image" src="http://i.pravatar.cc/150?img=11" alt=""> -->
      <h3>Friend's Step Goal</h3>
      <h3>${friend.dailyStepGoal}</h3>
    </div>`
  )
  })
}

let displayTopThree = (user, usersData, activityData, date) => {
  let winner = user.getBestWalkersData(usersData, activityData, date)
  firstPlaceCard.innerHTML = `<div class="first-place rank-card">
    <h3> First Place! </h3>
    <h4> ${winner[0].name} </h4>
    <h4> Average Steps Over The Week </h4>
    <h4> ${winner[0].averageStep} </h4>
  </div>`
  secondPlaceCard.innerHTML = `<div class="second-place rank-card">
    <h3> Second Place! </h3>
    <h4> ${winner[1].name} </h4>
    <h4> Average Steps Over The Week </h4>
    <h4> ${winner[1].averageStep} </h4>
  </div>`
  thirdPlaceCard.innerHTML = `<div class="third-place rank-card">
    <h3> Third Place! </h3>
    <h4> ${winner[2].name} </h4>
    <h4> Average Steps Over The Week </h4>
    <h4> ${winner[2].averageStep} </h4>
  </div>`
}

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
      responsive: true,
      maintainAspectRatio: true,
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
  const data2 = Object.values(sleepQuality);
  const labels = Object.keys(sleepQuality); //=> dates
  const formatedDates = labels.map(newDate => moment(newDate).format('MM-DD'));
  let sleepTemplate = {
    type: 'bar',
    data: {
        labels: formatedDates,// => dates
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
            borderWidth: 1,
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
  dailySteps.innerText = activityRepo.getStepsPerDay(user, date)
  statusMessage.innerText = activityRepo.stepGoalSuccess(user, date)
}

let displayDailyMilesAndMinutes = (user, date) => {
  distanceWalked.innerText = `${activityRepo.getMilesPerDay(user, date)} miles`
  minutesActive.innerText = `${activityRepo.minutesActiveByDate(user, date)} minutes`
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
  const weekDates = activityRepo.returnPriorWeekDates(user, date);
  const formatedDates = weekDates.map(newDate => moment(newDate).format('MM-DD'));
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
        labels: formatedDates,
        datasets: [{
            label: 'Miles',
            data: weeklyMiles,
            backgroundColor: [

                'rgba(54, 162, 235, 0.2)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)'
            ],
            borderWidth: 1,
            fill: false,
            lineTension: 0
        },{
            label: 'Active Minutes',
            data: weeklyActiveMin,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 1,
            fill: false,
            lineTension: 0
        },{
            label: 'Flights',
            data: weeklyFlights,
            backgroundColor: [
                'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
            fill: false,
            lineTension: 0
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

let loadUserData = (user, userRepo, data) => {
  loadCardInfo(user, userRepo);
  updateWelcomeMessage(user);
  displayDailyWaterConsumption(user, today)
  displayWeeklyWaterConsumption(user, today)
  displayDailyAndAverageSleepData(user, otherToday)
  weeklySleepQualityAndSleepHours(user, otherToday)
  displayDailySteps(user, otherToday)
  displayDailyMilesAndMinutes(user, otherToday)
  displayWeeklyActivity(user, otherToday)
  displayDailyActivityVsAll(user, otherToday)
  displayFriends(user, data);
  displayTopThree(user, data, activityRepo.data, otherToday)
}


window.onload = loadUserData(user1, userRepo, dummyUserData)
