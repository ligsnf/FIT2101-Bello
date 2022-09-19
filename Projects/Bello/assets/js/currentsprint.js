let index = localStorage.getItem(ITEM_KEY);
let sprint = sprintInventory.inventory[0][index];

let sprintNameDisplayRef = document.getElementById("sprintName");
sprintNameDisplayRef.innerHTML = sprint.name;