let index = localStorage.getItem(ITEM_KEY);
let sprint = sprintInventory.inventory[1][index];

let sprintNameDisplayRef = document.getElementById("sprintName");
sprintNameDisplayRef.innerHTML = sprint.name;

function startSprint() {
    sprintInventory.startSprint(index);
    updateLSData(SPRINT_INVENTORY_KEY, sprintInventory)
    window.location = "sprintBoard.html"
}

function deleteSprint(){
    var sprints = JSON.parse(localStorage.getItem(SPRINT_INVENTORY_KEY));

    
    sprints._inventory.splice(index,1);
    
    // JSON to String
    sprints = JSON.stringify(sprints);

    // reset in localstorage
    localStorage.setItem(SPRINT_INVENTORY_KEY,sprints);

    window.location = "sprintBoard.html";
}