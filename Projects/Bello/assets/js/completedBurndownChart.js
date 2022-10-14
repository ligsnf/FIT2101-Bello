/**
 * FILENAME :   completedBurndownChart.js             
 * PURPOSE  :   Contains the funtionality for showing the burndown chart of a completed sprint.
 * LAST MODIFIED : 14 Oct 22
 */


// Global code
let index = localStorage.getItem(ITEM_KEY);
let sprint = sprintInventory.inventory[2][index];

// Load burndown chart
burndownChart();

function burndownChart() {
    var idealVelocity_ = {
        x: dateRange(new Date(sprint.startDate), new Date(sprint.endDate)),
        y: idealVelocity(totalStoryPoints(), numDays(new Date(sprint.startDate), new Date(sprint.endDate))),
        mode: "lines",
        name: "Ideal Velocity"
    }
    let layout = {
        showlegend: true,
        title: "Burndown Chart",
        xaxis: {
            title: "Date",
            autotick: false,
            ticks: "outside",
            tick0: 0,
        },
        yaxis: {
            title: "Story Points"
        }
    }
    Plotly.newPlot("burndownChart", [idealVelocity_], layout);
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
        return Array(numDays).fill(0);
    }

    // Initialise variables
    let data = [];
    let pointsPerDay = totalStoryPoints/numDays;
    let points = totalStoryPoints;

    // Loop to create array of decreasing points
    while (points > 0) {
        data.push(points);
        points -= pointsPerDay;
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
    window.location = "completedsprint.html";
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