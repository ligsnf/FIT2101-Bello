/**
 * FILENAME :   teamdashboard.js             
 * PURPOSE  :   Contains the funtionality for viewing the team's effort within a specific period on the Team Dashboard Page.
 * LAST MODIFIED : 14 Oct 22
 */


// Global code for start & end dates of specified time period
let startPeriod = null
let endPeriod = null


/**
 * Display the all team members effort table on the Team Members Page
 * @param {*} sprintInventory the list of all sprints for this project
 */
 function displayTeamDashboard() {
    let teamDashboardTableRef = document.getElementById("teamDashboardTable")

    let tableOutput = `
        <thead>
          <tr>
            <th scope="col" style="width: 5%">Team Member #</th>
            <th scope="col" style="width: 10%">Name</th>
            <th scope="col" style="width: 10%">Average Number of Hours</th>
          </tr>
        </thead>
        <tbody>
    `

    for (let i=0 ; i<team.team.length ; i++) {
        let member = team.team[i]

        tableOutput += `
            <tr>
                <th scope="row">${i+1}</th>
                <td>${member.name}</td>
                <td>${calculateAverage(i)}</td>
            </tr>
        `
    }

    tableOutput += `</tbody>`

    teamDashboardTableRef.innerHTML = tableOutput
}


/**
 * Sets the start and end dates of the time period
 * @param {*} startDate start date of the time period
 * @param {*} endDate end date of the time period
 * @returns if alerts raised
 */
function setPeriod(startDate, endDate) {
    // Alert user if start date not selected
    if (!startDate) {
        alert("Please select a start date");
        return
    }

    // Alert user if end date not selected
    if (!endDate) {
        alert("Please select an end date");
        return
    }

    // Alert user if start date is after end date
    if (startDate>endDate) {
        alert("End date cannot be before start date");
        return
    }

    startPeriod = new Date(startDate)
    endPeriod =  new Date(endDate)
    displayTeamDashboard()
}


/**
 * Calculates the average number of hours spent on project during a specific time period
 * @param {*} index the index of the team member in the team members list
 * @returns average number of hours
 */
function calculateAverage(index) {
    // calculate the number of days between the selected start & end dates
    let daysBetween = (endPeriod-startPeriod) / (1000 * 3600 * 24) + 1
    console.log("days: " + daysBetween)

    let startDate = startPeriod
    startDate.setDate(startPeriod.getDate()+1)
    startDate = startPeriod.toISOString().split('T')[0]

    let endDate = endPeriod
    endDate.setDate(endPeriod.getDate()+1)
    endDate = endPeriod.toISOString().split('T')[0]

    // find the total number of hours logged within period
    let dateLogged = team.team[index].dateLog
    let timeLogged = team.team[index].timeLog
    let totalTime = 0
    for (let j=0 ; j<dateLogged.length ; j++) {
        if (startDate<=dateLogged[j].split('T')[0] && dateLogged[j].split('T')[0]<=endDate) {
            totalTime += timeLogged[j]
        }
    }
    console.log("mins: " + totalTime)

    // calculate the number of hours logged between the start & end dates
    let averageHours = totalTime/60 / daysBetween
    return averageHours.toFixed(2)
}