export default class NetUtil{
    static Request(url, postData, callback){
        if(CC_WECHATGAME){
            wx.request({
                url: url,
                data: postData,
                method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                header: {
                    'content-type': 'application/json'
                },// 设置请求的 header
                success: function (res) {
                    if (res.statusCode == 200) {
                        if(callback){
                            callback(res.data);
                        }
                    } else {
                        console.log("Request " + url + " statusCode" + res.statusCode)
                    }
                },
                fail: function () {
                    console.log("Request " + url + " fail");
                },
            })
        }
        else
        {
            let request = new XMLHttpRequest();
            request.open("get", url, true);
            request.setRequestHeader("Content-Type", "application/json");
            request.send(postData);
            request.onreadystatechange = function () {
                // readyState 五种状态
                // 0 － （未初始化）调用了open()方法，未调用send()方法
                // 1 － （载入）send()方法,正在发送请求
                // 2 － （载入完成）send()方法执行完成，已经接收到全部响应内容
                // 3 － （交互）正在解析响应内容
                // 4 － （完成）响应内容解析完成
                if (request.readyState == 4) {
                    // status：http状态码
                    if (request.status == 200) {
                        if(callback){
                            callback(request.responseText);
                        }
                    } else {
                        console.log("Request " + url + " fail, request:", request);
                    }
                }
            }
        }
    }
}