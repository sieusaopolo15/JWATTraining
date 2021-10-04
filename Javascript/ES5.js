function abc(param) {
    if (typeof param == 'function') {
        param('Hello World');
    }
}

function callBack(value) {
    console.log('Value: ', value);
}

//abc("Hello World");
//abc(5);
//abc(callBack);

var fruit = [
    'Apple',
    'Mango',
    'Pear',
    'Orange',
    'Tangerine'
];
    //CÁCH 1
// fruit.map(function(fruit){
//     console.log(fruit);
// });

    //CÁCH 2
// function def(fruit){
//     console.log(fruit);
// }
// fruit.map(def);

    //CÁCH 3
// var html = fruit.map(function(fruit) {
//     return `<h2>${fruit}</h2>`
// });
// console.log(html.join(''))

    //KHỞI TẠO HÀM map2 VÌ map2 KHÔNG TỒN TẠI
Array.prototype.map2 = function (call) {
    //console.log(this); //in ra các phần tử của mảng fruit

    if (typeof call === 'function') {
        let output = [];
        let length = this.length;
        for (let i = 0; i < length; i++) {
            let result = call(this[i], i); //call tượng trưng cho function nằm trong fruit.map(function(a, b))
            output.push(result);
        }
        return output;
    }
    else{
        console.log("Not a callback")
    }

}
//fruit.map2(2);
var html = fruit.map2(function (fruit, index) {
    return `<h2>${fruit} - ${index}</h2>`;
});
console.log(html);

function 


