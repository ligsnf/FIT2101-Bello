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

function displayProductBacklog(inventory){
    let inventoryDisplayRef = document.getElementById("productBacklogTable");
    let output = ''
    output += `<table class="table table-hover">
    <thead>
        <tr>
        <th scope="col">#</th>
        <th scope="col">Task</th>
        <th scope="col">Tag</th>
        <th scope="col">Priority</th>
        <th scope="col">Story Points</th>
        </tr>
    </thead>
    <tbody class="table-group-divider">`
    for (let i=0; i < inventory.productBacklog.length; i++)
    {
        output += `<tr id="${i}" data-bs-toggle="modal" data-bs-target="#editPBIPopUp">
        <th scope="row">${i+1}</th>
        <td>${inventory.productBacklog[i].name}</td>
        <td>${inventory.productBacklog[i].tag}</td>
        <td>${inventory.productBacklog[i].priority}</td>
        <td>${inventory.productBacklog[i].numStoryPoints}</td>
        </tr>`
    }
    output += `</tbody>
    </table>`
    inventoryDisplayRef.innerHTML = output
}

// Displays product backlog when the page loads
displayProductBacklog(inventory);