let index = localStorage.getItem(ITEM_KEY);
let sprint = sprintInventory.inventory[0][index];

let sprintNameDisplayRef = document.getElementById("sprintName");
sprintNameDisplayRef.innerHTML = sprint.name;

let sprintStartDateDisplayRef = document.getElementById("startDate");
sprintStartDateDisplayRef.innerHTML = sprint.startDate;

let sprintEndDateDisplayRef = document.getElementById("endDate");
sprintEndDateDisplayRef.innerHTML = sprint.endDate;

function completeSprint() {
    sprintInventory.completeSprint(index);
    updateLSData(SPRINT_INVENTORY_KEY, sprintInventory)
    window.location = "sprintBoard.html"
}


 /**
 * Colour code tasks by their tags (UI, Core, Testing)
 */
const TAG_TO_COLOR = {
    "UI": "background-color: rgba(0, 255, 255, 0.4);",
    "Core": "background-color: rgba(144, 238, 144, 0.4);",
    "Testing": "background-color: rgba(255, 191, 0, 0.4);"
};


/**
 * Display all items within a sprint in 3 columns based on their status (Not started, In progress, Completed)
 * @param {Sprint} currentSprint 
 */
function displaySprintBacklog(currentSprint) {
    let sprintBacklogDisplayRef = document.getElementById("display-sprint-backlog");

    // separate sprint PBIs into 3 categories (not started, in progress, completed)
    let notStarted = []
    let inProgress = []
    let completed = []

    for (let i=0 ; i<currentSprint.items.length ; i++) {
        taskStatus = currentSprint.items[i].status
        // add tasks to not started category
        if (taskStatus=="Not started") {
            let item = [i, currentSprint.items[i]]
            notStarted.push(item)
        }
        else if (taskStatus=="In progress") {
            let item = [i, currentSprint.items[i]]
            inProgress.push(item)
        }
        else if (taskStatus=="Completed"){
            let item = [i, currentSprint.items[i]]
            completed.push(item)
        }
    }

    let output = ``

    output += `
        <div class="col-sm" id="notStarted">
            <h3>Not Started</h3>`

    // not started tasks column
    for (let i=0 ; i<notStarted.length ; i++) {
        output += `
        <div class="col">
            <div class="card" style="width: 14rem";>
                <div class="card-header" style="height:40px">${i+1}) <strong>${notStarted[i][1].name}</strong></div>
                <div class="card-body" style="${TAG_TO_COLOR[notStarted[i][1].tag]}">
                    <table style="width:100%">
                        <tr style="height:40px">
                            <th style="width:55%">Tag:</th>
                            <td style="text-align: right">${notStarted[i][1].tag}</td>
                        </tr>
                        <tr style="height:40px">
                            <th style="width:55%">Priority:</th>
                            <td style="text-align: right">${notStarted[i][1].priority}</td>
                        </tr>
                        <tr style="height:40px">
                            <th style="width:55%">Story Points:</th>
                            <td style="text-align: right">${notStarted[i][1].numStoryPoints}</td>
                        </tr>
                    </table>                    
                </div>
                <div class="card-footer" style="background-color: white; height:30px; padding:0px 0px 0px 97px;">
                    <div class="button-wrapper">
                        <button type="button" id="view-PBI-button" class="btn btn-primary" onclick="start(${notStarted[i][0]})">Start</button>
                        <button type="button" id="view-PBI-button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#viewSprintTaskPopUp" onclick="viewPBI(${notStarted[i][0]})">View</button>
                    </div>
                </div>
            </div>
        </div>
    `
    }

    output += `
        </div>
        <div class="col-sm" id="inProgress">
            <h3>In Progress</h3>`

    // in progress tasks column
    for (let i=0 ; i<inProgress.length ; i++) {
        output += `
        <div class="col">
            <div class="card" style="width: 14rem";>
                <div class="card-header" style="height:40px">${i+1}) <strong>${inProgress[i][1].name}</strong></div>
                <div class="card-body" style="${TAG_TO_COLOR[inProgress[i][1].tag]}">
                    <table style="width:100%">
                        <tr style="height:40px">
                            <th style="width:55%">Tag:</th>
                            <td style="text-align: right">${inProgress[i][1].tag}</td>
                        </tr>
                        <tr style="height:40px">
                            <th style="width:55%">Priority:</th>
                            <td style="text-align: right">${inProgress[i][1].priority}</td>
                        </tr>
                        <tr style="height:40px">
                            <th style="width:55%">Story Points:</th>
                            <td style="text-align: right">${inProgress[i][1].numStoryPoints}</td>
                        </tr>
                    </table>                    
                </div>
                <div class="card-footer" style="background-color: white; height:30px; padding:0px 0px 0px 97px;">
                    <div class="button-wrapper">
                        <button type="button" id="view-PBI-button" class="btn btn-success" onclick="complete(${inProgress[i][0]})">Complete</button>
                        <button type="button" id="view-PBI-button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#viewSprintTaskPopUp" onclick="viewPBI(${inProgress[i][0]})">View</button>
                    </div>
                </div>
            </div>
        </div>
    `
    }

    output += `
        </div>
            <div class="col-sm" id="completed">
            <h3>Completed</h3>`

    // completed tasks column
    for (let i=0 ; i<completed.length ; i++) {
        output += `
        <div class="col">
            <div class="card" style="width: 14rem";>
                <div class="card-header" style="height:40px">${i+1}) <strong>${completed[i][1].name}</strong></div>
                <div class="card-body" style="${TAG_TO_COLOR[completed[i][1].tag]}">
                    <table style="width:100%">
                        <tr style="height:40px">
                            <th style="width:55%">Tag:</th>
                            <td style="text-align: right">${completed[i][1].tag}</td>
                        </tr>
                        <tr style="height:40px">
                            <th style="width:55%">Priority:</th>
                            <td style="text-align: right">${completed[i][1].priority}</td>
                        </tr>
                        <tr style="height:40px">
                            <th style="width:55%">Story Points:</th>
                            <td style="text-align: right">${completed[i][1].numStoryPoints}</td>
                        </tr>
                    </table>                    
                </div>
                <div class="card-footer" style="background-color: white; height:30px; padding:0px 0px 0px 162px;">
                    <div class="button-wrapper">
                        <button type="button" id="view-PBI-button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#viewSprintTaskPopUp" onclick="viewPBI(${completed[i][0]})">View</button>
                    </div>
                </div>
            </div>
        </div>
    `
    }

    output += `</div></div>`

    sprintBacklogDisplayRef.innerHTML = output
}


displaySprintBacklog(sprint)


function start(task) {
    // store data in LS
    localStorage.setItem(PBI_KEY, task);

    // Global code to retrieve data to be edited
    let taskIndex = localStorage.getItem(PBI_KEY);

    // start task
    sprint.items[taskIndex].status = "In progress"

    // store data in LS
    localStorage.setItem(PBI_KEY, task)
    updateLSData(SPRINT_INVENTORY_KEY, sprintInventory)

    location.reload();
}


function complete(task) {
    // store data in LS
    localStorage.setItem(PBI_KEY, task);

    // Global code to retrieve data to be edited
    let taskIndex = localStorage.getItem(PBI_KEY);

    // start task
    sprint.items[taskIndex].status = "Completed"

    // store data in LS
    localStorage.setItem(PBI_KEY, task)
    updateLSData(SPRINT_INVENTORY_KEY, sprintInventory)

    location.reload();
}