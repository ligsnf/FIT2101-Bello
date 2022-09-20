function addSprint() {
    let name = document.getElementById("sprintName").value;
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;

    let sprint = new Sprint(name, startDate, endDate);
    sprintInventory.addSprint(sprint);
    console.log(sprintInventory)
    document.getElementById("sprintName").value = "";
    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";

    // Save data
    updateLSData(SPRINT_INVENTORY_KEY, sprintInventory)

    // Update display
    displaySprintInventory(sprintInventory);

    // Close modal popup
    $('#addSprintPopUp').modal('toggle');
}

function displaySprintInventory(sprintInventory) {
    let startedInventoryDisplayRef = document.getElementById("startedSprints");
    let futureInventoryDisplayRef = document.getElementById("futureSprints");
    let startedInventory = ``;
    let futureInventory = ``;

    for (let i=0; i < sprintInventory.inventory[0].length; i++) {
        let sprint = sprintInventory.inventory[0][i]
        startedInventory += `
        <div class="col">
        <div class="card" style="width: 100%;">
            <div class="card-body">
                <table style="width:100%">
                    <tr style="height:35px">
                        <th>${sprint.name}</th>
                        <td style="text-align: right">
                            <button type="button" class="btn btn-info" data-bs-toggle="modal" onclick="view(${i})"> View </button>
                        </td>
                    </tr>
                </table>                    
            </div>
        </div>
        `
    }
    startedInventoryDisplayRef.innerHTML = startedInventory;
    for (let i=0; i < sprintInventory.inventory[1].length; i++) {
        let sprint = sprintInventory.inventory[1][i]
        futureInventory += `
        <div class="col">
        <div class="card" style="width: 40rem;">
            <div class="card-body">
                <table style="width:100%">
                    <tr style="height:35px">
                        <th>${sprint.name}</th>
                        <td style="text-align: right">
                            <button type="button" class="btn btn-info" data-bs-toggle="modal" onclick="edit(${i})"> Edit </button>
                        </td>
                    </tr>
                </table>                    
            </div>
        </div>
        `
    }
    futureInventoryDisplayRef.innerHTML = futureInventory;
}

displaySprintInventory(sprintInventory);

function view(index) {
    localStorage.setItem(ITEM_KEY, index);
    window.location = "currentsprint.html";
}

function edit(index) {
    localStorage.setItem(ITEM_KEY, index);
    window.location = "editsprint.html";
}