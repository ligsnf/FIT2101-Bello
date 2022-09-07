"use strict";

function submit()
{

    let pbiIndex = localStorage.getItem(PBI_KEY);

    let editPBINameRef = document.getElementById("editPBIName");
    let editPBIDescriptionRef = document.getElementById("editPBIDescription");
    let editPBIAssigneeRef = document.getElementById("editPBIAssignee");
    let editPBIStoryPointsRef = document.getElementById("editPBIStoryPoints");
    let editPBITypeRef = document.getElementById("editPBIType");
    let editPBITagRef = document.getElementById("editeditPBITag");
    let editPBIPriorityRef = document.getElementById("editPBIPriority");
    let editPBIStatusRef = document.getElementById("editPBIStatus");

    inventory.productBacklog[pbiIndex].name = editPBINameRef.value;
    inventory.productBacklog[pbiIndex].description = editPBIDescriptionRef.value;
    inventory.productBacklog[pbiIndex].assignee = editPBIAssigneeRef.value;
    inventory.productBacklog[pbiIndex].numStoryPoints = editPBIStoryPointsRef.value;
    inventory.productBacklog[pbiIndex].type = editPBITypeRef.value;
    // inventory.productBacklog[pbiIndex].tag = editPBITagRef.value;
    inventory.productBacklog[pbiIndex].priority = editPBIPriorityRef.value;
    inventory.productBacklog[pbiIndex].status = editPBIStatusRef.value;
    updateLSData(PRODUCT_BACKLOG_KEY, inventory); //update localstorage
    displayProductBacklog(inventory);
}
