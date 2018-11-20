
// 加密解密
export function getParams(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var r = window.location.href.substr(1).match(reg);
    if (r != null) {
      return unescape(r[2]);
    }
    return null;
  }
  export function setupWebViewJavascriptBridge(callback) {
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
  export function tounicode(data) {
    if (data == '') return '请输入汉字';
    var str = '';
    for (var i = 0; i < data.length; i++) {
      str += "\\u" + parseInt(data[i].charCodeAt(0), 10).toString(16);
    }
    return str;
  }
  export var base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  export function encrypt(value) { //加密
    if (!value) {
      return value;
    }
    return encodeURIComponent(simpleEncrypt(value));
  }
  export function decrypt(value) { //解密
    if (!value) {
      return value;
    }
    return simpleDecrypt(decodeURIComponent(value));
  }
  export var str = 'zsbJxs7KysfNxsc=';
  //console.log(decrypt(str),'eeeeeeeeeeeeeeeeeeeeeee');
  export function toUtf8(str) {
    var result = [];
    for (var i = 0; i < str.length; i++) {
      var code = str.charCodeAt(i);
      if (code > 0x0000 && code <= 0x007F) {
        result.push(toByte(code));
      } else if (code >= 0x0080 && code <= 0x07FF) {
        result.push(toByte(0xC0 | ((code >> 6) & 0x1F)));
        result.push(toByte(0x80 | (code & 0x3F)));
      } else if (code >= 0x0800 && code <= 0xFFFF) {
        result.push(toByte(0xE0 | ((code >> 12) & 0x0F)));
        result.push(toByte(0x80 | ((code >> 6) & 0x3F)));
        result.push(toByte(0x80 | (code & 0x3F)));
      } else if (code >= 0x00010000 && code <= 0x001FFFFF) {} else if (code >= 0x00200000 && code <= 0x03FFFFFF) {} else {}
    }
    return result;
  }
  export function toUtf16(bytes) {
    var res = [];
    var i = 0;
    for (var i = 0; i < bytes.length; i++) {
      if (bytes[i] < 0) {
        bytes[i] += 256;
      }
      var code = bytes[i];
      if (((code >> 7) & 0xFF) == 0x0) {
        res.push(String.fromCharCode(bytes[i]));
      } else if (((code >> 5) & 0xFF) == 0x6) {
        var code2 = bytes[++i];
        var byte1 = (code & 0x1F) << 6;
        var byte2 = code2 & 0x3F;
        var utf16 = byte1 | byte2;
        res.push(String.fromCharCode(utf16));
      } else if (((code >> 4) & 0xFF) == 0xE) {
        var code2 = bytes[++i];
        var code3 = bytes[++i];
        var byte1 = (code << 4) | ((code2 >> 2) & 0x0F);
        var byte2 = ((code2 & 0x03) << 6) | (code3 & 0x3F);
        utf16 = ((byte1 & 0x00FF) << 8) | byte2
        res.push(String.fromCharCode(utf16));
      } else if (((code >> 3) & 0xFF) == 0x1E) {} else if (((code >> 2) & 0xFF) == 0x3E) {} else {}
    }
  
    return res.join('');
  }
  
  export function toByte(v) {
    if (v < -128) {
      v += 256;
    } else if (v > 127) {
      v -= 256;
    }
    return v;
  }
  
  export function InvalidCharacterError(message) {
    this.message = message;
  }
  InvalidCharacterError.prototype = new Error;
  InvalidCharacterError.prototype.name = 'InvalidCharacterError';
  
  //var base64Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  export function base64Encode(bytes) {
    var block, charCode, map = base64Chars,
      output = '';
    var position;
    for (
      var idx = 0; bytes[parseInt(idx | 0, 10)] || (map = '=', idx % 1); output += map.charAt(position)
    ) {
      charCode = bytes[parseInt(idx += 3 / 4, 10)];
      if (charCode < 0) {
        charCode += 256;
      }
      if (charCode > 0xFF) {
        throw new InvalidCharacterError("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
      }
      block = block << 8 | charCode;
  
      position = 63 & (block >> (8 - (idx % 1 * 8)));
    }
    return output;
  }
  export function base64Decode(str) {
    if (!str) {
      return '';
    }
  
    str = String(str).replace(/=+$/, '');
    if (str.length % 4 == 1) {
      throw new InvalidCharacterError("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    var res = [];
    for (
      var bc = 0, bs, buffer, idx = 0; buffer = str.charAt(idx++); ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        bc++ % 4) ? res.push(255 & bs >> (-2 * bc & 6)) : 0
    ) {
      buffer = base64Chars.indexOf(buffer);
    }
    return res;
  }
  export function simpleEncrypt(str) {
    if (typeof (str) === 'undefined' || str === null) {
      return null;
    }
    var bytes = toUtf8(str);
  
    var half;
    for (half = 0; half < bytes.length; half++) {
      bytes[half] = toByte(~bytes[half]);
    }
  
    half = parseInt(bytes.length / 2);
  
    for (var i = 0; i < half; i++) {
      if (i % 2 === 1) {
        var b = bytes[i];
        bytes[i] = bytes[i + half];
        bytes[i + half] = b;
      }
    }
    return base64Encode(bytes);
  }
  export function simpleDecrypt(str) {
    if (typeof (str) === 'undefined' || str === null) {
      return null;
    }
    str = str.replace(new RegExp('_', "gm"), '/');
    var bytes = base64Decode(str);
    var half = parseInt(bytes.length / 2);
  
    for (var i = 0; i < half; i++) {
      if (i % 2 === 1) {
        var b = bytes[i];
        bytes[i] = bytes[i + half];
        bytes[i + half] = b;
      }
    }
  
    for (var i = 0; i < bytes.length; i++) {
      bytes[i] = ~bytes[i];
    }
  
    return toUtf16(bytes);
  }
  export function isTimeOut() {
    var endTime = new Date("2018/12/11 23:59:59");
    var nowTime = new Date;
    if (nowTime >= endTime) {
      return 1;
    } else {
      return 0;
    }
  }
  