let index = localStorage.getItem(ITEM_KEY);
let sprint = sprintInventory.inventory[1][index];

let sprintNameDisplayRef = document.getElementById("sprintName");
sprintNameDisplayRef.innerHTML = sprint.name;

function startSprint() {
    sprintInventory.startSprint(index);
    updateLSData(SPRINT_INVENTORY_KEY, sprintInventory)
    window.location = "sprintBoard.html"
}