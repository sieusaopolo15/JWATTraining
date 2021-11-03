// class SinhVien {
//     constructor(name, age, mssv) {
//         this.name = name;
//         this.age = age;
//         this.mssv = mssv;
//     }
// }
var SinhVien = function() {
    this.name = 'Nguyen Van A';
    this.age = 22;
    this.mssv = '3117410044';
}

SinhVien.prototype.login = true;

console.log(SinhVien.prototype.login);