/**
 * FILENAME :   productbacklog.js             
 * PURPOSE  :   Contains the funtionality for adding, editing, deleting and viewing PBIs in the product backlog.
 * LAST MODIFIED : 14 Oct 22
 */

/**
 * Add a new PBI to the product backlog
 */
function addPBI() {
    // Getting the user inputs
    let name = document.getElementById("PBITaskName").value;
    let description = document.getElementById("PBITaskDescription").value;
    let assignee = document.getElementById("PBITaskAssignee").value;
    let storyPoints = document.getElementById("PBITaskStoryPoints").value;
    let type = document.getElementById("selectPBITaskType_").value;
    let tag = document.getElementById("selectPBITaskTag_").value;
    let priority = document.getElementById("selectPBITaskPriority_").value;
    let status = document.getElementById("selectPBITaskStatus_").value;
    
    // Checking to see if everything has been filled out
    // An alert pops up if something has not been filled in
    if (!name || !description || !assignee || !storyPoints || !type || !tag || !priority || !status) {
        alert("Please fill in all the blanks");
        return
    }
    
    // Creates a new PBI object based on user inputs
    let pbi = new PBI(name, description, type, tag, storyPoints, status, priority, assignee);
    
    
    // Create new member if they don't already exist
    if (!team.memberExists(assignee)) {
        let member = new Member();
        member.name = assignee;
        team.addMember(member);
    }
    
    // Adds item to inventory
    inventory.addItem(pbi);

    // Clearing input fields for next use
    document.getElementById("PBITaskName").value = "";
    document.getElementById("PBITaskDescription").value = "";
    document.getElementById("PBITaskAssignee").value = "";
    document.getElementById("PBITaskStoryPoints").value = "";
    document.getElementById("selectPBITaskType_").value = "";
    document.getElementById("selectPBITaskTag_").value = "";
    document.getElementById("selectPBITaskPriority_").value = "";
    document.getElementById("selectPBITaskStatus_").value = "";

    // Save data
    updateLSData(PRODUCT_BACKLOG_KEY, inventory)
    updateLSData(TEAM_KEY, team)

    // Update display
    displayProductBacklog(inventory);

    // Close modal popup
    $('#addPBIPopUp').modal('toggle');
}


/**
 * Edit a PBI
 * @param {PBI} pbi The instance of PBI being edited
 */
function edit(pbi)
{
    // store data in LS
    localStorage.setItem(PBI_KEY,pbi);

    // Global code to retrieve data to be edited
    let pbiIndex = localStorage.getItem(PBI_KEY);

    // define reference variables
    let editPBINameRef = document.getElementById("editPBIName");
    let editPBIDescriptionRef = document.getElementById("editPBIDescription");
    let editPBIAssigneeRef = document.getElementById("editPBIAssignee");
    let editPBIStoryPointsRef = document.getElementById("editPBIStoryPoints");
    let editPBITypeRef = document.getElementById("editPBIType");
    let editPBITagRef = document.getElementById("editPBITag");
    let editPBIPriorityRef = document.getElementById("editPBIPriority");
    let editPBIStatusRef = document.getElementById("editPBIStatus");

    //set the reference variables as the information as the item information that is already stored in the object
    editPBINameRef.value = inventory.productBacklog[pbiIndex].name;
    editPBIDescriptionRef.value = inventory.productBacklog[pbiIndex].description;
    editPBIAssigneeRef.value = inventory.productBacklog[pbiIndex].assignee;
    editPBIStoryPointsRef.value = inventory.productBacklog[pbiIndex].numStoryPoints;
    editPBITypeRef.value = inventory.productBacklog[pbiIndex].type;
    editPBITagRef.value = inventory.productBacklog[pbiIndex].tag;
    editPBIPriorityRef.value = inventory.productBacklog[pbiIndex].priority;
    editPBIStatusRef.value = inventory.productBacklog[pbiIndex].status;

    let editButtonsRef = document.getElementById("editButtons");
    editButtonsRef.innerHTML = `
            <div class="col">
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal" style="float: left;" onclick="deletePBI(${pbi})">Delete</button>
            </div>
            <div class="col-6">
            </div>
            <div class="col">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" style="float: right;">Close</button>
            </div>
            <div class="col">
                <button type="button" class="btn btn-primary" style="float: right;" onclick="submit()" data-bs-dismiss="modal">Save</button>
            </div>     
    `;
}


/**
 * Colour code PBI according to their tag
 */
const TAG_TO_COLOR = {
    "UI": "background-color: rgba(0, 255, 255, 0.4);",
    "Core": "background-color: rgba(144, 238, 144, 0.4);",
    "Testing": "background-color: rgba(255, 191, 0, 0.4);"
}


/**
 * Display the product backlog of the project
 * @param {Inventory} inventory The instance of Inventory where PBIs are being stored
 */
