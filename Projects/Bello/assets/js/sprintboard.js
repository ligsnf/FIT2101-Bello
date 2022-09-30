/**
 * FILENAME :   sprintboard.js             
 * PURPOSE  :   Contains the funtionality for adding, editing and viewing sprints on the sprint board page.
 * LAST MODIFIED : 1 Oct 22
 */

/**
 * Add a new sprint to the sprint board page
 */
function addSprint() {
    let name = document.getElementById("sprintName").value;
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;

    let sprint = new Sprint(name, startDate, endDate);
    sprintInventory.addSprint(sprint);
    console.log(sprintInventory)
    document.getElementById("sprintName").value = "";
    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";

    // Save data
    updateLSData(SPRINT_INVENTORY_KEY, sprintInventory)

    // Update display
    displaySprintInventory(sprintInventory);

    // Close modal popup
    $('#addSprintPopUp').modal('toggle');
}


/**
 * Display all future, ongoing and past sprints on the sprint board page
 * @param {sprintInventory} sprintInventory The instance of SprintInventory that holds all future, ongoing and past sprints
 */
function displaySprintInventory(sprintInventory) {
    let startedInventoryDisplayRef = document.getElementById("startedSprints");
    let futureInventoryDisplayRef = document.getElementById("futureSprints");
    let completedInventoryDisplayRef = document.getElementById("completedSprints");
    let startedInventory = ``;
    let futureInventory = ``;
    let completedInventory = ``;

    for (let i=0; i < sprintInventory.inventory[0].length; i++) {
        let sprint = sprintInventory.inventory[0][i]
        startedInventory += `
        <div class="col">
        <div class="card" style="width: 100%;">
            <div class="card-body">
                <table style="width:100%">
                    <tr style="height:35px">
                        <th>${sprint.name}</th>
                        <td style="text-align: right">
                            <button type="button" class="btn btn-info" data-bs-toggle="modal" onclick="view(${i})"> View </button>
                        </td>
                    </tr>
                </table>                    
            </div>
        </div>
        `
    }
    startedInventoryDisplayRef.innerHTML = startedInventory;

    for (let i=0; i < sprintInventory.inventory[1].length; i++) {
        let sprint = sprintInventory.inventory[1][i]
        futureInventory += `
        <div class="col">
        <div class="card" style="width: 100%;">
            <div class="card-body">
                <table style="width:100%">
                    <tr style="height:35px">
                        <th>${sprint.name}</th>
                        <td style="text-align: right">
                            <button type="button" class="btn btn-info" data-bs-toggle="modal" onclick="edit(${i})"> Edit </button>
                        </td>
                    </tr>
                </table>                    
            </div>
        </div>
        `
    }
    futureInventoryDisplayRef.innerHTML = futureInventory;

    for (let i=0; i < sprintInventory.inventory[2].length; i++) {
        let sprint = sprintInventory.inventory[2][i]
        completedInventory += `
        <div class="col">
        <div class="card" style="width: 100%;">
            <div class="card-body">
                <table style="width:100%">
                    <tr style="height:35px">
                        <th>${sprint.name}</th>
                        <td style="text-align: right">
                            <button type="button" class="btn btn-info" data-bs-toggle="modal" onclick="viewCompleted(${i})"> View </button>
                        </td>
                    </tr>
                </table>                    
            </div>
        </div>
        `;
    }
    completedInventoryDisplayRef.innerHTML = completedInventory;
}


// Display all sprints on the sprint board page
displaySprintInventory(sprintInventory);


/**
 * View an ongoing sprint listed on the sprint board page
 * @param {int} index The index number of the ongoing sprint to be edited
 */
function view(index) {
    localStorage.setItem(ITEM_KEY, index);
    window.location = "currentsprint.html";
}


/**
 * Edit a future sprint listed on the sprint board page
 * @param {int} index The index number of the sprint to be edited
 */
function edit(index) {
    localStorage.setItem(ITEM_KEY, index);
    window.location = "editsprint.html";
}


/**
 * View a completed sprint listed on the sprint board page
 * @param {int} index The index number of the completed sprint to be viewed
 */
function viewCompleted(index) {
    localStorage.setItem(ITEM_KEY, index);
    window.location = "completedsprint.html";
}