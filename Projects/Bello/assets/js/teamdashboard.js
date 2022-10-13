/**
 * FILENAME :   teamdashboard.js             
 * PURPOSE  :   Contains the funtionality for viewing the team's effort within a specific period on the Team Dashboard Page.
 * LAST MODIFIED : 13 Oct 22
 */

// Global code for start & end dates of specified time period
let startPeriod = null
let endPeriod = null

/**
 * Display the all team members effort table on the Team Members Page
 * @param {*} sprintInventory 
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
                <td>5</td>
            </tr>
        `
    }

    tableOutput += `</tbody>`

    teamDashboardTableRef.innerHTML = tableOutput
}


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

    startPeriod = startDate
    endPeriod = endDate
    displayTeamDashboard()
}