function displayProductBacklog(inventory){
    let inventoryDisplayRef = document.getElementById("productBacklogTable");

    let output = ``

    output += `<div class="row justify-content-start" id="display-product-backlog">`

    for (let i=0; i < inventory.productBacklog.length; i++) {
        output += `
        <div class="col">
            <div class="card" style="width: 14rem";>
                <div class="card-header" style="height:40px">${i+1}) <strong>${inventory.productBacklog[i].name}</strong></div>
                <div class="card-body" style="${TAG_TO_COLOR[inventory.productBacklog[i].tag]}">
                    <table style="width:100%">
                        <tr style="height:40px">
                            <th style="width:55%">Tag:</th>
                            <td style="text-align: right">${inventory.productBacklog[i].tag}</td>
                        </tr>
                        <tr style="height:40px">
                            <th style="width:55%">Priority:</th>
                            <td style="text-align: right">${inventory.productBacklog[i].priority}</td>
                        </tr>
                        <tr style="height:40px">
                            <th style="width:55%">Story Points:</th>
                            <td style="text-align: right">${inventory.productBacklog[i].numStoryPoints}</td>
                        </tr>
                    </table>                    
                </div>
                <div class="card-footer" style="background-color: white; height:30px; padding:0px 0px 0px 97px;">
                    <div class="button-wrapper">
                        <button type="button" id="view-PBI-button" class="btn btn-danger" onclick="deletePBI(${i})">Delete</button>
                        <button type="button" id="view-PBI-button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#viewPBIPopUp" onclick="viewPBI(${i})">View</button>
                    </div>
                </div>
            </div>
        </div>
    `
    }

    const PBIitemsPerRow = 30;

    // make empty elements to align bottom row left
    let numPBIitems = inventory.productBacklog.length;
    while (numPBIitems % PBIitemsPerRow != 0) {
        numPBIitems++;
    }
    for (let i=0; i < numPBIitems - inventory.productBacklog.length; i++) {
        output += `
        <div class="col" style="visibility: hidden; height: 0px;">
            <div class="card" style="width: 14rem;">
            </div>
        </div>
        `
    }

    output += `</div><br>`

    inventoryDisplayRef.innerHTML = output
}


// Displays product backlog when the page loads
displayProductBacklog(inventory);


/**
 * Delete a PBI from the product backlog
 * @param {int} i The index of the PBI being deleted
 */
function deletePBI(i){
    // Prase string in localStorage to JSON
    var PBIs = JSON.parse(localStorage.getItem(PRODUCT_BACKLOG_KEY));

    //Remove the selected item
    PBIs._productBacklog.splice(i,1);

    // JSON to String
    PBIs = JSON.stringify(PBIs);

    // reset in localstorage
    localStorage.setItem(PRODUCT_BACKLOG_KEY,PBIs);

    location.reload();
}


/**
 * Sort the PBIs in the product backlog based on their story points (highest first)
 */
function sortPBIbyPointHTL(){
    // Prase string in localStorage to JSON
    var PBIs = JSON.parse(localStorage.getItem(PRODUCT_BACKLOG_KEY));

    // sort by story point from high to low
    PBIs._productBacklog.sort(function(a, b){
        return parseFloat(b._numStoryPoints) - parseFloat(a._numStoryPoints);
    });

    // JSON to String
    PBIs = JSON.stringify(PBIs);

    // reset in localstorage
    localStorage.setItem(PRODUCT_BACKLOG_KEY,PBIs);

    location.reload();
}


/**
 * Sort the PBIs in the product backlog based on their story points (lowest first)
 */
function sortPBIbyPointLTH(){
    // Prase string in localStorage to JSON
    var PBIs = JSON.parse(localStorage.getItem(PRODUCT_BACKLOG_KEY));

    // sort by story point from high to low
    PBIs._productBacklog.sort(function(a, b){
        return parseFloat(a._numStoryPoints) - parseFloat(b._numStoryPoints);
    });
    
    // JSON to String
    PBIs = JSON.stringify(PBIs);

    // reset in localstorage
    localStorage.setItem(PRODUCT_BACKLOG_KEY,PBIs);

    location.reload();
}


/**
 * Filter the PBIs in the product backlog by their tag
 */
