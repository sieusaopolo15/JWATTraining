//1. Khởi tạo promise
//2. Executor
//3. Nếu không khai báo một trong hai resolve hoặc reject thì sẽ -> memory leak

var promise = new Promise(
    //Executor function
    function(resolve, reject){
            //Logic:
        resolve([
            {
                id: 1,
                name: 'Huỳnh Tuấn Đạt',
                year: 1999
            },
            {
                id: 2,
                name: 'Nguyễn Văn A',
                year: 2000
            },
        ]); //Thành công
        //reject(); //Thất bại
    }   
);

promise
    .then(function(student){
        console.log(student);
    })
    .catch(function(){
        console.log('Fail');
    })
    .finally(function(){
        console.log('Finish');
    });

var users = [
    {
        id: 1,
        username: 'sieusaopolo15'
    },
    {
        id: 2,
        username: 'sieusaopolo16'
    },
    {
        id: 3,
        username: 'sieusaopolo17'
    },
];

var comments = [
    {
        id: 1,
        user_id: 1,
        content: 'Trời hôm nay mây nhiều, chắc trời sắp mưa'
    },
    {
        id: 2,
        user_id: 3,
        content: 'Tôi đồng ý với bạn về điều này'
    },
];

// get comments
// get user ids from comments

function getComments(){
    return new Promise(function (resolve){
        setTimeout(function(){
            resolve(comments);
        }, 1000);
    });
}
function getUsersByIds(userIds){
    return new Promise(function(resolve){
        var result = users.filter(function(user){
            return userIds.includes(user.id);
        });
        resolve(result);
    }, 1000);
}

getComments()
    .then(function(comments){
        var userIds = comments.map(function(comment){
            return comment.user_id;
        });
        return getUsersByIds(userIds)
            .then(function(users){
                return {
                    users: users,
                    comments: comments
                };
            });
    })
    .then(function(data){ //Then này ứng với cái return ở trên
        console.log(data);
        var commentBlock = document.getElementById('comment-block');
        var html = '';
        
        data.comments.forEach(function(comment){
            var user = data.users.find(function(user){
                return user.id === comment.user_id;
            });
            html += `<li>${user.username}: ${comment.content}</li>`;
        });
        commentBlock.innerHTML = html;
    });