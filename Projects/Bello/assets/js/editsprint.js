let index = localStorage.getItem(ITEM_KEY);
let sprint = sprintInventory.inventory[1][index];

let tempItemIndex = 0;
let tempFromIndex = 0;

let sprintNameDisplayRef = document.getElementById("sprintName");
sprintNameDisplayRef.innerHTML = sprint.name;


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
    let inProgressPBIRef = document.getElementById("inProgressPBI");
    let completedPBIRef = document.getElementById("completedPBI");

    refArray = [notStartedPBIRef,inProgressPBIRef,completedPBIRef];


    let output = ``;

    output += `<ul class="list-group">`;

    if(inventory.productBacklog.length){
        for(let i = 0; i < inventory.productBacklog.length; i ++){
            output += `<li class="list-group-item" id="PBI${i}" draggable = "true" ondragstart = "dragStartPBI(event,${i})">${inventory.productBacklog[i].name}</li>`;
        }
    }
    else{
        output += `<li class="list-group-item"></li>`
    }

    output += `</ul>`
    AllPBIDisplayRef.innerHTML = output;


    
    
    for(let i = 0; i < sprint._items.length; i++){
        let tempOutput = `<ul class="list-group">`;
        if(sprint._items[i].length){
            for(let j = 0; j < sprint._items[i].length ; j++){
                tempOutput += `<li class="list-group-item" id="pbi${i}${j}" draggable = "true" ondragstart = "dragStartSprint(event,${j},${i})">${sprint._items[i][j].name}</li>`
            }
        }
        else{
            tempOutput += `<li class="list-group-item"></li>`
        }
    
        tempOutput += `</ul">`;
        refArray[i].innerHTML = tempOutput;
    }

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
function dragStartSprint (ev,itemIndex, fromIndex) {
    tempFromIndex = fromIndex;
    tempItemIndex = itemIndex;
    ev.dataTransfer.setData ("pbi", ev.target.id);
}

/**
 * Adding PBI to Sprint Backlog's Not Started array once a PBI has been dragged
 * and displaying changes on page
 */
function dragStartPBI (ev,itemIndex){
    sprint.addItem(inventory._productBacklog[itemIndex])
    inventory._productBacklog.splice(itemIndex,1)
    updateLSData(SPRINT_INVENTORY_KEY, sprintInventory)
    updateLSData(PRODUCT_BACKLOG_KEY, inventory)
    ev.dataTransfer.setData("pbi", ev.target.id);
}

/**
 * Moving Sprint Backlog items from one status array to another (started -> completed)
 * and displaying those changes on page
 */
function dragDrop (ev,toIndex) {
    sprint.moveItem(tempItemIndex, tempFromIndex, toIndex)
    updateLSData(SPRINT_INVENTORY_KEY, sprintInventory)
    updateLSData(PRODUCT_BACKLOG_KEY, inventory)
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
    inventory.addItem(sprint._items[tempFromIndex][tempItemIndex])
    sprint._items[tempFromIndex].splice(tempItemIndex,1);
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