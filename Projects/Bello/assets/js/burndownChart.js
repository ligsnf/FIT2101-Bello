/**
 * FILENAME :   burndownChart.js             
 * PURPOSE  :   Contains the funtionality for showing the burndown chart of an ongoing sprint.
 * LAST MODIFIED : 14 Oct 22
 */


// Global code
let index = localStorage.getItem(ITEM_KEY);
let sprint = sprintInventory.inventory[0][index];

// if (sprint.items.length==0) {
//     let pbi1 = new PBI("Test Task 1", "text 1", "Story", "UI", "1", "Not started", "Low", "A")
//     sprint.addItem(pbi1)
//     let pbi2 = new PBI("Test Task 2", "text 2", "Bug", "Core", "2", "Not started", "High", "B")
//     sprint.addItem(pbi2)
//     let pbi3 = new PBI("Test Task 3", "text 3", "Bug", "Testing", "3", "Not started", "Medium", "C")
//     sprint.addItem(pbi3)
//     let pbi4 = new PBI("Test Task 4", "text 4", "Story", "Core", "4", "Not started", "High", "D")
//     sprint.addItem(pbi4)
// }

// Load burndown chart
burndownChart();

function burndownChart() {
    let sprintDateRange = dateRange(new Date(sprint.startDate), new Date(sprint.endDate));
    let sprintNumDays = numDays(new Date(sprint.startDate), new Date(sprint.endDate));
    let sprintTotalStoryPoints = totalStoryPoints();
    var idealVelocity_ = {
        x: sprintDateRange,
        y: idealVelocity(sprintTotalStoryPoints, sprintNumDays),
        mode: "lines",
        name: "Ideal Velocity"
    }
    var actualVelocity_ = {
        x: sprintDateRange,
        y: actualVelocity(sprintTotalStoryPoints, sprintNumDays),
        type: "scatter",
        name: "Actual Velocity"
    }
    var effortAccumulation_ = {
        x: sprintDateRange,
        y: effortAccumulation(sprintNumDays),
        yaxis: 'y2',    
        type: "bar",
        name: "Effort Accumulation",
        marker: {
            color: 'rgb(242, 237, 75)',
            opacity: 0.7,
        },
        width: 0.3
    }
    let layout = {
        showlegend: true,
        legend: {
            x: 0,
            y: -0.4
        },
        title: `${sprint.name} Burndown Chart`,
        height: 550,
        xaxis: {
            title: "Date",
            autotick: false,
            ticks: "outside",
            tick0: 0,
        },
        yaxis: {
            title: "Velocity (Story Points)",
            overlaying: 'y2'
        },
        yaxis2: {
            title: "Accumulation of effort (Hours)",
            side: 'right',
            showgrid: false,
        }
    }
    Plotly.newPlot("burndownChart", [idealVelocity_,actualVelocity_,effortAccumulation_], layout);
}


function totalStoryPoints() {
    // Loops through each PBI to count the number of story points
    let storyPoints = 0;
    for (let i = 0; i < sprint.items.length; i++) {
        storyPoints += parseInt(sprint.items[i].numStoryPoints);
    }
    return storyPoints;
}


function numDays(startDate, endDate) {
    // Find number of days between start and end
    return (endDate.getTime() - startDate.getTime())/(1000*60*60*24);
}


function idealVelocity(totalStoryPoints, numDays) {
    // If there are no points, return all days filled with 0
    if (totalStoryPoints == 0) {
        return Array(numDays+1).fill(0);
    }

    // Initialise variables
    let data = [];
    let pointsPerDay = totalStoryPoints/(numDays);
    let points = totalStoryPoints;

    // Loop to create array of decreasing points
    while (points > 0) {
        data.push(points);
        points -= pointsPerDay;
    }
    data.push(0);
    return data;
}

function actualVelocity(totalStoryPoints, numDays) {
    // If there are no points, return all days filled with 0
    if (totalStoryPoints == 0) {
        return Array(numDays+1).fill(0);
    }

    // Initialise variables
    let data = [];
    let points = totalStoryPoints;
    let tempPoints = totalStoryPoints;

    // Loop to create array of decreasing points
    for (let i = 0; i < numDays+1; i++) {
        tempPoints = points - sprint.velocityLog[i];
        data.push(tempPoints);
        points = tempPoints;
    }

    return data;
}

function effortAccumulation(numDays) {
    // If there are no points, return all days filled with 0
    if (totalStoryPoints == 0) {
        return Array(numDays+1).fill(0);
    }

    // Initialise variables
    let data = [];
    let effortTotal = 0;

    // Loop to create array of decreasing points
    for (let i = 0; i < numDays+1; i++) {
        effortTotal += (sprint.effortLog[i] / 60);
        data.push(effortTotal);
    }

    return data;
}


function dateRange(startDate, endDate) {
    // Initialise variables
    let data = [];
    let firstDate = new Date(startDate);
    let currentDate = firstDate
    let lastDate = new Date(endDate);
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    // Create array of increasing dates until last date is reached
    while(currentDate <= lastDate) {
        data.push([currentDate.getDate(), months[currentDate.getMonth()]].join(' '));
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return data;
}


/**
 * Go back to the sprint backlog page of the currently viewing sprint
 * @param {int} currentIndex The index number of the sprint
 */
function goBack(currentIndex) {
    localStorage.setItem(ITEM_KEY, currentIndex);
    window.location = "currentsprint.html";
}


/**
 * Display the burndown chart page
 * @param {int} currentIndex The index number of the sprint
 */
function displayPage(currentIndex) {
    let goBackButtonRef = document.getElementById("goBackButton")
    goBackButtonRef.innerHTML = `<button id="goBackButton" type="button" class="btn btn-secondary icon" onclick="goBack(${currentIndex})">Go Back</button>`
}


// display burndown chart page
displayPage(index)