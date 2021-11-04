class Database {
    constructor(data) {
        if (Database.exists) {
            console.log(Database.instance);
            return Database.instance;
        }
        this._data = data;
        Database.instance = this;
        Database.exists = true;
        return this;
    }

    getData() {
        return this._data;
    }

    setData(data) {
        this._data = data;
    }
}
const mongo = new Database('sqlserver');
console.log(mongo.getData());

const mysql = new Database('mysql');
console.log(mysql.getData());