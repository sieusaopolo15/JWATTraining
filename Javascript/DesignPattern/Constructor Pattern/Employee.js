class Employee {
    constructor(name, age, tele){
        this.name = name;
        this.age = age;
        this.tele = tele;
    }

    work () {
        console.log(this.name + ' is working ! Do not disturb');
    }

    break () {
        console.log(this.name + ' is having a break !');
    }

    fired () {
        console.log(this.name + ' is fired !');
    }

    static getAll(e){
        const str = `${e.name} - ${e.age} - ${e.tele}`;
        return str;
    }   
}

const e = new Employee('Dat', 22, '0902777586');
console.log(e);
e.work();
console.log(Employee.getAll(e));
