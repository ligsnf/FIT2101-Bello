/**
 * FILENAME :   edit.js             
 * PURPOSE  :   Contains the funtionality for saving the details of a PBI after it being edited.
 * LAST MODIFIED : 1 Oct 22
 */

"use strict";

/**
 * Update and save the details of a PBI after it being edited
 */
function submit()
{
    let pbiIndex = localStorage.getItem(PBI_KEY);

    let editPBINameRef = document.getElementById("editPBIName");
    let editPBIDescriptionRef = document.getElementById("editPBIDescription");
    let editPBIAssigneeRef = document.getElementById("editPBIAssignee");
    let editPBIStoryPointsRef = document.getElementById("editPBIStoryPoints");
    let editPBITypeRef = document.getElementById("editPBIType");
    let editPBITagRef = document.getElementById("editPBITag");
    let editPBIPriorityRef = document.getElementById("editPBIPriority");
    let editPBIStatusRef = document.getElementById("editPBIStatus");

    inventory.productBacklog[pbiIndex].name = editPBINameRef.value;
    inventory.productBacklog[pbiIndex].description = editPBIDescriptionRef.value;
    inventory.productBacklog[pbiIndex].assignee = editPBIAssigneeRef.value;
    inventory.productBacklog[pbiIndex].numStoryPoints = editPBIStoryPointsRef.value;
    inventory.productBacklog[pbiIndex].type = editPBITypeRef.value;
    inventory.productBacklog[pbiIndex].tag = editPBITagRef.value;
    inventory.productBacklog[pbiIndex].priority = editPBIPriorityRef.value;
    inventory.productBacklog[pbiIndex].status = editPBIStatusRef.value;

    // Create new member if they don't already exist
    if (!team.memberExists(editPBIAssigneeRef.value)) {
        team.addMember(new Member(editPBIAssigneeRef.value));
    }

    updateLSData(PRODUCT_BACKLOG_KEY, inventory); //update localstorage
    updateLSData(TEAM_KEY, team);
    displayProductBacklog(inventory);
}
