/**
 *
 * @summary 这个例子演示操作过程如下
 * 1).打开百度首页并保存首页截图
 * 2).搜索框中输入关键字"test"
 * 3).点击搜索按钮并等待页面加载完成(根据特定的元素是否出现)
 * 4).保存搜索结果截图
 * */
var page = require('webpage').create();
page.settings.userAgent = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/525.19 (KHTML, like Gecko) Chrome/1.0.154.53 Safari/525.19';
page.open('http://www.baidu.com', function (status) {
    if (status != "success") {
        console.log('Page loaded failed.');
    } else {
        //保存百度首页图片
        page.render('baidu_homepage.png');
        //加载jquery脚本到页面
        page.includeJs('http://cdn.bootcss.com/zepto/1.2.0/zepto.min.js', function () {
            waitFor(function () {
                //return关键字指示是否需要等待该操作是否执行完成
                return page.evaluate(function () {
                    //点击搜索按钮
                    $('#kw').val('test').click();
                    //通过某个特定元素是否显示来决定是否进行下一步操作
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