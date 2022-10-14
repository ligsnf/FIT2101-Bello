/**
 * FILENAME :   teammembers.js            
 * PURPOSE  :   Contains the funtionality for adding, removing and viewing team members.
 * LAST MODIFIED : 14 Oct 22
 */


function displayTeamMembers(team) {
    let teamMemberRef = document.getElementById("teamMembers");
    let teamMembers = ``;

    for (let i=0; i < team.team.length; i++) {
        let member = team.team[i]
        teamMembers += `
        <div class="col">
        <div class="card" style="width: 100%;">
            <div class="card-body">
                <table style="width:100%">
                    <tr style="height:35px">
                        <th>${member.name}</th>
                        <td style="text-align: right">
                            <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#viewMemberPopUp" onclick="viewMember(${i})"> View </button>
                        </td>
                    </tr>
                </table>                    
            </div>
        </div>
        `
    }
    if (team.team.length==0) {
        teamMembers = `There is no team member.`
    }
    teamMemberRef.innerHTML = teamMembers;
}
displayTeamMembers(team)


function addMember() {
    // Getting the user inputs
    let name = document.getElementById("memberName").value;
    let email = document.getElementById("memberEmail").value;

    // Error checking
    if (!name || !email) {
        alert("Please fill in all the blanks");
        return
    }

    if (team.memberExists(name)) {
        alert("Team member already exists");
        return
    }

    // Create new member
    let member = new Member();
    member.name = name;
    member.email = email;

    // Add member
    team.addMember(member);

    // Clearing input fields for next use
    document.getElementById("memberName").value = "";
    document.getElementById("memberEmail").value = "";

    // Update LS
    updateLSData(TEAM_KEY, team)

    // Update display
    displayTeamMembers(team);

    // Close modal popup
    $('#addMemberPopUp').modal('toggle');
}


function viewMember(index) {
    let memberDisplayRef = document.getElementById("viewMemberPopUpBody");
    
    memberDisplayRef.innerHTML = `
            <div class="mb-3">
                <label for="memberName" class="form-label">Name</label>
                <input class="form-control" id="memberName" value="${team.team[index].name}" disabled readonly>
            </div>
            <div class="mb-3">
              <label for="memberEmail" class="form-label">Email</label>
              <input class="form-control" id="memberEmail" value="${team.team[index].email}" disabled readonly>
            </div>
    `

    let MemberDisplayFooterRef = document.getElementById("viewMemberPopUpFotter");
    MemberDisplayFooterRef.innerHTML = `
    <button type="button" class="btn btn-primary" onclick="memberAnalytics(${index})">View Analytics</button>
    <button type="button" class="btn btn-danger" onclick="removeMember(${index})">Remove Member</button>
    `
}


function removeMember(index) {
    team.removeMember(index);

    // Update LS
    updateLSData(TEAM_KEY, team)

    // Update display
    displayTeamMembers(team);

    // Close modal popup
    $('#viewMemberPopUp').modal('toggle');
}


function memberAnalytics(index) {
    localStorage.setItem(MEMBER_KEY, index);
    window.location = "analytics.html";
}


/**
 * Redirect to the Team Dashboard Page to view the team's effort
 * @returns if alert raised
 */
function viewTeamDashboard() {
    // alert user if there is no current sprint to view team dashboard for
    if (sprintInventory.inventory[0].length==0) {
        alert("Cannot view team dashboard as there is no current sprint");
        return
    }

    window.location = `teamdashboard.html`
}