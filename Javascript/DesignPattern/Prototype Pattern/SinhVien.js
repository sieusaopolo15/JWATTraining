// class SinhVien {
//     constructor(name, age, mssv) {
//         this.name = name;
//         this.age = age;
//         this.mssv = mssv;
//     }
// }
function SinhVien(name, age, mssv) {
    this.name = name;
    this.age = age;
    this.mssv = mssv;
}

SinhVien.prototype.printSV = function () {
    console.log(`${this.name} - ${this.age} - ${this.mssv}`);
}

const sv1 = new SinhVien('Dat 1', 22, '0902777586');
const sv2 = new SinhVien('Dat 2', 22, '0902777587')

sv1.printSV();
sv2.printSV();

