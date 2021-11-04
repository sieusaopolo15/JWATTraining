class Observable {
    constructor() {
        this.observers = [];
    }

    subscribe(f){
        this.observers.push(f);
    }

    unsubscribe(f){
        this.observers = this.observers.filter(element => element !== f);
    }

    notify(data) {
        this.observers.forEach(observer => observer(data));
    }

    getObserver(){
        console.log(this.observers);
        console.log(this.observers.updateP1('Today is sunny'));
    }
}

let p1 = 'Today is sunny';
let p2 = 'Today is rainy';
let p3 = 'Today is cloudy';

const updateP1 = text => p1 = text;
const updateP2 = text => p2 = text;
const updateP3 = text => p3 = text;

const Observer = new Observable();
Observer.subscribe(updateP1);
Observer.subscribe(updateP2);
Observer.subscribe(updateP3);

Observer.notify('a');

Observer.getObserver();