function sortPBIbyTag(){
    // Prase string in localStorage to JSON
    var PBIs = JSON.parse(localStorage.getItem(PRODUCT_BACKLOG_KEY));

    let sortTag = document.getElementById("sortTag").value;

    let length = PBIs._productBacklog.length;

    let filterlist = []
    for(i = 0; i < length; i++){
        var tag = PBIs._productBacklog[i]._tag;

        if (sortTag == "All") {
            filterlist.push(PBIs._productBacklog[i])
        } else if (sortTag == tag) {
            filterlist.push(PBIs._productBacklog[i])
        }
    }

    //displayProductBacklog(sortlist);
    let inventoryDisplayRef = document.getElementById("productBacklogTable");

    let output = ``

    output += `<div class="row justify-content-start" id="display-product-backlog">`

    for (let i=0; i < filterlist.length; i++) {
        output += `
        <div class="col">
            <div class="card" style="width: 14rem;">
                <div class="card-header" style="height:40px">${i+1}) <strong>${filterlist[i]._name}</strong></div>
                <div class="card-body" style="${TAG_TO_COLOR[filterlist[i]._tag]}">
                    <table style="width:100%">
                        <tr style="height:40px">
                            <th style="width:55%">Tag:</th>
                            <td style="text-align: right">${filterlist[i]._tag}</td>
                        </tr>
                        <tr style="height:40px">
                            <th style="width:55%">Priority:</th>
                            <td style="text-align: right">${filterlist[i]._priority}</td>
                        </tr>
                        <tr style="height:40px">
                            <th style="width:55%">Story Points:</th>
                            <td style="text-align: right">${filterlist[i]._numStoryPoints}</td>
                        </tr>
                    </table>                    
                </div>
                <div class="card-footer" style="background-color: white; height:30px; padding:0px 0px 0px 97px;">
                    <div class="button-wrapper">
                        <button type="button" id="view-PBI-button" class="btn btn-danger" onclick="deletePBI(${i})">Delete</button>
                        <button type="button" id="view-PBI-button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#viewPBIPopUp" onclick="viewPBI(${i})">View</button>
                    </div>
                </div>
            </div>
        </div>
    `
    }
    const PBIitemsPerRow = 30;
    // make empty elements to align bottom row left
    let numPBIitems = filterlist.length;
    while (numPBIitems % PBIitemsPerRow != 0) {
        numPBIitems++;
    }
    for (let i=0; i < numPBIitems - filterlist.length; i++) {
        output += `
        <div class="col" style="visibility: hidden; height: 0px;">
            <div class="card" style="width: 14rem;">
            </div>
        </div>
        `
    }

    output += `</div><br>`

    inventoryDisplayRef.innerHTML = output
}


/**
 * View the details of the selected PBI
 * @param {int} i The index of the PBI being viewed
 */
function viewPBI(i) {
    // store data in LS
    localStorage.setItem(PBI_KEY, i);

    // retrieve data to be viewed
    let pbiIndex = localStorage.getItem(PBI_KEY);

    let PBIDisplayRef = document.getElementById("viewPBIPopUpBody");

    PBIDisplayRef.innerHTML = `
                <div class="mb-3">
                <label for="taskName" class="form-label">Task Name</label>
                <input class="form-control" type="text" id="taskName" value="${inventory.productBacklog[pbiIndex].name}" disabled readonly>
                </div>
                <div class="mb-3">
                <label for="taskDescription" class="form-label">Task Description</label>
                <input class="form-control" type="text" id="taskDescription" value="${inventory.productBacklog[pbiIndex].description}" disabled readonly>
                </div>
                <div class="mb-3">
                <div class="row">
                    <div class="col">
                    <label for="assignee" class="form-label">Assignee</label>
                    <input class="form-control" type="text" id="assignee" value="${inventory.productBacklog[pbiIndex].assignee}" disabled readonly>
                    </div>
                    <div class="col">
                    <label for="storyPoints" class="form-label">Story Points</label>
                    <input class="form-control" type="text" id="storyPoints" value="${inventory.productBacklog[pbiIndex].numStoryPoints}" disabled readonly>
                    </div>
                </div>
                </div>
                <div class="mb-3">
                <div class="row">
                    <div class="col">
                    <label for="taskType" class="form-label">Task Type</label>
                    <input class="form-control" type="text" id="taskType" value="${inventory.productBacklog[pbiIndex].type}" disabled readonly>
                    </div>
                    <div class="col">
                    <label for="taskTag" class="form-label">Task Tag</label>
                    <input class="form-control" type="text" id="taskTag" value="${inventory.productBacklog[pbiIndex].tag}" disabled readonly>
                    </div>
                </div>
                </div>
                <div class="mb-3">
                <div class="row">
                    <div class="col">
                    <label for="priority" class="form-label">Task Priority</label>
                    <input class="form-control" type="text" id="priority" value="${inventory.productBacklog[pbiIndex].priority}" disabled readonly>
                    </div>
                    <div class="col">
                    <label for="status" class="form-label">Task Status</label>
                    <input class="form-control" type="text" id="status" value="${inventory.productBacklog[pbiIndex].status}" disabled readonly>
                    </div>
                </div>
                </div>
    `

    let PBIDisplayFooterRef = document.getElementById("viewPBIPopUpFotter");
    PBIDisplayFooterRef.innerHTML = `
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editPBIPopUp" onclick="edit(${i})">Edit PBI</button>
    `
}
