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