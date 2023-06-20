function connectWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
        callback(window.WebViewJavascriptBridge)
    } else {
        document.addEventListener(
            'WebViewJavascriptBridgeReady'
            , ()=> {
                callback(window.WebViewJavascriptBridge)
            },
            false
        );
    }
}

//注册回调函数，第一次连接时调用 初始化函数 connectWebViewJavascriptBridge和上面一致
connectWebViewJavascriptBridge(function(jsbridge) {
    //初始化 必须有 Android 通过 JSBridge 调用 默认JS bridge.init bridgeWebView.send调用
   jsbridge.init(function(message, callback) {
       callback({'Javascript Responds': 'Android调用JS初始化方法!'});
   });
})

export default  {
    registerHandler: function(name, fun) {
        connectWebViewJavascriptBridge(function(jsbridge){
            //Android调用js方法：functionInJs方法名称需要保持一致 ，并返回给Android通知
           jsbridge.registerHandler(name, function(data, responseCallback) {
                responseCallback(fun(data));
            });
        })
    },
    callHandler: function(name, data, fun) {
        connectWebViewJavascriptBridge(function(jsbridge){
            //JS调用Android方法：接收Android传递过来的数据，并做处理
           jsbridge.callHandler(name, data, function(data) {
                fun(data);
            });
        })
    }
}
