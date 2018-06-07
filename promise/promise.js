let Promise = require('bluebird');

new Promise((resolve, reject) => {
    let msg = '成功执行';
    console.log(msg);
    resolve(msg);
}).then((res) => {
    let error = '发生异常';
    console.log(error);
    return Promise.reject(error);
}).finally((res) => {
    let msg = '我才不管异常';
    console.log(msg);
    if (res) console.log(res);
    return new Promise.reject("我是finally中的异常,我自己可以抛异常");
}).catch((err) => {
    let msg = "catch到异常：";
    console.log(msg);
    if (err) {
        console.log("异常信息：" + err);
    }
});