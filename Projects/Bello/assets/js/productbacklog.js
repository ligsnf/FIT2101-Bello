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

    // Close modal popup
    $('#addPBIPopUp').modal('toggle');
}