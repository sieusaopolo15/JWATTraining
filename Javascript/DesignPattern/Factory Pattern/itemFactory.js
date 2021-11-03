const Laptop = require('./Laptop');
const PC = require('./PC');
const Tablet = require('./Tablet');
const items = { Laptop, PC, Tablet };


module.exports = {
    createItem(type, attributes) {  
        const itemType = items[type];
        return new itemType(attributes);
    }
};