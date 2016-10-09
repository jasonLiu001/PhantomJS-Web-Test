/**
 *
 * @summary ���������ʾ������������
 * 1).�򿪰ٶ���ҳ��������ҳ��ͼ
 * 2).������������ؼ���"test"
 * 3).���������ť���ȴ�ҳ��������(�����ض���Ԫ���Ƿ����)
 * 4).�������������ͼ
 * */
var page = require('webpage').create();
page.settings.userAgent = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/525.19 (KHTML, like Gecko) Chrome/1.0.154.53 Safari/525.19';
page.open('http://www.baidu.com', function (status) {
    if (status != "success") {
        console.log('Page loaded failed.');
    } else {
        //����ٶ���ҳͼƬ
        page.render('baidu_homepage.png');
        //����jquery�ű���ҳ��
        page.includeJs('http://cdn.bootcss.com/zepto/1.2.0/zepto.min.js', function () {
            waitFor(function () {
                //return�ؼ���ָʾ�Ƿ���Ҫ�ȴ��ò����Ƿ�ִ�����
                return page.evaluate(function () {
                    //���������ť
                    $('#kw').val('test').click();
                    //ͨ��ĳ���ض�Ԫ���Ƿ���ʾ�������Ƿ������һ������
                    return $("#page").is(":visible");
                });
            }, function () {
                page.render('baidu_click.png');
                phantom.exit();
            });
        });
    }
});

/**
 *
 * @summary waits until a test condition is true or a timeout occurs
 * */
function waitFor(testFx, onReady, timeOutMillis) {
    var maxtimeOutMillis = timeOutMillis ? timeOutMillis : 3000, //< Default Max Timout is 3s
        start = new Date().getTime(),
        condition = false,
        interval = setInterval(function () {
            if ((new Date().getTime() - start < maxtimeOutMillis) && !condition) {
                // If not time-out yet and condition not yet fulfilled
                condition = (typeof(testFx) === "string" ? eval(testFx) : testFx()); //< defensive code
            } else {
                if (!condition) {
                    // If condition still not fulfilled (timeout but condition is 'false')
                    console.log("'waitFor()' timeout");
                    phantom.exit(1);
                } else {
                    // Condition fulfilled (timeout and/or condition is 'true')
                    console.log("'waitFor()' finished in " + (new Date().getTime() - start) + "ms.");
                    typeof(onReady) === "string" ? eval(onReady) : onReady(); //< Do what it's supposed to do once the condition is fulfilled
                    clearInterval(interval); //< Stop this interval
                }
            }
        }, 250); //< repeat check every 250ms
};