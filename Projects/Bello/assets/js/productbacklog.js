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
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="deletePBI(${pbi})">Delete</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onclick="submit()" data-bs-dismiss="modal">Save changes</button>
    `;
}

function displayProductBacklog(inventory){
    let inventoryDisplayRef = document.getElementById("productBacklogTable");

    let output = `
    <div>
        <div class="row" style="height:10px">
        </div>
        <div class="row" style="height:25px">
            <div class="col-sm-2">
                <h6>Sort by Story Points:</h6>
            </div>
            <div class="col-sm-2">
            </div>
            <div class="col-sm-1">
            </div>
            <div class="col-sm-2">
                <h6>Filter by:</h6>
            </div>
        </div>
        <div class="row" style="height:40px">
            <div class="col-sm-2">
                <button type="button" class="btn btn-primary icon" onclick="sortPBIbyPointHTL()">High to Low &#xF575;</button>
            </div>
            <div class="col-sm-2">
                <button type="button" class="btn btn-primary icon" onclick="sortPBIbyPointLTH()">Low to High &#xF57B;</button>
            </div>
            <div class="col-sm-1">
            </div>
            <div class="col-sm-2">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#sortByTagPopUp"> Tag </button>
            </div>
        </div>
        <div class="row" style="height:15px">
        </div>
    </div>
    `

    output += `<div class="row">`

    for (let i=0; i < inventory.productBacklog.length; i++)
    {
        output += `
        <div class="col-sm-3">
            <div class="card" style="width: 20rem;">
                <div class="card-body">
                    <h5 class="card-title">#${i+1}: ${inventory.productBacklog[i].name}</h5> 
                    <table style="width:100%">
                        <tr style="height:40px">
                            <th style="width:50%">Tag:</th>
                            <td>${inventory.productBacklog[i].tag}</td>
                        </tr>
                        <tr style="height:40px">
                            <th style="width:50%">Priority:</th>
                            <td>${inventory.productBacklog[i].priority}</td>
                        </tr>
                        <tr style="height:40px">
                            <th style="width:50%">Story Points:</th>
                            <td>${inventory.productBacklog[i].numStoryPoints}</td>
                        </tr>
                    </table>
                    <p></p>
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#viewPBIPopUp" onclick="viewPBI(${i})">View</button>
                </div>
            </div>
            <p></p>
        </div>
    `
    }

    output += `</div><p></p>`

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
    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="deletePBI(${i})">Delete</button>
    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editPBIPopUp" onclick="edit(${i})">Edit PBI</button>
    `
}
