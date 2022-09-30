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
 * Display sprint backlog and show all tasks within the sprint in 3 columns based on their status (Not started, In progress, Completed)
 * @param {Sprint} currentSprint The sprint that is currently being viewed
 */
function displaySprintBacklog(currentSprint, currentIndex) {
    let sprintBacklogDisplayRef = document.getElementById("display-sprint-backlog")

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
                        <button type="button" id="view-PBI-button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#viewSprintTaskPopUp" onclick="viewTask(${notStarted[i][0]})">View</button>
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
                        <button type="button" id="view-PBI-button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#logTimePopUp" onclick="logTimeTask(${inProgress[i][0]})" >Log time</button>
                        <button type="button" id="view-PBI-button" class="btn btn-success" onclick="complete(${inProgress[i][0]})">Complete</button>
                        <button type="button" id="view-PBI-button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#viewSprintTaskPopUp" onclick="viewTask(${inProgress[i][0]})">View</button>
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
                        <button type="button" id="view-PBI-button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#viewSprintTaskPopUp" onclick="viewTask(${completed[i][0]})">View</button>
                    </div>
                </div>
            </div>
        </div>
    `
    }

    output += `</div></div>`

    sprintBacklogDisplayRef.innerHTML = output


    let sprintBacklogButtonsRef = document.getElementById("currentSprintButtons")
    sprintBacklogButtonsRef.innerHTML = `
        <button id="completedButton" type="button" class="btn btn-success icon" onclick="completeSprint(${currentIndex})">Complete</button>
        <button id="viewBurndownChartButton" type="button" class="btn btn-primary icon" onclick="viewBurndownChart(${currentIndex})">View Burndown Chart</button>`

}


// diplsay sprint backlog
if (sprint.items.length==0) {
    let pbi1 = new PBI("Test Task 1", "text 1", "Story", "UI", "1", "Not started", "Low", "A")
    sprint.addItem(pbi1)
    let pbi2 = new PBI("Test Task 2", "text 2", "Bug", "Core", "2", "Not started", "High", "B")
    sprint.addItem(pbi2)
    let pbi3 = new PBI("Test Task 3", "text 3", "Bug", "Testing", "3", "Not started", "Medium", "C")
    sprint.addItem(pbi3)
    let pbi4 = new PBI("Test Task 4", "text 4", "Story", "Core", "4", "Not started", "High", "D")
    sprint.addItem(pbi4)
}
displaySprintBacklog(sprint, index)


/**
 * Change the status of a sprint task from Not Started to In Progress
 * @param {PBI} task The sprint task whose status is being changed to In Progress
 */
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


/**
 * Change the status of a sprint task from In Progress to Completed
 * @param {PBI} task The sprint task whose status is being changed to Completed
 */
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


/**
 * Open ViewSprintTaskPopUp to view the selected sprint task's details
 * @param {int} i The index number of the task to be viewed within the current sprint
 */
function viewTask(i) {
    let taskDisplayRef = document.getElementById("viewSprintTaskPopUpBody");

    taskDisplayRef.innerHTML = `
                <div class="mb-3">
                <label for="taskName" class="form-label">Task Name</label>
                <input class="form-control" type="text" id="taskName" value="${sprint.items[i].name}" disabled readonly>
                </div>
                <div class="mb-3">
                <label for="taskDescription" class="form-label">Task Description</label>
                <input class="form-control" type="text" id="taskDescription" value="${sprint.items[i].description}" disabled readonly>
                </div>
                <div class="mb-3">
                <div class="row">
                    <div class="col">
                    <label for="assignee" class="form-label">Assignee</label>
                    <input class="form-control" type="text" id="assignee" value="${sprint.items[i].assignee}" disabled readonly>
                    </div>
                    <div class="col">
                    <label for="storyPoints" class="form-label">Story Points</label>
                    <input class="form-control" type="text" id="storyPoints" value="${sprint.items[i].numStoryPoints}" disabled readonly>
                    </div>
                </div>
                </div>
                <div class="mb-3">
                <div class="row">
                    <div class="col">
                    <label for="taskType" class="form-label">Task Type</label>
                    <input class="form-control" type="text" id="taskType" value="${sprint.items[i].type}" disabled readonly>
                    </div>
                    <div class="col">
                    <label for="taskTag" class="form-label">Task Tag</label>
                    <input class="form-control" type="text" id="taskTag" value="${sprint.items[i].tag}" disabled readonly>
                    </div>
                </div>
                </div>
                <div class="mb-3">
                <div class="row">
                    <div class="col">
                    <label for="priority" class="form-label">Task Priority</label>
                    <input class="form-control" type="text" id="priority" value="${sprint.items[i].priority}" disabled readonly>
                    </div>
                    <div class="col">
                    <label for="status" class="form-label">Task Status</label>
                    <input class="form-control" type="text" id="status" value="${sprint.items[i].status}" disabled readonly>
                    </div>
                </div>
                </div>
    `

    let taskDisplayFooterRef = document.getElementById("viewSprintTaskPopUpFooter");
    taskDisplayFooterRef.innerHTML = `
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    `
}


/**
 * View the burndown chart of the current sprint
 * @param {int} currentIndex The index number of the sprint
 */
function viewBurndownChart(currentIndex) {
    localStorage.setItem(ITEM_KEY, currentIndex);
    window.location = "burndownChart.html";
}

var taskIndex = 0
var timetask = null;

function logTimeTask(task) {

    timetask = task;
    // store data in LS
    localStorage.setItem(PBI_KEY, task);

    // Global code to retrieve data to be edited
    taskIndex = localStorage.getItem(PBI_KEY);

}

/**
 * Log time spent to the item in current sprint
 */
function logTime() {

    let tasktime = document.getElementById("PBITaskTime").value;
    tasktime = parseInt(tasktime);
    // start task
    let newTaskTime = parseInt(sprint.items[taskIndex]._time);
    newTaskTime += tasktime;
    sprint.items[taskIndex]._time = newTaskTime;

    document.getElementById("PBITaskTime").value = "";

    // store data in LS
    localStorage.setItem(PBI_KEY, timetask)
    updateLSData(SPRINT_INVENTORY_KEY, sprintInventory)

    // Close modal popup
    $('#logTimePopUp').modal('toggle');
}
