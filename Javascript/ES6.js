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

    //PROMISE
// function getComments(){
//     return new Promise(function (resolve){
//         setTimeout(function(){
//             resolve(comments);
//         }, 1000);
//     });
// }
// function getUsersByIds(userIds){
//     return new Promise(function(resolve){
//         var result = users.filter(function(user){
//             return userIds.includes(user.id);
//         });
//         resolve(result);
//     }, 1000);
// }

const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// getComments()
//     .then(function(comments){
//         var userIds = comments.map(function(comment){
//             return comment.user_id;
//         });
//         return getUsersByIds(userIds)
//             .then(function(users){
//                 return {
//                     users: users,
//                     comments: comments
//                 };
//             });
//     })
//     .then(function(data){ //Then này ứng với cái return ở trên
//         console.log(data);
//         var commentBlock = document.getElementById('comment-block');
//         var html = '';
        
//         data.comments.forEach(function(comment){
//             var user = data.users.find(function(user){
//                 return user.id === comment.user_id;
//             });
//             html += `<li>${user.username}: ${comment.content}</li>`;
//         });
//         commentBlock.innerHTML = html;
//     });

let p = new Promise((resolve, reject) => {
    let a = 1 + 1;
    if(a == 2){
        resolve("Success");
    }
    else{
        reject("Failed");
    }
});

p.then((message) => {
    console.log(`This is message: ${message}`);
}).catch((err) => {
    console.log(`This is error: ${err}`);
});

const a = new Promise((resolve, reject) => {
    setTimeout(function(){
        resolve("This is function a");
    }, 2000);
});

const b = new Promise((resolve, reject) => {
    resolve("This is function b");
});

const c = new Promise((resolve, reject) => {
    resolve("This is function c");
});

Promise.all([a, b, c]).then((messages) => { console.log(messages) }); //Chạy cả 3 promise
Promise.race([a, b, c]).then((message) => { console.log(message) }); //Chạy cái nhanh nhất hoặc theo thứ tự