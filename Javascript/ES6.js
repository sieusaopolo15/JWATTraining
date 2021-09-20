//1. Khởi tạo promise
//2. Executor
//3. Nếu không khai báo một trong hai resolve hoặc reject thì sẽ -> memory leak

var promise = new Promise(
    //Executor
    function(resolve, reject){
            //Logic:
        //Thành công: resolve()
        //Thất bại: reject()
    }   
);

promise
    .then(function(){

    })
    .catch(function(){

    })
    .finally(function(){[
        
    ]});