"use strict";
// Keys
const PRODUCT_BACKLOG_KEY = "currentProductBacklogData"
const PBI_KEY = "currentPbiIndex";


// Class to hold all the product backlog items
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

// Product Backlog Item Class 
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
    // Setters
    set name(newName) { this._name = newName; }
    set description(newDescription) { this._description = newDescription; }
    set type(newType) {return this._type = newType; }
    set tag(newTag) { this._tag = newTag; }
    set numStoryPoints(newNumStoryPoints) { this._numStoryPoints = newNumStoryPoints; }
    set status(newStatus) { this._status = newStatus; }
    set priority(newPriority) { this._priority = newPriority; }
    set assignee(newAssignee) { this._assignee = newAssignee; }

    fromData(data) {
        this._name = data._name;
        this._description = data._description;
        this._type = data._type;
        this._tag = data._tag;
        this._numStoryPoints = data._numStoryPoints;
        this._status = data._status;
        this._priority = data._priority;
        this._assignee = data._assignee;
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