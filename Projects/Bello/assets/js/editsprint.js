let index = localStorage.getItem(ITEM_KEY);
let sprint = sprintInventory.inventory[1][index];

let sprintNameDisplayRef = document.getElementById("sprintName");
sprintNameDisplayRef.innerHTML = sprint.name;

function startSprint() {
    sprintInventory.startSprint(index);
    updateLSData(SPRINT_INVENTORY_KEY, sprintInventory)
    window.location = "sprintBoard.html"
}

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