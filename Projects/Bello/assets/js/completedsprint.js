let index = localStorage.getItem(ITEM_KEY);
let sprint = sprintInventory.inventory[2][index];

let sprintNameDisplayRef = document.getElementById("sprintName");
sprintNameDisplayRef.innerHTML = sprint.name;

let sprintStartDateDisplayRef = document.getElementById("startDate");
sprintStartDateDisplayRef.innerHTML = sprint.startDate;

let sprintEndDateDisplayRef = document.getElementById("endDate");
sprintEndDateDisplayRef.innerHTML = sprint.endDate;