/**
 * FILENAME :   shared.js             
 * PURPOSE  :   Contains all classes required for the application, keys for local storage, and global code that can be accessed by other files.
 * LAST MODIFIED : 1 Oct 22
 */

"use strict";
// Keys
const PRODUCT_BACKLOG_KEY = "currentProductBacklogData"
const PBI_KEY = "currentPbiIndex";
const SPRINT_INVENTORY_KEY = "currentSprintInventoryData"
const ITEM_KEY = "ItemKey";


/**
 * Inventory class to hold all PBIs in the product backlog
 */
class Inventory {
    constructor () {
        this._productBacklog = [];
    }
    // Accessors
    get productBacklog() { return this._productBacklog; }
    
    addItem(item) {
        if (item instanceof PBI){
            this._productBacklog.push(item);
        }
    }

    fromData(data) {
        this._productBacklog = [];
        for (let i = 0; i < data._productBacklog.length;i++){
            let tempPBI = new PBI();
            tempPBI.fromData(data._productBacklog[i]);
            this._productBacklog.push(tempPBI);
        }
    }
}


/**
 * Product Backlog Item class representing a PBI
 */
class PBI {
    constructor(name, description, type, tag, numStoryPoints, status, priority, assignee) {
        this._name = name;
        this._description = description;
        this._type = type;
        this._tag = tag;
        this._numStoryPoints = numStoryPoints;
        this._status = status;
        this._priority = priority;
        this._assignee = assignee;
        this._time = 0;
    }
    // Getters
    get name() { return this._name; }
    get description() { return this._description; }
    get type() {return this._type; }
    get tag() { return this._tag; }
    get numStoryPoints() { return this._numStoryPoints; }
    get status() { return this._status; }
    get priority() { return this._priority; }
    get assignee() { return this._assignee; }
    get time() { return this._time; }
    // Setters
    set name(newName) { this._name = newName; }
    set description(newDescription) { this._description = newDescription; }
    set type(newType) {return this._type = newType; }
    set tag(newTag) { this._tag = newTag; }
    set numStoryPoints(newNumStoryPoints) { this._numStoryPoints = newNumStoryPoints; }
    set status(newStatus) { this._status = newStatus; }
    set priority(newPriority) { this._priority = newPriority; }
    set assignee(newAssignee) { this._assignee = newAssignee; }
    set time(newTime) { this._time = newTime; }

    fromData(data) {
        this._name = data._name;
        this._description = data._description;
        this._type = data._type;
        this._tag = data._tag;
        this._numStoryPoints = data._numStoryPoints;
        this._status = data._status;
        this._priority = data._priority;
        this._assignee = data._assignee;
        this._time = data._time;
    }
}


/**
 * Sprint Inventory class to hold all future, ongoing and past sprints
 */
class SprintInventory{
    constructor () {
        // First element is for started sprints while second element is for future sprints
        this._inventory = [[],[],[]];
    }
    // Accessors
    get inventory() { return this._inventory; }
    
    startSprint(index){
        this._inventory[0].push(this._inventory[1][index]);
        this._inventory[1].splice(index,1);
    }
    addSprint(sprint) {
        if (sprint instanceof Sprint){
            this._inventory[1].push(sprint);
        }
    }
    completeSprint(index){
        this._inventory[2].push(this._inventory[0][index]);
        this._inventory[0].splice(index,1);
    }

    fromData(data) {
        this._inventory = [[],[],[]];
        for (let i = 0; i < data._inventory.length;i++){
            for (let j = 0; j <data._inventory[i].length; j++){
                let tempSprint = new Sprint();
                tempSprint.fromData(data._inventory[i][j]);
                this._inventory[i].push(tempSprint);
            }
        }
    }
}


/**
 * Sprint class representing a sprint
 */
class Sprint{
    constructor (name, startDate, endDate) {
        this._name = name;
        this._startDate = startDate;
        this._endDate = endDate;
        this._items = [];
    }

    // Getters
    get name() { return this._name; }
    get startDate() { return this._startDate; }
    get endDate() { return this._endDate; }
    get items() { return this._items; }
    // Setters
    set name(newName) { this._name = newName; }
    set startDate(newStartDate) { this._startDate = newStartDate; }
    set endDate(newEndDate) { return this._endDate = newEndDate; }

    addItem(item) {
        if (item instanceof PBI){ this._items.push(item) }
    }

    fromData(data) {
        this._name = data._name;
        this._startDate = data._startDate;
        this._endDate = data._endDate;

        this._items = [];
        for (let i = 0; i < data._items.length;i++){
            let tempPBI = new PBI();
            tempPBI.fromData(data._items[i]);
            this._items.push(tempPBI);
        }
    }
}


/**
 * checkLSData function
 * Used to check if any data in LS exists at a specific key
 * @param {string} key LS Key to be used
 * @returns true or false representing if data exists at key in LS
 */
function checkLSData(key)
{
    if (localStorage.getItem(key) != null)
    {
        return true;
    }
    return false;
}


/**
 * retrieveLSData function
 * Used to retrieve data from LS at a specific key. 
 * @param {string} key LS Key to be used
 * @returns data from LS in JS format
 */
 function retrieveLSData(key)
 {
     let data = localStorage.getItem(key);
     try
     {
         data = JSON.parse(data);
     }
     catch(err){}
     finally
     {
         return data;
     }
 }


 /**
 * updateLSData function
 * Used to store JS data in LS at a specific key
 * @param {string} key LS key to be used
 * @param {any} data data to be stored
 */
function updateLSData(key, data)
{
    let json = JSON.stringify(data);
    localStorage.setItem(key, json);
}


// Global inventory variable
let inventory = new Inventory();

// Check if data available in LS before continuing
if (checkLSData(PRODUCT_BACKLOG_KEY))
{
    // If data exists, retrieve it
    let data = retrieveLSData(PRODUCT_BACKLOG_KEY);
    // Restore data into inventory
    inventory.fromData(data);
}

// Global sprint inventory variable
let sprintInventory = new SprintInventory();

// Check if data available in LS before continuing
if (checkLSData(SPRINT_INVENTORY_KEY))
{
    // If data exists, retrieve it
    let data = retrieveLSData(SPRINT_INVENTORY_KEY);
    // Restore data into inventory
    sprintInventory.fromData(data);
}