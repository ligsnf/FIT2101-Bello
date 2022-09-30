/**
 * FILENAME :   completedBurndownChart.js             
 * PURPOSE  :   Contains the funtionality for showing the burndown chart of a completed sprint.
 * LAST MODIFIED : 1 Oct 22
 */

let index = localStorage.getItem(ITEM_KEY);
let sprint = sprintInventory.inventory[2][index];


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