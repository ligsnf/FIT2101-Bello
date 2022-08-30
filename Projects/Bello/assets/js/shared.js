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