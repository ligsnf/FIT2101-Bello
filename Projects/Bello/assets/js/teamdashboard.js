/**
 * FILENAME :   teamdashboard.js             
 * PURPOSE  :   Contains the funtionality for viewing the team's effort within a specific period on the Team Dashboard Page.
 * LAST MODIFIED : 13 Oct 22
 */


/**
 * Display the all team members effort table on the Team Members Page
 * @param {*} sprintInventory 
 */
 function displayTeamDashboard(sprintInventory) {
    let currentSprint = sprintInventory[0][0]
    let sprintStart = Date.parse(currentSprint.startDate)
    let sprintEnd = Date.parse(currentSprint.endDate)
    
    // Alert user if start date is after end date
    if (sprintStart>sprintEnd) {
        alert("End date cannot be before start date");
        return
    }
}
