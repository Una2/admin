import {
  Const
} from './const';

var deviceType;
if (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1) {
  deviceType = 'android';
} else if (!!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
  deviceType = 'ios';
} else {
  deviceType = 'android';
}

function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(WebViewJavascriptBridge);
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
  }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement('iframe');
  WVJBIframe.style.display = 'none';
  WVJBIframe.src = 'https://__bridge_loaded__';
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function () {
    document.documentElement.removeChild(WVJBIframe)
  }, 0)
}

var ios_bridge = {
  callApp: function (method, params, callback) {
    setupWebViewJavascriptBridge(function (_bridge) {
      _bridge.callHandler(method, params, callback);
    });
  },
  registerJs: function (method, callback) {
    setupWebViewJavascriptBridge(function (_bridge) {
      _bridge.registerHandler(method, callback);
    });
  }
}

var android_bridge = {
  _register: {},
  callback: {},
  getPort: function () {
    return Math.floor(Math.random() * (1 << 30));
  },
  getUri: function (method, params, port) {
    params = this.getParam(params);
    var uri = Const.params.bridgeProtocol + ':' + port + '/' + method + (params ? '?' + params : '');
    return uri;
  },
  getParam: function (obj) {
    if (obj && typeof obj === 'object') {
      return JSON.stringify(obj);
    } else {
      return obj || '';
    }
  },
  callApp: function (method, params, callback) {
    var port = this.getPort();
    this.callback[port] = callback;
    if (!params) {
      params = {};
    }
    params.method = method;
    var uri = this.getUri('synchMethod', params, port);
    var flag = window.prompt(uri, '');
  },
  callAppResult: function (port, jsonObj) {
    var callback = this.callback[port];
    callback && callback(jsonObj);
    delete this.callbacks[port];
  },
  callJs: function (method, param) {
    if (method && this._register[method]) {
      this._register[method](param);
    }
  },
  registerJs: function (method, callback) {
    if (method && this.callback) {
      this._register[method] = callback;
    }
  }
}

export var bridge = (deviceType == "ios") ? ios_bridge : android_bridge;
