const itemFactory = require('./itemFactory');

const myLaptop = itemFactory.createItem('Laptop', {
    ram: 8,
    hdd: 256,
    name: "Dat's Asus"
});

const myPC = itemFactory.createItem('PC', {
    ram: 8,
    hdd: 1024,
    name: "Dat's PC",
    mainboard: 'abc',
    chip: 'core i5 gen 10th',
    VGA: '1360 GTX Ti'
});

const myTablet = itemFactory.createItem('Tablet', {
    ram: 4,
    hdd: 128,
    name: "Dat's iPad",
    network: '4G'
});

console.log(myLaptop);
console.log(myPC);
console.log(myTablet);
