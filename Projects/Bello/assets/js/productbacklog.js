function addPBI() {
    let name = document.getElementById("PBITaskName").value;
    let description = document.getElementById("PBITaskDescription").value;
    let assignee = document.getElementById("PBITaskAssignee").value;
    let storyPoints = document.getElementById("PBITaskStoryPoints").value;
    let type = document.getElementById("selectPBITaskType_").value;
    let tag = document.getElementById("selectPBITaskTag_").value;
    let priority = document.getElementById("selectPBITaskPriority_").value;
    let status = document.getElementById("selectPBITaskStatus_").value;

    let pbi = new PBI(name, description, type, tag, storyPoints, status, priority, assignee);
    console.log(pbi)

    inventory.addItem(pbi);
    console.log(inventory)
    $('#addPBIPopUp').modal('toggle');
}