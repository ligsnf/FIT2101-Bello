let index = localStorage.getItem(MEMBER_KEY);
let member = team.team[index];

let memberNameDisplayRef = document.getElementById("memberName");
memberNameDisplayRef.innerHTML = member.name;