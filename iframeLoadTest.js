var page = require('webpage').create();
console.log('The default user agent is ' + page.settings.userAgent);
page.settings.userAgent = 'SpecialAgent';

//第1步：打开页面
setTimeout(function () {
    page.open('http://appcms.op.bitauto.com/dist/index.html#/pages/cms', function (status) {
        page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js", function () {
            if (status !== 'success') {
                console.log('Unable to access network');
            } else {
                var text = $('#editNewsPool').html();
                console.log('get text content');
            }
        });
    });
}, 0);

//第2步 等待页面加载完成
page.onLoadFinished = function () {
    console.log("page.onLoadFinished");
    setTimeout(function () {
        page.render('iframe.png');
        page.close();
        setTimeout(function () {
            phantom.exit();
        }, 100);
    }, 20000);
};
