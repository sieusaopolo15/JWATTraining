    //PROMISE
const myFunctionPromise = (name) => {
    return Promise.resolve(`Hello ${name}`);
}

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// const testSpeedPromise = () => {
//     const arr = [];
//     console.time("Speed Promise");
//     myFunctionPromise("Huỳnh Tuấn ĐạtA").then(v => {
//         arr.push(v);
//         // myFunctionPromise("Nguyễn Văn C").then(v => {
//         //     arr.push(v);
//         //     myFunctionPromise("Nguyễn Văn D").then(v => {
//         //         arr.push(v);
//         //     });
//         // });
//         setTimeout(function(){
//             return myFunctionPromise("Nguyễn Văn C")
//         }, 2000);
//     }).then(v  => {
//         arr.push(v);
//         return myFunctionPromise("Nguyễn Văn D");
//     }).then(v => {
//         arr.push(v);
//         console.timeEnd("Speed Promise");
//     });
// }

    //ASYNC
const myFunctionAsync = async (name) => {
    await sleep(1000);
    return `Hello ${name}`
}
const myFunctionAsync1 = async (name) => {
    await sleep(4000);
    return `Hello ${name}`
}
///myFunctionAsync("World").then(x => console.log(x)); //Vẫn sử dụng được cho async vì bản chất async trả về một cái promise


const testSpeedAsync1 = async () => {
    const a = await myFunctionAsync("Huỳnh Tuấn Đạt");
    const b = await myFunctionAsync("Nguyễn Văn A");
    const c = await myFunctionAsync("Nguyễn Văn B");
    return [a, b, c];
}

const testSpeedAsync2 = async () => {
    const a = await myFunctionAsync("Huỳnh Tuấn Đạta");
    const b = await myFunctionAsync("Nguyễn Văn C");
    const c = await myFunctionAsync("Nguyễn Văn D");
    const arr = await Promise.all([a, b, c]);
    return arr;
}

// console.time("Speed Test Async 1");
// testSpeedAsync1().then(arr => { 
//     console.log(arr); 
//     console.timeEnd("Speed Test Async 1");
// });
// console.time("Speed Test Async 2");
// testSpeedAsync2().then(arr => {
//     console.log(arr);
//     console.timeEnd("Speed Test Async 2");
// });
//testSpeedPromise();

const arr = [1, 2, 3];

const promise = arr.map(item => myFunctionAsync(item));
const a = async () => {
    console.log(await Promise.all(promise));
}
a();
const test = async() => {
    for(let item of arr){
        console.log(await myFunctionAsync(item));
    }
    for await(let item of arr){
        console.log(await myFunctionAsync(item));
    }
}
test();

