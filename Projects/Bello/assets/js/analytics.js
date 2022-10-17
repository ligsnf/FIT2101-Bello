/**
 * FILENAME :   analytics.js             
 * PURPOSE  :   Contains the funtionality for showing the bar chart of a team member.
 * LAST MODIFIED : 17 Oct 22
 */


/**
 * Function that add @param {*} days to a date
 */
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

let index = localStorage.getItem(MEMBER_KEY);
let member = team.team[index];

let memberNameDisplayRef = document.getElementById("memberName");
memberNameDisplayRef.innerHTML = member.name + `'s Analytics`;

let memberTime = member.timeLog;
let memberDate = member.dateLog;


for(let i = 0; i < memberDate.length; i++){
    for(let j = memberDate.length - 1; j > 0; j--){
        if(i != j){
            if(memberDate[i] == memberDate[j]){
                memberTime[i] += memberTime[j];
                memberTime.splice(j,1);
                memberDate.splice(j,1);
            }
        }
    }
}

for(let i = memberDate.length - 1; i > 0; i--){
    for(let j = 0; j < i ; j++){
        if(memberDate[j] > memberDate[j+1]){
            temp0 = memberDate[j];
            memberDate[j] = memberDate[j+1];
            memberDate[j+1] = temp0;

            temp1 = memberTime[j];
            memberTime[j] = memberTime[j+1];
            memberTime[j+1] = temp1;
        }
    }
}

updateLSData(TEAM_KEY,team);

if(!sprintInventory.inventory[0][0]){
    document.getElementById("error").innerHTML = "ERROR: Cannot view team member's analytics as there is no current sprint";
}
else{

    beginningDate = sprintInventory.inventory[0][0]._startDate;
    endDate = sprintInventory.inventory[0][0]._endDate;

    dateDates = [];
    displayDates = [];
    displayTime = [];

    for(let i = 0; i < memberDate.length; i++){
        if(memberDate[i] >= beginningDate && memberDate[i] <= endDate){
            tempDate = new Date(memberDate[i]);
            dateDates.push(tempDate)
        }
    }

    beginningDate = new Date(sprintInventory.inventory[0][0]._startDate);
    endDate = new Date(sprintInventory.inventory[0][0]._endDate);

    let currentDate = 0
    if(dateDates.length){
        if(dateDates[0].getTime() > beginningDate.getTime()){
            currentDate = beginningDate;
            displayDates.push(currentDate.toString().slice(0,-58));
            displayTime.push(0)
            while(currentDate.addDays(1).getTime() != dateDates[0].getTime()){
                currentDate = currentDate.addDays(1);
                displayDates.push(currentDate.toString().slice(0,-58));
                displayTime.push(0)
            }
        }
        
        for(let i = 0; i < dateDates.length - 1; i++){
            currentDate = dateDates[i];
            displayDates.push(dateDates[i].toString().slice(0,-58))
            displayTime.push(memberTime[i])
            if(dateDates[i].addDays(1).getTime() != dateDates[i+1].getTime()){
                while(currentDate.addDays(1).getTime() != dateDates[i+1].getTime()){
                    currentDate = currentDate.addDays(1);
                    displayDates.push(currentDate.toString().slice(0,-58));
                    displayTime.push(0)
                }
                console.log("test")
            }
        }
        
        displayDates.push(dateDates[dateDates.length - 1].toString().slice(0,-58))
        displayTime.push(memberTime[dateDates.length - 1])
        if(dateDates[dateDates.length - 1].getTime() < endDate.getTime()){
            currentDate = dateDates[dateDates.length - 1]
            if(dateDates[dateDates.length - 1].addDays(1).getTime() != endDate.getTime()){
                while(currentDate.addDays(1).getTime() != endDate.getTime()){
                    currentDate = currentDate.addDays(1);
                    displayDates.push(currentDate.toString().slice(0,-58));
                    displayTime.push(0);
                }
            }
            displayDates.push(endDate.toString().slice(0,-58));
            displayTime.push(0);
        }
    }
    else{
        currentDate = beginningDate
        while(currentDate.getTime() != endDate.getTime()){
            displayDates.push(currentDate.toString().slice(0,-58));
            displayTime.push(0);
            currentDate = currentDate.addDays(1);
        }
    }

    let xValues = displayDates;
    let yValues = displayTime;

    new Chart("myChart", {
    type: "bar",
    data: {
        labels: xValues,
        datasets: [{
            label: "Minutes",
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            borderWidth: 1,
            data: yValues
        }]
    },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                }
            }
        },
    });
}