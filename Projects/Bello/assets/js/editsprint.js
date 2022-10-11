/**
 * FILENAME :   editsprint.js             
 * PURPOSE  :   Contains the funtionality for editing, starting and deleting an existing sprint.
 * LAST MODIFIED : 1 Oct 22
 */

let index = localStorage.getItem(ITEM_KEY);
let sprint = sprintInventory.inventory[1][index];

let tempItemIndex = 0;
let tempFromIndex = 0;

let sprintNameDisplayRef = document.getElementById("sprintName");
sprintNameDisplayRef.innerHTML = sprint.name;

let sprintStartDateDisplayRef = document.getElementById("startDate");
sprintStartDateDisplayRef.innerHTML = sprint.startDate;

let sprintEndDateDisplayRef = document.getElementById("endDate");
sprintEndDateDisplayRef.innerHTML = sprint.endDate;



/**
 * Moving sprint from not started to started
 */
function startSprint() {
    sprintInventory.startSprint(index);
    updateLSData(SPRINT_INVENTORY_KEY, sprintInventory)
    window.location = "sprintBoard.html"
}

/**
 * Edit name of sprint in html and localstorage
 */
function editSprint(){
    let nameHeader = document.getElementById("sprintName");
    let currentSprintName = nameHeader.innerHTML;
    nameHeader.remove();

    let nameDiv = document.getElementById("sprintNameDiv");
    let outputEditName = `<div class="mb-3">
    <label for="editSprintName" class="form-label">Sprint Name</label>
    <textarea class="form-control" id="editSprintName" rows="1" placeholder=${currentSprintName}></textarea>
    </div>`;
    nameDiv.innerHTML = outputEditName;

    document.getElementById("editButton").remove()

    let buttonRef = document.getElementById("buttonDiv");
    let finishButton = `<p>All PBIs; Sprint PBIs</p>
    <button id="saveButton" type="button" class="btn btn-primary icon" onclick="saveEdit()">Save</button>`;
    buttonRef.innerHTML = finishButton;

}

/**
 * Save the new name of sprint in html and localstorage
 */
function saveEdit(){
    let newName = document.getElementById("editSprintName").value;
    sprint.name = newName
    updateLSData(SPRINT_INVENTORY_KEY,sprintInventory)

    let nameDiv = document.getElementById("sprintNameDiv");
    outputNewName = `<h1 id="sprintName">${sprint.name}</h1>`;
    nameDiv.innerHTML = outputNewName

    let resetButtonOutput = `<p>All PBIs; Sprint PBIs</p>
    <button id="editButton" type="button" class="btn btn-primary icon" onclick="editSprint()">Edit Details</button>
    <button type="button" class="btn btn-primary icon" onclick="startSprint()">Start Sprint</button>`;
    document.getElementById("buttonDiv").innerHTML = resetButtonOutput;
}

/**
 * Dislaying all PBI and Sprint Backlog Items on page
 */
function displayPBI(){
    let AllPBIDisplayRef = document.getElementById("allPBIDisplay");
    let notStartedPBIRef = document.getElementById("notStartedPBI");


    let output = ``;

    output += `<ul class="list-group">`;

    if(inventory.productBacklog.length){
        for(let i = 0; i < inventory.productBacklog.length; i ++){
            output += `<li class="list-group-item" id="PBI${i}" draggable = "true" ondragstart = "dragStartSprint(event,${i})">${inventory.productBacklog[i].name}</li>`;
        }
    }
    else{
        output += `<li class="list-group-item"></li>`
    }

    output += `</ul>`
    AllPBIDisplayRef.innerHTML = output;


    
    
    let tempOutput = `<ul class="list-group">`;
    if(sprint._items.length){
        for(let i = 0; i < sprint._items.length; i ++){
            tempOutput += `<li class="list-group-item" id="sprintpbi${i}" draggable = "true" ondragstart = "dragStartSprint(event,${i})">${sprint._items[i].name}</li>`
        }
    }
    else{
        tempOutput += `<li class="list-group-item"></li>`
    }
    
    tempOutput += `</ul">`;
    notStartedPBIRef.innerHTML = tempOutput;

}


/**
 * Allows drop functionality
 */
function allowDrop (ev) {
    ev.preventDefault();
}

/**
 * Editing variables to allow changes of Sprint Backlog Items from one status to another in localstorage
 */
function dragStartSprint (ev,itemIndex) {
    tempItemIndex = itemIndex;
    ev.dataTransfer.setData ("pbi", ev.target.id);
}

/**
 * Moving Sprint Backlog items from one status array to another (started -> completed)
 * and displaying those changes on page
 */
function dragDrop (ev) {
    sprint.addItem(inventory._productBacklog[tempItemIndex]);
    inventory._productBacklog.splice(tempItemIndex,1);
    updateLSData(SPRINT_INVENTORY_KEY, sprintInventory);
    updateLSData(PRODUCT_BACKLOG_KEY, inventory);
    ev.preventDefault ();
    var data1 = ev.dataTransfer.getData("pbi");
    if(ev.target.className == "list-group-item"){
        ev.path[1].appendChild(document.getElementById(data1));
    }
    else{
        ev.target.appendChild(document.getElementById(data1));
    }
}

function dragDropPBI(ev){
    inventory.addItem(sprint._items[tempItemIndex]);
    sprint._items.splice(tempItemIndex,1);
    ev.preventDefault();
    var data1 = ev.dataTransfer.getData("pbi");
    updateLSData(SPRINT_INVENTORY_KEY, sprintInventory)
    updateLSData(PRODUCT_BACKLOG_KEY, inventory)
    if(ev.target.className == "list-group-item"){
        ev.path[1].appendChild(document.getElementById(data1));
    }
    else{
        ev.target.appendChild(document.getElementById(data1));
    }
}

/**
 * Delete a future sprint listed on the sprint board page
 */
 function deleteSprint(){
    var sprints = JSON.parse(localStorage.getItem(SPRINT_INVENTORY_KEY));

    sprints._inventory[1].splice(index,1);

    updateLSData(SPRINT_INVENTORY_KEY, sprints)
    window.location = "sprintBoard.html"
 }