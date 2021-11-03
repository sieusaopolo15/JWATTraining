var countModule = (function () {
    var count = 1;
    var log = function (funcName) {
        console.log(funcName, count);
    }
    function increaseFunc() {
        count++;
        log("increase");
    }
    function decreaseFunc() {
        count--;
        log("decrease");
    }
    function resetFunc() {
        count = 0;
        log("reset");
    }
    return {
        increase: increaseFunc,
        decrease: decreaseFunc,
        reset: resetFunc
    }
})();

var testModule = (function () {
    var counter = 0; 
    return { 
        getCounter() { 
            return counter; 
        }, 
        increateCounter() { 
            counter++; 
        }, 
        resetCounter() { 
            counter = 0; 
        } 
    }
})(); 
for (var i = 0; i < 10; i++) {
    testModule.increateCounter();
}

// Usage:
countModule.increase(); // increase 1
countModule.increase(); // increase 2
countModule.decrease(); // increase 1
countModule.reset();    // reset 0

console.log(testModule.getCounter()); // 10 testModule.resetCounter();
console.log(testModule.getCounter()); // 0 console.log(testModule.counter); // undefined