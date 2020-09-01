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
const userImage = document.querySelector(".user-image")




const today = "2019/09/22";
const userRepo = new UserRepository(userData)
userRepo.createUsers()
let visibleUser = userRepo.userInstances[0]

const hydrationRepo = new HydrationRepository(hydrationData);
const sleepRepo = new SleepRepository(sleepData);
const activityRepo = new ActivityRepository(activityData);

let number = () => {
  return Math.floor(Math.random()*10)
}

let loadCardInfo = (user, userRepo) => {
  cardName.innerText = user.name;
  address.innerText = user.address;
  userImage.src = `../stock_photos/${number()}.jpeg`
  email.innerText = user.email;
  dailyStepGoal.innerText = `Your Step Goal: ${user.dailyStepGoal}`
  averageStepGoal.innerText = `Average Step Goal of All Users: ${userRepo.calculateAverageStepGoalAll()}`
}

let displayDailyWaterConsumption = (user, date) => {
  const result = hydrationRepo.returnDaysHydration(user.id, date);
  const labels = ['Daily Water Consumption']
  const listOfDates = [];
  const dailyHydrationTemplate = new ChartTemplate('polarArea', labels, 'Daily Water Consumption',[result, 50])
  new Chart(waterDailyChart, dailyHydrationTemplate);
}

let displayWeeklyWaterConsumption = (user, date) => {
  const data = hydrationRepo.returnWeeksHydration(user.id, date);
  const weekDates = hydrationRepo.retriveHydrationDates(user.id, date) ;
  const formatedDates = weekDates.map(newDate => moment(newDate).format('MM-DD'));
  const values = hydrationRepo.retriveHydrationValues(user.id, date) ;
  const weeklyHydrationTemplate = new ChartTemplate('bar', formatedDates, 'Weekly Water Consumption', values)
  new Chart(waterWeeklyChart, weeklyHydrationTemplate);
}



let displayFriends = (user, data) => {
  friendsList.innerHTML = ''
  let friends = user.retrieveFriendsList(data)
  friends.forEach((friend) => {
    friendsList.insertAdjacentHTML('beforeEnd',
    `<div class="friends-card">
      <h3 class="card-title">${friend.name}</h3>
      <img class="user-image" src="../stock_photos/${number()}.jpeg" alt="">
      <h3 class="card-title">Friend's Step Goal</h3>
      <h3>${friend.dailyStepGoal}</h3>
    </div>`
  )
  })
}

let displayTopThree = (user, usersRepo, activityData, date) => {
  let winner = user.getBestWalkersData(usersRepo, activityData, date)
  firstPlaceCard.innerHTML = `<div class="first-place rank-card">
    <h3 class="card-title"> First Place! </h3>
    <img class="user-image" src="../stock_photos/${number()}.jpeg" alt="">
    <h4> ${winner[0].name} </h4>
    <h4 class="card-title"> Ave. Daily Steps</h4>
    <h4> ${winner[0].averageStep} </h4>
  </div>`
  secondPlaceCard.innerHTML = `<div class="second-place rank-card">
    <h3 class="card-title"> Second Place! </h3>
    <img class="user-image" src="../stock_photos/${number()}.jpeg" alt="">
    <h4> ${winner[1].name} </h4>
    <h4 class="card-title"> Ave. Daily Steps </h4>
    <h4> ${winner[1].averageStep} </h4>
  </div>`
  thirdPlaceCard.innerHTML = `<div class="third-place rank-card">
    <h3 class="card-title"> Third Place! </h3>
    <img class="user-image" src="../stock_photos/${number()}.jpeg" alt="">
    <h4> ${winner[2].name} </h4>
    <h4 class="card-title"> Ave. Daily Steps </h4>
    <h4> ${winner[2].averageStep} </h4>
  </div>`
}

let displayDailyAndAverageSleepData = (user, date) => {
  const aveData = [sleepRepo.averageSleepHoursAllTime(user.id), sleepRepo.averageSleepQualityAllTime(user.id)];
  const dailyData = [sleepRepo.specificNightsHours(user.id, date), sleepRepo.specificNightsQuality(user.id, date)];
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


let displayWeeklySleepQuality = (user, date) => {//= 2
  const results = sleepRepo.specificWeeksQuality(user.id, date);
  const data = Object.values(results)
  const labels = Object.keys(results)
  const weeklySleepQTemplate = new ChartTemplate('bar', labels, "Last Week's Sleep Quality", data)
  const weeklySleepQChart = new Chart(sleepWeeklyQChart, weeklySleepQTemplate);
}

let weeklySleepQualityAndSleepHours = (user, date) => {
  const hoursSlept = sleepRepo.specificWeeksHours(user.id, date);//=> data1
  const sleepQuality = sleepRepo.specificWeeksQuality(user.id, date);//=> data2
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
  minutesActive.innerText = `${activityRepo.minutesActiveByDate(user, date)} mins`
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
new Chart(activityVsAllChart, vsAllActivityTemplate);
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
  new Chart(activityWeeklyChart, weeklyActivityTemplate);
}

let updateWelcomeMessage = (user) => {
  welMessage.innerText = `Welcome ${user.getFirstName()}! Let's have another great day!`
}

let loadUserDataForDay = (user, userRepo, today, data) => {
  loadCardInfo(user, userRepo);
  updateWelcomeMessage(user);
  displayDailyWaterConsumption(user, today)
  displayWeeklyWaterConsumption(user, today)
  displayDailyAndAverageSleepData(user, today)
  weeklySleepQualityAndSleepHours(user, today)
  displayDailySteps(user, today)
  displayDailyMilesAndMinutes(user, today)
  displayWeeklyActivity(user, today)
  displayDailyActivityVsAll(user, today)
  displayFriends(user, data);
  displayTopThree(user, data, activityRepo.data, today)
}


window.onload = loadUserDataForDay(visibleUser, userRepo, today, userRepo.usersData)
