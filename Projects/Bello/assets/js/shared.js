// Class to hold all the product backlog items
class product_backlog {
    constructor () {
        this._product_backlog = [];
    }
    // Accessors
    get get_product_backlog() { return this._product_backlog; }
    add_item(item) {
        this._product_backlog.push(item);
    }
}

// Product Backlog Item Class 
class PBI {
    constructor(name, description, type, tag, num_story_points, status, priority, assignee) {
        this._name = name;
        this._description = description;
        this._type = type;
        this._tag = tag;
    }
}

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