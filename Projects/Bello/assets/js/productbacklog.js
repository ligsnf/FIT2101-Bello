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
    /*
    if (!name || !description || !assignee || !storyPoints || !type || !tag || !priority || !status) {
        alert("Please fill in all the blanks");
        return
    }
    */
    // Creates a new PBI object based on user inputs
    let pbi = new PBI(name, description, type, tag, storyPoints, status, priority, assignee);
    
    // Adds item to inventory
    inventory.addItem(pbi);

    console.log(pbi)
    console.log(inventory)

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

    // Update display
    displayProductBacklog(inventory);

    // Close modal popup
    $('#addPBIPopUp').modal('toggle');
}

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

function displayProductBacklog(inventory){
    let inventoryDisplayRef = document.getElementById("productBacklogTable");

    let output = ``

    output += `<div class="row justify-content-start" id="display-product-backlog">`

    for (let i=0; i < inventory.productBacklog.length; i++) {
        output += `
        <div class="col">
            <div class="card" style="width: 15rem;">
                <div class="card-header">${i+1}) ${inventory.productBacklog[i].name}</div>
                <div class="card-body">
                    <table style="width:100%">
                        <tr style="height:40px">
                            <th style="width:50%">Tag:</th>
                            <td style="text-align: right">${inventory.productBacklog[i].tag}</td>
                        </tr>
                        <tr style="height:40px">
                            <th style="width:50%">Priority:</th>
                            <td style="text-align: right">${inventory.productBacklog[i].priority}</td>
                        </tr>
                        <tr style="height:40px">
                            <th style="width:50%">Story Points:</th>
                            <td style="text-align: right">${inventory.productBacklog[i].numStoryPoints}</td>
                        </tr>
                    </table>                    
                </div>
                <div class="card-footer d-grid gap-2" style="background:white; height:25px; padding:0px">
                    <button type="button" id="view-PBI-button" class="btn btn-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#viewPBIPopUp" onclick="viewPBI(${i})">View</button>
                </div>
            </div>
        </div>
    `
    }
    const PBIitemsPerRow = 5;
    // make empty elements to align bottom row left
    let numPBIitems = inventory.productBacklog.length;
    while (numPBIitems % PBIitemsPerRow != 0) {
        numPBIitems++;
    }
    for (let i=0; i < numPBIitems - inventory.productBacklog.length; i++) {
        output += `
        <div class="col" style="visibility: hidden;">
            <div class="card" style="width: 15rem;">
            </div>
        </div>
        `
    }

    output += `</div><br>`

    inventoryDisplayRef.innerHTML = output
}

// Displays product backlog when the page loads
displayProductBacklog(inventory);

function deletePBI(i){
    // Prase string in localStorage to JSON
    var PBIs = JSON.parse(localStorage.getItem(PRODUCT_BACKLOG_KEY));

    //Remove the selected item
    //for (var i = 0; i < PBIs.length; i++){
    //    var PBI = JSON.parse(PBIs[i]);
    //    if (PBI._name == TaskName) {
            PBIs._productBacklog.splice(i,1);
    //    }
    //}

    // JSON to String
    PBIs = JSON.stringify(PBIs);

    // reset in localstorage
    localStorage.setItem(PRODUCT_BACKLOG_KEY,PBIs);

    location.reload();
}

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

function sortPBIbyTag(){
    // Prase string in localStorage to JSON
    var PBIs = JSON.parse(localStorage.getItem(PRODUCT_BACKLOG_KEY));

    let sortTag = document.getElementById("sortTag").value;

    // sort by selected tag
    PBIs._productBacklog.sort(function(a,b){
        return a._tag == sortTag ? -1 : b._tag == sortTag ? 1 : 0;
    });

    // JSON to String
    PBIs = JSON.stringify(PBIs);

    // reset in localstorage
    localStorage.setItem(PRODUCT_BACKLOG_KEY,PBIs);

    location.reload();
}

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
