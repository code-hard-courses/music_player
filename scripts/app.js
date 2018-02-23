"use strict";

var _typeof2 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);throw new Error("Cannot find module '" + o + "'");
      }var f = n[o] = { exports: {} };t[o][0].call(f.exports, function (e) {
        var n = t[o][1][e];return s(n ? n : e);
      }, f, f.exports, e, t, n, r);
    }return n[o].exports;
  }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) {
    s(r[o]);
  }return s;
})({ 1: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

      ;(function (exports) {
        'use strict';

        var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

        var PLUS = '+'.charCodeAt(0);
        var SLASH = '/'.charCodeAt(0);
        var NUMBER = '0'.charCodeAt(0);
        var LOWER = 'a'.charCodeAt(0);
        var UPPER = 'A'.charCodeAt(0);
        var PLUS_URL_SAFE = '-'.charCodeAt(0);
        var SLASH_URL_SAFE = '_'.charCodeAt(0);

        function decode(elt) {
          var code = elt.charCodeAt(0);
          if (code === PLUS || code === PLUS_URL_SAFE) return 62; // '+'
          if (code === SLASH || code === SLASH_URL_SAFE) return 63; // '/'
          if (code < NUMBER) return -1; //no match
          if (code < NUMBER + 10) return code - NUMBER + 26 + 26;
          if (code < UPPER + 26) return code - UPPER;
          if (code < LOWER + 26) return code - LOWER + 26;
        }

        function b64ToByteArray(b64) {
          var i, j, l, tmp, placeHolders, arr;

          if (b64.length % 4 > 0) {
            throw new Error('Invalid string. Length must be a multiple of 4');
          }

          // the number of equal signs (place holders)
          // if there are two placeholders, than the two characters before it
          // represent one byte
          // if there is only one, then the three characters before it represent 2 bytes
          // this is just a cheap hack to not do indexOf twice
          var len = b64.length;
          placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0;

          // base64 is 4/3 + up to two characters of the original data
          arr = new Arr(b64.length * 3 / 4 - placeHolders);

          // if there are placeholders, only get up to the last complete 4 chars
          l = placeHolders > 0 ? b64.length - 4 : b64.length;

          var L = 0;

          function push(v) {
            arr[L++] = v;
          }

          for (i = 0, j = 0; i < l; i += 4, j += 3) {
            tmp = decode(b64.charAt(i)) << 18 | decode(b64.charAt(i + 1)) << 12 | decode(b64.charAt(i + 2)) << 6 | decode(b64.charAt(i + 3));
            push((tmp & 0xFF0000) >> 16);
            push((tmp & 0xFF00) >> 8);
            push(tmp & 0xFF);
          }

          if (placeHolders === 2) {
            tmp = decode(b64.charAt(i)) << 2 | decode(b64.charAt(i + 1)) >> 4;
            push(tmp & 0xFF);
          } else if (placeHolders === 1) {
            tmp = decode(b64.charAt(i)) << 10 | decode(b64.charAt(i + 1)) << 4 | decode(b64.charAt(i + 2)) >> 2;
            push(tmp >> 8 & 0xFF);
            push(tmp & 0xFF);
          }

          return arr;
        }

        function uint8ToBase64(uint8) {
          var i,
              extraBytes = uint8.length % 3,

          // if we have 1 byte left, pad 2 bytes
          output = "",
              temp,
              length;

          function encode(num) {
            return lookup.charAt(num);
          }

          function tripletToBase64(num) {
            return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F);
          }

          // go through the array every three bytes, we'll deal with trailing stuff later
          for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
            temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + uint8[i + 2];
            output += tripletToBase64(temp);
          }

          // pad the end with zeros, but make sure to not forget the extra bytes
          switch (extraBytes) {
            case 1:
              temp = uint8[uint8.length - 1];
              output += encode(temp >> 2);
              output += encode(temp << 4 & 0x3F);
              output += '==';
              break;
            case 2:
              temp = (uint8[uint8.length - 2] << 8) + uint8[uint8.length - 1];
              output += encode(temp >> 10);
              output += encode(temp >> 4 & 0x3F);
              output += encode(temp << 2 & 0x3F);
              output += '=';
              break;
          }

          return output;
        }

        exports.toByteArray = b64ToByteArray;
        exports.fromByteArray = uint8ToBase64;
      })(typeof exports === 'undefined' ? undefined.base64js = {} : exports);
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/..\\..\\node_modules\\base64-js\\lib\\b64.js", "/..\\..\\node_modules\\base64-js\\lib");
  }, { "buffer": 2, "e/U+97": 4 }], 2: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
        return typeof obj === "undefined" ? "undefined" : _typeof2(obj);
      } : function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof2(obj);
      };

      /*!
       * The buffer module from node.js, for the browser.
       *
       * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
       * @license  MIT
       */

      var base64 = require('base64-js');
      var ieee754 = require('ieee754');

      exports.Buffer = Buffer;
      exports.SlowBuffer = Buffer;
      exports.INSPECT_MAX_BYTES = 50;
      Buffer.poolSize = 8192;

      /**
       * If `Buffer._useTypedArrays`:
       *   === true    Use Uint8Array implementation (fastest)
       *   === false   Use Object implementation (compatible down to IE6)
       */
      Buffer._useTypedArrays = function () {
        // Detect if browser supports Typed Arrays. Supported browsers are IE 10+, Firefox 4+,
        // Chrome 7+, Safari 5.1+, Opera 11.6+, iOS 4.2+. If the browser does not support adding
        // properties to `Uint8Array` instances, then that's the same as no `Uint8Array` support
        // because we need to be able to add all the node Buffer API methods. This is an issue
        // in Firefox 4-29. Now fixed: https://bugzilla.mozilla.org/show_bug.cgi?id=695438
        try {
          var buf = new ArrayBuffer(0);
          var arr = new Uint8Array(buf);
          arr.foo = function () {
            return 42;
          };
          return 42 === arr.foo() && typeof arr.subarray === 'function'; // Chrome 9-10 lack `subarray`
        } catch (e) {
          return false;
        }
      }();

      /**
       * Class: Buffer
       * =============
       *
       * The Buffer constructor returns instances of `Uint8Array` that are augmented
       * with function properties for all the node `Buffer` API functions. We use
       * `Uint8Array` so that square bracket notation works as expected -- it returns
       * a single octet.
       *
       * By augmenting the instances, we can avoid modifying the `Uint8Array`
       * prototype.
       */
      function Buffer(subject, encoding, noZero) {
        if (!(this instanceof Buffer)) return new Buffer(subject, encoding, noZero);

        var type = typeof subject === 'undefined' ? 'undefined' : _typeof(subject);

        // Workaround: node's base64 implementation allows for non-padded strings
        // while base64-js does not.
        if (encoding === 'base64' && type === 'string') {
          subject = stringtrim(subject);
          while (subject.length % 4 !== 0) {
            subject = subject + '=';
          }
        }

        // Find the length
        var length;
        if (type === 'number') length = coerce(subject);else if (type === 'string') length = Buffer.byteLength(subject, encoding);else if (type === 'object') length = coerce(subject.length); // assume that object is array-like
        else throw new Error('First argument needs to be a number, array or string.');

        var buf;
        if (Buffer._useTypedArrays) {
          // Preferred: Return an augmented `Uint8Array` instance for best performance
          buf = Buffer._augment(new Uint8Array(length));
        } else {
          // Fallback: Return THIS instance of Buffer (created by `new`)
          buf = this;
          buf.length = length;
          buf._isBuffer = true;
        }

        var i;
        if (Buffer._useTypedArrays && typeof subject.byteLength === 'number') {
          // Speed optimization -- use set if we're copying from a typed array
          buf._set(subject);
        } else if (isArrayish(subject)) {
          // Treat array-ish objects as a byte array
          for (i = 0; i < length; i++) {
            if (Buffer.isBuffer(subject)) buf[i] = subject.readUInt8(i);else buf[i] = subject[i];
          }
        } else if (type === 'string') {
          buf.write(subject, 0, encoding);
        } else if (type === 'number' && !Buffer._useTypedArrays && !noZero) {
          for (i = 0; i < length; i++) {
            buf[i] = 0;
          }
        }

        return buf;
      }

      // STATIC METHODS
      // ==============

      Buffer.isEncoding = function (encoding) {
        switch (String(encoding).toLowerCase()) {
          case 'hex':
          case 'utf8':
          case 'utf-8':
          case 'ascii':
          case 'binary':
          case 'base64':
          case 'raw':
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return true;
          default:
            return false;
        }
      };

      Buffer.isBuffer = function (b) {
        return !!(b !== null && b !== undefined && b._isBuffer);
      };

      Buffer.byteLength = function (str, encoding) {
        var ret;
        str = str + '';
        switch (encoding || 'utf8') {
          case 'hex':
            ret = str.length / 2;
            break;
          case 'utf8':
          case 'utf-8':
            ret = utf8ToBytes(str).length;
            break;
          case 'ascii':
          case 'binary':
          case 'raw':
            ret = str.length;
            break;
          case 'base64':
            ret = base64ToBytes(str).length;
            break;
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            ret = str.length * 2;
            break;
          default:
            throw new Error('Unknown encoding');
        }
        return ret;
      };

      Buffer.concat = function (list, totalLength) {
        assert(isArray(list), 'Usage: Buffer.concat(list, [totalLength])\n' + 'list should be an Array.');

        if (list.length === 0) {
          return new Buffer(0);
        } else if (list.length === 1) {
          return list[0];
        }

        var i;
        if (typeof totalLength !== 'number') {
          totalLength = 0;
          for (i = 0; i < list.length; i++) {
            totalLength += list[i].length;
          }
        }

        var buf = new Buffer(totalLength);
        var pos = 0;
        for (i = 0; i < list.length; i++) {
          var item = list[i];
          item.copy(buf, pos);
          pos += item.length;
        }
        return buf;
      };

      // BUFFER INSTANCE METHODS
      // =======================

      function _hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        var remaining = buf.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }

        // must be an even number of digits
        var strLen = string.length;
        assert(strLen % 2 === 0, 'Invalid hex string');

        if (length > strLen / 2) {
          length = strLen / 2;
        }
        for (var i = 0; i < length; i++) {
          var byte = parseInt(string.substr(i * 2, 2), 16);
          assert(!isNaN(byte), 'Invalid hex string');
          buf[offset + i] = byte;
        }
        Buffer._charsWritten = i * 2;
        return i;
      }

      function _utf8Write(buf, string, offset, length) {
        var charsWritten = Buffer._charsWritten = blitBuffer(utf8ToBytes(string), buf, offset, length);
        return charsWritten;
      }

      function _asciiWrite(buf, string, offset, length) {
        var charsWritten = Buffer._charsWritten = blitBuffer(asciiToBytes(string), buf, offset, length);
        return charsWritten;
      }

      function _binaryWrite(buf, string, offset, length) {
        return _asciiWrite(buf, string, offset, length);
      }

      function _base64Write(buf, string, offset, length) {
        var charsWritten = Buffer._charsWritten = blitBuffer(base64ToBytes(string), buf, offset, length);
        return charsWritten;
      }

      function _utf16leWrite(buf, string, offset, length) {
        var charsWritten = Buffer._charsWritten = blitBuffer(utf16leToBytes(string), buf, offset, length);
        return charsWritten;
      }

      Buffer.prototype.write = function (string, offset, length, encoding) {
        // Support both (string, offset, length, encoding)
        // and the legacy (string, encoding, offset, length)
        if (isFinite(offset)) {
          if (!isFinite(length)) {
            encoding = length;
            length = undefined;
          }
        } else {
          // legacy
          var swap = encoding;
          encoding = offset;
          offset = length;
          length = swap;
        }

        offset = Number(offset) || 0;
        var remaining = this.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }
        encoding = String(encoding || 'utf8').toLowerCase();

        var ret;
        switch (encoding) {
          case 'hex':
            ret = _hexWrite(this, string, offset, length);
            break;
          case 'utf8':
          case 'utf-8':
            ret = _utf8Write(this, string, offset, length);
            break;
          case 'ascii':
            ret = _asciiWrite(this, string, offset, length);
            break;
          case 'binary':
            ret = _binaryWrite(this, string, offset, length);
            break;
          case 'base64':
            ret = _base64Write(this, string, offset, length);
            break;
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            ret = _utf16leWrite(this, string, offset, length);
            break;
          default:
            throw new Error('Unknown encoding');
        }
        return ret;
      };

      Buffer.prototype.toString = function (encoding, start, end) {
        var self = this;

        encoding = String(encoding || 'utf8').toLowerCase();
        start = Number(start) || 0;
        end = end !== undefined ? Number(end) : end = self.length;

        // Fastpath empty strings
        if (end === start) return '';

        var ret;
        switch (encoding) {
          case 'hex':
            ret = _hexSlice(self, start, end);
            break;
          case 'utf8':
          case 'utf-8':
            ret = _utf8Slice(self, start, end);
            break;
          case 'ascii':
            ret = _asciiSlice(self, start, end);
            break;
          case 'binary':
            ret = _binarySlice(self, start, end);
            break;
          case 'base64':
            ret = _base64Slice(self, start, end);
            break;
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            ret = _utf16leSlice(self, start, end);
            break;
          default:
            throw new Error('Unknown encoding');
        }
        return ret;
      };

      Buffer.prototype.toJSON = function () {
        return {
          type: 'Buffer',
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };

      // copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
      Buffer.prototype.copy = function (target, target_start, start, end) {
        var source = this;

        if (!start) start = 0;
        if (!end && end !== 0) end = this.length;
        if (!target_start) target_start = 0;

        // Copy 0 bytes; we're done
        if (end === start) return;
        if (target.length === 0 || source.length === 0) return;

        // Fatal error conditions
        assert(end >= start, 'sourceEnd < sourceStart');
        assert(target_start >= 0 && target_start < target.length, 'targetStart out of bounds');
        assert(start >= 0 && start < source.length, 'sourceStart out of bounds');
        assert(end >= 0 && end <= source.length, 'sourceEnd out of bounds');

        // Are we oob?
        if (end > this.length) end = this.length;
        if (target.length - target_start < end - start) end = target.length - target_start + start;

        var len = end - start;

        if (len < 100 || !Buffer._useTypedArrays) {
          for (var i = 0; i < len; i++) {
            target[i + target_start] = this[i + start];
          }
        } else {
          target._set(this.subarray(start, start + len), target_start);
        }
      };

      function _base64Slice(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return base64.fromByteArray(buf);
        } else {
          return base64.fromByteArray(buf.slice(start, end));
        }
      }

      function _utf8Slice(buf, start, end) {
        var res = '';
        var tmp = '';
        end = Math.min(buf.length, end);

        for (var i = start; i < end; i++) {
          if (buf[i] <= 0x7F) {
            res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i]);
            tmp = '';
          } else {
            tmp += '%' + buf[i].toString(16);
          }
        }

        return res + decodeUtf8Char(tmp);
      }

      function _asciiSlice(buf, start, end) {
        var ret = '';
        end = Math.min(buf.length, end);

        for (var i = start; i < end; i++) {
          ret += String.fromCharCode(buf[i]);
        }return ret;
      }

      function _binarySlice(buf, start, end) {
        return _asciiSlice(buf, start, end);
      }

      function _hexSlice(buf, start, end) {
        var len = buf.length;

        if (!start || start < 0) start = 0;
        if (!end || end < 0 || end > len) end = len;

        var out = '';
        for (var i = start; i < end; i++) {
          out += toHex(buf[i]);
        }
        return out;
      }

      function _utf16leSlice(buf, start, end) {
        var bytes = buf.slice(start, end);
        var res = '';
        for (var i = 0; i < bytes.length; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }
        return res;
      }

      Buffer.prototype.slice = function (start, end) {
        var len = this.length;
        start = clamp(start, len, 0);
        end = clamp(end, len, len);

        if (Buffer._useTypedArrays) {
          return Buffer._augment(this.subarray(start, end));
        } else {
          var sliceLen = end - start;
          var newBuf = new Buffer(sliceLen, undefined, true);
          for (var i = 0; i < sliceLen; i++) {
            newBuf[i] = this[i + start];
          }
          return newBuf;
        }
      };

      // `get` will be removed in Node 0.13+
      Buffer.prototype.get = function (offset) {
        console.log('.get() is deprecated. Access using array indexes instead.');
        return this.readUInt8(offset);
      };

      // `set` will be removed in Node 0.13+
      Buffer.prototype.set = function (v, offset) {
        console.log('.set() is deprecated. Access using array indexes instead.');
        return this.writeUInt8(v, offset);
      };

      Buffer.prototype.readUInt8 = function (offset, noAssert) {
        if (!noAssert) {
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset < this.length, 'Trying to read beyond buffer length');
        }

        if (offset >= this.length) return;

        return this[offset];
      };

      function _readUInt16(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 1 < buf.length, 'Trying to read beyond buffer length');
        }

        var len = buf.length;
        if (offset >= len) return;

        var val;
        if (littleEndian) {
          val = buf[offset];
          if (offset + 1 < len) val |= buf[offset + 1] << 8;
        } else {
          val = buf[offset] << 8;
          if (offset + 1 < len) val |= buf[offset + 1];
        }
        return val;
      }

      Buffer.prototype.readUInt16LE = function (offset, noAssert) {
        return _readUInt16(this, offset, true, noAssert);
      };

      Buffer.prototype.readUInt16BE = function (offset, noAssert) {
        return _readUInt16(this, offset, false, noAssert);
      };

      function _readUInt32(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 3 < buf.length, 'Trying to read beyond buffer length');
        }

        var len = buf.length;
        if (offset >= len) return;

        var val;
        if (littleEndian) {
          if (offset + 2 < len) val = buf[offset + 2] << 16;
          if (offset + 1 < len) val |= buf[offset + 1] << 8;
          val |= buf[offset];
          if (offset + 3 < len) val = val + (buf[offset + 3] << 24 >>> 0);
        } else {
          if (offset + 1 < len) val = buf[offset + 1] << 16;
          if (offset + 2 < len) val |= buf[offset + 2] << 8;
          if (offset + 3 < len) val |= buf[offset + 3];
          val = val + (buf[offset] << 24 >>> 0);
        }
        return val;
      }

      Buffer.prototype.readUInt32LE = function (offset, noAssert) {
        return _readUInt32(this, offset, true, noAssert);
      };

      Buffer.prototype.readUInt32BE = function (offset, noAssert) {
        return _readUInt32(this, offset, false, noAssert);
      };

      Buffer.prototype.readInt8 = function (offset, noAssert) {
        if (!noAssert) {
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset < this.length, 'Trying to read beyond buffer length');
        }

        if (offset >= this.length) return;

        var neg = this[offset] & 0x80;
        if (neg) return (0xff - this[offset] + 1) * -1;else return this[offset];
      };

      function _readInt16(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 1 < buf.length, 'Trying to read beyond buffer length');
        }

        var len = buf.length;
        if (offset >= len) return;

        var val = _readUInt16(buf, offset, littleEndian, true);
        var neg = val & 0x8000;
        if (neg) return (0xffff - val + 1) * -1;else return val;
      }

      Buffer.prototype.readInt16LE = function (offset, noAssert) {
        return _readInt16(this, offset, true, noAssert);
      };

      Buffer.prototype.readInt16BE = function (offset, noAssert) {
        return _readInt16(this, offset, false, noAssert);
      };

      function _readInt32(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 3 < buf.length, 'Trying to read beyond buffer length');
        }

        var len = buf.length;
        if (offset >= len) return;

        var val = _readUInt32(buf, offset, littleEndian, true);
        var neg = val & 0x80000000;
        if (neg) return (0xffffffff - val + 1) * -1;else return val;
      }

      Buffer.prototype.readInt32LE = function (offset, noAssert) {
        return _readInt32(this, offset, true, noAssert);
      };

      Buffer.prototype.readInt32BE = function (offset, noAssert) {
        return _readInt32(this, offset, false, noAssert);
      };

      function _readFloat(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset + 3 < buf.length, 'Trying to read beyond buffer length');
        }

        return ieee754.read(buf, offset, littleEndian, 23, 4);
      }

      Buffer.prototype.readFloatLE = function (offset, noAssert) {
        return _readFloat(this, offset, true, noAssert);
      };

      Buffer.prototype.readFloatBE = function (offset, noAssert) {
        return _readFloat(this, offset, false, noAssert);
      };

      function _readDouble(buf, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset + 7 < buf.length, 'Trying to read beyond buffer length');
        }

        return ieee754.read(buf, offset, littleEndian, 52, 8);
      }

      Buffer.prototype.readDoubleLE = function (offset, noAssert) {
        return _readDouble(this, offset, true, noAssert);
      };

      Buffer.prototype.readDoubleBE = function (offset, noAssert) {
        return _readDouble(this, offset, false, noAssert);
      };

      Buffer.prototype.writeUInt8 = function (value, offset, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset < this.length, 'trying to write beyond buffer length');
          verifuint(value, 0xff);
        }

        if (offset >= this.length) return;

        this[offset] = value;
      };

      function _writeUInt16(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 1 < buf.length, 'trying to write beyond buffer length');
          verifuint(value, 0xffff);
        }

        var len = buf.length;
        if (offset >= len) return;

        for (var i = 0, j = Math.min(len - offset, 2); i < j; i++) {
          buf[offset + i] = (value & 0xff << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
        }
      }

      Buffer.prototype.writeUInt16LE = function (value, offset, noAssert) {
        _writeUInt16(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeUInt16BE = function (value, offset, noAssert) {
        _writeUInt16(this, value, offset, false, noAssert);
      };

      function _writeUInt32(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 3 < buf.length, 'trying to write beyond buffer length');
          verifuint(value, 0xffffffff);
        }

        var len = buf.length;
        if (offset >= len) return;

        for (var i = 0, j = Math.min(len - offset, 4); i < j; i++) {
          buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 0xff;
        }
      }

      Buffer.prototype.writeUInt32LE = function (value, offset, noAssert) {
        _writeUInt32(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeUInt32BE = function (value, offset, noAssert) {
        _writeUInt32(this, value, offset, false, noAssert);
      };

      Buffer.prototype.writeInt8 = function (value, offset, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset < this.length, 'Trying to write beyond buffer length');
          verifsint(value, 0x7f, -0x80);
        }

        if (offset >= this.length) return;

        if (value >= 0) this.writeUInt8(value, offset, noAssert);else this.writeUInt8(0xff + value + 1, offset, noAssert);
      };

      function _writeInt16(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 1 < buf.length, 'Trying to write beyond buffer length');
          verifsint(value, 0x7fff, -0x8000);
        }

        var len = buf.length;
        if (offset >= len) return;

        if (value >= 0) _writeUInt16(buf, value, offset, littleEndian, noAssert);else _writeUInt16(buf, 0xffff + value + 1, offset, littleEndian, noAssert);
      }

      Buffer.prototype.writeInt16LE = function (value, offset, noAssert) {
        _writeInt16(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeInt16BE = function (value, offset, noAssert) {
        _writeInt16(this, value, offset, false, noAssert);
      };

      function _writeInt32(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 3 < buf.length, 'Trying to write beyond buffer length');
          verifsint(value, 0x7fffffff, -0x80000000);
        }

        var len = buf.length;
        if (offset >= len) return;

        if (value >= 0) _writeUInt32(buf, value, offset, littleEndian, noAssert);else _writeUInt32(buf, 0xffffffff + value + 1, offset, littleEndian, noAssert);
      }

      Buffer.prototype.writeInt32LE = function (value, offset, noAssert) {
        _writeInt32(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeInt32BE = function (value, offset, noAssert) {
        _writeInt32(this, value, offset, false, noAssert);
      };

      function _writeFloat(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 3 < buf.length, 'Trying to write beyond buffer length');
          verifIEEE754(value, 3.4028234663852886e+38, -3.4028234663852886e+38);
        }

        var len = buf.length;
        if (offset >= len) return;

        ieee754.write(buf, value, offset, littleEndian, 23, 4);
      }

      Buffer.prototype.writeFloatLE = function (value, offset, noAssert) {
        _writeFloat(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeFloatBE = function (value, offset, noAssert) {
        _writeFloat(this, value, offset, false, noAssert);
      };

      function _writeDouble(buf, value, offset, littleEndian, noAssert) {
        if (!noAssert) {
          assert(value !== undefined && value !== null, 'missing value');
          assert(typeof littleEndian === 'boolean', 'missing or invalid endian');
          assert(offset !== undefined && offset !== null, 'missing offset');
          assert(offset + 7 < buf.length, 'Trying to write beyond buffer length');
          verifIEEE754(value, 1.7976931348623157E+308, -1.7976931348623157E+308);
        }

        var len = buf.length;
        if (offset >= len) return;

        ieee754.write(buf, value, offset, littleEndian, 52, 8);
      }

      Buffer.prototype.writeDoubleLE = function (value, offset, noAssert) {
        _writeDouble(this, value, offset, true, noAssert);
      };

      Buffer.prototype.writeDoubleBE = function (value, offset, noAssert) {
        _writeDouble(this, value, offset, false, noAssert);
      };

      // fill(value, start=0, end=buffer.length)
      Buffer.prototype.fill = function (value, start, end) {
        if (!value) value = 0;
        if (!start) start = 0;
        if (!end) end = this.length;

        if (typeof value === 'string') {
          value = value.charCodeAt(0);
        }

        assert(typeof value === 'number' && !isNaN(value), 'value is not a number');
        assert(end >= start, 'end < start');

        // Fill 0 bytes; we're done
        if (end === start) return;
        if (this.length === 0) return;

        assert(start >= 0 && start < this.length, 'start out of bounds');
        assert(end >= 0 && end <= this.length, 'end out of bounds');

        for (var i = start; i < end; i++) {
          this[i] = value;
        }
      };

      Buffer.prototype.inspect = function () {
        var out = [];
        var len = this.length;
        for (var i = 0; i < len; i++) {
          out[i] = toHex(this[i]);
          if (i === exports.INSPECT_MAX_BYTES) {
            out[i + 1] = '...';
            break;
          }
        }
        return '<Buffer ' + out.join(' ') + '>';
      };

      /**
       * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
       * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
       */
      Buffer.prototype.toArrayBuffer = function () {
        if (typeof Uint8Array !== 'undefined') {
          if (Buffer._useTypedArrays) {
            return new Buffer(this).buffer;
          } else {
            var buf = new Uint8Array(this.length);
            for (var i = 0, len = buf.length; i < len; i += 1) {
              buf[i] = this[i];
            }return buf.buffer;
          }
        } else {
          throw new Error('Buffer.toArrayBuffer not supported in this browser');
        }
      };

      // HELPER FUNCTIONS
      // ================

      function stringtrim(str) {
        if (str.trim) return str.trim();
        return str.replace(/^\s+|\s+$/g, '');
      }

      var BP = Buffer.prototype;

      /**
       * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
       */
      Buffer._augment = function (arr) {
        arr._isBuffer = true;

        // save reference to original Uint8Array get/set methods before overwriting
        arr._get = arr.get;
        arr._set = arr.set;

        // deprecated, will be removed in node 0.13+
        arr.get = BP.get;
        arr.set = BP.set;

        arr.write = BP.write;
        arr.toString = BP.toString;
        arr.toLocaleString = BP.toString;
        arr.toJSON = BP.toJSON;
        arr.copy = BP.copy;
        arr.slice = BP.slice;
        arr.readUInt8 = BP.readUInt8;
        arr.readUInt16LE = BP.readUInt16LE;
        arr.readUInt16BE = BP.readUInt16BE;
        arr.readUInt32LE = BP.readUInt32LE;
        arr.readUInt32BE = BP.readUInt32BE;
        arr.readInt8 = BP.readInt8;
        arr.readInt16LE = BP.readInt16LE;
        arr.readInt16BE = BP.readInt16BE;
        arr.readInt32LE = BP.readInt32LE;
        arr.readInt32BE = BP.readInt32BE;
        arr.readFloatLE = BP.readFloatLE;
        arr.readFloatBE = BP.readFloatBE;
        arr.readDoubleLE = BP.readDoubleLE;
        arr.readDoubleBE = BP.readDoubleBE;
        arr.writeUInt8 = BP.writeUInt8;
        arr.writeUInt16LE = BP.writeUInt16LE;
        arr.writeUInt16BE = BP.writeUInt16BE;
        arr.writeUInt32LE = BP.writeUInt32LE;
        arr.writeUInt32BE = BP.writeUInt32BE;
        arr.writeInt8 = BP.writeInt8;
        arr.writeInt16LE = BP.writeInt16LE;
        arr.writeInt16BE = BP.writeInt16BE;
        arr.writeInt32LE = BP.writeInt32LE;
        arr.writeInt32BE = BP.writeInt32BE;
        arr.writeFloatLE = BP.writeFloatLE;
        arr.writeFloatBE = BP.writeFloatBE;
        arr.writeDoubleLE = BP.writeDoubleLE;
        arr.writeDoubleBE = BP.writeDoubleBE;
        arr.fill = BP.fill;
        arr.inspect = BP.inspect;
        arr.toArrayBuffer = BP.toArrayBuffer;

        return arr;
      };

      // slice(start, end)
      function clamp(index, len, defaultValue) {
        if (typeof index !== 'number') return defaultValue;
        index = ~~index; // Coerce to integer.
        if (index >= len) return len;
        if (index >= 0) return index;
        index += len;
        if (index >= 0) return index;
        return 0;
      }

      function coerce(length) {
        // Coerce length to a number (possibly NaN), round up
        // in case it's fractional (e.g. 123.456) then do a
        // double negate to coerce a NaN to 0. Easy, right?
        length = ~~Math.ceil(+length);
        return length < 0 ? 0 : length;
      }

      function isArray(subject) {
        return (Array.isArray || function (subject) {
          return Object.prototype.toString.call(subject) === '[object Array]';
        })(subject);
      }

      function isArrayish(subject) {
        return isArray(subject) || Buffer.isBuffer(subject) || subject && (typeof subject === 'undefined' ? 'undefined' : _typeof(subject)) === 'object' && typeof subject.length === 'number';
      }

      function toHex(n) {
        if (n < 16) return '0' + n.toString(16);
        return n.toString(16);
      }

      function utf8ToBytes(str) {
        var byteArray = [];
        for (var i = 0; i < str.length; i++) {
          var b = str.charCodeAt(i);
          if (b <= 0x7F) byteArray.push(str.charCodeAt(i));else {
            var start = i;
            if (b >= 0xD800 && b <= 0xDFFF) i++;
            var h = encodeURIComponent(str.slice(start, i + 1)).substr(1).split('%');
            for (var j = 0; j < h.length; j++) {
              byteArray.push(parseInt(h[j], 16));
            }
          }
        }
        return byteArray;
      }

      function asciiToBytes(str) {
        var byteArray = [];
        for (var i = 0; i < str.length; i++) {
          // Node's code seems to be doing this and not & 0x7F..
          byteArray.push(str.charCodeAt(i) & 0xFF);
        }
        return byteArray;
      }

      function utf16leToBytes(str) {
        var c, hi, lo;
        var byteArray = [];
        for (var i = 0; i < str.length; i++) {
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }

        return byteArray;
      }

      function base64ToBytes(str) {
        return base64.toByteArray(str);
      }

      function blitBuffer(src, dst, offset, length) {
        var pos;
        for (var i = 0; i < length; i++) {
          if (i + offset >= dst.length || i >= src.length) break;
          dst[i + offset] = src[i];
        }
        return i;
      }

      function decodeUtf8Char(str) {
        try {
          return decodeURIComponent(str);
        } catch (err) {
          return String.fromCharCode(0xFFFD); // UTF 8 invalid char
        }
      }

      /*
       * We have to make sure that the value is a valid integer. This means that it
       * is non-negative. It has no fractional component and that it does not
       * exceed the maximum allowed value.
       */
      function verifuint(value, max) {
        assert(typeof value === 'number', 'cannot write a non-number as a number');
        assert(value >= 0, 'specified a negative value for writing an unsigned value');
        assert(value <= max, 'value is larger than maximum value for type');
        assert(Math.floor(value) === value, 'value has a fractional component');
      }

      function verifsint(value, max, min) {
        assert(typeof value === 'number', 'cannot write a non-number as a number');
        assert(value <= max, 'value larger than maximum allowed value');
        assert(value >= min, 'value smaller than minimum allowed value');
        assert(Math.floor(value) === value, 'value has a fractional component');
      }

      function verifIEEE754(value, max, min) {
        assert(typeof value === 'number', 'cannot write a non-number as a number');
        assert(value <= max, 'value larger than maximum allowed value');
        assert(value >= min, 'value smaller than minimum allowed value');
      }

      function assert(test, message) {
        if (!test) throw new Error(message || 'Failed assertion');
      }
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/..\\..\\node_modules\\buffer\\index.js", "/..\\..\\node_modules\\buffer");
  }, { "base64-js": 1, "buffer": 2, "e/U+97": 4, "ieee754": 3 }], 3: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      "use strict";

      exports.read = function (buffer, offset, isLE, mLen, nBytes) {
        var e, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d = isLE ? -1 : 1;
        var s = buffer[offset + i];

        i += d;

        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : (s ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };

      exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d = isLE ? 1 : -1;
        var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;

        value = Math.abs(value);

        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }

          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }

        for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

        e = e << mLen | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

        buffer[offset + i - d] |= s * 128;
      };
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/..\\..\\node_modules\\ieee754\\index.js", "/..\\..\\node_modules\\ieee754");
  }, { "buffer": 2, "e/U+97": 4 }], 4: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      // shim for using process in browser

      var process = module.exports = {};

      process.nextTick = function () {
        var canSetImmediate = typeof window !== 'undefined' && window.setImmediate;
        var canPost = typeof window !== 'undefined' && window.postMessage && window.addEventListener;

        if (canSetImmediate) {
          return function (f) {
            return window.setImmediate(f);
          };
        }

        if (canPost) {
          var queue = [];
          window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
              ev.stopPropagation();
              if (queue.length > 0) {
                var fn = queue.shift();
                fn();
              }
            }
          }, true);

          return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
          };
        }

        return function nextTick(fn) {
          setTimeout(fn, 0);
        };
      }();

      process.title = 'browser';
      process.browser = true;
      process.env = {};
      process.argv = [];

      function noop() {}

      process.on = noop;
      process.addListener = noop;
      process.once = noop;
      process.off = noop;
      process.removeListener = noop;
      process.removeAllListeners = noop;
      process.emit = noop;

      process.binding = function (name) {
        throw new Error('process.binding is not supported');
      };

      // TODO(shtylman)
      process.cwd = function () {
        return '/';
      };
      process.chdir = function (dir) {
        throw new Error('process.chdir is not supported');
      };
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/..\\..\\node_modules\\process\\browser.js", "/..\\..\\node_modules\\process");
  }, { "buffer": 2, "e/U+97": 4 }], 5: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _apiConnect = require('../components/apiConnect.js');

      var _eventHandler = require('./helpers/eventHandler');

      var _eventHandler2 = _interopRequireDefault(_eventHandler);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var Albums = function () {
        function Albums() {
          _classCallCheck(this, Albums);
        }

        _createClass(Albums, [{
          key: 'init',
          value: function init() {
            var dataMM = JSON.parse(localStorage.getItem('dataMM')) || new _apiConnect.ApiConnect().connectFMA();
            this.renderAlbums(dataMM);
          }
        }, {
          key: 'renderAlbums',
          value: function renderAlbums(dataMM) {
            var mainContent = document.querySelector(".mainContent");
            mainContent.innerHTML += '<div class="listMusic"></div>';
            var listMusic = document.querySelector(".listMusic");
            var artistsName = dataMM.aTracks.map(function (name, i) {
              if (name.album_title === null) {
                name.album_title = "No records";
              }

              listMusic.innerHTML += '\n            <div class="listMain">\n              <div class="demo-list-action mdl-list">\n                  <div class="mdl-list__item">\n                      <span class="mdl-list__item-primary-content">\n                          <div class="material-icons mdl-list__item-avatar">person</div>\n                          <span> ' + name.album_title + ' </span>\n                      </span>\n                      <div class="material-icons mainPlay" data-index="' + i + '">play_circle_filled</div>\n                      <a href="' + name.track_file_url + '"><div class="material-icons">file_download</div></a>\n                  </div>\n              </div>\n          </div>';
            });
            var btnArray = document.querySelectorAll('.mainPlay');
            btnArray.forEach(function (btn) {
              var data = dataMM;
              btn.addEventListener('click', function (event, data) {
                return (0, _eventHandler2.default)(dataMM, event);
              });
            });
          }
        }]);

        return Albums;
      }();

      exports.default = Albums;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\Albums.js", "/components");
  }, { "../components/apiConnect.js": 8, "./helpers/eventHandler": 9, "buffer": 2, "e/U+97": 4 }], 6: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _apiConnect = require('../components/apiConnect.js');

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var Favorites = function () {
        function Favorites() {
          _classCallCheck(this, Favorites);
        }

        _createClass(Favorites, [{
          key: 'init',
          value: function init() {
            var dataMM = JSON.parse(localStorage.getItem('favorites')) || new _apiConnect.ApiConnect().connectFMA();
            this.renderSongs(dataMM);
          }
        }, {
          key: 'renderSongs',
          value: function renderSongs(dataMM) {
            var artistsName = dataMM.aTracks.map(function (name) {
              var mainContent = document.querySelector(".mainContent");
              var card = document.querySelector(".artists_card");
            });
          }
        }]);

        return Favorites;
      }();

      exports.default = Favorites;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\Favorites.js", "/components");
  }, { "../components/apiConnect.js": 8, "buffer": 2, "e/U+97": 4 }], 7: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _apiConnect = require('../components/apiConnect.js');

      var _eventHandler = require('./helpers/eventHandler');

      var _eventHandler2 = _interopRequireDefault(_eventHandler);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var Songs = function () {
        function Songs() {
          _classCallCheck(this, Songs);
        }

        _createClass(Songs, [{
          key: 'init',
          value: function init() {
            var dataMM = JSON.parse(localStorage.getItem('dataMM')) || new _apiConnect.ApiConnect().connectFMA();
            this.renderSongs(dataMM);
          }
        }, {
          key: 'renderSongs',
          value: function renderSongs(dataMM) {
            var mainContent = document.querySelector(".mainContent");
            mainContent.innerHTML += '<div class="listMusic"></div>';
            var listMusic = document.querySelector(".listMusic");
            var artistsName = dataMM.aTracks.map(function (name, i) {
              listMusic.innerHTML += '\n            <div class="listMain">\n              <div class="demo-list-action mdl-list">\n                  <div class="mdl-list__item">\n                      <span class="mdl-list__item-primary-content">\n                          <div class="material-icons mdl-list__item-avatar">person</div>\n                          \n                          <span> ' + name.track_title + ' </span> <span> ' + name.track_duration + ' </span>\n                      </span>\n                      <div class="material-icons mainPlay" data-index="' + i + '">play_circle_filled</div>\n                      \n                      <a href="' + name.track_file_url + '"><div class="material-icons">file_download</div></a>\n                  </div>\n              </div>\n          </div>';
            });
            var btnArray = document.querySelectorAll('.mainPlay');
            btnArray.forEach(function (btn) {
              var data = dataMM;
              btn.addEventListener('click', function (event, data) {
                return (0, _eventHandler2.default)(dataMM, event);
              });
            });
          }
        }]);

        return Songs;
      }();

      exports.default = Songs;

      {/* <div class="material-icons star">star</div> */}
      {/* <span><div class="trackImage"><img alt="" src=${name.track_image_file} width="25" height="25"></div></span> */}
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\Songs.js", "/components");
  }, { "../components/apiConnect.js": 8, "./helpers/eventHandler": 9, "buffer": 2, "e/U+97": 4 }], 8: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.ApiConnect = undefined;

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      var _eventHandler = require("./helpers/eventHandler");

      var _eventHandler2 = _interopRequireDefault(_eventHandler);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var API_KEY_LASTFM = "52bc3b6e84807de0f34482110ffa0834";
      var API_KEY_FMA = "29UT3KA87Q3MV8Q1";
      function $$(str) {
        return document.querySelector(str);
      }

      var ApiConnect = function () {
        function ApiConnect() {
          _classCallCheck(this, ApiConnect);

          // this.trackUrls = [];
          this.dom = {
            player: $$(".player"),

            play: $$(".play"),
            pause: $$(".pause"),

            progress: {
              bar: $$(".progress"),
              loaded: $$(".progress_loaded"),
              current: $$(".progress_current")
            },
            duration: $$(".duration"),

            volume: {
              bar: $$(".volume"),
              value: $$(".volume__bar"),
              valueVolume: $$(".valueVolume")
            },

            radio: $$(".divRadio"),
            overlay: $$(".overlay")
          };
        }

        _createClass(ApiConnect, [{
          key: "init",
          value: function init() {
            var dataMM = JSON.parse(localStorage.getItem('dataMM')) || this.connectFMA();
            this.controls(dataMM);
          }
        }, {
          key: "connectFMA",
          value: function connectFMA() {
            // fetch(
            //   `https://freemusicarchive.org/api/get/curators.json?api_key=${API_KEY_FMA}`
            // )
            //   .then(response => response.json())
            //   .then(data => {
            //     let main = document.querySelector(".mainContent");

            //   });
            fetch("https://freemusicarchive.org/recent.json").then(function (response) {
              return response.json();
            }).then(function (dataMM) {

              // console.log(dataMM)
              // console.log(dataMM.aTracks[10].track_duration);
              localStorage.setItem('dataMM', JSON.stringify(dataMM));
              return dataMM;
            });
          }
        }, {
          key: "controls",
          value: function controls(dataMM) {
            var _this2 = this;

            console.log(dataMM.aTracks[16].track_listen_url);
            //let listenUrl = dataMM.aTracks[10].track_listen_url;
            var trackUrls = dataMM.aTracks.map(function (track) {
              return track.track_listen_url;
            });
            // trackUrls.unshift(dataMM.aTracks[10].track_listen_url);
            // console.log('this tral!!!', trackUrls);
            var mainContent = document.querySelector(".mainContent");
            mainContent.innerHTML += '<div class="listMusic"></div>';
            var artistsName = dataMM.aTracks.map(function (name, i) {

              var listMusic = document.querySelector(".listMusic");
              listMusic.innerHTML += "\n      <div class=\"listMain\">\n        <div class=\"demo-list-action mdl-list\">\n            <div class=\"mdl-list__item\">\n                <span class=\"mdl-list__item-primary-content\">\n                    <div class=\"material-icons mdl-list__item-avatar\">person</div>\n                    <span>" + name.artist_name + " </span><span class=\"mdl-list__item-secondary-content\"><span> " + name.track_duration + " </span></span>\n                </span>\n                <div class=\"material-icons mainPlay\" data-index=\"" + i + "\">play_circle_filled</div>\n            </div>\n        </div>\n    </div>";
            });

            var btnArray = document.querySelectorAll('.mainPlay');
            btnArray.forEach(function (btn) {
              var data = dataMM;
              btn.addEventListener('click', function (event, data) {
                return (0, _eventHandler2.default)(dataMM, event);
              });
            });

            var trackIndex = 0;

            var AudioPlayer = ya.music.Audio;

            var audioPlayer = new AudioPlayer(null, this.dom.overlay);

            var startPlay = function startPlay() {
              var track = trackUrls[trackIndex];
              if (audioPlayer.isPreloaded(track)) {
                audioPlayer.playPreloaded(track);
              } else {
                audioPlayer.play(track);
              }
            };

            audioPlayer.on(ya.music.Audio.EVENT_LOADED, function () {
              if (trackIndex + 1 < trackUrls.length) {
                audioPlayer.preload(trackUrls[trackIndex + 1]);
              }
            });

            this.dom.play.addEventListener("click", function () {
              var _this = this;

              console.log("tutPlay");

              var trackDuration = dataMM.aTracks[0].track_duration; //dataMM.aTracks[10].track_duration; // sec 3:30
              this.dom.duration.innerHTML = trackDuration;
              var maxDurationArr = trackDuration.split(":"); //[3,30]
              var maxDurationSec = maxDurationArr[0] * 60 + +maxDurationArr[1]; //перевод в секунды 210sec (number)
              var that = this;

              function printNumbersTimeout(maxDurationSec) {

                var i = 1;
                var timerId = setTimeout(function go() {
                  console.log(i);
                  if (i < maxDurationSec) setTimeout(go, 1004);
                  i++;

                  that.dom.progress.current.style.width = (i * 100 / maxDurationSec).toFixed() + "%"; //пропорция
                }, 1004);
              }

              // вызов
              printNumbersTimeout(maxDurationSec);
              //
              var state = audioPlayer.getState();
              audioPlayer.on(ya.music.Audio.EVENT_PROGRESS, function (timings) {
                console.log(timings);
                if (timings.loaded < 100) {
                  _this.dom.progress.loaded.style.width = timings.loaded + "%";
                } else {
                  _this.dom.progress.loaded.style.width = "100%";
                };
              });

              switch (state) {
                case ya.music.Audio.STATE_PLAYING:
                  audioPlayer.pause();
                  console.log("pause");
                  break;

                case ya.music.Audio.STATE_PAUSED:
                  audioPlayer.resume();
                  console.log("resume");
                  break;

                default:
                  startPlay();
                  break;
              }
            }.bind(this));

            audioPlayer.on(ya.music.Audio.EVENT_ENDED, function () {
              trackIndex++;

              if (trackIndex < trackUrls.length) {
                startPlay();
              }
            });

            this.dom.play.addEventListener("click", function () {
              if (_this2.dom.play.innerHTML === "play_circle_filled") {
                _this2.dom.play.innerHTML = "pause_circle_filled";
              } else if (_this2.dom.play.innerHTML === "pause_circle_filled") {
                _this2.dom.play.innerHTML = "play_circle_filled";
              }
            }); // состояние
            audioPlayer.on(ya.music.Audio.EVENT_STATE, function (state) {
              switch (state) {
                case ya.music.Audio.STATE_INIT:
                  console.log("Инициализация плеера");break;
                case ya.music.Audio.STATE_IDLE:
                  console.log("Плеер готов и ожидает");break;
                case ya.music.Audio.STATE_PLAYING:
                  console.log("Плеер проигрывает музыку");break;
                case ya.music.Audio.STATE_PAUSED:
                  console.log("Плеер поставлен на паузу");break;
                case ya.music.Audio.STATE_CRASHED:
                  console.log("Не удалось инициализировать плеер");break;
              }
            });
            // need some think about it:
            var offsetLeft = function offsetLeft(node) {
              var offset = node.offsetLeft;
              if (node.offsetParent) {
                offset += offsetLeft(node.offsetParent);
              }
              return offset;
            };

            var offsetTop = function offsetTop(node) {
              var offset = node.offsetTop;
              if (node.offsetParent) {
                offset += offsetTop(node.offsetParent);
              }
              return offset;
            };

            this.dom.volume.bar.addEventListener('change', function () {
              var volume = dom.volume.bar.value;

              _this2.dom.volume.valueVolume.innerHTML = volume;
              var volumeSet = volume / 100;
              audioPlayer.setVolume(volumeSet);
            });

            // this.dom.progress.bar.addEventListener("click", function (evt) {
            //   debugger;
            //   var fullWidth = this.dom.progress.bar.offsetWidth;
            //   var offset = offsetLeft(this.dom.progress.bar);

            //   var relativePosition = Math.max(
            //     0,
            //     Math.min(1, ((evt.pageX || evt.screenX) - offset) / fullWidth)
            //   );
            //   var duration = audioPlayer.getDuration(1);

            //   audioPlayer.setPosition(duration * relativePosition);
            // });
          }
        }]);

        return ApiConnect;
      }();

      exports.ApiConnect = ApiConnect;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\apiConnect.js", "/components");
  }, { "./helpers/eventHandler": 9, "buffer": 2, "e/U+97": 4 }], 9: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      exports.default = function (dataMM, ev) {
        console.log("tutPlay");
        console.log(' ', dataMM, ev);

        var indexMusic = ev.target.dataset.index; //индекс трека

        if (!indexMusic) {
          console.log(indexMusic);
          indexMusic = 0;
        };

        var trackDuration = dataMM.aTracks[indexMusic].track_duration; //dataMM.aTracks[10].track_duration; // sec 3:30
        dom.duration.innerHTML = trackDuration;
        var maxDurationArr = trackDuration.split(":"); //[3,30]
        var maxDurationSec = maxDurationArr[0] * 60 + +maxDurationArr[1]; //перевод в секунды 210sec (number)
        var that = this;

        function printNumbersTimeout(maxDurationSec) {

          var i = 1;
          var timerId = setTimeout(function go() {
            console.log(i);
            if (i < maxDurationSec) setTimeout(go, 1004);
            i++;

            dom.progress.current.style.width = (i * 100 / maxDurationSec).toFixed() + "%"; //пропорция
          }, 1004);
        };

        // вызов
        printNumbersTimeout(maxDurationSec);
        //
        var AudioPlayer = ya.music.Audio;
        var audioPlayer = new AudioPlayer(null, dom.overlay);
        var state = audioPlayer.getState();

        function startPlay() {
          var tracks = JSON.parse(localStorage.getItem('dataMM'));
          console.log(tracks);
          var track = tracks.aTracks[indexMusic].track_listen_url;
          if (audioPlayer.isPreloaded(track)) {
            audioPlayer.playPreloaded(track);
          } else {
            audioPlayer.play(track);
          }
        };

        audioPlayer.on(ya.music.Audio.EVENT_PROGRESS, function (timings) {
          console.log(timings);
          if (timings.loaded < 100) {
            dom.progress.loaded.style.width = timings.loaded + "%";
          } else {
            dom.progress.loaded.style.width = "100%";
          };
        });

        audioPlayer.on(ya.music.Audio.EVENT_STATE, function (state) {
          if (state === ya.music.Audio.STATE_PLAYING) {
            dom.play.innerHTML = "pause_circle_filled";
          } else {
            dom.play.innerHTML = "play_circle_filled";
          }
        });

        // if (ya.music.Audio.STATE_PLAYING) {
        //   console.log("stop");
        //   audioPlayer.stop();
        // }


        switch (state) {
          case ya.music.Audio.STATE_PLAYING:
            audioPlayer.pause();
            console.log("pause");
            break;

          case ya.music.Audio.STATE_PAUSED:
            audioPlayer.resume();
            console.log("resume");
            break;

          default:
            console.log("pause2");
            audioPlayer.pause();
            startPlay();
            break;
        };

        dom.volume.bar.addEventListener('change', function () {
          var volume = dom.volume.bar.value;

          dom.volume.valueVolume.innerHTML = volume;
          var volumeSet = volume / 100;
          audioPlayer.setVolume(volumeSet);
        });

        //debugger;
        if (ev.target.innerHTML !== 'pause_circle_filled') {
          ev.target.innerHTML = 'pause_circle_filled';
        } else {
          ev.target.innerHTML = 'play_circle_filled';
        }
      };

      function $$(str) {
        return document.querySelector(str);
      }
      var dom = {
        player: $$(".player"),

        play: $$(".play"),
        pause: $$(".pause"),

        mainPlay: $$(".mainPlay"),

        progress: {
          bar: $$(".progress"),
          loaded: $$(".progress_loaded"),
          current: $$(".progress_current")
        },
        duration: $$(".duration"),

        volume: {
          bar: $$(".volume"),
          value: $$(".volume__bar"),
          valueVolume: $$(".valueVolume")
        },

        radio: $$(".divRadio"),
        overlay: $$(".overlay")
      };
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\helpers\\eventHandler.js", "/components\\helpers");
  }, { "buffer": 2, "e/U+97": 4 }], 10: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var Themes = function () {
        function Themes() {
          _classCallCheck(this, Themes);

          var options = document.getElementsByName('options');
          var header = document.querySelector('.header');
          var middle = document.querySelector('.mainContent2');
          var footer = document.querySelector('.footercli');
          var radioClick = document.querySelector('.divRadio');
          this.radio = options;
          this.header = header;
          this.middle = middle;
          this.footer = footer;
          this.radioClick = radioClick;
        }

        _createClass(Themes, [{
          key: 'themeState',
          value: function themeState() {
            this.stateCheck();
            this.radioClick.addEventListener("click", function () {
              if (this.radio[0].type === "radio" && this.radio[0].checked) {
                this.header.style.removeProperty("background");
                this.middle.style.removeProperty("background");
                this.footer.style.removeProperty("background");
                localStorage.removeItem("objectTheme");
              };
              if (this.radio[1].type === "radio" && this.radio[1].checked) {
                var theme = "blackWhite";
                this.header.style.background = "black";
                this.middle.style.background = "white";
                this.footer.style.background = "black";
                this.save(theme);
              };
              if (this.radio[2].type === "radio" && this.radio[2].checked) {
                var _theme = "sand";
                this.header.style.background = "#DEB887";
                this.middle.style.background = "#FFE4C4";
                this.footer.style.removeProperty("background");
                this.save(_theme);
              };
            }.bind(this));
          }
        }, {
          key: 'stateCheck',
          value: function stateCheck() {
            var retObj = JSON.parse(localStorage.getItem("objectTheme"));
            if (retObj === "blackWhite") {
              this.radio[1].checked = true;
              this.header.style.background = "black";
              this.middle.style.background = "white";
              this.footer.style.background = "black";
            } else if (retObj === "sand") {
              this.radio[2].checked = true;
              this.header.style.background = "#DEB887";
              this.middle.style.background = "#FFE4C4";
              this.footer.style.removeProperty("background");
            }
          }
        }, {
          key: 'save',
          value: function save(theme) {
            var sObj = JSON.stringify(theme);
            localStorage.setItem("objectTheme", sObj);
          }
        }]);

        return Themes;
      }();

      var state = new Themes();
      state.themeState();

      exports.Themes = Themes;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/components\\themes.js", "/components");
  }, { "buffer": 2, "e/U+97": 4 }], 11: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      "use strict";

      var _Router = require("./utils/Router.js");

      var _Router2 = _interopRequireDefault(_Router);

      var _main = require("./routes/main.js");

      var _songs = require("./routes/songs.js");

      var _albums = require("./routes/albums.js");

      var _favorites = require("./routes/favorites.js");

      var _author = require("./routes/author.js");

      var _help = require("./routes/help.js");

      var _themes = require("./components/themes.js");

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var routes = [_author.author, _help.help, _main.main, _songs.songs, _albums.albums, _favorites.favorites];

      new _Router2.default({ routes: routes }).init();
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/fake_2f3e6e85.js", "/");
  }, { "./components/themes.js": 10, "./routes/albums.js": 12, "./routes/author.js": 13, "./routes/favorites.js": 14, "./routes/help.js": 15, "./routes/main.js": 16, "./routes/songs.js": 17, "./utils/Router.js": 18, "buffer": 2, "e/U+97": 4 }], 12: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.albums = undefined;

      var _Albums = require("../components/Albums");

      var _Albums2 = _interopRequireDefault(_Albums);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var mainContent = document.querySelector(".mainContent");
      var albumss = document.querySelector(".albums");

      var albums = {
        name: "albums",
        match: "albums",
        onBeforeEnter: function onBeforeEnter() {
          albumss.style.borderBottom = "solid yellow";
        },
        onEnter: function onEnter() {
          new _Albums2.default().init();
        },
        onLeave: function onLeave() {
          mainContent.innerHTML = '';
          albumss.style.borderBottom = '';
        }
      };

      exports.albums = albums;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/routes\\albums.js", "/routes");
  }, { "../components/Albums": 5, "buffer": 2, "e/U+97": 4 }], 13: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var mainContent = document.querySelector(".mainContent");

      var author = {
        name: "author",
        match: "author",
        onBeforeEnter: function onBeforeEnter() {},
        onEnter: function onEnter() {
          mainContent.innerHTML = "\n        <div class=\"authorIMG\">\n        <div class=\"demo-card-image mdl-card mdl-shadow--2dp\">\n            <div class=\"mdl-card__title mdl-card--expand\"></div>\n                <div class=\"mdl-card__actions\">\n                <span class=\"demo-card-image__filename\">Alex Malv</span>      \n            </div>\n        </div>\n        </div>\n        <div class =\"authorText\">\n        Music is an art form and cultural activity whose medium is sound organized in time. <br>\n        I hope this player will only help you to enjoy the art.\n        </div>\n      ";
        },
        onLeave: function onLeave() {
          mainContent.innerHTML = '';
        }
      };

      exports.author = author;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/routes\\author.js", "/routes");
  }, { "buffer": 2, "e/U+97": 4 }], 14: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.favorites = undefined;

      var _Favorites = require("../components/Favorites");

      var _Favorites2 = _interopRequireDefault(_Favorites);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var mainContent = document.querySelector(".mainContent");
      var songss = document.querySelector(".favorites");

      var favorites = {
        name: "favorites",
        match: "favorites",
        onBeforeEnter: function onBeforeEnter() {
          songss.style.borderBottom = "solid yellow";
        },
        onEnter: function onEnter() {
          new _Favorites2.default().init();
        },
        onLeave: function onLeave() {
          mainContent.innerHTML = '';
          songss.style.borderBottom = '';
        }
      };

      exports.favorites = favorites;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/routes\\favorites.js", "/routes");
  }, { "../components/Favorites": 6, "buffer": 2, "e/U+97": 4 }], 15: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      var mainContent = document.querySelector(".mainContent");

      var help = { //main help
        name: "help",
        match: "help",
        onBeforeEnter: function onBeforeEnter() {},
        onEnter: function onEnter() {
          mainContent.innerHTML = "\n        <div class=\"helpme\">\n        <div>\n        <h1>WHAT?!</h1>\n        <h2>This is a perfect design and user-friendly web-app!\n        </h2>\n        <h2>\n        <div>If you want, you also can report some bugs : <a href=\"https://github.com/OzzyMalv/music_player/issues\" target=\"_blank\"style=\"color: white\">GIT</a></div>\n        </h2>\n        </div>\n        </div>\n       \n      ";
        },
        onLeave: function onLeave() {
          mainContent.innerHTML = '';
        }
      };

      exports.help = help;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/routes\\help.js", "/routes");
  }, { "buffer": 2, "e/U+97": 4 }], 16: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.main = undefined;

      var _apiConnect = require("../components/apiConnect.js");

      var mainContent = document.querySelector(".mainContent");
      var maincho = document.querySelector(".main");

      var main = {
        name: "main",
        match: "",
        onBeforeEnter: function onBeforeEnter() {
          maincho.style.borderBottom = "solid yellow";
        },
        onEnter: function onEnter() {
          var connect = new _apiConnect.ApiConnect();
          connect.init();
        },
        onLeave: function onLeave() {
          mainContent.innerHTML = '';
          maincho.style.borderBottom = '';
        }
      };

      exports.main = main;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/routes\\main.js", "/routes");
  }, { "../components/apiConnect.js": 8, "buffer": 2, "e/U+97": 4 }], 17: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      "use strict";

      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      exports.songs = undefined;

      var _Songs = require("../components/Songs");

      var _Songs2 = _interopRequireDefault(_Songs);

      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }

      var mainContent = document.querySelector(".mainContent");
      var songss = document.querySelector(".songs");
      var songs = {
        name: "songs",
        match: "songs",
        onBeforeEnter: function onBeforeEnter() {
          songss.style.borderBottom = "solid yellow";
        },
        onEnter: function onEnter() {

          new _Songs2.default().init();
        },
        onLeave: function onLeave() {
          mainContent.innerHTML = '';
          songss.style.borderBottom = '';
        }
      };

      exports.songs = songs;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/routes\\songs.js", "/routes");
  }, { "../components/Songs": 7, "buffer": 2, "e/U+97": 4 }], 18: [function (require, module, exports) {
    (function (process, global, Buffer, __argument0, __argument1, __argument2, __argument3, __filename, __dirname) {
      'use strict';

      Object.defineProperty(exports, "__esModule", {
        value: true
      });

      var _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
          }
        }return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
        };
      }();

      function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      }

      var Router = function () {
        function Router(options, eventBus) {
          _classCallCheck(this, Router);

          this.routes = options.routes;
          this.eventBus = eventBus;
        }

        _createClass(Router, [{
          key: 'init',
          value: function init() {
            var _this = this;

            window.addEventListener('hashchange', function (event) {
              _this.handlerURl(event.oldURL.split('#')[1] || '', event.newURL.split('#')[1]);
            });
            this.handlerURl(undefined, window.location.hash.slice(1));
          }
        }, {
          key: 'handlerURl',
          value: function handlerURl(oldURL, newURL) {
            var _this2 = this;

            var currentRoute = this.routes.find(function (item) {
              if (typeof item.match === "string") {
                newURL = newURL.split("?")[0];
                return newURL === item.match;
              } else if (typeof item.match === "function") {
                return item.match(newURL);
              } else if (item.match instanceof RegExp) {
                return newURL.match(item.match);
              }
            });

            if (oldURL !== undefined) {
              var previousRoute = this.routes.find(function (item) {
                if (typeof item.match === "string") {
                  return oldURL === item.match;
                } else if (typeof item.match === "function") {
                  return item.match(oldURL);
                } else if (item.match instanceof RegExp) {
                  return oldURL.match(item.match);
                }
              });
            }

            Promise.resolve().then(function () {
              return previousRoute && previousRoute.onLeave && previousRoute.onLeave(oldURL.split("=")[1]);
            }).then(function () {
              return currentRoute && currentRoute.onBeforeEnter && currentRoute.onBeforeEnter();
            }).then(function () {
              return currentRoute && currentRoute.onEnter && currentRoute.onEnter(_this2.eventBus);
            });
          }
        }]);

        return Router;
      }();

      exports.default = Router;
    }).call(this, require("e/U+97"), typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {}, require("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/utils\\Router.js", "/utils");
  }, { "buffer": 2, "e/U+97": 4 }] }, {}, [11]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL096emlPcC9EZXNrdG9wL211c2ljX3BsYXllci9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiQzovVXNlcnMvT3p6aU9wL0Rlc2t0b3AvbXVzaWNfcGxheWVyL25vZGVfbW9kdWxlcy9iYXNlNjQtanMvbGliL2I2NC5qcyIsIkM6L1VzZXJzL096emlPcC9EZXNrdG9wL211c2ljX3BsYXllci9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwiQzovVXNlcnMvT3p6aU9wL0Rlc2t0b3AvbXVzaWNfcGxheWVyL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzIiwiQzovVXNlcnMvT3p6aU9wL0Rlc2t0b3AvbXVzaWNfcGxheWVyL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJDOi9Vc2Vycy9PenppT3AvRGVza3RvcC9tdXNpY19wbGF5ZXIvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9BbGJ1bXMuanMiLCJDOi9Vc2Vycy9PenppT3AvRGVza3RvcC9tdXNpY19wbGF5ZXIvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9GYXZvcml0ZXMuanMiLCJDOi9Vc2Vycy9PenppT3AvRGVza3RvcC9tdXNpY19wbGF5ZXIvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9Tb25ncy5qcyIsIkM6L1VzZXJzL096emlPcC9EZXNrdG9wL211c2ljX3BsYXllci9zcmMvc2NyaXB0cy9jb21wb25lbnRzL2FwaUNvbm5lY3QuanMiLCJDOi9Vc2Vycy9PenppT3AvRGVza3RvcC9tdXNpY19wbGF5ZXIvc3JjL3NjcmlwdHMvY29tcG9uZW50cy9oZWxwZXJzL2V2ZW50SGFuZGxlci5qcyIsIkM6L1VzZXJzL096emlPcC9EZXNrdG9wL211c2ljX3BsYXllci9zcmMvc2NyaXB0cy9jb21wb25lbnRzL3RoZW1lcy5qcyIsIkM6L1VzZXJzL096emlPcC9EZXNrdG9wL211c2ljX3BsYXllci9zcmMvc2NyaXB0cy9mYWtlXzJmM2U2ZTg1LmpzIiwiQzovVXNlcnMvT3p6aU9wL0Rlc2t0b3AvbXVzaWNfcGxheWVyL3NyYy9zY3JpcHRzL3JvdXRlcy9hbGJ1bXMuanMiLCJDOi9Vc2Vycy9PenppT3AvRGVza3RvcC9tdXNpY19wbGF5ZXIvc3JjL3NjcmlwdHMvcm91dGVzL2F1dGhvci5qcyIsIkM6L1VzZXJzL096emlPcC9EZXNrdG9wL211c2ljX3BsYXllci9zcmMvc2NyaXB0cy9yb3V0ZXMvZmF2b3JpdGVzLmpzIiwiQzovVXNlcnMvT3p6aU9wL0Rlc2t0b3AvbXVzaWNfcGxheWVyL3NyYy9zY3JpcHRzL3JvdXRlcy9oZWxwLmpzIiwiQzovVXNlcnMvT3p6aU9wL0Rlc2t0b3AvbXVzaWNfcGxheWVyL3NyYy9zY3JpcHRzL3JvdXRlcy9tYWluLmpzIiwiQzovVXNlcnMvT3p6aU9wL0Rlc2t0b3AvbXVzaWNfcGxheWVyL3NyYy9zY3JpcHRzL3JvdXRlcy9zb25ncy5qcyIsIkM6L1VzZXJzL096emlPcC9EZXNrdG9wL211c2ljX3BsYXllci9zcmMvc2NyaXB0cy91dGlscy9Sb3V0ZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7Ozs7Ozs7Ozs7O0FDQUE7QUFDQSxBQUNBOztBQUNBLG1CQUNBOztBQUNBLDJCQUNBO0FBQ0EsQUFDQTs7bUVBQ0EsQUFDQTs7a0NBQ0E7bUNBQ0E7b0NBQ0E7bUNBQ0E7bUNBQ0E7MkNBQ0E7NENBQ0EsQUFDQTs7NkJBQ0E7b0NBQ0E7a0VBQ0E7b0VBQ0E7d0NBQ0E7OERBQ0E7K0NBQ0E7dURBQ0E7QUFDQSxBQUNBOztxQ0FDQTswQ0FDQSxBQUNBOztrQ0FDQTs0QkFDQTtBQUNBLEFBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTt3QkFDQTs2RkFDQSxBQUNBOztBQUNBOzZDQUNBLEFBQ0E7O0FBQ0E7c0RBQ0EsQUFDQTs7a0JBQ0EsQUFDQTs7MkJBQ0E7dUJBQ0E7QUFDQSxBQUNBOztvREFDQTt5SUFDQTtxQ0FDQTttQ0FDQTt1QkFDQTtBQUNBLEFBQ0E7O2tDQUNBOzRFQUNBO3VCQUNBO3lDQUNBOzhHQUNBOzRCQUNBO3VCQUNBO0FBQ0EsQUFDQTs7aUJBQ0E7QUFDQSxBQUNBOztzQ0FDQTtjQUNBOzBDQUNBOztBQUNBO21CQUNBO2NBQ0E7Y0FDQSxBQUNBOzsrQkFDQTtpQ0FDQTtBQUNBLEFBQ0E7O3dDQUNBO2dIQUNBO0FBQ0EsQUFDQTs7QUFDQTs4RUFDQTtzRUFDQTtzQ0FDQTtBQUNBLEFBQ0E7O0FBQ0E7a0JBQ0E7aUJBQ0E7MENBQ0E7dUNBQ0E7MkNBQ0E7d0JBQ0E7QUFDQTtpQkFDQTsyRUFDQTt1Q0FDQTsyQ0FDQTsyQ0FDQTt3QkFDQTtBQUNBLEFBQ0EsQUFDQTs7O2lCQUNBO0FBQ0EsQUFDQTs7OEJBQ0E7Z0NBQ0E7b0VBQ0EsQUFDQTs7O0FDeEhBO0FBQ0EsQUFDQTs7QUFDQTs7OztBQUNBOztBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBOzs7Ozs7O0FBQ0E7QUFDQSw0QkFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFDQTs7QUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBOzs7OztBQUNBLDJDQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtZQUNBO29DQUNBO21DQUNBO2dDQUNBO21CQUNBO0FBQ0E7eUVBQ0E7b0JBQ0E7aUJBQ0E7QUFDQTtBQUNBOztBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBLEFBQ0EsQUFDQTs7Ozs7Ozs7Ozs7O0FBQ0EsaURBQ0E7NEVBQ0EsQUFDQTs7MEVBQ0EsQUFDQTs7QUFDQTtBQUNBO3dEQUNBOytCQUNBOzJDQUNBO2dDQUNBO0FBQ0E7QUFDQSxBQUNBOztBQUNBO1lBQ0E7K0xBQ0E7NkJBQ0EsQUFDQTs7WUFDQTtvQ0FDQTtBQUNBOytDQUNBO2VBQ0E7QUFDQTtnQkFDQTt1QkFDQTswQkFDQTtBQUNBLEFBQ0E7O1lBQ0E7OEVBQ0E7QUFDQTttQkFDQTt3Q0FDQTtBQUNBO3VDQUNBOzhGQUNBO0FBQ0E7c0NBQ0E7Z0NBQ0E7NEVBQ0E7dUNBQ0E7cUJBQ0E7QUFDQTtBQUNBLEFBQ0E7O2VBQ0E7QUFDQTs7QUFDQTtBQUNBLEFBQ0E7O0FBQ0EsOENBQ0E7aUNBQ0E7ZUFDQTtlQUNBO2VBQ0E7ZUFDQTtlQUNBO2VBQ0E7ZUFDQTtlQUNBO2VBQ0E7ZUFDQTtlQUNBO21CQUNBO0FBQ0E7bUJBQ0EsQUFDQTs7QUFDQTs7QUFDQSxxQ0FDQTtxREFDQTtBQUNBOztBQUNBLG1EQUNBO1lBQ0E7b0JBQ0E7NEJBQ0E7ZUFDQTsrQkFDQTtBQUNBO2VBQ0E7ZUFDQTttQ0FDQTtBQUNBO2VBQ0E7ZUFDQTtlQUNBO3NCQUNBO0FBQ0E7ZUFDQTtxQ0FDQTtBQUNBO2VBQ0E7ZUFDQTtlQUNBO2VBQ0E7K0JBQ0E7QUFDQTtBQUNBOzRCQUNBLEFBQ0E7O2VBQ0E7QUFDQTs7QUFDQSxtREFDQTs4RUFDQSxBQUNBOzsrQkFDQTs0QkFDQTtzQ0FDQTtzQkFDQTtBQUNBLEFBQ0E7O1lBQ0E7NkNBQ0E7d0JBQ0E7NENBQ0E7bUNBQ0E7QUFDQTtBQUNBLEFBQ0E7OzZCQUNBO2tCQUNBOzBDQUNBOzBCQUNBO3lCQUNBO3NCQUNBO0FBQ0E7ZUFDQTtBQUNBOztBQUNBO0FBQ0EsQUFDQTs7QUFDQSxzREFDQTttQ0FDQTtxQ0FDQTtxQkFDQTttQkFDQTtlQUNBOzBCQUNBO2tDQUNBO3FCQUNBO0FBQ0E7QUFDQSxBQUNBOztBQUNBOzRCQUNBO2lDQUNBLEFBQ0E7O2lDQUNBOzRCQUNBO0FBQ0E7eUNBQ0E7dURBQ0E7K0JBQ0E7NEJBQ0E7QUFDQTttQ0FDQTtlQUNBO0FBQ0E7O0FBQ0EsdURBQ0E7K0ZBQ0E7ZUFDQTtBQUNBOztBQUNBLHdEQUNBO2dHQUNBO2VBQ0E7QUFDQTs7QUFDQSx5REFDQTtnREFDQTtBQUNBOztBQUNBLHlEQUNBO2lHQUNBO2VBQ0E7QUFDQTs7QUFDQSwwREFDQTtrR0FDQTtlQUNBO0FBQ0E7O0FBQ0EsMkVBQ0E7QUFDQTtBQUNBOzhCQUNBO2lDQUNBO3VCQUNBO3FCQUNBO0FBQ0E7ZUFDQTtBQUNBO3FCQUNBO3FCQUNBO21CQUNBO21CQUNBO0FBQ0EsQUFDQTs7bUNBQ0E7c0NBQ0E7cUJBQ0E7bUJBQ0E7ZUFDQTswQkFDQTtrQ0FDQTtxQkFDQTtBQUNBO0FBQ0E7OENBQ0EsQUFDQTs7WUFDQTtnQkFDQTtlQUNBO2tEQUNBO0FBQ0E7ZUFDQTtlQUNBO21EQUNBO0FBQ0E7ZUFDQTtvREFDQTtBQUNBO2VBQ0E7cURBQ0E7QUFDQTtlQUNBO3FEQUNBO0FBQ0E7ZUFDQTtlQUNBO2VBQ0E7ZUFDQTtzREFDQTtBQUNBO0FBQ0E7NEJBQ0EsQUFDQTs7ZUFDQTtBQUNBOztBQUNBLGtFQUNBO21CQUNBLEFBQ0E7OzhDQUNBO2lDQUNBOzJEQUNBLEFBQ0E7O0FBQ0E7a0NBQ0EsQUFDQTs7WUFDQTtnQkFDQTtlQUNBO3lDQUNBO0FBQ0E7ZUFDQTtlQUNBOzBDQUNBO0FBQ0E7ZUFDQTsyQ0FDQTtBQUNBO2VBQ0E7NENBQ0E7QUFDQTtlQUNBOzRDQUNBO0FBQ0E7ZUFDQTtlQUNBO2VBQ0E7ZUFDQTs2Q0FDQTtBQUNBO0FBQ0E7NEJBQ0EsQUFDQTs7ZUFDQTtBQUNBOztBQUNBLDRDQUNBOztnQkFFQTs4REFDQSxBQUNBO0FBSEE7QUFJQTs7QUFDQTtBQUNBLDBFQUNBO3FCQUNBLEFBQ0E7OzRCQUNBOzBDQUNBOzBDQUNBLEFBQ0E7O0FBQ0E7MkJBQ0E7d0RBQ0EsQUFDQTs7QUFDQTs2QkFDQTtrRUFDQTtvREFDQTtpREFDQSxBQUNBOztBQUNBOzBDQUNBOzZGQUNBLEFBQ0E7O3dCQUNBLEFBQ0E7O2tEQUNBO3dDQUNBO2dEQUNBO0FBQ0E7ZUFDQTt5REFDQTtBQUNBO0FBQ0E7O0FBQ0EsNkNBQ0E7K0NBQ0E7c0NBQ0E7ZUFDQTt1REFDQTtBQUNBO0FBQ0E7O0FBQ0EsMkNBQ0E7a0JBQ0E7a0JBQ0E7bUNBQ0EsQUFDQTs7MENBQ0E7OEJBQ0E7aUVBQ0E7a0JBQ0E7aUJBQ0E7eUNBQ0E7QUFDQTtBQUNBLEFBQ0E7O29DQUNBO0FBQ0E7O0FBQ0EsNENBQ0E7a0JBQ0E7bUNBQ0EsQUFDQTs7MENBQ0E7eUNBQ0E7Z0JBQ0E7QUFDQTs7QUFDQSw2Q0FDQTt1Q0FDQTtBQUNBOztBQUNBLDBDQUNBO3NCQUNBLEFBQ0E7O3lDQUNBO2dEQUNBLEFBQ0E7O2tCQUNBOzBDQUNBOzJCQUNBO0FBQ0E7ZUFDQTtBQUNBOztBQUNBLDhDQUNBO3FDQUNBO2tCQUNBO2tEQUNBOytEQUNBO0FBQ0E7ZUFDQTtBQUNBOztBQUNBLHFEQUNBO3VCQUNBO2tDQUNBOzhCQUNBLEFBQ0E7O29DQUNBO3NEQUNBO2VBQ0E7K0JBQ0E7dURBQ0E7NkNBQ0E7aUNBQ0E7QUFDQTtpQkFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQSwrQ0FDQTtvQkFDQTs4QkFDQTtBQUNBOztBQUNBO0FBQ0Esa0RBQ0E7b0JBQ0E7a0NBQ0E7QUFDQTs7QUFDQSwrREFDQTt1QkFDQTswREFDQTt1Q0FDQTtBQUNBLEFBQ0E7O21DQUNBLEFBQ0E7O29CQUNBO0FBQ0E7O0FBQ0EsZ0VBQ0E7dUJBQ0E7b0RBQ0E7MERBQ0E7MENBQ0E7QUFDQSxBQUNBOztzQkFDQTsyQkFDQSxBQUNBOztZQUNBOzBCQUNBO29CQUNBOzBEQUNBO2VBQ0E7K0JBQ0E7b0RBQ0E7QUFDQTtlQUNBO0FBQ0E7O0FBQ0Esa0VBQ0E7K0NBQ0E7QUFDQTs7QUFDQSxrRUFDQTtnREFDQTtBQUNBOztBQUNBLGdFQUNBO3VCQUNBO29EQUNBOzBEQUNBOzBDQUNBO0FBQ0EsQUFDQTs7c0JBQ0E7MkJBQ0EsQUFDQTs7WUFDQTswQkFDQTt5REFDQTswREFDQTtxQkFDQTt1RUFDQTtlQUNBO3lEQUNBOzBEQUNBO29EQUNBOzZDQUNBO0FBQ0E7ZUFDQTtBQUNBOztBQUNBLGtFQUNBOytDQUNBO0FBQ0E7O0FBQ0Esa0VBQ0E7Z0RBQ0E7QUFDQTs7QUFDQSw4REFDQTt1QkFDQTswREFDQTt1Q0FDQTtBQUNBLEFBQ0E7O21DQUNBLEFBQ0E7O2lDQUNBO3dFQUNBO0FBQ0E7O0FBQ0EsK0RBQ0E7dUJBQ0E7b0RBQ0E7MERBQ0E7MENBQ0E7QUFDQSxBQUNBOztzQkFDQTsyQkFDQSxBQUNBOzt5REFDQTt3QkFDQTs0REFDQTtBQUNBOztBQUNBLGlFQUNBOzhDQUNBO0FBQ0E7O0FBQ0EsaUVBQ0E7K0NBQ0E7QUFDQTs7QUFDQSwrREFDQTt1QkFDQTtvREFDQTswREFDQTswQ0FDQTtBQUNBLEFBQ0E7O3NCQUNBOzJCQUNBLEFBQ0E7O3lEQUNBO3dCQUNBO2dFQUNBO0FBQ0E7O0FBQ0EsaUVBQ0E7OENBQ0E7QUFDQTs7QUFDQSxpRUFDQTsrQ0FDQTtBQUNBOztBQUNBLCtEQUNBO3VCQUNBO29EQUNBOzBDQUNBO0FBQ0EsQUFDQTs7MkRBQ0E7QUFDQTs7QUFDQSxpRUFDQTs4Q0FDQTtBQUNBOztBQUNBLGlFQUNBOytDQUNBO0FBQ0E7O0FBQ0EsZ0VBQ0E7dUJBQ0E7b0RBQ0E7MENBQ0E7QUFDQSxBQUNBOzsyREFDQTtBQUNBOztBQUNBLGtFQUNBOytDQUNBO0FBQ0E7O0FBQ0Esa0VBQ0E7Z0RBQ0E7QUFDQTs7QUFDQSx1RUFDQTt1QkFDQTt3REFDQTswREFDQTt1Q0FDQTsyQkFDQTtBQUNBLEFBQ0E7O21DQUNBLEFBQ0E7O3VCQUNBO0FBQ0E7O0FBQ0Esd0VBQ0E7dUJBQ0E7d0RBQ0E7b0RBQ0E7MERBQ0E7MENBQ0E7MkJBQ0E7QUFDQSxBQUNBOztzQkFDQTsyQkFDQSxBQUNBOzttRUFDQTs4R0FDQTtBQUNBO0FBQ0E7O0FBQ0EsMEVBQ0E7Z0RBQ0E7QUFDQTs7QUFDQSwwRUFDQTtpREFDQTtBQUNBOztBQUNBLHdFQUNBO3VCQUNBO3dEQUNBO29EQUNBOzBEQUNBOzBDQUNBOzJCQUNBO0FBQ0EsQUFDQTs7c0JBQ0E7MkJBQ0EsQUFDQTs7bUVBQ0E7dUVBQ0E7QUFDQTtBQUNBOztBQUNBLDBFQUNBO2dEQUNBO0FBQ0E7O0FBQ0EsMEVBQ0E7aURBQ0E7QUFDQTs7QUFDQSxzRUFDQTt1QkFDQTt3REFDQTswREFDQTt1Q0FDQTtrQ0FDQTtBQUNBLEFBQ0E7O21DQUNBLEFBQ0E7O2dIQUNBO0FBQ0E7O0FBQ0EsdUVBQ0E7dUJBQ0E7d0RBQ0E7b0RBQ0E7MERBQ0E7MENBQ0E7b0NBQ0E7QUFDQSxBQUNBOztzQkFDQTsyQkFDQSxBQUNBOztrSkFDQTtBQUNBOztBQUNBLHlFQUNBOytDQUNBO0FBQ0E7O0FBQ0EseUVBQ0E7Z0RBQ0E7QUFDQTs7QUFDQSx1RUFDQTt1QkFDQTt3REFDQTtvREFDQTswREFDQTswQ0FDQTt3Q0FDQTtBQUNBLEFBQ0E7O3NCQUNBOzJCQUNBLEFBQ0E7O3NKQUNBO0FBQ0E7O0FBQ0EseUVBQ0E7K0NBQ0E7QUFDQTs7QUFDQSx5RUFDQTtnREFDQTtBQUNBOztBQUNBLHVFQUNBO3VCQUNBO3dEQUNBO29EQUNBOzBEQUNBOzBDQUNBO3VEQUNBO0FBQ0EsQUFDQTs7c0JBQ0E7MkJBQ0EsQUFDQTs7NERBQ0E7QUFDQTs7QUFDQSx5RUFDQTsrQ0FDQTtBQUNBOztBQUNBLHlFQUNBO2dEQUNBO0FBQ0E7O0FBQ0Esd0VBQ0E7dUJBQ0E7d0RBQ0E7b0RBQ0E7MERBQ0E7MENBQ0E7d0RBQ0E7QUFDQSxBQUNBOztzQkFDQTsyQkFDQSxBQUNBOzs0REFDQTtBQUNBOztBQUNBLDBFQUNBO2dEQUNBO0FBQ0E7O0FBQ0EsMEVBQ0E7aURBQ0E7QUFDQTs7QUFDQTtBQUNBLDJEQUNBOzRCQUNBOzRCQUNBOzZCQUNBLEFBQ0E7O3VDQUNBO21DQUNBO0FBQ0EsQUFDQTs7MkRBQ0E7NkJBQ0EsQUFDQTs7QUFDQTsyQkFDQTsrQkFDQSxBQUNBOztrREFDQTsrQ0FDQSxBQUNBOzswQ0FDQTtvQkFDQTtBQUNBO0FBQ0E7O0FBQ0EsNkNBQ0E7a0JBQ0E7dUJBQ0E7c0NBQ0E7OEJBQ0E7K0NBQ0E7eUJBQ0E7QUFDQTtBQUNBO0FBQ0E7NENBQ0E7QUFDQTs7QUFDQSxBQUNBLEFBQ0EsQUFDQTs7OztBQUNBLG1EQUNBOytDQUNBO3NDQUNBO29DQUNBO2lCQUNBOzBDQUNBOytEQUNBOzRCQUNBO3dCQUNBO0FBQ0E7ZUFDQTswQkFDQTtBQUNBO0FBQ0E7O0FBQ0E7QUFDQSxBQUNBOztBQUNBLCtCQUNBO2lDQUNBO3lDQUNBO0FBQ0E7O0FBQ0Esc0JBQ0E7O0FBQ0EsQUFDQSxBQUNBOzs7QUFDQSx1Q0FDQTt3QkFDQSxBQUNBOztBQUNBO3VCQUNBO3VCQUNBLEFBQ0E7O0FBQ0E7cUJBQ0E7cUJBQ0EsQUFDQTs7dUJBQ0E7MEJBQ0E7Z0NBQ0E7d0JBQ0E7c0JBQ0E7dUJBQ0E7MkJBQ0E7OEJBQ0E7OEJBQ0E7OEJBQ0E7OEJBQ0E7MEJBQ0E7NkJBQ0E7NkJBQ0E7NkJBQ0E7NkJBQ0E7NkJBQ0E7NkJBQ0E7OEJBQ0E7OEJBQ0E7NEJBQ0E7K0JBQ0E7K0JBQ0E7K0JBQ0E7K0JBQ0E7MkJBQ0E7OEJBQ0E7OEJBQ0E7OEJBQ0E7OEJBQ0E7OEJBQ0E7OEJBQ0E7K0JBQ0E7K0JBQ0E7c0JBQ0E7eUJBQ0E7K0JBQ0EsQUFDQTs7ZUFDQTtBQUNBOztBQUNBO0FBQ0E7OENBRUE7d0JBREEsQ0FFQTtpQ0FDQTsrQkFDQTtpQkFDQTsrQkFDQTtlQUNBO0FBQ0E7O0FBQ0EsOEJBQ0E7QUFDQTtBQUNBO0FBQ0E7OEJBQ0E7Z0NBQ0E7QUFDQTs7QUFDQSxnQ0FDQTtvREFDQTs2REFDQTtXQUNBO0FBQ0E7O0FBQ0EsbUNBQ0E7c0xBQ0E7QUFDQTs7QUFDQSx3QkFDQTs0Q0FDQTswQkFDQTtBQUNBOztBQUNBLGdDQUNBO3dCQUNBOzZDQUNBO2lDQUNBO2dFQUNBO3dCQUNBOzRDQUNBO2dGQUNBOytDQUNBOzRDQUNBO0FBQ0E7QUFDQTtBQUNBO2VBQ0E7QUFDQTs7QUFDQSxpQ0FDQTt3QkFDQTs2Q0FDQTtBQUNBOzZDQUNBO0FBQ0E7ZUFDQTtBQUNBOztBQUNBLG1DQUNBO21CQUNBO3dCQUNBOzZDQUNBOzZCQUNBO29CQUNBO21CQUNBO3lCQUNBO3lCQUNBO0FBQ0EsQUFDQTs7ZUFDQTtBQUNBOztBQUNBLGtDQUNBO2tDQUNBO0FBQ0E7O0FBQ0Esb0RBQ0E7WUFDQTt5Q0FDQTsyREFDQTtnQ0FDQTtBQUNBO2VBQ0E7QUFDQTs7QUFDQSxtQ0FDQTtZQUNBO29DQUNBO3NCQUNBOzhDQUNBO0FBQ0E7QUFDQTs7QUFDQSxBQUNBLEFBQ0EsQUFDQSxBQUNBOzs7OztBQUNBLHFDQUNBOzBDQUNBOzJCQUNBOzZCQUNBOzRDQUNBO0FBQ0E7O0FBQ0EsMENBQ0E7MENBQ0E7NkJBQ0E7NkJBQ0E7NENBQ0E7QUFDQTs7QUFDQSw2Q0FDQTswQ0FDQTs2QkFDQTs2QkFDQTtBQUNBOztBQUNBLHFDQUNBOzhDQUNBO0FBQ0EsQUFDQTs7O0FDemhDQTtBQUNBLEFBQ0E7O0FBQ0EsbUVBQ0E7ZUFDQTt1Q0FDQTtpQ0FDQTs0QkFDQTtxQkFDQTtvQ0FDQTs0QkFDQTtnQ0FDQSxBQUNBOzthQUNBLEFBQ0E7O2dDQUNBO2VBQ0E7aUJBQ0E7aUZBQ0EsQUFDQTs7Z0NBQ0E7ZUFDQTtpQkFDQTtpRkFDQSxBQUNBOztxQkFDQTtrQkFDQTsrQkFDQTswQ0FDQTtlQUNBOzhCQUNBO2tCQUNBO0FBQ0E7a0RBQ0E7QUFDQTs7QUFDQSwyRUFDQTtrQkFDQTt1Q0FDQTtpQ0FDQTs0QkFDQTtxRUFDQTtvQ0FDQTs0QkFDQTtnRUFDQSxBQUNBOzt5QkFDQSxBQUNBOztnREFDQTtpQ0FDQTtjQUNBO2VBQ0E7Z0RBQ0E7aURBQ0E7QUFDQTtpQkFDQTtBQUNBOzhCQUNBOzBCQUNBO2lCQUNBOzBDQUNBO0FBQ0E7OEJBQ0E7QUFDQTtpQkFDQTtBQUNBLEFBQ0E7O2lDQUNBO2dCQUNBO2dCQUNBO3FDQUNBOzhDQUNBO29CQUNBO2lCQUNBOzZEQUNBO2dCQUNBO0FBQ0E7QUFDQSxBQUNBOzt1RkFDQSxBQUNBOzt3QkFDQTtnQkFDQTtzRkFDQSxBQUNBOztzQ0FDQTtBQUNBLEFBQ0E7OztBQ3hGQTtBQUNBLEFBQ0E7O0FBQ0EsQUFDQTs7QUFDQSxxQ0FDQTs7QUFDQSxxQ0FDQTtzRUFDQTtvRkFDQSxBQUNBOzs2QkFDQTs4QkFDQTt1Q0FDQTtBQUNBO0FBQ0EsQUFDQTs7cUJBQ0E7c0JBQ0E7MkRBQ0E7NEJBQ0E7c0ZBQ0E7aUJBQ0E7b0NBQ0E7K0JBQ0E7QUFDQTtBQUNBO0FBQ0E7YUFDQSxBQUNBOzt1Q0FDQTt1QkFDQTsrQ0FDQTtBQUNBO0FBQ0EsQUFDQTs7cUNBQ0E7eUJBQ0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUNBOztBQUNBLHVCQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUNBOztBQUNBLHdDQUNBO3dCQUNBO0FBQ0E7O0FBQ0E7QUFDQSxnQ0FDQTtlQUNBOztBQUNBLHFDQUNBO3dCQUNBO0FBQ0EsQUFDQTs7O0FDcEVBO0FBQ0EsQUFDQTs7QUFDQTtlQUVBLEFBQ0E7QUFGQTs7QUFHQTs7Ozs7Ozs7QUFDQTs7QUFDQSxnQ0FDQTs7QUFDQSxrQ0FDQTs7QUFDQSxrREFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBLCtCQUNBOzBCQUNBO2dDQUNBO0FBQ0EsQUFDQTs7O2VBRUE7aUNBQ0E7b0dBQ0E7OEJBQ0E7QUFDQTtBQUxBO2VBT0E7K0NBQ0E7cURBQ0E7cUNBQ0E7bURBQ0E7b0VBQ0E7NkNBQ0E7bUNBQ0E7QUFDQSxBQUNBOzt5bEJBQ0E7QUFDQTtxREFDQTs0Q0FDQTt5QkFDQTttRUFDQTsyREFDQTtBQUNBO0FBQ0E7QUFDQSxBQUNBLEFBQ0E7QUF0QkE7O2VBdUJBO0FBQ0E7O0FBQ0Esd0JBQ0EsQUFDQTs7O0FDMURBO0FBQ0EsQUFDQTs7QUFDQTtlQUVBLEFBQ0E7QUFGQTs7QUFHQTs7Ozs7Ozs7QUFDQTs7QUFDQSxnQ0FDQTs7QUFDQTs7OztBQUNBOztBQUNBLGtDQUNBOzZCQUNBO2dDQUNBO0FBQ0EsQUFDQTs7O2VBRUE7aUNBQ0E7dUdBQ0E7NkJBQ0E7QUFDQTtBQUxBO2VBT0E7OENBQ0E7aUVBQ0E7dURBQ0E7Z0RBQ0E7QUFDQTtBQUNBLEFBQ0EsQUFDQTtBQVRBOztlQVVBO0FBQ0E7O0FBQ0Esd0JBQ0EsQUFDQTs7O0FDdkNBO0FBQ0EsQUFDQTs7QUFDQTtlQUVBLEFBQ0E7QUFGQTs7QUFHQTs7Ozs7Ozs7QUFDQTs7QUFDQSxnQ0FDQTs7QUFDQSxrQ0FDQTs7QUFDQSxrREFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBLDhCQUNBO3lCQUNBO2dDQUNBO0FBQ0EsQUFDQTs7O2VBRUE7aUNBQ0E7b0dBQ0E7NkJBQ0E7QUFDQTtBQUxBO2VBT0E7OENBQ0E7cURBQ0E7cUNBQ0E7bURBQ0E7b0VBQ0E7d3JCQUNBO0FBQ0E7cURBQ0E7NENBQ0E7eUJBQ0E7bUVBQ0E7MkRBQ0E7QUFDQTtBQUNBO0FBQ0EsQUFDQSxBQUNBO0FBbEJBOztlQW1CQTtBQUNBOztBQUNBLHdCQUNBLEFBQ0E7O0FBQ0E7QUFDQSx3SEFDQSxBQUNBOzs7QUMxREE7QUFDQSxBQUNBOztBQUNBO2VBRUE7QUFEQTtBQUVBLDJCQUNBOztBQUNBOzs7Ozs7OztBQUNBOztBQUNBLGtDQUNBOztBQUNBLGtEQUNBOztBQUNBOztBQUNBOztBQUNBOzs7O0FBQ0E7O0FBQ0E7QUFDQTtBQUNBLHVCQUNBO3NDQUNBO0FBQ0E7O0FBQ0EsbUNBQ0E7OEJBQ0E7Z0NBQ0EsQUFDQTs7QUFDQTs7dUJBRUEsQUFDQTs7cUJBQ0E7c0JBQ0EsQUFDQTs7O3NCQUVBO3lCQUNBOzBCQUNBLEFBQ0E7QUFKQTt5QkFLQSxBQUNBOzs7c0JBRUE7d0JBQ0E7OEJBQ0EsQUFDQSxBQUNBO0FBTEE7O3NCQU1BO3dCQUNBLEFBQ0E7QUFyQkE7QUFzQkEsQUFDQTs7O2VBRUE7aUNBQ0E7NEVBQ0E7MEJBQ0E7QUFDQTtBQUxBO2VBT0E7dUNBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQUFDQTs7QUFDQTt1RkFDQTs4QkFDQTtzQ0FDQSxBQUNBOztBQUNBO0FBQ0E7NERBQ0E7cUJBQ0E7QUFDQTtBQUNBO0FBcEJBO2VBc0JBOzt5QkFFQSxBQUNBOzsyQ0FDQTtBQUNBO2dFQUNBOzJCQUNBO0FBQ0E7QUFDQTtBQUNBO3FEQUNBO3FDQUNBO29FQUNBLEFBQ0E7O3FEQUNBO2lrQkFDQTtBQUNBLEFBQ0E7O3FEQUNBOzRDQUNBO3lCQUNBO21FQUNBOzJEQUNBO0FBQ0E7QUFDQSxBQUNBOzs2QkFDQSxBQUNBOzt1Q0FDQSxBQUNBOzs2REFDQSxBQUNBOztpREFDQTtvQ0FDQTtrREFDQTswQ0FDQTtxQkFDQTtpQ0FDQTtBQUNBO0FBQ0EsQUFDQTs7b0VBQ0E7cURBQ0E7MkRBQ0E7QUFDQTtBQUNBLEFBQ0E7OzswQkFFQSxBQUNBOzswQkFDQSxBQUNBOztvRUFDQTs0Q0FDQTs0REFOQSxDQU9BO2dGQUNBO3lCQUNBLEFBQ0E7OzJEQUNBLEFBQ0E7O3dCQUNBO3VEQUNBOzhCQUNBO3lEQUNBO0FBQ0EsQUFDQTs7c0dBQ0E7bUJBQ0E7QUFDQSxBQUNBOztBQUNBO2tDQUNBO0FBQ0E7c0NBQ0E7K0VBQ0E7NEJBQ0E7MENBQ0E7MkVBQ0E7dUJBQ0E7MERBQ0E7QUFDQTtBQUNBLEFBQ0E7O3NCQUNBO29DQUNBOzhCQUNBOzhCQUNBO0FBQ0EsQUFDQTs7b0NBQ0E7OEJBQ0E7OEJBQ0E7QUFDQSxBQUNBOztBQUNBO0FBQ0E7QUFDQSxBQUNBOzttQkFDQSxBQUNBOzttRUFDQTtBQUNBLEFBQ0E7O2lEQUNBO0FBQ0E7QUFDQTtBQUNBLEFBQ0E7O2dFQUNBO3NFQUNBOzRDQUNBOzhFQUNBOzRDQUNBO0FBQ0E7ZUFqSEEsQ0FrSEE7d0VBQ0E7c0JBQ0E7b0NBQ0E7c0RBQ0E7b0NBQ0E7dURBQ0E7b0NBQ0E7MERBQ0E7b0NBQ0E7MERBQ0E7b0NBQ0E7bUVBQ0EsQUFDQTs7QUFDQTtBQUNBO3VEQUNBO2dDQUNBO3FDQUNBOzBDQUNBO0FBQ0E7cUJBQ0E7QUFDQSxBQUNBOztxREFDQTtnQ0FDQTtxQ0FDQTt5Q0FDQTtBQUNBO3FCQUNBO0FBQ0EsQUFDQTs7dUVBQ0E7MENBQ0EsQUFDQTs7d0RBQ0E7dUNBQ0E7b0NBQ0E7QUFDQSxBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBLEFBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxBQUNBOztBQUNBO0FBQ0EsQUFDQTtBQUNBLEFBQ0EsQUFDQTtBQTVLQTs7ZUE2S0E7QUFDQTs7QUFDQSwyQkFDQSxBQUNBOzs7QUNsUUE7QUFDQSxBQUNBOztBQUNBO2VBRUEsQUFDQTtBQUZBOztBQUdBLDhDQUNBO29CQUNBO2lDQUNBLEFBQ0E7O2tEQUNBLEFBQ0E7O3lCQUNBO3NCQUNBO3VCQUNBO0FBQ0EsQUFDQTs7dUVBQ0E7aUNBQ0E7dURBQ0E7MEVBQ0E7bUJBQ0EsQUFDQTs7cURBQ0EsQUFDQTs7a0JBQ0E7aURBQ0E7d0JBQ0E7bURBQ0E7QUFDQSxBQUNBOzsyRkFDQTthQUNBO0FBQ0EsQUFDQTs7QUFDQTs0QkFDQTtBQUNBO21DQUNBO29EQUNBO2dDQUNBLEFBQ0E7OzZCQUNBO3VEQUNBO3NCQUNBO2lEQUNBOzhDQUNBO3NDQUNBO2lCQUNBOzZCQUNBO0FBQ0E7QUFDQSxBQUNBOzt5RUFDQTtzQkFDQTtvQ0FDQTsrREFDQTtpQkFDQTs4Q0FDQTtBQUNBO0FBQ0EsQUFDQTs7b0VBQ0E7c0RBQ0E7aUNBQ0E7aUJBQ0E7aUNBQ0E7QUFDQTtBQUNBLEFBQ0E7O0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQUFDQSxBQUNBOzs7Z0JBQ0E7OEJBQ0E7d0JBQ0E7d0JBQ0E7QUFDQSxBQUNBOzs4QkFDQTt3QkFDQTt3QkFDQTtBQUNBLEFBQ0E7O0FBQ0E7d0JBQ0E7d0JBQ0E7QUFDQTtBQUNBO1NBQ0EsQUFDQTs7OERBQ0E7c0NBQ0EsQUFDQTs7NkNBQ0E7bUNBQ0E7Z0NBQ0E7QUFDQSxBQUNBOztBQUNBOzJEQUNBO2dDQUNBO2VBQ0E7Z0NBQ0E7QUFDQTtBQUNBOztBQUNBLHVCQUNBO3NDQUNBOztBQUNBO21CQUVBLEFBQ0E7O2lCQUNBO2tCQUNBLEFBQ0E7O3FCQUNBLEFBQ0E7OztrQkFFQTtxQkFDQTtzQkFDQSxBQUNBO0FBSkE7cUJBS0EsQUFDQTs7O2tCQUVBO29CQUNBOzBCQUNBLEFBQ0EsQUFDQTtBQUxBOztrQkFNQTtvQkFDQSxBQUNBLEFBQ0E7QUF4QkE7OztBQ25IQTtBQUNBLEFBQ0E7O0FBQ0E7ZUFFQSxBQUNBO0FBRkE7O0FBR0E7Ozs7Ozs7O0FBQ0E7O0FBQ0E7Ozs7QUFDQTs7QUFDQSwrQkFDQTswQkFDQTtnQ0FDQSxBQUNBOzttREFDQTs4Q0FDQTs4Q0FDQTs4Q0FDQTtrREFDQTt1QkFDQTt3QkFDQTt3QkFDQTt3QkFDQTs0QkFDQTtBQUNBLEFBQ0E7OztlQUVBO3VDQUNBO2lCQUNBO2tFQUNBOzJFQUNBO2lEQUNBO2lEQUNBO2lEQUNBO3dDQUNBO0FBQ0E7MkVBQ0E7NEJBQ0E7K0NBQ0E7K0NBQ0E7K0NBQ0E7MEJBQ0E7QUFDQTsyRUFDQTs2QkFDQTsrQ0FDQTsrQ0FDQTtpREFDQTswQkFDQTtBQUNBO21CQUNBO0FBQ0E7QUExQkE7ZUE0QkE7dUNBQ0E7eURBQ0E7eUNBQ0E7c0NBQ0E7NkNBQ0E7NkNBQ0E7NkNBQ0E7MENBQ0E7c0NBQ0E7NkNBQ0E7NkNBQ0E7K0NBQ0E7QUFDQTtBQUNBO0FBZkE7ZUFpQkE7c0NBQ0E7c0NBQ0E7Z0RBQ0E7QUFDQSxBQUNBLEFBQ0E7QUFQQTs7ZUFRQTtBQUNBOztBQUNBO0FBQ0EsWUFDQTs7QUFDQSx1QkFDQSxBQUNBOzs7QUN0RkE7QUFDQSxBQUNBOztBQUNBLDRCQUNBOztBQUNBLDRDQUNBOztBQUNBLDBCQUNBOztBQUNBLDJCQUNBOztBQUNBLDRCQUNBOztBQUNBLCtCQUNBOztBQUNBLDRCQUNBOztBQUNBLDBCQUNBOztBQUNBLDRCQUNBOztBQUNBOztBQUNBOztBQUNBLHFHQUNBOztBQUNBLCtDQUNBLEFBQ0E7OztBQzNCQTtBQUNBLEFBQ0E7O0FBQ0E7ZUFFQTtBQURBO0FBRUEsdUJBQ0E7O0FBQ0EsNEJBQ0E7O0FBQ0EsNENBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7QUFDQSwyQ0FDQTs7QUFDQTtjQUVBO2VBQ0E7Z0RBQ0E7dUNBQ0E7QUFDQTtvQ0FDQTtpQ0FDQTtBQUNBO29DQUNBO2tDQUNBO3VDQUNBO0FBQ0EsQUFDQTtBQWJBOztBQWNBLHVCQUNBLEFBQ0E7OztBQ2xDQTtBQUNBLEFBQ0E7O0FBQ0E7ZUFFQTtBQURBO0FBRUEsK0NBQ0E7O0FBQ0E7Y0FFQTtlQUNBO2lEQUNBO29DQUNBO2tDQUNBO0FBQ0E7b0NBQ0E7a0NBQ0E7QUFDQSxBQUNBO0FBVkE7O0FBV0EsdUJBQ0EsQUFDQTs7O0FDdEJBO0FBQ0EsQUFDQTs7QUFDQTtlQUVBO0FBREE7QUFFQSwwQkFDQTs7QUFDQSwrQkFDQTs7QUFDQSwrQ0FDQTs7QUFDQTs7QUFDQTs7QUFDQTtBQUNBLDBDQUNBOztBQUNBO2NBRUE7ZUFDQTtnREFDQTtzQ0FDQTtBQUNBO29DQUNBO29DQUNBO0FBQ0E7b0NBQ0E7a0NBQ0E7c0NBQ0E7QUFDQSxBQUNBO0FBYkE7O0FBY0EsMEJBQ0EsQUFDQTs7O0FDbENBO0FBQ0EsQUFDQTs7QUFDQTtlQUVBO0FBREE7QUFFQSwrQ0FDQTs7QUFDQSxtQkFDQTtjQUNBO2VBQ0E7aURBQ0E7b0NBQ0E7a0NBQ0E7QUFDQTtvQ0FDQTtrQ0FDQTtBQUNBLEFBQ0E7OztBQUNBLHFCQUNBLEFBQ0E7OztBQ3RCQTtBQUNBLEFBQ0E7O0FBQ0E7ZUFFQTtBQURBO0FBRUEscUJBQ0E7O0FBQ0EsZ0NBQ0E7O0FBQ0E7QUFDQSwyQ0FDQTs7QUFDQTtjQUVBO2VBQ0E7Z0RBQ0E7dUNBQ0E7QUFDQTtvQ0FDQTt3Q0FDQTtrQkFDQTtBQUNBO29DQUNBO2tDQUNBO3VDQUNBO0FBQ0EsQUFDQTtBQWRBOztBQWVBLHFCQUNBLEFBQ0E7OztBQy9CQTtBQUNBLEFBQ0E7O0FBQ0E7ZUFFQTtBQURBO0FBRUEsc0JBQ0E7O0FBQ0EsMkJBQ0E7O0FBQ0EsMkNBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7QUFDQTtBQUNBO2NBRUE7ZUFDQTtnREFDQTtzQ0FDQTtBQUNBO29DQUNBLEFBQ0E7O2dDQUNBO0FBQ0E7b0NBQ0E7a0NBQ0E7c0NBQ0E7QUFDQSxBQUNBO0FBZEE7O0FBZUEsc0JBQ0EsQUFDQTs7O0FDbENBO0FBQ0EsQUFDQTs7QUFDQTtlQUVBLEFBQ0E7QUFGQTs7QUFHQTs7Ozs7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOztBQUNBLCtCQUNBOzJDQUNBO2dDQUNBLEFBQ0E7O2dDQUNBOzBCQUNBO0FBQ0EsQUFDQTs7O2VBRUE7aUNBQ0E7d0JBQ0EsQUFDQTs7bUVBQ0E7eUZBQ0E7QUFDQTtrRUFDQTtBQUNBO0FBVEE7ZUFXQTtxREFDQTt5QkFDQSxBQUNBOztnRUFDQTtrREFDQTsyQ0FDQTt1Q0FDQTsyREFDQTtrQ0FDQTt1REFDQTt5Q0FDQTtBQUNBO0FBQ0EsQUFDQTs7c0NBQ0E7bUVBQ0E7b0RBQ0E7eUNBQ0E7NkRBQ0E7b0NBQ0E7eURBQ0E7MkNBQ0E7QUFDQTtBQUNBO0FBQ0EsQUFDQTs7K0NBQ0E7dUdBQ0E7Z0NBQ0E7Z0ZBQ0E7Z0NBQ0E7eUZBQ0E7QUFDQTtBQUNBLEFBQ0EsQUFDQTtBQXJDQTs7ZUFzQ0E7QUFDQTs7QUFDQSx3QkFDQSxBQUNBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgbG9va3VwID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nO1xuXG47KGZ1bmN0aW9uIChleHBvcnRzKSB7XG5cdCd1c2Ugc3RyaWN0JztcblxuXHR2YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5O1xuXG5cdHZhciBQTFVTID0gJysnLmNoYXJDb2RlQXQoMCk7XG5cdHZhciBTTEFTSCA9ICcvJy5jaGFyQ29kZUF0KDApO1xuXHR2YXIgTlVNQkVSID0gJzAnLmNoYXJDb2RlQXQoMCk7XG5cdHZhciBMT1dFUiA9ICdhJy5jaGFyQ29kZUF0KDApO1xuXHR2YXIgVVBQRVIgPSAnQScuY2hhckNvZGVBdCgwKTtcblx0dmFyIFBMVVNfVVJMX1NBRkUgPSAnLScuY2hhckNvZGVBdCgwKTtcblx0dmFyIFNMQVNIX1VSTF9TQUZFID0gJ18nLmNoYXJDb2RlQXQoMCk7XG5cblx0ZnVuY3Rpb24gZGVjb2RlKGVsdCkge1xuXHRcdHZhciBjb2RlID0gZWx0LmNoYXJDb2RlQXQoMCk7XG5cdFx0aWYgKGNvZGUgPT09IFBMVVMgfHwgY29kZSA9PT0gUExVU19VUkxfU0FGRSkgcmV0dXJuIDYyOyAvLyAnKydcblx0XHRpZiAoY29kZSA9PT0gU0xBU0ggfHwgY29kZSA9PT0gU0xBU0hfVVJMX1NBRkUpIHJldHVybiA2MzsgLy8gJy8nXG5cdFx0aWYgKGNvZGUgPCBOVU1CRVIpIHJldHVybiAtMTsgLy9ubyBtYXRjaFxuXHRcdGlmIChjb2RlIDwgTlVNQkVSICsgMTApIHJldHVybiBjb2RlIC0gTlVNQkVSICsgMjYgKyAyNjtcblx0XHRpZiAoY29kZSA8IFVQUEVSICsgMjYpIHJldHVybiBjb2RlIC0gVVBQRVI7XG5cdFx0aWYgKGNvZGUgPCBMT1dFUiArIDI2KSByZXR1cm4gY29kZSAtIExPV0VSICsgMjY7XG5cdH1cblxuXHRmdW5jdGlvbiBiNjRUb0J5dGVBcnJheShiNjQpIHtcblx0XHR2YXIgaSwgaiwgbCwgdG1wLCBwbGFjZUhvbGRlcnMsIGFycjtcblxuXHRcdGlmIChiNjQubGVuZ3RoICUgNCA+IDApIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpO1xuXHRcdH1cblxuXHRcdC8vIHRoZSBudW1iZXIgb2YgZXF1YWwgc2lnbnMgKHBsYWNlIGhvbGRlcnMpXG5cdFx0Ly8gaWYgdGhlcmUgYXJlIHR3byBwbGFjZWhvbGRlcnMsIHRoYW4gdGhlIHR3byBjaGFyYWN0ZXJzIGJlZm9yZSBpdFxuXHRcdC8vIHJlcHJlc2VudCBvbmUgYnl0ZVxuXHRcdC8vIGlmIHRoZXJlIGlzIG9ubHkgb25lLCB0aGVuIHRoZSB0aHJlZSBjaGFyYWN0ZXJzIGJlZm9yZSBpdCByZXByZXNlbnQgMiBieXRlc1xuXHRcdC8vIHRoaXMgaXMganVzdCBhIGNoZWFwIGhhY2sgdG8gbm90IGRvIGluZGV4T2YgdHdpY2Vcblx0XHR2YXIgbGVuID0gYjY0Lmxlbmd0aDtcblx0XHRwbGFjZUhvbGRlcnMgPSAnPScgPT09IGI2NC5jaGFyQXQobGVuIC0gMikgPyAyIDogJz0nID09PSBiNjQuY2hhckF0KGxlbiAtIDEpID8gMSA6IDA7XG5cblx0XHQvLyBiYXNlNjQgaXMgNC8zICsgdXAgdG8gdHdvIGNoYXJhY3RlcnMgb2YgdGhlIG9yaWdpbmFsIGRhdGFcblx0XHRhcnIgPSBuZXcgQXJyKGI2NC5sZW5ndGggKiAzIC8gNCAtIHBsYWNlSG9sZGVycyk7XG5cblx0XHQvLyBpZiB0aGVyZSBhcmUgcGxhY2Vob2xkZXJzLCBvbmx5IGdldCB1cCB0byB0aGUgbGFzdCBjb21wbGV0ZSA0IGNoYXJzXG5cdFx0bCA9IHBsYWNlSG9sZGVycyA+IDAgPyBiNjQubGVuZ3RoIC0gNCA6IGI2NC5sZW5ndGg7XG5cblx0XHR2YXIgTCA9IDA7XG5cblx0XHRmdW5jdGlvbiBwdXNoKHYpIHtcblx0XHRcdGFycltMKytdID0gdjtcblx0XHR9XG5cblx0XHRmb3IgKGkgPSAwLCBqID0gMDsgaSA8IGw7IGkgKz0gNCwgaiArPSAzKSB7XG5cdFx0XHR0bXAgPSBkZWNvZGUoYjY0LmNoYXJBdChpKSkgPDwgMTggfCBkZWNvZGUoYjY0LmNoYXJBdChpICsgMSkpIDw8IDEyIHwgZGVjb2RlKGI2NC5jaGFyQXQoaSArIDIpKSA8PCA2IHwgZGVjb2RlKGI2NC5jaGFyQXQoaSArIDMpKTtcblx0XHRcdHB1c2goKHRtcCAmIDB4RkYwMDAwKSA+PiAxNik7XG5cdFx0XHRwdXNoKCh0bXAgJiAweEZGMDApID4+IDgpO1xuXHRcdFx0cHVzaCh0bXAgJiAweEZGKTtcblx0XHR9XG5cblx0XHRpZiAocGxhY2VIb2xkZXJzID09PSAyKSB7XG5cdFx0XHR0bXAgPSBkZWNvZGUoYjY0LmNoYXJBdChpKSkgPDwgMiB8IGRlY29kZShiNjQuY2hhckF0KGkgKyAxKSkgPj4gNDtcblx0XHRcdHB1c2godG1wICYgMHhGRik7XG5cdFx0fSBlbHNlIGlmIChwbGFjZUhvbGRlcnMgPT09IDEpIHtcblx0XHRcdHRtcCA9IGRlY29kZShiNjQuY2hhckF0KGkpKSA8PCAxMCB8IGRlY29kZShiNjQuY2hhckF0KGkgKyAxKSkgPDwgNCB8IGRlY29kZShiNjQuY2hhckF0KGkgKyAyKSkgPj4gMjtcblx0XHRcdHB1c2godG1wID4+IDggJiAweEZGKTtcblx0XHRcdHB1c2godG1wICYgMHhGRik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGFycjtcblx0fVxuXG5cdGZ1bmN0aW9uIHVpbnQ4VG9CYXNlNjQodWludDgpIHtcblx0XHR2YXIgaSxcblx0XHQgICAgZXh0cmFCeXRlcyA9IHVpbnQ4Lmxlbmd0aCAlIDMsXG5cdFx0ICAgIC8vIGlmIHdlIGhhdmUgMSBieXRlIGxlZnQsIHBhZCAyIGJ5dGVzXG5cdFx0b3V0cHV0ID0gXCJcIixcblx0XHQgICAgdGVtcCxcblx0XHQgICAgbGVuZ3RoO1xuXG5cdFx0ZnVuY3Rpb24gZW5jb2RlKG51bSkge1xuXHRcdFx0cmV0dXJuIGxvb2t1cC5jaGFyQXQobnVtKTtcblx0XHR9XG5cblx0XHRmdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQobnVtKSB7XG5cdFx0XHRyZXR1cm4gZW5jb2RlKG51bSA+PiAxOCAmIDB4M0YpICsgZW5jb2RlKG51bSA+PiAxMiAmIDB4M0YpICsgZW5jb2RlKG51bSA+PiA2ICYgMHgzRikgKyBlbmNvZGUobnVtICYgMHgzRik7XG5cdFx0fVxuXG5cdFx0Ly8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuXHRcdGZvciAoaSA9IDAsIGxlbmd0aCA9IHVpbnQ4Lmxlbmd0aCAtIGV4dHJhQnl0ZXM7IGkgPCBsZW5ndGg7IGkgKz0gMykge1xuXHRcdFx0dGVtcCA9ICh1aW50OFtpXSA8PCAxNikgKyAodWludDhbaSArIDFdIDw8IDgpICsgdWludDhbaSArIDJdO1xuXHRcdFx0b3V0cHV0ICs9IHRyaXBsZXRUb0Jhc2U2NCh0ZW1wKTtcblx0XHR9XG5cblx0XHQvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG5cdFx0c3dpdGNoIChleHRyYUJ5dGVzKSB7XG5cdFx0XHRjYXNlIDE6XG5cdFx0XHRcdHRlbXAgPSB1aW50OFt1aW50OC5sZW5ndGggLSAxXTtcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSh0ZW1wID4+IDIpO1xuXHRcdFx0XHRvdXRwdXQgKz0gZW5jb2RlKHRlbXAgPDwgNCAmIDB4M0YpO1xuXHRcdFx0XHRvdXRwdXQgKz0gJz09Jztcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIDI6XG5cdFx0XHRcdHRlbXAgPSAodWludDhbdWludDgubGVuZ3RoIC0gMl0gPDwgOCkgKyB1aW50OFt1aW50OC5sZW5ndGggLSAxXTtcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSh0ZW1wID4+IDEwKTtcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSh0ZW1wID4+IDQgJiAweDNGKTtcblx0XHRcdFx0b3V0cHV0ICs9IGVuY29kZSh0ZW1wIDw8IDIgJiAweDNGKTtcblx0XHRcdFx0b3V0cHV0ICs9ICc9Jztcblx0XHRcdFx0YnJlYWs7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG91dHB1dDtcblx0fVxuXG5cdGV4cG9ydHMudG9CeXRlQXJyYXkgPSBiNjRUb0J5dGVBcnJheTtcblx0ZXhwb3J0cy5mcm9tQnl0ZUFycmF5ID0gdWludDhUb0Jhc2U2NDtcbn0pKHR5cGVvZiBleHBvcnRzID09PSAndW5kZWZpbmVkJyA/IHVuZGVmaW5lZC5iYXNlNjRqcyA9IHt9IDogZXhwb3J0cyk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbUkyTkM1cWN5SmRMQ0p1WVcxbGN5STZXeUpzYjI5cmRYQWlMQ0psZUhCdmNuUnpJaXdpUVhKeUlpd2lWV2x1ZERoQmNuSmhlU0lzSWtGeWNtRjVJaXdpVUV4VlV5SXNJbU5vWVhKRGIyUmxRWFFpTENKVFRFRlRTQ0lzSWs1VlRVSkZVaUlzSWt4UFYwVlNJaXdpVlZCUVJWSWlMQ0pRVEZWVFgxVlNURjlUUVVaRklpd2lVMHhCVTBoZlZWSk1YMU5CUmtVaUxDSmtaV052WkdVaUxDSmxiSFFpTENKamIyUmxJaXdpWWpZMFZHOUNlWFJsUVhKeVlYa2lMQ0ppTmpRaUxDSnBJaXdpYWlJc0ltd2lMQ0owYlhBaUxDSndiR0ZqWlVodmJHUmxjbk1pTENKaGNuSWlMQ0pzWlc1bmRHZ2lMQ0pGY25KdmNpSXNJbXhsYmlJc0ltTm9ZWEpCZENJc0lrd2lMQ0p3ZFhOb0lpd2lkaUlzSW5WcGJuUTRWRzlDWVhObE5qUWlMQ0oxYVc1ME9DSXNJbVY0ZEhKaFFubDBaWE1pTENKdmRYUndkWFFpTENKMFpXMXdJaXdpWlc1amIyUmxJaXdpYm5WdElpd2lkSEpwY0d4bGRGUnZRbUZ6WlRZMElpd2lkRzlDZVhSbFFYSnlZWGtpTENKbWNtOXRRbmwwWlVGeWNtRjVJaXdpWW1GelpUWTBhbk1pWFN3aWJXRndjR2x1WjNNaU9pSTdPMEZCUVVFc1NVRkJTVUVzVTBGQlV5eHJSVUZCWWpzN1FVRkZRU3hEUVVGRkxGZEJRVlZETEU5QlFWWXNSVUZCYlVJN1FVRkRjRUk3TzBGQlJVTXNTMEZCU1VNc1RVRkJUeXhQUVVGUFF5eFZRVUZRTEV0QlFYTkNMRmRCUVhaQ0xFZEJRMDVCTEZWQlJFMHNSMEZGVGtNc1MwRkdTanM3UVVGSlJDeExRVUZKUXl4UFFVRlRMRWxCUVVsRExGVkJRVW9zUTBGQlpTeERRVUZtTEVOQlFXSTdRVUZEUVN4TFFVRkpReXhSUVVGVExFbEJRVWxFTEZWQlFVb3NRMEZCWlN4RFFVRm1MRU5CUVdJN1FVRkRRU3hMUVVGSlJTeFRRVUZUTEVsQlFVbEdMRlZCUVVvc1EwRkJaU3hEUVVGbUxFTkJRV0k3UVVGRFFTeExRVUZKUnl4UlFVRlRMRWxCUVVsSUxGVkJRVW9zUTBGQlpTeERRVUZtTEVOQlFXSTdRVUZEUVN4TFFVRkpTU3hSUVVGVExFbEJRVWxLTEZWQlFVb3NRMEZCWlN4RFFVRm1MRU5CUVdJN1FVRkRRU3hMUVVGSlN5eG5Ra0ZCWjBJc1NVRkJTVXdzVlVGQlNpeERRVUZsTEVOQlFXWXNRMEZCY0VJN1FVRkRRU3hMUVVGSlRTeHBRa0ZCYVVJc1NVRkJTVTRzVlVGQlNpeERRVUZsTEVOQlFXWXNRMEZCY2tJN08wRkJSVUVzVlVGQlUwOHNUVUZCVkN4RFFVRnBRa01zUjBGQmFrSXNSVUZCYzBJN1FVRkRja0lzVFVGQlNVTXNUMEZCVDBRc1NVRkJTVklzVlVGQlNpeERRVUZsTEVOQlFXWXNRMEZCV0R0QlFVTkJMRTFCUVVsVExGTkJRVk5XTEVsQlFWUXNTVUZEUVZVc1UwRkJVMG9zWVVGRVlpeEZRVVZETEU5QlFVOHNSVUZCVUN4RFFVcHZRaXhEUVVsV08wRkJRMWdzVFVGQlNVa3NVMEZCVTFJc1MwRkJWQ3hKUVVOQlVTeFRRVUZUU0N4alFVUmlMRVZCUlVNc1QwRkJUeXhGUVVGUUxFTkJVRzlDTEVOQlQxWTdRVUZEV0N4TlFVRkpSeXhQUVVGUFVDeE5RVUZZTEVWQlEwTXNUMEZCVHl4RFFVRkRMRU5CUVZJc1EwRlViMElzUTBGVFZqdEJRVU5ZTEUxQlFVbFBMRTlCUVU5UUxGTkJRVk1zUlVGQmNFSXNSVUZEUXl4UFFVRlBUeXhQUVVGUFVDeE5RVUZRTEVkQlFXZENMRVZCUVdoQ0xFZEJRWEZDTEVWQlFUVkNPMEZCUTBRc1RVRkJTVThzVDBGQlQwd3NVVUZCVVN4RlFVRnVRaXhGUVVORExFOUJRVTlMTEU5QlFVOU1MRXRCUVdRN1FVRkRSQ3hOUVVGSlN5eFBRVUZQVGl4UlFVRlJMRVZCUVc1Q0xFVkJRME1zVDBGQlQwMHNUMEZCVDA0c1MwRkJVQ3hIUVVGbExFVkJRWFJDTzBGQlEwUTdPMEZCUlVRc1ZVRkJVMDhzWTBGQlZDeERRVUY1UWtNc1IwRkJla0lzUlVGQk9FSTdRVUZETjBJc1RVRkJTVU1zUTBGQlNpeEZRVUZQUXl4RFFVRlFMRVZCUVZWRExFTkJRVllzUlVGQllVTXNSMEZCWWl4RlFVRnJRa01zV1VGQmJFSXNSVUZCWjBORExFZEJRV2hET3p0QlFVVkJMRTFCUVVsT0xFbEJRVWxQTEUxQlFVb3NSMEZCWVN4RFFVRmlMRWRCUVdsQ0xFTkJRWEpDTEVWQlFYZENPMEZCUTNaQ0xGTkJRVTBzU1VGQlNVTXNTMEZCU2l4RFFVRlZMR2RFUVVGV0xFTkJRVTQ3UVVGRFFUczdRVUZGUkR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEVzVFVGQlNVTXNUVUZCVFZRc1NVRkJTVThzVFVGQlpEdEJRVU5CUml4cFFrRkJaU3hSUVVGUlRDeEpRVUZKVlN4TlFVRktMRU5CUVZkRUxFMUJRVTBzUTBGQmFrSXNRMEZCVWl4SFFVRTRRaXhEUVVFNVFpeEhRVUZyUXl4UlFVRlJWQ3hKUVVGSlZTeE5RVUZLTEVOQlFWZEVMRTFCUVUwc1EwRkJha0lzUTBGQlVpeEhRVUU0UWl4RFFVRTVRaXhIUVVGclF5eERRVUZ1UmpzN1FVRkZRVHRCUVVOQlNDeFJRVUZOTEVsQlFVbHlRaXhIUVVGS0xFTkJRVkZsTEVsQlFVbFBMRTFCUVVvc1IwRkJZU3hEUVVGaUxFZEJRV2xDTEVOQlFXcENMRWRCUVhGQ1JpeFpRVUUzUWl4RFFVRk9PenRCUVVWQk8wRkJRMEZHTEUxQlFVbEZMR1ZCUVdVc1EwRkJaaXhIUVVGdFFrd3NTVUZCU1U4c1RVRkJTaXhIUVVGaExFTkJRV2hETEVkQlFXOURVQ3hKUVVGSlR5eE5RVUUxUXpzN1FVRkZRU3hOUVVGSlNTeEpRVUZKTEVOQlFWSTdPMEZCUlVFc1YwRkJVME1zU1VGQlZDeERRVUZsUXl4RFFVRm1MRVZCUVd0Q08wRkJRMnBDVUN4UFFVRkpTeXhIUVVGS0xFbEJRVmRGTEVOQlFWZzdRVUZEUVRzN1FVRkZSQ3hQUVVGTFdpeEpRVUZKTEVOQlFVb3NSVUZCVDBNc1NVRkJTU3hEUVVGb1FpeEZRVUZ0UWtRc1NVRkJTVVVzUTBGQmRrSXNSVUZCTUVKR0xFdEJRVXNzUTBGQlRDeEZRVUZSUXl4TFFVRkxMRU5CUVhaRExFVkJRVEJETzBGQlEzcERSU3hUUVVGUFVpeFBRVUZQU1N4SlFVRkpWU3hOUVVGS0xFTkJRVmRVTEVOQlFWZ3NRMEZCVUN4TFFVRjVRaXhGUVVFeFFpeEhRVUZwUTB3c1QwRkJUMGtzU1VGQlNWVXNUVUZCU2l4RFFVRlhWQ3hKUVVGSkxFTkJRV1lzUTBGQlVDeExRVUUyUWl4RlFVRTVSQ3hIUVVGeFJVd3NUMEZCVDBrc1NVRkJTVlVzVFVGQlNpeERRVUZYVkN4SlFVRkpMRU5CUVdZc1EwRkJVQ3hMUVVFMlFpeERRVUZzUnl4SFFVRjFSMHdzVDBGQlQwa3NTVUZCU1ZVc1RVRkJTaXhEUVVGWFZDeEpRVUZKTEVOQlFXWXNRMEZCVUN4RFFVRTNSenRCUVVOQlZ5eFJRVUZMTEVOQlFVTlNMRTFCUVUwc1VVRkJVQ3hMUVVGdlFpeEZRVUY2UWp0QlFVTkJVU3hSUVVGTExFTkJRVU5TTEUxQlFVMHNUVUZCVUN4TFFVRnJRaXhEUVVGMlFqdEJRVU5CVVN4UlFVRkxVaXhOUVVGTkxFbEJRVmc3UVVGRFFUczdRVUZGUkN4TlFVRkpReXhwUWtGQmFVSXNRMEZCY2tJc1JVRkJkMEk3UVVGRGRrSkVMRk5CUVU5U0xFOUJRVTlKTEVsQlFVbFZMRTFCUVVvc1EwRkJWMVFzUTBGQldDeERRVUZRTEV0QlFYbENMRU5CUVRGQ0xFZEJRV2REVEN4UFFVRlBTU3hKUVVGSlZTeE5RVUZLTEVOQlFWZFVMRWxCUVVrc1EwRkJaaXhEUVVGUUxFdEJRVFpDTEVOQlFXNUZPMEZCUTBGWExGRkJRVXRTTEUxQlFVMHNTVUZCV0R0QlFVTkJMRWRCU0VRc1RVRkhUeXhKUVVGSlF5eHBRa0ZCYVVJc1EwRkJja0lzUlVGQmQwSTdRVUZET1VKRUxGTkJRVTlTTEU5QlFVOUpMRWxCUVVsVkxFMUJRVW9zUTBGQlYxUXNRMEZCV0N4RFFVRlFMRXRCUVhsQ0xFVkJRVEZDTEVkQlFXbERUQ3hQUVVGUFNTeEpRVUZKVlN4TlFVRktMRU5CUVZkVUxFbEJRVWtzUTBGQlppeERRVUZRTEV0QlFUWkNMRU5CUVRsRUxFZEJRVzlGVEN4UFFVRlBTU3hKUVVGSlZTeE5RVUZLTEVOQlFWZFVMRWxCUVVrc1EwRkJaaXhEUVVGUUxFdEJRVFpDTEVOQlFYWkhPMEZCUTBGWExGRkJRVTFTTEU5QlFVOHNRMEZCVWl4SFFVRmhMRWxCUVd4Q08wRkJRMEZSTEZGQlFVdFNMRTFCUVUwc1NVRkJXRHRCUVVOQk96dEJRVVZFTEZOQlFVOUZMRWRCUVZBN1FVRkRRVHM3UVVGRlJDeFZRVUZUVVN4aFFVRlVMRU5CUVhkQ1F5eExRVUY0UWl4RlFVRXJRanRCUVVNNVFpeE5RVUZKWkN4RFFVRktPMEZCUVVFc1RVRkRRMlVzWVVGQllVUXNUVUZCVFZJc1RVRkJUaXhIUVVGbExFTkJSRGRDTzBGQlFVRXNUVUZEWjBNN1FVRkRMMEpWTEZkQlFWTXNSVUZHVmp0QlFVRkJMRTFCUjBORExFbEJTRVE3UVVGQlFTeE5RVWRQV0N4TlFVaFFPenRCUVV0QkxGZEJRVk5aTEUxQlFWUXNRMEZCYVVKRExFZEJRV3BDTEVWQlFYTkNPMEZCUTNKQ0xGVkJRVTl5UXl4UFFVRlBNa0lzVFVGQlVDeERRVUZqVlN4SFFVRmtMRU5CUVZBN1FVRkRRVHM3UVVGRlJDeFhRVUZUUXl4bFFVRlVMRU5CUVRCQ1JDeEhRVUV4UWl4RlFVRXJRanRCUVVNNVFpeFZRVUZQUkN4UFFVRlBReXhQUVVGUExFVkJRVkFzUjBGQldTeEpRVUZ1UWl4SlFVRXlRa1FzVDBGQlQwTXNUMEZCVHl4RlFVRlFMRWRCUVZrc1NVRkJia0lzUTBGQk0wSXNSMEZCYzBSRUxFOUJRVTlETEU5QlFVOHNRMEZCVUN4SFFVRlhMRWxCUVd4Q0xFTkJRWFJFTEVkQlFXZEdSQ3hQUVVGUFF5eE5RVUZOTEVsQlFXSXNRMEZCZGtZN1FVRkRRVHM3UVVGRlJEdEJRVU5CTEU5QlFVdHVRaXhKUVVGSkxFTkJRVW9zUlVGQlQwMHNVMEZCVTFFc1RVRkJUVklzVFVGQlRpeEhRVUZsVXl4VlFVRndReXhGUVVGblJHWXNTVUZCU1Uwc1RVRkJjRVFzUlVGQk5FUk9MRXRCUVVzc1EwRkJha1VzUlVGQmIwVTdRVUZEYmtWcFFpeFZRVUZQTEVOQlFVTklMRTFCUVUxa0xFTkJRVTRzUzBGQldTeEZRVUZpTEV0QlFXOUNZeXhOUVVGTlpDeEpRVUZKTEVOQlFWWXNTMEZCWjBJc1EwRkJjRU1zU1VGQk1FTmpMRTFCUVUxa0xFbEJRVWtzUTBGQlZpeERRVUZxUkR0QlFVTkJaMElzWVVGQlZVa3NaMEpCUVdkQ1NDeEpRVUZvUWl4RFFVRldPMEZCUTBFN08wRkJSVVE3UVVGRFFTeFZRVUZSUml4VlFVRlNPMEZCUTBNc1VVRkJTeXhEUVVGTU8wRkJRME5GTEZkQlFVOUlMRTFCUVUxQkxFMUJRVTFTTEUxQlFVNHNSMEZCWlN4RFFVRnlRaXhEUVVGUU8wRkJRMEZWTEdOQlFWVkZMRTlCUVU5RUxGRkJRVkVzUTBGQlppeERRVUZXTzBGQlEwRkVMR05CUVZWRkxFOUJRVkZFTEZGQlFWRXNRMEZCVkN4SFFVRmpMRWxCUVhKQ0xFTkJRVlk3UVVGRFFVUXNZMEZCVlN4SlFVRldPMEZCUTBFN1FVRkRSQ3hSUVVGTExFTkJRVXc3UVVGRFEwTXNWMEZCVHl4RFFVRkRTQ3hOUVVGTlFTeE5RVUZOVWl4TlFVRk9MRWRCUVdVc1EwRkJja0lzUzBGQk1rSXNRMEZCTlVJc1NVRkJhME5STEUxQlFVMUJMRTFCUVUxU0xFMUJRVTRzUjBGQlpTeERRVUZ5UWl4RFFVRjZRenRCUVVOQlZTeGpRVUZWUlN4UFFVRlBSQ3hSUVVGUkxFVkJRV1lzUTBGQlZqdEJRVU5CUkN4alFVRlZSU3hQUVVGUlJDeFJRVUZSTEVOQlFWUXNSMEZCWXl4SlFVRnlRaXhEUVVGV08wRkJRMEZFTEdOQlFWVkZMRTlCUVZGRUxGRkJRVkVzUTBGQlZDeEhRVUZqTEVsQlFYSkNMRU5CUVZZN1FVRkRRVVFzWTBGQlZTeEhRVUZXTzBGQlEwRTdRVUZpUmpzN1FVRm5Ra0VzVTBGQlQwRXNUVUZCVUR0QlFVTkJPenRCUVVWRWFrTXNVMEZCVVhORExGZEJRVklzUjBGQmMwSjJRaXhqUVVGMFFqdEJRVU5CWml4VFFVRlJkVU1zWVVGQlVpeEhRVUYzUWxRc1lVRkJlRUk3UVVGRFFTeERRWHBJUXl4RlFYbElRU3hQUVVGUE9VSXNUMEZCVUN4TFFVRnRRaXhYUVVGdVFpeEhRVUZyUXl4VlFVRkxkME1zVVVGQlRDeEhRVUZuUWl4RlFVRnNSQ3hIUVVGM1JIaERMRTlCZWtoNFJDeERRVUZFSWl3aVptbHNaU0k2SW1JMk5DNXFjeUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSW5aaGNpQnNiMjlyZFhBZ1BTQW5RVUpEUkVWR1IwaEpTa3RNVFU1UFVGRlNVMVJWVmxkWVdWcGhZbU5rWldabmFHbHFhMnh0Ym05d2NYSnpkSFYyZDNoNWVqQXhNak0wTlRZM09Ea3JMeWM3WEc1Y2Jqc29ablZ1WTNScGIyNGdLR1Y0Y0c5eWRITXBJSHRjYmx4MEozVnpaU0J6ZEhKcFkzUW5PMXh1WEc0Z0lIWmhjaUJCY25JZ1BTQW9kSGx3Wlc5bUlGVnBiblE0UVhKeVlYa2dJVDA5SUNkMWJtUmxabWx1WldRbktWeHVJQ0FnSUQ4Z1ZXbHVkRGhCY25KaGVWeHVJQ0FnSURvZ1FYSnlZWGxjYmx4dVhIUjJZWElnVUV4VlV5QWdJRDBnSnlzbkxtTm9ZWEpEYjJSbFFYUW9NQ2xjYmx4MGRtRnlJRk5NUVZOSUlDQTlJQ2N2Snk1amFHRnlRMjlrWlVGMEtEQXBYRzVjZEhaaGNpQk9WVTFDUlZJZ1BTQW5NQ2N1WTJoaGNrTnZaR1ZCZENnd0tWeHVYSFIyWVhJZ1RFOVhSVklnSUQwZ0oyRW5MbU5vWVhKRGIyUmxRWFFvTUNsY2JseDBkbUZ5SUZWUVVFVlNJQ0E5SUNkQkp5NWphR0Z5UTI5a1pVRjBLREFwWEc1Y2RIWmhjaUJRVEZWVFgxVlNURjlUUVVaRklEMGdKeTBuTG1Ob1lYSkRiMlJsUVhRb01DbGNibHgwZG1GeUlGTk1RVk5JWDFWU1RGOVRRVVpGSUQwZ0oxOG5MbU5vWVhKRGIyUmxRWFFvTUNsY2JseHVYSFJtZFc1amRHbHZiaUJrWldOdlpHVWdLR1ZzZENrZ2UxeHVYSFJjZEhaaGNpQmpiMlJsSUQwZ1pXeDBMbU5vWVhKRGIyUmxRWFFvTUNsY2JseDBYSFJwWmlBb1kyOWtaU0E5UFQwZ1VFeFZVeUI4ZkZ4dVhIUmNkQ0FnSUNCamIyUmxJRDA5UFNCUVRGVlRYMVZTVEY5VFFVWkZLVnh1WEhSY2RGeDBjbVYwZFhKdUlEWXlJQzh2SUNjckoxeHVYSFJjZEdsbUlDaGpiMlJsSUQwOVBTQlRURUZUU0NCOGZGeHVYSFJjZENBZ0lDQmpiMlJsSUQwOVBTQlRURUZUU0Y5VlVreGZVMEZHUlNsY2JseDBYSFJjZEhKbGRIVnliaUEyTXlBdkx5QW5MeWRjYmx4MFhIUnBaaUFvWTI5a1pTQThJRTVWVFVKRlVpbGNibHgwWEhSY2RISmxkSFZ5YmlBdE1TQXZMMjV2SUcxaGRHTm9YRzVjZEZ4MGFXWWdLR052WkdVZ1BDQk9WVTFDUlZJZ0t5QXhNQ2xjYmx4MFhIUmNkSEpsZEhWeWJpQmpiMlJsSUMwZ1RsVk5Ra1ZTSUNzZ01qWWdLeUF5Tmx4dVhIUmNkR2xtSUNoamIyUmxJRHdnVlZCUVJWSWdLeUF5TmlsY2JseDBYSFJjZEhKbGRIVnliaUJqYjJSbElDMGdWVkJRUlZKY2JseDBYSFJwWmlBb1kyOWtaU0E4SUV4UFYwVlNJQ3NnTWpZcFhHNWNkRngwWEhSeVpYUjFjbTRnWTI5a1pTQXRJRXhQVjBWU0lDc2dNalpjYmx4MGZWeHVYRzVjZEdaMWJtTjBhVzl1SUdJMk5GUnZRbmwwWlVGeWNtRjVJQ2hpTmpRcElIdGNibHgwWEhSMllYSWdhU3dnYWl3Z2JDd2dkRzF3TENCd2JHRmpaVWh2YkdSbGNuTXNJR0Z5Y2x4dVhHNWNkRngwYVdZZ0tHSTJOQzVzWlc1bmRHZ2dKU0EwSUQ0Z01Da2dlMXh1WEhSY2RGeDBkR2h5YjNjZ2JtVjNJRVZ5Y205eUtDZEpiblpoYkdsa0lITjBjbWx1Wnk0Z1RHVnVaM1JvSUcxMWMzUWdZbVVnWVNCdGRXeDBhWEJzWlNCdlppQTBKeWxjYmx4MFhIUjlYRzVjYmx4MFhIUXZMeUIwYUdVZ2JuVnRZbVZ5SUc5bUlHVnhkV0ZzSUhOcFoyNXpJQ2h3YkdGalpTQm9iMnhrWlhKektWeHVYSFJjZEM4dklHbG1JSFJvWlhKbElHRnlaU0IwZDI4Z2NHeGhZMlZvYjJ4a1pYSnpMQ0IwYUdGdUlIUm9aU0IwZDI4Z1kyaGhjbUZqZEdWeWN5QmlaV1p2Y21VZ2FYUmNibHgwWEhRdkx5QnlaWEJ5WlhObGJuUWdiMjVsSUdKNWRHVmNibHgwWEhRdkx5QnBaaUIwYUdWeVpTQnBjeUJ2Ym14NUlHOXVaU3dnZEdobGJpQjBhR1VnZEdoeVpXVWdZMmhoY21GamRHVnljeUJpWldadmNtVWdhWFFnY21Wd2NtVnpaVzUwSURJZ1lubDBaWE5jYmx4MFhIUXZMeUIwYUdseklHbHpJR3AxYzNRZ1lTQmphR1ZoY0NCb1lXTnJJSFJ2SUc1dmRDQmtieUJwYm1SbGVFOW1JSFIzYVdObFhHNWNkRngwZG1GeUlHeGxiaUE5SUdJMk5DNXNaVzVuZEdoY2JseDBYSFJ3YkdGalpVaHZiR1JsY25NZ1BTQW5QU2NnUFQwOUlHSTJOQzVqYUdGeVFYUW9iR1Z1SUMwZ01pa2dQeUF5SURvZ0p6MG5JRDA5UFNCaU5qUXVZMmhoY2tGMEtHeGxiaUF0SURFcElEOGdNU0E2SURCY2JseHVYSFJjZEM4dklHSmhjMlUyTkNCcGN5QTBMek1nS3lCMWNDQjBieUIwZDI4Z1kyaGhjbUZqZEdWeWN5QnZaaUIwYUdVZ2IzSnBaMmx1WVd3Z1pHRjBZVnh1WEhSY2RHRnljaUE5SUc1bGR5QkJjbklvWWpZMExteGxibWQwYUNBcUlETWdMeUEwSUMwZ2NHeGhZMlZJYjJ4a1pYSnpLVnh1WEc1Y2RGeDBMeThnYVdZZ2RHaGxjbVVnWVhKbElIQnNZV05sYUc5c1pHVnljeXdnYjI1c2VTQm5aWFFnZFhBZ2RHOGdkR2hsSUd4aGMzUWdZMjl0Y0d4bGRHVWdOQ0JqYUdGeWMxeHVYSFJjZEd3Z1BTQndiR0ZqWlVodmJHUmxjbk1nUGlBd0lEOGdZalkwTG14bGJtZDBhQ0F0SURRZ09pQmlOalF1YkdWdVozUm9YRzVjYmx4MFhIUjJZWElnVENBOUlEQmNibHh1WEhSY2RHWjFibU4wYVc5dUlIQjFjMmdnS0hZcElIdGNibHgwWEhSY2RHRnljbHRNS3l0ZElEMGdkbHh1WEhSY2RIMWNibHh1WEhSY2RHWnZjaUFvYVNBOUlEQXNJR29nUFNBd095QnBJRHdnYkRzZ2FTQXJQU0EwTENCcUlDczlJRE1wSUh0Y2JseDBYSFJjZEhSdGNDQTlJQ2hrWldOdlpHVW9ZalkwTG1Ob1lYSkJkQ2hwS1NrZ1BEd2dNVGdwSUh3Z0tHUmxZMjlrWlNoaU5qUXVZMmhoY2tGMEtHa2dLeUF4S1NrZ1BEd2dNVElwSUh3Z0tHUmxZMjlrWlNoaU5qUXVZMmhoY2tGMEtHa2dLeUF5S1NrZ1BEd2dOaWtnZkNCa1pXTnZaR1VvWWpZMExtTm9ZWEpCZENocElDc2dNeWtwWEc1Y2RGeDBYSFJ3ZFhOb0tDaDBiWEFnSmlBd2VFWkdNREF3TUNrZ1BqNGdNVFlwWEc1Y2RGeDBYSFJ3ZFhOb0tDaDBiWEFnSmlBd2VFWkdNREFwSUQ0K0lEZ3BYRzVjZEZ4MFhIUndkWE5vS0hSdGNDQW1JREI0UmtZcFhHNWNkRngwZlZ4dVhHNWNkRngwYVdZZ0tIQnNZV05sU0c5c1pHVnljeUE5UFQwZ01pa2dlMXh1WEhSY2RGeDBkRzF3SUQwZ0tHUmxZMjlrWlNoaU5qUXVZMmhoY2tGMEtHa3BLU0E4UENBeUtTQjhJQ2hrWldOdlpHVW9ZalkwTG1Ob1lYSkJkQ2hwSUNzZ01Ta3BJRDQrSURRcFhHNWNkRngwWEhSd2RYTm9LSFJ0Y0NBbUlEQjRSa1lwWEc1Y2RGeDBmU0JsYkhObElHbG1JQ2h3YkdGalpVaHZiR1JsY25NZ1BUMDlJREVwSUh0Y2JseDBYSFJjZEhSdGNDQTlJQ2hrWldOdlpHVW9ZalkwTG1Ob1lYSkJkQ2hwS1NrZ1BEd2dNVEFwSUh3Z0tHUmxZMjlrWlNoaU5qUXVZMmhoY2tGMEtHa2dLeUF4S1NrZ1BEd2dOQ2tnZkNBb1pHVmpiMlJsS0dJMk5DNWphR0Z5UVhRb2FTQXJJRElwS1NBK1BpQXlLVnh1WEhSY2RGeDBjSFZ6YUNnb2RHMXdJRDQrSURncElDWWdNSGhHUmlsY2JseDBYSFJjZEhCMWMyZ29kRzF3SUNZZ01IaEdSaWxjYmx4MFhIUjlYRzVjYmx4MFhIUnlaWFIxY200Z1lYSnlYRzVjZEgxY2JseHVYSFJtZFc1amRHbHZiaUIxYVc1ME9GUnZRbUZ6WlRZMElDaDFhVzUwT0NrZ2UxeHVYSFJjZEhaaGNpQnBMRnh1WEhSY2RGeDBaWGgwY21GQ2VYUmxjeUE5SUhWcGJuUTRMbXhsYm1kMGFDQWxJRE1zSUM4dklHbG1JSGRsSUdoaGRtVWdNU0JpZVhSbElHeGxablFzSUhCaFpDQXlJR0o1ZEdWelhHNWNkRngwWEhSdmRYUndkWFFnUFNCY0lsd2lMRnh1WEhSY2RGeDBkR1Z0Y0N3Z2JHVnVaM1JvWEc1Y2JseDBYSFJtZFc1amRHbHZiaUJsYm1OdlpHVWdLRzUxYlNrZ2UxeHVYSFJjZEZ4MGNtVjBkWEp1SUd4dmIydDFjQzVqYUdGeVFYUW9iblZ0S1Z4dVhIUmNkSDFjYmx4dVhIUmNkR1oxYm1OMGFXOXVJSFJ5YVhCc1pYUlViMEpoYzJVMk5DQW9iblZ0S1NCN1hHNWNkRngwWEhSeVpYUjFjbTRnWlc1amIyUmxLRzUxYlNBK1BpQXhPQ0FtSURCNE0wWXBJQ3NnWlc1amIyUmxLRzUxYlNBK1BpQXhNaUFtSURCNE0wWXBJQ3NnWlc1amIyUmxLRzUxYlNBK1BpQTJJQ1lnTUhnelJpa2dLeUJsYm1OdlpHVW9iblZ0SUNZZ01IZ3pSaWxjYmx4MFhIUjlYRzVjYmx4MFhIUXZMeUJuYnlCMGFISnZkV2RvSUhSb1pTQmhjbkpoZVNCbGRtVnllU0IwYUhKbFpTQmllWFJsY3l3Z2QyVW5iR3dnWkdWaGJDQjNhWFJvSUhSeVlXbHNhVzVuSUhOMGRXWm1JR3hoZEdWeVhHNWNkRngwWm05eUlDaHBJRDBnTUN3Z2JHVnVaM1JvSUQwZ2RXbHVkRGd1YkdWdVozUm9JQzBnWlhoMGNtRkNlWFJsY3pzZ2FTQThJR3hsYm1kMGFEc2dhU0FyUFNBektTQjdYRzVjZEZ4MFhIUjBaVzF3SUQwZ0tIVnBiblE0VzJsZElEdzhJREUyS1NBcklDaDFhVzUwT0Z0cElDc2dNVjBnUER3Z09Da2dLeUFvZFdsdWREaGJhU0FySURKZEtWeHVYSFJjZEZ4MGIzVjBjSFYwSUNzOUlIUnlhWEJzWlhSVWIwSmhjMlUyTkNoMFpXMXdLVnh1WEhSY2RIMWNibHh1WEhSY2RDOHZJSEJoWkNCMGFHVWdaVzVrSUhkcGRHZ2dlbVZ5YjNNc0lHSjFkQ0J0WVd0bElITjFjbVVnZEc4Z2JtOTBJR1p2Y21kbGRDQjBhR1VnWlhoMGNtRWdZbmwwWlhOY2JseDBYSFJ6ZDJsMFkyZ2dLR1Y0ZEhKaFFubDBaWE1wSUh0Y2JseDBYSFJjZEdOaGMyVWdNVHBjYmx4MFhIUmNkRngwZEdWdGNDQTlJSFZwYm5RNFczVnBiblE0TG14bGJtZDBhQ0F0SURGZFhHNWNkRngwWEhSY2RHOTFkSEIxZENBclBTQmxibU52WkdVb2RHVnRjQ0ErUGlBeUtWeHVYSFJjZEZ4MFhIUnZkWFJ3ZFhRZ0t6MGdaVzVqYjJSbEtDaDBaVzF3SUR3OElEUXBJQ1lnTUhnelJpbGNibHgwWEhSY2RGeDBiM1YwY0hWMElDczlJQ2M5UFNkY2JseDBYSFJjZEZ4MFluSmxZV3RjYmx4MFhIUmNkR05oYzJVZ01qcGNibHgwWEhSY2RGeDBkR1Z0Y0NBOUlDaDFhVzUwT0Z0MWFXNTBPQzVzWlc1bmRHZ2dMU0F5WFNBOFBDQTRLU0FySUNoMWFXNTBPRnQxYVc1ME9DNXNaVzVuZEdnZ0xTQXhYU2xjYmx4MFhIUmNkRngwYjNWMGNIVjBJQ3M5SUdWdVkyOWtaU2gwWlcxd0lENCtJREV3S1Z4dVhIUmNkRngwWEhSdmRYUndkWFFnS3owZ1pXNWpiMlJsS0NoMFpXMXdJRDQrSURRcElDWWdNSGd6UmlsY2JseDBYSFJjZEZ4MGIzVjBjSFYwSUNzOUlHVnVZMjlrWlNnb2RHVnRjQ0E4UENBeUtTQW1JREI0TTBZcFhHNWNkRngwWEhSY2RHOTFkSEIxZENBclBTQW5QU2RjYmx4MFhIUmNkRngwWW5KbFlXdGNibHgwWEhSOVhHNWNibHgwWEhSeVpYUjFjbTRnYjNWMGNIVjBYRzVjZEgxY2JseHVYSFJsZUhCdmNuUnpMblJ2UW5sMFpVRnljbUY1SUQwZ1lqWTBWRzlDZVhSbFFYSnlZWGxjYmx4MFpYaHdiM0owY3k1bWNtOXRRbmwwWlVGeWNtRjVJRDBnZFdsdWREaFViMEpoYzJVMk5GeHVmU2gwZVhCbGIyWWdaWGh3YjNKMGN5QTlQVDBnSjNWdVpHVm1hVzVsWkNjZ1B5QW9kR2hwY3k1aVlYTmxOalJxY3lBOUlIdDlLU0E2SUdWNGNHOXlkSE1wS1Z4dUlsMTlcbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXGJhc2U2NC1qc1xcXFxsaWJcXFxcYjY0LmpzXCIsXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXGJhc2U2NC1qc1xcXFxsaWJcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4ndXNlIHN0cmljdCc7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuLyohXG4gKiBUaGUgYnVmZmVyIG1vZHVsZSBmcm9tIG5vZGUuanMsIGZvciB0aGUgYnJvd3Nlci5cbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuXG52YXIgYmFzZTY0ID0gcmVxdWlyZSgnYmFzZTY0LWpzJyk7XG52YXIgaWVlZTc1NCA9IHJlcXVpcmUoJ2llZWU3NTQnKTtcblxuZXhwb3J0cy5CdWZmZXIgPSBCdWZmZXI7XG5leHBvcnRzLlNsb3dCdWZmZXIgPSBCdWZmZXI7XG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTA7XG5CdWZmZXIucG9vbFNpemUgPSA4MTkyO1xuXG4vKipcbiAqIElmIGBCdWZmZXIuX3VzZVR5cGVkQXJyYXlzYDpcbiAqICAgPT09IHRydWUgICAgVXNlIFVpbnQ4QXJyYXkgaW1wbGVtZW50YXRpb24gKGZhc3Rlc3QpXG4gKiAgID09PSBmYWxzZSAgIFVzZSBPYmplY3QgaW1wbGVtZW50YXRpb24gKGNvbXBhdGlibGUgZG93biB0byBJRTYpXG4gKi9cbkJ1ZmZlci5fdXNlVHlwZWRBcnJheXMgPSBmdW5jdGlvbiAoKSB7XG4gIC8vIERldGVjdCBpZiBicm93c2VyIHN1cHBvcnRzIFR5cGVkIEFycmF5cy4gU3VwcG9ydGVkIGJyb3dzZXJzIGFyZSBJRSAxMCssIEZpcmVmb3ggNCssXG4gIC8vIENocm9tZSA3KywgU2FmYXJpIDUuMSssIE9wZXJhIDExLjYrLCBpT1MgNC4yKy4gSWYgdGhlIGJyb3dzZXIgZG9lcyBub3Qgc3VwcG9ydCBhZGRpbmdcbiAgLy8gcHJvcGVydGllcyB0byBgVWludDhBcnJheWAgaW5zdGFuY2VzLCB0aGVuIHRoYXQncyB0aGUgc2FtZSBhcyBubyBgVWludDhBcnJheWAgc3VwcG9ydFxuICAvLyBiZWNhdXNlIHdlIG5lZWQgdG8gYmUgYWJsZSB0byBhZGQgYWxsIHRoZSBub2RlIEJ1ZmZlciBBUEkgbWV0aG9kcy4gVGhpcyBpcyBhbiBpc3N1ZVxuICAvLyBpbiBGaXJlZm94IDQtMjkuIE5vdyBmaXhlZDogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk1NDM4XG4gIHRyeSB7XG4gICAgdmFyIGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcigwKTtcbiAgICB2YXIgYXJyID0gbmV3IFVpbnQ4QXJyYXkoYnVmKTtcbiAgICBhcnIuZm9vID0gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIDQyO1xuICAgIH07XG4gICAgcmV0dXJuIDQyID09PSBhcnIuZm9vKCkgJiYgdHlwZW9mIGFyci5zdWJhcnJheSA9PT0gJ2Z1bmN0aW9uJzsgLy8gQ2hyb21lIDktMTAgbGFjayBgc3ViYXJyYXlgXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn0oKTtcblxuLyoqXG4gKiBDbGFzczogQnVmZmVyXG4gKiA9PT09PT09PT09PT09XG4gKlxuICogVGhlIEJ1ZmZlciBjb25zdHJ1Y3RvciByZXR1cm5zIGluc3RhbmNlcyBvZiBgVWludDhBcnJheWAgdGhhdCBhcmUgYXVnbWVudGVkXG4gKiB3aXRoIGZ1bmN0aW9uIHByb3BlcnRpZXMgZm9yIGFsbCB0aGUgbm9kZSBgQnVmZmVyYCBBUEkgZnVuY3Rpb25zLiBXZSB1c2VcbiAqIGBVaW50OEFycmF5YCBzbyB0aGF0IHNxdWFyZSBicmFja2V0IG5vdGF0aW9uIHdvcmtzIGFzIGV4cGVjdGVkIC0tIGl0IHJldHVybnNcbiAqIGEgc2luZ2xlIG9jdGV0LlxuICpcbiAqIEJ5IGF1Z21lbnRpbmcgdGhlIGluc3RhbmNlcywgd2UgY2FuIGF2b2lkIG1vZGlmeWluZyB0aGUgYFVpbnQ4QXJyYXlgXG4gKiBwcm90b3R5cGUuXG4gKi9cbmZ1bmN0aW9uIEJ1ZmZlcihzdWJqZWN0LCBlbmNvZGluZywgbm9aZXJvKSB7XG4gIGlmICghKHRoaXMgaW5zdGFuY2VvZiBCdWZmZXIpKSByZXR1cm4gbmV3IEJ1ZmZlcihzdWJqZWN0LCBlbmNvZGluZywgbm9aZXJvKTtcblxuICB2YXIgdHlwZSA9IHR5cGVvZiBzdWJqZWN0ID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihzdWJqZWN0KTtcblxuICAvLyBXb3JrYXJvdW5kOiBub2RlJ3MgYmFzZTY0IGltcGxlbWVudGF0aW9uIGFsbG93cyBmb3Igbm9uLXBhZGRlZCBzdHJpbmdzXG4gIC8vIHdoaWxlIGJhc2U2NC1qcyBkb2VzIG5vdC5cbiAgaWYgKGVuY29kaW5nID09PSAnYmFzZTY0JyAmJiB0eXBlID09PSAnc3RyaW5nJykge1xuICAgIHN1YmplY3QgPSBzdHJpbmd0cmltKHN1YmplY3QpO1xuICAgIHdoaWxlIChzdWJqZWN0Lmxlbmd0aCAlIDQgIT09IDApIHtcbiAgICAgIHN1YmplY3QgPSBzdWJqZWN0ICsgJz0nO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZpbmQgdGhlIGxlbmd0aFxuICB2YXIgbGVuZ3RoO1xuICBpZiAodHlwZSA9PT0gJ251bWJlcicpIGxlbmd0aCA9IGNvZXJjZShzdWJqZWN0KTtlbHNlIGlmICh0eXBlID09PSAnc3RyaW5nJykgbGVuZ3RoID0gQnVmZmVyLmJ5dGVMZW5ndGgoc3ViamVjdCwgZW5jb2RpbmcpO2Vsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnKSBsZW5ndGggPSBjb2VyY2Uoc3ViamVjdC5sZW5ndGgpOyAvLyBhc3N1bWUgdGhhdCBvYmplY3QgaXMgYXJyYXktbGlrZVxuICBlbHNlIHRocm93IG5ldyBFcnJvcignRmlyc3QgYXJndW1lbnQgbmVlZHMgdG8gYmUgYSBudW1iZXIsIGFycmF5IG9yIHN0cmluZy4nKTtcblxuICB2YXIgYnVmO1xuICBpZiAoQnVmZmVyLl91c2VUeXBlZEFycmF5cykge1xuICAgIC8vIFByZWZlcnJlZDogUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICBidWYgPSBCdWZmZXIuX2F1Z21lbnQobmV3IFVpbnQ4QXJyYXkobGVuZ3RoKSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBUSElTIGluc3RhbmNlIG9mIEJ1ZmZlciAoY3JlYXRlZCBieSBgbmV3YClcbiAgICBidWYgPSB0aGlzO1xuICAgIGJ1Zi5sZW5ndGggPSBsZW5ndGg7XG4gICAgYnVmLl9pc0J1ZmZlciA9IHRydWU7XG4gIH1cblxuICB2YXIgaTtcbiAgaWYgKEJ1ZmZlci5fdXNlVHlwZWRBcnJheXMgJiYgdHlwZW9mIHN1YmplY3QuYnl0ZUxlbmd0aCA9PT0gJ251bWJlcicpIHtcbiAgICAvLyBTcGVlZCBvcHRpbWl6YXRpb24gLS0gdXNlIHNldCBpZiB3ZSdyZSBjb3B5aW5nIGZyb20gYSB0eXBlZCBhcnJheVxuICAgIGJ1Zi5fc2V0KHN1YmplY3QpO1xuICB9IGVsc2UgaWYgKGlzQXJyYXlpc2goc3ViamVjdCkpIHtcbiAgICAvLyBUcmVhdCBhcnJheS1pc2ggb2JqZWN0cyBhcyBhIGJ5dGUgYXJyYXlcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChCdWZmZXIuaXNCdWZmZXIoc3ViamVjdCkpIGJ1ZltpXSA9IHN1YmplY3QucmVhZFVJbnQ4KGkpO2Vsc2UgYnVmW2ldID0gc3ViamVjdFtpXTtcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICBidWYud3JpdGUoc3ViamVjdCwgMCwgZW5jb2RpbmcpO1xuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdudW1iZXInICYmICFCdWZmZXIuX3VzZVR5cGVkQXJyYXlzICYmICFub1plcm8pIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGJ1ZltpXSA9IDA7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ1Zjtcbn1cblxuLy8gU1RBVElDIE1FVEhPRFNcbi8vID09PT09PT09PT09PT09XG5cbkJ1ZmZlci5pc0VuY29kaW5nID0gZnVuY3Rpb24gKGVuY29kaW5nKSB7XG4gIHN3aXRjaCAoU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICBjYXNlICdyYXcnOlxuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG5CdWZmZXIuaXNCdWZmZXIgPSBmdW5jdGlvbiAoYikge1xuICByZXR1cm4gISEoYiAhPT0gbnVsbCAmJiBiICE9PSB1bmRlZmluZWQgJiYgYi5faXNCdWZmZXIpO1xufTtcblxuQnVmZmVyLmJ5dGVMZW5ndGggPSBmdW5jdGlvbiAoc3RyLCBlbmNvZGluZykge1xuICB2YXIgcmV0O1xuICBzdHIgPSBzdHIgKyAnJztcbiAgc3dpdGNoIChlbmNvZGluZyB8fCAndXRmOCcpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgICAgcmV0ID0gc3RyLmxlbmd0aCAvIDI7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgICByZXQgPSB1dGY4VG9CeXRlcyhzdHIpLmxlbmd0aDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ3Jhdyc6XG4gICAgICByZXQgPSBzdHIubGVuZ3RoO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgIHJldCA9IGJhc2U2NFRvQnl0ZXMoc3RyKS5sZW5ndGg7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0ID0gc3RyLmxlbmd0aCAqIDI7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGVuY29kaW5nJyk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn07XG5cbkJ1ZmZlci5jb25jYXQgPSBmdW5jdGlvbiAobGlzdCwgdG90YWxMZW5ndGgpIHtcbiAgYXNzZXJ0KGlzQXJyYXkobGlzdCksICdVc2FnZTogQnVmZmVyLmNvbmNhdChsaXN0LCBbdG90YWxMZW5ndGhdKVxcbicgKyAnbGlzdCBzaG91bGQgYmUgYW4gQXJyYXkuJyk7XG5cbiAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIG5ldyBCdWZmZXIoMCk7XG4gIH0gZWxzZSBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICByZXR1cm4gbGlzdFswXTtcbiAgfVxuXG4gIHZhciBpO1xuICBpZiAodHlwZW9mIHRvdGFsTGVuZ3RoICE9PSAnbnVtYmVyJykge1xuICAgIHRvdGFsTGVuZ3RoID0gMDtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgdG90YWxMZW5ndGggKz0gbGlzdFtpXS5sZW5ndGg7XG4gICAgfVxuICB9XG5cbiAgdmFyIGJ1ZiA9IG5ldyBCdWZmZXIodG90YWxMZW5ndGgpO1xuICB2YXIgcG9zID0gMDtcbiAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgaXRlbS5jb3B5KGJ1ZiwgcG9zKTtcbiAgICBwb3MgKz0gaXRlbS5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIGJ1Zjtcbn07XG5cbi8vIEJVRkZFUiBJTlNUQU5DRSBNRVRIT0RTXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PVxuXG5mdW5jdGlvbiBfaGV4V3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDA7XG4gIHZhciByZW1haW5pbmcgPSBidWYubGVuZ3RoIC0gb2Zmc2V0O1xuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZztcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKTtcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmc7XG4gICAgfVxuICB9XG5cbiAgLy8gbXVzdCBiZSBhbiBldmVuIG51bWJlciBvZiBkaWdpdHNcbiAgdmFyIHN0ckxlbiA9IHN0cmluZy5sZW5ndGg7XG4gIGFzc2VydChzdHJMZW4gJSAyID09PSAwLCAnSW52YWxpZCBoZXggc3RyaW5nJyk7XG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyO1xuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgYnl0ZSA9IHBhcnNlSW50KHN0cmluZy5zdWJzdHIoaSAqIDIsIDIpLCAxNik7XG4gICAgYXNzZXJ0KCFpc05hTihieXRlKSwgJ0ludmFsaWQgaGV4IHN0cmluZycpO1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9IGJ5dGU7XG4gIH1cbiAgQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPSBpICogMjtcbiAgcmV0dXJuIGk7XG59XG5cbmZ1bmN0aW9uIF91dGY4V3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9IGJsaXRCdWZmZXIodXRmOFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aCk7XG4gIHJldHVybiBjaGFyc1dyaXR0ZW47XG59XG5cbmZ1bmN0aW9uIF9hc2NpaVdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPSBibGl0QnVmZmVyKGFzY2lpVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKTtcbiAgcmV0dXJuIGNoYXJzV3JpdHRlbjtcbn1cblxuZnVuY3Rpb24gX2JpbmFyeVdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gX2FzY2lpV3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKTtcbn1cblxuZnVuY3Rpb24gX2Jhc2U2NFdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICB2YXIgY2hhcnNXcml0dGVuID0gQnVmZmVyLl9jaGFyc1dyaXR0ZW4gPSBibGl0QnVmZmVyKGJhc2U2NFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aCk7XG4gIHJldHVybiBjaGFyc1dyaXR0ZW47XG59XG5cbmZ1bmN0aW9uIF91dGYxNmxlV3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBjaGFyc1dyaXR0ZW4gPSBCdWZmZXIuX2NoYXJzV3JpdHRlbiA9IGJsaXRCdWZmZXIodXRmMTZsZVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aCk7XG4gIHJldHVybiBjaGFyc1dyaXR0ZW47XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gU3VwcG9ydCBib3RoIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZylcbiAgLy8gYW5kIHRoZSBsZWdhY3kgKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldCwgbGVuZ3RoKVxuICBpZiAoaXNGaW5pdGUob2Zmc2V0KSkge1xuICAgIGlmICghaXNGaW5pdGUobGVuZ3RoKSkge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGg7XG4gICAgICBsZW5ndGggPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIGxlZ2FjeVxuICAgIHZhciBzd2FwID0gZW5jb2Rpbmc7XG4gICAgZW5jb2RpbmcgPSBvZmZzZXQ7XG4gICAgb2Zmc2V0ID0gbGVuZ3RoO1xuICAgIGxlbmd0aCA9IHN3YXA7XG4gIH1cblxuICBvZmZzZXQgPSBOdW1iZXIob2Zmc2V0KSB8fCAwO1xuICB2YXIgcmVtYWluaW5nID0gdGhpcy5sZW5ndGggLSBvZmZzZXQ7XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nO1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpO1xuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZztcbiAgICB9XG4gIH1cbiAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcgfHwgJ3V0ZjgnKS50b0xvd2VyQ2FzZSgpO1xuXG4gIHZhciByZXQ7XG4gIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgICAgcmV0ID0gX2hleFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgICAgcmV0ID0gX3V0ZjhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIHJldCA9IF9hc2NpaVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgIHJldCA9IF9iaW5hcnlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICByZXQgPSBfYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0ID0gX3V0ZjE2bGVXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gZW5jb2RpbmcnKTtcbiAgfVxuICByZXR1cm4gcmV0O1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIChlbmNvZGluZywgc3RhcnQsIGVuZCkge1xuICB2YXIgc2VsZiA9IHRoaXM7XG5cbiAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcgfHwgJ3V0ZjgnKS50b0xvd2VyQ2FzZSgpO1xuICBzdGFydCA9IE51bWJlcihzdGFydCkgfHwgMDtcbiAgZW5kID0gZW5kICE9PSB1bmRlZmluZWQgPyBOdW1iZXIoZW5kKSA6IGVuZCA9IHNlbGYubGVuZ3RoO1xuXG4gIC8vIEZhc3RwYXRoIGVtcHR5IHN0cmluZ3NcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVybiAnJztcblxuICB2YXIgcmV0O1xuICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICAgIHJldCA9IF9oZXhTbGljZShzZWxmLCBzdGFydCwgZW5kKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIHJldCA9IF91dGY4U2xpY2Uoc2VsZiwgc3RhcnQsIGVuZCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgICByZXQgPSBfYXNjaWlTbGljZShzZWxmLCBzdGFydCwgZW5kKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICByZXQgPSBfYmluYXJ5U2xpY2Uoc2VsZiwgc3RhcnQsIGVuZCk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgcmV0ID0gX2Jhc2U2NFNsaWNlKHNlbGYsIHN0YXJ0LCBlbmQpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldCA9IF91dGYxNmxlU2xpY2Uoc2VsZiwgc3RhcnQsIGVuZCk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbmtub3duIGVuY29kaW5nJyk7XG4gIH1cbiAgcmV0dXJuIHJldDtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9O1xufTtcblxuLy8gY29weSh0YXJnZXRCdWZmZXIsIHRhcmdldFN0YXJ0PTAsIHNvdXJjZVN0YXJ0PTAsIHNvdXJjZUVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gKHRhcmdldCwgdGFyZ2V0X3N0YXJ0LCBzdGFydCwgZW5kKSB7XG4gIHZhciBzb3VyY2UgPSB0aGlzO1xuXG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMDtcbiAgaWYgKCFlbmQgJiYgZW5kICE9PSAwKSBlbmQgPSB0aGlzLmxlbmd0aDtcbiAgaWYgKCF0YXJnZXRfc3RhcnQpIHRhcmdldF9zdGFydCA9IDA7XG5cbiAgLy8gQ29weSAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm47XG4gIGlmICh0YXJnZXQubGVuZ3RoID09PSAwIHx8IHNvdXJjZS5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAvLyBGYXRhbCBlcnJvciBjb25kaXRpb25zXG4gIGFzc2VydChlbmQgPj0gc3RhcnQsICdzb3VyY2VFbmQgPCBzb3VyY2VTdGFydCcpO1xuICBhc3NlcnQodGFyZ2V0X3N0YXJ0ID49IDAgJiYgdGFyZ2V0X3N0YXJ0IDwgdGFyZ2V0Lmxlbmd0aCwgJ3RhcmdldFN0YXJ0IG91dCBvZiBib3VuZHMnKTtcbiAgYXNzZXJ0KHN0YXJ0ID49IDAgJiYgc3RhcnQgPCBzb3VyY2UubGVuZ3RoLCAnc291cmNlU3RhcnQgb3V0IG9mIGJvdW5kcycpO1xuICBhc3NlcnQoZW5kID49IDAgJiYgZW5kIDw9IHNvdXJjZS5sZW5ndGgsICdzb3VyY2VFbmQgb3V0IG9mIGJvdW5kcycpO1xuXG4gIC8vIEFyZSB3ZSBvb2I/XG4gIGlmIChlbmQgPiB0aGlzLmxlbmd0aCkgZW5kID0gdGhpcy5sZW5ndGg7XG4gIGlmICh0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0X3N0YXJ0IDwgZW5kIC0gc3RhcnQpIGVuZCA9IHRhcmdldC5sZW5ndGggLSB0YXJnZXRfc3RhcnQgKyBzdGFydDtcblxuICB2YXIgbGVuID0gZW5kIC0gc3RhcnQ7XG5cbiAgaWYgKGxlbiA8IDEwMCB8fCAhQnVmZmVyLl91c2VUeXBlZEFycmF5cykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0X3N0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGFyZ2V0Ll9zZXQodGhpcy5zdWJhcnJheShzdGFydCwgc3RhcnQgKyBsZW4pLCB0YXJnZXRfc3RhcnQpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBfYmFzZTY0U2xpY2UoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGlmIChzdGFydCA9PT0gMCAmJiBlbmQgPT09IGJ1Zi5sZW5ndGgpIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmLnNsaWNlKHN0YXJ0LCBlbmQpKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfdXRmOFNsaWNlKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmVzID0gJyc7XG4gIHZhciB0bXAgPSAnJztcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKTtcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkrKykge1xuICAgIGlmIChidWZbaV0gPD0gMHg3Rikge1xuICAgICAgcmVzICs9IGRlY29kZVV0ZjhDaGFyKHRtcCkgKyBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSk7XG4gICAgICB0bXAgPSAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgdG1wICs9ICclJyArIGJ1ZltpXS50b1N0cmluZygxNik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlcyArIGRlY29kZVV0ZjhDaGFyKHRtcCk7XG59XG5cbmZ1bmN0aW9uIF9hc2NpaVNsaWNlKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJyc7XG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZCk7XG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0pO1xuICB9cmV0dXJuIHJldDtcbn1cblxuZnVuY3Rpb24gX2JpbmFyeVNsaWNlKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICByZXR1cm4gX2FzY2lpU2xpY2UoYnVmLCBzdGFydCwgZW5kKTtcbn1cblxuZnVuY3Rpb24gX2hleFNsaWNlKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gYnVmLmxlbmd0aDtcblxuICBpZiAoIXN0YXJ0IHx8IHN0YXJ0IDwgMCkgc3RhcnQgPSAwO1xuICBpZiAoIWVuZCB8fCBlbmQgPCAwIHx8IGVuZCA+IGxlbikgZW5kID0gbGVuO1xuXG4gIHZhciBvdXQgPSAnJztcbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICBvdXQgKz0gdG9IZXgoYnVmW2ldKTtcbiAgfVxuICByZXR1cm4gb3V0O1xufVxuXG5mdW5jdGlvbiBfdXRmMTZsZVNsaWNlKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgYnl0ZXMgPSBidWYuc2xpY2Uoc3RhcnQsIGVuZCk7XG4gIHZhciByZXMgPSAnJztcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldICsgYnl0ZXNbaSArIDFdICogMjU2KTtcbiAgfVxuICByZXR1cm4gcmVzO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoO1xuICBzdGFydCA9IGNsYW1wKHN0YXJ0LCBsZW4sIDApO1xuICBlbmQgPSBjbGFtcChlbmQsIGxlbiwgbGVuKTtcblxuICBpZiAoQnVmZmVyLl91c2VUeXBlZEFycmF5cykge1xuICAgIHJldHVybiBCdWZmZXIuX2F1Z21lbnQodGhpcy5zdWJhcnJheShzdGFydCwgZW5kKSk7XG4gIH0gZWxzZSB7XG4gICAgdmFyIHNsaWNlTGVuID0gZW5kIC0gc3RhcnQ7XG4gICAgdmFyIG5ld0J1ZiA9IG5ldyBCdWZmZXIoc2xpY2VMZW4sIHVuZGVmaW5lZCwgdHJ1ZSk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGljZUxlbjsgaSsrKSB7XG4gICAgICBuZXdCdWZbaV0gPSB0aGlzW2kgKyBzdGFydF07XG4gICAgfVxuICAgIHJldHVybiBuZXdCdWY7XG4gIH1cbn07XG5cbi8vIGBnZXRgIHdpbGwgYmUgcmVtb3ZlZCBpbiBOb2RlIDAuMTMrXG5CdWZmZXIucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChvZmZzZXQpIHtcbiAgY29uc29sZS5sb2coJy5nZXQoKSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdXNpbmcgYXJyYXkgaW5kZXhlcyBpbnN0ZWFkLicpO1xuICByZXR1cm4gdGhpcy5yZWFkVUludDgob2Zmc2V0KTtcbn07XG5cbi8vIGBzZXRgIHdpbGwgYmUgcmVtb3ZlZCBpbiBOb2RlIDAuMTMrXG5CdWZmZXIucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uICh2LCBvZmZzZXQpIHtcbiAgY29uc29sZS5sb2coJy5zZXQoKSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdXNpbmcgYXJyYXkgaW5kZXhlcyBpbnN0ZWFkLicpO1xuICByZXR1cm4gdGhpcy53cml0ZVVJbnQ4KHYsIG9mZnNldCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50OCA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0IDwgdGhpcy5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICB9XG5cbiAgaWYgKG9mZnNldCA+PSB0aGlzLmxlbmd0aCkgcmV0dXJuO1xuXG4gIHJldHVybiB0aGlzW29mZnNldF07XG59O1xuXG5mdW5jdGlvbiBfcmVhZFVJbnQxNihidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKTtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0ICsgMSA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGg7XG4gIGlmIChvZmZzZXQgPj0gbGVuKSByZXR1cm47XG5cbiAgdmFyIHZhbDtcbiAgaWYgKGxpdHRsZUVuZGlhbikge1xuICAgIHZhbCA9IGJ1ZltvZmZzZXRdO1xuICAgIGlmIChvZmZzZXQgKyAxIDwgbGVuKSB2YWwgfD0gYnVmW29mZnNldCArIDFdIDw8IDg7XG4gIH0gZWxzZSB7XG4gICAgdmFsID0gYnVmW29mZnNldF0gPDwgODtcbiAgICBpZiAob2Zmc2V0ICsgMSA8IGxlbikgdmFsIHw9IGJ1ZltvZmZzZXQgKyAxXTtcbiAgfVxuICByZXR1cm4gdmFsO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQxNih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkVUludDE2KHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KTtcbn07XG5cbmZ1bmN0aW9uIF9yZWFkVUludDMyKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gIH1cblxuICB2YXIgbGVuID0gYnVmLmxlbmd0aDtcbiAgaWYgKG9mZnNldCA+PSBsZW4pIHJldHVybjtcblxuICB2YXIgdmFsO1xuICBpZiAobGl0dGxlRW5kaWFuKSB7XG4gICAgaWYgKG9mZnNldCArIDIgPCBsZW4pIHZhbCA9IGJ1ZltvZmZzZXQgKyAyXSA8PCAxNjtcbiAgICBpZiAob2Zmc2V0ICsgMSA8IGxlbikgdmFsIHw9IGJ1ZltvZmZzZXQgKyAxXSA8PCA4O1xuICAgIHZhbCB8PSBidWZbb2Zmc2V0XTtcbiAgICBpZiAob2Zmc2V0ICsgMyA8IGxlbikgdmFsID0gdmFsICsgKGJ1ZltvZmZzZXQgKyAzXSA8PCAyNCA+Pj4gMCk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKG9mZnNldCArIDEgPCBsZW4pIHZhbCA9IGJ1ZltvZmZzZXQgKyAxXSA8PCAxNjtcbiAgICBpZiAob2Zmc2V0ICsgMiA8IGxlbikgdmFsIHw9IGJ1ZltvZmZzZXQgKyAyXSA8PCA4O1xuICAgIGlmIChvZmZzZXQgKyAzIDwgbGVuKSB2YWwgfD0gYnVmW29mZnNldCArIDNdO1xuICAgIHZhbCA9IHZhbCArIChidWZbb2Zmc2V0XSA8PCAyNCA+Pj4gMCk7XG4gIH1cbiAgcmV0dXJuIHZhbDtcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyTEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRVSW50MzIodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZFVJbnQzMih0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQ4ID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gIH1cblxuICBpZiAob2Zmc2V0ID49IHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgdmFyIG5lZyA9IHRoaXNbb2Zmc2V0XSAmIDB4ODA7XG4gIGlmIChuZWcpIHJldHVybiAoMHhmZiAtIHRoaXNbb2Zmc2V0XSArIDEpICogLTE7ZWxzZSByZXR1cm4gdGhpc1tvZmZzZXRdO1xufTtcblxuZnVuY3Rpb24gX3JlYWRJbnQxNihidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKTtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0ICsgMSA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGg7XG4gIGlmIChvZmZzZXQgPj0gbGVuKSByZXR1cm47XG5cbiAgdmFyIHZhbCA9IF9yZWFkVUludDE2KGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIHRydWUpO1xuICB2YXIgbmVnID0gdmFsICYgMHg4MDAwO1xuICBpZiAobmVnKSByZXR1cm4gKDB4ZmZmZiAtIHZhbCArIDEpICogLTE7ZWxzZSByZXR1cm4gdmFsO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkxFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkSW50MTYodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkJFID0gZnVuY3Rpb24gKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIF9yZWFkSW50MTYodGhpcywgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpO1xufTtcblxuZnVuY3Rpb24gX3JlYWRJbnQzMihidWYsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKTtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gcmVhZCBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGg7XG4gIGlmIChvZmZzZXQgPj0gbGVuKSByZXR1cm47XG5cbiAgdmFyIHZhbCA9IF9yZWFkVUludDMyKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIHRydWUpO1xuICB2YXIgbmVnID0gdmFsICYgMHg4MDAwMDAwMDtcbiAgaWYgKG5lZykgcmV0dXJuICgweGZmZmZmZmZmIC0gdmFsICsgMSkgKiAtMTtlbHNlIHJldHVybiB2YWw7XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyTEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRJbnQzMih0aGlzLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KTtcbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyQkUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWRJbnQzMih0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydCk7XG59O1xuXG5mdW5jdGlvbiBfcmVhZEZsb2F0KGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gIH1cblxuICByZXR1cm4gaWVlZTc1NC5yZWFkKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KTtcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRMRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEZsb2F0KHRoaXMsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZEZsb2F0KHRoaXMsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KTtcbn07XG5cbmZ1bmN0aW9uIF9yZWFkRG91YmxlKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgKyA3IDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byByZWFkIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gIH1cblxuICByZXR1cm4gaWVlZTc1NC5yZWFkKGJ1Ziwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KTtcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlTEUgPSBmdW5jdGlvbiAob2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gX3JlYWREb3VibGUodGhpcywgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVCRSA9IGZ1bmN0aW9uIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiBfcmVhZERvdWJsZSh0aGlzLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDggPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpO1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgPCB0aGlzLmxlbmd0aCwgJ3RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICAgIHZlcmlmdWludCh2YWx1ZSwgMHhmZik7XG4gIH1cblxuICBpZiAob2Zmc2V0ID49IHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgdGhpc1tvZmZzZXRdID0gdmFsdWU7XG59O1xuXG5mdW5jdGlvbiBfd3JpdGVVSW50MTYoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKTtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgKyAxIDwgYnVmLmxlbmd0aCwgJ3RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICAgIHZlcmlmdWludCh2YWx1ZSwgMHhmZmZmKTtcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoO1xuICBpZiAob2Zmc2V0ID49IGxlbikgcmV0dXJuO1xuXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4obGVuIC0gb2Zmc2V0LCAyKTsgaSA8IGo7IGkrKykge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9ICh2YWx1ZSAmIDB4ZmYgPDwgOCAqIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpKSA+Pj4gKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkgKiA4O1xuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpO1xufTtcblxuZnVuY3Rpb24gX3dyaXRlVUludDMyKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJyk7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKTtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICd0cnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgICB2ZXJpZnVpbnQodmFsdWUsIDB4ZmZmZmZmZmYpO1xuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGg7XG4gIGlmIChvZmZzZXQgPj0gbGVuKSByZXR1cm47XG5cbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihsZW4gLSBvZmZzZXQsIDQpOyBpIDwgajsgaSsrKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gdmFsdWUgPj4+IChsaXR0bGVFbmRpYW4gPyBpIDogMyAtIGkpICogOCAmIDB4ZmY7XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJyk7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCA8IHRoaXMubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gICAgdmVyaWZzaW50KHZhbHVlLCAweDdmLCAtMHg4MCk7XG4gIH1cblxuICBpZiAob2Zmc2V0ID49IHRoaXMubGVuZ3RoKSByZXR1cm47XG5cbiAgaWYgKHZhbHVlID49IDApIHRoaXMud3JpdGVVSW50OCh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCk7ZWxzZSB0aGlzLndyaXRlVUludDgoMHhmZiArIHZhbHVlICsgMSwgb2Zmc2V0LCBub0Fzc2VydCk7XG59O1xuXG5mdW5jdGlvbiBfd3JpdGVJbnQxNihidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpO1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJyk7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCArIDEgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gICAgdmVyaWZzaW50KHZhbHVlLCAweDdmZmYsIC0weDgwMDApO1xuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGg7XG4gIGlmIChvZmZzZXQgPj0gbGVuKSByZXR1cm47XG5cbiAgaWYgKHZhbHVlID49IDApIF93cml0ZVVJbnQxNihidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpO2Vsc2UgX3dyaXRlVUludDE2KGJ1ZiwgMHhmZmZmICsgdmFsdWUgKyAxLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpO1xufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZMRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZCRSA9IGZ1bmN0aW9uICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICBfd3JpdGVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpO1xufTtcblxuZnVuY3Rpb24gX3dyaXRlSW50MzIoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBhc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCAmJiB2YWx1ZSAhPT0gbnVsbCwgJ21pc3NpbmcgdmFsdWUnKTtcbiAgICBhc3NlcnQodHlwZW9mIGxpdHRsZUVuZGlhbiA9PT0gJ2Jvb2xlYW4nLCAnbWlzc2luZyBvciBpbnZhbGlkIGVuZGlhbicpO1xuICAgIGFzc2VydChvZmZzZXQgIT09IHVuZGVmaW5lZCAmJiBvZmZzZXQgIT09IG51bGwsICdtaXNzaW5nIG9mZnNldCcpO1xuICAgIGFzc2VydChvZmZzZXQgKyAzIDwgYnVmLmxlbmd0aCwgJ1RyeWluZyB0byB3cml0ZSBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpO1xuICAgIHZlcmlmc2ludCh2YWx1ZSwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApO1xuICB9XG5cbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGg7XG4gIGlmIChvZmZzZXQgPj0gbGVuKSByZXR1cm47XG5cbiAgaWYgKHZhbHVlID49IDApIF93cml0ZVVJbnQzMihidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpO2Vsc2UgX3dyaXRlVUludDMyKGJ1ZiwgMHhmZmZmZmZmZiArIHZhbHVlICsgMSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KTtcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyTEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyQkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KTtcbn07XG5cbmZ1bmN0aW9uIF93cml0ZUZsb2F0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgYXNzZXJ0KHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdmFsdWUgIT09IG51bGwsICdtaXNzaW5nIHZhbHVlJyk7XG4gICAgYXNzZXJ0KHR5cGVvZiBsaXR0bGVFbmRpYW4gPT09ICdib29sZWFuJywgJ21pc3Npbmcgb3IgaW52YWxpZCBlbmRpYW4nKTtcbiAgICBhc3NlcnQob2Zmc2V0ICE9PSB1bmRlZmluZWQgJiYgb2Zmc2V0ICE9PSBudWxsLCAnbWlzc2luZyBvZmZzZXQnKTtcbiAgICBhc3NlcnQob2Zmc2V0ICsgMyA8IGJ1Zi5sZW5ndGgsICdUcnlpbmcgdG8gd3JpdGUgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKTtcbiAgICB2ZXJpZklFRUU3NTQodmFsdWUsIDMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgsIC0zLjQwMjgyMzQ2NjM4NTI4ODZlKzM4KTtcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoO1xuICBpZiAob2Zmc2V0ID49IGxlbikgcmV0dXJuO1xuXG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KTtcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0TEUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpO1xufTtcblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0QkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KTtcbn07XG5cbmZ1bmN0aW9uIF93cml0ZURvdWJsZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGFzc2VydCh2YWx1ZSAhPT0gdW5kZWZpbmVkICYmIHZhbHVlICE9PSBudWxsLCAnbWlzc2luZyB2YWx1ZScpO1xuICAgIGFzc2VydCh0eXBlb2YgbGl0dGxlRW5kaWFuID09PSAnYm9vbGVhbicsICdtaXNzaW5nIG9yIGludmFsaWQgZW5kaWFuJyk7XG4gICAgYXNzZXJ0KG9mZnNldCAhPT0gdW5kZWZpbmVkICYmIG9mZnNldCAhPT0gbnVsbCwgJ21pc3Npbmcgb2Zmc2V0Jyk7XG4gICAgYXNzZXJ0KG9mZnNldCArIDcgPCBidWYubGVuZ3RoLCAnVHJ5aW5nIHRvIHdyaXRlIGJleW9uZCBidWZmZXIgbGVuZ3RoJyk7XG4gICAgdmVyaWZJRUVFNzU0KHZhbHVlLCAxLjc5NzY5MzEzNDg2MjMxNTdFKzMwOCwgLTEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4KTtcbiAgfVxuXG4gIHZhciBsZW4gPSBidWYubGVuZ3RoO1xuICBpZiAob2Zmc2V0ID49IGxlbikgcmV0dXJuO1xuXG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KTtcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUxFID0gZnVuY3Rpb24gKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIF93cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydCk7XG59O1xuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlQkUgPSBmdW5jdGlvbiAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgX3dyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydCk7XG59O1xuXG4vLyBmaWxsKHZhbHVlLCBzdGFydD0wLCBlbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uICh2YWx1ZSwgc3RhcnQsIGVuZCkge1xuICBpZiAoIXZhbHVlKSB2YWx1ZSA9IDA7XG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMDtcbiAgaWYgKCFlbmQpIGVuZCA9IHRoaXMubGVuZ3RoO1xuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFsdWUgPSB2YWx1ZS5jaGFyQ29kZUF0KDApO1xuICB9XG5cbiAgYXNzZXJ0KHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicgJiYgIWlzTmFOKHZhbHVlKSwgJ3ZhbHVlIGlzIG5vdCBhIG51bWJlcicpO1xuICBhc3NlcnQoZW5kID49IHN0YXJ0LCAnZW5kIDwgc3RhcnQnKTtcblxuICAvLyBGaWxsIDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVybjtcbiAgaWYgKHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgYXNzZXJ0KHN0YXJ0ID49IDAgJiYgc3RhcnQgPCB0aGlzLmxlbmd0aCwgJ3N0YXJ0IG91dCBvZiBib3VuZHMnKTtcbiAgYXNzZXJ0KGVuZCA+PSAwICYmIGVuZCA8PSB0aGlzLmxlbmd0aCwgJ2VuZCBvdXQgb2YgYm91bmRzJyk7XG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpKyspIHtcbiAgICB0aGlzW2ldID0gdmFsdWU7XG4gIH1cbn07XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgdmFyIG91dCA9IFtdO1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBvdXRbaV0gPSB0b0hleCh0aGlzW2ldKTtcbiAgICBpZiAoaSA9PT0gZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFUykge1xuICAgICAgb3V0W2kgKyAxXSA9ICcuLi4nO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiAnPEJ1ZmZlciAnICsgb3V0LmpvaW4oJyAnKSArICc+Jztcbn07XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBgQXJyYXlCdWZmZXJgIHdpdGggdGhlICpjb3BpZWQqIG1lbW9yeSBvZiB0aGUgYnVmZmVyIGluc3RhbmNlLlxuICogQWRkZWQgaW4gTm9kZSAwLjEyLiBPbmx5IGF2YWlsYWJsZSBpbiBicm93c2VycyB0aGF0IHN1cHBvcnQgQXJyYXlCdWZmZXIuXG4gKi9cbkJ1ZmZlci5wcm90b3R5cGUudG9BcnJheUJ1ZmZlciA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJykge1xuICAgIGlmIChCdWZmZXIuX3VzZVR5cGVkQXJyYXlzKSB7XG4gICAgICByZXR1cm4gbmV3IEJ1ZmZlcih0aGlzKS5idWZmZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBidWYgPSBuZXcgVWludDhBcnJheSh0aGlzLmxlbmd0aCk7XG4gICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYnVmLmxlbmd0aDsgaSA8IGxlbjsgaSArPSAxKSB7XG4gICAgICAgIGJ1ZltpXSA9IHRoaXNbaV07XG4gICAgICB9cmV0dXJuIGJ1Zi5idWZmZXI7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignQnVmZmVyLnRvQXJyYXlCdWZmZXIgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXInKTtcbiAgfVxufTtcblxuLy8gSEVMUEVSIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09PVxuXG5mdW5jdGlvbiBzdHJpbmd0cmltKHN0cikge1xuICBpZiAoc3RyLnRyaW0pIHJldHVybiBzdHIudHJpbSgpO1xuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbn1cblxudmFyIEJQID0gQnVmZmVyLnByb3RvdHlwZTtcblxuLyoqXG4gKiBBdWdtZW50IGEgVWludDhBcnJheSAqaW5zdGFuY2UqIChub3QgdGhlIFVpbnQ4QXJyYXkgY2xhc3MhKSB3aXRoIEJ1ZmZlciBtZXRob2RzXG4gKi9cbkJ1ZmZlci5fYXVnbWVudCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgYXJyLl9pc0J1ZmZlciA9IHRydWU7XG5cbiAgLy8gc2F2ZSByZWZlcmVuY2UgdG8gb3JpZ2luYWwgVWludDhBcnJheSBnZXQvc2V0IG1ldGhvZHMgYmVmb3JlIG92ZXJ3cml0aW5nXG4gIGFyci5fZ2V0ID0gYXJyLmdldDtcbiAgYXJyLl9zZXQgPSBhcnIuc2V0O1xuXG4gIC8vIGRlcHJlY2F0ZWQsIHdpbGwgYmUgcmVtb3ZlZCBpbiBub2RlIDAuMTMrXG4gIGFyci5nZXQgPSBCUC5nZXQ7XG4gIGFyci5zZXQgPSBCUC5zZXQ7XG5cbiAgYXJyLndyaXRlID0gQlAud3JpdGU7XG4gIGFyci50b1N0cmluZyA9IEJQLnRvU3RyaW5nO1xuICBhcnIudG9Mb2NhbGVTdHJpbmcgPSBCUC50b1N0cmluZztcbiAgYXJyLnRvSlNPTiA9IEJQLnRvSlNPTjtcbiAgYXJyLmNvcHkgPSBCUC5jb3B5O1xuICBhcnIuc2xpY2UgPSBCUC5zbGljZTtcbiAgYXJyLnJlYWRVSW50OCA9IEJQLnJlYWRVSW50ODtcbiAgYXJyLnJlYWRVSW50MTZMRSA9IEJQLnJlYWRVSW50MTZMRTtcbiAgYXJyLnJlYWRVSW50MTZCRSA9IEJQLnJlYWRVSW50MTZCRTtcbiAgYXJyLnJlYWRVSW50MzJMRSA9IEJQLnJlYWRVSW50MzJMRTtcbiAgYXJyLnJlYWRVSW50MzJCRSA9IEJQLnJlYWRVSW50MzJCRTtcbiAgYXJyLnJlYWRJbnQ4ID0gQlAucmVhZEludDg7XG4gIGFyci5yZWFkSW50MTZMRSA9IEJQLnJlYWRJbnQxNkxFO1xuICBhcnIucmVhZEludDE2QkUgPSBCUC5yZWFkSW50MTZCRTtcbiAgYXJyLnJlYWRJbnQzMkxFID0gQlAucmVhZEludDMyTEU7XG4gIGFyci5yZWFkSW50MzJCRSA9IEJQLnJlYWRJbnQzMkJFO1xuICBhcnIucmVhZEZsb2F0TEUgPSBCUC5yZWFkRmxvYXRMRTtcbiAgYXJyLnJlYWRGbG9hdEJFID0gQlAucmVhZEZsb2F0QkU7XG4gIGFyci5yZWFkRG91YmxlTEUgPSBCUC5yZWFkRG91YmxlTEU7XG4gIGFyci5yZWFkRG91YmxlQkUgPSBCUC5yZWFkRG91YmxlQkU7XG4gIGFyci53cml0ZVVJbnQ4ID0gQlAud3JpdGVVSW50ODtcbiAgYXJyLndyaXRlVUludDE2TEUgPSBCUC53cml0ZVVJbnQxNkxFO1xuICBhcnIud3JpdGVVSW50MTZCRSA9IEJQLndyaXRlVUludDE2QkU7XG4gIGFyci53cml0ZVVJbnQzMkxFID0gQlAud3JpdGVVSW50MzJMRTtcbiAgYXJyLndyaXRlVUludDMyQkUgPSBCUC53cml0ZVVJbnQzMkJFO1xuICBhcnIud3JpdGVJbnQ4ID0gQlAud3JpdGVJbnQ4O1xuICBhcnIud3JpdGVJbnQxNkxFID0gQlAud3JpdGVJbnQxNkxFO1xuICBhcnIud3JpdGVJbnQxNkJFID0gQlAud3JpdGVJbnQxNkJFO1xuICBhcnIud3JpdGVJbnQzMkxFID0gQlAud3JpdGVJbnQzMkxFO1xuICBhcnIud3JpdGVJbnQzMkJFID0gQlAud3JpdGVJbnQzMkJFO1xuICBhcnIud3JpdGVGbG9hdExFID0gQlAud3JpdGVGbG9hdExFO1xuICBhcnIud3JpdGVGbG9hdEJFID0gQlAud3JpdGVGbG9hdEJFO1xuICBhcnIud3JpdGVEb3VibGVMRSA9IEJQLndyaXRlRG91YmxlTEU7XG4gIGFyci53cml0ZURvdWJsZUJFID0gQlAud3JpdGVEb3VibGVCRTtcbiAgYXJyLmZpbGwgPSBCUC5maWxsO1xuICBhcnIuaW5zcGVjdCA9IEJQLmluc3BlY3Q7XG4gIGFyci50b0FycmF5QnVmZmVyID0gQlAudG9BcnJheUJ1ZmZlcjtcblxuICByZXR1cm4gYXJyO1xufTtcblxuLy8gc2xpY2Uoc3RhcnQsIGVuZClcbmZ1bmN0aW9uIGNsYW1wKGluZGV4LCBsZW4sIGRlZmF1bHRWYWx1ZSkge1xuICBpZiAodHlwZW9mIGluZGV4ICE9PSAnbnVtYmVyJykgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgaW5kZXggPSB+fmluZGV4OyAvLyBDb2VyY2UgdG8gaW50ZWdlci5cbiAgaWYgKGluZGV4ID49IGxlbikgcmV0dXJuIGxlbjtcbiAgaWYgKGluZGV4ID49IDApIHJldHVybiBpbmRleDtcbiAgaW5kZXggKz0gbGVuO1xuICBpZiAoaW5kZXggPj0gMCkgcmV0dXJuIGluZGV4O1xuICByZXR1cm4gMDtcbn1cblxuZnVuY3Rpb24gY29lcmNlKGxlbmd0aCkge1xuICAvLyBDb2VyY2UgbGVuZ3RoIHRvIGEgbnVtYmVyIChwb3NzaWJseSBOYU4pLCByb3VuZCB1cFxuICAvLyBpbiBjYXNlIGl0J3MgZnJhY3Rpb25hbCAoZS5nLiAxMjMuNDU2KSB0aGVuIGRvIGFcbiAgLy8gZG91YmxlIG5lZ2F0ZSB0byBjb2VyY2UgYSBOYU4gdG8gMC4gRWFzeSwgcmlnaHQ/XG4gIGxlbmd0aCA9IH5+TWF0aC5jZWlsKCtsZW5ndGgpO1xuICByZXR1cm4gbGVuZ3RoIDwgMCA/IDAgOiBsZW5ndGg7XG59XG5cbmZ1bmN0aW9uIGlzQXJyYXkoc3ViamVjdCkge1xuICByZXR1cm4gKEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKHN1YmplY3QpIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHN1YmplY3QpID09PSAnW29iamVjdCBBcnJheV0nO1xuICB9KShzdWJqZWN0KTtcbn1cblxuZnVuY3Rpb24gaXNBcnJheWlzaChzdWJqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5KHN1YmplY3QpIHx8IEJ1ZmZlci5pc0J1ZmZlcihzdWJqZWN0KSB8fCBzdWJqZWN0ICYmICh0eXBlb2Ygc3ViamVjdCA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2Yoc3ViamVjdCkpID09PSAnb2JqZWN0JyAmJiB0eXBlb2Ygc3ViamVjdC5sZW5ndGggPT09ICdudW1iZXInO1xufVxuXG5mdW5jdGlvbiB0b0hleChuKSB7XG4gIGlmIChuIDwgMTYpIHJldHVybiAnMCcgKyBuLnRvU3RyaW5nKDE2KTtcbiAgcmV0dXJuIG4udG9TdHJpbmcoMTYpO1xufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyhzdHIpIHtcbiAgdmFyIGJ5dGVBcnJheSA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIHZhciBiID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgaWYgKGIgPD0gMHg3RikgYnl0ZUFycmF5LnB1c2goc3RyLmNoYXJDb2RlQXQoaSkpO2Vsc2Uge1xuICAgICAgdmFyIHN0YXJ0ID0gaTtcbiAgICAgIGlmIChiID49IDB4RDgwMCAmJiBiIDw9IDB4REZGRikgaSsrO1xuICAgICAgdmFyIGggPSBlbmNvZGVVUklDb21wb25lbnQoc3RyLnNsaWNlKHN0YXJ0LCBpICsgMSkpLnN1YnN0cigxKS5zcGxpdCgnJScpO1xuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBoLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGJ5dGVBcnJheS5wdXNoKHBhcnNlSW50KGhbal0sIDE2KSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBieXRlQXJyYXk7XG59XG5cbmZ1bmN0aW9uIGFzY2lpVG9CeXRlcyhzdHIpIHtcbiAgdmFyIGJ5dGVBcnJheSA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7IGkrKykge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRik7XG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheTtcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVRvQnl0ZXMoc3RyKSB7XG4gIHZhciBjLCBoaSwgbG87XG4gIHZhciBieXRlQXJyYXkgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyBpKyspIHtcbiAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgaGkgPSBjID4+IDg7XG4gICAgbG8gPSBjICUgMjU2O1xuICAgIGJ5dGVBcnJheS5wdXNoKGxvKTtcbiAgICBieXRlQXJyYXkucHVzaChoaSk7XG4gIH1cblxuICByZXR1cm4gYnl0ZUFycmF5O1xufVxuXG5mdW5jdGlvbiBiYXNlNjRUb0J5dGVzKHN0cikge1xuICByZXR1cm4gYmFzZTY0LnRvQnl0ZUFycmF5KHN0cik7XG59XG5cbmZ1bmN0aW9uIGJsaXRCdWZmZXIoc3JjLCBkc3QsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHZhciBwb3M7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoaSArIG9mZnNldCA+PSBkc3QubGVuZ3RoIHx8IGkgPj0gc3JjLmxlbmd0aCkgYnJlYWs7XG4gICAgZHN0W2kgKyBvZmZzZXRdID0gc3JjW2ldO1xuICB9XG4gIHJldHVybiBpO1xufVxuXG5mdW5jdGlvbiBkZWNvZGVVdGY4Q2hhcihzdHIpIHtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHN0cik7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKDB4RkZGRCk7IC8vIFVURiA4IGludmFsaWQgY2hhclxuICB9XG59XG5cbi8qXG4gKiBXZSBoYXZlIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSB2YWx1ZSBpcyBhIHZhbGlkIGludGVnZXIuIFRoaXMgbWVhbnMgdGhhdCBpdFxuICogaXMgbm9uLW5lZ2F0aXZlLiBJdCBoYXMgbm8gZnJhY3Rpb25hbCBjb21wb25lbnQgYW5kIHRoYXQgaXQgZG9lcyBub3RcbiAqIGV4Y2VlZCB0aGUgbWF4aW11bSBhbGxvd2VkIHZhbHVlLlxuICovXG5mdW5jdGlvbiB2ZXJpZnVpbnQodmFsdWUsIG1heCkge1xuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJywgJ2Nhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXInKTtcbiAgYXNzZXJ0KHZhbHVlID49IDAsICdzcGVjaWZpZWQgYSBuZWdhdGl2ZSB2YWx1ZSBmb3Igd3JpdGluZyBhbiB1bnNpZ25lZCB2YWx1ZScpO1xuICBhc3NlcnQodmFsdWUgPD0gbWF4LCAndmFsdWUgaXMgbGFyZ2VyIHRoYW4gbWF4aW11bSB2YWx1ZSBmb3IgdHlwZScpO1xuICBhc3NlcnQoTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlLCAndmFsdWUgaGFzIGEgZnJhY3Rpb25hbCBjb21wb25lbnQnKTtcbn1cblxuZnVuY3Rpb24gdmVyaWZzaW50KHZhbHVlLCBtYXgsIG1pbikge1xuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJywgJ2Nhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXInKTtcbiAgYXNzZXJ0KHZhbHVlIDw9IG1heCwgJ3ZhbHVlIGxhcmdlciB0aGFuIG1heGltdW0gYWxsb3dlZCB2YWx1ZScpO1xuICBhc3NlcnQodmFsdWUgPj0gbWluLCAndmFsdWUgc21hbGxlciB0aGFuIG1pbmltdW0gYWxsb3dlZCB2YWx1ZScpO1xuICBhc3NlcnQoTWF0aC5mbG9vcih2YWx1ZSkgPT09IHZhbHVlLCAndmFsdWUgaGFzIGEgZnJhY3Rpb25hbCBjb21wb25lbnQnKTtcbn1cblxuZnVuY3Rpb24gdmVyaWZJRUVFNzU0KHZhbHVlLCBtYXgsIG1pbikge1xuICBhc3NlcnQodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJywgJ2Nhbm5vdCB3cml0ZSBhIG5vbi1udW1iZXIgYXMgYSBudW1iZXInKTtcbiAgYXNzZXJ0KHZhbHVlIDw9IG1heCwgJ3ZhbHVlIGxhcmdlciB0aGFuIG1heGltdW0gYWxsb3dlZCB2YWx1ZScpO1xuICBhc3NlcnQodmFsdWUgPj0gbWluLCAndmFsdWUgc21hbGxlciB0aGFuIG1pbmltdW0gYWxsb3dlZCB2YWx1ZScpO1xufVxuXG5mdW5jdGlvbiBhc3NlcnQodGVzdCwgbWVzc2FnZSkge1xuICBpZiAoIXRlc3QpIHRocm93IG5ldyBFcnJvcihtZXNzYWdlIHx8ICdGYWlsZWQgYXNzZXJ0aW9uJyk7XG59XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbWx1WkdWNExtcHpJbDBzSW01aGJXVnpJanBiSW1KaGMyVTJOQ0lzSW5KbGNYVnBjbVVpTENKcFpXVmxOelUwSWl3aVpYaHdiM0owY3lJc0lrSjFabVpsY2lJc0lsTnNiM2RDZFdabVpYSWlMQ0pKVGxOUVJVTlVYMDFCV0Y5Q1dWUkZVeUlzSW5CdmIyeFRhWHBsSWl3aVgzVnpaVlI1Y0dWa1FYSnlZWGx6SWl3aVluVm1JaXdpUVhKeVlYbENkV1ptWlhJaUxDSmhjbklpTENKVmFXNTBPRUZ5Y21GNUlpd2labTl2SWl3aWMzVmlZWEp5WVhraUxDSmxJaXdpYzNWaWFtVmpkQ0lzSW1WdVkyOWthVzVuSWl3aWJtOWFaWEp2SWl3aWRIbHdaU0lzSW5OMGNtbHVaM1J5YVcwaUxDSnNaVzVuZEdnaUxDSmpiMlZ5WTJVaUxDSmllWFJsVEdWdVozUm9JaXdpUlhKeWIzSWlMQ0pmWVhWbmJXVnVkQ0lzSWw5cGMwSjFabVpsY2lJc0lta2lMQ0pmYzJWMElpd2lhWE5CY25KaGVXbHphQ0lzSW1selFuVm1abVZ5SWl3aWNtVmhaRlZKYm5RNElpd2lkM0pwZEdVaUxDSnBjMFZ1WTI5a2FXNW5JaXdpVTNSeWFXNW5JaXdpZEc5TWIzZGxja05oYzJVaUxDSmlJaXdpZFc1a1pXWnBibVZrSWl3aWMzUnlJaXdpY21WMElpd2lkWFJtT0ZSdlFubDBaWE1pTENKaVlYTmxOalJVYjBKNWRHVnpJaXdpWTI5dVkyRjBJaXdpYkdsemRDSXNJblJ2ZEdGc1RHVnVaM1JvSWl3aVlYTnpaWEowSWl3aWFYTkJjbkpoZVNJc0luQnZjeUlzSW1sMFpXMGlMQ0pqYjNCNUlpd2lYMmhsZUZkeWFYUmxJaXdpYzNSeWFXNW5JaXdpYjJabWMyVjBJaXdpVG5WdFltVnlJaXdpY21WdFlXbHVhVzVuSWl3aWMzUnlUR1Z1SWl3aVlubDBaU0lzSW5CaGNuTmxTVzUwSWl3aWMzVmljM1J5SWl3aWFYTk9ZVTRpTENKZlkyaGhjbk5YY21sMGRHVnVJaXdpWDNWMFpqaFhjbWwwWlNJc0ltTm9ZWEp6VjNKcGRIUmxiaUlzSW1Kc2FYUkNkV1ptWlhJaUxDSmZZWE5qYVdsWGNtbDBaU0lzSW1GelkybHBWRzlDZVhSbGN5SXNJbDlpYVc1aGNubFhjbWwwWlNJc0lsOWlZWE5sTmpSWGNtbDBaU0lzSWw5MWRHWXhObXhsVjNKcGRHVWlMQ0oxZEdZeE5teGxWRzlDZVhSbGN5SXNJbkJ5YjNSdmRIbHdaU0lzSW1selJtbHVhWFJsSWl3aWMzZGhjQ0lzSW5SdlUzUnlhVzVuSWl3aWMzUmhjblFpTENKbGJtUWlMQ0p6Wld4bUlpd2lYMmhsZUZOc2FXTmxJaXdpWDNWMFpqaFRiR2xqWlNJc0lsOWhjMk5wYVZOc2FXTmxJaXdpWDJKcGJtRnllVk5zYVdObElpd2lYMkpoYzJVMk5GTnNhV05sSWl3aVgzVjBaakUyYkdWVGJHbGpaU0lzSW5SdlNsTlBUaUlzSW1SaGRHRWlMQ0pCY25KaGVTSXNJbk5zYVdObElpd2lZMkZzYkNJc0lsOWhjbklpTENKMFlYSm5aWFFpTENKMFlYSm5aWFJmYzNSaGNuUWlMQ0p6YjNWeVkyVWlMQ0pzWlc0aUxDSm1jbTl0UW5sMFpVRnljbUY1SWl3aWNtVnpJaXdpZEcxd0lpd2lUV0YwYUNJc0ltMXBiaUlzSW1SbFkyOWtaVlYwWmpoRGFHRnlJaXdpWm5KdmJVTm9ZWEpEYjJSbElpd2liM1YwSWl3aWRHOUlaWGdpTENKaWVYUmxjeUlzSW1Oc1lXMXdJaXdpYzJ4cFkyVk1aVzRpTENKdVpYZENkV1lpTENKblpYUWlMQ0pqYjI1emIyeGxJaXdpYkc5bklpd2ljMlYwSWl3aWRpSXNJbmR5YVhSbFZVbHVkRGdpTENKdWIwRnpjMlZ5ZENJc0lsOXlaV0ZrVlVsdWRERTJJaXdpYkdsMGRHeGxSVzVrYVdGdUlpd2lkbUZzSWl3aWNtVmhaRlZKYm5ReE5reEZJaXdpY21WaFpGVkpiblF4TmtKRklpd2lYM0psWVdSVlNXNTBNeklpTENKeVpXRmtWVWx1ZERNeVRFVWlMQ0p5WldGa1ZVbHVkRE15UWtVaUxDSnlaV0ZrU1c1ME9DSXNJbTVsWnlJc0lsOXlaV0ZrU1c1ME1UWWlMQ0p5WldGa1NXNTBNVFpNUlNJc0luSmxZV1JKYm5ReE5rSkZJaXdpWDNKbFlXUkpiblF6TWlJc0luSmxZV1JKYm5Rek1reEZJaXdpY21WaFpFbHVkRE15UWtVaUxDSmZjbVZoWkVac2IyRjBJaXdpY21WaFpDSXNJbkpsWVdSR2JHOWhkRXhGSWl3aWNtVmhaRVpzYjJGMFFrVWlMQ0pmY21WaFpFUnZkV0pzWlNJc0luSmxZV1JFYjNWaWJHVk1SU0lzSW5KbFlXUkViM1ZpYkdWQ1JTSXNJblpoYkhWbElpd2lkbVZ5YVdaMWFXNTBJaXdpWDNkeWFYUmxWVWx1ZERFMklpd2lhaUlzSW5keWFYUmxWVWx1ZERFMlRFVWlMQ0ozY21sMFpWVkpiblF4TmtKRklpd2lYM2R5YVhSbFZVbHVkRE15SWl3aWQzSnBkR1ZWU1c1ME16Sk1SU0lzSW5keWFYUmxWVWx1ZERNeVFrVWlMQ0ozY21sMFpVbHVkRGdpTENKMlpYSnBabk5wYm5RaUxDSmZkM0pwZEdWSmJuUXhOaUlzSW5keWFYUmxTVzUwTVRaTVJTSXNJbmR5YVhSbFNXNTBNVFpDUlNJc0lsOTNjbWwwWlVsdWRETXlJaXdpZDNKcGRHVkpiblF6TWt4Rklpd2lkM0pwZEdWSmJuUXpNa0pGSWl3aVgzZHlhWFJsUm14dllYUWlMQ0oyWlhKcFprbEZSVVUzTlRRaUxDSjNjbWwwWlVac2IyRjBURVVpTENKM2NtbDBaVVpzYjJGMFFrVWlMQ0pmZDNKcGRHVkViM1ZpYkdVaUxDSjNjbWwwWlVSdmRXSnNaVXhGSWl3aWQzSnBkR1ZFYjNWaWJHVkNSU0lzSW1acGJHd2lMQ0pqYUdGeVEyOWtaVUYwSWl3aWFXNXpjR1ZqZENJc0ltcHZhVzRpTENKMGIwRnljbUY1UW5WbVptVnlJaXdpWW5WbVptVnlJaXdpZEhKcGJTSXNJbkpsY0d4aFkyVWlMQ0pDVUNJc0lsOW5aWFFpTENKMGIweHZZMkZzWlZOMGNtbHVaeUlzSW1sdVpHVjRJaXdpWkdWbVlYVnNkRlpoYkhWbElpd2lZMlZwYkNJc0lrOWlhbVZqZENJc0ltNGlMQ0ppZVhSbFFYSnlZWGtpTENKd2RYTm9JaXdpYUNJc0ltVnVZMjlrWlZWU1NVTnZiWEJ2Ym1WdWRDSXNJbk53YkdsMElpd2lZeUlzSW1ocElpd2liRzhpTENKMGIwSjVkR1ZCY25KaGVTSXNJbk55WXlJc0ltUnpkQ0lzSW1SbFkyOWtaVlZTU1VOdmJYQnZibVZ1ZENJc0ltVnljaUlzSW0xaGVDSXNJbVpzYjI5eUlpd2lkR1Z6ZENJc0ltMWxjM05oWjJVaVhTd2liV0Z3Y0dsdVozTWlPaUk3T3pzN1FVRkJRVHM3T3pzN096dEJRVTlCTEVsQlFVbEJMRk5CUVZORExGRkJRVkVzVjBGQlVpeERRVUZpTzBGQlEwRXNTVUZCU1VNc1ZVRkJWVVFzVVVGQlVTeFRRVUZTTEVOQlFXUTdPMEZCUlVGRkxGRkJRVkZETEUxQlFWSXNSMEZCYVVKQkxFMUJRV3BDTzBGQlEwRkVMRkZCUVZGRkxGVkJRVklzUjBGQmNVSkVMRTFCUVhKQ08wRkJRMEZFTEZGQlFWRkhMR2xDUVVGU0xFZEJRVFJDTEVWQlFUVkNPMEZCUTBGR0xFOUJRVTlITEZGQlFWQXNSMEZCYTBJc1NVRkJiRUk3TzBGQlJVRTdPenM3TzBGQlMwRklMRTlCUVU5SkxHVkJRVkFzUjBGQk1FSXNXVUZCV1R0QlFVTndRenRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRXNUVUZCU1R0QlFVTkdMRkZCUVVsRExFMUJRVTBzU1VGQlNVTXNWMEZCU2l4RFFVRm5RaXhEUVVGb1FpeERRVUZXTzBGQlEwRXNVVUZCU1VNc1RVRkJUU3hKUVVGSlF5eFZRVUZLTEVOQlFXVklMRWRCUVdZc1EwRkJWanRCUVVOQlJTeFJRVUZKUlN4SFFVRktMRWRCUVZVc1dVRkJXVHRCUVVGRkxHRkJRVThzUlVGQlVEdEJRVUZYTEV0QlFXNURPMEZCUTBFc1YwRkJUeXhQUVVGUFJpeEpRVUZKUlN4SFFVRktMRVZCUVZBc1NVRkRTQ3hQUVVGUFJpeEpRVUZKUnl4UlFVRllMRXRCUVhkQ0xGVkJSRFZDTEVOQlNrVXNRMEZMY1VNN1FVRkRlRU1zUjBGT1JDeERRVTFGTEU5QlFVOURMRU5CUVZBc1JVRkJWVHRCUVVOV0xGZEJRVThzUzBGQlVEdEJRVU5FTzBGQlEwWXNRMEZtZDBJc1JVRkJla0k3TzBGQmFVSkJPenM3T3pzN096czdPenM3UVVGWlFTeFRRVUZUV0N4TlFVRlVMRU5CUVdsQ1dTeFBRVUZxUWl4RlFVRXdRa01zVVVGQk1VSXNSVUZCYjBORExFMUJRWEJETEVWQlFUUkRPMEZCUXpGRExFMUJRVWtzUlVGQlJTeG5Ra0ZCWjBKa0xFMUJRV3hDTEVOQlFVb3NSVUZEUlN4UFFVRlBMRWxCUVVsQkxFMUJRVW9zUTBGQlYxa3NUMEZCV0N4RlFVRnZRa01zVVVGQmNFSXNSVUZCT0VKRExFMUJRVGxDTEVOQlFWQTdPMEZCUlVZc1RVRkJTVU1zWTBGQlkwZ3NUMEZCWkN4NVEwRkJZMEVzVDBGQlpDeERRVUZLT3p0QlFVVkJPMEZCUTBFN1FVRkRRU3hOUVVGSlF5eGhRVUZoTEZGQlFXSXNTVUZCZVVKRkxGTkJRVk1zVVVGQmRFTXNSVUZCWjBRN1FVRkRPVU5JTEdOQlFWVkpMRmRCUVZkS0xFOUJRVmdzUTBGQlZqdEJRVU5CTEZkQlFVOUJMRkZCUVZGTExFMUJRVklzUjBGQmFVSXNRMEZCYWtJc1MwRkJkVUlzUTBGQk9VSXNSVUZCYVVNN1FVRkRMMEpNTEdkQ1FVRlZRU3hWUVVGVkxFZEJRWEJDTzBGQlEwUTdRVUZEUmpzN1FVRkZSRHRCUVVOQkxFMUJRVWxMTEUxQlFVbzdRVUZEUVN4TlFVRkpSaXhUUVVGVExGRkJRV0lzUlVGRFJVVXNVMEZCVTBNc1QwRkJUMDRzVDBGQlVDeERRVUZVTEVOQlJFWXNTMEZGU3l4SlFVRkpSeXhUUVVGVExGRkJRV0lzUlVGRFNFVXNVMEZCVTJwQ0xFOUJRVTl0UWl4VlFVRlFMRU5CUVd0Q1VDeFBRVUZzUWl4RlFVRXlRa01zVVVGQk0wSXNRMEZCVkN4RFFVUkhMRXRCUlVFc1NVRkJTVVVzVTBGQlV5eFJRVUZpTEVWQlEwaEZMRk5CUVZORExFOUJRVTlPTEZGQlFWRkxMRTFCUVdZc1EwRkJWQ3hEUVVSSExFTkJRelpDTzBGQlJEZENMRTlCUjBnc1RVRkJUU3hKUVVGSlJ5eExRVUZLTEVOQlFWVXNkVVJCUVZZc1EwRkJUanM3UVVGRlJpeE5RVUZKWml4SFFVRktPMEZCUTBFc1RVRkJTVXdzVDBGQlQwa3NaVUZCV0N4RlFVRTBRanRCUVVNeFFqdEJRVU5CUXl4VlFVRk5UQ3hQUVVGUGNVSXNVVUZCVUN4RFFVRm5RaXhKUVVGSllpeFZRVUZLTEVOQlFXVlRMRTFCUVdZc1EwRkJhRUlzUTBGQlRqdEJRVU5FTEVkQlNFUXNUVUZIVHp0QlFVTk1PMEZCUTBGYUxGVkJRVTBzU1VGQlRqdEJRVU5CUVN4UlFVRkpXU3hOUVVGS0xFZEJRV0ZCTEUxQlFXSTdRVUZEUVZvc1VVRkJTV2xDTEZOQlFVb3NSMEZCWjBJc1NVRkJhRUk3UVVGRFJEczdRVUZGUkN4TlFVRkpReXhEUVVGS08wRkJRMEVzVFVGQlNYWkNMRTlCUVU5SkxHVkJRVkFzU1VGQk1FSXNUMEZCVDFFc1VVRkJVVThzVlVGQlppeExRVUU0UWl4UlFVRTFSQ3hGUVVGelJUdEJRVU53UlR0QlFVTkJaQ3hSUVVGSmJVSXNTVUZCU2l4RFFVRlRXaXhQUVVGVU8wRkJRMFFzUjBGSVJDeE5RVWRQTEVsQlFVbGhMRmRCUVZkaUxFOUJRVmdzUTBGQlNpeEZRVUY1UWp0QlFVTTVRanRCUVVOQkxGTkJRVXRYTEVsQlFVa3NRMEZCVkN4RlFVRlpRU3hKUVVGSlRpeE5RVUZvUWl4RlFVRjNRazBzUjBGQmVFSXNSVUZCTmtJN1FVRkRNMElzVlVGQlNYWkNMRTlCUVU4d1FpeFJRVUZRTEVOQlFXZENaQ3hQUVVGb1FpeERRVUZLTEVWQlEwVlFMRWxCUVVsclFpeERRVUZLTEVsQlFWTllMRkZCUVZGbExGTkJRVklzUTBGQmEwSktMRU5CUVd4Q0xFTkJRVlFzUTBGRVJpeExRVWRGYkVJc1NVRkJTV3RDTEVOQlFVb3NTVUZCVTFnc1VVRkJVVmNzUTBGQlVpeERRVUZVTzBGQlEwZzdRVUZEUml4SFFWSk5MRTFCVVVFc1NVRkJTVklzVTBGQlV5eFJRVUZpTEVWQlFYVkNPMEZCUXpWQ1ZpeFJRVUZKZFVJc1MwRkJTaXhEUVVGVmFFSXNUMEZCVml4RlFVRnRRaXhEUVVGdVFpeEZRVUZ6UWtNc1VVRkJkRUk3UVVGRFJDeEhRVVpOTEUxQlJVRXNTVUZCU1VVc1UwRkJVeXhSUVVGVUxFbEJRWEZDTEVOQlFVTm1MRTlCUVU5SkxHVkJRVGRDTEVsQlFXZEVMRU5CUVVOVkxFMUJRWEpFTEVWQlFUWkVPMEZCUTJ4RkxGTkJRVXRUTEVsQlFVa3NRMEZCVkN4RlFVRlpRU3hKUVVGSlRpeE5RVUZvUWl4RlFVRjNRazBzUjBGQmVFSXNSVUZCTmtJN1FVRkRNMEpzUWl4VlFVRkphMElzUTBGQlNpeEpRVUZUTEVOQlFWUTdRVUZEUkR0QlFVTkdPenRCUVVWRUxGTkJRVTlzUWl4SFFVRlFPMEZCUTBRN08wRkJSVVE3UVVGRFFUczdRVUZGUVV3c1QwRkJUelpDTEZWQlFWQXNSMEZCYjBJc1ZVRkJWV2hDTEZGQlFWWXNSVUZCYjBJN1FVRkRkRU1zVlVGQlVXbENMRTlCUVU5cVFpeFJRVUZRTEVWQlFXbENhMElzVjBGQmFrSXNSVUZCVWp0QlFVTkZMRk5CUVVzc1MwRkJURHRCUVVOQkxGTkJRVXNzVFVGQlREdEJRVU5CTEZOQlFVc3NUMEZCVER0QlFVTkJMRk5CUVVzc1QwRkJURHRCUVVOQkxGTkJRVXNzVVVGQlREdEJRVU5CTEZOQlFVc3NVVUZCVER0QlFVTkJMRk5CUVVzc1MwRkJURHRCUVVOQkxGTkJRVXNzVFVGQlREdEJRVU5CTEZOQlFVc3NUMEZCVER0QlFVTkJMRk5CUVVzc1UwRkJURHRCUVVOQkxGTkJRVXNzVlVGQlREdEJRVU5GTEdGQlFVOHNTVUZCVUR0QlFVTkdPMEZCUTBVc1lVRkJUeXhMUVVGUU8wRkJaRW83UVVGblFrUXNRMEZxUWtRN08wRkJiVUpCTDBJc1QwRkJUekJDTEZGQlFWQXNSMEZCYTBJc1ZVRkJWVTBzUTBGQlZpeEZRVUZoTzBGQlF6ZENMRk5CUVU4c1EwRkJReXhGUVVGRlFTeE5RVUZOTEVsQlFVNHNTVUZCWTBFc1RVRkJUVU1zVTBGQmNFSXNTVUZCYVVORUxFVkJRVVZXTEZOQlFYSkRMRU5CUVZJN1FVRkRSQ3hEUVVaRU96dEJRVWxCZEVJc1QwRkJUMjFDTEZWQlFWQXNSMEZCYjBJc1ZVRkJWV1VzUjBGQlZpeEZRVUZsY2tJc1VVRkJaaXhGUVVGNVFqdEJRVU16UXl4TlFVRkpjMElzUjBGQlNqdEJRVU5CUkN4UlFVRk5RU3hOUVVGTkxFVkJRVm83UVVGRFFTeFZRVUZSY2tJc1dVRkJXU3hOUVVGd1FqdEJRVU5GTEZOQlFVc3NTMEZCVER0QlFVTkZjMElzV1VGQlRVUXNTVUZCU1dwQ0xFMUJRVW9zUjBGQllTeERRVUZ1UWp0QlFVTkJPMEZCUTBZc1UwRkJTeXhOUVVGTU8wRkJRMEVzVTBGQlN5eFBRVUZNTzBGQlEwVnJRaXhaUVVGTlF5eFpRVUZaUml4SFFVRmFMRVZCUVdsQ2FrSXNUVUZCZGtJN1FVRkRRVHRCUVVOR0xGTkJRVXNzVDBGQlREdEJRVU5CTEZOQlFVc3NVVUZCVER0QlFVTkJMRk5CUVVzc1MwRkJURHRCUVVORmEwSXNXVUZCVFVRc1NVRkJTV3BDTEUxQlFWWTdRVUZEUVR0QlFVTkdMRk5CUVVzc1VVRkJURHRCUVVORmEwSXNXVUZCVFVVc1kwRkJZMGdzUjBGQlpDeEZRVUZ0UW1wQ0xFMUJRWHBDTzBGQlEwRTdRVUZEUml4VFFVRkxMRTFCUVV3N1FVRkRRU3hUUVVGTExFOUJRVXc3UVVGRFFTeFRRVUZMTEZOQlFVdzdRVUZEUVN4VFFVRkxMRlZCUVV3N1FVRkRSV3RDTEZsQlFVMUVMRWxCUVVscVFpeE5RVUZLTEVkQlFXRXNRMEZCYmtJN1FVRkRRVHRCUVVOR08wRkJRMFVzV1VGQlRTeEpRVUZKUnl4TFFVRktMRU5CUVZVc2EwSkJRVllzUTBGQlRqdEJRWFpDU2p0QlFYbENRU3hUUVVGUFpTeEhRVUZRTzBGQlEwUXNRMEUzUWtRN08wRkJLMEpCYmtNc1QwRkJUM05ETEUxQlFWQXNSMEZCWjBJc1ZVRkJWVU1zU1VGQlZpeEZRVUZuUWtNc1YwRkJhRUlzUlVGQk5rSTdRVUZETTBORExGTkJRVTlETEZGQlFWRklMRWxCUVZJc1EwRkJVQ3hGUVVGelFpeG5SRUZEYkVJc01FSkJSRW83TzBGQlIwRXNUVUZCU1VFc1MwRkJTM1JDTEUxQlFVd3NTMEZCWjBJc1EwRkJjRUlzUlVGQmRVSTdRVUZEY2tJc1YwRkJUeXhKUVVGSmFrSXNUVUZCU2l4RFFVRlhMRU5CUVZnc1EwRkJVRHRCUVVORUxFZEJSa1FzVFVGRlR5eEpRVUZKZFVNc1MwRkJTM1JDTEUxQlFVd3NTMEZCWjBJc1EwRkJjRUlzUlVGQmRVSTdRVUZETlVJc1YwRkJUM05DTEV0QlFVc3NRMEZCVEN4RFFVRlFPMEZCUTBRN08wRkJSVVFzVFVGQlNXaENMRU5CUVVvN1FVRkRRU3hOUVVGSkxFOUJRVTlwUWl4WFFVRlFMRXRCUVhWQ0xGRkJRVE5DTEVWQlFYRkRPMEZCUTI1RFFTeHJRa0ZCWXl4RFFVRmtPMEZCUTBFc1UwRkJTMnBDTEVsQlFVa3NRMEZCVkN4RlFVRlpRU3hKUVVGSlowSXNTMEZCUzNSQ0xFMUJRWEpDTEVWQlFUWkNUU3hIUVVFM1FpeEZRVUZyUXp0QlFVTm9RMmxDTEhGQ1FVRmxSQ3hMUVVGTGFFSXNRMEZCVEN4RlFVRlJUaXhOUVVGMlFqdEJRVU5FTzBGQlEwWTdPMEZCUlVRc1RVRkJTVm9zVFVGQlRTeEpRVUZKVEN4TlFVRktMRU5CUVZkM1F5eFhRVUZZTEVOQlFWWTdRVUZEUVN4TlFVRkpSeXhOUVVGTkxFTkJRVlk3UVVGRFFTeFBRVUZMY0VJc1NVRkJTU3hEUVVGVUxFVkJRVmxCTEVsQlFVbG5RaXhMUVVGTGRFSXNUVUZCY2tJc1JVRkJOa0pOTEVkQlFUZENMRVZCUVd0RE8wRkJRMmhETEZGQlFVbHhRaXhQUVVGUFRDeExRVUZMYUVJc1EwRkJUQ3hEUVVGWU8wRkJRMEZ4UWl4VFFVRkxReXhKUVVGTUxFTkJRVlY0UXl4SFFVRldMRVZCUVdWelF5eEhRVUZtTzBGQlEwRkJMRmRCUVU5RExFdEJRVXN6UWl4TlFVRmFPMEZCUTBRN1FVRkRSQ3hUUVVGUFdpeEhRVUZRTzBGQlEwUXNRMEV4UWtRN08wRkJORUpCTzBGQlEwRTdPMEZCUlVFc1UwRkJVM2xETEZOQlFWUXNRMEZCYjBKNlF5eEhRVUZ3UWl4RlFVRjVRakJETEUxQlFYcENMRVZCUVdsRFF5eE5RVUZxUXl4RlFVRjVReTlDTEUxQlFYcERMRVZCUVdsRU8wRkJReTlESzBJc1YwRkJVME1zVDBGQlQwUXNUVUZCVUN4TFFVRnJRaXhEUVVFelFqdEJRVU5CTEUxQlFVbEZMRmxCUVZrM1F5eEpRVUZKV1N4TlFVRktMRWRCUVdFclFpeE5RVUUzUWp0QlFVTkJMRTFCUVVrc1EwRkJReTlDTEUxQlFVd3NSVUZCWVR0QlFVTllRU3hoUVVGVGFVTXNVMEZCVkR0QlFVTkVMRWRCUmtRc1RVRkZUenRCUVVOTWFrTXNZVUZCVTJkRExFOUJRVTlvUXl4TlFVRlFMRU5CUVZRN1FVRkRRU3hSUVVGSlFTeFRRVUZUYVVNc1UwRkJZaXhGUVVGM1FqdEJRVU4wUW1wRExHVkJRVk5wUXl4VFFVRlVPMEZCUTBRN1FVRkRSanM3UVVGRlJEdEJRVU5CTEUxQlFVbERMRk5CUVZOS0xFOUJRVTg1UWl4TlFVRndRanRCUVVOQmQwSXNVMEZCVDFVc1UwRkJVeXhEUVVGVUxFdEJRV1VzUTBGQmRFSXNSVUZCZVVJc2IwSkJRWHBDT3p0QlFVVkJMRTFCUVVsc1F5eFRRVUZUYTBNc1UwRkJVeXhEUVVGMFFpeEZRVUY1UWp0QlFVTjJRbXhETEdGQlFWTnJReXhUUVVGVExFTkJRV3hDTzBGQlEwUTdRVUZEUkN4UFFVRkxMRWxCUVVrMVFpeEpRVUZKTEVOQlFXSXNSVUZCWjBKQkxFbEJRVWxPTEUxQlFYQkNMRVZCUVRSQ1RTeEhRVUUxUWl4RlFVRnBRenRCUVVNdlFpeFJRVUZKTmtJc1QwRkJUME1zVTBGQlUwNHNUMEZCVDA4c1RVRkJVQ3hEUVVGakwwSXNTVUZCU1N4RFFVRnNRaXhGUVVGeFFpeERRVUZ5UWl4RFFVRlVMRVZCUVd0RExFVkJRV3hETEVOQlFWZzdRVUZEUVd0Q0xGZEJRVThzUTBGQlEyTXNUVUZCVFVnc1NVRkJUaXhEUVVGU0xFVkJRWEZDTEc5Q1FVRnlRanRCUVVOQkwwTXNVVUZCU1RKRExGTkJRVk42UWl4RFFVRmlMRWxCUVd0Q05rSXNTVUZCYkVJN1FVRkRSRHRCUVVORWNFUXNVMEZCVDNkRUxHRkJRVkFzUjBGQmRVSnFReXhKUVVGSkxFTkJRVE5DTzBGQlEwRXNVMEZCVDBFc1EwRkJVRHRCUVVORU96dEJRVVZFTEZOQlFWTnJReXhWUVVGVUxFTkJRWEZDY0VRc1IwRkJja0lzUlVGQk1FSXdReXhOUVVFeFFpeEZRVUZyUTBNc1RVRkJiRU1zUlVGQk1FTXZRaXhOUVVFeFF5eEZRVUZyUkR0QlFVTm9SQ3hOUVVGSmVVTXNaVUZCWlRGRUxFOUJRVTkzUkN4aFFVRlFMRWRCUTJwQ1J5eFhRVUZYZGtJc1dVRkJXVmNzVFVGQldpeERRVUZZTEVWQlFXZERNVU1zUjBGQmFFTXNSVUZCY1VNeVF5eE5RVUZ5UXl4RlFVRTJReTlDTEUxQlFUZERMRU5CUkVZN1FVRkZRU3hUUVVGUGVVTXNXVUZCVUR0QlFVTkVPenRCUVVWRUxGTkJRVk5GTEZkQlFWUXNRMEZCYzBKMlJDeEhRVUYwUWl4RlFVRXlRakJETEUxQlFUTkNMRVZCUVcxRFF5eE5RVUZ1UXl4RlFVRXlReTlDTEUxQlFUTkRMRVZCUVcxRU8wRkJRMnBFTEUxQlFVbDVReXhsUVVGbE1VUXNUMEZCVDNkRUxHRkJRVkFzUjBGRGFrSkhMRmRCUVZkRkxHRkJRV0ZrTEUxQlFXSXNRMEZCV0N4RlFVRnBRekZETEVkQlFXcERMRVZCUVhORE1rTXNUVUZCZEVNc1JVRkJPRU12UWl4TlFVRTVReXhEUVVSR08wRkJSVUVzVTBGQlQzbERMRmxCUVZBN1FVRkRSRHM3UVVGRlJDeFRRVUZUU1N4WlFVRlVMRU5CUVhWQ2VrUXNSMEZCZGtJc1JVRkJORUl3UXl4TlFVRTFRaXhGUVVGdlEwTXNUVUZCY0VNc1JVRkJORU12UWl4TlFVRTFReXhGUVVGdlJEdEJRVU5zUkN4VFFVRlBNa01zV1VGQldYWkVMRWRCUVZvc1JVRkJhVUl3UXl4TlFVRnFRaXhGUVVGNVFrTXNUVUZCZWtJc1JVRkJhVU12UWl4TlFVRnFReXhEUVVGUU8wRkJRMFE3TzBGQlJVUXNVMEZCVXpoRExGbEJRVlFzUTBGQmRVSXhSQ3hIUVVGMlFpeEZRVUUwUWpCRExFMUJRVFZDTEVWQlFXOURReXhOUVVGd1F5eEZRVUUwUXk5Q0xFMUJRVFZETEVWQlFXOUVPMEZCUTJ4RUxFMUJRVWw1UXl4bFFVRmxNVVFzVDBGQlQzZEVMR0ZCUVZBc1IwRkRha0pITEZkQlFWZDBRaXhqUVVGalZTeE5RVUZrTEVOQlFWZ3NSVUZCYTBNeFF5eEhRVUZzUXl4RlFVRjFRekpETEUxQlFYWkRMRVZCUVN0REwwSXNUVUZCTDBNc1EwRkVSanRCUVVWQkxGTkJRVTk1UXl4WlFVRlFPMEZCUTBRN08wRkJSVVFzVTBGQlUwMHNZVUZCVkN4RFFVRjNRak5FTEVkQlFYaENMRVZCUVRaQ01FTXNUVUZCTjBJc1JVRkJjVU5ETEUxQlFYSkRMRVZCUVRaREwwSXNUVUZCTjBNc1JVRkJjVVE3UVVGRGJrUXNUVUZCU1hsRExHVkJRV1V4UkN4UFFVRlBkMFFzWVVGQlVDeEhRVU5xUWtjc1YwRkJWMDBzWlVGQlpXeENMRTFCUVdZc1EwRkJXQ3hGUVVGdFF6RkRMRWRCUVc1RExFVkJRWGRETWtNc1RVRkJlRU1zUlVGQlowUXZRaXhOUVVGb1JDeERRVVJHTzBGQlJVRXNVMEZCVDNsRExGbEJRVkE3UVVGRFJEczdRVUZGUkRGRUxFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ2RFTXNTMEZCYWtJc1IwRkJlVUlzVlVGQlZXMUNMRTFCUVZZc1JVRkJhMEpETEUxQlFXeENMRVZCUVRCQ0wwSXNUVUZCTVVJc1JVRkJhME5LTEZGQlFXeERMRVZCUVRSRE8wRkJRMjVGTzBGQlEwRTdRVUZEUVN4TlFVRkpjMFFzVTBGQlUyNUNMRTFCUVZRc1EwRkJTaXhGUVVGelFqdEJRVU53UWl4UlFVRkpMRU5CUVVOdFFpeFRRVUZUYkVRc1RVRkJWQ3hEUVVGTUxFVkJRWFZDTzBGQlEzSkNTaXhwUWtGQlYwa3NUVUZCV0R0QlFVTkJRU3hsUVVGVFowSXNVMEZCVkR0QlFVTkVPMEZCUTBZc1IwRk1SQ3hOUVV0UE8wRkJRVWM3UVVGRFVpeFJRVUZKYlVNc1QwRkJUM1pFTEZGQlFWZzdRVUZEUVVFc1pVRkJWMjFETEUxQlFWZzdRVUZEUVVFc1lVRkJVeTlDTEUxQlFWUTdRVUZEUVVFc1lVRkJVMjFFTEVsQlFWUTdRVUZEUkRzN1FVRkZSSEJDTEZkQlFWTkRMRTlCUVU5RUxFMUJRVkFzUzBGQmEwSXNRMEZCTTBJN1FVRkRRU3hOUVVGSlJTeFpRVUZaTEV0QlFVdHFReXhOUVVGTUxFZEJRV01yUWl4TlFVRTVRanRCUVVOQkxFMUJRVWtzUTBGQlF5OUNMRTFCUVV3c1JVRkJZVHRCUVVOWVFTeGhRVUZUYVVNc1UwRkJWRHRCUVVORUxFZEJSa1FzVFVGRlR6dEJRVU5NYWtNc1lVRkJVMmRETEU5QlFVOW9ReXhOUVVGUUxFTkJRVlE3UVVGRFFTeFJRVUZKUVN4VFFVRlRhVU1zVTBGQllpeEZRVUYzUWp0QlFVTjBRbXBETEdWQlFWTnBReXhUUVVGVU8wRkJRMFE3UVVGRFJqdEJRVU5FY2tNc1lVRkJWMmxDTEU5QlFVOXFRaXhaUVVGWkxFMUJRVzVDTEVWQlFUSkNhMElzVjBGQk0wSXNSVUZCV0RzN1FVRkZRU3hOUVVGSlNTeEhRVUZLTzBGQlEwRXNWVUZCVVhSQ0xGRkJRVkk3UVVGRFJTeFRRVUZMTEV0QlFVdzdRVUZEUlhOQ0xGbEJRVTFYTEZWQlFWVXNTVUZCVml4RlFVRm5Ra01zVFVGQmFFSXNSVUZCZDBKRExFMUJRWGhDTEVWQlFXZERMMElzVFVGQmFFTXNRMEZCVGp0QlFVTkJPMEZCUTBZc1UwRkJTeXhOUVVGTU8wRkJRMEVzVTBGQlN5eFBRVUZNTzBGQlEwVnJRaXhaUVVGTmMwSXNWMEZCVnl4SlFVRllMRVZCUVdsQ1ZpeE5RVUZxUWl4RlFVRjVRa01zVFVGQmVrSXNSVUZCYVVNdlFpeE5RVUZxUXl4RFFVRk9PMEZCUTBFN1FVRkRSaXhUUVVGTExFOUJRVXc3UVVGRFJXdENMRmxCUVUxNVFpeFpRVUZaTEVsQlFWb3NSVUZCYTBKaUxFMUJRV3hDTEVWQlFUQkNReXhOUVVFeFFpeEZRVUZyUXk5Q0xFMUJRV3hETEVOQlFVNDdRVUZEUVR0QlFVTkdMRk5CUVVzc1VVRkJURHRCUVVORmEwSXNXVUZCVFRKQ0xHRkJRV0VzU1VGQllpeEZRVUZ0UW1Zc1RVRkJia0lzUlVGQk1rSkRMRTFCUVROQ0xFVkJRVzFETDBJc1RVRkJia01zUTBGQlRqdEJRVU5CTzBGQlEwWXNVMEZCU3l4UlFVRk1PMEZCUTBWclFpeFpRVUZOTkVJc1lVRkJZU3hKUVVGaUxFVkJRVzFDYUVJc1RVRkJia0lzUlVGQk1rSkRMRTFCUVROQ0xFVkJRVzFETDBJc1RVRkJia01zUTBGQlRqdEJRVU5CTzBGQlEwWXNVMEZCU3l4TlFVRk1PMEZCUTBFc1UwRkJTeXhQUVVGTU8wRkJRMEVzVTBGQlN5eFRRVUZNTzBGQlEwRXNVMEZCU3l4VlFVRk1PMEZCUTBWclFpeFpRVUZOTmtJc1kwRkJZeXhKUVVGa0xFVkJRVzlDYWtJc1RVRkJjRUlzUlVGQk5FSkRMRTFCUVRWQ0xFVkJRVzlETDBJc1RVRkJjRU1zUTBGQlRqdEJRVU5CTzBGQlEwWTdRVUZEUlN4WlFVRk5MRWxCUVVsSExFdEJRVW9zUTBGQlZTeHJRa0ZCVml4RFFVRk9PMEZCZUVKS08wRkJNRUpCTEZOQlFVOWxMRWRCUVZBN1FVRkRSQ3hEUVhaRVJEczdRVUY1UkVGdVF5eFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFrY3NVVUZCYWtJc1IwRkJORUlzVlVGQlZYaEVMRkZCUVZZc1JVRkJiMEo1UkN4TFFVRndRaXhGUVVFeVFrTXNSMEZCTTBJc1JVRkJaME03UVVGRE1VUXNUVUZCU1VNc1QwRkJUeXhKUVVGWU96dEJRVVZCTTBRc1lVRkJWMmxDTEU5QlFVOXFRaXhaUVVGWkxFMUJRVzVDTEVWQlFUSkNhMElzVjBGQk0wSXNSVUZCV0R0QlFVTkJkVU1zVlVGQlVYSkNMRTlCUVU5eFFpeExRVUZRTEV0QlFXbENMRU5CUVhwQ08wRkJRMEZETEZGQlFVOUJMRkZCUVZGMFF5eFRRVUZVTEVkQlEwWm5RaXhQUVVGUGMwSXNSMEZCVUN4RFFVUkZMRWRCUlVaQkxFMUJRVTFETEV0QlFVdDJSQ3hOUVVabU96dEJRVWxCTzBGQlEwRXNUVUZCU1hORUxGRkJRVkZFTEV0QlFWb3NSVUZEUlN4UFFVRlBMRVZCUVZBN08wRkJSVVlzVFVGQlNXNURMRWRCUVVvN1FVRkRRU3hWUVVGUmRFSXNVVUZCVWp0QlFVTkZMRk5CUVVzc1MwRkJURHRCUVVORmMwSXNXVUZCVFhORExGVkJRVlZFTEVsQlFWWXNSVUZCWjBKR0xFdEJRV2hDTEVWQlFYVkNReXhIUVVGMlFpeERRVUZPTzBGQlEwRTdRVUZEUml4VFFVRkxMRTFCUVV3N1FVRkRRU3hUUVVGTExFOUJRVXc3UVVGRFJYQkRMRmxCUVUxMVF5eFhRVUZYUml4SlFVRllMRVZCUVdsQ1JpeExRVUZxUWl4RlFVRjNRa01zUjBGQmVFSXNRMEZCVGp0QlFVTkJPMEZCUTBZc1UwRkJTeXhQUVVGTU8wRkJRMFZ3UXl4WlFVRk5kME1zV1VGQldVZ3NTVUZCV2l4RlFVRnJRa1lzUzBGQmJFSXNSVUZCZVVKRExFZEJRWHBDTEVOQlFVNDdRVUZEUVR0QlFVTkdMRk5CUVVzc1VVRkJURHRCUVVORmNFTXNXVUZCVFhsRExHRkJRV0ZLTEVsQlFXSXNSVUZCYlVKR0xFdEJRVzVDTEVWQlFUQkNReXhIUVVFeFFpeERRVUZPTzBGQlEwRTdRVUZEUml4VFFVRkxMRkZCUVV3N1FVRkRSWEJETEZsQlFVMHdReXhoUVVGaFRDeEpRVUZpTEVWQlFXMUNSaXhMUVVGdVFpeEZRVUV3UWtNc1IwRkJNVUlzUTBGQlRqdEJRVU5CTzBGQlEwWXNVMEZCU3l4TlFVRk1PMEZCUTBFc1UwRkJTeXhQUVVGTU8wRkJRMEVzVTBGQlN5eFRRVUZNTzBGQlEwRXNVMEZCU3l4VlFVRk1PMEZCUTBWd1F5eFpRVUZOTWtNc1kwRkJZMDRzU1VGQlpDeEZRVUZ2UWtZc1MwRkJjRUlzUlVGQk1rSkRMRWRCUVROQ0xFTkJRVTQ3UVVGRFFUdEJRVU5HTzBGQlEwVXNXVUZCVFN4SlFVRkpia1FzUzBGQlNpeERRVUZWTEd0Q1FVRldMRU5CUVU0N1FVRjRRa283UVVFd1FrRXNVMEZCVDJVc1IwRkJVRHRCUVVORUxFTkJla05FT3p0QlFUSkRRVzVETEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDWVN4TlFVRnFRaXhIUVVFd1FpeFpRVUZaTzBGQlEzQkRMRk5CUVU4N1FVRkRUR2hGTEZWQlFVMHNVVUZFUkR0QlFVVk1hVVVzVlVGQlRVTXNUVUZCVFdZc1UwRkJUaXhEUVVGblFtZENMRXRCUVdoQ0xFTkJRWE5DUXl4SlFVRjBRaXhEUVVFeVFpeExRVUZMUXl4SlFVRk1MRWxCUVdFc1NVRkJlRU1zUlVGQk9FTXNRMEZCT1VNN1FVRkdSQ3hIUVVGUU8wRkJTVVFzUTBGTVJEczdRVUZQUVR0QlFVTkJjRVlzVDBGQlQydEZMRk5CUVZBc1EwRkJhVUp5UWl4SlFVRnFRaXhIUVVGM1FpeFZRVUZWZDBNc1RVRkJWaXhGUVVGclFrTXNXVUZCYkVJc1JVRkJaME5vUWl4TFFVRm9ReXhGUVVGMVEwTXNSMEZCZGtNc1JVRkJORU03UVVGRGJFVXNUVUZCU1dkQ0xGTkJRVk1zU1VGQllqczdRVUZGUVN4TlFVRkpMRU5CUVVOcVFpeExRVUZNTEVWQlFWbEJMRkZCUVZFc1EwRkJVanRCUVVOYUxFMUJRVWtzUTBGQlEwTXNSMEZCUkN4SlFVRlJRU3hSUVVGUkxFTkJRWEJDTEVWQlFYVkNRU3hOUVVGTkxFdEJRVXQwUkN4TlFVRllPMEZCUTNaQ0xFMUJRVWtzUTBGQlEzRkZMRmxCUVV3c1JVRkJiVUpCTEdWQlFXVXNRMEZCWmpzN1FVRkZia0k3UVVGRFFTeE5RVUZKWml4UlFVRlJSQ3hMUVVGYUxFVkJRVzFDTzBGQlEyNUNMRTFCUVVsbExFOUJRVTl3UlN4TlFVRlFMRXRCUVd0Q0xFTkJRV3hDTEVsQlFYVkNjMFVzVDBGQlQzUkZMRTFCUVZBc1MwRkJhMElzUTBGQk4wTXNSVUZCWjBRN08wRkJSV2hFTzBGQlEwRjNRaXhUUVVGUE9FSXNUMEZCVDBRc1MwRkJaQ3hGUVVGeFFpeDVRa0ZCY2tJN1FVRkRRVGRDTEZOQlFVODJReXhuUWtGQlowSXNRMEZCYUVJc1NVRkJjVUpCTEdWQlFXVkVMRTlCUVU5d1JTeE5RVUZzUkN4RlFVTkpMREpDUVVSS08wRkJSVUYzUWl4VFFVRlBOa0lzVTBGQlV5eERRVUZVTEVsQlFXTkJMRkZCUVZGcFFpeFBRVUZQZEVVc1RVRkJjRU1zUlVGQk5FTXNNa0pCUVRWRE8wRkJRMEYzUWl4VFFVRlBPRUlzVDBGQlR5eERRVUZRTEVsQlFWbEJMRTlCUVU5blFpeFBRVUZQZEVVc1RVRkJha01zUlVGQmVVTXNlVUpCUVhwRE96dEJRVVZCTzBGQlEwRXNUVUZCU1hORUxFMUJRVTBzUzBGQlMzUkVMRTFCUVdZc1JVRkRSWE5FTEUxQlFVMHNTMEZCUzNSRUxFMUJRVmc3UVVGRFJpeE5RVUZKYjBVc1QwRkJUM0JGTEUxQlFWQXNSMEZCWjBKeFJTeFpRVUZvUWl4SFFVRXJRbVlzVFVGQlRVUXNTMEZCZWtNc1JVRkRSVU1zVFVGQlRXTXNUMEZCVDNCRkxFMUJRVkFzUjBGQlowSnhSU3haUVVGb1FpeEhRVUVyUW1oQ0xFdEJRWEpET3p0QlFVVkdMRTFCUVVsclFpeE5RVUZOYWtJc1RVRkJUVVFzUzBGQmFFSTdPMEZCUlVFc1RVRkJTV3RDTEUxQlFVMHNSMEZCVGl4SlFVRmhMRU5CUVVONFJpeFBRVUZQU1N4bFFVRjZRaXhGUVVFd1F6dEJRVU40UXl4VFFVRkxMRWxCUVVsdFFpeEpRVUZKTEVOQlFXSXNSVUZCWjBKQkxFbEJRVWxwUlN4SFFVRndRaXhGUVVGNVFtcEZMRWRCUVhwQ08wRkJRMFU0UkN4aFFVRlBPVVFzU1VGQlNTdEVMRmxCUVZnc1NVRkJNa0lzUzBGQlN5OUVMRWxCUVVrclF5eExRVUZVTEVOQlFUTkNPMEZCUkVZN1FVRkZSQ3hIUVVoRUxFMUJSMDg3UVVGRFRHVXNWMEZCVHpkRUxFbEJRVkFzUTBGQldTeExRVUZMWkN4UlFVRk1MRU5CUVdNMFJDeExRVUZrTEVWQlFYRkNRU3hSUVVGUmEwSXNSMEZCTjBJc1EwRkJXaXhGUVVFclEwWXNXVUZCTDBNN1FVRkRSRHRCUVVOR0xFTkJhRU5FT3p0QlFXdERRU3hUUVVGVFZDeFpRVUZVTEVOQlFYVkNlRVVzUjBGQmRrSXNSVUZCTkVKcFJTeExRVUUxUWl4RlFVRnRRME1zUjBGQmJrTXNSVUZCZDBNN1FVRkRkRU1zVFVGQlNVUXNWVUZCVlN4RFFVRldMRWxCUVdWRExGRkJRVkZzUlN4SlFVRkpXU3hOUVVFdlFpeEZRVUYxUXp0QlFVTnlReXhYUVVGUGNrSXNUMEZCVHpaR0xHRkJRVkFzUTBGQmNVSndSaXhIUVVGeVFpeERRVUZRTzBGQlEwUXNSMEZHUkN4TlFVVlBPMEZCUTB3c1YwRkJUMVFzVDBGQlR6WkdMR0ZCUVZBc1EwRkJjVUp3Uml4SlFVRkpOa1VzUzBGQlNpeERRVUZWV2l4TFFVRldMRVZCUVdsQ1F5eEhRVUZxUWl4RFFVRnlRaXhEUVVGUU8wRkJRMFE3UVVGRFJqczdRVUZGUkN4VFFVRlRSeXhWUVVGVUxFTkJRWEZDY2tVc1IwRkJja0lzUlVGQk1FSnBSU3hMUVVFeFFpeEZRVUZwUTBNc1IwRkJha01zUlVGQmMwTTdRVUZEY0VNc1RVRkJTVzFDTEUxQlFVMHNSVUZCVmp0QlFVTkJMRTFCUVVsRExFMUJRVTBzUlVGQlZqdEJRVU5CY0VJc1VVRkJUWEZDTEV0QlFVdERMRWRCUVV3c1EwRkJVM2hHTEVsQlFVbFpMRTFCUVdJc1JVRkJjVUp6UkN4SFFVRnlRaXhEUVVGT096dEJRVVZCTEU5QlFVc3NTVUZCU1doRUxFbEJRVWtyUXl4TFFVRmlMRVZCUVc5Q0wwTXNTVUZCU1dkRUxFZEJRWGhDTEVWQlFUWkNhRVFzUjBGQk4wSXNSVUZCYTBNN1FVRkRhRU1zVVVGQlNXeENMRWxCUVVsclFpeERRVUZLTEV0QlFWVXNTVUZCWkN4RlFVRnZRanRCUVVOc1FtMUZMR0ZCUVU5SkxHVkJRV1ZJTEVkQlFXWXNTVUZCYzBJM1JDeFBRVUZQYVVVc1dVRkJVQ3hEUVVGdlFqRkdMRWxCUVVsclFpeERRVUZLTEVOQlFYQkNMRU5CUVRkQ08wRkJRMEZ2UlN4WlFVRk5MRVZCUVU0N1FVRkRSQ3hMUVVoRUxFMUJSMDg3UVVGRFRFRXNZVUZCVHl4TlFVRk5kRVlzU1VGQlNXdENMRU5CUVVvc1JVRkJUemhETEZGQlFWQXNRMEZCWjBJc1JVRkJhRUlzUTBGQllqdEJRVU5FTzBGQlEwWTdPMEZCUlVRc1UwRkJUM0ZDTEUxQlFVMUpMR1ZCUVdWSUxFZEJRV1lzUTBGQllqdEJRVU5FT3p0QlFVVkVMRk5CUVZOb1FpeFhRVUZVTEVOQlFYTkNkRVVzUjBGQmRFSXNSVUZCTWtKcFJTeExRVUV6UWl4RlFVRnJRME1zUjBGQmJFTXNSVUZCZFVNN1FVRkRja01zVFVGQlNYQkRMRTFCUVUwc1JVRkJWanRCUVVOQmIwTXNVVUZCVFhGQ0xFdEJRVXRETEVkQlFVd3NRMEZCVTNoR0xFbEJRVWxaTEUxQlFXSXNSVUZCY1VKelJDeEhRVUZ5UWl4RFFVRk9PenRCUVVWQkxFOUJRVXNzU1VGQlNXaEVMRWxCUVVrclF5eExRVUZpTEVWQlFXOUNMME1zU1VGQlNXZEVMRWRCUVhoQ0xFVkJRVFpDYUVRc1IwRkJOMEk3UVVGRFJWa3NWMEZCVDB3c1QwRkJUMmxGTEZsQlFWQXNRMEZCYjBJeFJpeEpRVUZKYTBJc1EwRkJTaXhEUVVGd1FpeERRVUZRTzBGQlJFWXNSMEZGUVN4UFFVRlBXU3hIUVVGUU8wRkJRMFE3TzBGQlJVUXNVMEZCVTNsRExGbEJRVlFzUTBGQmRVSjJSU3hIUVVGMlFpeEZRVUUwUW1sRkxFdEJRVFZDTEVWQlFXMURReXhIUVVGdVF5eEZRVUYzUXp0QlFVTjBReXhUUVVGUFNTeFpRVUZaZEVVc1IwRkJXaXhGUVVGcFFtbEZMRXRCUVdwQ0xFVkJRWGRDUXl4SFFVRjRRaXhEUVVGUU8wRkJRMFE3TzBGQlJVUXNVMEZCVTBVc1UwRkJWQ3hEUVVGdlFuQkZMRWRCUVhCQ0xFVkJRWGxDYVVVc1MwRkJla0lzUlVGQlowTkRMRWRCUVdoRExFVkJRWEZETzBGQlEyNURMRTFCUVVscFFpeE5RVUZOYmtZc1NVRkJTVmtzVFVGQlpEczdRVUZGUVN4TlFVRkpMRU5CUVVOeFJDeExRVUZFTEVsQlFWVkJMRkZCUVZFc1EwRkJkRUlzUlVGQmVVSkJMRkZCUVZFc1EwRkJVanRCUVVONlFpeE5RVUZKTEVOQlFVTkRMRWRCUVVRc1NVRkJVVUVzVFVGQlRTeERRVUZrTEVsQlFXMUNRU3hOUVVGTmFVSXNSMEZCTjBJc1JVRkJhME5xUWl4TlFVRk5hVUlzUjBGQlRqczdRVUZGYkVNc1RVRkJTVkVzVFVGQlRTeEZRVUZXTzBGQlEwRXNUMEZCU3l4SlFVRkpla1VzU1VGQlNTdERMRXRCUVdJc1JVRkJiMEl2UXl4SlFVRkpaMFFzUjBGQmVFSXNSVUZCTmtKb1JDeEhRVUUzUWl4RlFVRnJRenRCUVVOb1EzbEZMRmRCUVU5RExFMUJRVTAxUml4SlFVRkphMElzUTBGQlNpeERRVUZPTEVOQlFWQTdRVUZEUkR0QlFVTkVMRk5CUVU5NVJTeEhRVUZRTzBGQlEwUTdPMEZCUlVRc1UwRkJVMnhDTEdGQlFWUXNRMEZCZDBKNlJTeEhRVUY0UWl4RlFVRTJRbWxGTEV0QlFUZENMRVZCUVc5RFF5eEhRVUZ3UXl4RlFVRjVRenRCUVVOMlF5eE5RVUZKTWtJc1VVRkJVVGRHTEVsQlFVazJSU3hMUVVGS0xFTkJRVlZhTEV0QlFWWXNSVUZCYVVKRExFZEJRV3BDTEVOQlFWbzdRVUZEUVN4TlFVRkpiVUlzVFVGQlRTeEZRVUZXTzBGQlEwRXNUMEZCU3l4SlFVRkpia1VzU1VGQlNTeERRVUZpTEVWQlFXZENRU3hKUVVGSk1rVXNUVUZCVFdwR0xFMUJRVEZDTEVWQlFXdERUU3hMUVVGTExFTkJRWFpETEVWQlFUQkRPMEZCUTNoRGJVVXNWMEZCVHpWRUxFOUJRVTlwUlN4WlFVRlFMRU5CUVc5Q1J5eE5RVUZOTTBVc1EwRkJUaXhKUVVGWE1rVXNUVUZCVFRORkxFbEJRVVVzUTBGQlVpeEpRVUZoTEVkQlFUVkRMRU5CUVZBN1FVRkRSRHRCUVVORUxGTkJRVTl0UlN4SFFVRlFPMEZCUTBRN08wRkJSVVF4Uml4UFFVRlBhMFVzVTBGQlVDeERRVUZwUW1kQ0xFdEJRV3BDTEVkQlFYbENMRlZCUVZWYUxFdEJRVllzUlVGQmFVSkRMRWRCUVdwQ0xFVkJRWE5DTzBGQlF6ZERMRTFCUVVscFFpeE5RVUZOTEV0QlFVdDJSU3hOUVVGbU8wRkJRMEZ4UkN4VlFVRlJOa0lzVFVGQlRUZENMRXRCUVU0c1JVRkJZV3RDTEVkQlFXSXNSVUZCYTBJc1EwRkJiRUlzUTBGQlVqdEJRVU5CYWtJc1VVRkJUVFJDTEUxQlFVMDFRaXhIUVVGT0xFVkJRVmRwUWl4SFFVRllMRVZCUVdkQ1FTeEhRVUZvUWl4RFFVRk9PenRCUVVWQkxFMUJRVWw0Uml4UFFVRlBTU3hsUVVGWUxFVkJRVFJDTzBGQlF6RkNMRmRCUVU5S0xFOUJRVTl4UWl4UlFVRlFMRU5CUVdkQ0xFdEJRVXRZTEZGQlFVd3NRMEZCWXpSRUxFdEJRV1FzUlVGQmNVSkRMRWRCUVhKQ0xFTkJRV2hDTEVOQlFWQTdRVUZEUkN4SFFVWkVMRTFCUlU4N1FVRkRUQ3hSUVVGSk5rSXNWMEZCVnpkQ0xFMUJRVTFFTEV0QlFYSkNPMEZCUTBFc1VVRkJTU3RDTEZOQlFWTXNTVUZCU1hKSExFMUJRVW9zUTBGQlYyOUhMRkZCUVZnc1JVRkJjVUp1UlN4VFFVRnlRaXhGUVVGblF5eEpRVUZvUXl4RFFVRmlPMEZCUTBFc1UwRkJTeXhKUVVGSlZpeEpRVUZKTEVOQlFXSXNSVUZCWjBKQkxFbEJRVWsyUlN4UlFVRndRaXhGUVVFNFFqZEZMRWRCUVRsQ0xFVkJRVzFETzBGQlEycERPRVVzWVVGQlR6bEZMRU5CUVZBc1NVRkJXU3hMUVVGTFFTeEpRVUZKSzBNc1MwRkJWQ3hEUVVGYU8wRkJRMFE3UVVGRFJDeFhRVUZQSzBJc1RVRkJVRHRCUVVORU8wRkJRMFlzUTBGbVJEczdRVUZwUWtFN1FVRkRRWEpITEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDYjBNc1IwRkJha0lzUjBGQmRVSXNWVUZCVlhSRUxFMUJRVllzUlVGQmEwSTdRVUZEZGtOMVJDeFZRVUZSUXl4SFFVRlNMRU5CUVZrc01rUkJRVm83UVVGRFFTeFRRVUZQTEV0QlFVczNSU3hUUVVGTUxFTkJRV1Z4UWl4TlFVRm1MRU5CUVZBN1FVRkRSQ3hEUVVoRU96dEJRVXRCTzBGQlEwRm9SQ3hQUVVGUGEwVXNVMEZCVUN4RFFVRnBRblZETEVkQlFXcENMRWRCUVhWQ0xGVkJRVlZETEVOQlFWWXNSVUZCWVRGRUxFMUJRV0lzUlVGQmNVSTdRVUZETVVOMVJDeFZRVUZSUXl4SFFVRlNMRU5CUVZrc01rUkJRVm83UVVGRFFTeFRRVUZQTEV0QlFVdEhMRlZCUVV3c1EwRkJaMEpFTEVOQlFXaENMRVZCUVcxQ01VUXNUVUZCYmtJc1EwRkJVRHRCUVVORUxFTkJTRVE3TzBGQlMwRm9SQ3hQUVVGUGEwVXNVMEZCVUN4RFFVRnBRblpETEZOQlFXcENMRWRCUVRaQ0xGVkJRVlZ4UWl4TlFVRldMRVZCUVd0Q05FUXNVVUZCYkVJc1JVRkJORUk3UVVGRGRrUXNUVUZCU1N4RFFVRkRRU3hSUVVGTUxFVkJRV1U3UVVGRFltNUZMRmRCUVU5UExGZEJRVmRtTEZOQlFWZ3NTVUZCZDBKbExGZEJRVmNzU1VGQk1VTXNSVUZCWjBRc1owSkJRV2hFTzBGQlEwRlFMRmRCUVU5UExGTkJRVk1zUzBGQlN5OUNMRTFCUVhKQ0xFVkJRVFpDTEhGRFFVRTNRanRCUVVORU96dEJRVVZFTEUxQlFVa3JRaXhWUVVGVkxFdEJRVXN2UWl4TlFVRnVRaXhGUVVORk96dEJRVVZHTEZOQlFVOHNTMEZCU3l0Q0xFMUJRVXdzUTBGQlVEdEJRVU5FTEVOQlZrUTdPMEZCV1VFc1UwRkJVelpFTEZkQlFWUXNRMEZCYzBKNFJ5eEhRVUYwUWl4RlFVRXlRakpETEUxQlFUTkNMRVZCUVcxRE9FUXNXVUZCYmtNc1JVRkJhVVJHTEZGQlFXcEVMRVZCUVRKRU8wRkJRM3BFTEUxQlFVa3NRMEZCUTBFc1VVRkJUQ3hGUVVGbE8wRkJRMkp1UlN4WFFVRlBMRTlCUVU5eFJTeFpRVUZRTEV0QlFYZENMRk5CUVM5Q0xFVkJRVEJETERKQ1FVRXhRenRCUVVOQmNrVXNWMEZCVDA4c1YwRkJWMllzVTBGQldDeEpRVUYzUW1Vc1YwRkJWeXhKUVVFeFF5eEZRVUZuUkN4blFrRkJhRVE3UVVGRFFWQXNWMEZCVDA4c1UwRkJVeXhEUVVGVUxFZEJRV0V6UXl4SlFVRkpXU3hOUVVGNFFpeEZRVUZuUXl4eFEwRkJhRU03UVVGRFJEczdRVUZGUkN4TlFVRkpkVVVzVFVGQlRXNUdMRWxCUVVsWkxFMUJRV1E3UVVGRFFTeE5RVUZKSzBJc1ZVRkJWWGRETEVkQlFXUXNSVUZEUlRzN1FVRkZSaXhOUVVGSmRVSXNSMEZCU2p0QlFVTkJMRTFCUVVsRUxGbEJRVW9zUlVGQmEwSTdRVUZEYUVKRExGVkJRVTB4Unl4SlFVRkpNa01zVFVGQlNpeERRVUZPTzBGQlEwRXNVVUZCU1VFc1UwRkJVeXhEUVVGVUxFZEJRV0YzUXl4SFFVRnFRaXhGUVVORmRVSXNUMEZCVHpGSExFbEJRVWt5UXl4VFFVRlRMRU5CUVdJc1MwRkJiVUlzUTBGQk1VSTdRVUZEU0N4SFFVcEVMRTFCU1U4N1FVRkRUQ3RFTEZWQlFVMHhSeXhKUVVGSk1rTXNUVUZCU2l4TFFVRmxMRU5CUVhKQ08wRkJRMEVzVVVGQlNVRXNVMEZCVXl4RFFVRlVMRWRCUVdGM1F5eEhRVUZxUWl4RlFVTkZkVUlzVDBGQlR6RkhMRWxCUVVreVF5eFRRVUZUTEVOQlFXSXNRMEZCVUR0QlFVTklPMEZCUTBRc1UwRkJUeXRFTEVkQlFWQTdRVUZEUkRzN1FVRkZSQzlITEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDT0VNc1dVRkJha0lzUjBGQlowTXNWVUZCVldoRkxFMUJRVllzUlVGQmEwSTBSQ3hSUVVGc1FpeEZRVUUwUWp0QlFVTXhSQ3hUUVVGUFF5eFpRVUZaTEVsQlFWb3NSVUZCYTBJM1JDeE5RVUZzUWl4RlFVRXdRaXhKUVVFeFFpeEZRVUZuUXpSRUxGRkJRV2hETEVOQlFWQTdRVUZEUkN4RFFVWkVPenRCUVVsQk5VY3NUMEZCVDJ0RkxGTkJRVkFzUTBGQmFVSXJReXhaUVVGcVFpeEhRVUZuUXl4VlFVRlZha1VzVFVGQlZpeEZRVUZyUWpSRUxGRkJRV3hDTEVWQlFUUkNPMEZCUXpGRUxGTkJRVTlETEZsQlFWa3NTVUZCV2l4RlFVRnJRamRFTEUxQlFXeENMRVZCUVRCQ0xFdEJRVEZDTEVWQlFXbERORVFzVVVGQmFrTXNRMEZCVUR0QlFVTkVMRU5CUmtRN08wRkJTVUVzVTBGQlUwMHNWMEZCVkN4RFFVRnpRamRITEVkQlFYUkNMRVZCUVRKQ01rTXNUVUZCTTBJc1JVRkJiVU00UkN4WlFVRnVReXhGUVVGcFJFWXNVVUZCYWtRc1JVRkJNa1E3UVVGRGVrUXNUVUZCU1N4RFFVRkRRU3hSUVVGTUxFVkJRV1U3UVVGRFltNUZMRmRCUVU4c1QwRkJUM0ZGTEZsQlFWQXNTMEZCZDBJc1UwRkJMMElzUlVGQk1FTXNNa0pCUVRGRE8wRkJRMEZ5UlN4WFFVRlBUeXhYUVVGWFppeFRRVUZZTEVsQlFYZENaU3hYUVVGWExFbEJRVEZETEVWQlFXZEVMR2RDUVVGb1JEdEJRVU5CVUN4WFFVRlBUeXhUUVVGVExFTkJRVlFzUjBGQllUTkRMRWxCUVVsWkxFMUJRWGhDTEVWQlFXZERMSEZEUVVGb1F6dEJRVU5FT3p0QlFVVkVMRTFCUVVsMVJTeE5RVUZOYmtZc1NVRkJTVmtzVFVGQlpEdEJRVU5CTEUxQlFVa3JRaXhWUVVGVmQwTXNSMEZCWkN4RlFVTkZPenRCUVVWR0xFMUJRVWwxUWl4SFFVRktPMEZCUTBFc1RVRkJTVVFzV1VGQlNpeEZRVUZyUWp0QlFVTm9RaXhSUVVGSk9VUXNVMEZCVXl4RFFVRlVMRWRCUVdGM1F5eEhRVUZxUWl4RlFVTkZkVUlzVFVGQlRURkhMRWxCUVVreVF5eFRRVUZUTEVOQlFXSXNTMEZCYlVJc1JVRkJla0k3UVVGRFJpeFJRVUZKUVN4VFFVRlRMRU5CUVZRc1IwRkJZWGRETEVkQlFXcENMRVZCUTBWMVFpeFBRVUZQTVVjc1NVRkJTVEpETEZOQlFWTXNRMEZCWWl4TFFVRnRRaXhEUVVFeFFqdEJRVU5HSzBRc1YwRkJUekZITEVsQlFVa3lReXhOUVVGS0xFTkJRVkE3UVVGRFFTeFJRVUZKUVN4VFFVRlRMRU5CUVZRc1IwRkJZWGRETEVkQlFXcENMRVZCUTBWMVFpeE5RVUZOUVN4UFFVRlBNVWNzU1VGQlNUSkRMRk5CUVZNc1EwRkJZaXhMUVVGdFFpeEZRVUZ1UWl4TFFVRXdRaXhEUVVGcVF5eERRVUZPTzBGQlEwZ3NSMEZTUkN4TlFWRlBPMEZCUTB3c1VVRkJTVUVzVTBGQlV5eERRVUZVTEVkQlFXRjNReXhIUVVGcVFpeEZRVU5GZFVJc1RVRkJUVEZITEVsQlFVa3lReXhUUVVGVExFTkJRV0lzUzBGQmJVSXNSVUZCZWtJN1FVRkRSaXhSUVVGSlFTeFRRVUZUTEVOQlFWUXNSMEZCWVhkRExFZEJRV3BDTEVWQlEwVjFRaXhQUVVGUE1VY3NTVUZCU1RKRExGTkJRVk1zUTBGQllpeExRVUZ0UWl4RFFVRXhRanRCUVVOR0xGRkJRVWxCTEZOQlFWTXNRMEZCVkN4SFFVRmhkME1zUjBGQmFrSXNSVUZEUlhWQ0xFOUJRVTh4Unl4SlFVRkpNa01zVTBGQlV5eERRVUZpTEVOQlFWQTdRVUZEUml0RUxGVkJRVTFCTEU5QlFVOHhSeXhKUVVGSk1rTXNUVUZCU2l4TFFVRmxMRVZCUVdZc1MwRkJjMElzUTBGQk4wSXNRMEZCVGp0QlFVTkVPMEZCUTBRc1UwRkJUeXRFTEVkQlFWQTdRVUZEUkRzN1FVRkZSQzlITEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDYVVRc1dVRkJha0lzUjBGQlowTXNWVUZCVlc1RkxFMUJRVllzUlVGQmEwSTBSQ3hSUVVGc1FpeEZRVUUwUWp0QlFVTXhSQ3hUUVVGUFRTeFpRVUZaTEVsQlFWb3NSVUZCYTBKc1JTeE5RVUZzUWl4RlFVRXdRaXhKUVVFeFFpeEZRVUZuUXpSRUxGRkJRV2hETEVOQlFWQTdRVUZEUkN4RFFVWkVPenRCUVVsQk5VY3NUMEZCVDJ0RkxGTkJRVkFzUTBGQmFVSnJSQ3haUVVGcVFpeEhRVUZuUXl4VlFVRlZjRVVzVFVGQlZpeEZRVUZyUWpSRUxGRkJRV3hDTEVWQlFUUkNPMEZCUXpGRUxGTkJRVTlOTEZsQlFWa3NTVUZCV2l4RlFVRnJRbXhGTEUxQlFXeENMRVZCUVRCQ0xFdEJRVEZDTEVWQlFXbERORVFzVVVGQmFrTXNRMEZCVUR0QlFVTkVMRU5CUmtRN08wRkJTVUUxUnl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUW0xRUxGRkJRV3BDTEVkQlFUUkNMRlZCUVZWeVJTeE5RVUZXTEVWQlFXdENORVFzVVVGQmJFSXNSVUZCTkVJN1FVRkRkRVFzVFVGQlNTeERRVUZEUVN4UlFVRk1MRVZCUVdVN1FVRkRZbTVGTEZkQlFVOVBMRmRCUVZkbUxGTkJRVmdzU1VGQmQwSmxMRmRCUVZjc1NVRkJNVU1zUlVGRFNTeG5Ra0ZFU2p0QlFVVkJVQ3hYUVVGUFR5eFRRVUZUTEV0QlFVc3ZRaXhOUVVGeVFpeEZRVUUyUWl4eFEwRkJOMEk3UVVGRFJEczdRVUZGUkN4TlFVRkpLMElzVlVGQlZTeExRVUZMTDBJc1RVRkJia0lzUlVGRFJUczdRVUZGUml4TlFVRkpjVWNzVFVGQlRTeExRVUZMZEVVc1RVRkJUQ3hKUVVGbExFbEJRWHBDTzBGQlEwRXNUVUZCU1hORkxFZEJRVW9zUlVGRFJTeFBRVUZQTEVOQlFVTXNUMEZCVHl4TFFVRkxkRVVzVFVGQlRDeERRVUZRTEVkQlFYTkNMRU5CUVhaQ0xFbEJRVFJDTEVOQlFVTXNRMEZCY0VNc1EwRkVSaXhMUVVkRkxFOUJRVThzUzBGQlMwRXNUVUZCVEN4RFFVRlFPMEZCUTBnc1EwRm1SRHM3UVVGcFFrRXNVMEZCVTNWRkxGVkJRVlFzUTBGQmNVSnNTQ3hIUVVGeVFpeEZRVUV3UWpKRExFMUJRVEZDTEVWQlFXdERPRVFzV1VGQmJFTXNSVUZCWjBSR0xGRkJRV2hFTEVWQlFUQkVPMEZCUTNoRUxFMUJRVWtzUTBGQlEwRXNVVUZCVEN4RlFVRmxPMEZCUTJKdVJTeFhRVUZQTEU5QlFVOXhSU3haUVVGUUxFdEJRWGRDTEZOQlFTOUNMRVZCUVRCRExESkNRVUV4UXp0QlFVTkJja1VzVjBGQlQwOHNWMEZCVjJZc1UwRkJXQ3hKUVVGM1FtVXNWMEZCVnl4SlFVRXhReXhGUVVGblJDeG5Ra0ZCYUVRN1FVRkRRVkFzVjBGQlQwOHNVMEZCVXl4RFFVRlVMRWRCUVdFelF5eEpRVUZKV1N4TlFVRjRRaXhGUVVGblF5eHhRMEZCYUVNN1FVRkRSRHM3UVVGRlJDeE5RVUZKZFVVc1RVRkJUVzVHTEVsQlFVbFpMRTFCUVdRN1FVRkRRU3hOUVVGSkswSXNWVUZCVlhkRExFZEJRV1FzUlVGRFJUczdRVUZGUml4TlFVRkpkVUlzVFVGQlRVWXNXVUZCV1hoSExFZEJRVm9zUlVGQmFVSXlReXhOUVVGcVFpeEZRVUY1UWpoRUxGbEJRWHBDTEVWQlFYVkRMRWxCUVhaRExFTkJRVlk3UVVGRFFTeE5RVUZKVVN4TlFVRk5VQ3hOUVVGTkxFMUJRV2hDTzBGQlEwRXNUVUZCU1U4c1IwRkJTaXhGUVVORkxFOUJRVThzUTBGQlF5eFRRVUZUVUN4SFFVRlVMRWRCUVdVc1EwRkJhRUlzU1VGQmNVSXNRMEZCUXl4RFFVRTNRaXhEUVVSR0xFdEJSMFVzVDBGQlQwRXNSMEZCVUR0QlFVTklPenRCUVVWRUwwY3NUMEZCVDJ0RkxGTkJRVkFzUTBGQmFVSnpSQ3hYUVVGcVFpeEhRVUVyUWl4VlFVRlZlRVVzVFVGQlZpeEZRVUZyUWpSRUxGRkJRV3hDTEVWQlFUUkNPMEZCUTNwRUxGTkJRVTlYTEZkQlFWY3NTVUZCV0N4RlFVRnBRblpGTEUxQlFXcENMRVZCUVhsQ0xFbEJRWHBDTEVWQlFTdENORVFzVVVGQkwwSXNRMEZCVUR0QlFVTkVMRU5CUmtRN08wRkJTVUUxUnl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUW5WRUxGZEJRV3BDTEVkQlFTdENMRlZCUVZWNlJTeE5RVUZXTEVWQlFXdENORVFzVVVGQmJFSXNSVUZCTkVJN1FVRkRla1FzVTBGQlQxY3NWMEZCVnl4SlFVRllMRVZCUVdsQ2RrVXNUVUZCYWtJc1JVRkJlVUlzUzBGQmVrSXNSVUZCWjBNMFJDeFJRVUZvUXl4RFFVRlFPMEZCUTBRc1EwRkdSRHM3UVVGSlFTeFRRVUZUWXl4VlFVRlVMRU5CUVhGQ2NrZ3NSMEZCY2tJc1JVRkJNRUl5UXl4TlFVRXhRaXhGUVVGclF6aEVMRmxCUVd4RExFVkJRV2RFUml4UlFVRm9SQ3hGUVVFd1JEdEJRVU40UkN4TlFVRkpMRU5CUVVOQkxGRkJRVXdzUlVGQlpUdEJRVU5pYmtVc1YwRkJUeXhQUVVGUGNVVXNXVUZCVUN4TFFVRjNRaXhUUVVFdlFpeEZRVUV3UXl3eVFrRkJNVU03UVVGRFFYSkZMRmRCUVU5UExGZEJRVmRtTEZOQlFWZ3NTVUZCZDBKbExGZEJRVmNzU1VGQk1VTXNSVUZCWjBRc1owSkJRV2hFTzBGQlEwRlFMRmRCUVU5UExGTkJRVk1zUTBGQlZDeEhRVUZoTTBNc1NVRkJTVmtzVFVGQmVFSXNSVUZCWjBNc2NVTkJRV2hETzBGQlEwUTdPMEZCUlVRc1RVRkJTWFZGTEUxQlFVMXVSaXhKUVVGSldTeE5RVUZrTzBGQlEwRXNUVUZCU1N0Q0xGVkJRVlYzUXl4SFFVRmtMRVZCUTBVN08wRkJSVVlzVFVGQlNYVkNMRTFCUVUxSExGbEJRVmszUnl4SFFVRmFMRVZCUVdsQ01rTXNUVUZCYWtJc1JVRkJlVUk0UkN4WlFVRjZRaXhGUVVGMVF5eEpRVUYyUXl4RFFVRldPMEZCUTBFc1RVRkJTVkVzVFVGQlRWQXNUVUZCVFN4VlFVRm9RanRCUVVOQkxFMUJRVWxQTEVkQlFVb3NSVUZEUlN4UFFVRlBMRU5CUVVNc1lVRkJZVkFzUjBGQllpeEhRVUZ0UWl4RFFVRndRaXhKUVVGNVFpeERRVUZETEVOQlFXcERMRU5CUkVZc1MwRkhSU3hQUVVGUFFTeEhRVUZRTzBGQlEwZzdPMEZCUlVRdlJ5eFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFubEVMRmRCUVdwQ0xFZEJRU3RDTEZWQlFWVXpSU3hOUVVGV0xFVkJRV3RDTkVRc1VVRkJiRUlzUlVGQk5FSTdRVUZEZWtRc1UwRkJUMk1zVjBGQlZ5eEpRVUZZTEVWQlFXbENNVVVzVFVGQmFrSXNSVUZCZVVJc1NVRkJla0lzUlVGQkswSTBSQ3hSUVVFdlFpeERRVUZRTzBGQlEwUXNRMEZHUkRzN1FVRkpRVFZITEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDTUVRc1YwRkJha0lzUjBGQkswSXNWVUZCVlRWRkxFMUJRVllzUlVGQmEwSTBSQ3hSUVVGc1FpeEZRVUUwUWp0QlFVTjZSQ3hUUVVGUFl5eFhRVUZYTEVsQlFWZ3NSVUZCYVVJeFJTeE5RVUZxUWl4RlFVRjVRaXhMUVVGNlFpeEZRVUZuUXpSRUxGRkJRV2hETEVOQlFWQTdRVUZEUkN4RFFVWkVPenRCUVVsQkxGTkJRVk5wUWl4VlFVRlVMRU5CUVhGQ2VFZ3NSMEZCY2tJc1JVRkJNRUl5UXl4TlFVRXhRaXhGUVVGclF6aEVMRmxCUVd4RExFVkJRV2RFUml4UlFVRm9SQ3hGUVVFd1JEdEJRVU40UkN4TlFVRkpMRU5CUVVOQkxGRkJRVXdzUlVGQlpUdEJRVU5pYmtVc1YwRkJUeXhQUVVGUGNVVXNXVUZCVUN4TFFVRjNRaXhUUVVFdlFpeEZRVUV3UXl3eVFrRkJNVU03UVVGRFFYSkZMRmRCUVU5UExGTkJRVk1zUTBGQlZDeEhRVUZoTTBNc1NVRkJTVmtzVFVGQmVFSXNSVUZCWjBNc2NVTkJRV2hETzBGQlEwUTdPMEZCUlVRc1UwRkJUMjVDTEZGQlFWRm5TU3hKUVVGU0xFTkJRV0Y2U0N4SFFVRmlMRVZCUVd0Q01rTXNUVUZCYkVJc1JVRkJNRUk0UkN4WlFVRXhRaXhGUVVGM1F5eEZRVUY0UXl4RlFVRTBReXhEUVVFMVF5eERRVUZRTzBGQlEwUTdPMEZCUlVRNVJ5eFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFqWkVMRmRCUVdwQ0xFZEJRU3RDTEZWQlFWVXZSU3hOUVVGV0xFVkJRV3RDTkVRc1VVRkJiRUlzUlVGQk5FSTdRVUZEZWtRc1UwRkJUMmxDTEZkQlFWY3NTVUZCV0N4RlFVRnBRamRGTEUxQlFXcENMRVZCUVhsQ0xFbEJRWHBDTEVWQlFTdENORVFzVVVGQkwwSXNRMEZCVUR0QlFVTkVMRU5CUmtRN08wRkJTVUUxUnl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUWpoRUxGZEJRV3BDTEVkQlFTdENMRlZCUVZWb1JpeE5RVUZXTEVWQlFXdENORVFzVVVGQmJFSXNSVUZCTkVJN1FVRkRla1FzVTBGQlQybENMRmRCUVZjc1NVRkJXQ3hGUVVGcFFqZEZMRTFCUVdwQ0xFVkJRWGxDTEV0QlFYcENMRVZCUVdkRE5FUXNVVUZCYUVNc1EwRkJVRHRCUVVORUxFTkJSa1E3TzBGQlNVRXNVMEZCVTNGQ0xGZEJRVlFzUTBGQmMwSTFTQ3hIUVVGMFFpeEZRVUV5UWpKRExFMUJRVE5DTEVWQlFXMURPRVFzV1VGQmJrTXNSVUZCYVVSR0xGRkJRV3BFTEVWQlFUSkVPMEZCUTNwRUxFMUJRVWtzUTBGQlEwRXNVVUZCVEN4RlFVRmxPMEZCUTJKdVJTeFhRVUZQTEU5QlFVOXhSU3haUVVGUUxFdEJRWGRDTEZOQlFTOUNMRVZCUVRCRExESkNRVUV4UXp0QlFVTkJja1VzVjBGQlQwOHNVMEZCVXl4RFFVRlVMRWRCUVdFelF5eEpRVUZKV1N4TlFVRjRRaXhGUVVGblF5eHhRMEZCYUVNN1FVRkRSRHM3UVVGRlJDeFRRVUZQYmtJc1VVRkJVV2RKTEVsQlFWSXNRMEZCWVhwSUxFZEJRV0lzUlVGQmEwSXlReXhOUVVGc1FpeEZRVUV3UWpoRUxGbEJRVEZDTEVWQlFYZERMRVZCUVhoRExFVkJRVFJETEVOQlFUVkRMRU5CUVZBN1FVRkRSRHM3UVVGRlJEbEhMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENaMFVzV1VGQmFrSXNSMEZCWjBNc1ZVRkJWV3hHTEUxQlFWWXNSVUZCYTBJMFJDeFJRVUZzUWl4RlFVRTBRanRCUVVNeFJDeFRRVUZQY1VJc1dVRkJXU3hKUVVGYUxFVkJRV3RDYWtZc1RVRkJiRUlzUlVGQk1FSXNTVUZCTVVJc1JVRkJaME0wUkN4UlFVRm9ReXhEUVVGUU8wRkJRMFFzUTBGR1JEczdRVUZKUVRWSExFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ2FVVXNXVUZCYWtJc1IwRkJaME1zVlVGQlZXNUdMRTFCUVZZc1JVRkJhMEkwUkN4UlFVRnNRaXhGUVVFMFFqdEJRVU14UkN4VFFVRlBjVUlzV1VGQldTeEpRVUZhTEVWQlFXdENha1lzVFVGQmJFSXNSVUZCTUVJc1MwRkJNVUlzUlVGQmFVTTBSQ3hSUVVGcVF5eERRVUZRTzBGQlEwUXNRMEZHUkRzN1FVRkpRVFZITEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDZVVNc1ZVRkJha0lzUjBGQk9FSXNWVUZCVlhsQ0xFdEJRVllzUlVGQmFVSndSaXhOUVVGcVFpeEZRVUY1UWpSRUxGRkJRWHBDTEVWQlFXMURPMEZCUXk5RUxFMUJRVWtzUTBGQlEwRXNVVUZCVEN4RlFVRmxPMEZCUTJKdVJTeFhRVUZQTWtZc1ZVRkJWVzVITEZOQlFWWXNTVUZCZFVKdFJ5eFZRVUZWTEVsQlFYaERMRVZCUVRoRExHVkJRVGxETzBGQlEwRXpSaXhYUVVGUFR5eFhRVUZYWml4VFFVRllMRWxCUVhkQ1pTeFhRVUZYTEVsQlFURkRMRVZCUVdkRUxHZENRVUZvUkR0QlFVTkJVQ3hYUVVGUFR5eFRRVUZUTEV0QlFVc3ZRaXhOUVVGeVFpeEZRVUUyUWl4elEwRkJOMEk3UVVGRFFXOUlMR05CUVZWRUxFdEJRVllzUlVGQmFVSXNTVUZCYWtJN1FVRkRSRHM3UVVGRlJDeE5RVUZKY0VZc1ZVRkJWU3hMUVVGTEwwSXNUVUZCYmtJc1JVRkJNa0k3TzBGQlJUTkNMRTlCUVVzclFpeE5RVUZNTEVsQlFXVnZSaXhMUVVGbU8wRkJRMFFzUTBGWVJEczdRVUZoUVN4VFFVRlRSU3haUVVGVUxFTkJRWFZDYWtrc1IwRkJka0lzUlVGQk5FSXJTQ3hMUVVFMVFpeEZRVUZ0UTNCR0xFMUJRVzVETEVWQlFUSkRPRVFzV1VGQk0wTXNSVUZCZVVSR0xGRkJRWHBFTEVWQlFXMUZPMEZCUTJwRkxFMUJRVWtzUTBGQlEwRXNVVUZCVEN4RlFVRmxPMEZCUTJKdVJTeFhRVUZQTWtZc1ZVRkJWVzVITEZOQlFWWXNTVUZCZFVKdFJ5eFZRVUZWTEVsQlFYaERMRVZCUVRoRExHVkJRVGxETzBGQlEwRXpSaXhYUVVGUExFOUJRVTl4UlN4WlFVRlFMRXRCUVhkQ0xGTkJRUzlDTEVWQlFUQkRMREpDUVVFeFF6dEJRVU5CY2tVc1YwRkJUMDhzVjBGQlYyWXNVMEZCV0N4SlFVRjNRbVVzVjBGQlZ5eEpRVUV4UXl4RlFVRm5SQ3huUWtGQmFFUTdRVUZEUVZBc1YwRkJUMDhzVTBGQlV5eERRVUZVTEVkQlFXRXpReXhKUVVGSldTeE5RVUY0UWl4RlFVRm5ReXh6UTBGQmFFTTdRVUZEUVc5SUxHTkJRVlZFTEV0QlFWWXNSVUZCYVVJc1RVRkJha0k3UVVGRFJEczdRVUZGUkN4TlFVRkpOVU1zVFVGQlRXNUdMRWxCUVVsWkxFMUJRV1E3UVVGRFFTeE5RVUZKSzBJc1ZVRkJWWGRETEVkQlFXUXNSVUZEUlRzN1FVRkZSaXhQUVVGTExFbEJRVWxxUlN4SlFVRkpMRU5CUVZJc1JVRkJWMmRJTEVsQlFVa3pReXhMUVVGTFF5eEhRVUZNTEVOQlFWTk1MRTFCUVUxNFF5eE5RVUZtTEVWQlFYVkNMRU5CUVhaQ0xFTkJRWEJDTEVWQlFTdERla0lzU1VGQlNXZElMRU5CUVc1RUxFVkJRWE5FYUVnc1IwRkJkRVFzUlVGQk1rUTdRVUZEZWtSc1FpeFJRVUZKTWtNc1UwRkJVM3BDTEVOQlFXSXNTVUZEU1N4RFFVRkROa2NzVVVGQlV5eFJRVUZUTEV0QlFVdDBRaXhsUVVGbGRrWXNRMEZCWml4SFFVRnRRaXhKUVVGSlFTeERRVUUxUWl4RFFVRnVRaXhOUVVOSkxFTkJRVU4xUml4bFFVRmxka1lzUTBGQlppeEhRVUZ0UWl4SlFVRkpRU3hEUVVGNFFpeEpRVUUyUWl4RFFVWnlRenRCUVVkRU8wRkJRMFk3TzBGQlJVUjJRaXhQUVVGUGEwVXNVMEZCVUN4RFFVRnBRbk5GTEdGQlFXcENMRWRCUVdsRExGVkJRVlZLTEV0QlFWWXNSVUZCYVVKd1JpeE5RVUZxUWl4RlFVRjVRalJFTEZGQlFYcENMRVZCUVcxRE8wRkJRMnhGTUVJc1pVRkJZU3hKUVVGaUxFVkJRVzFDUml4TFFVRnVRaXhGUVVFd1FuQkdMRTFCUVRGQ0xFVkJRV3RETEVsQlFXeERMRVZCUVhkRE5FUXNVVUZCZUVNN1FVRkRSQ3hEUVVaRU96dEJRVWxCTlVjc1QwRkJUMnRGTEZOQlFWQXNRMEZCYVVKMVJTeGhRVUZxUWl4SFFVRnBReXhWUVVGVlRDeExRVUZXTEVWQlFXbENjRVlzVFVGQmFrSXNSVUZCZVVJMFJDeFJRVUY2UWl4RlFVRnRRenRCUVVOc1JUQkNMR1ZCUVdFc1NVRkJZaXhGUVVGdFFrWXNTMEZCYmtJc1JVRkJNRUp3Uml4TlFVRXhRaXhGUVVGclF5eExRVUZzUXl4RlFVRjVRelJFTEZGQlFYcERPMEZCUTBRc1EwRkdSRHM3UVVGSlFTeFRRVUZUT0VJc1dVRkJWQ3hEUVVGMVFuSkpMRWRCUVhaQ0xFVkJRVFJDSzBnc1MwRkJOVUlzUlVGQmJVTndSaXhOUVVGdVF5eEZRVUV5UXpoRUxGbEJRVE5ETEVWQlFYbEVSaXhSUVVGNlJDeEZRVUZ0UlR0QlFVTnFSU3hOUVVGSkxFTkJRVU5CTEZGQlFVd3NSVUZCWlR0QlFVTmlia1VzVjBGQlR6SkdMRlZCUVZWdVJ5eFRRVUZXTEVsQlFYVkNiVWNzVlVGQlZTeEpRVUY0UXl4RlFVRTRReXhsUVVFNVF6dEJRVU5CTTBZc1YwRkJUeXhQUVVGUGNVVXNXVUZCVUN4TFFVRjNRaXhUUVVFdlFpeEZRVUV3UXl3eVFrRkJNVU03UVVGRFFYSkZMRmRCUVU5UExGZEJRVmRtTEZOQlFWZ3NTVUZCZDBKbExGZEJRVmNzU1VGQk1VTXNSVUZCWjBRc1owSkJRV2hFTzBGQlEwRlFMRmRCUVU5UExGTkJRVk1zUTBGQlZDeEhRVUZoTTBNc1NVRkJTVmtzVFVGQmVFSXNSVUZCWjBNc2MwTkJRV2hETzBGQlEwRnZTQ3hqUVVGVlJDeExRVUZXTEVWQlFXbENMRlZCUVdwQ08wRkJRMFE3TzBGQlJVUXNUVUZCU1RWRExFMUJRVTF1Uml4SlFVRkpXU3hOUVVGa08wRkJRMEVzVFVGQlNTdENMRlZCUVZWM1F5eEhRVUZrTEVWQlEwVTdPMEZCUlVZc1QwRkJTeXhKUVVGSmFrVXNTVUZCU1N4RFFVRlNMRVZCUVZkblNDeEpRVUZKTTBNc1MwRkJTME1zUjBGQlRDeERRVUZUVEN4TlFVRk5lRU1zVFVGQlppeEZRVUYxUWl4RFFVRjJRaXhEUVVGd1FpeEZRVUVyUTNwQ0xFbEJRVWxuU0N4RFFVRnVSQ3hGUVVGelJHaElMRWRCUVhSRUxFVkJRVEpFTzBGQlEzcEViRUlzVVVGQlNUSkRMRk5CUVZONlFpeERRVUZpTEVsQlEwczJSeXhWUVVGVkxFTkJRVU4wUWl4bFFVRmxka1lzUTBGQlppeEhRVUZ0UWl4SlFVRkpRU3hEUVVGNFFpeEpRVUUyUWl4RFFVRjRReXhIUVVFMlF5eEpRVVJxUkR0QlFVVkVPMEZCUTBZN08wRkJSVVIyUWl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUW5sRkxHRkJRV3BDTEVkQlFXbERMRlZCUVZWUUxFdEJRVllzUlVGQmFVSndSaXhOUVVGcVFpeEZRVUY1UWpSRUxGRkJRWHBDTEVWQlFXMURPMEZCUTJ4Rk9FSXNaVUZCWVN4SlFVRmlMRVZCUVcxQ1RpeExRVUZ1UWl4RlFVRXdRbkJHTEUxQlFURkNMRVZCUVd0RExFbEJRV3hETEVWQlFYZERORVFzVVVGQmVFTTdRVUZEUkN4RFFVWkVPenRCUVVsQk5VY3NUMEZCVDJ0RkxGTkJRVkFzUTBGQmFVSXdSU3hoUVVGcVFpeEhRVUZwUXl4VlFVRlZVaXhMUVVGV0xFVkJRV2xDY0VZc1RVRkJha0lzUlVGQmVVSTBSQ3hSUVVGNlFpeEZRVUZ0UXp0QlFVTnNSVGhDTEdWQlFXRXNTVUZCWWl4RlFVRnRRazRzUzBGQmJrSXNSVUZCTUVKd1JpeE5RVUV4UWl4RlFVRnJReXhMUVVGc1F5eEZRVUY1UXpSRUxGRkJRWHBETzBGQlEwUXNRMEZHUkRzN1FVRkpRVFZITEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDTWtVc1UwRkJha0lzUjBGQk5rSXNWVUZCVlZRc1MwRkJWaXhGUVVGcFFuQkdMRTFCUVdwQ0xFVkJRWGxDTkVRc1VVRkJla0lzUlVGQmJVTTdRVUZET1VRc1RVRkJTU3hEUVVGRFFTeFJRVUZNTEVWQlFXVTdRVUZEWW01RkxGZEJRVTh5Uml4VlFVRlZia2NzVTBGQlZpeEpRVUYxUW0xSExGVkJRVlVzU1VGQmVFTXNSVUZCT0VNc1pVRkJPVU03UVVGRFFUTkdMRmRCUVU5UExGZEJRVmRtTEZOQlFWZ3NTVUZCZDBKbExGZEJRVmNzU1VGQk1VTXNSVUZCWjBRc1owSkJRV2hFTzBGQlEwRlFMRmRCUVU5UExGTkJRVk1zUzBGQlN5OUNMRTFCUVhKQ0xFVkJRVFpDTEhORFFVRTNRanRCUVVOQk5rZ3NZMEZCVlZZc1MwRkJWaXhGUVVGcFFpeEpRVUZxUWl4RlFVRjFRaXhEUVVGRExFbEJRWGhDTzBGQlEwUTdPMEZCUlVRc1RVRkJTWEJHTEZWQlFWVXNTMEZCU3k5Q0xFMUJRVzVDTEVWQlEwVTdPMEZCUlVZc1RVRkJTVzFJTEZOQlFWTXNRMEZCWWl4RlFVTkZMRXRCUVV0NlFpeFZRVUZNTEVOQlFXZENlVUlzUzBGQmFFSXNSVUZCZFVKd1JpeE5RVUYyUWl4RlFVRXJRalJFTEZGQlFTOUNMRVZCUkVZc1MwRkhSU3hMUVVGTFJDeFZRVUZNTEVOQlFXZENMRTlCUVU5NVFpeExRVUZRTEVkQlFXVXNRMEZCTDBJc1JVRkJhME53Uml4TlFVRnNReXhGUVVFd1F6UkVMRkZCUVRGRE8wRkJRMGdzUTBGbVJEczdRVUZwUWtFc1UwRkJVMjFETEZkQlFWUXNRMEZCYzBJeFNTeEhRVUYwUWl4RlFVRXlRaXRJTEV0QlFUTkNMRVZCUVd0RGNFWXNUVUZCYkVNc1JVRkJNRU00UkN4WlFVRXhReXhGUVVGM1JFWXNVVUZCZUVRc1JVRkJhMFU3UVVGRGFFVXNUVUZCU1N4RFFVRkRRU3hSUVVGTUxFVkJRV1U3UVVGRFltNUZMRmRCUVU4eVJpeFZRVUZWYmtjc1UwRkJWaXhKUVVGMVFtMUhMRlZCUVZVc1NVRkJlRU1zUlVGQk9FTXNaVUZCT1VNN1FVRkRRVE5HTEZkQlFVOHNUMEZCVDNGRkxGbEJRVkFzUzBGQmQwSXNVMEZCTDBJc1JVRkJNRU1zTWtKQlFURkRPMEZCUTBGeVJTeFhRVUZQVHl4WFFVRlhaaXhUUVVGWUxFbEJRWGRDWlN4WFFVRlhMRWxCUVRGRExFVkJRV2RFTEdkQ1FVRm9SRHRCUVVOQlVDeFhRVUZQVHl4VFFVRlRMRU5CUVZRc1IwRkJZVE5ETEVsQlFVbFpMRTFCUVhoQ0xFVkJRV2RETEhORFFVRm9RenRCUVVOQk5rZ3NZMEZCVlZZc1MwRkJWaXhGUVVGcFFpeE5RVUZxUWl4RlFVRjVRaXhEUVVGRExFMUJRVEZDTzBGQlEwUTdPMEZCUlVRc1RVRkJTVFZETEUxQlFVMXVSaXhKUVVGSldTeE5RVUZrTzBGQlEwRXNUVUZCU1N0Q0xGVkJRVlYzUXl4SFFVRmtMRVZCUTBVN08wRkJSVVlzVFVGQlNUUkRMRk5CUVZNc1EwRkJZaXhGUVVORlJTeGhRVUZoYWtrc1IwRkJZaXhGUVVGclFpdElMRXRCUVd4Q0xFVkJRWGxDY0VZc1RVRkJla0lzUlVGQmFVTTRSQ3haUVVGcVF5eEZRVUVyUTBZc1VVRkJMME1zUlVGRVJpeExRVWRGTUVJc1lVRkJZV3BKTEVkQlFXSXNSVUZCYTBJc1UwRkJVeXRJTEV0QlFWUXNSMEZCYVVJc1EwRkJia01zUlVGQmMwTndSaXhOUVVGMFF5eEZRVUU0UXpoRUxGbEJRVGxETEVWQlFUUkVSaXhSUVVFMVJEdEJRVU5JT3p0QlFVVkVOVWNzVDBGQlQydEZMRk5CUVZBc1EwRkJhVUk0UlN4WlFVRnFRaXhIUVVGblF5eFZRVUZWV2l4TFFVRldMRVZCUVdsQ2NFWXNUVUZCYWtJc1JVRkJlVUkwUkN4UlFVRjZRaXhGUVVGdFF6dEJRVU5xUlcxRExHTkJRVmtzU1VGQldpeEZRVUZyUWxnc1MwRkJiRUlzUlVGQmVVSndSaXhOUVVGNlFpeEZRVUZwUXl4SlFVRnFReXhGUVVGMVF6UkVMRkZCUVhaRE8wRkJRMFFzUTBGR1JEczdRVUZKUVRWSExFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ0swVXNXVUZCYWtJc1IwRkJaME1zVlVGQlZXSXNTMEZCVml4RlFVRnBRbkJHTEUxQlFXcENMRVZCUVhsQ05FUXNVVUZCZWtJc1JVRkJiVU03UVVGRGFrVnRReXhqUVVGWkxFbEJRVm9zUlVGQmEwSllMRXRCUVd4Q0xFVkJRWGxDY0VZc1RVRkJla0lzUlVGQmFVTXNTMEZCYWtNc1JVRkJkME0wUkN4UlFVRjRRenRCUVVORUxFTkJSa1E3TzBGQlNVRXNVMEZCVTNORExGZEJRVlFzUTBGQmMwSTNTU3hIUVVGMFFpeEZRVUV5UWl0SUxFdEJRVE5DTEVWQlFXdERjRVlzVFVGQmJFTXNSVUZCTUVNNFJDeFpRVUV4UXl4RlFVRjNSRVlzVVVGQmVFUXNSVUZCYTBVN1FVRkRhRVVzVFVGQlNTeERRVUZEUVN4UlFVRk1MRVZCUVdVN1FVRkRZbTVGTEZkQlFVOHlSaXhWUVVGVmJrY3NVMEZCVml4SlFVRjFRbTFITEZWQlFWVXNTVUZCZUVNc1JVRkJPRU1zWlVGQk9VTTdRVUZEUVROR0xGZEJRVThzVDBGQlQzRkZMRmxCUVZBc1MwRkJkMElzVTBGQkwwSXNSVUZCTUVNc01rSkJRVEZETzBGQlEwRnlSU3hYUVVGUFR5eFhRVUZYWml4VFFVRllMRWxCUVhkQ1pTeFhRVUZYTEVsQlFURkRMRVZCUVdkRUxHZENRVUZvUkR0QlFVTkJVQ3hYUVVGUFR5eFRRVUZUTEVOQlFWUXNSMEZCWVRORExFbEJRVWxaTEUxQlFYaENMRVZCUVdkRExITkRRVUZvUXp0QlFVTkJOa2dzWTBGQlZWWXNTMEZCVml4RlFVRnBRaXhWUVVGcVFpeEZRVUUyUWl4RFFVRkRMRlZCUVRsQ08wRkJRMFE3TzBGQlJVUXNUVUZCU1RWRExFMUJRVTF1Uml4SlFVRkpXU3hOUVVGa08wRkJRMEVzVFVGQlNTdENMRlZCUVZWM1F5eEhRVUZrTEVWQlEwVTdPMEZCUlVZc1RVRkJTVFJETEZOQlFWTXNRMEZCWWl4RlFVTkZUU3hoUVVGaGNra3NSMEZCWWl4RlFVRnJRaXRJTEV0QlFXeENMRVZCUVhsQ2NFWXNUVUZCZWtJc1JVRkJhVU00UkN4WlFVRnFReXhGUVVFclEwWXNVVUZCTDBNc1JVRkVSaXhMUVVkRk9FSXNZVUZCWVhKSkxFZEJRV0lzUlVGQmEwSXNZVUZCWVN0SUxFdEJRV0lzUjBGQmNVSXNRMEZCZGtNc1JVRkJNRU53Uml4TlFVRXhReXhGUVVGclJEaEVMRmxCUVd4RUxFVkJRV2RGUml4UlFVRm9SVHRCUVVOSU96dEJRVVZFTlVjc1QwRkJUMnRGTEZOQlFWQXNRMEZCYVVKcFJpeFpRVUZxUWl4SFFVRm5ReXhWUVVGVlppeExRVUZXTEVWQlFXbENjRVlzVFVGQmFrSXNSVUZCZVVJMFJDeFJRVUY2UWl4RlFVRnRRenRCUVVOcVJYTkRMR05CUVZrc1NVRkJXaXhGUVVGclFtUXNTMEZCYkVJc1JVRkJlVUp3Uml4TlFVRjZRaXhGUVVGcFF5eEpRVUZxUXl4RlFVRjFRelJFTEZGQlFYWkRPMEZCUTBRc1EwRkdSRHM3UVVGSlFUVkhMRTlCUVU5clJTeFRRVUZRTEVOQlFXbENhMFlzV1VGQmFrSXNSMEZCWjBNc1ZVRkJWV2hDTEV0QlFWWXNSVUZCYVVKd1JpeE5RVUZxUWl4RlFVRjVRalJFTEZGQlFYcENMRVZCUVcxRE8wRkJRMnBGYzBNc1kwRkJXU3hKUVVGYUxFVkJRV3RDWkN4TFFVRnNRaXhGUVVGNVFuQkdMRTFCUVhwQ0xFVkJRV2xETEV0QlFXcERMRVZCUVhkRE5FUXNVVUZCZUVNN1FVRkRSQ3hEUVVaRU96dEJRVWxCTEZOQlFWTjVReXhYUVVGVUxFTkJRWE5DYUVvc1IwRkJkRUlzUlVGQk1rSXJTQ3hMUVVFelFpeEZRVUZyUTNCR0xFMUJRV3hETEVWQlFUQkRPRVFzV1VGQk1VTXNSVUZCZDBSR0xGRkJRWGhFTEVWQlFXdEZPMEZCUTJoRkxFMUJRVWtzUTBGQlEwRXNVVUZCVEN4RlFVRmxPMEZCUTJKdVJTeFhRVUZQTWtZc1ZVRkJWVzVITEZOQlFWWXNTVUZCZFVKdFJ5eFZRVUZWTEVsQlFYaERMRVZCUVRoRExHVkJRVGxETzBGQlEwRXpSaXhYUVVGUExFOUJRVTl4UlN4WlFVRlFMRXRCUVhkQ0xGTkJRUzlDTEVWQlFUQkRMREpDUVVFeFF6dEJRVU5CY2tVc1YwRkJUMDhzVjBGQlYyWXNVMEZCV0N4SlFVRjNRbVVzVjBGQlZ5eEpRVUV4UXl4RlFVRm5SQ3huUWtGQmFFUTdRVUZEUVZBc1YwRkJUMDhzVTBGQlV5eERRVUZVTEVkQlFXRXpReXhKUVVGSldTeE5RVUY0UWl4RlFVRm5ReXh6UTBGQmFFTTdRVUZEUVhGSkxHbENRVUZoYkVJc1MwRkJZaXhGUVVGdlFpeHpRa0ZCY0VJc1JVRkJORU1zUTBGQlF5eHpRa0ZCTjBNN1FVRkRSRHM3UVVGRlJDeE5RVUZKTlVNc1RVRkJUVzVHTEVsQlFVbFpMRTFCUVdRN1FVRkRRU3hOUVVGSkswSXNWVUZCVlhkRExFZEJRV1FzUlVGRFJUczdRVUZGUmpGR0xGVkJRVkU0UWl4TFFVRlNMRU5CUVdOMlFpeEhRVUZrTEVWQlFXMUNLMGdzUzBGQmJrSXNSVUZCTUVKd1JpeE5RVUV4UWl4RlFVRnJRemhFTEZsQlFXeERMRVZCUVdkRUxFVkJRV2hFTEVWQlFXOUVMRU5CUVhCRU8wRkJRMFE3TzBGQlJVUTVSeXhQUVVGUGEwVXNVMEZCVUN4RFFVRnBRbkZHTEZsQlFXcENMRWRCUVdkRExGVkJRVlZ1UWl4TFFVRldMRVZCUVdsQ2NFWXNUVUZCYWtJc1JVRkJlVUkwUkN4UlFVRjZRaXhGUVVGdFF6dEJRVU5xUlhsRExHTkJRVmtzU1VGQldpeEZRVUZyUW1wQ0xFdEJRV3hDTEVWQlFYbENjRVlzVFVGQmVrSXNSVUZCYVVNc1NVRkJha01zUlVGQmRVTTBSQ3hSUVVGMlF6dEJRVU5FTEVOQlJrUTdPMEZCU1VFMVJ5eFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFuTkdMRmxCUVdwQ0xFZEJRV2RETEZWQlFWVndRaXhMUVVGV0xFVkJRV2xDY0VZc1RVRkJha0lzUlVGQmVVSTBSQ3hSUVVGNlFpeEZRVUZ0UXp0QlFVTnFSWGxETEdOQlFWa3NTVUZCV2l4RlFVRnJRbXBDTEV0QlFXeENMRVZCUVhsQ2NFWXNUVUZCZWtJc1JVRkJhVU1zUzBGQmFrTXNSVUZCZDBNMFJDeFJRVUY0UXp0QlFVTkVMRU5CUmtRN08wRkJTVUVzVTBGQlV6WkRMRmxCUVZRc1EwRkJkVUp3U2l4SFFVRjJRaXhGUVVFMFFpdElMRXRCUVRWQ0xFVkJRVzFEY0VZc1RVRkJia01zUlVGQk1rTTRSQ3haUVVFelF5eEZRVUY1UkVZc1VVRkJla1FzUlVGQmJVVTdRVUZEYWtVc1RVRkJTU3hEUVVGRFFTeFJRVUZNTEVWQlFXVTdRVUZEWW01RkxGZEJRVTh5Uml4VlFVRlZia2NzVTBGQlZpeEpRVUYxUW0xSExGVkJRVlVzU1VGQmVFTXNSVUZCT0VNc1pVRkJPVU03UVVGRFFUTkdMRmRCUVU4c1QwRkJUM0ZGTEZsQlFWQXNTMEZCZDBJc1UwRkJMMElzUlVGQk1FTXNNa0pCUVRGRE8wRkJRMEZ5UlN4WFFVRlBUeXhYUVVGWFppeFRRVUZZTEVsQlFYZENaU3hYUVVGWExFbEJRVEZETEVWQlFXZEVMR2RDUVVGb1JEdEJRVU5CVUN4WFFVRlBUeXhUUVVGVExFTkJRVlFzUjBGQllUTkRMRWxCUVVsWkxFMUJRWGhDTEVWQlEwa3NjME5CUkVvN1FVRkZRWEZKTEdsQ1FVRmhiRUlzUzBGQllpeEZRVUZ2UWl4MVFrRkJjRUlzUlVGQk5rTXNRMEZCUXl4MVFrRkJPVU03UVVGRFJEczdRVUZGUkN4TlFVRkpOVU1zVFVGQlRXNUdMRWxCUVVsWkxFMUJRV1E3UVVGRFFTeE5RVUZKSzBJc1ZVRkJWWGRETEVkQlFXUXNSVUZEUlRzN1FVRkZSakZHTEZWQlFWRTRRaXhMUVVGU0xFTkJRV04yUWl4SFFVRmtMRVZCUVcxQ0swZ3NTMEZCYmtJc1JVRkJNRUp3Uml4TlFVRXhRaXhGUVVGclF6aEVMRmxCUVd4RExFVkJRV2RFTEVWQlFXaEVMRVZCUVc5RUxFTkJRWEJFTzBGQlEwUTdPMEZCUlVRNVJ5eFBRVUZQYTBVc1UwRkJVQ3hEUVVGcFFuZEdMR0ZCUVdwQ0xFZEJRV2xETEZWQlFWVjBRaXhMUVVGV0xFVkJRV2xDY0VZc1RVRkJha0lzUlVGQmVVSTBSQ3hSUVVGNlFpeEZRVUZ0UXp0QlFVTnNSVFpETEdWQlFXRXNTVUZCWWl4RlFVRnRRbkpDTEV0QlFXNUNMRVZCUVRCQ2NFWXNUVUZCTVVJc1JVRkJhME1zU1VGQmJFTXNSVUZCZDBNMFJDeFJRVUY0UXp0QlFVTkVMRU5CUmtRN08wRkJTVUUxUnl4UFFVRlBhMFVzVTBGQlVDeERRVUZwUW5sR0xHRkJRV3BDTEVkQlFXbERMRlZCUVZWMlFpeExRVUZXTEVWQlFXbENjRVlzVFVGQmFrSXNSVUZCZVVJMFJDeFJRVUY2UWl4RlFVRnRRenRCUVVOc1JUWkRMR1ZCUVdFc1NVRkJZaXhGUVVGdFFuSkNMRXRCUVc1Q0xFVkJRVEJDY0VZc1RVRkJNVUlzUlVGQmEwTXNTMEZCYkVNc1JVRkJlVU0wUkN4UlFVRjZRenRCUVVORUxFTkJSa1E3TzBGQlNVRTdRVUZEUVRWSExFOUJRVTlyUlN4VFFVRlFMRU5CUVdsQ01FWXNTVUZCYWtJc1IwRkJkMElzVlVGQlZYaENMRXRCUVZZc1JVRkJhVUk1UkN4TFFVRnFRaXhGUVVGM1FrTXNSMEZCZUVJc1JVRkJOa0k3UVVGRGJrUXNUVUZCU1N4RFFVRkROa1FzUzBGQlRDeEZRVUZaUVN4UlFVRlJMRU5CUVZJN1FVRkRXaXhOUVVGSkxFTkJRVU01UkN4TFFVRk1MRVZCUVZsQkxGRkJRVkVzUTBGQlVqdEJRVU5hTEUxQlFVa3NRMEZCUTBNc1IwRkJUQ3hGUVVGVlFTeE5RVUZOTEV0QlFVdDBSQ3hOUVVGWU96dEJRVVZXTEUxQlFVa3NUMEZCVDIxSUxFdEJRVkFzUzBGQmFVSXNVVUZCY2tJc1JVRkJLMEk3UVVGRE4wSkJMRmxCUVZGQkxFMUJRVTE1UWl4VlFVRk9MRU5CUVdsQ0xFTkJRV3BDTEVOQlFWSTdRVUZEUkRzN1FVRkZSSEJJTEZOQlFVOHNUMEZCVHpKR0xFdEJRVkFzUzBGQmFVSXNVVUZCYWtJc1NVRkJOa0lzUTBGQlF6ZEZMRTFCUVUwMlJTeExRVUZPTEVOQlFYSkRMRVZCUVcxRUxIVkNRVUZ1UkR0QlFVTkJNMFlzVTBGQlR6aENMRTlCUVU5RUxFdEJRV1FzUlVGQmNVSXNZVUZCY2tJN08wRkJSVUU3UVVGRFFTeE5RVUZKUXl4UlFVRlJSQ3hMUVVGYUxFVkJRVzFDTzBGQlEyNUNMRTFCUVVrc1MwRkJTM0pFTEUxQlFVd3NTMEZCWjBJc1EwRkJjRUlzUlVGQmRVSTdPMEZCUlhaQ2QwSXNVMEZCVHpaQ0xGTkJRVk1zUTBGQlZDeEpRVUZqUVN4UlFVRlJMRXRCUVV0eVJDeE5RVUZzUXl4RlFVRXdReXh4UWtGQk1VTTdRVUZEUVhkQ0xGTkJRVTg0UWl4UFFVRlBMRU5CUVZBc1NVRkJXVUVzVDBGQlR5eExRVUZMZEVRc1RVRkJMMElzUlVGQmRVTXNiVUpCUVhaRE96dEJRVVZCTEU5QlFVc3NTVUZCU1Uwc1NVRkJTU3RETEV0QlFXSXNSVUZCYjBJdlF5eEpRVUZKWjBRc1IwRkJlRUlzUlVGQk5rSm9SQ3hIUVVFM1FpeEZRVUZyUXp0QlFVTm9ReXhUUVVGTFFTeERRVUZNTEVsQlFWVTJSeXhMUVVGV08wRkJRMFE3UVVGRFJpeERRWFJDUkRzN1FVRjNRa0Z3U1N4UFFVRlBhMFVzVTBGQlVDeERRVUZwUWpSR0xFOUJRV3BDTEVkQlFUSkNMRmxCUVZrN1FVRkRja01zVFVGQlNUbEVMRTFCUVUwc1JVRkJWanRCUVVOQkxFMUJRVWxTTEUxQlFVMHNTMEZCUzNaRkxFMUJRV1k3UVVGRFFTeFBRVUZMTEVsQlFVbE5MRWxCUVVrc1EwRkJZaXhGUVVGblFrRXNTVUZCU1dsRkxFZEJRWEJDTEVWQlFYbENha1VzUjBGQmVrSXNSVUZCT0VJN1FVRkROVUo1UlN4UlFVRkpla1VzUTBGQlNpeEpRVUZUTUVVc1RVRkJUU3hMUVVGTE1VVXNRMEZCVEN4RFFVRk9MRU5CUVZRN1FVRkRRU3hSUVVGSlFTeE5RVUZOZUVJc1VVRkJVVWNzYVVKQlFXeENMRVZCUVhGRE8wRkJRMjVET0VZc1ZVRkJTWHBGTEVsQlFVa3NRMEZCVWl4SlFVRmhMRXRCUVdJN1FVRkRRVHRCUVVORU8wRkJRMFk3UVVGRFJDeFRRVUZQTEdGQlFXRjVSU3hKUVVGSkswUXNTVUZCU2l4RFFVRlRMRWRCUVZRc1EwRkJZaXhIUVVFMlFpeEhRVUZ3UXp0QlFVTkVMRU5CV0VRN08wRkJZVUU3T3pzN1FVRkpRUzlLTEU5QlFVOXJSU3hUUVVGUUxFTkJRV2xDT0VZc1lVRkJha0lzUjBGQmFVTXNXVUZCV1R0QlFVTXpReXhOUVVGSkxFOUJRVTk0U2l4VlFVRlFMRXRCUVhOQ0xGZEJRVEZDTEVWQlFYVkRPMEZCUTNKRExGRkJRVWxTTEU5QlFVOUpMR1ZCUVZnc1JVRkJORUk3UVVGRE1VSXNZVUZCVVN4SlFVRkpTaXhOUVVGS0xFTkJRVmNzU1VGQldDeERRVUZFTEVOQlFXMUNhVXNzVFVGQk1VSTdRVUZEUkN4TFFVWkVMRTFCUlU4N1FVRkRUQ3hWUVVGSk5Vb3NUVUZCVFN4SlFVRkpSeXhWUVVGS0xFTkJRV1VzUzBGQlMxTXNUVUZCY0VJc1EwRkJWanRCUVVOQkxGZEJRVXNzU1VGQlNVMHNTVUZCU1N4RFFVRlNMRVZCUVZkcFJTeE5RVUZOYmtZc1NVRkJTVmtzVFVGQk1VSXNSVUZCYTBOTkxFbEJRVWxwUlN4SFFVRjBReXhGUVVFeVEycEZMRXRCUVVzc1EwRkJhRVE3UVVGRFJXeENMRmxCUVVsclFpeERRVUZLTEVsQlFWTXNTMEZCUzBFc1EwRkJUQ3hEUVVGVU8wRkJSRVlzVDBGRlFTeFBRVUZQYkVJc1NVRkJTVFJLTEUxQlFWZzdRVUZEUkR0QlFVTkdMRWRCVkVRc1RVRlRUenRCUVVOTUxGVkJRVTBzU1VGQlNUZEpMRXRCUVVvc1EwRkJWU3h2UkVGQlZpeERRVUZPTzBGQlEwUTdRVUZEUml4RFFXSkVPenRCUVdWQk8wRkJRMEU3TzBGQlJVRXNVMEZCVTBvc1ZVRkJWQ3hEUVVGeFFtdENMRWRCUVhKQ0xFVkJRVEJDTzBGQlEzaENMRTFCUVVsQkxFbEJRVWxuU1N4SlFVRlNMRVZCUVdNc1QwRkJUMmhKTEVsQlFVbG5TU3hKUVVGS0xFVkJRVkE3UVVGRFpDeFRRVUZQYUVrc1NVRkJTV2xKTEU5QlFVb3NRMEZCV1N4WlFVRmFMRVZCUVRCQ0xFVkJRVEZDTEVOQlFWQTdRVUZEUkRzN1FVRkZSQ3hKUVVGSlF5eExRVUZMY0Vzc1QwRkJUMnRGTEZOQlFXaENPenRCUVVWQk96czdRVUZIUVd4RkxFOUJRVTl4UWl4UlFVRlFMRWRCUVd0Q0xGVkJRVlZrTEVkQlFWWXNSVUZCWlR0QlFVTXZRa0VzVFVGQlNXVXNVMEZCU2l4SFFVRm5RaXhKUVVGb1FqczdRVUZGUVR0QlFVTkJaaXhOUVVGSk9Fb3NTVUZCU2l4SFFVRlhPVW9zU1VGQlNTdEdMRWRCUVdZN1FVRkRRUzlHTEUxQlFVbHBRaXhKUVVGS0xFZEJRVmRxUWl4SlFVRkphMGNzUjBGQlpqczdRVUZGUVR0QlFVTkJiRWNzVFVGQlNTdEdMRWRCUVVvc1IwRkJWVGhFTEVkQlFVYzVSQ3hIUVVGaU8wRkJRMEV2Uml4TlFVRkphMGNzUjBGQlNpeEhRVUZWTWtRc1IwRkJSek5FTEVkQlFXSTdPMEZCUlVGc1J5eE5RVUZKY1VJc1MwRkJTaXhIUVVGWmQwa3NSMEZCUjNoSkxFdEJRV1k3UVVGRFFYSkNMRTFCUVVrNFJDeFJRVUZLTEVkQlFXVXJSaXhIUVVGSEwwWXNVVUZCYkVJN1FVRkRRVGxFTEUxQlFVa3JTaXhqUVVGS0xFZEJRWEZDUml4SFFVRkhMMFlzVVVGQmVFSTdRVUZEUVRsRUxFMUJRVWwzUlN4TlFVRktMRWRCUVdGeFJpeEhRVUZIY2tZc1RVRkJhRUk3UVVGRFFYaEZMRTFCUVVselF5eEpRVUZLTEVkQlFWZDFTQ3hIUVVGSGRrZ3NTVUZCWkR0QlFVTkJkRU1zVFVGQlNUSkZMRXRCUVVvc1IwRkJXV3RHTEVkQlFVZHNSaXhMUVVGbU8wRkJRMEV6UlN4TlFVRkpiMElzVTBGQlNpeEhRVUZuUW5sSkxFZEJRVWQ2U1N4VFFVRnVRanRCUVVOQmNFSXNUVUZCU1hsSExGbEJRVW9zUjBGQmJVSnZSQ3hIUVVGSGNFUXNXVUZCZEVJN1FVRkRRWHBITEUxQlFVa3dSeXhaUVVGS0xFZEJRVzFDYlVRc1IwRkJSMjVFTEZsQlFYUkNPMEZCUTBFeFJ5eE5RVUZKTkVjc1dVRkJTaXhIUVVGdFFtbEVMRWRCUVVkcVJDeFpRVUYwUWp0QlFVTkJOVWNzVFVGQlNUWkhMRmxCUVVvc1IwRkJiVUpuUkN4SFFVRkhhRVFzV1VGQmRFSTdRVUZEUVRkSExFMUJRVWs0Unl4UlFVRktMRWRCUVdVclF5eEhRVUZITDBNc1VVRkJiRUk3UVVGRFFUbEhMRTFCUVVscFNDeFhRVUZLTEVkQlFXdENORU1zUjBGQlJ6VkRMRmRCUVhKQ08wRkJRMEZxU0N4TlFVRkphMGdzVjBGQlNpeEhRVUZyUWpKRExFZEJRVWN6UXl4WFFVRnlRanRCUVVOQmJFZ3NUVUZCU1c5SUxGZEJRVW9zUjBGQmEwSjVReXhIUVVGSGVrTXNWMEZCY2tJN1FVRkRRWEJJTEUxQlFVbHhTQ3hYUVVGS0xFZEJRV3RDZDBNc1IwRkJSM2hETEZkQlFYSkNPMEZCUTBGeVNDeE5RVUZKZDBnc1YwRkJTaXhIUVVGclFuRkRMRWRCUVVkeVF5eFhRVUZ5UWp0QlFVTkJlRWdzVFVGQlNYbElMRmRCUVVvc1IwRkJhMEp2UXl4SFFVRkhjRU1zVjBGQmNrSTdRVUZEUVhwSUxFMUJRVWt5U0N4WlFVRktMRWRCUVcxQ2EwTXNSMEZCUjJ4RExGbEJRWFJDTzBGQlEwRXpTQ3hOUVVGSk5FZ3NXVUZCU2l4SFFVRnRRbWxETEVkQlFVZHFReXhaUVVGMFFqdEJRVU5CTlVnc1RVRkJTVzlITEZWQlFVb3NSMEZCYVVKNVJDeEhRVUZIZWtRc1ZVRkJjRUk3UVVGRFFYQkhMRTFCUVVscFNTeGhRVUZLTEVkQlFXOUNORUlzUjBGQlJ6VkNMR0ZCUVhaQ08wRkJRMEZxU1N4TlFVRkphMGtzWVVGQlNpeEhRVUZ2UWpKQ0xFZEJRVWN6UWl4aFFVRjJRanRCUVVOQmJFa3NUVUZCU1c5SkxHRkJRVW9zUjBGQmIwSjVRaXhIUVVGSGVrSXNZVUZCZGtJN1FVRkRRWEJKTEUxQlFVbHhTU3hoUVVGS0xFZEJRVzlDZDBJc1IwRkJSM2hDTEdGQlFYWkNPMEZCUTBGeVNTeE5RVUZKYzBrc1UwRkJTaXhIUVVGblFuVkNMRWRCUVVkMlFpeFRRVUZ1UWp0QlFVTkJkRWtzVFVGQlNYbEpMRmxCUVVvc1IwRkJiVUp2UWl4SFFVRkhjRUlzV1VGQmRFSTdRVUZEUVhwSkxFMUJRVWt3U1N4WlFVRktMRWRCUVcxQ2JVSXNSMEZCUjI1Q0xGbEJRWFJDTzBGQlEwRXhTU3hOUVVGSk5Fa3NXVUZCU2l4SFFVRnRRbWxDTEVkQlFVZHFRaXhaUVVGMFFqdEJRVU5CTlVrc1RVRkJTVFpKTEZsQlFVb3NSMEZCYlVKblFpeEhRVUZIYUVJc1dVRkJkRUk3UVVGRFFUZEpMRTFCUVVsblNpeFpRVUZLTEVkQlFXMUNZU3hIUVVGSFlpeFpRVUYwUWp0QlFVTkJhRW9zVFVGQlNXbEtMRmxCUVVvc1IwRkJiVUpaTEVkQlFVZGFMRmxCUVhSQ08wRkJRMEZxU2l4TlFVRkpiVW9zWVVGQlNpeEhRVUZ2UWxVc1IwRkJSMVlzWVVGQmRrSTdRVUZEUVc1S0xFMUJRVWx2U2l4aFFVRktMRWRCUVc5Q1V5eEhRVUZIVkN4aFFVRjJRanRCUVVOQmNFb3NUVUZCU1hGS0xFbEJRVW9zUjBGQlYxRXNSMEZCUjFJc1NVRkJaRHRCUVVOQmNrb3NUVUZCU1hWS0xFOUJRVW9zUjBGQlkwMHNSMEZCUjA0c1QwRkJha0k3UVVGRFFYWktMRTFCUVVsNVNpeGhRVUZLTEVkQlFXOUNTU3hIUVVGSFNpeGhRVUYyUWpzN1FVRkZRU3hUUVVGUGVrb3NSMEZCVUR0QlFVTkVMRU5CYkVSRU96dEJRVzlFUVR0QlFVTkJMRk5CUVZNMFJpeExRVUZVTEVOQlFXZENiMFVzUzBGQmFFSXNSVUZCZFVJdlJTeEhRVUYyUWl4RlFVRTBRbWRHTEZsQlFUVkNMRVZCUVRCRE8wRkJRM2hETEUxQlFVa3NUMEZCVDBRc1MwRkJVQ3hMUVVGcFFpeFJRVUZ5UWl4RlFVRXJRaXhQUVVGUFF5eFpRVUZRTzBGQlF5OUNSQ3hWUVVGUkxFTkJRVU1zUTBGQlEwRXNTMEZCVml4RFFVWjNReXhEUVVWMFFqdEJRVU5zUWl4TlFVRkpRU3hUUVVGVEwwVXNSMEZCWWl4RlFVRnJRaXhQUVVGUFFTeEhRVUZRTzBGQlEyeENMRTFCUVVrclJTeFRRVUZUTEVOQlFXSXNSVUZCWjBJc1QwRkJUMEVzUzBGQlVEdEJRVU5vUWtFc1YwRkJVeTlGTEVkQlFWUTdRVUZEUVN4TlFVRkpLMFVzVTBGQlV5eERRVUZpTEVWQlFXZENMRTlCUVU5QkxFdEJRVkE3UVVGRGFFSXNVMEZCVHl4RFFVRlFPMEZCUTBRN08wRkJSVVFzVTBGQlUzSktMRTFCUVZRc1EwRkJhVUpFTEUxQlFXcENMRVZCUVhsQ08wRkJRM1pDTzBGQlEwRTdRVUZEUVR0QlFVTkJRU3hYUVVGVExFTkJRVU1zUTBGQlF6SkZMRXRCUVVzMlJTeEpRVUZNTEVOQlFWVXNRMEZCUTNoS0xFMUJRVmdzUTBGQldEdEJRVU5CTEZOQlFVOUJMRk5CUVZNc1EwRkJWQ3hIUVVGaExFTkJRV0lzUjBGQmFVSkJMRTFCUVhoQ08wRkJRMFE3TzBGQlJVUXNVMEZCVTNsQ0xFOUJRVlFzUTBGQmEwSTVRaXhQUVVGc1FpeEZRVUV5UWp0QlFVTjZRaXhUUVVGUExFTkJRVU54UlN4TlFVRk5ka01zVDBGQlRpeEpRVUZwUWl4VlFVRlZPVUlzVDBGQlZpeEZRVUZ0UWp0QlFVTXhReXhYUVVGUE9Fb3NUMEZCVDNoSExGTkJRVkFzUTBGQmFVSkhMRkZCUVdwQ0xFTkJRVEJDWXl4SlFVRXhRaXhEUVVFclFuWkZMRTlCUVM5Q0xFMUJRVFJETEdkQ1FVRnVSRHRCUVVORUxFZEJSazBzUlVGRlNrRXNUMEZHU1N4RFFVRlFPMEZCUjBRN08wRkJSVVFzVTBGQlUyRXNWVUZCVkN4RFFVRnhRbUlzVDBGQmNrSXNSVUZCT0VJN1FVRkROVUlzVTBGQlR6aENMRkZCUVZFNVFpeFBRVUZTTEV0QlFXOUNXaXhQUVVGUE1FSXNVVUZCVUN4RFFVRm5RbVFzVDBGQmFFSXNRMEZCY0VJc1NVRkRTRUVzVjBGQlZ5eFJRVUZQUVN4UFFVRlFMSGxEUVVGUFFTeFBRVUZRTEU5QlFXMUNMRkZCUVRsQ0xFbEJRMEVzVDBGQlQwRXNVVUZCVVVzc1RVRkJaaXhMUVVFd1FpeFJRVVk1UWp0QlFVZEVPenRCUVVWRUxGTkJRVk5uUml4TFFVRlVMRU5CUVdkQ01FVXNRMEZCYUVJc1JVRkJiVUk3UVVGRGFrSXNUVUZCU1VFc1NVRkJTU3hGUVVGU0xFVkJRVmtzVDBGQlR5eE5RVUZOUVN4RlFVRkZkRWNzVVVGQlJpeERRVUZYTEVWQlFWZ3NRMEZCWWp0QlFVTmFMRk5CUVU5elJ5eEZRVUZGZEVjc1VVRkJSaXhEUVVGWExFVkJRVmdzUTBGQlVEdEJRVU5FT3p0QlFVVkVMRk5CUVZOcVF5eFhRVUZVTEVOQlFYTkNSaXhIUVVGMFFpeEZRVUV5UWp0QlFVTjZRaXhOUVVGSk1Fa3NXVUZCV1N4RlFVRm9RanRCUVVOQkxFOUJRVXNzU1VGQlNYSktMRWxCUVVrc1EwRkJZaXhGUVVGblFrRXNTVUZCU1Zjc1NVRkJTV3BDTEUxQlFYaENMRVZCUVdkRFRTeEhRVUZvUXl4RlFVRnhRenRCUVVOdVF5eFJRVUZKVXl4SlFVRkpSU3hKUVVGSk1rZ3NWVUZCU2l4RFFVRmxkRWtzUTBGQlppeERRVUZTTzBGQlEwRXNVVUZCU1ZNc1MwRkJTeXhKUVVGVUxFVkJRMFUwU1N4VlFVRlZReXhKUVVGV0xFTkJRV1V6U1N4SlFVRkpNa2dzVlVGQlNpeERRVUZsZEVrc1EwRkJaaXhEUVVGbUxFVkJSRVlzUzBGRlN6dEJRVU5JTEZWQlFVa3JReXhSUVVGUkwwTXNRMEZCV2p0QlFVTkJMRlZCUVVsVExFdEJRVXNzVFVGQlRDeEpRVUZsUVN4TFFVRkxMRTFCUVhoQ0xFVkJRV2REVkR0QlFVTm9ReXhWUVVGSmRVb3NTVUZCU1VNc2JVSkJRVzFDTjBrc1NVRkJTV2RFTEV0QlFVb3NRMEZCVlZvc1MwRkJWaXhGUVVGcFFpOURMRWxCUVVVc1EwRkJia0lzUTBGQmJrSXNSVUZCTUVNclFpeE5RVUV4UXl4RFFVRnBSQ3hEUVVGcVJDeEZRVUZ2UkRCSUxFdEJRWEJFTEVOQlFUQkVMRWRCUVRGRUxFTkJRVkk3UVVGRFFTeFhRVUZMTEVsQlFVbDZReXhKUVVGSkxFTkJRV0lzUlVGQlowSkJMRWxCUVVsMVF5eEZRVUZGTjBvc1RVRkJkRUlzUlVGQk9FSnpTQ3hIUVVFNVFqdEJRVU5GY1VNc2EwSkJRVlZETEVsQlFWWXNRMEZCWlhoSUxGTkJRVk41U0N4RlFVRkZka01zUTBGQlJpeERRVUZVTEVWQlFXVXNSVUZCWml4RFFVRm1PMEZCUkVZN1FVRkZSRHRCUVVOR08wRkJRMFFzVTBGQlQzRkRMRk5CUVZBN1FVRkRSRHM3UVVGRlJDeFRRVUZUTDBjc1dVRkJWQ3hEUVVGMVFqTkNMRWRCUVhaQ0xFVkJRVFJDTzBGQlF6RkNMRTFCUVVrd1NTeFpRVUZaTEVWQlFXaENPMEZCUTBFc1QwRkJTeXhKUVVGSmNrb3NTVUZCU1N4RFFVRmlMRVZCUVdkQ1FTeEpRVUZKVnl4SlFVRkpha0lzVFVGQmVFSXNSVUZCWjBOTkxFZEJRV2hETEVWQlFYRkRPMEZCUTI1RE8wRkJRMEZ4U2l4alFVRlZReXhKUVVGV0xFTkJRV1V6U1N4SlFVRkpNa2dzVlVGQlNpeERRVUZsZEVrc1EwRkJaaXhKUVVGdlFpeEpRVUZ1UXp0QlFVTkVPMEZCUTBRc1UwRkJUM0ZLTEZOQlFWQTdRVUZEUkRzN1FVRkZSQ3hUUVVGVE0wY3NZMEZCVkN4RFFVRjVRaTlDTEVkQlFYcENMRVZCUVRoQ08wRkJRelZDTEUxQlFVa3JTU3hEUVVGS0xFVkJRVTlETEVWQlFWQXNSVUZCVjBNc1JVRkJXRHRCUVVOQkxFMUJRVWxRTEZsQlFWa3NSVUZCYUVJN1FVRkRRU3hQUVVGTExFbEJRVWx5U2l4SlFVRkpMRU5CUVdJc1JVRkJaMEpCTEVsQlFVbFhMRWxCUVVscVFpeE5RVUY0UWl4RlFVRm5RMDBzUjBGQmFFTXNSVUZCY1VNN1FVRkRia013U2l4UlFVRkpMMGtzU1VGQlNUSklMRlZCUVVvc1EwRkJaWFJKTEVOQlFXWXNRMEZCU2p0QlFVTkJNa29zVTBGQlMwUXNTMEZCU3l4RFFVRldPMEZCUTBGRkxGTkJRVXRHTEVsQlFVa3NSMEZCVkR0QlFVTkJUQ3hqUVVGVlF5eEpRVUZXTEVOQlFXVk5MRVZCUVdZN1FVRkRRVkFzWTBGQlZVTXNTVUZCVml4RFFVRmxTeXhGUVVGbU8wRkJRMFE3TzBGQlJVUXNVMEZCVDA0c1UwRkJVRHRCUVVORU96dEJRVVZFTEZOQlFWTjJTU3hoUVVGVUxFTkJRWGRDU0N4SFFVRjRRaXhGUVVFMlFqdEJRVU16UWl4VFFVRlBkRU1zVDBGQlQzZE1MRmRCUVZBc1EwRkJiVUpzU2l4SFFVRnVRaXhEUVVGUU8wRkJRMFE3TzBGQlJVUXNVMEZCVTNsQ0xGVkJRVlFzUTBGQmNVSXdTQ3hIUVVGeVFpeEZRVUV3UWtNc1IwRkJNVUlzUlVGQkswSjBTU3hOUVVFdlFpeEZRVUYxUXk5Q0xFMUJRWFpETEVWQlFTdERPMEZCUXpkRExFMUJRVWt3UWl4SFFVRktPMEZCUTBFc1QwRkJTeXhKUVVGSmNFSXNTVUZCU1N4RFFVRmlMRVZCUVdkQ1FTeEpRVUZKVGl4TlFVRndRaXhGUVVFMFFrMHNSMEZCTlVJc1JVRkJhVU03UVVGREwwSXNVVUZCUzBFc1NVRkJTWGxDTEUxQlFVb3NTVUZCWTNOSkxFbEJRVWx5U3l4TlFVRnVRaXhKUVVFclFrMHNTMEZCU3poS0xFbEJRVWx3U3l4TlFVRTFReXhGUVVORk8wRkJRMFp4U3l4UlFVRkpMMG9zU1VGQlNYbENMRTFCUVZJc1NVRkJhMEp4U1N4SlFVRkpPVW9zUTBGQlNpeERRVUZzUWp0QlFVTkVPMEZCUTBRc1UwRkJUMEVzUTBGQlVEdEJRVU5FT3p0QlFVVkVMRk5CUVZOMVJTeGpRVUZVTEVOQlFYbENOVVFzUjBGQmVrSXNSVUZCT0VJN1FVRkROVUlzVFVGQlNUdEJRVU5HTEZkQlFVOXhTaXh0UWtGQmJVSnlTaXhIUVVGdVFpeERRVUZRTzBGQlEwUXNSMEZHUkN4RFFVVkZMRTlCUVU5elNpeEhRVUZRTEVWQlFWazdRVUZEV2l4WFFVRlBNVW9zVDBGQlQybEZMRmxCUVZBc1EwRkJiMElzVFVGQmNFSXNRMEZCVUN4RFFVUlpMRU5CUTNWQ08wRkJRM0JETzBGQlEwWTdPMEZCUlVRN096czdPMEZCUzBFc1UwRkJVM05ETEZOQlFWUXNRMEZCYjBKRUxFdEJRWEJDTEVWQlFUSkNjVVFzUjBGQk0wSXNSVUZCWjBNN1FVRkRPVUpvU2l4VFFVRlBMRTlCUVU4eVJpeExRVUZRTEV0QlFXbENMRkZCUVhoQ0xFVkJRV3RETEhWRFFVRnNRenRCUVVOQk0wWXNVMEZCVHpKR0xGTkJRVk1zUTBGQmFFSXNSVUZCYlVJc01FUkJRVzVDTzBGQlEwRXpSaXhUUVVGUE1rWXNVMEZCVTNGRUxFZEJRV2hDTEVWQlFYRkNMRFpEUVVGeVFqdEJRVU5CYUVvc1UwRkJUMjFFTEV0QlFVczRSaXhMUVVGTUxFTkJRVmQwUkN4TFFVRllMRTFCUVhOQ1FTeExRVUUzUWl4RlFVRnZReXhyUTBGQmNFTTdRVUZEUkRzN1FVRkZSQ3hUUVVGVFZTeFRRVUZVTEVOQlFXOUNWaXhMUVVGd1FpeEZRVUV5UW5GRUxFZEJRVE5DTEVWQlFXZEROVVlzUjBGQmFFTXNSVUZCY1VNN1FVRkRia053UkN4VFFVRlBMRTlCUVU4eVJpeExRVUZRTEV0QlFXbENMRkZCUVhoQ0xFVkJRV3RETEhWRFFVRnNRenRCUVVOQk0wWXNVMEZCVHpKR0xGTkJRVk54UkN4SFFVRm9RaXhGUVVGeFFpeDVRMEZCY2tJN1FVRkRRV2hLTEZOQlFVOHlSaXhUUVVGVGRrTXNSMEZCYUVJc1JVRkJjVUlzTUVOQlFYSkNPMEZCUTBGd1JDeFRRVUZQYlVRc1MwRkJTemhHTEV0QlFVd3NRMEZCVjNSRUxFdEJRVmdzVFVGQmMwSkJMRXRCUVRkQ0xFVkJRVzlETEd0RFFVRndRenRCUVVORU96dEJRVVZFTEZOQlFWTnJRaXhaUVVGVUxFTkJRWFZDYkVJc1MwRkJka0lzUlVGQk9FSnhSQ3hIUVVFNVFpeEZRVUZ0UXpWR0xFZEJRVzVETEVWQlFYZERPMEZCUTNSRGNFUXNVMEZCVHl4UFFVRlBNa1lzUzBGQlVDeExRVUZwUWl4UlFVRjRRaXhGUVVGclF5eDFRMEZCYkVNN1FVRkRRVE5HTEZOQlFVOHlSaXhUUVVGVGNVUXNSMEZCYUVJc1JVRkJjVUlzZVVOQlFYSkNPMEZCUTBGb1NpeFRRVUZQTWtZc1UwRkJVM1pETEVkQlFXaENMRVZCUVhGQ0xEQkRRVUZ5UWp0QlFVTkVPenRCUVVWRUxGTkJRVk53UkN4TlFVRlVMRU5CUVdsQ2Ewb3NTVUZCYWtJc1JVRkJkVUpETEU5QlFYWkNMRVZCUVdkRE8wRkJRemxDTEUxQlFVa3NRMEZCUTBRc1NVRkJUQ3hGUVVGWExFMUJRVTBzU1VGQlNYWkxMRXRCUVVvc1EwRkJWWGRMTEZkQlFWY3NhMEpCUVhKQ0xFTkJRVTQ3UVVGRFdpSXNJbVpwYkdVaU9pSnBibVJsZUM1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJaThxSVZ4dUlDb2dWR2hsSUdKMVptWmxjaUJ0YjJSMWJHVWdabkp2YlNCdWIyUmxMbXB6TENCbWIzSWdkR2hsSUdKeWIzZHpaWEl1WEc0Z0tseHVJQ29nUUdGMWRHaHZjaUFnSUVabGNtOXpjeUJCWW05MWEyaGhaR2xxWldnZ1BHWmxjbTl6YzBCbVpYSnZjM011YjNKblBpQThhSFIwY0RvdkwyWmxjbTl6Y3k1dmNtYytYRzRnS2lCQWJHbGpaVzV6WlNBZ1RVbFVYRzRnS2k5Y2JseHVkbUZ5SUdKaGMyVTJOQ0E5SUhKbGNYVnBjbVVvSjJKaGMyVTJOQzFxY3ljcFhHNTJZWElnYVdWbFpUYzFOQ0E5SUhKbGNYVnBjbVVvSjJsbFpXVTNOVFFuS1Z4dVhHNWxlSEJ2Y25SekxrSjFabVpsY2lBOUlFSjFabVpsY2x4dVpYaHdiM0owY3k1VGJHOTNRblZtWm1WeUlEMGdRblZtWm1WeVhHNWxlSEJ2Y25SekxrbE9VMUJGUTFSZlRVRllYMEpaVkVWVElEMGdOVEJjYmtKMVptWmxjaTV3YjI5c1UybDZaU0E5SURneE9USmNibHh1THlvcVhHNGdLaUJKWmlCZ1FuVm1abVZ5TGw5MWMyVlVlWEJsWkVGeWNtRjVjMkE2WEc0Z0tpQWdJRDA5UFNCMGNuVmxJQ0FnSUZWelpTQlZhVzUwT0VGeWNtRjVJR2x0Y0d4bGJXVnVkR0YwYVc5dUlDaG1ZWE4wWlhOMEtWeHVJQ29nSUNBOVBUMGdabUZzYzJVZ0lDQlZjMlVnVDJKcVpXTjBJR2x0Y0d4bGJXVnVkR0YwYVc5dUlDaGpiMjF3WVhScFlteGxJR1J2ZDI0Z2RHOGdTVVUyS1Z4dUlDb3ZYRzVDZFdabVpYSXVYM1Z6WlZSNWNHVmtRWEp5WVhseklEMGdLR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdMeThnUkdWMFpXTjBJR2xtSUdKeWIzZHpaWElnYzNWd2NHOXlkSE1nVkhsd1pXUWdRWEp5WVhsekxpQlRkWEJ3YjNKMFpXUWdZbkp2ZDNObGNuTWdZWEpsSUVsRklERXdLeXdnUm1seVpXWnZlQ0EwS3l4Y2JpQWdMeThnUTJoeWIyMWxJRGNyTENCVFlXWmhjbWtnTlM0eEt5d2dUM0JsY21FZ01URXVOaXNzSUdsUFV5QTBMaklyTGlCSlppQjBhR1VnWW5KdmQzTmxjaUJrYjJWeklHNXZkQ0J6ZFhCd2IzSjBJR0ZrWkdsdVoxeHVJQ0F2THlCd2NtOXdaWEowYVdWeklIUnZJR0JWYVc1ME9FRnljbUY1WUNCcGJuTjBZVzVqWlhNc0lIUm9aVzRnZEdoaGRDZHpJSFJvWlNCellXMWxJR0Z6SUc1dklHQlZhVzUwT0VGeWNtRjVZQ0J6ZFhCd2IzSjBYRzRnSUM4dklHSmxZMkYxYzJVZ2QyVWdibVZsWkNCMGJ5QmlaU0JoWW14bElIUnZJR0ZrWkNCaGJHd2dkR2hsSUc1dlpHVWdRblZtWm1WeUlFRlFTU0J0WlhSb2IyUnpMaUJVYUdseklHbHpJR0Z1SUdsemMzVmxYRzRnSUM4dklHbHVJRVpwY21WbWIzZ2dOQzB5T1M0Z1RtOTNJR1pwZUdWa09pQm9kSFJ3Y3pvdkwySjFaM3BwYkd4aExtMXZlbWxzYkdFdWIzSm5MM05vYjNkZlluVm5MbU5uYVQ5cFpEMDJPVFUwTXpoY2JpQWdkSEo1SUh0Y2JpQWdJQ0IyWVhJZ1luVm1JRDBnYm1WM0lFRnljbUY1UW5WbVptVnlLREFwWEc0Z0lDQWdkbUZ5SUdGeWNpQTlJRzVsZHlCVmFXNTBPRUZ5Y21GNUtHSjFaaWxjYmlBZ0lDQmhjbkl1Wm05dklEMGdablZ1WTNScGIyNGdLQ2tnZXlCeVpYUjFjbTRnTkRJZ2ZWeHVJQ0FnSUhKbGRIVnliaUEwTWlBOVBUMGdZWEp5TG1admJ5Z3BJQ1ltWEc0Z0lDQWdJQ0FnSUhSNWNHVnZaaUJoY25JdWMzVmlZWEp5WVhrZ1BUMDlJQ2RtZFc1amRHbHZiaWNnTHk4Z1EyaHliMjFsSURrdE1UQWdiR0ZqYXlCZ2MzVmlZWEp5WVhsZ1hHNGdJSDBnWTJGMFkyZ2dLR1VwSUh0Y2JpQWdJQ0J5WlhSMWNtNGdabUZzYzJWY2JpQWdmVnh1ZlNrb0tWeHVYRzR2S2lwY2JpQXFJRU5zWVhOek9pQkNkV1ptWlhKY2JpQXFJRDA5UFQwOVBUMDlQVDA5UFQxY2JpQXFYRzRnS2lCVWFHVWdRblZtWm1WeUlHTnZibk4wY25WamRHOXlJSEpsZEhWeWJuTWdhVzV6ZEdGdVkyVnpJRzltSUdCVmFXNTBPRUZ5Y21GNVlDQjBhR0YwSUdGeVpTQmhkV2R0Wlc1MFpXUmNiaUFxSUhkcGRHZ2dablZ1WTNScGIyNGdjSEp2Y0dWeWRHbGxjeUJtYjNJZ1lXeHNJSFJvWlNCdWIyUmxJR0JDZFdabVpYSmdJRUZRU1NCbWRXNWpkR2x2Ym5NdUlGZGxJSFZ6WlZ4dUlDb2dZRlZwYm5RNFFYSnlZWGxnSUhOdklIUm9ZWFFnYzNGMVlYSmxJR0p5WVdOclpYUWdibTkwWVhScGIyNGdkMjl5YTNNZ1lYTWdaWGh3WldOMFpXUWdMUzBnYVhRZ2NtVjBkWEp1YzF4dUlDb2dZU0J6YVc1bmJHVWdiMk4wWlhRdVhHNGdLbHh1SUNvZ1Fua2dZWFZuYldWdWRHbHVaeUIwYUdVZ2FXNXpkR0Z1WTJWekxDQjNaU0JqWVc0Z1lYWnZhV1FnYlc5a2FXWjVhVzVuSUhSb1pTQmdWV2x1ZERoQmNuSmhlV0JjYmlBcUlIQnliM1J2ZEhsd1pTNWNiaUFxTDF4dVpuVnVZM1JwYjI0Z1FuVm1abVZ5SUNoemRXSnFaV04wTENCbGJtTnZaR2x1Wnl3Z2JtOWFaWEp2S1NCN1hHNGdJR2xtSUNnaEtIUm9hWE1nYVc1emRHRnVZMlZ2WmlCQ2RXWm1aWElwS1Z4dUlDQWdJSEpsZEhWeWJpQnVaWGNnUW5WbVptVnlLSE4xWW1wbFkzUXNJR1Z1WTI5a2FXNW5MQ0J1YjFwbGNtOHBYRzVjYmlBZ2RtRnlJSFI1Y0dVZ1BTQjBlWEJsYjJZZ2MzVmlhbVZqZEZ4dVhHNGdJQzh2SUZkdmNtdGhjbTkxYm1RNklHNXZaR1VuY3lCaVlYTmxOalFnYVcxd2JHVnRaVzUwWVhScGIyNGdZV3hzYjNkeklHWnZjaUJ1YjI0dGNHRmtaR1ZrSUhOMGNtbHVaM05jYmlBZ0x5OGdkMmhwYkdVZ1ltRnpaVFkwTFdweklHUnZaWE1nYm05MExseHVJQ0JwWmlBb1pXNWpiMlJwYm1jZ1BUMDlJQ2RpWVhObE5qUW5JQ1ltSUhSNWNHVWdQVDA5SUNkemRISnBibWNuS1NCN1hHNGdJQ0FnYzNWaWFtVmpkQ0E5SUhOMGNtbHVaM1J5YVcwb2MzVmlhbVZqZENsY2JpQWdJQ0IzYUdsc1pTQW9jM1ZpYW1WamRDNXNaVzVuZEdnZ0pTQTBJQ0U5UFNBd0tTQjdYRzRnSUNBZ0lDQnpkV0pxWldOMElEMGdjM1ZpYW1WamRDQXJJQ2M5SjF4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUM4dklFWnBibVFnZEdobElHeGxibWQwYUZ4dUlDQjJZWElnYkdWdVozUm9YRzRnSUdsbUlDaDBlWEJsSUQwOVBTQW5iblZ0WW1WeUp5bGNiaUFnSUNCc1pXNW5kR2dnUFNCamIyVnlZMlVvYzNWaWFtVmpkQ2xjYmlBZ1pXeHpaU0JwWmlBb2RIbHdaU0E5UFQwZ0ozTjBjbWx1WnljcFhHNGdJQ0FnYkdWdVozUm9JRDBnUW5WbVptVnlMbUo1ZEdWTVpXNW5kR2dvYzNWaWFtVmpkQ3dnWlc1amIyUnBibWNwWEc0Z0lHVnNjMlVnYVdZZ0tIUjVjR1VnUFQwOUlDZHZZbXBsWTNRbktWeHVJQ0FnSUd4bGJtZDBhQ0E5SUdOdlpYSmpaU2h6ZFdKcVpXTjBMbXhsYm1kMGFDa2dMeThnWVhOemRXMWxJSFJvWVhRZ2IySnFaV04wSUdseklHRnljbUY1TFd4cGEyVmNiaUFnWld4elpWeHVJQ0FnSUhSb2NtOTNJRzVsZHlCRmNuSnZjaWduUm1seWMzUWdZWEpuZFcxbGJuUWdibVZsWkhNZ2RHOGdZbVVnWVNCdWRXMWlaWElzSUdGeWNtRjVJRzl5SUhOMGNtbHVaeTRuS1Z4dVhHNGdJSFpoY2lCaWRXWmNiaUFnYVdZZ0tFSjFabVpsY2k1ZmRYTmxWSGx3WldSQmNuSmhlWE1wSUh0Y2JpQWdJQ0F2THlCUWNtVm1aWEp5WldRNklGSmxkSFZ5YmlCaGJpQmhkV2R0Wlc1MFpXUWdZRlZwYm5RNFFYSnlZWGxnSUdsdWMzUmhibU5sSUdadmNpQmlaWE4wSUhCbGNtWnZjbTFoYm1ObFhHNGdJQ0FnWW5WbUlEMGdRblZtWm1WeUxsOWhkV2R0Wlc1MEtHNWxkeUJWYVc1ME9FRnljbUY1S0d4bGJtZDBhQ2twWEc0Z0lIMGdaV3h6WlNCN1hHNGdJQ0FnTHk4Z1JtRnNiR0poWTJzNklGSmxkSFZ5YmlCVVNFbFRJR2x1YzNSaGJtTmxJRzltSUVKMVptWmxjaUFvWTNKbFlYUmxaQ0JpZVNCZ2JtVjNZQ2xjYmlBZ0lDQmlkV1lnUFNCMGFHbHpYRzRnSUNBZ1luVm1MbXhsYm1kMGFDQTlJR3hsYm1kMGFGeHVJQ0FnSUdKMVppNWZhWE5DZFdabVpYSWdQU0IwY25WbFhHNGdJSDFjYmx4dUlDQjJZWElnYVZ4dUlDQnBaaUFvUW5WbVptVnlMbDkxYzJWVWVYQmxaRUZ5Y21GNWN5QW1KaUIwZVhCbGIyWWdjM1ZpYW1WamRDNWllWFJsVEdWdVozUm9JRDA5UFNBbmJuVnRZbVZ5SnlrZ2UxeHVJQ0FnSUM4dklGTndaV1ZrSUc5d2RHbHRhWHBoZEdsdmJpQXRMU0IxYzJVZ2MyVjBJR2xtSUhkbEozSmxJR052Y0hscGJtY2dabkp2YlNCaElIUjVjR1ZrSUdGeWNtRjVYRzRnSUNBZ1luVm1MbDl6WlhRb2MzVmlhbVZqZENsY2JpQWdmU0JsYkhObElHbG1JQ2hwYzBGeWNtRjVhWE5vS0hOMVltcGxZM1FwS1NCN1hHNGdJQ0FnTHk4Z1ZISmxZWFFnWVhKeVlYa3RhWE5vSUc5aWFtVmpkSE1nWVhNZ1lTQmllWFJsSUdGeWNtRjVYRzRnSUNBZ1ptOXlJQ2hwSUQwZ01Ec2dhU0E4SUd4bGJtZDBhRHNnYVNzcktTQjdYRzRnSUNBZ0lDQnBaaUFvUW5WbVptVnlMbWx6UW5WbVptVnlLSE4xWW1wbFkzUXBLVnh1SUNBZ0lDQWdJQ0JpZFdaYmFWMGdQU0J6ZFdKcVpXTjBMbkpsWVdSVlNXNTBPQ2hwS1Z4dUlDQWdJQ0FnWld4elpWeHVJQ0FnSUNBZ0lDQmlkV1piYVYwZ1BTQnpkV0pxWldOMFcybGRYRzRnSUNBZ2ZWeHVJQ0I5SUdWc2MyVWdhV1lnS0hSNWNHVWdQVDA5SUNkemRISnBibWNuS1NCN1hHNGdJQ0FnWW5WbUxuZHlhWFJsS0hOMVltcGxZM1FzSURBc0lHVnVZMjlrYVc1bktWeHVJQ0I5SUdWc2MyVWdhV1lnS0hSNWNHVWdQVDA5SUNkdWRXMWlaWEluSUNZbUlDRkNkV1ptWlhJdVgzVnpaVlI1Y0dWa1FYSnlZWGx6SUNZbUlDRnViMXBsY204cElIdGNiaUFnSUNCbWIzSWdLR2tnUFNBd095QnBJRHdnYkdWdVozUm9PeUJwS3lzcElIdGNiaUFnSUNBZ0lHSjFabHRwWFNBOUlEQmNiaUFnSUNCOVhHNGdJSDFjYmx4dUlDQnlaWFIxY200Z1luVm1YRzU5WEc1Y2JpOHZJRk5VUVZSSlF5Qk5SVlJJVDBSVFhHNHZMeUE5UFQwOVBUMDlQVDA5UFQwOVBWeHVYRzVDZFdabVpYSXVhWE5GYm1OdlpHbHVaeUE5SUdaMWJtTjBhVzl1SUNobGJtTnZaR2x1WnlrZ2UxeHVJQ0J6ZDJsMFkyZ2dLRk4wY21sdVp5aGxibU52WkdsdVp5a3VkRzlNYjNkbGNrTmhjMlVvS1NrZ2UxeHVJQ0FnSUdOaGMyVWdKMmhsZUNjNlhHNGdJQ0FnWTJGelpTQW5kWFJtT0NjNlhHNGdJQ0FnWTJGelpTQW5kWFJtTFRnbk9seHVJQ0FnSUdOaGMyVWdKMkZ6WTJscEp6cGNiaUFnSUNCallYTmxJQ2RpYVc1aGNua25PbHh1SUNBZ0lHTmhjMlVnSjJKaGMyVTJOQ2M2WEc0Z0lDQWdZMkZ6WlNBbmNtRjNKenBjYmlBZ0lDQmpZWE5sSUNkMVkzTXlKenBjYmlBZ0lDQmpZWE5sSUNkMVkzTXRNaWM2WEc0Z0lDQWdZMkZ6WlNBbmRYUm1NVFpzWlNjNlhHNGdJQ0FnWTJGelpTQW5kWFJtTFRFMmJHVW5PbHh1SUNBZ0lDQWdjbVYwZFhKdUlIUnlkV1ZjYmlBZ0lDQmtaV1poZFd4ME9seHVJQ0FnSUNBZ2NtVjBkWEp1SUdaaGJITmxYRzRnSUgxY2JuMWNibHh1UW5WbVptVnlMbWx6UW5WbVptVnlJRDBnWm5WdVkzUnBiMjRnS0dJcElIdGNiaUFnY21WMGRYSnVJQ0VoS0dJZ0lUMDlJRzUxYkd3Z0ppWWdZaUFoUFQwZ2RXNWtaV1pwYm1Wa0lDWW1JR0l1WDJselFuVm1abVZ5S1Z4dWZWeHVYRzVDZFdabVpYSXVZbmwwWlV4bGJtZDBhQ0E5SUdaMWJtTjBhVzl1SUNoemRISXNJR1Z1WTI5a2FXNW5LU0I3WEc0Z0lIWmhjaUJ5WlhSY2JpQWdjM1J5SUQwZ2MzUnlJQ3NnSnlkY2JpQWdjM2RwZEdOb0lDaGxibU52WkdsdVp5QjhmQ0FuZFhSbU9DY3BJSHRjYmlBZ0lDQmpZWE5sSUNkb1pYZ25PbHh1SUNBZ0lDQWdjbVYwSUQwZ2MzUnlMbXhsYm1kMGFDQXZJREpjYmlBZ0lDQWdJR0p5WldGclhHNGdJQ0FnWTJGelpTQW5kWFJtT0NjNlhHNGdJQ0FnWTJGelpTQW5kWFJtTFRnbk9seHVJQ0FnSUNBZ2NtVjBJRDBnZFhSbU9GUnZRbmwwWlhNb2MzUnlLUzVzWlc1bmRHaGNiaUFnSUNBZ0lHSnlaV0ZyWEc0Z0lDQWdZMkZ6WlNBbllYTmphV2tuT2x4dUlDQWdJR05oYzJVZ0oySnBibUZ5ZVNjNlhHNGdJQ0FnWTJGelpTQW5jbUYzSnpwY2JpQWdJQ0FnSUhKbGRDQTlJSE4wY2k1c1pXNW5kR2hjYmlBZ0lDQWdJR0p5WldGclhHNGdJQ0FnWTJGelpTQW5ZbUZ6WlRZMEp6cGNiaUFnSUNBZ0lISmxkQ0E5SUdKaGMyVTJORlJ2UW5sMFpYTW9jM1J5S1M1c1pXNW5kR2hjYmlBZ0lDQWdJR0p5WldGclhHNGdJQ0FnWTJGelpTQW5kV056TWljNlhHNGdJQ0FnWTJGelpTQW5kV056TFRJbk9seHVJQ0FnSUdOaGMyVWdKM1YwWmpFMmJHVW5PbHh1SUNBZ0lHTmhjMlVnSjNWMFppMHhObXhsSnpwY2JpQWdJQ0FnSUhKbGRDQTlJSE4wY2k1c1pXNW5kR2dnS2lBeVhHNGdJQ0FnSUNCaWNtVmhhMXh1SUNBZ0lHUmxabUYxYkhRNlhHNGdJQ0FnSUNCMGFISnZkeUJ1WlhjZ1JYSnliM0lvSjFWdWEyNXZkMjRnWlc1amIyUnBibWNuS1Z4dUlDQjlYRzRnSUhKbGRIVnliaUJ5WlhSY2JuMWNibHh1UW5WbVptVnlMbU52Ym1OaGRDQTlJR1oxYm1OMGFXOXVJQ2hzYVhOMExDQjBiM1JoYkV4bGJtZDBhQ2tnZTF4dUlDQmhjM05sY25Rb2FYTkJjbkpoZVNoc2FYTjBLU3dnSjFWellXZGxPaUJDZFdabVpYSXVZMjl1WTJGMEtHeHBjM1FzSUZ0MGIzUmhiRXhsYm1kMGFGMHBYRnh1SnlBclhHNGdJQ0FnSUNBbmJHbHpkQ0J6YUc5MWJHUWdZbVVnWVc0Z1FYSnlZWGt1SnlsY2JseHVJQ0JwWmlBb2JHbHpkQzVzWlc1bmRHZ2dQVDA5SURBcElIdGNiaUFnSUNCeVpYUjFjbTRnYm1WM0lFSjFabVpsY2lnd0tWeHVJQ0I5SUdWc2MyVWdhV1lnS0d4cGMzUXViR1Z1WjNSb0lEMDlQU0F4S1NCN1hHNGdJQ0FnY21WMGRYSnVJR3hwYzNSYk1GMWNiaUFnZlZ4dVhHNGdJSFpoY2lCcFhHNGdJR2xtSUNoMGVYQmxiMllnZEc5MFlXeE1aVzVuZEdnZ0lUMDlJQ2R1ZFcxaVpYSW5LU0I3WEc0Z0lDQWdkRzkwWVd4TVpXNW5kR2dnUFNBd1hHNGdJQ0FnWm05eUlDaHBJRDBnTURzZ2FTQThJR3hwYzNRdWJHVnVaM1JvT3lCcEt5c3BJSHRjYmlBZ0lDQWdJSFJ2ZEdGc1RHVnVaM1JvSUNzOUlHeHBjM1JiYVYwdWJHVnVaM1JvWEc0Z0lDQWdmVnh1SUNCOVhHNWNiaUFnZG1GeUlHSjFaaUE5SUc1bGR5QkNkV1ptWlhJb2RHOTBZV3hNWlc1bmRHZ3BYRzRnSUhaaGNpQndiM01nUFNBd1hHNGdJR1p2Y2lBb2FTQTlJREE3SUdrZ1BDQnNhWE4wTG14bGJtZDBhRHNnYVNzcktTQjdYRzRnSUNBZ2RtRnlJR2wwWlcwZ1BTQnNhWE4wVzJsZFhHNGdJQ0FnYVhSbGJTNWpiM0I1S0dKMVppd2djRzl6S1Z4dUlDQWdJSEJ2Y3lBclBTQnBkR1Z0TG14bGJtZDBhRnh1SUNCOVhHNGdJSEpsZEhWeWJpQmlkV1pjYm4xY2JseHVMeThnUWxWR1JrVlNJRWxPVTFSQlRrTkZJRTFGVkVoUFJGTmNiaTh2SUQwOVBUMDlQVDA5UFQwOVBUMDlQVDA5UFQwOVBUMDlYRzVjYm1aMWJtTjBhVzl1SUY5b1pYaFhjbWwwWlNBb1luVm1MQ0J6ZEhKcGJtY3NJRzltWm5ObGRDd2diR1Z1WjNSb0tTQjdYRzRnSUc5bVpuTmxkQ0E5SUU1MWJXSmxjaWh2Wm1aelpYUXBJSHg4SURCY2JpQWdkbUZ5SUhKbGJXRnBibWx1WnlBOUlHSjFaaTVzWlc1bmRHZ2dMU0J2Wm1aelpYUmNiaUFnYVdZZ0tDRnNaVzVuZEdncElIdGNiaUFnSUNCc1pXNW5kR2dnUFNCeVpXMWhhVzVwYm1kY2JpQWdmU0JsYkhObElIdGNiaUFnSUNCc1pXNW5kR2dnUFNCT2RXMWlaWElvYkdWdVozUm9LVnh1SUNBZ0lHbG1JQ2hzWlc1bmRHZ2dQaUJ5WlcxaGFXNXBibWNwSUh0Y2JpQWdJQ0FnSUd4bGJtZDBhQ0E5SUhKbGJXRnBibWx1WjF4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUM4dklHMTFjM1FnWW1VZ1lXNGdaWFpsYmlCdWRXMWlaWElnYjJZZ1pHbG5hWFJ6WEc0Z0lIWmhjaUJ6ZEhKTVpXNGdQU0J6ZEhKcGJtY3ViR1Z1WjNSb1hHNGdJR0Z6YzJWeWRDaHpkSEpNWlc0Z0pTQXlJRDA5UFNBd0xDQW5TVzUyWVd4cFpDQm9aWGdnYzNSeWFXNW5KeWxjYmx4dUlDQnBaaUFvYkdWdVozUm9JRDRnYzNSeVRHVnVJQzhnTWlrZ2UxeHVJQ0FnSUd4bGJtZDBhQ0E5SUhOMGNreGxiaUF2SURKY2JpQWdmVnh1SUNCbWIzSWdLSFpoY2lCcElEMGdNRHNnYVNBOElHeGxibWQwYURzZ2FTc3JLU0I3WEc0Z0lDQWdkbUZ5SUdKNWRHVWdQU0J3WVhKelpVbHVkQ2h6ZEhKcGJtY3VjM1ZpYzNSeUtHa2dLaUF5TENBeUtTd2dNVFlwWEc0Z0lDQWdZWE56WlhKMEtDRnBjMDVoVGloaWVYUmxLU3dnSjBsdWRtRnNhV1FnYUdWNElITjBjbWx1WnljcFhHNGdJQ0FnWW5WbVcyOW1abk5sZENBcklHbGRJRDBnWW5sMFpWeHVJQ0I5WEc0Z0lFSjFabVpsY2k1ZlkyaGhjbk5YY21sMGRHVnVJRDBnYVNBcUlESmNiaUFnY21WMGRYSnVJR2xjYm4xY2JseHVablZ1WTNScGIyNGdYM1YwWmpoWGNtbDBaU0FvWW5WbUxDQnpkSEpwYm1jc0lHOW1abk5sZEN3Z2JHVnVaM1JvS1NCN1hHNGdJSFpoY2lCamFHRnljMWR5YVhSMFpXNGdQU0JDZFdabVpYSXVYMk5vWVhKelYzSnBkSFJsYmlBOVhHNGdJQ0FnWW14cGRFSjFabVpsY2loMWRHWTRWRzlDZVhSbGN5aHpkSEpwYm1jcExDQmlkV1lzSUc5bVpuTmxkQ3dnYkdWdVozUm9LVnh1SUNCeVpYUjFjbTRnWTJoaGNuTlhjbWwwZEdWdVhHNTlYRzVjYm1aMWJtTjBhVzl1SUY5aGMyTnBhVmR5YVhSbElDaGlkV1lzSUhOMGNtbHVaeXdnYjJabWMyVjBMQ0JzWlc1bmRHZ3BJSHRjYmlBZ2RtRnlJR05vWVhKelYzSnBkSFJsYmlBOUlFSjFabVpsY2k1ZlkyaGhjbk5YY21sMGRHVnVJRDFjYmlBZ0lDQmliR2wwUW5WbVptVnlLR0Z6WTJscFZHOUNlWFJsY3loemRISnBibWNwTENCaWRXWXNJRzltWm5ObGRDd2diR1Z1WjNSb0tWeHVJQ0J5WlhSMWNtNGdZMmhoY25OWGNtbDBkR1Z1WEc1OVhHNWNibVoxYm1OMGFXOXVJRjlpYVc1aGNubFhjbWwwWlNBb1luVm1MQ0J6ZEhKcGJtY3NJRzltWm5ObGRDd2diR1Z1WjNSb0tTQjdYRzRnSUhKbGRIVnliaUJmWVhOamFXbFhjbWwwWlNoaWRXWXNJSE4wY21sdVp5d2diMlptYzJWMExDQnNaVzVuZEdncFhHNTlYRzVjYm1aMWJtTjBhVzl1SUY5aVlYTmxOalJYY21sMFpTQW9ZblZtTENCemRISnBibWNzSUc5bVpuTmxkQ3dnYkdWdVozUm9LU0I3WEc0Z0lIWmhjaUJqYUdGeWMxZHlhWFIwWlc0Z1BTQkNkV1ptWlhJdVgyTm9ZWEp6VjNKcGRIUmxiaUE5WEc0Z0lDQWdZbXhwZEVKMVptWmxjaWhpWVhObE5qUlViMEo1ZEdWektITjBjbWx1Wnlrc0lHSjFaaXdnYjJabWMyVjBMQ0JzWlc1bmRHZ3BYRzRnSUhKbGRIVnliaUJqYUdGeWMxZHlhWFIwWlc1Y2JuMWNibHh1Wm5WdVkzUnBiMjRnWDNWMFpqRTJiR1ZYY21sMFpTQW9ZblZtTENCemRISnBibWNzSUc5bVpuTmxkQ3dnYkdWdVozUm9LU0I3WEc0Z0lIWmhjaUJqYUdGeWMxZHlhWFIwWlc0Z1BTQkNkV1ptWlhJdVgyTm9ZWEp6VjNKcGRIUmxiaUE5WEc0Z0lDQWdZbXhwZEVKMVptWmxjaWgxZEdZeE5teGxWRzlDZVhSbGN5aHpkSEpwYm1jcExDQmlkV1lzSUc5bVpuTmxkQ3dnYkdWdVozUm9LVnh1SUNCeVpYUjFjbTRnWTJoaGNuTlhjbWwwZEdWdVhHNTlYRzVjYmtKMVptWmxjaTV3Y205MGIzUjVjR1V1ZDNKcGRHVWdQU0JtZFc1amRHbHZiaUFvYzNSeWFXNW5MQ0J2Wm1aelpYUXNJR3hsYm1kMGFDd2daVzVqYjJScGJtY3BJSHRjYmlBZ0x5OGdVM1Z3Y0c5eWRDQmliM1JvSUNoemRISnBibWNzSUc5bVpuTmxkQ3dnYkdWdVozUm9MQ0JsYm1OdlpHbHVaeWxjYmlBZ0x5OGdZVzVrSUhSb1pTQnNaV2RoWTNrZ0tITjBjbWx1Wnl3Z1pXNWpiMlJwYm1jc0lHOW1abk5sZEN3Z2JHVnVaM1JvS1Z4dUlDQnBaaUFvYVhOR2FXNXBkR1VvYjJabWMyVjBLU2tnZTF4dUlDQWdJR2xtSUNnaGFYTkdhVzVwZEdVb2JHVnVaM1JvS1NrZ2UxeHVJQ0FnSUNBZ1pXNWpiMlJwYm1jZ1BTQnNaVzVuZEdoY2JpQWdJQ0FnSUd4bGJtZDBhQ0E5SUhWdVpHVm1hVzVsWkZ4dUlDQWdJSDFjYmlBZ2ZTQmxiSE5sSUhzZ0lDOHZJR3hsWjJGamVWeHVJQ0FnSUhaaGNpQnpkMkZ3SUQwZ1pXNWpiMlJwYm1kY2JpQWdJQ0JsYm1OdlpHbHVaeUE5SUc5bVpuTmxkRnh1SUNBZ0lHOW1abk5sZENBOUlHeGxibWQwYUZ4dUlDQWdJR3hsYm1kMGFDQTlJSE4zWVhCY2JpQWdmVnh1WEc0Z0lHOW1abk5sZENBOUlFNTFiV0psY2lodlptWnpaWFFwSUh4OElEQmNiaUFnZG1GeUlISmxiV0ZwYm1sdVp5QTlJSFJvYVhNdWJHVnVaM1JvSUMwZ2IyWm1jMlYwWEc0Z0lHbG1JQ2doYkdWdVozUm9LU0I3WEc0Z0lDQWdiR1Z1WjNSb0lEMGdjbVZ0WVdsdWFXNW5YRzRnSUgwZ1pXeHpaU0I3WEc0Z0lDQWdiR1Z1WjNSb0lEMGdUblZ0WW1WeUtHeGxibWQwYUNsY2JpQWdJQ0JwWmlBb2JHVnVaM1JvSUQ0Z2NtVnRZV2x1YVc1bktTQjdYRzRnSUNBZ0lDQnNaVzVuZEdnZ1BTQnlaVzFoYVc1cGJtZGNiaUFnSUNCOVhHNGdJSDFjYmlBZ1pXNWpiMlJwYm1jZ1BTQlRkSEpwYm1jb1pXNWpiMlJwYm1jZ2ZId2dKM1YwWmpnbktTNTBiMHh2ZDJWeVEyRnpaU2dwWEc1Y2JpQWdkbUZ5SUhKbGRGeHVJQ0J6ZDJsMFkyZ2dLR1Z1WTI5a2FXNW5LU0I3WEc0Z0lDQWdZMkZ6WlNBbmFHVjRKenBjYmlBZ0lDQWdJSEpsZENBOUlGOW9aWGhYY21sMFpTaDBhR2x6TENCemRISnBibWNzSUc5bVpuTmxkQ3dnYkdWdVozUm9LVnh1SUNBZ0lDQWdZbkpsWVd0Y2JpQWdJQ0JqWVhObElDZDFkR1k0SnpwY2JpQWdJQ0JqWVhObElDZDFkR1l0T0NjNlhHNGdJQ0FnSUNCeVpYUWdQU0JmZFhSbU9GZHlhWFJsS0hSb2FYTXNJSE4wY21sdVp5d2diMlptYzJWMExDQnNaVzVuZEdncFhHNGdJQ0FnSUNCaWNtVmhhMXh1SUNBZ0lHTmhjMlVnSjJGelkybHBKenBjYmlBZ0lDQWdJSEpsZENBOUlGOWhjMk5wYVZkeWFYUmxLSFJvYVhNc0lITjBjbWx1Wnl3Z2IyWm1jMlYwTENCc1pXNW5kR2dwWEc0Z0lDQWdJQ0JpY21WaGExeHVJQ0FnSUdOaGMyVWdKMkpwYm1GeWVTYzZYRzRnSUNBZ0lDQnlaWFFnUFNCZlltbHVZWEo1VjNKcGRHVW9kR2hwY3l3Z2MzUnlhVzVuTENCdlptWnpaWFFzSUd4bGJtZDBhQ2xjYmlBZ0lDQWdJR0p5WldGclhHNGdJQ0FnWTJGelpTQW5ZbUZ6WlRZMEp6cGNiaUFnSUNBZ0lISmxkQ0E5SUY5aVlYTmxOalJYY21sMFpTaDBhR2x6TENCemRISnBibWNzSUc5bVpuTmxkQ3dnYkdWdVozUm9LVnh1SUNBZ0lDQWdZbkpsWVd0Y2JpQWdJQ0JqWVhObElDZDFZM015SnpwY2JpQWdJQ0JqWVhObElDZDFZM010TWljNlhHNGdJQ0FnWTJGelpTQW5kWFJtTVRac1pTYzZYRzRnSUNBZ1kyRnpaU0FuZFhSbUxURTJiR1VuT2x4dUlDQWdJQ0FnY21WMElEMGdYM1YwWmpFMmJHVlhjbWwwWlNoMGFHbHpMQ0J6ZEhKcGJtY3NJRzltWm5ObGRDd2diR1Z1WjNSb0tWeHVJQ0FnSUNBZ1luSmxZV3RjYmlBZ0lDQmtaV1poZFd4ME9seHVJQ0FnSUNBZ2RHaHliM2NnYm1WM0lFVnljbTl5S0NkVmJtdHViM2R1SUdWdVkyOWthVzVuSnlsY2JpQWdmVnh1SUNCeVpYUjFjbTRnY21WMFhHNTlYRzVjYmtKMVptWmxjaTV3Y205MGIzUjVjR1V1ZEc5VGRISnBibWNnUFNCbWRXNWpkR2x2YmlBb1pXNWpiMlJwYm1jc0lITjBZWEowTENCbGJtUXBJSHRjYmlBZ2RtRnlJSE5sYkdZZ1BTQjBhR2x6WEc1Y2JpQWdaVzVqYjJScGJtY2dQU0JUZEhKcGJtY29aVzVqYjJScGJtY2dmSHdnSjNWMFpqZ25LUzUwYjB4dmQyVnlRMkZ6WlNncFhHNGdJSE4wWVhKMElEMGdUblZ0WW1WeUtITjBZWEowS1NCOGZDQXdYRzRnSUdWdVpDQTlJQ2hsYm1RZ0lUMDlJSFZ1WkdWbWFXNWxaQ2xjYmlBZ0lDQS9JRTUxYldKbGNpaGxibVFwWEc0Z0lDQWdPaUJsYm1RZ1BTQnpaV3htTG14bGJtZDBhRnh1WEc0Z0lDOHZJRVpoYzNSd1lYUm9JR1Z0Y0hSNUlITjBjbWx1WjNOY2JpQWdhV1lnS0dWdVpDQTlQVDBnYzNSaGNuUXBYRzRnSUNBZ2NtVjBkWEp1SUNjblhHNWNiaUFnZG1GeUlISmxkRnh1SUNCemQybDBZMmdnS0dWdVkyOWthVzVuS1NCN1hHNGdJQ0FnWTJGelpTQW5hR1Y0SnpwY2JpQWdJQ0FnSUhKbGRDQTlJRjlvWlhoVGJHbGpaU2h6Wld4bUxDQnpkR0Z5ZEN3Z1pXNWtLVnh1SUNBZ0lDQWdZbkpsWVd0Y2JpQWdJQ0JqWVhObElDZDFkR1k0SnpwY2JpQWdJQ0JqWVhObElDZDFkR1l0T0NjNlhHNGdJQ0FnSUNCeVpYUWdQU0JmZFhSbU9GTnNhV05sS0hObGJHWXNJSE4wWVhKMExDQmxibVFwWEc0Z0lDQWdJQ0JpY21WaGExeHVJQ0FnSUdOaGMyVWdKMkZ6WTJscEp6cGNiaUFnSUNBZ0lISmxkQ0E5SUY5aGMyTnBhVk5zYVdObEtITmxiR1lzSUhOMFlYSjBMQ0JsYm1RcFhHNGdJQ0FnSUNCaWNtVmhhMXh1SUNBZ0lHTmhjMlVnSjJKcGJtRnllU2M2WEc0Z0lDQWdJQ0J5WlhRZ1BTQmZZbWx1WVhKNVUyeHBZMlVvYzJWc1ppd2djM1JoY25Rc0lHVnVaQ2xjYmlBZ0lDQWdJR0p5WldGclhHNGdJQ0FnWTJGelpTQW5ZbUZ6WlRZMEp6cGNiaUFnSUNBZ0lISmxkQ0E5SUY5aVlYTmxOalJUYkdsalpTaHpaV3htTENCemRHRnlkQ3dnWlc1a0tWeHVJQ0FnSUNBZ1luSmxZV3RjYmlBZ0lDQmpZWE5sSUNkMVkzTXlKenBjYmlBZ0lDQmpZWE5sSUNkMVkzTXRNaWM2WEc0Z0lDQWdZMkZ6WlNBbmRYUm1NVFpzWlNjNlhHNGdJQ0FnWTJGelpTQW5kWFJtTFRFMmJHVW5PbHh1SUNBZ0lDQWdjbVYwSUQwZ1gzVjBaakUyYkdWVGJHbGpaU2h6Wld4bUxDQnpkR0Z5ZEN3Z1pXNWtLVnh1SUNBZ0lDQWdZbkpsWVd0Y2JpQWdJQ0JrWldaaGRXeDBPbHh1SUNBZ0lDQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtDZFZibXR1YjNkdUlHVnVZMjlrYVc1bkp5bGNiaUFnZlZ4dUlDQnlaWFIxY200Z2NtVjBYRzU5WEc1Y2JrSjFabVpsY2k1d2NtOTBiM1I1Y0dVdWRHOUtVMDlPSUQwZ1puVnVZM1JwYjI0Z0tDa2dlMXh1SUNCeVpYUjFjbTRnZTF4dUlDQWdJSFI1Y0dVNklDZENkV1ptWlhJbkxGeHVJQ0FnSUdSaGRHRTZJRUZ5Y21GNUxuQnliM1J2ZEhsd1pTNXpiR2xqWlM1allXeHNLSFJvYVhNdVgyRnljaUI4ZkNCMGFHbHpMQ0F3S1Z4dUlDQjlYRzU5WEc1Y2JpOHZJR052Y0hrb2RHRnlaMlYwUW5WbVptVnlMQ0IwWVhKblpYUlRkR0Z5ZEQwd0xDQnpiM1Z5WTJWVGRHRnlkRDB3TENCemIzVnlZMlZGYm1ROVluVm1abVZ5TG14bGJtZDBhQ2xjYmtKMVptWmxjaTV3Y205MGIzUjVjR1V1WTI5d2VTQTlJR1oxYm1OMGFXOXVJQ2gwWVhKblpYUXNJSFJoY21kbGRGOXpkR0Z5ZEN3Z2MzUmhjblFzSUdWdVpDa2dlMXh1SUNCMllYSWdjMjkxY21ObElEMGdkR2hwYzF4dVhHNGdJR2xtSUNnaGMzUmhjblFwSUhOMFlYSjBJRDBnTUZ4dUlDQnBaaUFvSVdWdVpDQW1KaUJsYm1RZ0lUMDlJREFwSUdWdVpDQTlJSFJvYVhNdWJHVnVaM1JvWEc0Z0lHbG1JQ2doZEdGeVoyVjBYM04wWVhKMEtTQjBZWEpuWlhSZmMzUmhjblFnUFNBd1hHNWNiaUFnTHk4Z1EyOXdlU0F3SUdKNWRHVnpPeUIzWlNkeVpTQmtiMjVsWEc0Z0lHbG1JQ2hsYm1RZ1BUMDlJSE4wWVhKMEtTQnlaWFIxY201Y2JpQWdhV1lnS0hSaGNtZGxkQzVzWlc1bmRHZ2dQVDA5SURBZ2ZId2djMjkxY21ObExteGxibWQwYUNBOVBUMGdNQ2tnY21WMGRYSnVYRzVjYmlBZ0x5OGdSbUYwWVd3Z1pYSnliM0lnWTI5dVpHbDBhVzl1YzF4dUlDQmhjM05sY25Rb1pXNWtJRDQ5SUhOMFlYSjBMQ0FuYzI5MWNtTmxSVzVrSUR3Z2MyOTFjbU5sVTNSaGNuUW5LVnh1SUNCaGMzTmxjblFvZEdGeVoyVjBYM04wWVhKMElENDlJREFnSmlZZ2RHRnlaMlYwWDNOMFlYSjBJRHdnZEdGeVoyVjBMbXhsYm1kMGFDeGNiaUFnSUNBZ0lDZDBZWEpuWlhSVGRHRnlkQ0J2ZFhRZ2IyWWdZbTkxYm1Sekp5bGNiaUFnWVhOelpYSjBLSE4wWVhKMElENDlJREFnSmlZZ2MzUmhjblFnUENCemIzVnlZMlV1YkdWdVozUm9MQ0FuYzI5MWNtTmxVM1JoY25RZ2IzVjBJRzltSUdKdmRXNWtjeWNwWEc0Z0lHRnpjMlZ5ZENobGJtUWdQajBnTUNBbUppQmxibVFnUEQwZ2MyOTFjbU5sTG14bGJtZDBhQ3dnSjNOdmRYSmpaVVZ1WkNCdmRYUWdiMllnWW05MWJtUnpKeWxjYmx4dUlDQXZMeUJCY21VZ2QyVWdiMjlpUDF4dUlDQnBaaUFvWlc1a0lENGdkR2hwY3k1c1pXNW5kR2dwWEc0Z0lDQWdaVzVrSUQwZ2RHaHBjeTVzWlc1bmRHaGNiaUFnYVdZZ0tIUmhjbWRsZEM1c1pXNW5kR2dnTFNCMFlYSm5aWFJmYzNSaGNuUWdQQ0JsYm1RZ0xTQnpkR0Z5ZENsY2JpQWdJQ0JsYm1RZ1BTQjBZWEpuWlhRdWJHVnVaM1JvSUMwZ2RHRnlaMlYwWDNOMFlYSjBJQ3NnYzNSaGNuUmNibHh1SUNCMllYSWdiR1Z1SUQwZ1pXNWtJQzBnYzNSaGNuUmNibHh1SUNCcFppQW9iR1Z1SUR3Z01UQXdJSHg4SUNGQ2RXWm1aWEl1WDNWelpWUjVjR1ZrUVhKeVlYbHpLU0I3WEc0Z0lDQWdabTl5SUNoMllYSWdhU0E5SURBN0lHa2dQQ0JzWlc0N0lHa3JLeWxjYmlBZ0lDQWdJSFJoY21kbGRGdHBJQ3NnZEdGeVoyVjBYM04wWVhKMFhTQTlJSFJvYVhOYmFTQXJJSE4wWVhKMFhWeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lIUmhjbWRsZEM1ZmMyVjBLSFJvYVhNdWMzVmlZWEp5WVhrb2MzUmhjblFzSUhOMFlYSjBJQ3NnYkdWdUtTd2dkR0Z5WjJWMFgzTjBZWEowS1Z4dUlDQjlYRzU5WEc1Y2JtWjFibU4wYVc5dUlGOWlZWE5sTmpSVGJHbGpaU0FvWW5WbUxDQnpkR0Z5ZEN3Z1pXNWtLU0I3WEc0Z0lHbG1JQ2h6ZEdGeWRDQTlQVDBnTUNBbUppQmxibVFnUFQwOUlHSjFaaTVzWlc1bmRHZ3BJSHRjYmlBZ0lDQnlaWFIxY200Z1ltRnpaVFkwTG1aeWIyMUNlWFJsUVhKeVlYa29ZblZtS1Z4dUlDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUhKbGRIVnliaUJpWVhObE5qUXVabkp2YlVKNWRHVkJjbkpoZVNoaWRXWXVjMnhwWTJVb2MzUmhjblFzSUdWdVpDa3BYRzRnSUgxY2JuMWNibHh1Wm5WdVkzUnBiMjRnWDNWMFpqaFRiR2xqWlNBb1luVm1MQ0J6ZEdGeWRDd2daVzVrS1NCN1hHNGdJSFpoY2lCeVpYTWdQU0FuSjF4dUlDQjJZWElnZEcxd0lEMGdKeWRjYmlBZ1pXNWtJRDBnVFdGMGFDNXRhVzRvWW5WbUxteGxibWQwYUN3Z1pXNWtLVnh1WEc0Z0lHWnZjaUFvZG1GeUlHa2dQU0J6ZEdGeWREc2dhU0E4SUdWdVpEc2dhU3NyS1NCN1hHNGdJQ0FnYVdZZ0tHSjFabHRwWFNBOFBTQXdlRGRHS1NCN1hHNGdJQ0FnSUNCeVpYTWdLejBnWkdWamIyUmxWWFJtT0VOb1lYSW9kRzF3S1NBcklGTjBjbWx1Wnk1bWNtOXRRMmhoY2tOdlpHVW9ZblZtVzJsZEtWeHVJQ0FnSUNBZ2RHMXdJRDBnSnlkY2JpQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdkRzF3SUNzOUlDY2xKeUFySUdKMVpsdHBYUzUwYjFOMGNtbHVaeWd4TmlsY2JpQWdJQ0I5WEc0Z0lIMWNibHh1SUNCeVpYUjFjbTRnY21WeklDc2daR1ZqYjJSbFZYUm1PRU5vWVhJb2RHMXdLVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmZZWE5qYVdsVGJHbGpaU0FvWW5WbUxDQnpkR0Z5ZEN3Z1pXNWtLU0I3WEc0Z0lIWmhjaUJ5WlhRZ1BTQW5KMXh1SUNCbGJtUWdQU0JOWVhSb0xtMXBiaWhpZFdZdWJHVnVaM1JvTENCbGJtUXBYRzVjYmlBZ1ptOXlJQ2gyWVhJZ2FTQTlJSE4wWVhKME95QnBJRHdnWlc1a095QnBLeXNwWEc0Z0lDQWdjbVYwSUNzOUlGTjBjbWx1Wnk1bWNtOXRRMmhoY2tOdlpHVW9ZblZtVzJsZEtWeHVJQ0J5WlhSMWNtNGdjbVYwWEc1OVhHNWNibVoxYm1OMGFXOXVJRjlpYVc1aGNubFRiR2xqWlNBb1luVm1MQ0J6ZEdGeWRDd2daVzVrS1NCN1hHNGdJSEpsZEhWeWJpQmZZWE5qYVdsVGJHbGpaU2hpZFdZc0lITjBZWEowTENCbGJtUXBYRzU5WEc1Y2JtWjFibU4wYVc5dUlGOW9aWGhUYkdsalpTQW9ZblZtTENCemRHRnlkQ3dnWlc1a0tTQjdYRzRnSUhaaGNpQnNaVzRnUFNCaWRXWXViR1Z1WjNSb1hHNWNiaUFnYVdZZ0tDRnpkR0Z5ZENCOGZDQnpkR0Z5ZENBOElEQXBJSE4wWVhKMElEMGdNRnh1SUNCcFppQW9JV1Z1WkNCOGZDQmxibVFnUENBd0lIeDhJR1Z1WkNBK0lHeGxiaWtnWlc1a0lEMGdiR1Z1WEc1Y2JpQWdkbUZ5SUc5MWRDQTlJQ2NuWEc0Z0lHWnZjaUFvZG1GeUlHa2dQU0J6ZEdGeWREc2dhU0E4SUdWdVpEc2dhU3NyS1NCN1hHNGdJQ0FnYjNWMElDczlJSFJ2U0dWNEtHSjFabHRwWFNsY2JpQWdmVnh1SUNCeVpYUjFjbTRnYjNWMFhHNTlYRzVjYm1aMWJtTjBhVzl1SUY5MWRHWXhObXhsVTJ4cFkyVWdLR0oxWml3Z2MzUmhjblFzSUdWdVpDa2dlMXh1SUNCMllYSWdZbmwwWlhNZ1BTQmlkV1l1YzJ4cFkyVW9jM1JoY25Rc0lHVnVaQ2xjYmlBZ2RtRnlJSEpsY3lBOUlDY25YRzRnSUdadmNpQW9kbUZ5SUdrZ1BTQXdPeUJwSUR3Z1lubDBaWE11YkdWdVozUm9PeUJwSUNzOUlESXBJSHRjYmlBZ0lDQnlaWE1nS3owZ1UzUnlhVzVuTG1aeWIyMURhR0Z5UTI5a1pTaGllWFJsYzF0cFhTQXJJR0o1ZEdWelcya3JNVjBnS2lBeU5UWXBYRzRnSUgxY2JpQWdjbVYwZFhKdUlISmxjMXh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuTnNhV05sSUQwZ1puVnVZM1JwYjI0Z0tITjBZWEowTENCbGJtUXBJSHRjYmlBZ2RtRnlJR3hsYmlBOUlIUm9hWE11YkdWdVozUm9YRzRnSUhOMFlYSjBJRDBnWTJ4aGJYQW9jM1JoY25Rc0lHeGxiaXdnTUNsY2JpQWdaVzVrSUQwZ1kyeGhiWEFvWlc1a0xDQnNaVzRzSUd4bGJpbGNibHh1SUNCcFppQW9RblZtWm1WeUxsOTFjMlZVZVhCbFpFRnljbUY1Y3lrZ2UxeHVJQ0FnSUhKbGRIVnliaUJDZFdabVpYSXVYMkYxWjIxbGJuUW9kR2hwY3k1emRXSmhjbkpoZVNoemRHRnlkQ3dnWlc1a0tTbGNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQjJZWElnYzJ4cFkyVk1aVzRnUFNCbGJtUWdMU0J6ZEdGeWRGeHVJQ0FnSUhaaGNpQnVaWGRDZFdZZ1BTQnVaWGNnUW5WbVptVnlLSE5zYVdObFRHVnVMQ0IxYm1SbFptbHVaV1FzSUhSeWRXVXBYRzRnSUNBZ1ptOXlJQ2gyWVhJZ2FTQTlJREE3SUdrZ1BDQnpiR2xqWlV4bGJqc2dhU3NyS1NCN1hHNGdJQ0FnSUNCdVpYZENkV1piYVYwZ1BTQjBhR2x6VzJrZ0t5QnpkR0Z5ZEYxY2JpQWdJQ0I5WEc0Z0lDQWdjbVYwZFhKdUlHNWxkMEoxWmx4dUlDQjlYRzU5WEc1Y2JpOHZJR0JuWlhSZ0lIZHBiR3dnWW1VZ2NtVnRiM1psWkNCcGJpQk9iMlJsSURBdU1UTXJYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbWRsZENBOUlHWjFibU4wYVc5dUlDaHZabVp6WlhRcElIdGNiaUFnWTI5dWMyOXNaUzVzYjJjb0p5NW5aWFFvS1NCcGN5QmtaWEJ5WldOaGRHVmtMaUJCWTJObGMzTWdkWE5wYm1jZ1lYSnlZWGtnYVc1a1pYaGxjeUJwYm5OMFpXRmtMaWNwWEc0Z0lISmxkSFZ5YmlCMGFHbHpMbkpsWVdSVlNXNTBPQ2h2Wm1aelpYUXBYRzU5WEc1Y2JpOHZJR0J6WlhSZ0lIZHBiR3dnWW1VZ2NtVnRiM1psWkNCcGJpQk9iMlJsSURBdU1UTXJYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbk5sZENBOUlHWjFibU4wYVc5dUlDaDJMQ0J2Wm1aelpYUXBJSHRjYmlBZ1kyOXVjMjlzWlM1c2IyY29KeTV6WlhRb0tTQnBjeUJrWlhCeVpXTmhkR1ZrTGlCQlkyTmxjM01nZFhOcGJtY2dZWEp5WVhrZ2FXNWtaWGhsY3lCcGJuTjBaV0ZrTGljcFhHNGdJSEpsZEhWeWJpQjBhR2x6TG5keWFYUmxWVWx1ZERnb2Rpd2diMlptYzJWMEtWeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5KbFlXUlZTVzUwT0NBOUlHWjFibU4wYVc5dUlDaHZabVp6WlhRc0lHNXZRWE56WlhKMEtTQjdYRzRnSUdsbUlDZ2hibTlCYzNObGNuUXBJSHRjYmlBZ0lDQmhjM05sY25Rb2IyWm1jMlYwSUNFOVBTQjFibVJsWm1sdVpXUWdKaVlnYjJabWMyVjBJQ0U5UFNCdWRXeHNMQ0FuYldsemMybHVaeUJ2Wm1aelpYUW5LVnh1SUNBZ0lHRnpjMlZ5ZENodlptWnpaWFFnUENCMGFHbHpMbXhsYm1kMGFDd2dKMVJ5ZVdsdVp5QjBieUJ5WldGa0lHSmxlVzl1WkNCaWRXWm1aWElnYkdWdVozUm9KeWxjYmlBZ2ZWeHVYRzRnSUdsbUlDaHZabVp6WlhRZ1BqMGdkR2hwY3k1c1pXNW5kR2dwWEc0Z0lDQWdjbVYwZFhKdVhHNWNiaUFnY21WMGRYSnVJSFJvYVhOYmIyWm1jMlYwWFZ4dWZWeHVYRzVtZFc1amRHbHZiaUJmY21WaFpGVkpiblF4TmlBb1luVm1MQ0J2Wm1aelpYUXNJR3hwZEhSc1pVVnVaR2xoYml3Z2JtOUJjM05sY25RcElIdGNiaUFnYVdZZ0tDRnViMEZ6YzJWeWRDa2dlMXh1SUNBZ0lHRnpjMlZ5ZENoMGVYQmxiMllnYkdsMGRHeGxSVzVrYVdGdUlEMDlQU0FuWW05dmJHVmhiaWNzSUNkdGFYTnphVzVuSUc5eUlHbHVkbUZzYVdRZ1pXNWthV0Z1SnlsY2JpQWdJQ0JoYzNObGNuUW9iMlptYzJWMElDRTlQU0IxYm1SbFptbHVaV1FnSmlZZ2IyWm1jMlYwSUNFOVBTQnVkV3hzTENBbmJXbHpjMmx1WnlCdlptWnpaWFFuS1Z4dUlDQWdJR0Z6YzJWeWRDaHZabVp6WlhRZ0t5QXhJRHdnWW5WbUxteGxibWQwYUN3Z0oxUnllV2x1WnlCMGJ5QnlaV0ZrSUdKbGVXOXVaQ0JpZFdabVpYSWdiR1Z1WjNSb0p5bGNiaUFnZlZ4dVhHNGdJSFpoY2lCc1pXNGdQU0JpZFdZdWJHVnVaM1JvWEc0Z0lHbG1JQ2h2Wm1aelpYUWdQajBnYkdWdUtWeHVJQ0FnSUhKbGRIVnlibHh1WEc0Z0lIWmhjaUIyWVd4Y2JpQWdhV1lnS0d4cGRIUnNaVVZ1WkdsaGJpa2dlMXh1SUNBZ0lIWmhiQ0E5SUdKMVpsdHZabVp6WlhSZFhHNGdJQ0FnYVdZZ0tHOW1abk5sZENBcklERWdQQ0JzWlc0cFhHNGdJQ0FnSUNCMllXd2dmRDBnWW5WbVcyOW1abk5sZENBcklERmRJRHc4SURoY2JpQWdmU0JsYkhObElIdGNiaUFnSUNCMllXd2dQU0JpZFdaYmIyWm1jMlYwWFNBOFBDQTRYRzRnSUNBZ2FXWWdLRzltWm5ObGRDQXJJREVnUENCc1pXNHBYRzRnSUNBZ0lDQjJZV3dnZkQwZ1luVm1XMjltWm5ObGRDQXJJREZkWEc0Z0lIMWNiaUFnY21WMGRYSnVJSFpoYkZ4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbkpsWVdSVlNXNTBNVFpNUlNBOUlHWjFibU4wYVc5dUlDaHZabVp6WlhRc0lHNXZRWE56WlhKMEtTQjdYRzRnSUhKbGRIVnliaUJmY21WaFpGVkpiblF4TmloMGFHbHpMQ0J2Wm1aelpYUXNJSFJ5ZFdVc0lHNXZRWE56WlhKMEtWeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5KbFlXUlZTVzUwTVRaQ1JTQTlJR1oxYm1OMGFXOXVJQ2h2Wm1aelpYUXNJRzV2UVhOelpYSjBLU0I3WEc0Z0lISmxkSFZ5YmlCZmNtVmhaRlZKYm5ReE5paDBhR2x6TENCdlptWnpaWFFzSUdaaGJITmxMQ0J1YjBGemMyVnlkQ2xjYm4xY2JseHVablZ1WTNScGIyNGdYM0psWVdSVlNXNTBNeklnS0dKMVppd2diMlptYzJWMExDQnNhWFIwYkdWRmJtUnBZVzRzSUc1dlFYTnpaWEowS1NCN1hHNGdJR2xtSUNnaGJtOUJjM05sY25RcElIdGNiaUFnSUNCaGMzTmxjblFvZEhsd1pXOW1JR3hwZEhSc1pVVnVaR2xoYmlBOVBUMGdKMkp2YjJ4bFlXNG5MQ0FuYldsemMybHVaeUJ2Y2lCcGJuWmhiR2xrSUdWdVpHbGhiaWNwWEc0Z0lDQWdZWE56WlhKMEtHOW1abk5sZENBaFBUMGdkVzVrWldacGJtVmtJQ1ltSUc5bVpuTmxkQ0FoUFQwZ2JuVnNiQ3dnSjIxcGMzTnBibWNnYjJabWMyVjBKeWxjYmlBZ0lDQmhjM05sY25Rb2IyWm1jMlYwSUNzZ015QThJR0oxWmk1c1pXNW5kR2dzSUNkVWNubHBibWNnZEc4Z2NtVmhaQ0JpWlhsdmJtUWdZblZtWm1WeUlHeGxibWQwYUNjcFhHNGdJSDFjYmx4dUlDQjJZWElnYkdWdUlEMGdZblZtTG14bGJtZDBhRnh1SUNCcFppQW9iMlptYzJWMElENDlJR3hsYmlsY2JpQWdJQ0J5WlhSMWNtNWNibHh1SUNCMllYSWdkbUZzWEc0Z0lHbG1JQ2hzYVhSMGJHVkZibVJwWVc0cElIdGNiaUFnSUNCcFppQW9iMlptYzJWMElDc2dNaUE4SUd4bGJpbGNiaUFnSUNBZ0lIWmhiQ0E5SUdKMVpsdHZabVp6WlhRZ0t5QXlYU0E4UENBeE5seHVJQ0FnSUdsbUlDaHZabVp6WlhRZ0t5QXhJRHdnYkdWdUtWeHVJQ0FnSUNBZ2RtRnNJSHc5SUdKMVpsdHZabVp6WlhRZ0t5QXhYU0E4UENBNFhHNGdJQ0FnZG1Gc0lIdzlJR0oxWmx0dlptWnpaWFJkWEc0Z0lDQWdhV1lnS0c5bVpuTmxkQ0FySURNZ1BDQnNaVzRwWEc0Z0lDQWdJQ0IyWVd3Z1BTQjJZV3dnS3lBb1luVm1XMjltWm5ObGRDQXJJRE5kSUR3OElESTBJRDQrUGlBd0tWeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lHbG1JQ2h2Wm1aelpYUWdLeUF4SUR3Z2JHVnVLVnh1SUNBZ0lDQWdkbUZzSUQwZ1luVm1XMjltWm5ObGRDQXJJREZkSUR3OElERTJYRzRnSUNBZ2FXWWdLRzltWm5ObGRDQXJJRElnUENCc1pXNHBYRzRnSUNBZ0lDQjJZV3dnZkQwZ1luVm1XMjltWm5ObGRDQXJJREpkSUR3OElEaGNiaUFnSUNCcFppQW9iMlptYzJWMElDc2dNeUE4SUd4bGJpbGNiaUFnSUNBZ0lIWmhiQ0I4UFNCaWRXWmJiMlptYzJWMElDc2dNMTFjYmlBZ0lDQjJZV3dnUFNCMllXd2dLeUFvWW5WbVcyOW1abk5sZEYwZ1BEd2dNalFnUGo0K0lEQXBYRzRnSUgxY2JpQWdjbVYwZFhKdUlIWmhiRnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuSmxZV1JWU1c1ME16Sk1SU0E5SUdaMWJtTjBhVzl1SUNodlptWnpaWFFzSUc1dlFYTnpaWEowS1NCN1hHNGdJSEpsZEhWeWJpQmZjbVZoWkZWSmJuUXpNaWgwYUdsekxDQnZabVp6WlhRc0lIUnlkV1VzSUc1dlFYTnpaWEowS1Z4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbkpsWVdSVlNXNTBNekpDUlNBOUlHWjFibU4wYVc5dUlDaHZabVp6WlhRc0lHNXZRWE56WlhKMEtTQjdYRzRnSUhKbGRIVnliaUJmY21WaFpGVkpiblF6TWloMGFHbHpMQ0J2Wm1aelpYUXNJR1poYkhObExDQnViMEZ6YzJWeWRDbGNibjFjYmx4dVFuVm1abVZ5TG5CeWIzUnZkSGx3WlM1eVpXRmtTVzUwT0NBOUlHWjFibU4wYVc5dUlDaHZabVp6WlhRc0lHNXZRWE56WlhKMEtTQjdYRzRnSUdsbUlDZ2hibTlCYzNObGNuUXBJSHRjYmlBZ0lDQmhjM05sY25Rb2IyWm1jMlYwSUNFOVBTQjFibVJsWm1sdVpXUWdKaVlnYjJabWMyVjBJQ0U5UFNCdWRXeHNMRnh1SUNBZ0lDQWdJQ0FuYldsemMybHVaeUJ2Wm1aelpYUW5LVnh1SUNBZ0lHRnpjMlZ5ZENodlptWnpaWFFnUENCMGFHbHpMbXhsYm1kMGFDd2dKMVJ5ZVdsdVp5QjBieUJ5WldGa0lHSmxlVzl1WkNCaWRXWm1aWElnYkdWdVozUm9KeWxjYmlBZ2ZWeHVYRzRnSUdsbUlDaHZabVp6WlhRZ1BqMGdkR2hwY3k1c1pXNW5kR2dwWEc0Z0lDQWdjbVYwZFhKdVhHNWNiaUFnZG1GeUlHNWxaeUE5SUhSb2FYTmJiMlptYzJWMFhTQW1JREI0T0RCY2JpQWdhV1lnS0c1bFp5bGNiaUFnSUNCeVpYUjFjbTRnS0RCNFptWWdMU0IwYUdselcyOW1abk5sZEYwZ0t5QXhLU0FxSUMweFhHNGdJR1ZzYzJWY2JpQWdJQ0J5WlhSMWNtNGdkR2hwYzF0dlptWnpaWFJkWEc1OVhHNWNibVoxYm1OMGFXOXVJRjl5WldGa1NXNTBNVFlnS0dKMVppd2diMlptYzJWMExDQnNhWFIwYkdWRmJtUnBZVzRzSUc1dlFYTnpaWEowS1NCN1hHNGdJR2xtSUNnaGJtOUJjM05sY25RcElIdGNiaUFnSUNCaGMzTmxjblFvZEhsd1pXOW1JR3hwZEhSc1pVVnVaR2xoYmlBOVBUMGdKMkp2YjJ4bFlXNG5MQ0FuYldsemMybHVaeUJ2Y2lCcGJuWmhiR2xrSUdWdVpHbGhiaWNwWEc0Z0lDQWdZWE56WlhKMEtHOW1abk5sZENBaFBUMGdkVzVrWldacGJtVmtJQ1ltSUc5bVpuTmxkQ0FoUFQwZ2JuVnNiQ3dnSjIxcGMzTnBibWNnYjJabWMyVjBKeWxjYmlBZ0lDQmhjM05sY25Rb2IyWm1jMlYwSUNzZ01TQThJR0oxWmk1c1pXNW5kR2dzSUNkVWNubHBibWNnZEc4Z2NtVmhaQ0JpWlhsdmJtUWdZblZtWm1WeUlHeGxibWQwYUNjcFhHNGdJSDFjYmx4dUlDQjJZWElnYkdWdUlEMGdZblZtTG14bGJtZDBhRnh1SUNCcFppQW9iMlptYzJWMElENDlJR3hsYmlsY2JpQWdJQ0J5WlhSMWNtNWNibHh1SUNCMllYSWdkbUZzSUQwZ1gzSmxZV1JWU1c1ME1UWW9ZblZtTENCdlptWnpaWFFzSUd4cGRIUnNaVVZ1WkdsaGJpd2dkSEoxWlNsY2JpQWdkbUZ5SUc1bFp5QTlJSFpoYkNBbUlEQjRPREF3TUZ4dUlDQnBaaUFvYm1WbktWeHVJQ0FnSUhKbGRIVnliaUFvTUhobVptWm1JQzBnZG1Gc0lDc2dNU2tnS2lBdE1WeHVJQ0JsYkhObFhHNGdJQ0FnY21WMGRYSnVJSFpoYkZ4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbkpsWVdSSmJuUXhOa3hGSUQwZ1puVnVZM1JwYjI0Z0tHOW1abk5sZEN3Z2JtOUJjM05sY25RcElIdGNiaUFnY21WMGRYSnVJRjl5WldGa1NXNTBNVFlvZEdocGN5d2diMlptYzJWMExDQjBjblZsTENCdWIwRnpjMlZ5ZENsY2JuMWNibHh1UW5WbVptVnlMbkJ5YjNSdmRIbHdaUzV5WldGa1NXNTBNVFpDUlNBOUlHWjFibU4wYVc5dUlDaHZabVp6WlhRc0lHNXZRWE56WlhKMEtTQjdYRzRnSUhKbGRIVnliaUJmY21WaFpFbHVkREUyS0hSb2FYTXNJRzltWm5ObGRDd2dabUZzYzJVc0lHNXZRWE56WlhKMEtWeHVmVnh1WEc1bWRXNWpkR2x2YmlCZmNtVmhaRWx1ZERNeUlDaGlkV1lzSUc5bVpuTmxkQ3dnYkdsMGRHeGxSVzVrYVdGdUxDQnViMEZ6YzJWeWRDa2dlMXh1SUNCcFppQW9JVzV2UVhOelpYSjBLU0I3WEc0Z0lDQWdZWE56WlhKMEtIUjVjR1Z2WmlCc2FYUjBiR1ZGYm1ScFlXNGdQVDA5SUNkaWIyOXNaV0Z1Snl3Z0oyMXBjM05wYm1jZ2IzSWdhVzUyWVd4cFpDQmxibVJwWVc0bktWeHVJQ0FnSUdGemMyVnlkQ2h2Wm1aelpYUWdJVDA5SUhWdVpHVm1hVzVsWkNBbUppQnZabVp6WlhRZ0lUMDlJRzUxYkd3c0lDZHRhWE56YVc1bklHOW1abk5sZENjcFhHNGdJQ0FnWVhOelpYSjBLRzltWm5ObGRDQXJJRE1nUENCaWRXWXViR1Z1WjNSb0xDQW5WSEo1YVc1bklIUnZJSEpsWVdRZ1ltVjViMjVrSUdKMVptWmxjaUJzWlc1bmRHZ25LVnh1SUNCOVhHNWNiaUFnZG1GeUlHeGxiaUE5SUdKMVppNXNaVzVuZEdoY2JpQWdhV1lnS0c5bVpuTmxkQ0ErUFNCc1pXNHBYRzRnSUNBZ2NtVjBkWEp1WEc1Y2JpQWdkbUZ5SUhaaGJDQTlJRjl5WldGa1ZVbHVkRE15S0dKMVppd2diMlptYzJWMExDQnNhWFIwYkdWRmJtUnBZVzRzSUhSeWRXVXBYRzRnSUhaaGNpQnVaV2NnUFNCMllXd2dKaUF3ZURnd01EQXdNREF3WEc0Z0lHbG1JQ2h1WldjcFhHNGdJQ0FnY21WMGRYSnVJQ2d3ZUdabVptWm1abVptSUMwZ2RtRnNJQ3NnTVNrZ0tpQXRNVnh1SUNCbGJITmxYRzRnSUNBZ2NtVjBkWEp1SUhaaGJGeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5KbFlXUkpiblF6TWt4RklEMGdablZ1WTNScGIyNGdLRzltWm5ObGRDd2dibTlCYzNObGNuUXBJSHRjYmlBZ2NtVjBkWEp1SUY5eVpXRmtTVzUwTXpJb2RHaHBjeXdnYjJabWMyVjBMQ0IwY25WbExDQnViMEZ6YzJWeWRDbGNibjFjYmx4dVFuVm1abVZ5TG5CeWIzUnZkSGx3WlM1eVpXRmtTVzUwTXpKQ1JTQTlJR1oxYm1OMGFXOXVJQ2h2Wm1aelpYUXNJRzV2UVhOelpYSjBLU0I3WEc0Z0lISmxkSFZ5YmlCZmNtVmhaRWx1ZERNeUtIUm9hWE1zSUc5bVpuTmxkQ3dnWm1Gc2MyVXNJRzV2UVhOelpYSjBLVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmZjbVZoWkVac2IyRjBJQ2hpZFdZc0lHOW1abk5sZEN3Z2JHbDBkR3hsUlc1a2FXRnVMQ0J1YjBGemMyVnlkQ2tnZTF4dUlDQnBaaUFvSVc1dlFYTnpaWEowS1NCN1hHNGdJQ0FnWVhOelpYSjBLSFI1Y0dWdlppQnNhWFIwYkdWRmJtUnBZVzRnUFQwOUlDZGliMjlzWldGdUp5d2dKMjFwYzNOcGJtY2diM0lnYVc1MllXeHBaQ0JsYm1ScFlXNG5LVnh1SUNBZ0lHRnpjMlZ5ZENodlptWnpaWFFnS3lBeklEd2dZblZtTG14bGJtZDBhQ3dnSjFSeWVXbHVaeUIwYnlCeVpXRmtJR0psZVc5dVpDQmlkV1ptWlhJZ2JHVnVaM1JvSnlsY2JpQWdmVnh1WEc0Z0lISmxkSFZ5YmlCcFpXVmxOelUwTG5KbFlXUW9ZblZtTENCdlptWnpaWFFzSUd4cGRIUnNaVVZ1WkdsaGJpd2dNak1zSURRcFhHNTlYRzVjYmtKMVptWmxjaTV3Y205MGIzUjVjR1V1Y21WaFpFWnNiMkYwVEVVZ1BTQm1kVzVqZEdsdmJpQW9iMlptYzJWMExDQnViMEZ6YzJWeWRDa2dlMXh1SUNCeVpYUjFjbTRnWDNKbFlXUkdiRzloZENoMGFHbHpMQ0J2Wm1aelpYUXNJSFJ5ZFdVc0lHNXZRWE56WlhKMEtWeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5KbFlXUkdiRzloZEVKRklEMGdablZ1WTNScGIyNGdLRzltWm5ObGRDd2dibTlCYzNObGNuUXBJSHRjYmlBZ2NtVjBkWEp1SUY5eVpXRmtSbXh2WVhRb2RHaHBjeXdnYjJabWMyVjBMQ0JtWVd4elpTd2dibTlCYzNObGNuUXBYRzU5WEc1Y2JtWjFibU4wYVc5dUlGOXlaV0ZrUkc5MVlteGxJQ2hpZFdZc0lHOW1abk5sZEN3Z2JHbDBkR3hsUlc1a2FXRnVMQ0J1YjBGemMyVnlkQ2tnZTF4dUlDQnBaaUFvSVc1dlFYTnpaWEowS1NCN1hHNGdJQ0FnWVhOelpYSjBLSFI1Y0dWdlppQnNhWFIwYkdWRmJtUnBZVzRnUFQwOUlDZGliMjlzWldGdUp5d2dKMjFwYzNOcGJtY2diM0lnYVc1MllXeHBaQ0JsYm1ScFlXNG5LVnh1SUNBZ0lHRnpjMlZ5ZENodlptWnpaWFFnS3lBM0lEd2dZblZtTG14bGJtZDBhQ3dnSjFSeWVXbHVaeUIwYnlCeVpXRmtJR0psZVc5dVpDQmlkV1ptWlhJZ2JHVnVaM1JvSnlsY2JpQWdmVnh1WEc0Z0lISmxkSFZ5YmlCcFpXVmxOelUwTG5KbFlXUW9ZblZtTENCdlptWnpaWFFzSUd4cGRIUnNaVVZ1WkdsaGJpd2dOVElzSURncFhHNTlYRzVjYmtKMVptWmxjaTV3Y205MGIzUjVjR1V1Y21WaFpFUnZkV0pzWlV4RklEMGdablZ1WTNScGIyNGdLRzltWm5ObGRDd2dibTlCYzNObGNuUXBJSHRjYmlBZ2NtVjBkWEp1SUY5eVpXRmtSRzkxWW14bEtIUm9hWE1zSUc5bVpuTmxkQ3dnZEhKMVpTd2dibTlCYzNObGNuUXBYRzU5WEc1Y2JrSjFabVpsY2k1d2NtOTBiM1I1Y0dVdWNtVmhaRVJ2ZFdKc1pVSkZJRDBnWm5WdVkzUnBiMjRnS0c5bVpuTmxkQ3dnYm05QmMzTmxjblFwSUh0Y2JpQWdjbVYwZFhKdUlGOXlaV0ZrUkc5MVlteGxLSFJvYVhNc0lHOW1abk5sZEN3Z1ptRnNjMlVzSUc1dlFYTnpaWEowS1Z4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbmR5YVhSbFZVbHVkRGdnUFNCbWRXNWpkR2x2YmlBb2RtRnNkV1VzSUc5bVpuTmxkQ3dnYm05QmMzTmxjblFwSUh0Y2JpQWdhV1lnS0NGdWIwRnpjMlZ5ZENrZ2UxeHVJQ0FnSUdGemMyVnlkQ2gyWVd4MVpTQWhQVDBnZFc1a1pXWnBibVZrSUNZbUlIWmhiSFZsSUNFOVBTQnVkV3hzTENBbmJXbHpjMmx1WnlCMllXeDFaU2NwWEc0Z0lDQWdZWE56WlhKMEtHOW1abk5sZENBaFBUMGdkVzVrWldacGJtVmtJQ1ltSUc5bVpuTmxkQ0FoUFQwZ2JuVnNiQ3dnSjIxcGMzTnBibWNnYjJabWMyVjBKeWxjYmlBZ0lDQmhjM05sY25Rb2IyWm1jMlYwSUR3Z2RHaHBjeTVzWlc1bmRHZ3NJQ2QwY25scGJtY2dkRzhnZDNKcGRHVWdZbVY1YjI1a0lHSjFabVpsY2lCc1pXNW5kR2duS1Z4dUlDQWdJSFpsY21sbWRXbHVkQ2gyWVd4MVpTd2dNSGhtWmlsY2JpQWdmVnh1WEc0Z0lHbG1JQ2h2Wm1aelpYUWdQajBnZEdocGN5NXNaVzVuZEdncElISmxkSFZ5Ymx4dVhHNGdJSFJvYVhOYmIyWm1jMlYwWFNBOUlIWmhiSFZsWEc1OVhHNWNibVoxYm1OMGFXOXVJRjkzY21sMFpWVkpiblF4TmlBb1luVm1MQ0IyWVd4MVpTd2diMlptYzJWMExDQnNhWFIwYkdWRmJtUnBZVzRzSUc1dlFYTnpaWEowS1NCN1hHNGdJR2xtSUNnaGJtOUJjM05sY25RcElIdGNiaUFnSUNCaGMzTmxjblFvZG1Gc2RXVWdJVDA5SUhWdVpHVm1hVzVsWkNBbUppQjJZV3gxWlNBaFBUMGdiblZzYkN3Z0oyMXBjM05wYm1jZ2RtRnNkV1VuS1Z4dUlDQWdJR0Z6YzJWeWRDaDBlWEJsYjJZZ2JHbDBkR3hsUlc1a2FXRnVJRDA5UFNBblltOXZiR1ZoYmljc0lDZHRhWE56YVc1bklHOXlJR2x1ZG1Gc2FXUWdaVzVrYVdGdUp5bGNiaUFnSUNCaGMzTmxjblFvYjJabWMyVjBJQ0U5UFNCMWJtUmxabWx1WldRZ0ppWWdiMlptYzJWMElDRTlQU0J1ZFd4c0xDQW5iV2x6YzJsdVp5QnZabVp6WlhRbktWeHVJQ0FnSUdGemMyVnlkQ2h2Wm1aelpYUWdLeUF4SUR3Z1luVm1MbXhsYm1kMGFDd2dKM1J5ZVdsdVp5QjBieUIzY21sMFpTQmlaWGx2Ym1RZ1luVm1abVZ5SUd4bGJtZDBhQ2NwWEc0Z0lDQWdkbVZ5YVdaMWFXNTBLSFpoYkhWbExDQXdlR1ptWm1ZcFhHNGdJSDFjYmx4dUlDQjJZWElnYkdWdUlEMGdZblZtTG14bGJtZDBhRnh1SUNCcFppQW9iMlptYzJWMElENDlJR3hsYmlsY2JpQWdJQ0J5WlhSMWNtNWNibHh1SUNCbWIzSWdLSFpoY2lCcElEMGdNQ3dnYWlBOUlFMWhkR2d1YldsdUtHeGxiaUF0SUc5bVpuTmxkQ3dnTWlrN0lHa2dQQ0JxT3lCcEt5c3BJSHRjYmlBZ0lDQmlkV1piYjJabWMyVjBJQ3NnYVYwZ1BWeHVJQ0FnSUNBZ0lDQW9kbUZzZFdVZ0ppQW9NSGhtWmlBOFBDQW9PQ0FxSUNoc2FYUjBiR1ZGYm1ScFlXNGdQeUJwSURvZ01TQXRJR2twS1NrcElENCtQbHh1SUNBZ0lDQWdJQ0FnSUNBZ0tHeHBkSFJzWlVWdVpHbGhiaUEvSUdrZ09pQXhJQzBnYVNrZ0tpQTRYRzRnSUgxY2JuMWNibHh1UW5WbVptVnlMbkJ5YjNSdmRIbHdaUzUzY21sMFpWVkpiblF4Tmt4RklEMGdablZ1WTNScGIyNGdLSFpoYkhWbExDQnZabVp6WlhRc0lHNXZRWE56WlhKMEtTQjdYRzRnSUY5M2NtbDBaVlZKYm5ReE5paDBhR2x6TENCMllXeDFaU3dnYjJabWMyVjBMQ0IwY25WbExDQnViMEZ6YzJWeWRDbGNibjFjYmx4dVFuVm1abVZ5TG5CeWIzUnZkSGx3WlM1M2NtbDBaVlZKYm5ReE5rSkZJRDBnWm5WdVkzUnBiMjRnS0haaGJIVmxMQ0J2Wm1aelpYUXNJRzV2UVhOelpYSjBLU0I3WEc0Z0lGOTNjbWwwWlZWSmJuUXhOaWgwYUdsekxDQjJZV3gxWlN3Z2IyWm1jMlYwTENCbVlXeHpaU3dnYm05QmMzTmxjblFwWEc1OVhHNWNibVoxYm1OMGFXOXVJRjkzY21sMFpWVkpiblF6TWlBb1luVm1MQ0IyWVd4MVpTd2diMlptYzJWMExDQnNhWFIwYkdWRmJtUnBZVzRzSUc1dlFYTnpaWEowS1NCN1hHNGdJR2xtSUNnaGJtOUJjM05sY25RcElIdGNiaUFnSUNCaGMzTmxjblFvZG1Gc2RXVWdJVDA5SUhWdVpHVm1hVzVsWkNBbUppQjJZV3gxWlNBaFBUMGdiblZzYkN3Z0oyMXBjM05wYm1jZ2RtRnNkV1VuS1Z4dUlDQWdJR0Z6YzJWeWRDaDBlWEJsYjJZZ2JHbDBkR3hsUlc1a2FXRnVJRDA5UFNBblltOXZiR1ZoYmljc0lDZHRhWE56YVc1bklHOXlJR2x1ZG1Gc2FXUWdaVzVrYVdGdUp5bGNiaUFnSUNCaGMzTmxjblFvYjJabWMyVjBJQ0U5UFNCMWJtUmxabWx1WldRZ0ppWWdiMlptYzJWMElDRTlQU0J1ZFd4c0xDQW5iV2x6YzJsdVp5QnZabVp6WlhRbktWeHVJQ0FnSUdGemMyVnlkQ2h2Wm1aelpYUWdLeUF6SUR3Z1luVm1MbXhsYm1kMGFDd2dKM1J5ZVdsdVp5QjBieUIzY21sMFpTQmlaWGx2Ym1RZ1luVm1abVZ5SUd4bGJtZDBhQ2NwWEc0Z0lDQWdkbVZ5YVdaMWFXNTBLSFpoYkhWbExDQXdlR1ptWm1abVptWm1LVnh1SUNCOVhHNWNiaUFnZG1GeUlHeGxiaUE5SUdKMVppNXNaVzVuZEdoY2JpQWdhV1lnS0c5bVpuTmxkQ0ErUFNCc1pXNHBYRzRnSUNBZ2NtVjBkWEp1WEc1Y2JpQWdabTl5SUNoMllYSWdhU0E5SURBc0lHb2dQU0JOWVhSb0xtMXBiaWhzWlc0Z0xTQnZabVp6WlhRc0lEUXBPeUJwSUR3Z2Fqc2dhU3NyS1NCN1hHNGdJQ0FnWW5WbVcyOW1abk5sZENBcklHbGRJRDFjYmlBZ0lDQWdJQ0FnS0haaGJIVmxJRDQrUGlBb2JHbDBkR3hsUlc1a2FXRnVJRDhnYVNBNklETWdMU0JwS1NBcUlEZ3BJQ1lnTUhobVpseHVJQ0I5WEc1OVhHNWNia0oxWm1abGNpNXdjbTkwYjNSNWNHVXVkM0pwZEdWVlNXNTBNekpNUlNBOUlHWjFibU4wYVc5dUlDaDJZV3gxWlN3Z2IyWm1jMlYwTENCdWIwRnpjMlZ5ZENrZ2UxeHVJQ0JmZDNKcGRHVlZTVzUwTXpJb2RHaHBjeXdnZG1Gc2RXVXNJRzltWm5ObGRDd2dkSEoxWlN3Z2JtOUJjM05sY25RcFhHNTlYRzVjYmtKMVptWmxjaTV3Y205MGIzUjVjR1V1ZDNKcGRHVlZTVzUwTXpKQ1JTQTlJR1oxYm1OMGFXOXVJQ2gyWVd4MVpTd2diMlptYzJWMExDQnViMEZ6YzJWeWRDa2dlMXh1SUNCZmQzSnBkR1ZWU1c1ME16SW9kR2hwY3l3Z2RtRnNkV1VzSUc5bVpuTmxkQ3dnWm1Gc2MyVXNJRzV2UVhOelpYSjBLVnh1ZlZ4dVhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExuZHlhWFJsU1c1ME9DQTlJR1oxYm1OMGFXOXVJQ2gyWVd4MVpTd2diMlptYzJWMExDQnViMEZ6YzJWeWRDa2dlMXh1SUNCcFppQW9JVzV2UVhOelpYSjBLU0I3WEc0Z0lDQWdZWE56WlhKMEtIWmhiSFZsSUNFOVBTQjFibVJsWm1sdVpXUWdKaVlnZG1Gc2RXVWdJVDA5SUc1MWJHd3NJQ2R0YVhOemFXNW5JSFpoYkhWbEp5bGNiaUFnSUNCaGMzTmxjblFvYjJabWMyVjBJQ0U5UFNCMWJtUmxabWx1WldRZ0ppWWdiMlptYzJWMElDRTlQU0J1ZFd4c0xDQW5iV2x6YzJsdVp5QnZabVp6WlhRbktWeHVJQ0FnSUdGemMyVnlkQ2h2Wm1aelpYUWdQQ0IwYUdsekxteGxibWQwYUN3Z0oxUnllV2x1WnlCMGJ5QjNjbWwwWlNCaVpYbHZibVFnWW5WbVptVnlJR3hsYm1kMGFDY3BYRzRnSUNBZ2RtVnlhV1p6YVc1MEtIWmhiSFZsTENBd2VEZG1MQ0F0TUhnNE1DbGNiaUFnZlZ4dVhHNGdJR2xtSUNodlptWnpaWFFnUGowZ2RHaHBjeTVzWlc1bmRHZ3BYRzRnSUNBZ2NtVjBkWEp1WEc1Y2JpQWdhV1lnS0haaGJIVmxJRDQ5SURBcFhHNGdJQ0FnZEdocGN5NTNjbWwwWlZWSmJuUTRLSFpoYkhWbExDQnZabVp6WlhRc0lHNXZRWE56WlhKMEtWeHVJQ0JsYkhObFhHNGdJQ0FnZEdocGN5NTNjbWwwWlZWSmJuUTRLREI0Wm1ZZ0t5QjJZV3gxWlNBcklERXNJRzltWm5ObGRDd2dibTlCYzNObGNuUXBYRzU5WEc1Y2JtWjFibU4wYVc5dUlGOTNjbWwwWlVsdWRERTJJQ2hpZFdZc0lIWmhiSFZsTENCdlptWnpaWFFzSUd4cGRIUnNaVVZ1WkdsaGJpd2dibTlCYzNObGNuUXBJSHRjYmlBZ2FXWWdLQ0Z1YjBGemMyVnlkQ2tnZTF4dUlDQWdJR0Z6YzJWeWRDaDJZV3gxWlNBaFBUMGdkVzVrWldacGJtVmtJQ1ltSUhaaGJIVmxJQ0U5UFNCdWRXeHNMQ0FuYldsemMybHVaeUIyWVd4MVpTY3BYRzRnSUNBZ1lYTnpaWEowS0hSNWNHVnZaaUJzYVhSMGJHVkZibVJwWVc0Z1BUMDlJQ2RpYjI5c1pXRnVKeXdnSjIxcGMzTnBibWNnYjNJZ2FXNTJZV3hwWkNCbGJtUnBZVzRuS1Z4dUlDQWdJR0Z6YzJWeWRDaHZabVp6WlhRZ0lUMDlJSFZ1WkdWbWFXNWxaQ0FtSmlCdlptWnpaWFFnSVQwOUlHNTFiR3dzSUNkdGFYTnphVzVuSUc5bVpuTmxkQ2NwWEc0Z0lDQWdZWE56WlhKMEtHOW1abk5sZENBcklERWdQQ0JpZFdZdWJHVnVaM1JvTENBblZISjVhVzVuSUhSdklIZHlhWFJsSUdKbGVXOXVaQ0JpZFdabVpYSWdiR1Z1WjNSb0p5bGNiaUFnSUNCMlpYSnBabk5wYm5Rb2RtRnNkV1VzSURCNE4yWm1aaXdnTFRCNE9EQXdNQ2xjYmlBZ2ZWeHVYRzRnSUhaaGNpQnNaVzRnUFNCaWRXWXViR1Z1WjNSb1hHNGdJR2xtSUNodlptWnpaWFFnUGowZ2JHVnVLVnh1SUNBZ0lISmxkSFZ5Ymx4dVhHNGdJR2xtSUNoMllXeDFaU0ErUFNBd0tWeHVJQ0FnSUY5M2NtbDBaVlZKYm5ReE5paGlkV1lzSUhaaGJIVmxMQ0J2Wm1aelpYUXNJR3hwZEhSc1pVVnVaR2xoYml3Z2JtOUJjM05sY25RcFhHNGdJR1ZzYzJWY2JpQWdJQ0JmZDNKcGRHVlZTVzUwTVRZb1luVm1MQ0F3ZUdabVptWWdLeUIyWVd4MVpTQXJJREVzSUc5bVpuTmxkQ3dnYkdsMGRHeGxSVzVrYVdGdUxDQnViMEZ6YzJWeWRDbGNibjFjYmx4dVFuVm1abVZ5TG5CeWIzUnZkSGx3WlM1M2NtbDBaVWx1ZERFMlRFVWdQU0JtZFc1amRHbHZiaUFvZG1Gc2RXVXNJRzltWm5ObGRDd2dibTlCYzNObGNuUXBJSHRjYmlBZ1gzZHlhWFJsU1c1ME1UWW9kR2hwY3l3Z2RtRnNkV1VzSUc5bVpuTmxkQ3dnZEhKMVpTd2dibTlCYzNObGNuUXBYRzU5WEc1Y2JrSjFabVpsY2k1d2NtOTBiM1I1Y0dVdWQzSnBkR1ZKYm5ReE5rSkZJRDBnWm5WdVkzUnBiMjRnS0haaGJIVmxMQ0J2Wm1aelpYUXNJRzV2UVhOelpYSjBLU0I3WEc0Z0lGOTNjbWwwWlVsdWRERTJLSFJvYVhNc0lIWmhiSFZsTENCdlptWnpaWFFzSUdaaGJITmxMQ0J1YjBGemMyVnlkQ2xjYm4xY2JseHVablZ1WTNScGIyNGdYM2R5YVhSbFNXNTBNeklnS0dKMVppd2dkbUZzZFdVc0lHOW1abk5sZEN3Z2JHbDBkR3hsUlc1a2FXRnVMQ0J1YjBGemMyVnlkQ2tnZTF4dUlDQnBaaUFvSVc1dlFYTnpaWEowS1NCN1hHNGdJQ0FnWVhOelpYSjBLSFpoYkhWbElDRTlQU0IxYm1SbFptbHVaV1FnSmlZZ2RtRnNkV1VnSVQwOUlHNTFiR3dzSUNkdGFYTnphVzVuSUhaaGJIVmxKeWxjYmlBZ0lDQmhjM05sY25Rb2RIbHdaVzltSUd4cGRIUnNaVVZ1WkdsaGJpQTlQVDBnSjJKdmIyeGxZVzRuTENBbmJXbHpjMmx1WnlCdmNpQnBiblpoYkdsa0lHVnVaR2xoYmljcFhHNGdJQ0FnWVhOelpYSjBLRzltWm5ObGRDQWhQVDBnZFc1a1pXWnBibVZrSUNZbUlHOW1abk5sZENBaFBUMGdiblZzYkN3Z0oyMXBjM05wYm1jZ2IyWm1jMlYwSnlsY2JpQWdJQ0JoYzNObGNuUW9iMlptYzJWMElDc2dNeUE4SUdKMVppNXNaVzVuZEdnc0lDZFVjbmxwYm1jZ2RHOGdkM0pwZEdVZ1ltVjViMjVrSUdKMVptWmxjaUJzWlc1bmRHZ25LVnh1SUNBZ0lIWmxjbWxtYzJsdWRDaDJZV3gxWlN3Z01IZzNabVptWm1abVppd2dMVEI0T0RBd01EQXdNREFwWEc0Z0lIMWNibHh1SUNCMllYSWdiR1Z1SUQwZ1luVm1MbXhsYm1kMGFGeHVJQ0JwWmlBb2IyWm1jMlYwSUQ0OUlHeGxiaWxjYmlBZ0lDQnlaWFIxY201Y2JseHVJQ0JwWmlBb2RtRnNkV1VnUGowZ01DbGNiaUFnSUNCZmQzSnBkR1ZWU1c1ME16SW9ZblZtTENCMllXeDFaU3dnYjJabWMyVjBMQ0JzYVhSMGJHVkZibVJwWVc0c0lHNXZRWE56WlhKMEtWeHVJQ0JsYkhObFhHNGdJQ0FnWDNkeWFYUmxWVWx1ZERNeUtHSjFaaXdnTUhobVptWm1abVptWmlBcklIWmhiSFZsSUNzZ01Td2diMlptYzJWMExDQnNhWFIwYkdWRmJtUnBZVzRzSUc1dlFYTnpaWEowS1Z4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbmR5YVhSbFNXNTBNekpNUlNBOUlHWjFibU4wYVc5dUlDaDJZV3gxWlN3Z2IyWm1jMlYwTENCdWIwRnpjMlZ5ZENrZ2UxeHVJQ0JmZDNKcGRHVkpiblF6TWloMGFHbHpMQ0IyWVd4MVpTd2diMlptYzJWMExDQjBjblZsTENCdWIwRnpjMlZ5ZENsY2JuMWNibHh1UW5WbVptVnlMbkJ5YjNSdmRIbHdaUzUzY21sMFpVbHVkRE15UWtVZ1BTQm1kVzVqZEdsdmJpQW9kbUZzZFdVc0lHOW1abk5sZEN3Z2JtOUJjM05sY25RcElIdGNiaUFnWDNkeWFYUmxTVzUwTXpJb2RHaHBjeXdnZG1Gc2RXVXNJRzltWm5ObGRDd2dabUZzYzJVc0lHNXZRWE56WlhKMEtWeHVmVnh1WEc1bWRXNWpkR2x2YmlCZmQzSnBkR1ZHYkc5aGRDQW9ZblZtTENCMllXeDFaU3dnYjJabWMyVjBMQ0JzYVhSMGJHVkZibVJwWVc0c0lHNXZRWE56WlhKMEtTQjdYRzRnSUdsbUlDZ2hibTlCYzNObGNuUXBJSHRjYmlBZ0lDQmhjM05sY25Rb2RtRnNkV1VnSVQwOUlIVnVaR1ZtYVc1bFpDQW1KaUIyWVd4MVpTQWhQVDBnYm5Wc2JDd2dKMjFwYzNOcGJtY2dkbUZzZFdVbktWeHVJQ0FnSUdGemMyVnlkQ2gwZVhCbGIyWWdiR2wwZEd4bFJXNWthV0Z1SUQwOVBTQW5ZbTl2YkdWaGJpY3NJQ2R0YVhOemFXNW5JRzl5SUdsdWRtRnNhV1FnWlc1a2FXRnVKeWxjYmlBZ0lDQmhjM05sY25Rb2IyWm1jMlYwSUNFOVBTQjFibVJsWm1sdVpXUWdKaVlnYjJabWMyVjBJQ0U5UFNCdWRXeHNMQ0FuYldsemMybHVaeUJ2Wm1aelpYUW5LVnh1SUNBZ0lHRnpjMlZ5ZENodlptWnpaWFFnS3lBeklEd2dZblZtTG14bGJtZDBhQ3dnSjFSeWVXbHVaeUIwYnlCM2NtbDBaU0JpWlhsdmJtUWdZblZtWm1WeUlHeGxibWQwYUNjcFhHNGdJQ0FnZG1WeWFXWkpSVVZGTnpVMEtIWmhiSFZsTENBekxqUXdNamd5TXpRMk5qTTROVEk0T0RabEt6TTRMQ0F0TXk0ME1ESTRNak0wTmpZek9EVXlPRGcyWlNzek9DbGNiaUFnZlZ4dVhHNGdJSFpoY2lCc1pXNGdQU0JpZFdZdWJHVnVaM1JvWEc0Z0lHbG1JQ2h2Wm1aelpYUWdQajBnYkdWdUtWeHVJQ0FnSUhKbGRIVnlibHh1WEc0Z0lHbGxaV1UzTlRRdWQzSnBkR1VvWW5WbUxDQjJZV3gxWlN3Z2IyWm1jMlYwTENCc2FYUjBiR1ZGYm1ScFlXNHNJREl6TENBMEtWeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5keWFYUmxSbXh2WVhSTVJTQTlJR1oxYm1OMGFXOXVJQ2gyWVd4MVpTd2diMlptYzJWMExDQnViMEZ6YzJWeWRDa2dlMXh1SUNCZmQzSnBkR1ZHYkc5aGRDaDBhR2x6TENCMllXeDFaU3dnYjJabWMyVjBMQ0IwY25WbExDQnViMEZ6YzJWeWRDbGNibjFjYmx4dVFuVm1abVZ5TG5CeWIzUnZkSGx3WlM1M2NtbDBaVVpzYjJGMFFrVWdQU0JtZFc1amRHbHZiaUFvZG1Gc2RXVXNJRzltWm5ObGRDd2dibTlCYzNObGNuUXBJSHRjYmlBZ1gzZHlhWFJsUm14dllYUW9kR2hwY3l3Z2RtRnNkV1VzSUc5bVpuTmxkQ3dnWm1Gc2MyVXNJRzV2UVhOelpYSjBLVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmZkM0pwZEdWRWIzVmliR1VnS0dKMVppd2dkbUZzZFdVc0lHOW1abk5sZEN3Z2JHbDBkR3hsUlc1a2FXRnVMQ0J1YjBGemMyVnlkQ2tnZTF4dUlDQnBaaUFvSVc1dlFYTnpaWEowS1NCN1hHNGdJQ0FnWVhOelpYSjBLSFpoYkhWbElDRTlQU0IxYm1SbFptbHVaV1FnSmlZZ2RtRnNkV1VnSVQwOUlHNTFiR3dzSUNkdGFYTnphVzVuSUhaaGJIVmxKeWxjYmlBZ0lDQmhjM05sY25Rb2RIbHdaVzltSUd4cGRIUnNaVVZ1WkdsaGJpQTlQVDBnSjJKdmIyeGxZVzRuTENBbmJXbHpjMmx1WnlCdmNpQnBiblpoYkdsa0lHVnVaR2xoYmljcFhHNGdJQ0FnWVhOelpYSjBLRzltWm5ObGRDQWhQVDBnZFc1a1pXWnBibVZrSUNZbUlHOW1abk5sZENBaFBUMGdiblZzYkN3Z0oyMXBjM05wYm1jZ2IyWm1jMlYwSnlsY2JpQWdJQ0JoYzNObGNuUW9iMlptYzJWMElDc2dOeUE4SUdKMVppNXNaVzVuZEdnc1hHNGdJQ0FnSUNBZ0lDZFVjbmxwYm1jZ2RHOGdkM0pwZEdVZ1ltVjViMjVrSUdKMVptWmxjaUJzWlc1bmRHZ25LVnh1SUNBZ0lIWmxjbWxtU1VWRlJUYzFOQ2gyWVd4MVpTd2dNUzQzT1RjMk9UTXhNelE0TmpJek1UVTNSU3N6TURnc0lDMHhMamM1TnpZNU16RXpORGcyTWpNeE5UZEZLek13T0NsY2JpQWdmVnh1WEc0Z0lIWmhjaUJzWlc0Z1BTQmlkV1l1YkdWdVozUm9YRzRnSUdsbUlDaHZabVp6WlhRZ1BqMGdiR1Z1S1Z4dUlDQWdJSEpsZEhWeWJseHVYRzRnSUdsbFpXVTNOVFF1ZDNKcGRHVW9ZblZtTENCMllXeDFaU3dnYjJabWMyVjBMQ0JzYVhSMGJHVkZibVJwWVc0c0lEVXlMQ0E0S1Z4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbmR5YVhSbFJHOTFZbXhsVEVVZ1BTQm1kVzVqZEdsdmJpQW9kbUZzZFdVc0lHOW1abk5sZEN3Z2JtOUJjM05sY25RcElIdGNiaUFnWDNkeWFYUmxSRzkxWW14bEtIUm9hWE1zSUhaaGJIVmxMQ0J2Wm1aelpYUXNJSFJ5ZFdVc0lHNXZRWE56WlhKMEtWeHVmVnh1WEc1Q2RXWm1aWEl1Y0hKdmRHOTBlWEJsTG5keWFYUmxSRzkxWW14bFFrVWdQU0JtZFc1amRHbHZiaUFvZG1Gc2RXVXNJRzltWm5ObGRDd2dibTlCYzNObGNuUXBJSHRjYmlBZ1gzZHlhWFJsUkc5MVlteGxLSFJvYVhNc0lIWmhiSFZsTENCdlptWnpaWFFzSUdaaGJITmxMQ0J1YjBGemMyVnlkQ2xjYm4xY2JseHVMeThnWm1sc2JDaDJZV3gxWlN3Z2MzUmhjblE5TUN3Z1pXNWtQV0oxWm1abGNpNXNaVzVuZEdncFhHNUNkV1ptWlhJdWNISnZkRzkwZVhCbExtWnBiR3dnUFNCbWRXNWpkR2x2YmlBb2RtRnNkV1VzSUhOMFlYSjBMQ0JsYm1RcElIdGNiaUFnYVdZZ0tDRjJZV3gxWlNrZ2RtRnNkV1VnUFNBd1hHNGdJR2xtSUNnaGMzUmhjblFwSUhOMFlYSjBJRDBnTUZ4dUlDQnBaaUFvSVdWdVpDa2daVzVrSUQwZ2RHaHBjeTVzWlc1bmRHaGNibHh1SUNCcFppQW9kSGx3Wlc5bUlIWmhiSFZsSUQwOVBTQW5jM1J5YVc1bkp5a2dlMXh1SUNBZ0lIWmhiSFZsSUQwZ2RtRnNkV1V1WTJoaGNrTnZaR1ZCZENnd0tWeHVJQ0I5WEc1Y2JpQWdZWE56WlhKMEtIUjVjR1Z2WmlCMllXeDFaU0E5UFQwZ0oyNTFiV0psY2ljZ0ppWWdJV2x6VG1GT0tIWmhiSFZsS1N3Z0ozWmhiSFZsSUdseklHNXZkQ0JoSUc1MWJXSmxjaWNwWEc0Z0lHRnpjMlZ5ZENobGJtUWdQajBnYzNSaGNuUXNJQ2RsYm1RZ1BDQnpkR0Z5ZENjcFhHNWNiaUFnTHk4Z1JtbHNiQ0F3SUdKNWRHVnpPeUIzWlNkeVpTQmtiMjVsWEc0Z0lHbG1JQ2hsYm1RZ1BUMDlJSE4wWVhKMEtTQnlaWFIxY201Y2JpQWdhV1lnS0hSb2FYTXViR1Z1WjNSb0lEMDlQU0F3S1NCeVpYUjFjbTVjYmx4dUlDQmhjM05sY25Rb2MzUmhjblFnUGowZ01DQW1KaUJ6ZEdGeWRDQThJSFJvYVhNdWJHVnVaM1JvTENBbmMzUmhjblFnYjNWMElHOW1JR0p2ZFc1a2N5Y3BYRzRnSUdGemMyVnlkQ2hsYm1RZ1BqMGdNQ0FtSmlCbGJtUWdQRDBnZEdocGN5NXNaVzVuZEdnc0lDZGxibVFnYjNWMElHOW1JR0p2ZFc1a2N5Y3BYRzVjYmlBZ1ptOXlJQ2gyWVhJZ2FTQTlJSE4wWVhKME95QnBJRHdnWlc1a095QnBLeXNwSUh0Y2JpQWdJQ0IwYUdselcybGRJRDBnZG1Gc2RXVmNiaUFnZlZ4dWZWeHVYRzVDZFdabVpYSXVjSEp2ZEc5MGVYQmxMbWx1YzNCbFkzUWdQU0JtZFc1amRHbHZiaUFvS1NCN1hHNGdJSFpoY2lCdmRYUWdQU0JiWFZ4dUlDQjJZWElnYkdWdUlEMGdkR2hwY3k1c1pXNW5kR2hjYmlBZ1ptOXlJQ2gyWVhJZ2FTQTlJREE3SUdrZ1BDQnNaVzQ3SUdrckt5a2dlMXh1SUNBZ0lHOTFkRnRwWFNBOUlIUnZTR1Y0S0hSb2FYTmJhVjBwWEc0Z0lDQWdhV1lnS0drZ1BUMDlJR1Y0Y0c5eWRITXVTVTVUVUVWRFZGOU5RVmhmUWxsVVJWTXBJSHRjYmlBZ0lDQWdJRzkxZEZ0cElDc2dNVjBnUFNBbkxpNHVKMXh1SUNBZ0lDQWdZbkpsWVd0Y2JpQWdJQ0I5WEc0Z0lIMWNiaUFnY21WMGRYSnVJQ2M4UW5WbVptVnlJQ2NnS3lCdmRYUXVhbTlwYmlnbklDY3BJQ3NnSno0blhHNTlYRzVjYmk4cUtseHVJQ29nUTNKbFlYUmxjeUJoSUc1bGR5QmdRWEp5WVhsQ2RXWm1aWEpnSUhkcGRHZ2dkR2hsSUNwamIzQnBaV1FxSUcxbGJXOXllU0J2WmlCMGFHVWdZblZtWm1WeUlHbHVjM1JoYm1ObExseHVJQ29nUVdSa1pXUWdhVzRnVG05a1pTQXdMakV5TGlCUGJteDVJR0YyWVdsc1lXSnNaU0JwYmlCaWNtOTNjMlZ5Y3lCMGFHRjBJSE4xY0hCdmNuUWdRWEp5WVhsQ2RXWm1aWEl1WEc0Z0tpOWNia0oxWm1abGNpNXdjbTkwYjNSNWNHVXVkRzlCY25KaGVVSjFabVpsY2lBOUlHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ2FXWWdLSFI1Y0dWdlppQlZhVzUwT0VGeWNtRjVJQ0U5UFNBbmRXNWtaV1pwYm1Wa0p5a2dlMXh1SUNBZ0lHbG1JQ2hDZFdabVpYSXVYM1Z6WlZSNWNHVmtRWEp5WVhsektTQjdYRzRnSUNBZ0lDQnlaWFIxY200Z0tHNWxkeUJDZFdabVpYSW9kR2hwY3lrcExtSjFabVpsY2x4dUlDQWdJSDBnWld4elpTQjdYRzRnSUNBZ0lDQjJZWElnWW5WbUlEMGdibVYzSUZWcGJuUTRRWEp5WVhrb2RHaHBjeTVzWlc1bmRHZ3BYRzRnSUNBZ0lDQm1iM0lnS0haaGNpQnBJRDBnTUN3Z2JHVnVJRDBnWW5WbUxteGxibWQwYURzZ2FTQThJR3hsYmpzZ2FTQXJQU0F4S1Z4dUlDQWdJQ0FnSUNCaWRXWmJhVjBnUFNCMGFHbHpXMmxkWEc0Z0lDQWdJQ0J5WlhSMWNtNGdZblZtTG1KMVptWmxjbHh1SUNBZ0lIMWNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQjBhSEp2ZHlCdVpYY2dSWEp5YjNJb0owSjFabVpsY2k1MGIwRnljbUY1UW5WbVptVnlJRzV2ZENCemRYQndiM0owWldRZ2FXNGdkR2hwY3lCaWNtOTNjMlZ5SnlsY2JpQWdmVnh1ZlZ4dVhHNHZMeUJJUlV4UVJWSWdSbFZPUTFSSlQwNVRYRzR2THlBOVBUMDlQVDA5UFQwOVBUMDlQVDA5WEc1Y2JtWjFibU4wYVc5dUlITjBjbWx1WjNSeWFXMGdLSE4wY2lrZ2UxeHVJQ0JwWmlBb2MzUnlMblJ5YVcwcElISmxkSFZ5YmlCemRISXVkSEpwYlNncFhHNGdJSEpsZEhWeWJpQnpkSEl1Y21Wd2JHRmpaU2d2WGx4Y2N5dDhYRnh6S3lRdlp5d2dKeWNwWEc1OVhHNWNiblpoY2lCQ1VDQTlJRUoxWm1abGNpNXdjbTkwYjNSNWNHVmNibHh1THlvcVhHNGdLaUJCZFdkdFpXNTBJR0VnVldsdWREaEJjbkpoZVNBcWFXNXpkR0Z1WTJVcUlDaHViM1FnZEdobElGVnBiblE0UVhKeVlYa2dZMnhoYzNNaEtTQjNhWFJvSUVKMVptWmxjaUJ0WlhSb2IyUnpYRzRnS2k5Y2JrSjFabVpsY2k1ZllYVm5iV1Z1ZENBOUlHWjFibU4wYVc5dUlDaGhjbklwSUh0Y2JpQWdZWEp5TGw5cGMwSjFabVpsY2lBOUlIUnlkV1ZjYmx4dUlDQXZMeUJ6WVhabElISmxabVZ5Wlc1alpTQjBieUJ2Y21sbmFXNWhiQ0JWYVc1ME9FRnljbUY1SUdkbGRDOXpaWFFnYldWMGFHOWtjeUJpWldadmNtVWdiM1psY25keWFYUnBibWRjYmlBZ1lYSnlMbDluWlhRZ1BTQmhjbkl1WjJWMFhHNGdJR0Z5Y2k1ZmMyVjBJRDBnWVhKeUxuTmxkRnh1WEc0Z0lDOHZJR1JsY0hKbFkyRjBaV1FzSUhkcGJHd2dZbVVnY21WdGIzWmxaQ0JwYmlCdWIyUmxJREF1TVRNclhHNGdJR0Z5Y2k1blpYUWdQU0JDVUM1blpYUmNiaUFnWVhKeUxuTmxkQ0E5SUVKUUxuTmxkRnh1WEc0Z0lHRnljaTUzY21sMFpTQTlJRUpRTG5keWFYUmxYRzRnSUdGeWNpNTBiMU4wY21sdVp5QTlJRUpRTG5SdlUzUnlhVzVuWEc0Z0lHRnljaTUwYjB4dlkyRnNaVk4wY21sdVp5QTlJRUpRTG5SdlUzUnlhVzVuWEc0Z0lHRnljaTUwYjBwVFQwNGdQU0JDVUM1MGIwcFRUMDVjYmlBZ1lYSnlMbU52Y0hrZ1BTQkNVQzVqYjNCNVhHNGdJR0Z5Y2k1emJHbGpaU0E5SUVKUUxuTnNhV05sWEc0Z0lHRnljaTV5WldGa1ZVbHVkRGdnUFNCQ1VDNXlaV0ZrVlVsdWREaGNiaUFnWVhKeUxuSmxZV1JWU1c1ME1UWk1SU0E5SUVKUUxuSmxZV1JWU1c1ME1UWk1SVnh1SUNCaGNuSXVjbVZoWkZWSmJuUXhOa0pGSUQwZ1FsQXVjbVZoWkZWSmJuUXhOa0pGWEc0Z0lHRnljaTV5WldGa1ZVbHVkRE15VEVVZ1BTQkNVQzV5WldGa1ZVbHVkRE15VEVWY2JpQWdZWEp5TG5KbFlXUlZTVzUwTXpKQ1JTQTlJRUpRTG5KbFlXUlZTVzUwTXpKQ1JWeHVJQ0JoY25JdWNtVmhaRWx1ZERnZ1BTQkNVQzV5WldGa1NXNTBPRnh1SUNCaGNuSXVjbVZoWkVsdWRERTJURVVnUFNCQ1VDNXlaV0ZrU1c1ME1UWk1SVnh1SUNCaGNuSXVjbVZoWkVsdWRERTJRa1VnUFNCQ1VDNXlaV0ZrU1c1ME1UWkNSVnh1SUNCaGNuSXVjbVZoWkVsdWRETXlURVVnUFNCQ1VDNXlaV0ZrU1c1ME16Sk1SVnh1SUNCaGNuSXVjbVZoWkVsdWRETXlRa1VnUFNCQ1VDNXlaV0ZrU1c1ME16SkNSVnh1SUNCaGNuSXVjbVZoWkVac2IyRjBURVVnUFNCQ1VDNXlaV0ZrUm14dllYUk1SVnh1SUNCaGNuSXVjbVZoWkVac2IyRjBRa1VnUFNCQ1VDNXlaV0ZrUm14dllYUkNSVnh1SUNCaGNuSXVjbVZoWkVSdmRXSnNaVXhGSUQwZ1FsQXVjbVZoWkVSdmRXSnNaVXhGWEc0Z0lHRnljaTV5WldGa1JHOTFZbXhsUWtVZ1BTQkNVQzV5WldGa1JHOTFZbXhsUWtWY2JpQWdZWEp5TG5keWFYUmxWVWx1ZERnZ1BTQkNVQzUzY21sMFpWVkpiblE0WEc0Z0lHRnljaTUzY21sMFpWVkpiblF4Tmt4RklEMGdRbEF1ZDNKcGRHVlZTVzUwTVRaTVJWeHVJQ0JoY25JdWQzSnBkR1ZWU1c1ME1UWkNSU0E5SUVKUUxuZHlhWFJsVlVsdWRERTJRa1ZjYmlBZ1lYSnlMbmR5YVhSbFZVbHVkRE15VEVVZ1BTQkNVQzUzY21sMFpWVkpiblF6TWt4RlhHNGdJR0Z5Y2k1M2NtbDBaVlZKYm5Rek1rSkZJRDBnUWxBdWQzSnBkR1ZWU1c1ME16SkNSVnh1SUNCaGNuSXVkM0pwZEdWSmJuUTRJRDBnUWxBdWQzSnBkR1ZKYm5RNFhHNGdJR0Z5Y2k1M2NtbDBaVWx1ZERFMlRFVWdQU0JDVUM1M2NtbDBaVWx1ZERFMlRFVmNiaUFnWVhKeUxuZHlhWFJsU1c1ME1UWkNSU0E5SUVKUUxuZHlhWFJsU1c1ME1UWkNSVnh1SUNCaGNuSXVkM0pwZEdWSmJuUXpNa3hGSUQwZ1FsQXVkM0pwZEdWSmJuUXpNa3hGWEc0Z0lHRnljaTUzY21sMFpVbHVkRE15UWtVZ1BTQkNVQzUzY21sMFpVbHVkRE15UWtWY2JpQWdZWEp5TG5keWFYUmxSbXh2WVhSTVJTQTlJRUpRTG5keWFYUmxSbXh2WVhSTVJWeHVJQ0JoY25JdWQzSnBkR1ZHYkc5aGRFSkZJRDBnUWxBdWQzSnBkR1ZHYkc5aGRFSkZYRzRnSUdGeWNpNTNjbWwwWlVSdmRXSnNaVXhGSUQwZ1FsQXVkM0pwZEdWRWIzVmliR1ZNUlZ4dUlDQmhjbkl1ZDNKcGRHVkViM1ZpYkdWQ1JTQTlJRUpRTG5keWFYUmxSRzkxWW14bFFrVmNiaUFnWVhKeUxtWnBiR3dnUFNCQ1VDNW1hV3hzWEc0Z0lHRnljaTVwYm5Od1pXTjBJRDBnUWxBdWFXNXpjR1ZqZEZ4dUlDQmhjbkl1ZEc5QmNuSmhlVUoxWm1abGNpQTlJRUpRTG5SdlFYSnlZWGxDZFdabVpYSmNibHh1SUNCeVpYUjFjbTRnWVhKeVhHNTlYRzVjYmk4dklITnNhV05sS0hOMFlYSjBMQ0JsYm1RcFhHNW1kVzVqZEdsdmJpQmpiR0Z0Y0NBb2FXNWtaWGdzSUd4bGJpd2daR1ZtWVhWc2RGWmhiSFZsS1NCN1hHNGdJR2xtSUNoMGVYQmxiMllnYVc1a1pYZ2dJVDA5SUNkdWRXMWlaWEluS1NCeVpYUjFjbTRnWkdWbVlYVnNkRlpoYkhWbFhHNGdJR2x1WkdWNElEMGdmbjVwYm1SbGVEc2dJQzh2SUVOdlpYSmpaU0IwYnlCcGJuUmxaMlZ5TGx4dUlDQnBaaUFvYVc1a1pYZ2dQajBnYkdWdUtTQnlaWFIxY200Z2JHVnVYRzRnSUdsbUlDaHBibVJsZUNBK1BTQXdLU0J5WlhSMWNtNGdhVzVrWlhoY2JpQWdhVzVrWlhnZ0t6MGdiR1Z1WEc0Z0lHbG1JQ2hwYm1SbGVDQStQU0F3S1NCeVpYUjFjbTRnYVc1a1pYaGNiaUFnY21WMGRYSnVJREJjYm4xY2JseHVablZ1WTNScGIyNGdZMjlsY21ObElDaHNaVzVuZEdncElIdGNiaUFnTHk4Z1EyOWxjbU5sSUd4bGJtZDBhQ0IwYnlCaElHNTFiV0psY2lBb2NHOXpjMmxpYkhrZ1RtRk9LU3dnY205MWJtUWdkWEJjYmlBZ0x5OGdhVzRnWTJGelpTQnBkQ2R6SUdaeVlXTjBhVzl1WVd3Z0tHVXVaeTRnTVRJekxqUTFOaWtnZEdobGJpQmtieUJoWEc0Z0lDOHZJR1J2ZFdKc1pTQnVaV2RoZEdVZ2RHOGdZMjlsY21ObElHRWdUbUZPSUhSdklEQXVJRVZoYzNrc0lISnBaMmgwUDF4dUlDQnNaVzVuZEdnZ1BTQitmazFoZEdndVkyVnBiQ2dyYkdWdVozUm9LVnh1SUNCeVpYUjFjbTRnYkdWdVozUm9JRHdnTUNBL0lEQWdPaUJzWlc1bmRHaGNibjFjYmx4dVpuVnVZM1JwYjI0Z2FYTkJjbkpoZVNBb2MzVmlhbVZqZENrZ2UxeHVJQ0J5WlhSMWNtNGdLRUZ5Y21GNUxtbHpRWEp5WVhrZ2ZId2dablZ1WTNScGIyNGdLSE4xWW1wbFkzUXBJSHRjYmlBZ0lDQnlaWFIxY200Z1QySnFaV04wTG5CeWIzUnZkSGx3WlM1MGIxTjBjbWx1Wnk1allXeHNLSE4xWW1wbFkzUXBJRDA5UFNBblcyOWlhbVZqZENCQmNuSmhlVjBuWEc0Z0lIMHBLSE4xWW1wbFkzUXBYRzU5WEc1Y2JtWjFibU4wYVc5dUlHbHpRWEp5WVhscGMyZ2dLSE4xWW1wbFkzUXBJSHRjYmlBZ2NtVjBkWEp1SUdselFYSnlZWGtvYzNWaWFtVmpkQ2tnZkh3Z1FuVm1abVZ5TG1selFuVm1abVZ5S0hOMVltcGxZM1FwSUh4OFhHNGdJQ0FnSUNCemRXSnFaV04wSUNZbUlIUjVjR1Z2WmlCemRXSnFaV04wSUQwOVBTQW5iMkpxWldOMEp5QW1KbHh1SUNBZ0lDQWdkSGx3Wlc5bUlITjFZbXBsWTNRdWJHVnVaM1JvSUQwOVBTQW5iblZ0WW1WeUoxeHVmVnh1WEc1bWRXNWpkR2x2YmlCMGIwaGxlQ0FvYmlrZ2UxeHVJQ0JwWmlBb2JpQThJREUyS1NCeVpYUjFjbTRnSnpBbklDc2diaTUwYjFOMGNtbHVaeWd4TmlsY2JpQWdjbVYwZFhKdUlHNHVkRzlUZEhKcGJtY29NVFlwWEc1OVhHNWNibVoxYm1OMGFXOXVJSFYwWmpoVWIwSjVkR1Z6SUNoemRISXBJSHRjYmlBZ2RtRnlJR0o1ZEdWQmNuSmhlU0E5SUZ0ZFhHNGdJR1p2Y2lBb2RtRnlJR2tnUFNBd095QnBJRHdnYzNSeUxteGxibWQwYURzZ2FTc3JLU0I3WEc0Z0lDQWdkbUZ5SUdJZ1BTQnpkSEl1WTJoaGNrTnZaR1ZCZENocEtWeHVJQ0FnSUdsbUlDaGlJRHc5SURCNE4wWXBYRzRnSUNBZ0lDQmllWFJsUVhKeVlYa3VjSFZ6YUNoemRISXVZMmhoY2tOdlpHVkJkQ2hwS1NsY2JpQWdJQ0JsYkhObElIdGNiaUFnSUNBZ0lIWmhjaUJ6ZEdGeWRDQTlJR2xjYmlBZ0lDQWdJR2xtSUNoaUlENDlJREI0UkRnd01DQW1KaUJpSUR3OUlEQjRSRVpHUmlrZ2FTc3JYRzRnSUNBZ0lDQjJZWElnYUNBOUlHVnVZMjlrWlZWU1NVTnZiWEJ2Ym1WdWRDaHpkSEl1YzJ4cFkyVW9jM1JoY25Rc0lHa3JNU2twTG5OMVluTjBjaWd4S1M1emNHeHBkQ2duSlNjcFhHNGdJQ0FnSUNCbWIzSWdLSFpoY2lCcUlEMGdNRHNnYWlBOElHZ3ViR1Z1WjNSb095QnFLeXNwWEc0Z0lDQWdJQ0FnSUdKNWRHVkJjbkpoZVM1d2RYTm9LSEJoY25ObFNXNTBLR2hiYWwwc0lERTJLU2xjYmlBZ0lDQjlYRzRnSUgxY2JpQWdjbVYwZFhKdUlHSjVkR1ZCY25KaGVWeHVmVnh1WEc1bWRXNWpkR2x2YmlCaGMyTnBhVlJ2UW5sMFpYTWdLSE4wY2lrZ2UxeHVJQ0IyWVhJZ1lubDBaVUZ5Y21GNUlEMGdXMTFjYmlBZ1ptOXlJQ2gyWVhJZ2FTQTlJREE3SUdrZ1BDQnpkSEl1YkdWdVozUm9PeUJwS3lzcElIdGNiaUFnSUNBdkx5Qk9iMlJsSjNNZ1kyOWtaU0J6WldWdGN5QjBieUJpWlNCa2IybHVaeUIwYUdseklHRnVaQ0J1YjNRZ0ppQXdlRGRHTGk1Y2JpQWdJQ0JpZVhSbFFYSnlZWGt1Y0hWemFDaHpkSEl1WTJoaGNrTnZaR1ZCZENocEtTQW1JREI0UmtZcFhHNGdJSDFjYmlBZ2NtVjBkWEp1SUdKNWRHVkJjbkpoZVZ4dWZWeHVYRzVtZFc1amRHbHZiaUIxZEdZeE5teGxWRzlDZVhSbGN5QW9jM1J5S1NCN1hHNGdJSFpoY2lCakxDQm9hU3dnYkc5Y2JpQWdkbUZ5SUdKNWRHVkJjbkpoZVNBOUlGdGRYRzRnSUdadmNpQW9kbUZ5SUdrZ1BTQXdPeUJwSUR3Z2MzUnlMbXhsYm1kMGFEc2dhU3NyS1NCN1hHNGdJQ0FnWXlBOUlITjBjaTVqYUdGeVEyOWtaVUYwS0drcFhHNGdJQ0FnYUdrZ1BTQmpJRDQrSURoY2JpQWdJQ0JzYnlBOUlHTWdKU0F5TlRaY2JpQWdJQ0JpZVhSbFFYSnlZWGt1Y0hWemFDaHNieWxjYmlBZ0lDQmllWFJsUVhKeVlYa3VjSFZ6YUNob2FTbGNiaUFnZlZ4dVhHNGdJSEpsZEhWeWJpQmllWFJsUVhKeVlYbGNibjFjYmx4dVpuVnVZM1JwYjI0Z1ltRnpaVFkwVkc5Q2VYUmxjeUFvYzNSeUtTQjdYRzRnSUhKbGRIVnliaUJpWVhObE5qUXVkRzlDZVhSbFFYSnlZWGtvYzNSeUtWeHVmVnh1WEc1bWRXNWpkR2x2YmlCaWJHbDBRblZtWm1WeUlDaHpjbU1zSUdSemRDd2diMlptYzJWMExDQnNaVzVuZEdncElIdGNiaUFnZG1GeUlIQnZjMXh1SUNCbWIzSWdLSFpoY2lCcElEMGdNRHNnYVNBOElHeGxibWQwYURzZ2FTc3JLU0I3WEc0Z0lDQWdhV1lnS0NocElDc2diMlptYzJWMElENDlJR1J6ZEM1c1pXNW5kR2dwSUh4OElDaHBJRDQ5SUhOeVl5NXNaVzVuZEdncEtWeHVJQ0FnSUNBZ1luSmxZV3RjYmlBZ0lDQmtjM1JiYVNBcklHOW1abk5sZEYwZ1BTQnpjbU5iYVYxY2JpQWdmVnh1SUNCeVpYUjFjbTRnYVZ4dWZWeHVYRzVtZFc1amRHbHZiaUJrWldOdlpHVlZkR1k0UTJoaGNpQW9jM1J5S1NCN1hHNGdJSFJ5ZVNCN1hHNGdJQ0FnY21WMGRYSnVJR1JsWTI5a1pWVlNTVU52YlhCdmJtVnVkQ2h6ZEhJcFhHNGdJSDBnWTJGMFkyZ2dLR1Z5Y2lrZ2UxeHVJQ0FnSUhKbGRIVnliaUJUZEhKcGJtY3Vabkp2YlVOb1lYSkRiMlJsS0RCNFJrWkdSQ2tnTHk4Z1ZWUkdJRGdnYVc1MllXeHBaQ0JqYUdGeVhHNGdJSDFjYm4xY2JseHVMeXBjYmlBcUlGZGxJR2hoZG1VZ2RHOGdiV0ZyWlNCemRYSmxJSFJvWVhRZ2RHaGxJSFpoYkhWbElHbHpJR0VnZG1Gc2FXUWdhVzUwWldkbGNpNGdWR2hwY3lCdFpXRnVjeUIwYUdGMElHbDBYRzRnS2lCcGN5QnViMjR0Ym1WbllYUnBkbVV1SUVsMElHaGhjeUJ1YnlCbWNtRmpkR2x2Ym1Gc0lHTnZiWEJ2Ym1WdWRDQmhibVFnZEdoaGRDQnBkQ0JrYjJWeklHNXZkRnh1SUNvZ1pYaGpaV1ZrSUhSb1pTQnRZWGhwYlhWdElHRnNiRzkzWldRZ2RtRnNkV1V1WEc0Z0tpOWNibVoxYm1OMGFXOXVJSFpsY21sbWRXbHVkQ0FvZG1Gc2RXVXNJRzFoZUNrZ2UxeHVJQ0JoYzNObGNuUW9kSGx3Wlc5bUlIWmhiSFZsSUQwOVBTQW5iblZ0WW1WeUp5d2dKMk5oYm01dmRDQjNjbWwwWlNCaElHNXZiaTF1ZFcxaVpYSWdZWE1nWVNCdWRXMWlaWEluS1Z4dUlDQmhjM05sY25Rb2RtRnNkV1VnUGowZ01Dd2dKM053WldOcFptbGxaQ0JoSUc1bFoyRjBhWFpsSUhaaGJIVmxJR1p2Y2lCM2NtbDBhVzVuSUdGdUlIVnVjMmxuYm1Wa0lIWmhiSFZsSnlsY2JpQWdZWE56WlhKMEtIWmhiSFZsSUR3OUlHMWhlQ3dnSjNaaGJIVmxJR2x6SUd4aGNtZGxjaUIwYUdGdUlHMWhlR2x0ZFcwZ2RtRnNkV1VnWm05eUlIUjVjR1VuS1Z4dUlDQmhjM05sY25Rb1RXRjBhQzVtYkc5dmNpaDJZV3gxWlNrZ1BUMDlJSFpoYkhWbExDQW5kbUZzZFdVZ2FHRnpJR0VnWm5KaFkzUnBiMjVoYkNCamIyMXdiMjVsYm5RbktWeHVmVnh1WEc1bWRXNWpkR2x2YmlCMlpYSnBabk5wYm5RZ0tIWmhiSFZsTENCdFlYZ3NJRzFwYmlrZ2UxeHVJQ0JoYzNObGNuUW9kSGx3Wlc5bUlIWmhiSFZsSUQwOVBTQW5iblZ0WW1WeUp5d2dKMk5oYm01dmRDQjNjbWwwWlNCaElHNXZiaTF1ZFcxaVpYSWdZWE1nWVNCdWRXMWlaWEluS1Z4dUlDQmhjM05sY25Rb2RtRnNkV1VnUEQwZ2JXRjRMQ0FuZG1Gc2RXVWdiR0Z5WjJWeUlIUm9ZVzRnYldGNGFXMTFiU0JoYkd4dmQyVmtJSFpoYkhWbEp5bGNiaUFnWVhOelpYSjBLSFpoYkhWbElENDlJRzFwYml3Z0ozWmhiSFZsSUhOdFlXeHNaWElnZEdoaGJpQnRhVzVwYlhWdElHRnNiRzkzWldRZ2RtRnNkV1VuS1Z4dUlDQmhjM05sY25Rb1RXRjBhQzVtYkc5dmNpaDJZV3gxWlNrZ1BUMDlJSFpoYkhWbExDQW5kbUZzZFdVZ2FHRnpJR0VnWm5KaFkzUnBiMjVoYkNCamIyMXdiMjVsYm5RbktWeHVmVnh1WEc1bWRXNWpkR2x2YmlCMlpYSnBaa2xGUlVVM05UUWdLSFpoYkhWbExDQnRZWGdzSUcxcGJpa2dlMXh1SUNCaGMzTmxjblFvZEhsd1pXOW1JSFpoYkhWbElEMDlQU0FuYm5WdFltVnlKeXdnSjJOaGJtNXZkQ0IzY21sMFpTQmhJRzV2YmkxdWRXMWlaWElnWVhNZ1lTQnVkVzFpWlhJbktWeHVJQ0JoYzNObGNuUW9kbUZzZFdVZ1BEMGdiV0Y0TENBbmRtRnNkV1VnYkdGeVoyVnlJSFJvWVc0Z2JXRjRhVzExYlNCaGJHeHZkMlZrSUhaaGJIVmxKeWxjYmlBZ1lYTnpaWEowS0haaGJIVmxJRDQ5SUcxcGJpd2dKM1poYkhWbElITnRZV3hzWlhJZ2RHaGhiaUJ0YVc1cGJYVnRJR0ZzYkc5M1pXUWdkbUZzZFdVbktWeHVmVnh1WEc1bWRXNWpkR2x2YmlCaGMzTmxjblFnS0hSbGMzUXNJRzFsYzNOaFoyVXBJSHRjYmlBZ2FXWWdLQ0YwWlhOMEtTQjBhSEp2ZHlCdVpYY2dSWEp5YjNJb2JXVnpjMkZuWlNCOGZDQW5SbUZwYkdWa0lHRnpjMlZ5ZEdsdmJpY3BYRzU5WEc0aVhYMD1cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXGJ1ZmZlclxcXFxpbmRleC5qc1wiLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxidWZmZXJcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG5cInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG07XG4gIHZhciBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxO1xuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMTtcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxO1xuICB2YXIgbkJpdHMgPSAtNztcbiAgdmFyIGkgPSBpc0xFID8gbkJ5dGVzIC0gMSA6IDA7XG4gIHZhciBkID0gaXNMRSA/IC0xIDogMTtcbiAgdmFyIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV07XG5cbiAgaSArPSBkO1xuXG4gIGUgPSBzICYgKDEgPDwgLW5CaXRzKSAtIDE7XG4gIHMgPj49IC1uQml0cztcbiAgbkJpdHMgKz0gZUxlbjtcbiAgZm9yICg7IG5CaXRzID4gMDsgZSA9IGUgKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBtID0gZSAmICgxIDw8IC1uQml0cykgLSAxO1xuICBlID4+PSAtbkJpdHM7XG4gIG5CaXRzICs9IG1MZW47XG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSBtICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgaWYgKGUgPT09IDApIHtcbiAgICBlID0gMSAtIGVCaWFzO1xuICB9IGVsc2UgaWYgKGUgPT09IGVNYXgpIHtcbiAgICByZXR1cm4gbSA/IE5hTiA6IChzID8gLTEgOiAxKSAqIEluZmluaXR5O1xuICB9IGVsc2Uge1xuICAgIG0gPSBtICsgTWF0aC5wb3coMiwgbUxlbik7XG4gICAgZSA9IGUgLSBlQmlhcztcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKTtcbn07XG5cbmV4cG9ydHMud3JpdGUgPSBmdW5jdGlvbiAoYnVmZmVyLCB2YWx1ZSwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG0sIGM7XG4gIHZhciBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxO1xuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMTtcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxO1xuICB2YXIgcnQgPSBtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMDtcbiAgdmFyIGkgPSBpc0xFID8gMCA6IG5CeXRlcyAtIDE7XG4gIHZhciBkID0gaXNMRSA/IDEgOiAtMTtcbiAgdmFyIHMgPSB2YWx1ZSA8IDAgfHwgdmFsdWUgPT09IDAgJiYgMSAvIHZhbHVlIDwgMCA/IDEgOiAwO1xuXG4gIHZhbHVlID0gTWF0aC5hYnModmFsdWUpO1xuXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgbSA9IGlzTmFOKHZhbHVlKSA/IDEgOiAwO1xuICAgIGUgPSBlTWF4O1xuICB9IGVsc2Uge1xuICAgIGUgPSBNYXRoLmZsb29yKE1hdGgubG9nKHZhbHVlKSAvIE1hdGguTE4yKTtcbiAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XG4gICAgICBlLS07XG4gICAgICBjICo9IDI7XG4gICAgfVxuICAgIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgdmFsdWUgKz0gcnQgLyBjO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcyk7XG4gICAgfVxuICAgIGlmICh2YWx1ZSAqIGMgPj0gMikge1xuICAgICAgZSsrO1xuICAgICAgYyAvPSAyO1xuICAgIH1cblxuICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xuICAgICAgbSA9IDA7XG4gICAgICBlID0gZU1heDtcbiAgICB9IGVsc2UgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICBtID0gKHZhbHVlICogYyAtIDEpICogTWF0aC5wb3coMiwgbUxlbik7XG4gICAgICBlID0gZSArIGVCaWFzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gdmFsdWUgKiBNYXRoLnBvdygyLCBlQmlhcyAtIDEpICogTWF0aC5wb3coMiwgbUxlbik7XG4gICAgICBlID0gMDtcbiAgICB9XG4gIH1cblxuICBmb3IgKDsgbUxlbiA+PSA4OyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBtICYgMHhmZiwgaSArPSBkLCBtIC89IDI1NiwgbUxlbiAtPSA4KSB7fVxuXG4gIGUgPSBlIDw8IG1MZW4gfCBtO1xuICBlTGVuICs9IG1MZW47XG4gIGZvciAoOyBlTGVuID4gMDsgYnVmZmVyW29mZnNldCArIGldID0gZSAmIDB4ZmYsIGkgKz0gZCwgZSAvPSAyNTYsIGVMZW4gLT0gOCkge31cblxuICBidWZmZXJbb2Zmc2V0ICsgaSAtIGRdIHw9IHMgKiAxMjg7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW1sdVpHVjRMbXB6SWwwc0ltNWhiV1Z6SWpwYkltVjRjRzl5ZEhNaUxDSnlaV0ZrSWl3aVluVm1abVZ5SWl3aWIyWm1jMlYwSWl3aWFYTk1SU0lzSW0xTVpXNGlMQ0p1UW5sMFpYTWlMQ0psSWl3aWJTSXNJbVZNWlc0aUxDSmxUV0Y0SWl3aVpVSnBZWE1pTENKdVFtbDBjeUlzSW1raUxDSmtJaXdpY3lJc0lrNWhUaUlzSWtsdVptbHVhWFI1SWl3aVRXRjBhQ0lzSW5CdmR5SXNJbmR5YVhSbElpd2lkbUZzZFdVaUxDSmpJaXdpY25RaUxDSmhZbk1pTENKcGMwNWhUaUlzSW1ac2IyOXlJaXdpYkc5bklpd2lURTR5SWwwc0ltMWhjSEJwYm1keklqb2lPenRCUVVGQlFTeFJRVUZSUXl4SlFVRlNMRWRCUVdVc1ZVRkJWVU1zVFVGQlZpeEZRVUZyUWtNc1RVRkJiRUlzUlVGQk1FSkRMRWxCUVRGQ0xFVkJRV2REUXl4SlFVRm9ReXhGUVVGelEwTXNUVUZCZEVNc1JVRkJPRU03UVVGRE0wUXNUVUZCU1VNc1EwRkJTaXhGUVVGUFF5eERRVUZRTzBGQlEwRXNUVUZCU1VNc1QwRkJUMGdzVTBGQlV5eERRVUZVTEVkQlFXRkVMRWxCUVdJc1IwRkJiMElzUTBGQkwwSTdRVUZEUVN4TlFVRkpTeXhQUVVGUExFTkJRVU1zUzBGQlMwUXNTVUZCVGl4SlFVRmpMRU5CUVhwQ08wRkJRMEVzVFVGQlNVVXNVVUZCVVVRc1VVRkJVU3hEUVVGd1FqdEJRVU5CTEUxQlFVbEZMRkZCUVZFc1EwRkJReXhEUVVGaU8wRkJRMEVzVFVGQlNVTXNTVUZCU1ZRc1QwRkJVVVVzVTBGQlV5eERRVUZxUWl4SFFVRnpRaXhEUVVFNVFqdEJRVU5CTEUxQlFVbFJMRWxCUVVsV0xFOUJRVThzUTBGQlF5eERRVUZTTEVkQlFWa3NRMEZCY0VJN1FVRkRRU3hOUVVGSlZ5eEpRVUZKWWl4UFFVRlBReXhUUVVGVFZTeERRVUZvUWl4RFFVRlNPenRCUVVWQlFTeFBRVUZMUXl4RFFVRk1PenRCUVVWQlVDeE5RVUZKVVN4SlFVRkxMRU5CUVVNc1MwRkJUU3hEUVVGRFNDeExRVUZTTEVsQlFXdENMRU5CUVROQ08wRkJRMEZITEZGQlFVOHNRMEZCUTBnc1MwRkJVanRCUVVOQlFTeFhRVUZUU0N4SlFVRlVPMEZCUTBFc1UwRkJUMGNzVVVGQlVTeERRVUZtTEVWQlFXdENUQ3hKUVVGSlFTeEpRVUZKTEVkQlFVb3NSMEZCVlV3c1QwRkJUME1zVTBGQlUxVXNRMEZCYUVJc1EwRkJaQ3hGUVVGclEwRXNTMEZCUzBNc1EwRkJka01zUlVGQk1FTkdMRk5CUVZNc1EwRkJja1VzUlVGQmQwVXNRMEZCUlRzN1FVRkZNVVZLTEUxQlFVbEVMRWxCUVVzc1EwRkJReXhMUVVGTkxFTkJRVU5MTEV0QlFWSXNTVUZCYTBJc1EwRkJNMEk3UVVGRFFVd3NVVUZCVHl4RFFVRkRTeXhMUVVGU08wRkJRMEZCTEZkQlFWTlFMRWxCUVZRN1FVRkRRU3hUUVVGUFR5eFJRVUZSTEVOQlFXWXNSVUZCYTBKS0xFbEJRVWxCTEVsQlFVa3NSMEZCU2l4SFFVRlZUaXhQUVVGUFF5eFRRVUZUVlN4RFFVRm9RaXhEUVVGa0xFVkJRV3REUVN4TFFVRkxReXhEUVVGMlF5eEZRVUV3UTBZc1UwRkJVeXhEUVVGeVJTeEZRVUYzUlN4RFFVRkZPenRCUVVVeFJTeE5RVUZKVEN4TlFVRk5MRU5CUVZZc1JVRkJZVHRCUVVOWVFTeFJRVUZKTEVsQlFVbEpMRXRCUVZJN1FVRkRSQ3hIUVVaRUxFMUJSVThzU1VGQlNVb3NUVUZCVFVjc1NVRkJWaXhGUVVGblFqdEJRVU55UWl4WFFVRlBSaXhKUVVGSlVTeEhRVUZLTEVkQlFWY3NRMEZCUTBRc1NVRkJTU3hEUVVGRExFTkJRVXdzUjBGQlV5eERRVUZXTEVsQlFXVkZMRkZCUVdwRE8wRkJRMFFzUjBGR1RTeE5RVVZCTzBGQlEweFVMRkZCUVVsQkxFbEJRVWxWTEV0QlFVdERMRWRCUVV3c1EwRkJVeXhEUVVGVUxFVkJRVmxrTEVsQlFWb3NRMEZCVWp0QlFVTkJSU3hSUVVGSlFTeEpRVUZKU1N4TFFVRlNPMEZCUTBRN1FVRkRSQ3hUUVVGUExFTkJRVU5KTEVsQlFVa3NRMEZCUXl4RFFVRk1MRWRCUVZNc1EwRkJWaXhKUVVGbFVDeERRVUZtTEVkQlFXMUNWU3hMUVVGTFF5eEhRVUZNTEVOQlFWTXNRMEZCVkN4RlFVRlpXaXhKUVVGSlJpeEpRVUZvUWl4RFFVRXhRanRCUVVORUxFTkJMMEpFT3p0QlFXbERRVXdzVVVGQlVXOUNMRXRCUVZJc1IwRkJaMElzVlVGQlZXeENMRTFCUVZZc1JVRkJhMEp0UWl4TFFVRnNRaXhGUVVGNVFteENMRTFCUVhwQ0xFVkJRV2xEUXl4SlFVRnFReXhGUVVGMVEwTXNTVUZCZGtNc1JVRkJOa05ETEUxQlFUZERMRVZCUVhGRU8wRkJRMjVGTEUxQlFVbERMRU5CUVVvc1JVRkJUME1zUTBGQlVDeEZRVUZWWXl4RFFVRldPMEZCUTBFc1RVRkJTV0lzVDBGQlQwZ3NVMEZCVXl4RFFVRlVMRWRCUVdGRUxFbEJRV0lzUjBGQmIwSXNRMEZCTDBJN1FVRkRRU3hOUVVGSlN5eFBRVUZQTEVOQlFVTXNTMEZCUzBRc1NVRkJUaXhKUVVGakxFTkJRWHBDTzBGQlEwRXNUVUZCU1VVc1VVRkJVVVFzVVVGQlVTeERRVUZ3UWp0QlFVTkJMRTFCUVVsaExFdEJRVTFzUWl4VFFVRlRMRVZCUVZRc1IwRkJZMkVzUzBGQlMwTXNSMEZCVEN4RFFVRlRMRU5CUVZRc1JVRkJXU3hEUVVGRExFVkJRV0lzU1VGQmJVSkVMRXRCUVV0RExFZEJRVXdzUTBGQlV5eERRVUZVTEVWQlFWa3NRMEZCUXl4RlFVRmlMRU5CUVdwRExFZEJRVzlFTEVOQlFUbEVPMEZCUTBFc1RVRkJTVTRzU1VGQlNWUXNUMEZCVHl4RFFVRlFMRWRCUVZsRkxGTkJRVk1zUTBGQk4wSTdRVUZEUVN4TlFVRkpVU3hKUVVGSlZpeFBRVUZQTEVOQlFWQXNSMEZCVnl4RFFVRkRMRU5CUVhCQ08wRkJRMEVzVFVGQlNWY3NTVUZCU1Uwc1VVRkJVU3hEUVVGU0xFbEJRV05CTEZWQlFWVXNRMEZCVml4SlFVRmxMRWxCUVVsQkxFdEJRVW9zUjBGQldTeERRVUY2UXl4SFFVRTRReXhEUVVFNVF5eEhRVUZyUkN4RFFVRXhSRHM3UVVGRlFVRXNWVUZCVVVnc1MwRkJTMDBzUjBGQlRDeERRVUZUU0N4TFFVRlVMRU5CUVZJN08wRkJSVUVzVFVGQlNVa3NUVUZCVFVvc1MwRkJUaXhMUVVGblFrRXNWVUZCVlVvc1VVRkJPVUlzUlVGQmQwTTdRVUZEZEVOVUxGRkJRVWxwUWl4TlFVRk5TaXhMUVVGT0xFbEJRV1VzUTBGQlppeEhRVUZ0UWl4RFFVRjJRanRCUVVOQlpDeFJRVUZKUnl4SlFVRktPMEZCUTBRc1IwRklSQ3hOUVVkUE8wRkJRMHhJTEZGQlFVbFhMRXRCUVV0UkxFdEJRVXdzUTBGQlYxSXNTMEZCUzFNc1IwRkJUQ3hEUVVGVFRpeExRVUZVTEVsQlFXdENTQ3hMUVVGTFZTeEhRVUZzUXl4RFFVRktPMEZCUTBFc1VVRkJTVkFzVTBGQlUwTXNTVUZCU1Vvc1MwRkJTME1zUjBGQlRDeERRVUZUTEVOQlFWUXNSVUZCV1N4RFFVRkRXaXhEUVVGaUxFTkJRV0lzU1VGQlowTXNRMEZCY0VNc1JVRkJkVU03UVVGRGNrTkJPMEZCUTBGbExGZEJRVXNzUTBGQlREdEJRVU5FTzBGQlEwUXNVVUZCU1dZc1NVRkJTVWtzUzBGQlNpeEpRVUZoTEVOQlFXcENMRVZCUVc5Q08wRkJRMnhDVlN4bFFVRlRSU3hMUVVGTFJDeERRVUZrTzBGQlEwUXNTMEZHUkN4TlFVVlBPMEZCUTB4RUxHVkJRVk5GTEV0QlFVdE1MRXRCUVV0RExFZEJRVXdzUTBGQlV5eERRVUZVTEVWQlFWa3NTVUZCU1ZJc1MwRkJhRUlzUTBGQlpEdEJRVU5FTzBGQlEwUXNVVUZCU1ZVc1VVRkJVVU1zUTBGQlVpeEpRVUZoTEVOQlFXcENMRVZCUVc5Q08wRkJRMnhDWmp0QlFVTkJaU3hYUVVGTExFTkJRVXc3UVVGRFJEczdRVUZGUkN4UlFVRkpaaXhKUVVGSlNTeExRVUZLTEVsQlFXRkVMRWxCUVdwQ0xFVkJRWFZDTzBGQlEzSkNSaXhWUVVGSkxFTkJRVW83UVVGRFFVUXNWVUZCU1Vjc1NVRkJTanRCUVVORUxFdEJTRVFzVFVGSFR5eEpRVUZKU0N4SlFVRkpTU3hMUVVGS0xFbEJRV0VzUTBGQmFrSXNSVUZCYjBJN1FVRkRla0pJTEZWQlFVa3NRMEZCUTJFc1VVRkJVVU1zUTBGQlVpeEhRVUZaTEVOQlFXSXNTVUZCYTBKS0xFdEJRVXRETEVkQlFVd3NRMEZCVXl4RFFVRlVMRVZCUVZsa0xFbEJRVm9zUTBGQmRFSTdRVUZEUVVVc1ZVRkJTVUVzU1VGQlNVa3NTMEZCVWp0QlFVTkVMRXRCU0Uwc1RVRkhRVHRCUVVOTVNDeFZRVUZKWVN4UlFVRlJTQ3hMUVVGTFF5eEhRVUZNTEVOQlFWTXNRMEZCVkN4RlFVRlpVaXhSUVVGUkxFTkJRWEJDTEVOQlFWSXNSMEZCYVVOUExFdEJRVXRETEVkQlFVd3NRMEZCVXl4RFFVRlVMRVZCUVZsa0xFbEJRVm9zUTBGQmNrTTdRVUZEUVVVc1ZVRkJTU3hEUVVGS08wRkJRMFE3UVVGRFJqczdRVUZGUkN4VFFVRlBSaXhSUVVGUkxFTkJRV1lzUlVGQmEwSklMRTlCUVU5RExGTkJRVk5WTEVOQlFXaENMRWxCUVhGQ1RDeEpRVUZKTEVsQlFYcENMRVZCUVN0Q1N5eExRVUZMUXl4RFFVRndReXhGUVVGMVEwNHNTMEZCU3l4SFFVRTFReXhGUVVGcFJFZ3NVVUZCVVN4RFFVRXpSU3hGUVVFNFJTeERRVUZGT3p0QlFVVm9Sa1VzVFVGQlMwRXNTMEZCUzBZc1NVRkJUaXhIUVVGalJ5eERRVUZzUWp0QlFVTkJReXhWUVVGUlNpeEpRVUZTTzBGQlEwRXNVMEZCVDBrc1QwRkJUeXhEUVVGa0xFVkJRV2xDVUN4UFFVRlBReXhUUVVGVFZTeERRVUZvUWl4SlFVRnhRazRzU1VGQlNTeEpRVUY2UWl4RlFVRXJRazBzUzBGQlMwTXNRMEZCY0VNc1JVRkJkVU5RTEV0QlFVc3NSMEZCTlVNc1JVRkJhVVJGTEZGQlFWRXNRMEZCTVVVc1JVRkJOa1VzUTBGQlJUczdRVUZGTDBWUUxGTkJRVTlETEZOQlFWTlZMRU5CUVZRc1IwRkJZVU1zUTBGQmNFSXNTMEZCTUVKRExFbEJRVWtzUjBGQk9VSTdRVUZEUkN4RFFXeEVSQ0lzSW1acGJHVWlPaUpwYm1SbGVDNXFjeUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSW1WNGNHOXlkSE11Y21WaFpDQTlJR1oxYm1OMGFXOXVJQ2hpZFdabVpYSXNJRzltWm5ObGRDd2dhWE5NUlN3Z2JVeGxiaXdnYmtKNWRHVnpLU0I3WEc0Z0lIWmhjaUJsTENCdFhHNGdJSFpoY2lCbFRHVnVJRDBnYmtKNWRHVnpJQ29nT0NBdElHMU1aVzRnTFNBeFhHNGdJSFpoY2lCbFRXRjRJRDBnS0RFZ1BEd2daVXhsYmlrZ0xTQXhYRzRnSUhaaGNpQmxRbWxoY3lBOUlHVk5ZWGdnUGo0Z01WeHVJQ0IyWVhJZ2JrSnBkSE1nUFNBdE4xeHVJQ0IyWVhJZ2FTQTlJR2x6VEVVZ1B5QW9ia0o1ZEdWeklDMGdNU2tnT2lBd1hHNGdJSFpoY2lCa0lEMGdhWE5NUlNBL0lDMHhJRG9nTVZ4dUlDQjJZWElnY3lBOUlHSjFabVpsY2x0dlptWnpaWFFnS3lCcFhWeHVYRzRnSUdrZ0t6MGdaRnh1WEc0Z0lHVWdQU0J6SUNZZ0tDZ3hJRHc4SUNndGJrSnBkSE1wS1NBdElERXBYRzRnSUhNZ1BqNDlJQ2d0YmtKcGRITXBYRzRnSUc1Q2FYUnpJQ3M5SUdWTVpXNWNiaUFnWm05eUlDZzdJRzVDYVhSeklENGdNRHNnWlNBOUlHVWdLaUF5TlRZZ0t5QmlkV1ptWlhKYmIyWm1jMlYwSUNzZ2FWMHNJR2tnS3owZ1pDd2dia0pwZEhNZ0xUMGdPQ2tnZTMxY2JseHVJQ0J0SUQwZ1pTQW1JQ2dvTVNBOFBDQW9MVzVDYVhSektTa2dMU0F4S1Z4dUlDQmxJRDQrUFNBb0xXNUNhWFJ6S1Z4dUlDQnVRbWwwY3lBclBTQnRUR1Z1WEc0Z0lHWnZjaUFvT3lCdVFtbDBjeUErSURBN0lHMGdQU0J0SUNvZ01qVTJJQ3NnWW5WbVptVnlXMjltWm5ObGRDQXJJR2xkTENCcElDczlJR1FzSUc1Q2FYUnpJQzA5SURncElIdDlYRzVjYmlBZ2FXWWdLR1VnUFQwOUlEQXBJSHRjYmlBZ0lDQmxJRDBnTVNBdElHVkNhV0Z6WEc0Z0lIMGdaV3h6WlNCcFppQW9aU0E5UFQwZ1pVMWhlQ2tnZTF4dUlDQWdJSEpsZEhWeWJpQnRJRDhnVG1GT0lEb2dLQ2h6SUQ4Z0xURWdPaUF4S1NBcUlFbHVabWx1YVhSNUtWeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lHMGdQU0J0SUNzZ1RXRjBhQzV3YjNjb01pd2diVXhsYmlsY2JpQWdJQ0JsSUQwZ1pTQXRJR1ZDYVdGelhHNGdJSDFjYmlBZ2NtVjBkWEp1SUNoeklEOGdMVEVnT2lBeEtTQXFJRzBnS2lCTllYUm9MbkJ2ZHlneUxDQmxJQzBnYlV4bGJpbGNibjFjYmx4dVpYaHdiM0owY3k1M2NtbDBaU0E5SUdaMWJtTjBhVzl1SUNoaWRXWm1aWElzSUhaaGJIVmxMQ0J2Wm1aelpYUXNJR2x6VEVVc0lHMU1aVzRzSUc1Q2VYUmxjeWtnZTF4dUlDQjJZWElnWlN3Z2JTd2dZMXh1SUNCMllYSWdaVXhsYmlBOUlHNUNlWFJsY3lBcUlEZ2dMU0J0VEdWdUlDMGdNVnh1SUNCMllYSWdaVTFoZUNBOUlDZ3hJRHc4SUdWTVpXNHBJQzBnTVZ4dUlDQjJZWElnWlVKcFlYTWdQU0JsVFdGNElENCtJREZjYmlBZ2RtRnlJSEowSUQwZ0tHMU1aVzRnUFQwOUlESXpJRDhnVFdGMGFDNXdiM2NvTWl3Z0xUSTBLU0F0SUUxaGRHZ3VjRzkzS0RJc0lDMDNOeWtnT2lBd0tWeHVJQ0IyWVhJZ2FTQTlJR2x6VEVVZ1B5QXdJRG9nS0c1Q2VYUmxjeUF0SURFcFhHNGdJSFpoY2lCa0lEMGdhWE5NUlNBL0lERWdPaUF0TVZ4dUlDQjJZWElnY3lBOUlIWmhiSFZsSUR3Z01DQjhmQ0FvZG1Gc2RXVWdQVDA5SURBZ0ppWWdNU0F2SUhaaGJIVmxJRHdnTUNrZ1B5QXhJRG9nTUZ4dVhHNGdJSFpoYkhWbElEMGdUV0YwYUM1aFluTW9kbUZzZFdVcFhHNWNiaUFnYVdZZ0tHbHpUbUZPS0haaGJIVmxLU0I4ZkNCMllXeDFaU0E5UFQwZ1NXNW1hVzVwZEhrcElIdGNiaUFnSUNCdElEMGdhWE5PWVU0b2RtRnNkV1VwSUQ4Z01TQTZJREJjYmlBZ0lDQmxJRDBnWlUxaGVGeHVJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lHVWdQU0JOWVhSb0xtWnNiMjl5S0UxaGRHZ3ViRzluS0haaGJIVmxLU0F2SUUxaGRHZ3VURTR5S1Z4dUlDQWdJR2xtSUNoMllXeDFaU0FxSUNoaklEMGdUV0YwYUM1d2IzY29NaXdnTFdVcEtTQThJREVwSUh0Y2JpQWdJQ0FnSUdVdExWeHVJQ0FnSUNBZ1l5QXFQU0F5WEc0Z0lDQWdmVnh1SUNBZ0lHbG1JQ2hsSUNzZ1pVSnBZWE1nUGowZ01Ta2dlMXh1SUNBZ0lDQWdkbUZzZFdVZ0t6MGdjblFnTHlCalhHNGdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJSFpoYkhWbElDczlJSEowSUNvZ1RXRjBhQzV3YjNjb01pd2dNU0F0SUdWQ2FXRnpLVnh1SUNBZ0lIMWNiaUFnSUNCcFppQW9kbUZzZFdVZ0tpQmpJRDQ5SURJcElIdGNiaUFnSUNBZ0lHVXJLMXh1SUNBZ0lDQWdZeUF2UFNBeVhHNGdJQ0FnZlZ4dVhHNGdJQ0FnYVdZZ0tHVWdLeUJsUW1saGN5QStQU0JsVFdGNEtTQjdYRzRnSUNBZ0lDQnRJRDBnTUZ4dUlDQWdJQ0FnWlNBOUlHVk5ZWGhjYmlBZ0lDQjlJR1ZzYzJVZ2FXWWdLR1VnS3lCbFFtbGhjeUErUFNBeEtTQjdYRzRnSUNBZ0lDQnRJRDBnS0haaGJIVmxJQ29nWXlBdElERXBJQ29nVFdGMGFDNXdiM2NvTWl3Z2JVeGxiaWxjYmlBZ0lDQWdJR1VnUFNCbElDc2daVUpwWVhOY2JpQWdJQ0I5SUdWc2MyVWdlMXh1SUNBZ0lDQWdiU0E5SUhaaGJIVmxJQ29nVFdGMGFDNXdiM2NvTWl3Z1pVSnBZWE1nTFNBeEtTQXFJRTFoZEdndWNHOTNLRElzSUcxTVpXNHBYRzRnSUNBZ0lDQmxJRDBnTUZ4dUlDQWdJSDFjYmlBZ2ZWeHVYRzRnSUdadmNpQW9PeUJ0VEdWdUlENDlJRGc3SUdKMVptWmxjbHR2Wm1aelpYUWdLeUJwWFNBOUlHMGdKaUF3ZUdabUxDQnBJQ3M5SUdRc0lHMGdMejBnTWpVMkxDQnRUR1Z1SUMwOUlEZ3BJSHQ5WEc1Y2JpQWdaU0E5SUNobElEdzhJRzFNWlc0cElId2diVnh1SUNCbFRHVnVJQ3M5SUcxTVpXNWNiaUFnWm05eUlDZzdJR1ZNWlc0Z1BpQXdPeUJpZFdabVpYSmJiMlptYzJWMElDc2dhVjBnUFNCbElDWWdNSGhtWml3Z2FTQXJQU0JrTENCbElDODlJREkxTml3Z1pVeGxiaUF0UFNBNEtTQjdmVnh1WEc0Z0lHSjFabVpsY2x0dlptWnpaWFFnS3lCcElDMGdaRjBnZkQwZ2N5QXFJREV5T0Z4dWZWeHVJbDE5XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiLy4uXFxcXC4uXFxcXG5vZGVfbW9kdWxlc1xcXFxpZWVlNzU0XFxcXGluZGV4LmpzXCIsXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXGllZWU3NTRcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4ndXNlIHN0cmljdCc7XG5cbi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxuXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGNhblNldEltbWVkaWF0ZSA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5zZXRJbW1lZGlhdGU7XG4gICAgdmFyIGNhblBvc3QgPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3cucG9zdE1lc3NhZ2UgJiYgd2luZG93LmFkZEV2ZW50TGlzdGVuZXI7XG5cbiAgICBpZiAoY2FuU2V0SW1tZWRpYXRlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoZikge1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5zZXRJbW1lZGlhdGUoZik7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKGNhblBvc3QpIHtcbiAgICAgICAgdmFyIHF1ZXVlID0gW107XG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gKGV2KSB7XG4gICAgICAgICAgICB2YXIgc291cmNlID0gZXYuc291cmNlO1xuICAgICAgICAgICAgaWYgKChzb3VyY2UgPT09IHdpbmRvdyB8fCBzb3VyY2UgPT09IG51bGwpICYmIGV2LmRhdGEgPT09ICdwcm9jZXNzLXRpY2snKSB7XG4gICAgICAgICAgICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgaWYgKHF1ZXVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZuID0gcXVldWUuc2hpZnQoKTtcbiAgICAgICAgICAgICAgICAgICAgZm4oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBuZXh0VGljayhmbikge1xuICAgICAgICAgICAgcXVldWUucHVzaChmbik7XG4gICAgICAgICAgICB3aW5kb3cucG9zdE1lc3NhZ2UoJ3Byb2Nlc3MtdGljaycsICcqJyk7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIG5leHRUaWNrKGZuKSB7XG4gICAgICAgIHNldFRpbWVvdXQoZm4sIDApO1xuICAgIH07XG59KCk7XG5cbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxuLy8gVE9ETyhzaHR5bG1hbilcbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAnLyc7XG59O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltSnliM2R6WlhJdWFuTWlYU3dpYm1GdFpYTWlPbHNpY0hKdlkyVnpjeUlzSW0xdlpIVnNaU0lzSW1WNGNHOXlkSE1pTENKdVpYaDBWR2xqYXlJc0ltTmhibE5sZEVsdGJXVmthV0YwWlNJc0luZHBibVJ2ZHlJc0luTmxkRWx0YldWa2FXRjBaU0lzSW1OaGJsQnZjM1FpTENKd2IzTjBUV1Z6YzJGblpTSXNJbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSWlMQ0ptSWl3aWNYVmxkV1VpTENKbGRpSXNJbk52ZFhKalpTSXNJbVJoZEdFaUxDSnpkRzl3VUhKdmNHRm5ZWFJwYjI0aUxDSnNaVzVuZEdnaUxDSm1iaUlzSW5Ob2FXWjBJaXdpY0hWemFDSXNJbk5sZEZScGJXVnZkWFFpTENKMGFYUnNaU0lzSW1KeWIzZHpaWElpTENKbGJuWWlMQ0poY21kMklpd2libTl2Y0NJc0ltOXVJaXdpWVdSa1RHbHpkR1Z1WlhJaUxDSnZibU5sSWl3aWIyWm1JaXdpY21WdGIzWmxUR2x6ZEdWdVpYSWlMQ0p5WlcxdmRtVkJiR3hNYVhOMFpXNWxjbk1pTENKbGJXbDBJaXdpWW1sdVpHbHVaeUlzSW01aGJXVWlMQ0pGY25KdmNpSXNJbU4zWkNJc0ltTm9aR2x5SWl3aVpHbHlJbDBzSW0xaGNIQnBibWR6SWpvaU96dEJRVUZCT3p0QlFVVkJMRWxCUVVsQkxGVkJRVlZETEU5QlFVOURMRTlCUVZBc1IwRkJhVUlzUlVGQkwwSTdPMEZCUlVGR0xGRkJRVkZITEZGQlFWSXNSMEZCYjBJc1dVRkJXVHRCUVVNMVFpeFJRVUZKUXl4clFrRkJhMElzVDBGQlQwTXNUVUZCVUN4TFFVRnJRaXhYUVVGc1FpeEpRVU51UWtFc1QwRkJUME1zV1VGRVZqdEJRVVZCTEZGQlFVbERMRlZCUVZVc1QwRkJUMFlzVFVGQlVDeExRVUZyUWl4WFFVRnNRaXhKUVVOWVFTeFBRVUZQUnl4WFFVUkpMRWxCUTFkSUxFOUJRVTlKTEdkQ1FVUm9RenM3UVVGSlFTeFJRVUZKVEN4bFFVRktMRVZCUVhGQ08wRkJRMnBDTEdWQlFVOHNWVUZCVlUwc1EwRkJWaXhGUVVGaE8wRkJRVVVzYlVKQlFVOU1MRTlCUVU5RExGbEJRVkFzUTBGQmIwSkpMRU5CUVhCQ0xFTkJRVkE3UVVGQkswSXNVMEZCY2tRN1FVRkRTRHM3UVVGRlJDeFJRVUZKU0N4UFFVRktMRVZCUVdFN1FVRkRWQ3haUVVGSlNTeFJRVUZSTEVWQlFWbzdRVUZEUVU0c1pVRkJUMGtzWjBKQlFWQXNRMEZCZDBJc1UwRkJlRUlzUlVGQmJVTXNWVUZCVlVjc1JVRkJWaXhGUVVGak8wRkJRemRETEdkQ1FVRkpReXhUUVVGVFJDeEhRVUZIUXl4TlFVRm9RanRCUVVOQkxHZENRVUZKTEVOQlFVTkJMRmRCUVZkU0xFMUJRVmdzU1VGQmNVSlJMRmRCUVZjc1NVRkJha01zUzBGQk1FTkVMRWRCUVVkRkxFbEJRVWdzUzBGQldTeGpRVUV4UkN4RlFVRXdSVHRCUVVOMFJVWXNiVUpCUVVkSExHVkJRVWc3UVVGRFFTeHZRa0ZCU1Vvc1RVRkJUVXNzVFVGQlRpeEhRVUZsTEVOQlFXNUNMRVZCUVhOQ08wRkJRMnhDTEhkQ1FVRkpReXhMUVVGTFRpeE5RVUZOVHl4TFFVRk9MRVZCUVZRN1FVRkRRVVE3UVVGRFNEdEJRVU5LTzBGQlEwb3NVMEZVUkN4RlFWTkhMRWxCVkVnN08wRkJWMEVzWlVGQlR5eFRRVUZUWkN4UlFVRlVMRU5CUVd0Q1l5eEZRVUZzUWl4RlFVRnpRanRCUVVONlFrNHNhMEpCUVUxUkxFbEJRVTRzUTBGQlYwWXNSVUZCV0R0QlFVTkJXaXh0UWtGQlQwY3NWMEZCVUN4RFFVRnRRaXhqUVVGdVFpeEZRVUZ0UXl4SFFVRnVRenRCUVVOSUxGTkJTRVE3UVVGSlNEczdRVUZGUkN4WFFVRlBMRk5CUVZOTUxGRkJRVlFzUTBGQmEwSmpMRVZCUVd4Q0xFVkJRWE5DTzBGQlEzcENSeXh0UWtGQlYwZ3NSVUZCV0N4RlFVRmxMRU5CUVdZN1FVRkRTQ3hMUVVaRU8wRkJSMGdzUTBGcVEydENMRVZCUVc1Q096dEJRVzFEUVdwQ0xGRkJRVkZ4UWl4TFFVRlNMRWRCUVdkQ0xGTkJRV2hDTzBGQlEwRnlRaXhSUVVGUmMwSXNUMEZCVWl4SFFVRnJRaXhKUVVGc1FqdEJRVU5CZEVJc1VVRkJVWFZDTEVkQlFWSXNSMEZCWXl4RlFVRmtPMEZCUTBGMlFpeFJRVUZSZDBJc1NVRkJVaXhIUVVGbExFVkJRV1k3TzBGQlJVRXNVMEZCVTBNc1NVRkJWQ3hIUVVGblFpeERRVUZGT3p0QlFVVnNRbnBDTEZGQlFWRXdRaXhGUVVGU0xFZEJRV0ZFTEVsQlFXSTdRVUZEUVhwQ0xGRkJRVkV5UWl4WFFVRlNMRWRCUVhOQ1JpeEpRVUYwUWp0QlFVTkJla0lzVVVGQlVUUkNMRWxCUVZJc1IwRkJaVWdzU1VGQlpqdEJRVU5CZWtJc1VVRkJVVFpDTEVkQlFWSXNSMEZCWTBvc1NVRkJaRHRCUVVOQmVrSXNVVUZCVVRoQ0xHTkJRVklzUjBGQmVVSk1MRWxCUVhwQ08wRkJRMEY2UWl4UlFVRlJLMElzYTBKQlFWSXNSMEZCTmtKT0xFbEJRVGRDTzBGQlEwRjZRaXhSUVVGUlowTXNTVUZCVWl4SFFVRmxVQ3hKUVVGbU96dEJRVVZCZWtJc1VVRkJVV2xETEU5QlFWSXNSMEZCYTBJc1ZVRkJWVU1zU1VGQlZpeEZRVUZuUWp0QlFVTTVRaXhWUVVGTkxFbEJRVWxETEV0QlFVb3NRMEZCVlN4clEwRkJWaXhEUVVGT08wRkJRMGdzUTBGR1JEczdRVUZKUVR0QlFVTkJia01zVVVGQlVXOURMRWRCUVZJc1IwRkJZeXhaUVVGWk8wRkJRVVVzVjBGQlR5eEhRVUZRTzBGQlFWa3NRMEZCZUVNN1FVRkRRWEJETEZGQlFWRnhReXhMUVVGU0xFZEJRV2RDTEZWQlFWVkRMRWRCUVZZc1JVRkJaVHRCUVVNelFpeFZRVUZOTEVsQlFVbElMRXRCUVVvc1EwRkJWU3huUTBGQlZpeERRVUZPTzBGQlEwZ3NRMEZHUkNJc0ltWnBiR1VpT2lKaWNtOTNjMlZ5TG1weklpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lMeThnYzJocGJTQm1iM0lnZFhOcGJtY2djSEp2WTJWemN5QnBiaUJpY205M2MyVnlYRzVjYm5aaGNpQndjbTlqWlhOeklEMGdiVzlrZFd4bExtVjRjRzl5ZEhNZ1BTQjdmVHRjYmx4dWNISnZZMlZ6Y3k1dVpYaDBWR2xqYXlBOUlDaG1kVzVqZEdsdmJpQW9LU0I3WEc0Z0lDQWdkbUZ5SUdOaGJsTmxkRWx0YldWa2FXRjBaU0E5SUhSNWNHVnZaaUIzYVc1a2IzY2dJVDA5SUNkMWJtUmxabWx1WldRblhHNGdJQ0FnSmlZZ2QybHVaRzkzTG5ObGRFbHRiV1ZrYVdGMFpUdGNiaUFnSUNCMllYSWdZMkZ1VUc5emRDQTlJSFI1Y0dWdlppQjNhVzVrYjNjZ0lUMDlJQ2QxYm1SbFptbHVaV1FuWEc0Z0lDQWdKaVlnZDJsdVpHOTNMbkJ2YzNSTlpYTnpZV2RsSUNZbUlIZHBibVJ2ZHk1aFpHUkZkbVZ1ZEV4cGMzUmxibVZ5WEc0Z0lDQWdPMXh1WEc0Z0lDQWdhV1lnS0dOaGJsTmxkRWx0YldWa2FXRjBaU2tnZTF4dUlDQWdJQ0FnSUNCeVpYUjFjbTRnWm5WdVkzUnBiMjRnS0dZcElIc2djbVYwZFhKdUlIZHBibVJ2ZHk1elpYUkpiVzFsWkdsaGRHVW9aaWtnZlR0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0JwWmlBb1kyRnVVRzl6ZENrZ2UxeHVJQ0FnSUNBZ0lDQjJZWElnY1hWbGRXVWdQU0JiWFR0Y2JpQWdJQ0FnSUNBZ2QybHVaRzkzTG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvSjIxbGMzTmhaMlVuTENCbWRXNWpkR2x2YmlBb1pYWXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIWmhjaUJ6YjNWeVkyVWdQU0JsZGk1emIzVnlZMlU3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvS0hOdmRYSmpaU0E5UFQwZ2QybHVaRzkzSUh4OElITnZkWEpqWlNBOVBUMGdiblZzYkNrZ0ppWWdaWFl1WkdGMFlTQTlQVDBnSjNCeWIyTmxjM010ZEdsamF5Y3BJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JsZGk1emRHOXdVSEp2Y0dGbllYUnBiMjRvS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCcFppQW9jWFZsZFdVdWJHVnVaM1JvSUQ0Z01Da2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCMllYSWdabTRnUFNCeGRXVjFaUzV6YUdsbWRDZ3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbWJpZ3BPMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnSUNBZ0lIMWNiaUFnSUNBZ0lDQWdmU3dnZEhKMVpTazdYRzVjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJR1oxYm1OMGFXOXVJRzVsZUhSVWFXTnJLR1p1S1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0J4ZFdWMVpTNXdkWE5vS0dadUtUdGNiaUFnSUNBZ0lDQWdJQ0FnSUhkcGJtUnZkeTV3YjNOMFRXVnpjMkZuWlNnbmNISnZZMlZ6Y3kxMGFXTnJKeXdnSnlvbktUdGNiaUFnSUNBZ0lDQWdmVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQnlaWFIxY200Z1puVnVZM1JwYjI0Z2JtVjRkRlJwWTJzb1ptNHBJSHRjYmlBZ0lDQWdJQ0FnYzJWMFZHbHRaVzkxZENobWJpd2dNQ2s3WEc0Z0lDQWdmVHRjYm4wcEtDazdYRzVjYm5CeWIyTmxjM011ZEdsMGJHVWdQU0FuWW5KdmQzTmxjaWM3WEc1d2NtOWpaWE56TG1KeWIzZHpaWElnUFNCMGNuVmxPMXh1Y0hKdlkyVnpjeTVsYm5ZZ1BTQjdmVHRjYm5CeWIyTmxjM011WVhKbmRpQTlJRnRkTzF4dVhHNW1kVzVqZEdsdmJpQnViMjl3S0NrZ2UzMWNibHh1Y0hKdlkyVnpjeTV2YmlBOUlHNXZiM0E3WEc1d2NtOWpaWE56TG1Ga1pFeHBjM1JsYm1WeUlEMGdibTl2Y0R0Y2JuQnliMk5sYzNNdWIyNWpaU0E5SUc1dmIzQTdYRzV3Y205alpYTnpMbTltWmlBOUlHNXZiM0E3WEc1d2NtOWpaWE56TG5KbGJXOTJaVXhwYzNSbGJtVnlJRDBnYm05dmNEdGNibkJ5YjJObGMzTXVjbVZ0YjNabFFXeHNUR2x6ZEdWdVpYSnpJRDBnYm05dmNEdGNibkJ5YjJObGMzTXVaVzFwZENBOUlHNXZiM0E3WEc1Y2JuQnliMk5sYzNNdVltbHVaR2x1WnlBOUlHWjFibU4wYVc5dUlDaHVZVzFsS1NCN1hHNGdJQ0FnZEdoeWIzY2dibVYzSUVWeWNtOXlLQ2R3Y205alpYTnpMbUpwYm1ScGJtY2dhWE1nYm05MElITjFjSEJ2Y25SbFpDY3BPMXh1ZlZ4dVhHNHZMeUJVVDBSUEtITm9kSGxzYldGdUtWeHVjSEp2WTJWemN5NWpkMlFnUFNCbWRXNWpkR2x2YmlBb0tTQjdJSEpsZEhWeWJpQW5MeWNnZlR0Y2JuQnliMk5sYzNNdVkyaGthWElnUFNCbWRXNWpkR2x2YmlBb1pHbHlLU0I3WEc0Z0lDQWdkR2h5YjNjZ2JtVjNJRVZ5Y205eUtDZHdjbTlqWlhOekxtTm9aR2x5SUdseklHNXZkQ0J6ZFhCd2IzSjBaV1FuS1R0Y2JuMDdYRzRpWFgwPVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi8uLlxcXFwuLlxcXFxub2RlX21vZHVsZXNcXFxccHJvY2Vzc1xcXFxicm93c2VyLmpzXCIsXCIvLi5cXFxcLi5cXFxcbm9kZV9tb2R1bGVzXFxcXHByb2Nlc3NcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG4ndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9hcGlDb25uZWN0ID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9hcGlDb25uZWN0LmpzJyk7XG5cbnZhciBfZXZlbnRIYW5kbGVyID0gcmVxdWlyZSgnLi9oZWxwZXJzL2V2ZW50SGFuZGxlcicpO1xuXG52YXIgX2V2ZW50SGFuZGxlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9ldmVudEhhbmRsZXIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgQWxidW1zID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFsYnVtcygpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEFsYnVtcyk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKEFsYnVtcywgW3tcbiAgICAgICAga2V5OiAnaW5pdCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICAgICAgdmFyIGRhdGFNTSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RhdGFNTScpKSB8fCBuZXcgX2FwaUNvbm5lY3QuQXBpQ29ubmVjdCgpLmNvbm5lY3RGTUEoKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyQWxidW1zKGRhdGFNTSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbmRlckFsYnVtcycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW5kZXJBbGJ1bXMoZGF0YU1NKSB7XG4gICAgICAgICAgICB2YXIgbWFpbkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW5Db250ZW50XCIpO1xuICAgICAgICAgICAgbWFpbkNvbnRlbnQuaW5uZXJIVE1MICs9ICc8ZGl2IGNsYXNzPVwibGlzdE11c2ljXCI+PC9kaXY+JztcbiAgICAgICAgICAgIHZhciBsaXN0TXVzaWMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmxpc3RNdXNpY1wiKTtcbiAgICAgICAgICAgIHZhciBhcnRpc3RzTmFtZSA9IGRhdGFNTS5hVHJhY2tzLm1hcChmdW5jdGlvbiAobmFtZSwgaSkge1xuICAgICAgICAgICAgICAgIGlmIChuYW1lLmFsYnVtX3RpdGxlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWUuYWxidW1fdGl0bGUgPSBcIk5vIHJlY29yZHNcIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsaXN0TXVzaWMuaW5uZXJIVE1MICs9ICdcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdE1haW5cIj5cXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZW1vLWxpc3QtYWN0aW9uIG1kbC1saXN0XCI+XFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1kbC1saXN0X19pdGVtXCI+XFxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWRsLWxpc3RfX2l0ZW0tcHJpbWFyeS1jb250ZW50XCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgbWRsLWxpc3RfX2l0ZW0tYXZhdGFyXCI+cGVyc29uPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4gJyArIG5hbWUuYWxidW1fdGl0bGUgKyAnIDwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgbWFpblBsYXlcIiBkYXRhLWluZGV4PVwiJyArIGkgKyAnXCI+cGxheV9jaXJjbGVfZmlsbGVkPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCInICsgbmFtZS50cmFja19maWxlX3VybCArICdcIj48ZGl2IGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5maWxlX2Rvd25sb2FkPC9kaXY+PC9hPlxcbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDwvZGl2Pic7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBidG5BcnJheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tYWluUGxheScpO1xuICAgICAgICAgICAgYnRuQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAoYnRuKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRhdGEgPSBkYXRhTU07XG4gICAgICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50LCBkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoMCwgX2V2ZW50SGFuZGxlcjIuZGVmYXVsdCkoZGF0YU1NLCBldmVudCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBBbGJ1bXM7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEFsYnVtcztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklrRnNZblZ0Y3k1cWN5SmRMQ0p1WVcxbGN5STZXeUpCYkdKMWJYTWlMQ0prWVhSaFRVMGlMQ0pLVTA5T0lpd2ljR0Z5YzJVaUxDSnNiMk5oYkZOMGIzSmhaMlVpTENKblpYUkpkR1Z0SWl3aVkyOXVibVZqZEVaTlFTSXNJbkpsYm1SbGNrRnNZblZ0Y3lJc0ltMWhhVzVEYjI1MFpXNTBJaXdpWkc5amRXMWxiblFpTENKeGRXVnllVk5sYkdWamRHOXlJaXdpYVc1dVpYSklWRTFNSWl3aWJHbHpkRTExYzJsaklpd2lZWEowYVhOMGMwNWhiV1VpTENKaFZISmhZMnR6SWl3aWJXRndJaXdpYm1GdFpTSXNJbWtpTENKaGJHSjFiVjkwYVhSc1pTSXNJblJ5WVdOclgyWnBiR1ZmZFhKc0lpd2lZblJ1UVhKeVlYa2lMQ0p4ZFdWeWVWTmxiR1ZqZEc5eVFXeHNJaXdpWm05eVJXRmphQ0lzSW1SaGRHRWlMQ0ppZEc0aUxDSmhaR1JGZG1WdWRFeHBjM1JsYm1WeUlpd2laWFpsYm5RaVhTd2liV0Z3Y0dsdVozTWlPaUk3T3pzN096czdPMEZCUVVFN08wRkJRMEU3T3pzN096czdPMGxCUlUxQkxFMDdPenM3T3pzN0swSkJRMHM3UVVGRFNDeG5Ra0ZCU1VNc1UwRkJVME1zUzBGQlMwTXNTMEZCVEN4RFFVRlhReXhoUVVGaFF5eFBRVUZpTEVOQlFYRkNMRkZCUVhKQ0xFTkJRVmdzUzBGQk9FTXNOa0pCUVdsQ1F5eFZRVUZxUWl4RlFVRXpSRHRCUVVOQkxHbENRVUZMUXl4WlFVRk1MRU5CUVd0Q1RpeE5RVUZzUWp0QlFVTklPenM3Y1VOQlJWbEJMRTBzUlVGQlVUdEJRVU5xUWl4blFrRkJTVThzWTBGQlkwTXNVMEZCVTBNc1lVRkJWQ3hEUVVGMVFpeGpRVUYyUWl4RFFVRnNRanRCUVVOQlJpeDNRa0ZCV1Vjc1UwRkJXaXhKUVVGNVFpd3JRa0ZCZWtJN1FVRkRRU3huUWtGQlNVTXNXVUZCV1Vnc1UwRkJVME1zWVVGQlZDeERRVUYxUWl4WlFVRjJRaXhEUVVGb1FqdEJRVU5CTEdkQ1FVRkpSeXhqUVVGaldpeFBRVUZQWVN4UFFVRlFMRU5CUVdWRExFZEJRV1lzUTBGQmJVSXNWVUZCUTBNc1NVRkJSQ3hGUVVGUFF5eERRVUZRTEVWQlFXRTdRVUZET1VNc2IwSkJRVWxFTEV0QlFVdEZMRmRCUVV3c1MwRkJjVUlzU1VGQmVrSXNSVUZCSzBJN1FVRkRNMEpHTEhsQ1FVRkxSU3hYUVVGTUxFZEJRVzFDTEZsQlFXNUNPMEZCUTBnN08wRkJSVVJPTERCQ1FVRlZSQ3hUUVVGV0xITldRVTExUWtzc1MwRkJTMFVzVjBGT05VSXNkMGhCVVRaRVJDeERRVkkzUkN4dFJVRlRjVUpFTEV0QlFVdEhMR05CVkRGQ08wRkJZVWdzWVVGc1FtbENMRU5CUVd4Q08wRkJiVUpCTEdkQ1FVRkpReXhYUVVGWFdDeFRRVUZUV1N4blFrRkJWQ3hEUVVFd1FpeFhRVUV4UWl4RFFVRm1PMEZCUTBGRUxIRkNRVUZUUlN4UFFVRlVMRU5CUVdsQ0xHVkJRVTg3UVVGRGNFSXNiMEpCUVVsRExFOUJRVTkwUWl4TlFVRllPMEZCUTBGMVFpeHZRa0ZCU1VNc1owSkJRVW9zUTBGQmNVSXNUMEZCY2tJc1JVRkJPRUlzVlVGQlEwTXNTMEZCUkN4RlFVRlJTQ3hKUVVGU08wRkJRVUVzTWtKQlFXbENMRFJDUVVGaGRFSXNUVUZCWWl4RlFVRnhRbmxDTEV0QlFYSkNMRU5CUVdwQ08wRkJRVUVzYVVKQlFUbENPMEZCUTBnc1lVRklSRHRCUVVsSU96czdPenM3YTBKQlIxVXhRaXhOSWl3aVptbHNaU0k2SWtGc1luVnRjeTVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYkltbHRjRzl5ZENCN0lFRndhVU52Ym01bFkzUWdmU0JtY205dElDY3VMaTlqYjIxd2IyNWxiblJ6TDJGd2FVTnZibTVsWTNRdWFuTW5PMXh1YVcxd2IzSjBJR1YyWlc1MFNHRnVaR3hsY2lCbWNtOXRJQ2N1TDJobGJIQmxjbk12WlhabGJuUklZVzVrYkdWeUp6dGNibHh1WTJ4aGMzTWdRV3hpZFcxeklIdGNiaUFnSUNCcGJtbDBLQ2tnZTF4dUlDQWdJQ0FnSUNCc1pYUWdaR0YwWVUxTklEMGdTbE5QVGk1d1lYSnpaU2hzYjJOaGJGTjBiM0poWjJVdVoyVjBTWFJsYlNnblpHRjBZVTFOSnlrcElIeDhJRzVsZHlCQmNHbERiMjV1WldOMEtDa3VZMjl1Ym1WamRFWk5RU2dwTzF4dUlDQWdJQ0FnSUNCMGFHbHpMbkpsYm1SbGNrRnNZblZ0Y3loa1lYUmhUVTBwTzF4dUlDQWdJSDFjYmx4dUlDQWdJSEpsYm1SbGNrRnNZblZ0Y3loa1lYUmhUVTBwSUh0Y2JpQWdJQ0FnSUNBZ2JHVjBJRzFoYVc1RGIyNTBaVzUwSUQwZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWhjSWk1dFlXbHVRMjl1ZEdWdWRGd2lLVHRjYmlBZ0lDQWdJQ0FnYldGcGJrTnZiblJsYm5RdWFXNXVaWEpJVkUxTUlDczlJQ2M4WkdsMklHTnNZWE56UFZ3aWJHbHpkRTExYzJsalhDSStQQzlrYVhZK0oxeHVJQ0FnSUNBZ0lDQnNaWFFnYkdsemRFMTFjMmxqSUQwZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWhjSWk1c2FYTjBUWFZ6YVdOY0lpazdYRzRnSUNBZ0lDQWdJR3hsZENCaGNuUnBjM1J6VG1GdFpTQTlJR1JoZEdGTlRTNWhWSEpoWTJ0ekxtMWhjQ2dvYm1GdFpTd2dhU2tnUFQ0Z2UxeHVJQ0FnSUNBZ0lDQWdJQ0FnYVdZZ0tHNWhiV1V1WVd4aWRXMWZkR2wwYkdVZ1BUMDlJRzUxYkd3cElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnVZVzFsTG1Gc1luVnRYM1JwZEd4bElEMGdYQ0pPYnlCeVpXTnZjbVJ6WENJN1hHNGdJQ0FnSUNBZ0lDQWdJQ0I5WEc1Y2JpQWdJQ0FnSUNBZ0lDQWdJR3hwYzNSTmRYTnBZeTVwYm01bGNraFVUVXdnS3owZ1lGeHVJQ0FnSUNBZ0lDQWdJQ0FnUEdScGRpQmpiR0Z6Y3oxY0lteHBjM1JOWVdsdVhDSStYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lEeGthWFlnWTJ4aGMzTTlYQ0prWlcxdkxXeHBjM1F0WVdOMGFXOXVJRzFrYkMxc2FYTjBYQ0krWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBOFpHbDJJR05zWVhOelBWd2liV1JzTFd4cGMzUmZYMmwwWlcxY0lqNWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBOGMzQmhiaUJqYkdGemN6MWNJbTFrYkMxc2FYTjBYMTlwZEdWdExYQnlhVzFoY25rdFkyOXVkR1Z1ZEZ3aVBseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQThaR2wySUdOc1lYTnpQVndpYldGMFpYSnBZV3d0YVdOdmJuTWdiV1JzTFd4cGMzUmZYMmwwWlcwdFlYWmhkR0Z5WENJK2NHVnljMjl1UEM5a2FYWStYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRHh6Y0dGdVBpQWtlMjVoYldVdVlXeGlkVzFmZEdsMGJHVjlJRHd2YzNCaGJqNWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBOEwzTndZVzQrWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdQR1JwZGlCamJHRnpjejFjSW0xaGRHVnlhV0ZzTFdsamIyNXpJRzFoYVc1UWJHRjVYQ0lnWkdGMFlTMXBibVJsZUQxY0lpUjdhWDFjSWo1d2JHRjVYMk5wY21Oc1pWOW1hV3hzWldROEwyUnBkajVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQThZU0JvY21WbVBWd2lKSHR1WVcxbExuUnlZV05yWDJacGJHVmZkWEpzZlZ3aVBqeGthWFlnWTJ4aGMzTTlYQ0p0WVhSbGNtbGhiQzFwWTI5dWMxd2lQbVpwYkdWZlpHOTNibXh2WVdROEwyUnBkajQ4TDJFK1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQThMMlJwZGo1Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnUEM5a2FYWStYRzRnSUNBZ0lDQWdJQ0FnUEM5a2FYWStZRHRjYmlBZ0lDQWdJQ0FnZlNrN1hHNGdJQ0FnSUNBZ0lHeGxkQ0JpZEc1QmNuSmhlU0E5SUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSkJiR3dvSnk1dFlXbHVVR3hoZVNjcE8xeHVJQ0FnSUNBZ0lDQmlkRzVCY25KaGVTNW1iM0pGWVdOb0tHSjBiaUE5UGlCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JzWlhRZ1pHRjBZU0E5SUdSaGRHRk5UVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHSjBiaTVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLQ2RqYkdsamF5Y3NJQ2hsZG1WdWRDd2daR0YwWVNrZ1BUNGdaWFpsYm5SSVlXNWtiR1Z5S0dSaGRHRk5UU3dnWlhabGJuUXBLVnh1SUNBZ0lDQWdJQ0I5S1Z4dUlDQWdJSDFjYm4xY2JseHVaWGh3YjNKMElHUmxabUYxYkhRZ1FXeGlkVzF6T3lKZGZRPT1cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvY29tcG9uZW50c1xcXFxBbGJ1bXMuanNcIixcIi9jb21wb25lbnRzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfYXBpQ29ubmVjdCA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvYXBpQ29ubmVjdC5qcycpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgRmF2b3JpdGVzID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEZhdm9yaXRlcygpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEZhdm9yaXRlcyk7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKEZhdm9yaXRlcywgW3tcbiAgICAgICAga2V5OiAnaW5pdCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICAgICAgdmFyIGRhdGFNTSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Zhdm9yaXRlcycpKSB8fCBuZXcgX2FwaUNvbm5lY3QuQXBpQ29ubmVjdCgpLmNvbm5lY3RGTUEoKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyU29uZ3MoZGF0YU1NKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVuZGVyU29uZ3MnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVuZGVyU29uZ3MoZGF0YU1NKSB7XG4gICAgICAgICAgICB2YXIgYXJ0aXN0c05hbWUgPSBkYXRhTU0uYVRyYWNrcy5tYXAoZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWFpbkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW5Db250ZW50XCIpO1xuICAgICAgICAgICAgICAgIHZhciBjYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5hcnRpc3RzX2NhcmRcIik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBGYXZvcml0ZXM7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEZhdm9yaXRlcztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklrWmhkbTl5YVhSbGN5NXFjeUpkTENKdVlXMWxjeUk2V3lKR1lYWnZjbWwwWlhNaUxDSmtZWFJoVFUwaUxDSktVMDlPSWl3aWNHRnljMlVpTENKc2IyTmhiRk4wYjNKaFoyVWlMQ0puWlhSSmRHVnRJaXdpWTI5dWJtVmpkRVpOUVNJc0luSmxibVJsY2xOdmJtZHpJaXdpWVhKMGFYTjBjMDVoYldVaUxDSmhWSEpoWTJ0eklpd2liV0Z3SWl3aWJtRnRaU0lzSW0xaGFXNURiMjUwWlc1MElpd2laRzlqZFcxbGJuUWlMQ0p4ZFdWeWVWTmxiR1ZqZEc5eUlpd2lZMkZ5WkNKZExDSnRZWEJ3YVc1bmN5STZJanM3T3pzN096czdRVUZCUVRzN096dEpRVVZOUVN4VE96czdPenM3T3l0Q1FVTkxPMEZCUTBnc1owSkJRVWxETEZOQlFWTkRMRXRCUVV0RExFdEJRVXdzUTBGQlYwTXNZVUZCWVVNc1QwRkJZaXhEUVVGeFFpeFhRVUZ5UWl4RFFVRllMRXRCUVdsRUxEWkNRVUZwUWtNc1ZVRkJha0lzUlVGQk9VUTdRVUZEUVN4cFFrRkJTME1zVjBGQlRDeERRVUZwUWs0c1RVRkJha0k3UVVGRFNEczdPMjlEUVVWWFFTeE5MRVZCUVZFN1FVRkRhRUlzWjBKQlFVbFBMR05CUVdOUUxFOUJRVTlSTEU5QlFWQXNRMEZCWlVNc1IwRkJaaXhEUVVGdFFpeFZRVUZEUXl4SlFVRkVMRVZCUVZVN1FVRkRNME1zYjBKQlFVbERMR05CUVdORExGTkJRVk5ETEdGQlFWUXNRMEZCZFVJc1kwRkJka0lzUTBGQmJFSTdRVUZEUVN4dlFrRkJTVU1zVDBGQlQwWXNVMEZCVTBNc1lVRkJWQ3hEUVVGMVFpeGxRVUYyUWl4RFFVRllPMEZCUTBnc1lVRklhVUlzUTBGQmJFSTdRVUZKU0RzN096czdPMnRDUVVkVlpDeFRJaXdpWm1sc1pTSTZJa1poZG05eWFYUmxjeTVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYkltbHRjRzl5ZENCN0lFRndhVU52Ym01bFkzUWdmU0JtY205dElDY3VMaTlqYjIxd2IyNWxiblJ6TDJGd2FVTnZibTVsWTNRdWFuTW5YRzVjYm1Oc1lYTnpJRVpoZG05eWFYUmxjeUI3WEc0Z0lDQWdhVzVwZENncElIdGNiaUFnSUNBZ0lDQWdiR1YwSUdSaGRHRk5UU0E5SUVwVFQwNHVjR0Z5YzJVb2JHOWpZV3hUZEc5eVlXZGxMbWRsZEVsMFpXMG9KMlpoZG05eWFYUmxjeWNwS1NCOGZDQnVaWGNnUVhCcFEyOXVibVZqZENncExtTnZibTVsWTNSR1RVRW9LVHRjYmlBZ0lDQWdJQ0FnZEdocGN5NXlaVzVrWlhKVGIyNW5jeWhrWVhSaFRVMHBPMXh1SUNBZ0lIMWNibHh1SUNBZ0lISmxibVJsY2xOdmJtZHpLR1JoZEdGTlRTa2dlMXh1SUNBZ0lDQWdJQ0JzWlhRZ1lYSjBhWE4wYzA1aGJXVWdQU0JrWVhSaFRVMHVZVlJ5WVdOcmN5NXRZWEFvS0c1aGJXVXBJRDArSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR3hsZENCdFlXbHVRMjl1ZEdWdWRDQTlJR1J2WTNWdFpXNTBMbkYxWlhKNVUyVnNaV04wYjNJb1hDSXViV0ZwYmtOdmJuUmxiblJjSWlrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JzWlhRZ1kyRnlaQ0E5SUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9YQ0l1WVhKMGFYTjBjMTlqWVhKa1hDSXBPMXh1SUNBZ0lDQWdJQ0I5S1R0Y2JpQWdJQ0I5WEc1OVhHNWNibVY0Y0c5eWRDQmtaV1poZFd4MElFWmhkbTl5YVhSbGN6c2lYWDA9XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL2NvbXBvbmVudHNcXFxcRmF2b3JpdGVzLmpzXCIsXCIvY29tcG9uZW50c1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX2FwaUNvbm5lY3QgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2FwaUNvbm5lY3QuanMnKTtcblxudmFyIF9ldmVudEhhbmRsZXIgPSByZXF1aXJlKCcuL2hlbHBlcnMvZXZlbnRIYW5kbGVyJyk7XG5cbnZhciBfZXZlbnRIYW5kbGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V2ZW50SGFuZGxlcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBTb25ncyA9IGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTb25ncygpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFNvbmdzKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoU29uZ3MsIFt7XG4gICAgICAgIGtleTogJ2luaXQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgICAgICAgIHZhciBkYXRhTU0gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYXRhTU0nKSkgfHwgbmV3IF9hcGlDb25uZWN0LkFwaUNvbm5lY3QoKS5jb25uZWN0Rk1BKCk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlclNvbmdzKGRhdGFNTSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3JlbmRlclNvbmdzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbmRlclNvbmdzKGRhdGFNTSkge1xuICAgICAgICAgICAgdmFyIG1haW5Db250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluQ29udGVudFwiKTtcbiAgICAgICAgICAgIG1haW5Db250ZW50LmlubmVySFRNTCArPSAnPGRpdiBjbGFzcz1cImxpc3RNdXNpY1wiPjwvZGl2Pic7XG4gICAgICAgICAgICB2YXIgbGlzdE11c2ljID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5saXN0TXVzaWNcIik7XG4gICAgICAgICAgICB2YXIgYXJ0aXN0c05hbWUgPSBkYXRhTU0uYVRyYWNrcy5tYXAoZnVuY3Rpb24gKG5hbWUsIGkpIHtcbiAgICAgICAgICAgICAgICBsaXN0TXVzaWMuaW5uZXJIVE1MICs9ICdcXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwibGlzdE1haW5cIj5cXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkZW1vLWxpc3QtYWN0aW9uIG1kbC1saXN0XCI+XFxuICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1kbC1saXN0X19pdGVtXCI+XFxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwibWRsLWxpc3RfX2l0ZW0tcHJpbWFyeS1jb250ZW50XCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgbWRsLWxpc3RfX2l0ZW0tYXZhdGFyXCI+cGVyc29uPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICBcXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPiAnICsgbmFtZS50cmFja190aXRsZSArICcgPC9zcGFuPiA8c3Bhbj4gJyArIG5hbWUudHJhY2tfZHVyYXRpb24gKyAnIDwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgbWFpblBsYXlcIiBkYXRhLWluZGV4PVwiJyArIGkgKyAnXCI+cGxheV9jaXJjbGVfZmlsbGVkPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgIFxcbiAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiJyArIG5hbWUudHJhY2tfZmlsZV91cmwgKyAnXCI+PGRpdiBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCI+ZmlsZV9kb3dubG9hZDwvZGl2PjwvYT5cXG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICA8L2Rpdj4nO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgYnRuQXJyYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubWFpblBsYXknKTtcbiAgICAgICAgICAgIGJ0bkFycmF5LmZvckVhY2goZnVuY3Rpb24gKGJ0bikge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhID0gZGF0YU1NO1xuICAgICAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKDAsIF9ldmVudEhhbmRsZXIyLmRlZmF1bHQpKGRhdGFNTSwgZXZlbnQpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gU29uZ3M7XG59KCk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFNvbmdzO1xuXG5cbnsvKiA8ZGl2IGNsYXNzPVwibWF0ZXJpYWwtaWNvbnMgc3RhclwiPnN0YXI8L2Rpdj4gKi99XG57LyogPHNwYW4+PGRpdiBjbGFzcz1cInRyYWNrSW1hZ2VcIj48aW1nIGFsdD1cIlwiIHNyYz0ke25hbWUudHJhY2tfaW1hZ2VfZmlsZX0gd2lkdGg9XCIyNVwiIGhlaWdodD1cIjI1XCI+PC9kaXY+PC9zcGFuPiAqL31cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYklsTnZibWR6TG1weklsMHNJbTVoYldWeklqcGJJbE52Ym1keklpd2laR0YwWVUxTklpd2lTbE5QVGlJc0luQmhjbk5sSWl3aWJHOWpZV3hUZEc5eVlXZGxJaXdpWjJWMFNYUmxiU0lzSW1OdmJtNWxZM1JHVFVFaUxDSnlaVzVrWlhKVGIyNW5jeUlzSW0xaGFXNURiMjUwWlc1MElpd2laRzlqZFcxbGJuUWlMQ0p4ZFdWeWVWTmxiR1ZqZEc5eUlpd2lhVzV1WlhKSVZFMU1JaXdpYkdsemRFMTFjMmxqSWl3aVlYSjBhWE4wYzA1aGJXVWlMQ0poVkhKaFkydHpJaXdpYldGd0lpd2libUZ0WlNJc0lta2lMQ0owY21GamExOTBhWFJzWlNJc0luUnlZV05yWDJSMWNtRjBhVzl1SWl3aWRISmhZMnRmWm1sc1pWOTFjbXdpTENKaWRHNUJjbkpoZVNJc0luRjFaWEo1VTJWc1pXTjBiM0pCYkd3aUxDSm1iM0pGWVdOb0lpd2laR0YwWVNJc0ltSjBiaUlzSW1Ga1pFVjJaVzUwVEdsemRHVnVaWElpTENKbGRtVnVkQ0pkTENKdFlYQndhVzVuY3lJNklqczdPenM3T3pzN1FVRkJRVHM3UVVGRFFUczdPenM3T3pzN1NVRkZUVUVzU3pzN096czdPenNyUWtGRFN6dEJRVU5JTEdkQ1FVRkpReXhUUVVGVFF5eExRVUZMUXl4TFFVRk1MRU5CUVZkRExHRkJRV0ZETEU5QlFXSXNRMEZCY1VJc1VVRkJja0lzUTBGQldDeExRVUU0UXl3MlFrRkJhVUpETEZWQlFXcENMRVZCUVRORU8wRkJRMEVzYVVKQlFVdERMRmRCUVV3c1EwRkJhVUpPTEUxQlFXcENPMEZCUTBnN096dHZRMEZGVjBFc1RTeEZRVUZSTzBGQlEyaENMR2RDUVVGSlR5eGpRVUZqUXl4VFFVRlRReXhoUVVGVUxFTkJRWFZDTEdOQlFYWkNMRU5CUVd4Q08wRkJRMEZHTEhkQ1FVRlpSeXhUUVVGYUxFbEJRWGxDTEN0Q1FVRjZRanRCUVVOQkxHZENRVUZKUXl4WlFVRlpTQ3hUUVVGVFF5eGhRVUZVTEVOQlFYVkNMRmxCUVhaQ0xFTkJRV2hDTzBGQlEwRXNaMEpCUVVsSExHTkJRV05hTEU5QlFVOWhMRTlCUVZBc1EwRkJaVU1zUjBGQlppeERRVUZ0UWl4VlFVRkRReXhKUVVGRUxFVkJRVTlETEVOQlFWQXNSVUZCWVR0QlFVTTVRMHdzTUVKQlFWVkVMRk5CUVZZc2ExaEJUM1ZDU3l4TFFVRkxSU3hYUVZBMVFpeDNRa0ZQTUVSR0xFdEJRVXRITEdOQlVDOUVMSGRJUVZNMlJFWXNRMEZVTjBRc01rWkJWM0ZDUkN4TFFVRkxTU3hqUVZneFFqdEJRV1ZJTEdGQmFFSnBRaXhEUVVGc1FqdEJRV2xDUVN4blFrRkJTVU1zVjBGQlYxb3NVMEZCVTJFc1owSkJRVlFzUTBGQk1FSXNWMEZCTVVJc1EwRkJaanRCUVVOQlJDeHhRa0ZCVTBVc1QwRkJWQ3hEUVVGcFFpeGxRVUZQTzBGQlEzQkNMRzlDUVVGSlF5eFBRVUZQZGtJc1RVRkJXRHRCUVVOQmQwSXNiMEpCUVVsRExHZENRVUZLTEVOQlFYRkNMRTlCUVhKQ0xFVkJRVGhDTEZWQlFVTkRMRXRCUVVRc1JVRkJVVWdzU1VGQlVqdEJRVUZCTERKQ1FVRnBRaXcwUWtGQllYWkNMRTFCUVdJc1JVRkJjVUl3UWl4TFFVRnlRaXhEUVVGcVFqdEJRVUZCTEdsQ1FVRTVRanRCUVVOSUxHRkJTRVE3UVVGSlNEczdPenM3TzJ0Q1FVZFZNMElzU3pzN08wRkJSV1lzUTBGQlF5eHBSRUZCYlVRN1FVRkRjRVFzUTBGQlF5eHBTRUZCYlVnaUxDSm1hV3hsSWpvaVUyOXVaM011YW5NaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SnBiWEJ2Y25RZ2V5QkJjR2xEYjI1dVpXTjBJSDBnWm5KdmJTQW5MaTR2WTI5dGNHOXVaVzUwY3k5aGNHbERiMjV1WldOMExtcHpKenRjYm1sdGNHOXlkQ0JsZG1WdWRFaGhibVJzWlhJZ1puSnZiU0FuTGk5b1pXeHdaWEp6TDJWMlpXNTBTR0Z1Wkd4bGNpYzdYRzVjYm1Oc1lYTnpJRk52Ym1keklIdGNiaUFnSUNCcGJtbDBLQ2tnZTF4dUlDQWdJQ0FnSUNCc1pYUWdaR0YwWVUxTklEMGdTbE5QVGk1d1lYSnpaU2hzYjJOaGJGTjBiM0poWjJVdVoyVjBTWFJsYlNnblpHRjBZVTFOSnlrcElIeDhJRzVsZHlCQmNHbERiMjV1WldOMEtDa3VZMjl1Ym1WamRFWk5RU2dwTzF4dUlDQWdJQ0FnSUNCMGFHbHpMbkpsYm1SbGNsTnZibWR6S0dSaGRHRk5UU2s3WEc0Z0lDQWdmVnh1WEc0Z0lDQWdjbVZ1WkdWeVUyOXVaM01vWkdGMFlVMU5LU0I3WEc0Z0lDQWdJQ0FnSUd4bGRDQnRZV2x1UTI5dWRHVnVkQ0E5SUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9YQ0l1YldGcGJrTnZiblJsYm5SY0lpazdYRzRnSUNBZ0lDQWdJRzFoYVc1RGIyNTBaVzUwTG1sdWJtVnlTRlJOVENBclBTQW5QR1JwZGlCamJHRnpjejFjSW14cGMzUk5kWE5wWTF3aVBqd3ZaR2wyUGlkY2JpQWdJQ0FnSUNBZ2JHVjBJR3hwYzNSTmRYTnBZeUE5SUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9YQ0l1YkdsemRFMTFjMmxqWENJcE8xeHVJQ0FnSUNBZ0lDQnNaWFFnWVhKMGFYTjBjMDVoYldVZ1BTQmtZWFJoVFUwdVlWUnlZV05yY3k1dFlYQW9LRzVoYldVc0lHa3BJRDArSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJR3hwYzNSTmRYTnBZeTVwYm01bGNraFVUVXdnS3owZ1lGeHVJQ0FnSUNBZ0lDQWdJQ0FnUEdScGRpQmpiR0Z6Y3oxY0lteHBjM1JOWVdsdVhDSStYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lEeGthWFlnWTJ4aGMzTTlYQ0prWlcxdkxXeHBjM1F0WVdOMGFXOXVJRzFrYkMxc2FYTjBYQ0krWEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBOFpHbDJJR05zWVhOelBWd2liV1JzTFd4cGMzUmZYMmwwWlcxY0lqNWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBOGMzQmhiaUJqYkdGemN6MWNJbTFrYkMxc2FYTjBYMTlwZEdWdExYQnlhVzFoY25rdFkyOXVkR1Z1ZEZ3aVBseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQThaR2wySUdOc1lYTnpQVndpYldGMFpYSnBZV3d0YVdOdmJuTWdiV1JzTFd4cGMzUmZYMmwwWlcwdFlYWmhkR0Z5WENJK2NHVnljMjl1UEM5a2FYWStYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRnh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0E4YzNCaGJqNGdKSHR1WVcxbExuUnlZV05yWDNScGRHeGxmU0E4TDNOd1lXNCtJRHh6Y0dGdVBpQWtlMjVoYldVdWRISmhZMnRmWkhWeVlYUnBiMjU5SUR3dmMzQmhiajVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQThMM053WVc0K1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnUEdScGRpQmpiR0Z6Y3oxY0ltMWhkR1Z5YVdGc0xXbGpiMjV6SUcxaGFXNVFiR0Y1WENJZ1pHRjBZUzFwYm1SbGVEMWNJaVI3YVgxY0lqNXdiR0Y1WDJOcGNtTnNaVjltYVd4c1pXUThMMlJwZGo1Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQThZU0JvY21WbVBWd2lKSHR1WVcxbExuUnlZV05yWDJacGJHVmZkWEpzZlZ3aVBqeGthWFlnWTJ4aGMzTTlYQ0p0WVhSbGNtbGhiQzFwWTI5dWMxd2lQbVpwYkdWZlpHOTNibXh2WVdROEwyUnBkajQ4TDJFK1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQThMMlJwZGo1Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnUEM5a2FYWStYRzRnSUNBZ0lDQWdJQ0FnUEM5a2FYWStZRHRjYmlBZ0lDQWdJQ0FnZlNrN1hHNGdJQ0FnSUNBZ0lHeGxkQ0JpZEc1QmNuSmhlU0E5SUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSkJiR3dvSnk1dFlXbHVVR3hoZVNjcE8xeHVJQ0FnSUNBZ0lDQmlkRzVCY25KaGVTNW1iM0pGWVdOb0tHSjBiaUE5UGlCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JzWlhRZ1pHRjBZU0E5SUdSaGRHRk5UVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lHSjBiaTVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLQ2RqYkdsamF5Y3NJQ2hsZG1WdWRDd2daR0YwWVNrZ1BUNGdaWFpsYm5SSVlXNWtiR1Z5S0dSaGRHRk5UU3dnWlhabGJuUXBLVnh1SUNBZ0lDQWdJQ0I5S1Z4dUlDQWdJSDFjYm4xY2JseHVaWGh3YjNKMElHUmxabUYxYkhRZ1UyOXVaM003WEc1Y2Juc3ZLaUE4WkdsMklHTnNZWE56UFZ3aWJXRjBaWEpwWVd3dGFXTnZibk1nYzNSaGNsd2lQbk4wWVhJOEwyUnBkajRnS2k4Z2ZWeHVleThxSUR4emNHRnVQanhrYVhZZ1kyeGhjM005WENKMGNtRmphMGx0WVdkbFhDSStQR2x0WnlCaGJIUTlYQ0pjSWlCemNtTTlKSHR1WVcxbExuUnlZV05yWDJsdFlXZGxYMlpwYkdWOUlIZHBaSFJvUFZ3aU1qVmNJaUJvWldsbmFIUTlYQ0l5TlZ3aVBqd3ZaR2wyUGp3dmMzQmhiajRnS2k4Z2ZTSmRmUT09XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL2NvbXBvbmVudHNcXFxcU29uZ3MuanNcIixcIi9jb21wb25lbnRzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLkFwaUNvbm5lY3QgPSB1bmRlZmluZWQ7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfZXZlbnRIYW5kbGVyID0gcmVxdWlyZShcIi4vaGVscGVycy9ldmVudEhhbmRsZXJcIik7XG5cbnZhciBfZXZlbnRIYW5kbGVyMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2V2ZW50SGFuZGxlcik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbnZhciBBUElfS0VZX0xBU1RGTSA9IFwiNTJiYzNiNmU4NDgwN2RlMGYzNDQ4MjExMGZmYTA4MzRcIjtcbnZhciBBUElfS0VZX0ZNQSA9IFwiMjlVVDNLQTg3UTNNVjhRMVwiO1xuZnVuY3Rpb24gJCQoc3RyKSB7XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHN0cik7XG59XG5cbnZhciBBcGlDb25uZWN0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBBcGlDb25uZWN0KCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBBcGlDb25uZWN0KTtcblxuICAgIC8vIHRoaXMudHJhY2tVcmxzID0gW107XG4gICAgdGhpcy5kb20gPSB7XG4gICAgICBwbGF5ZXI6ICQkKFwiLnBsYXllclwiKSxcblxuICAgICAgcGxheTogJCQoXCIucGxheVwiKSxcbiAgICAgIHBhdXNlOiAkJChcIi5wYXVzZVwiKSxcblxuICAgICAgcHJvZ3Jlc3M6IHtcbiAgICAgICAgYmFyOiAkJChcIi5wcm9ncmVzc1wiKSxcbiAgICAgICAgbG9hZGVkOiAkJChcIi5wcm9ncmVzc19sb2FkZWRcIiksXG4gICAgICAgIGN1cnJlbnQ6ICQkKFwiLnByb2dyZXNzX2N1cnJlbnRcIilcbiAgICAgIH0sXG4gICAgICBkdXJhdGlvbjogJCQoXCIuZHVyYXRpb25cIiksXG5cbiAgICAgIHZvbHVtZToge1xuICAgICAgICBiYXI6ICQkKFwiLnZvbHVtZVwiKSxcbiAgICAgICAgdmFsdWU6ICQkKFwiLnZvbHVtZV9fYmFyXCIpLFxuICAgICAgICB2YWx1ZVZvbHVtZTogJCQoXCIudmFsdWVWb2x1bWVcIilcbiAgICAgIH0sXG5cbiAgICAgIHJhZGlvOiAkJChcIi5kaXZSYWRpb1wiKSxcbiAgICAgIG92ZXJsYXk6ICQkKFwiLm92ZXJsYXlcIilcbiAgICB9O1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEFwaUNvbm5lY3QsIFt7XG4gICAga2V5OiBcImluaXRcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAgIHZhciBkYXRhTU0gPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCdkYXRhTU0nKSkgfHwgdGhpcy5jb25uZWN0Rk1BKCk7XG4gICAgICB0aGlzLmNvbnRyb2xzKGRhdGFNTSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNvbm5lY3RGTUFcIixcbiAgICB2YWx1ZTogZnVuY3Rpb24gY29ubmVjdEZNQSgpIHtcbiAgICAgIC8vIGZldGNoKFxuICAgICAgLy8gICBgaHR0cHM6Ly9mcmVlbXVzaWNhcmNoaXZlLm9yZy9hcGkvZ2V0L2N1cmF0b3JzLmpzb24/YXBpX2tleT0ke0FQSV9LRVlfRk1BfWBcbiAgICAgIC8vIClcbiAgICAgIC8vICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAgICAgLy8gICAudGhlbihkYXRhID0+IHtcbiAgICAgIC8vICAgICBsZXQgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbkNvbnRlbnRcIik7XG5cbiAgICAgIC8vICAgfSk7XG4gICAgICBmZXRjaChcImh0dHBzOi8vZnJlZW11c2ljYXJjaGl2ZS5vcmcvcmVjZW50Lmpzb25cIikudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGRhdGFNTSkge1xuXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGFNTSlcbiAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YU1NLmFUcmFja3NbMTBdLnRyYWNrX2R1cmF0aW9uKTtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2RhdGFNTScsIEpTT04uc3RyaW5naWZ5KGRhdGFNTSkpO1xuICAgICAgICByZXR1cm4gZGF0YU1NO1xuICAgICAgfSk7XG4gICAgfVxuICB9LCB7XG4gICAga2V5OiBcImNvbnRyb2xzXCIsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNvbnRyb2xzKGRhdGFNTSkge1xuICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgIGNvbnNvbGUubG9nKGRhdGFNTS5hVHJhY2tzWzE2XS50cmFja19saXN0ZW5fdXJsKTtcbiAgICAgIC8vbGV0IGxpc3RlblVybCA9IGRhdGFNTS5hVHJhY2tzWzEwXS50cmFja19saXN0ZW5fdXJsO1xuICAgICAgdmFyIHRyYWNrVXJscyA9IGRhdGFNTS5hVHJhY2tzLm1hcChmdW5jdGlvbiAodHJhY2spIHtcbiAgICAgICAgcmV0dXJuIHRyYWNrLnRyYWNrX2xpc3Rlbl91cmw7XG4gICAgICB9KTtcbiAgICAgIC8vIHRyYWNrVXJscy51bnNoaWZ0KGRhdGFNTS5hVHJhY2tzWzEwXS50cmFja19saXN0ZW5fdXJsKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCd0aGlzIHRyYWwhISEnLCB0cmFja1VybHMpO1xuICAgICAgdmFyIG1haW5Db250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluQ29udGVudFwiKTtcbiAgICAgIG1haW5Db250ZW50LmlubmVySFRNTCArPSAnPGRpdiBjbGFzcz1cImxpc3RNdXNpY1wiPjwvZGl2Pic7XG4gICAgICB2YXIgYXJ0aXN0c05hbWUgPSBkYXRhTU0uYVRyYWNrcy5tYXAoZnVuY3Rpb24gKG5hbWUsIGkpIHtcblxuICAgICAgICB2YXIgbGlzdE11c2ljID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5saXN0TXVzaWNcIik7XG4gICAgICAgIGxpc3RNdXNpYy5pbm5lckhUTUwgKz0gXCJcXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJsaXN0TWFpblxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJkZW1vLWxpc3QtYWN0aW9uIG1kbC1saXN0XFxcIj5cXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtZGwtbGlzdF9faXRlbVxcXCI+XFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJtZGwtbGlzdF9faXRlbS1wcmltYXJ5LWNvbnRlbnRcXFwiPlxcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibWF0ZXJpYWwtaWNvbnMgbWRsLWxpc3RfX2l0ZW0tYXZhdGFyXFxcIj5wZXJzb248L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPlwiICsgbmFtZS5hcnRpc3RfbmFtZSArIFwiIDwvc3Bhbj48c3BhbiBjbGFzcz1cXFwibWRsLWxpc3RfX2l0ZW0tc2Vjb25kYXJ5LWNvbnRlbnRcXFwiPjxzcGFuPiBcIiArIG5hbWUudHJhY2tfZHVyYXRpb24gKyBcIiA8L3NwYW4+PC9zcGFuPlxcbiAgICAgICAgICAgICAgICA8L3NwYW4+XFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XFxcIm1hdGVyaWFsLWljb25zIG1haW5QbGF5XFxcIiBkYXRhLWluZGV4PVxcXCJcIiArIGkgKyBcIlxcXCI+cGxheV9jaXJjbGVfZmlsbGVkPC9kaXY+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XCI7XG4gICAgICB9KTtcblxuICAgICAgdmFyIGJ0bkFycmF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1haW5QbGF5Jyk7XG4gICAgICBidG5BcnJheS5mb3JFYWNoKGZ1bmN0aW9uIChidG4pIHtcbiAgICAgICAgdmFyIGRhdGEgPSBkYXRhTU07XG4gICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCwgZGF0YSkge1xuICAgICAgICAgIHJldHVybiAoMCwgX2V2ZW50SGFuZGxlcjIuZGVmYXVsdCkoZGF0YU1NLCBldmVudCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIHZhciB0cmFja0luZGV4ID0gMDtcblxuICAgICAgdmFyIEF1ZGlvUGxheWVyID0geWEubXVzaWMuQXVkaW87XG5cbiAgICAgIHZhciBhdWRpb1BsYXllciA9IG5ldyBBdWRpb1BsYXllcihudWxsLCB0aGlzLmRvbS5vdmVybGF5KTtcblxuICAgICAgdmFyIHN0YXJ0UGxheSA9IGZ1bmN0aW9uIHN0YXJ0UGxheSgpIHtcbiAgICAgICAgdmFyIHRyYWNrID0gdHJhY2tVcmxzW3RyYWNrSW5kZXhdO1xuICAgICAgICBpZiAoYXVkaW9QbGF5ZXIuaXNQcmVsb2FkZWQodHJhY2spKSB7XG4gICAgICAgICAgYXVkaW9QbGF5ZXIucGxheVByZWxvYWRlZCh0cmFjayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXVkaW9QbGF5ZXIucGxheSh0cmFjayk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIGF1ZGlvUGxheWVyLm9uKHlhLm11c2ljLkF1ZGlvLkVWRU5UX0xPQURFRCwgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodHJhY2tJbmRleCArIDEgPCB0cmFja1VybHMubGVuZ3RoKSB7XG4gICAgICAgICAgYXVkaW9QbGF5ZXIucHJlbG9hZCh0cmFja1VybHNbdHJhY2tJbmRleCArIDFdKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZG9tLnBsYXkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICBjb25zb2xlLmxvZyhcInR1dFBsYXlcIik7XG5cbiAgICAgICAgdmFyIHRyYWNrRHVyYXRpb24gPSBkYXRhTU0uYVRyYWNrc1swXS50cmFja19kdXJhdGlvbjsgLy9kYXRhTU0uYVRyYWNrc1sxMF0udHJhY2tfZHVyYXRpb247IC8vIHNlYyAzOjMwXG4gICAgICAgIHRoaXMuZG9tLmR1cmF0aW9uLmlubmVySFRNTCA9IHRyYWNrRHVyYXRpb247XG4gICAgICAgIHZhciBtYXhEdXJhdGlvbkFyciA9IHRyYWNrRHVyYXRpb24uc3BsaXQoXCI6XCIpOyAvL1szLDMwXVxuICAgICAgICB2YXIgbWF4RHVyYXRpb25TZWMgPSBtYXhEdXJhdGlvbkFyclswXSAqIDYwICsgK21heER1cmF0aW9uQXJyWzFdOyAvL9C/0LXRgNC10LLQvtC0INCyINGB0LXQutGD0L3QtNGLIDIxMHNlYyAobnVtYmVyKVxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgICAgZnVuY3Rpb24gcHJpbnROdW1iZXJzVGltZW91dChtYXhEdXJhdGlvblNlYykge1xuXG4gICAgICAgICAgdmFyIGkgPSAxO1xuICAgICAgICAgIHZhciB0aW1lcklkID0gc2V0VGltZW91dChmdW5jdGlvbiBnbygpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGkpO1xuICAgICAgICAgICAgaWYgKGkgPCBtYXhEdXJhdGlvblNlYykgc2V0VGltZW91dChnbywgMTAwNCk7XG4gICAgICAgICAgICBpKys7XG5cbiAgICAgICAgICAgIHRoYXQuZG9tLnByb2dyZXNzLmN1cnJlbnQuc3R5bGUud2lkdGggPSAoaSAqIDEwMCAvIG1heER1cmF0aW9uU2VjKS50b0ZpeGVkKCkgKyBcIiVcIjsgLy/Qv9GA0L7Qv9C+0YDRhtC40Y9cbiAgICAgICAgICB9LCAxMDA0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vINCy0YvQt9C+0LJcbiAgICAgICAgcHJpbnROdW1iZXJzVGltZW91dChtYXhEdXJhdGlvblNlYyk7XG4gICAgICAgIC8vXG4gICAgICAgIHZhciBzdGF0ZSA9IGF1ZGlvUGxheWVyLmdldFN0YXRlKCk7XG4gICAgICAgIGF1ZGlvUGxheWVyLm9uKHlhLm11c2ljLkF1ZGlvLkVWRU5UX1BST0dSRVNTLCBmdW5jdGlvbiAodGltaW5ncykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKHRpbWluZ3MpO1xuICAgICAgICAgIGlmICh0aW1pbmdzLmxvYWRlZCA8IDEwMCkge1xuICAgICAgICAgICAgX3RoaXMuZG9tLnByb2dyZXNzLmxvYWRlZC5zdHlsZS53aWR0aCA9IHRpbWluZ3MubG9hZGVkICsgXCIlXCI7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIF90aGlzLmRvbS5wcm9ncmVzcy5sb2FkZWQuc3R5bGUud2lkdGggPSBcIjEwMCVcIjtcbiAgICAgICAgICB9O1xuICAgICAgICB9KTtcblxuICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgICAgY2FzZSB5YS5tdXNpYy5BdWRpby5TVEFURV9QTEFZSU5HOlxuICAgICAgICAgICAgYXVkaW9QbGF5ZXIucGF1c2UoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwicGF1c2VcIik7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgIGNhc2UgeWEubXVzaWMuQXVkaW8uU1RBVEVfUEFVU0VEOlxuICAgICAgICAgICAgYXVkaW9QbGF5ZXIucmVzdW1lKCk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInJlc3VtZVwiKTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHN0YXJ0UGxheSgpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICAgIGF1ZGlvUGxheWVyLm9uKHlhLm11c2ljLkF1ZGlvLkVWRU5UX0VOREVELCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRyYWNrSW5kZXgrKztcblxuICAgICAgICBpZiAodHJhY2tJbmRleCA8IHRyYWNrVXJscy5sZW5ndGgpIHtcbiAgICAgICAgICBzdGFydFBsYXkoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuZG9tLnBsYXkuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKF90aGlzMi5kb20ucGxheS5pbm5lckhUTUwgPT09IFwicGxheV9jaXJjbGVfZmlsbGVkXCIpIHtcbiAgICAgICAgICBfdGhpczIuZG9tLnBsYXkuaW5uZXJIVE1MID0gXCJwYXVzZV9jaXJjbGVfZmlsbGVkXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoX3RoaXMyLmRvbS5wbGF5LmlubmVySFRNTCA9PT0gXCJwYXVzZV9jaXJjbGVfZmlsbGVkXCIpIHtcbiAgICAgICAgICBfdGhpczIuZG9tLnBsYXkuaW5uZXJIVE1MID0gXCJwbGF5X2NpcmNsZV9maWxsZWRcIjtcbiAgICAgICAgfVxuICAgICAgfSk7IC8vINGB0L7RgdGC0L7Rj9C90LjQtVxuICAgICAgYXVkaW9QbGF5ZXIub24oeWEubXVzaWMuQXVkaW8uRVZFTlRfU1RBVEUsIGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgICAgY2FzZSB5YS5tdXNpYy5BdWRpby5TVEFURV9JTklUOlxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLQmNC90LjRhtC40LDQu9C40LfQsNGG0LjRjyDQv9C70LXQtdGA0LBcIik7YnJlYWs7XG4gICAgICAgICAgY2FzZSB5YS5tdXNpYy5BdWRpby5TVEFURV9JRExFOlxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLQn9C70LXQtdGAINCz0L7RgtC+0LIg0Lgg0L7QttC40LTQsNC10YJcIik7YnJlYWs7XG4gICAgICAgICAgY2FzZSB5YS5tdXNpYy5BdWRpby5TVEFURV9QTEFZSU5HOlxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLQn9C70LXQtdGAINC/0YDQvtC40LPRgNGL0LLQsNC10YIg0LzRg9C30YvQutGDXCIpO2JyZWFrO1xuICAgICAgICAgIGNhc2UgeWEubXVzaWMuQXVkaW8uU1RBVEVfUEFVU0VEOlxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLQn9C70LXQtdGAINC/0L7RgdGC0LDQstC70LXQvSDQvdCwINC/0LDRg9C30YNcIik7YnJlYWs7XG4gICAgICAgICAgY2FzZSB5YS5tdXNpYy5BdWRpby5TVEFURV9DUkFTSEVEOlxuICAgICAgICAgICAgY29uc29sZS5sb2coXCLQndC1INGD0LTQsNC70L7RgdGMINC40L3QuNGG0LjQsNC70LjQt9C40YDQvtCy0LDRgtGMINC/0LvQtdC10YBcIik7YnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gbmVlZCBzb21lIHRoaW5rIGFib3V0IGl0OlxuICAgICAgdmFyIG9mZnNldExlZnQgPSBmdW5jdGlvbiBvZmZzZXRMZWZ0KG5vZGUpIHtcbiAgICAgICAgdmFyIG9mZnNldCA9IG5vZGUub2Zmc2V0TGVmdDtcbiAgICAgICAgaWYgKG5vZGUub2Zmc2V0UGFyZW50KSB7XG4gICAgICAgICAgb2Zmc2V0ICs9IG9mZnNldExlZnQobm9kZS5vZmZzZXRQYXJlbnQpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvZmZzZXQ7XG4gICAgICB9O1xuXG4gICAgICB2YXIgb2Zmc2V0VG9wID0gZnVuY3Rpb24gb2Zmc2V0VG9wKG5vZGUpIHtcbiAgICAgICAgdmFyIG9mZnNldCA9IG5vZGUub2Zmc2V0VG9wO1xuICAgICAgICBpZiAobm9kZS5vZmZzZXRQYXJlbnQpIHtcbiAgICAgICAgICBvZmZzZXQgKz0gb2Zmc2V0VG9wKG5vZGUub2Zmc2V0UGFyZW50KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2Zmc2V0O1xuICAgICAgfTtcblxuICAgICAgdGhpcy5kb20udm9sdW1lLmJhci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB2b2x1bWUgPSBkb20udm9sdW1lLmJhci52YWx1ZTtcblxuICAgICAgICBfdGhpczIuZG9tLnZvbHVtZS52YWx1ZVZvbHVtZS5pbm5lckhUTUwgPSB2b2x1bWU7XG4gICAgICAgIHZhciB2b2x1bWVTZXQgPSB2b2x1bWUgLyAxMDA7XG4gICAgICAgIGF1ZGlvUGxheWVyLnNldFZvbHVtZSh2b2x1bWVTZXQpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIHRoaXMuZG9tLnByb2dyZXNzLmJhci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgLy8gICBkZWJ1Z2dlcjtcbiAgICAgIC8vICAgdmFyIGZ1bGxXaWR0aCA9IHRoaXMuZG9tLnByb2dyZXNzLmJhci5vZmZzZXRXaWR0aDtcbiAgICAgIC8vICAgdmFyIG9mZnNldCA9IG9mZnNldExlZnQodGhpcy5kb20ucHJvZ3Jlc3MuYmFyKTtcblxuICAgICAgLy8gICB2YXIgcmVsYXRpdmVQb3NpdGlvbiA9IE1hdGgubWF4KFxuICAgICAgLy8gICAgIDAsXG4gICAgICAvLyAgICAgTWF0aC5taW4oMSwgKChldnQucGFnZVggfHwgZXZ0LnNjcmVlblgpIC0gb2Zmc2V0KSAvIGZ1bGxXaWR0aClcbiAgICAgIC8vICAgKTtcbiAgICAgIC8vICAgdmFyIGR1cmF0aW9uID0gYXVkaW9QbGF5ZXIuZ2V0RHVyYXRpb24oMSk7XG5cbiAgICAgIC8vICAgYXVkaW9QbGF5ZXIuc2V0UG9zaXRpb24oZHVyYXRpb24gKiByZWxhdGl2ZVBvc2l0aW9uKTtcbiAgICAgIC8vIH0pO1xuXG4gICAgfVxuICB9XSk7XG5cbiAgcmV0dXJuIEFwaUNvbm5lY3Q7XG59KCk7XG5cbmV4cG9ydHMuQXBpQ29ubmVjdCA9IEFwaUNvbm5lY3Q7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbUZ3YVVOdmJtNWxZM1F1YW5NaVhTd2libUZ0WlhNaU9sc2lRVkJKWDB0RldWOU1RVk5VUmswaUxDSkJVRWxmUzBWWlgwWk5RU0lzSWlRa0lpd2ljM1J5SWl3aVpHOWpkVzFsYm5RaUxDSnhkV1Z5ZVZObGJHVmpkRzl5SWl3aVFYQnBRMjl1Ym1WamRDSXNJbVJ2YlNJc0luQnNZWGxsY2lJc0luQnNZWGtpTENKd1lYVnpaU0lzSW5CeWIyZHlaWE56SWl3aVltRnlJaXdpYkc5aFpHVmtJaXdpWTNWeWNtVnVkQ0lzSW1SMWNtRjBhVzl1SWl3aWRtOXNkVzFsSWl3aWRtRnNkV1VpTENKMllXeDFaVlp2YkhWdFpTSXNJbkpoWkdsdklpd2liM1psY214aGVTSXNJbVJoZEdGTlRTSXNJa3BUVDA0aUxDSndZWEp6WlNJc0lteHZZMkZzVTNSdmNtRm5aU0lzSW1kbGRFbDBaVzBpTENKamIyNXVaV04wUmsxQklpd2lZMjl1ZEhKdmJITWlMQ0ptWlhSamFDSXNJblJvWlc0aUxDSnlaWE53YjI1elpTSXNJbXB6YjI0aUxDSnpaWFJKZEdWdElpd2ljM1J5YVc1bmFXWjVJaXdpWTI5dWMyOXNaU0lzSW14dlp5SXNJbUZVY21GamEzTWlMQ0owY21GamExOXNhWE4wWlc1ZmRYSnNJaXdpZEhKaFkydFZjbXh6SWl3aWJXRndJaXdpZEhKaFkyc2lMQ0p0WVdsdVEyOXVkR1Z1ZENJc0ltbHVibVZ5U0ZSTlRDSXNJbUZ5ZEdsemRITk9ZVzFsSWl3aWJtRnRaU0lzSW1raUxDSnNhWE4wVFhWemFXTWlMQ0poY25ScGMzUmZibUZ0WlNJc0luUnlZV05yWDJSMWNtRjBhVzl1SWl3aVluUnVRWEp5WVhraUxDSnhkV1Z5ZVZObGJHVmpkRzl5UVd4c0lpd2labTl5UldGamFDSXNJbVJoZEdFaUxDSmlkRzRpTENKaFpHUkZkbVZ1ZEV4cGMzUmxibVZ5SWl3aVpYWmxiblFpTENKMGNtRmphMGx1WkdWNElpd2lRWFZrYVc5UWJHRjVaWElpTENKNVlTSXNJbTExYzJsaklpd2lRWFZrYVc4aUxDSmhkV1JwYjFCc1lYbGxjaUlzSW5OMFlYSjBVR3hoZVNJc0ltbHpVSEpsYkc5aFpHVmtJaXdpY0d4aGVWQnlaV3h2WVdSbFpDSXNJbTl1SWl3aVJWWkZUbFJmVEU5QlJFVkVJaXdpYkdWdVozUm9JaXdpY0hKbGJHOWhaQ0lzSW5SeVlXTnJSSFZ5WVhScGIyNGlMQ0p0WVhoRWRYSmhkR2x2YmtGeWNpSXNJbk53YkdsMElpd2liV0Y0UkhWeVlYUnBiMjVUWldNaUxDSjBhR0YwSWl3aWNISnBiblJPZFcxaVpYSnpWR2x0Wlc5MWRDSXNJblJwYldWeVNXUWlMQ0p6WlhSVWFXMWxiM1YwSWl3aVoyOGlMQ0p6ZEhsc1pTSXNJbmRwWkhSb0lpd2lkRzlHYVhobFpDSXNJbk4wWVhSbElpd2laMlYwVTNSaGRHVWlMQ0pGVmtWT1ZGOVFVazlIVWtWVFV5SXNJblJwYldsdVozTWlMQ0pUVkVGVVJWOVFURUZaU1U1SElpd2lVMVJCVkVWZlVFRlZVMFZFSWl3aWNtVnpkVzFsSWl3aVltbHVaQ0lzSWtWV1JVNVVYMFZPUkVWRUlpd2lSVlpGVGxSZlUxUkJWRVVpTENKVFZFRlVSVjlKVGtsVUlpd2lVMVJCVkVWZlNVUk1SU0lzSWxOVVFWUkZYME5TUVZOSVJVUWlMQ0p2Wm1aelpYUk1aV1owSWl3aWJtOWtaU0lzSW05bVpuTmxkQ0lzSW05bVpuTmxkRkJoY21WdWRDSXNJbTltWm5ObGRGUnZjQ0lzSW5admJIVnRaVk5sZENJc0luTmxkRlp2YkhWdFpTSmRMQ0p0WVhCd2FXNW5jeUk2SWpzN096czdPenM3TzBGQlFVRTdPenM3T3pzN08wRkJSVUVzU1VGQlRVRXNhVUpCUVdsQ0xHdERRVUYyUWp0QlFVTkJMRWxCUVUxRExHTkJRV01zYTBKQlFYQkNPMEZCUTBFc1UwRkJVME1zUlVGQlZDeERRVUZaUXl4SFFVRmFMRVZCUVdsQ08wRkJRMllzVTBGQlQwTXNVMEZCVTBNc1lVRkJWQ3hEUVVGMVFrWXNSMEZCZGtJc1EwRkJVRHRCUVVORU96dEpRVU5MUnl4Vk8wRkJRMG9zZDBKQlFXTTdRVUZCUVRzN1FVRkRXanRCUVVOQkxGTkJRVXRETEVkQlFVd3NSMEZCVnp0QlFVTlVReXhqUVVGUlRpeEhRVUZITEZOQlFVZ3NRMEZFUXpzN1FVRkhWRThzV1VGQlRWQXNSMEZCUnl4UFFVRklMRU5CU0VjN1FVRkpWRkVzWVVGQlQxSXNSMEZCUnl4UlFVRklMRU5CU2tVN08wRkJUMVJUTEdkQ1FVRlZPMEZCUTFKRExHRkJRVXRXTEVkQlFVY3NWMEZCU0N4RFFVUkhPMEZCUlZKWExHZENRVUZSV0N4SFFVRkhMR3RDUVVGSUxFTkJSa0U3UVVGSFVsa3NhVUpCUVZOYUxFZEJRVWNzYlVKQlFVZzdRVUZJUkN4UFFWQkVPMEZCV1ZSaExHZENRVUZWWWl4SFFVRkhMRmRCUVVnc1EwRmFSRHM3UVVGalZHTXNZMEZCVVR0QlFVTk9TaXhoUVVGTFZpeEhRVUZITEZOQlFVZ3NRMEZFUXp0QlFVVk9aU3hsUVVGUFppeEhRVUZITEdOQlFVZ3NRMEZHUkR0QlFVZE9aMElzY1VKQlFXRm9RaXhIUVVGSExHTkJRVWc3UVVGSVVDeFBRV1JET3p0QlFXOUNWR2xDTEdGQlFVOXFRaXhIUVVGSExGZEJRVWdzUTBGd1FrVTdRVUZ4UWxSclFpeGxRVUZUYkVJc1IwRkJSeXhWUVVGSU8wRkJja0pCTEV0QlFWZzdRVUYxUWtRN096czdNa0pCUlUwN1FVRkRUQ3hWUVVGSmJVSXNVMEZCVTBNc1MwRkJTME1zUzBGQlRDeERRVUZYUXl4aFFVRmhReXhQUVVGaUxFTkJRWEZDTEZGQlFYSkNMRU5CUVZnc1MwRkJPRU1zUzBGQlMwTXNWVUZCVEN4RlFVRXpSRHRCUVVOQkxGZEJRVXRETEZGQlFVd3NRMEZCWTA0c1RVRkJaRHRCUVVORU96czdhVU5CUlZrN1FVRkRXRHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVThzZDBSQlEwZERMRWxCUkVnc1EwRkRVVHRCUVVGQkxHVkJRVmxETEZOQlFWTkRMRWxCUVZRc1JVRkJXanRCUVVGQkxFOUJSRklzUlVGRlIwWXNTVUZHU0N4RFFVVlJMR3RDUVVGVk96dEJRVVZrTzBGQlEwRTdRVUZEUVV3c2NVSkJRV0ZSTEU5QlFXSXNRMEZCY1VJc1VVRkJja0lzUlVGQkswSldMRXRCUVV0WExGTkJRVXdzUTBGQlpWb3NUVUZCWml4RFFVRXZRanRCUVVOQkxHVkJRVTlCTEUxQlFWQTdRVUZEUkN4UFFWSklPMEZCVTBRN096czJRa0ZGVVVFc1RTeEZRVUZSTzBGQlFVRTdPMEZCUldaaExHTkJRVkZETEVkQlFWSXNRMEZCV1dRc1QwRkJUMlVzVDBGQlVDeERRVUZsTEVWQlFXWXNSVUZCYlVKRExHZENRVUV2UWp0QlFVTkJPMEZCUTBFc1ZVRkJTVU1zV1VGQldXcENMRTlCUVU5bExFOUJRVkFzUTBGQlpVY3NSMEZCWml4RFFVRnRRaXhWUVVGRFF5eExRVUZFTEVWQlFWYzdRVUZETlVNc1pVRkJUMEVzVFVGQlRVZ3NaMEpCUVdJN1FVRkRSQ3hQUVVabExFTkJRV2hDTzBGQlIwRTdRVUZEUVR0QlFVTkJMRlZCUVVsSkxHTkJRV055UXl4VFFVRlRReXhoUVVGVUxFTkJRWFZDTEdOQlFYWkNMRU5CUVd4Q08wRkJRMEZ2UXl4clFrRkJXVU1zVTBGQldpeEpRVUY1UWl3clFrRkJla0k3UVVGRFFTeFZRVUZKUXl4alFVRmpkRUlzVDBGQlQyVXNUMEZCVUN4RFFVRmxSeXhIUVVGbUxFTkJRVzFDTEZWQlFVTkxMRWxCUVVRc1JVRkJUME1zUTBGQlVDeEZRVUZoT3p0QlFVbG9SQ3haUVVGSlF5eFpRVUZaTVVNc1UwRkJVME1zWVVGQlZDeERRVUYxUWl4WlFVRjJRaXhEUVVGb1FqdEJRVU5CZVVNc2EwSkJRVlZLTEZOQlFWWXNNbFJCVFhOQ1JTeExRVUZMUnl4WFFVNHpRaXgzUlVGTmRVZElMRXRCUVV0SkxHTkJUalZITEhOSVFWRTJSRWdzUTBGU04wUTdRVUZaUkN4UFFXcENhVUlzUTBGQmJFSTdPMEZCYlVKQkxGVkJRVWxKTEZkQlFWYzNReXhUUVVGVE9FTXNaMEpCUVZRc1EwRkJNRUlzVjBGQk1VSXNRMEZCWmp0QlFVTkJSQ3hsUVVGVFJTeFBRVUZVTEVOQlFXbENMR1ZCUVU4N1FVRkRkRUlzV1VGQlNVTXNUMEZCVHk5Q0xFMUJRVmc3UVVGRFFXZERMRmxCUVVsRExHZENRVUZLTEVOQlFYRkNMRTlCUVhKQ0xFVkJRVGhDTEZWQlFVTkRMRXRCUVVRc1JVRkJVVWdzU1VGQlVqdEJRVUZCTEdsQ1FVRnBRaXcwUWtGQllTOUNMRTFCUVdJc1JVRkJjVUpyUXl4TFFVRnlRaXhEUVVGcVFqdEJRVUZCTEZOQlFUbENPMEZCUTBRc1QwRklSRHM3UVVGTlFTeFZRVUZKUXl4aFFVRmhMRU5CUVdwQ096dEJRVVZCTEZWQlFVbERMR05CUVdORExFZEJRVWRETEV0QlFVZ3NRMEZCVTBNc1MwRkJNMEk3TzBGQlJVRXNWVUZCU1VNc1kwRkJZeXhKUVVGSlNpeFhRVUZLTEVOQlFXZENMRWxCUVdoQ0xFVkJRWE5DTEV0QlFVdHNSQ3hIUVVGTUxFTkJRVk5oTEU5QlFTOUNMRU5CUVd4Q096dEJRVVZCTEZWQlFVa3dReXhaUVVGWkxGTkJRVnBCTEZOQlFWa3NSMEZCV1R0QlFVTXhRaXhaUVVGSmRFSXNVVUZCVVVZc1ZVRkJWV3RDTEZWQlFWWXNRMEZCV2p0QlFVTkJMRmxCUVVsTExGbEJRVmxGTEZkQlFWb3NRMEZCZDBKMlFpeExRVUY0UWl4RFFVRktMRVZCUVc5RE8wRkJRMnhEY1VJc2MwSkJRVmxITEdGQlFWb3NRMEZCTUVKNFFpeExRVUV4UWp0QlFVTkVMRk5CUmtRc1RVRkZUenRCUVVOTWNVSXNjMEpCUVZsd1JDeEpRVUZhTEVOQlFXbENLMElzUzBGQmFrSTdRVUZGUkR0QlFVTkdMRTlCVWtRN08wRkJWVUZ4UWl4clFrRkJXVWtzUlVGQldpeERRVUZsVUN4SFFVRkhReXhMUVVGSUxFTkJRVk5ETEV0QlFWUXNRMEZCWlUwc1dVRkJPVUlzUlVGQk5FTXNXVUZCV1R0QlFVTjBSQ3haUVVGSlZpeGhRVUZoTEVOQlFXSXNSMEZCYVVKc1FpeFZRVUZWTmtJc1RVRkJMMElzUlVGQmRVTTdRVUZEY2tOT0xITkNRVUZaVHl4UFFVRmFMRU5CUVc5Q09VSXNWVUZCVld0Q0xHRkJRV0VzUTBGQmRrSXNRMEZCY0VJN1FVRkRSRHRCUVVOR0xFOUJTa1E3TzBGQlQwRXNWMEZCUzJwRUxFZEJRVXdzUTBGQlUwVXNTVUZCVkN4RFFVRmpOa01zWjBKQlFXUXNRMEZCSzBJc1QwRkJMMElzUlVGQmQwTXNXVUZCV1R0QlFVRkJPenRCUVVOc1JIQkNMR2RDUVVGUlF5eEhRVUZTTEVOQlFWa3NVMEZCV2pzN1FVRkZRU3haUVVGSmEwTXNaMEpCUVdkQ2FFUXNUMEZCVDJVc1QwRkJVQ3hEUVVGbExFTkJRV1lzUlVGQmEwSlpMR05CUVhSRExFTkJTR3RFTEVOQlIwYzdRVUZEY2tRc1lVRkJTM3BETEVkQlFVd3NRMEZCVTFFc1VVRkJWQ3hEUVVGclFqSkNMRk5CUVd4Q0xFZEJRVGhDTWtJc1lVRkJPVUk3UVVGRFFTeFpRVUZKUXl4cFFrRkJhVUpFTEdOQlFXTkZMRXRCUVdRc1EwRkJiMElzUjBGQmNFSXNRMEZCY2tJc1EwRk1hMFFzUTBGTFNEdEJRVU12UXl4WlFVRkpReXhwUWtGQmEwSkdMR1ZCUVdVc1EwRkJaaXhKUVVGdlFpeEZRVUZ5UWl4SFFVRXlRaXhEUVVGRFFTeGxRVUZsTEVOQlFXWXNRMEZCYWtRc1EwRk9hMFFzUTBGTmEwSTdRVUZEY0VVc1dVRkJTVWNzVDBGQlR5eEpRVUZZT3p0QlFVVkJMR2xDUVVGVFF5eHRRa0ZCVkN4RFFVRTJRa1lzWTBGQk4wSXNSVUZCTmtNN08wRkJSVE5ETEdOQlFVa3pRaXhKUVVGSkxFTkJRVkk3UVVGRFFTeGpRVUZKT0VJc1ZVRkJWVU1zVjBGQlZ5eFRRVUZUUXl4RlFVRlVMRWRCUVdNN1FVRkRja016UXl4dlFrRkJVVU1zUjBGQlVpeERRVUZaVlN4RFFVRmFPMEZCUTBFc1owSkJRVWxCTEVsQlFVa3lRaXhqUVVGU0xFVkJRWGRDU1N4WFFVRlhReXhGUVVGWUxFVkJRV1VzU1VGQlpqdEJRVU40UW1oRE96dEJRVVZCTkVJc2FVSkJRVXRzUlN4SFFVRk1MRU5CUVZOSkxGRkJRVlFzUTBGQmEwSkhMRTlCUVd4Q0xFTkJRVEJDWjBVc1MwRkJNVUlzUTBGQlowTkRMRXRCUVdoRExFZEJRWGRETEVOQlFVVnNReXhKUVVGSkxFZEJRVXdzUjBGQldUSkNMR05CUVdJc1JVRkJOa0pSTEU5QlFUZENMRXRCUVhsRExFZEJRV3BHTEVOQlRIRkRMRU5CUzJsRU8wRkJRM1pHTEZkQlRtRXNSVUZOV0N4SlFVNVhMRU5CUVdRN1FVRlBSRHM3UVVGRlJEdEJRVU5CVGl3MFFrRkJiMEpHTEdOQlFYQkNPMEZCUTBFN1FVRkRRU3haUVVGSlV5eFJRVUZSY0VJc1dVRkJXWEZDTEZGQlFWb3NSVUZCV2p0QlFVTkJja0lzYjBKQlFWbEpMRVZCUVZvc1EwRkJaVkFzUjBGQlIwTXNTMEZCU0N4RFFVRlRReXhMUVVGVUxFTkJRV1YxUWl4alFVRTVRaXhGUVVFNFF5eHRRa0ZCVnp0QlFVTjJSR3BFTEd0Q1FVRlJReXhIUVVGU0xFTkJRVmxwUkN4UFFVRmFPMEZCUTBFc1kwRkJTVUVzVVVGQlVYWkZMRTFCUVZJc1IwRkJhVUlzUjBGQmNrSXNSVUZCTUVJN1FVRkRlRUlzYTBKQlFVdE9MRWRCUVV3c1EwRkJVMGtzVVVGQlZDeERRVUZyUWtVc1RVRkJiRUlzUTBGQmVVSnBSU3hMUVVGNlFpeERRVUVyUWtNc1MwRkJMMElzUjBGQmRVTkxMRkZCUVZGMlJTeE5RVUZTTEVkQlFXbENMRWRCUVhoRU8wRkJRMFFzVjBGR1JDeE5RVWRMTzBGQlEwZ3NhMEpCUVV0T0xFZEJRVXdzUTBGQlUwa3NVVUZCVkN4RFFVRnJRa1VzVFVGQmJFSXNRMEZCZVVKcFJTeExRVUY2UWl4RFFVRXJRa01zUzBGQkwwSXNSMEZCZFVNc1RVRkJka003UVVGRFJEdEJRVU5HTEZOQlVrUTdPMEZCVlVFc1owSkJRVkZGTEV0QlFWSTdRVUZEUlN4bFFVRkxka0lzUjBGQlIwTXNTMEZCU0N4RFFVRlRReXhMUVVGVUxFTkJRV1Y1UWl4aFFVRndRanRCUVVORmVFSXNkMEpCUVZsdVJDeExRVUZhTzBGQlEwRjNRaXh2UWtGQlVVTXNSMEZCVWl4RFFVRlpMRTlCUVZvN1FVRkRRVHM3UVVGRlJpeGxRVUZMZFVJc1IwRkJSME1zUzBGQlNDeERRVUZUUXl4TFFVRlVMRU5CUVdVd1FpeFpRVUZ3UWp0QlFVTkZla0lzZDBKQlFWa3dRaXhOUVVGYU8wRkJRMEZ5UkN4dlFrRkJVVU1zUjBGQlVpeERRVUZaTEZGQlFWbzdRVUZEUVRzN1FVRkZSanRCUVVORk1rSTdRVUZEUVR0QlFXSktPMEZCWlVRc1QwRnNSSFZETEVOQmEwUjBRekJDTEVsQmJFUnpReXhEUVd0RWFrTXNTVUZzUkdsRExFTkJRWGhET3p0QlFXOUVRVE5DTEd0Q1FVRlpTU3hGUVVGYUxFTkJRV1ZRTEVkQlFVZERMRXRCUVVnc1EwRkJVME1zUzBGQlZDeERRVUZsTmtJc1YwRkJPVUlzUlVGQk1rTXNXVUZCV1R0QlFVTnlSR3BET3p0QlFVVkJMRmxCUVVsQkxHRkJRV0ZzUWl4VlFVRlZOa0lzVFVGQk0wSXNSVUZCYlVNN1FVRkRha05NTzBGQlEwUTdRVUZEUml4UFFVNUVPenRCUVZGQkxGZEJRVXQyUkN4SFFVRk1MRU5CUVZORkxFbEJRVlFzUTBGQll6WkRMR2RDUVVGa0xFTkJRU3RDTEU5QlFTOUNMRVZCUVhkRExGbEJRVTA3UVVGRE5VTXNXVUZCU1N4UFFVRkxMME1zUjBGQlRDeERRVUZUUlN4SlFVRlVMRU5CUVdOcFF5eFRRVUZrTEV0QlFUUkNMRzlDUVVGb1F5eEZRVUZ6UkR0QlFVTndSQ3hwUWtGQlMyNURMRWRCUVV3c1EwRkJVMFVzU1VGQlZDeERRVUZqYVVNc1UwRkJaQ3hIUVVFd1FpeHhRa0ZCTVVJN1FVRkRSQ3hUUVVaRUxFMUJSVThzU1VGQlNTeFBRVUZMYmtNc1IwRkJUQ3hEUVVGVFJTeEpRVUZVTEVOQlFXTnBReXhUUVVGa0xFdEJRVFJDTEhGQ1FVRm9ReXhGUVVGMVJEdEJRVU0xUkN4cFFrRkJTMjVETEVkQlFVd3NRMEZCVTBVc1NVRkJWQ3hEUVVGamFVTXNVMEZCWkN4SFFVRXdRaXh2UWtGQk1VSTdRVUZEUkR0QlFVTkdMRTlCVGtRc1JVRjRTR1VzUTBFNFNGZzdRVUZEU20xQ0xHdENRVUZaU1N4RlFVRmFMRU5CUVdWUUxFZEJRVWRETEV0QlFVZ3NRMEZCVTBNc1MwRkJWQ3hEUVVGbE9FSXNWMEZCT1VJc1JVRkJNa01zVlVGQlZWUXNTMEZCVml4RlFVRnBRanRCUVVNeFJDeG5Ra0ZCVVVFc1MwRkJVanRCUVVORkxHVkJRVXQyUWl4SFFVRkhReXhMUVVGSUxFTkJRVk5ETEV0QlFWUXNRMEZCWlN0Q0xGVkJRWEJDTzBGQlFXZERla1FzYjBKQlFWRkRMRWRCUVZJc1EwRkJXU3h6UWtGQldpeEZRVUZ4UXp0QlFVTnlSU3hsUVVGTGRVSXNSMEZCUjBNc1MwRkJTQ3hEUVVGVFF5eExRVUZVTEVOQlFXVm5ReXhWUVVGd1FqdEJRVUZuUXpGRUxHOUNRVUZSUXl4SFFVRlNMRU5CUVZrc2RVSkJRVm9zUlVGQmMwTTdRVUZEZEVVc1pVRkJTM1ZDTEVkQlFVZERMRXRCUVVnc1EwRkJVME1zUzBGQlZDeERRVUZsZVVJc1lVRkJjRUk3UVVGQmJVTnVSQ3h2UWtGQlVVTXNSMEZCVWl4RFFVRlpMREJDUVVGYUxFVkJRWGxETzBGQlF6VkZMR1ZCUVV0MVFpeEhRVUZIUXl4TFFVRklMRU5CUVZORExFdEJRVlFzUTBGQlpUQkNMRmxCUVhCQ08wRkJRV3REY0VRc2IwSkJRVkZETEVkQlFWSXNRMEZCV1N3d1FrRkJXaXhGUVVGNVF6dEJRVU16UlN4bFFVRkxkVUlzUjBGQlIwTXNTMEZCU0N4RFFVRlRReXhMUVVGVUxFTkJRV1ZwUXl4aFFVRndRanRCUVVGdFF6TkVMRzlDUVVGUlF5eEhRVUZTTEVOQlFWa3NiVU5CUVZvc1JVRkJhMFE3UVVGTWRrWTdRVUZQUkN4UFFWSkVPMEZCVTBFN1FVRkRRU3hWUVVGSk1rUXNZVUZCWVN4VFFVRmlRU3hWUVVGaExFTkJRVlZETEVsQlFWWXNSVUZCWjBJN1FVRkRMMElzV1VGQlNVTXNVMEZCVTBRc1MwRkJTMFFzVlVGQmJFSTdRVUZEUVN4WlFVRkpReXhMUVVGTFJTeFpRVUZVTEVWQlFYVkNPMEZCUTNKQ1JDeHZRa0ZCVlVZc1YwRkJWME1zUzBGQlMwVXNXVUZCYUVJc1EwRkJWanRCUVVORU8wRkJRMFFzWlVGQlQwUXNUVUZCVUR0QlFVTkVMRTlCVGtRN08wRkJVVUVzVlVGQlNVVXNXVUZCV1N4VFFVRmFRU3hUUVVGWkxFTkJRVlZJTEVsQlFWWXNSVUZCWjBJN1FVRkRPVUlzV1VGQlNVTXNVMEZCVTBRc1MwRkJTMGNzVTBGQmJFSTdRVUZEUVN4WlFVRkpTQ3hMUVVGTFJTeFpRVUZVTEVWQlFYVkNPMEZCUTNKQ1JDeHZRa0ZCVlVVc1ZVRkJWVWdzUzBGQlMwVXNXVUZCWml4RFFVRldPMEZCUTBRN1FVRkRSQ3hsUVVGUFJDeE5RVUZRTzBGQlEwUXNUMEZPUkRzN1FVRlJRU3hYUVVGTGVrWXNSMEZCVEN4RFFVRlRVeXhOUVVGVUxFTkJRV2RDU2l4SFFVRm9RaXhEUVVGdlFqQkRMR2RDUVVGd1FpeERRVUZ4UXl4UlFVRnlReXhGUVVFclF5eFpRVUZOTzBGQlEyNUVMRmxCUVVsMFF5eFRRVUZUVkN4SlFVRkpVeXhOUVVGS0xFTkJRVmRLTEVkQlFWZ3NRMEZCWlVzc1MwRkJOVUk3TzBGQlJVRXNaVUZCUzFZc1IwRkJUQ3hEUVVGVFV5eE5RVUZVTEVOQlFXZENSU3hYUVVGb1FpeERRVUUwUW5kQ0xGTkJRVFZDTEVkQlFYZERNVUlzVFVGQmVFTTdRVUZEUVN4WlFVRkpiVVlzV1VGQldXNUdMRk5CUVZNc1IwRkJla0k3UVVGRFFUWkRMRzlDUVVGWmRVTXNVMEZCV2l4RFFVRnpRa1FzVTBGQmRFSTdRVUZEUkN4UFFVNUVPenRCUVZGQk8wRkJRMEU3UVVGRFFUdEJRVU5CT3p0QlFVVkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkhSRHM3T3pzN08xRkJSVTAzUml4VkxFZEJRVUZCTEZVaUxDSm1hV3hsSWpvaVlYQnBRMjl1Ym1WamRDNXFjeUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSW1sdGNHOXlkQ0JsZG1WdWRFaGhibVJzWlhJZ1puSnZiU0FuTGk5b1pXeHdaWEp6TDJWMlpXNTBTR0Z1Wkd4bGNpYzdYRzVjYm1OdmJuTjBJRUZRU1Y5TFJWbGZURUZUVkVaTklEMGdYQ0kxTW1Kak0ySTJaVGcwT0RBM1pHVXdaak0wTkRneU1URXdabVpoTURnek5Gd2lPMXh1WTI5dWMzUWdRVkJKWDB0RldWOUdUVUVnUFNCY0lqSTVWVlF6UzBFNE4xRXpUVlk0VVRGY0lqdGNibVoxYm1OMGFXOXVJQ1FrS0hOMGNpa2dlMXh1SUNCeVpYUjFjbTRnWkc5amRXMWxiblF1Y1hWbGNubFRaV3hsWTNSdmNpaHpkSElwTzF4dWZWeHVZMnhoYzNNZ1FYQnBRMjl1Ym1WamRDQjdYRzRnSUdOdmJuTjBjblZqZEc5eUtDa2dlMXh1SUNBZ0lDOHZJSFJvYVhNdWRISmhZMnRWY214eklEMGdXMTA3WEc0Z0lDQWdkR2hwY3k1a2IyMGdQU0I3WEc0Z0lDQWdJQ0J3YkdGNVpYSTZJQ1FrS0Z3aUxuQnNZWGxsY2x3aUtTeGNibHh1SUNBZ0lDQWdjR3hoZVRvZ0pDUW9YQ0l1Y0d4aGVWd2lLU3hjYmlBZ0lDQWdJSEJoZFhObE9pQWtKQ2hjSWk1d1lYVnpaVndpS1N4Y2JseHVYRzRnSUNBZ0lDQndjbTluY21WemN6b2dlMXh1SUNBZ0lDQWdJQ0JpWVhJNklDUWtLRndpTG5CeWIyZHlaWE56WENJcExGeHVJQ0FnSUNBZ0lDQnNiMkZrWldRNklDUWtLRndpTG5CeWIyZHlaWE56WDJ4dllXUmxaRndpS1N4Y2JpQWdJQ0FnSUNBZ1kzVnljbVZ1ZERvZ0pDUW9YQ0l1Y0hKdlozSmxjM05mWTNWeWNtVnVkRndpS1Z4dUlDQWdJQ0FnZlN4Y2JpQWdJQ0FnSUdSMWNtRjBhVzl1T2lBa0pDaGNJaTVrZFhKaGRHbHZibHdpS1N4Y2JseHVJQ0FnSUNBZ2RtOXNkVzFsT2lCN1hHNGdJQ0FnSUNBZ0lHSmhjam9nSkNRb1hDSXVkbTlzZFcxbFhDSXBMRnh1SUNBZ0lDQWdJQ0IyWVd4MVpUb2dKQ1FvWENJdWRtOXNkVzFsWDE5aVlYSmNJaWtzWEc0Z0lDQWdJQ0FnSUhaaGJIVmxWbTlzZFcxbE9pQWtKQ2hjSWk1MllXeDFaVlp2YkhWdFpWd2lLVnh1SUNBZ0lDQWdmU3hjYmx4dUlDQWdJQ0FnY21Ga2FXODZJQ1FrS0Z3aUxtUnBkbEpoWkdsdlhDSXBMRnh1SUNBZ0lDQWdiM1psY214aGVUb2dKQ1FvWENJdWIzWmxjbXhoZVZ3aUtWeHVJQ0FnSUgxY2JpQWdmVnh1WEc0Z0lHbHVhWFFvS1NCN1hHNGdJQ0FnYkdWMElHUmhkR0ZOVFNBOUlFcFRUMDR1Y0dGeWMyVW9iRzlqWVd4VGRHOXlZV2RsTG1kbGRFbDBaVzBvSjJSaGRHRk5UU2NwS1NCOGZDQjBhR2x6TG1OdmJtNWxZM1JHVFVFb0tUdGNiaUFnSUNCMGFHbHpMbU52Ym5SeWIyeHpLR1JoZEdGTlRTazdYRzRnSUgxY2JseHVJQ0JqYjI1dVpXTjBSazFCS0NrZ2UxeHVJQ0FnSUM4dklHWmxkR05vS0Z4dUlDQWdJQzh2SUNBZ1lHaDBkSEJ6T2k4dlpuSmxaVzExYzJsallYSmphR2wyWlM1dmNtY3ZZWEJwTDJkbGRDOWpkWEpoZEc5eWN5NXFjMjl1UDJGd2FWOXJaWGs5Skh0QlVFbGZTMFZaWDBaTlFYMWdYRzRnSUNBZ0x5OGdLVnh1SUNBZ0lDOHZJQ0FnTG5Sb1pXNG9jbVZ6Y0c5dWMyVWdQVDRnY21WemNHOXVjMlV1YW5OdmJpZ3BLVnh1SUNBZ0lDOHZJQ0FnTG5Sb1pXNG9aR0YwWVNBOVBpQjdYRzRnSUNBZ0x5OGdJQ0FnSUd4bGRDQnRZV2x1SUQwZ1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWhjSWk1dFlXbHVRMjl1ZEdWdWRGd2lLVHRjYmx4dUlDQWdJQzh2SUNBZ2ZTazdYRzRnSUNBZ1ptVjBZMmdvWUdoMGRIQnpPaTh2Wm5KbFpXMTFjMmxqWVhKamFHbDJaUzV2Y21jdmNtVmpaVzUwTG1wemIyNWdLVnh1SUNBZ0lDQWdMblJvWlc0b2NtVnpjRzl1YzJVZ1BUNGdjbVZ6Y0c5dWMyVXVhbk52YmlncEtWeHVJQ0FnSUNBZ0xuUm9aVzRvWkdGMFlVMU5JRDArSUh0Y2JseHVJQ0FnSUNBZ0lDQXZMeUJqYjI1emIyeGxMbXh2Wnloa1lYUmhUVTBwWEc0Z0lDQWdJQ0FnSUM4dklHTnZibk52YkdVdWJHOW5LR1JoZEdGTlRTNWhWSEpoWTJ0eld6RXdYUzUwY21GamExOWtkWEpoZEdsdmJpazdYRzRnSUNBZ0lDQWdJR3h2WTJGc1UzUnZjbUZuWlM1elpYUkpkR1Z0S0Nka1lYUmhUVTBuTENCS1UwOU9Mbk4wY21sdVoybG1lU2hrWVhSaFRVMHBLVHRjYmlBZ0lDQWdJQ0FnY21WMGRYSnVJR1JoZEdGTlRUdGNiaUFnSUNBZ0lIMHBPMXh1SUNCOVhHNWNiaUFnWTI5dWRISnZiSE1vWkdGMFlVMU5LU0I3WEc1Y2JpQWdJQ0JqYjI1emIyeGxMbXh2Wnloa1lYUmhUVTB1WVZSeVlXTnJjMXN4TmwwdWRISmhZMnRmYkdsemRHVnVYM1Z5YkNrN1hHNGdJQ0FnTHk5c1pYUWdiR2x6ZEdWdVZYSnNJRDBnWkdGMFlVMU5MbUZVY21GamEzTmJNVEJkTG5SeVlXTnJYMnhwYzNSbGJsOTFjbXc3WEc0Z0lDQWdiR1YwSUhSeVlXTnJWWEpzY3lBOUlHUmhkR0ZOVFM1aFZISmhZMnR6TG0xaGNDZ29kSEpoWTJzcElEMCtJSHRjYmlBZ0lDQWdJSEpsZEhWeWJpQjBjbUZqYXk1MGNtRmphMTlzYVhOMFpXNWZkWEpzTzF4dUlDQWdJSDBwWEc0Z0lDQWdMeThnZEhKaFkydFZjbXh6TG5WdWMyaHBablFvWkdGMFlVMU5MbUZVY21GamEzTmJNVEJkTG5SeVlXTnJYMnhwYzNSbGJsOTFjbXdwTzF4dUlDQWdJQzh2SUdOdmJuTnZiR1V1Ykc5bktDZDBhR2x6SUhSeVlXd2hJU0VuTENCMGNtRmphMVZ5YkhNcE8xeHVJQ0FnSUd4bGRDQnRZV2x1UTI5dWRHVnVkQ0E5SUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9YQ0l1YldGcGJrTnZiblJsYm5SY0lpazdYRzRnSUNBZ2JXRnBia052Ym5SbGJuUXVhVzV1WlhKSVZFMU1JQ3M5SUNjOFpHbDJJR05zWVhOelBWd2liR2x6ZEUxMWMybGpYQ0krUEM5a2FYWStKenRjYmlBZ0lDQnNaWFFnWVhKMGFYTjBjMDVoYldVZ1BTQmtZWFJoVFUwdVlWUnlZV05yY3k1dFlYQW9LRzVoYldVc0lHa3BJRDArSUh0Y2JseHVYRzVjYmlBZ0lDQWdJR3hsZENCc2FYTjBUWFZ6YVdNZ1BTQmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0Z3aUxteHBjM1JOZFhOcFkxd2lLVHRjYmlBZ0lDQWdJR3hwYzNSTmRYTnBZeTVwYm01bGNraFVUVXdnS3owZ1lGeHVJQ0FnSUNBZ1BHUnBkaUJqYkdGemN6MWNJbXhwYzNSTllXbHVYQ0krWEc0Z0lDQWdJQ0FnSUR4a2FYWWdZMnhoYzNNOVhDSmtaVzF2TFd4cGMzUXRZV04wYVc5dUlHMWtiQzFzYVhOMFhDSStYRzRnSUNBZ0lDQWdJQ0FnSUNBOFpHbDJJR05zWVhOelBWd2liV1JzTFd4cGMzUmZYMmwwWlcxY0lqNWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQThjM0JoYmlCamJHRnpjejFjSW0xa2JDMXNhWE4wWDE5cGRHVnRMWEJ5YVcxaGNua3RZMjl1ZEdWdWRGd2lQbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBOFpHbDJJR05zWVhOelBWd2liV0YwWlhKcFlXd3RhV052Ym5NZ2JXUnNMV3hwYzNSZlgybDBaVzB0WVhaaGRHRnlYQ0krY0dWeWMyOXVQQzlrYVhZK1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRHh6Y0dGdVBpUjdibUZ0WlM1aGNuUnBjM1JmYm1GdFpYMGdQQzl6Y0dGdVBqeHpjR0Z1SUdOc1lYTnpQVndpYldSc0xXeHBjM1JmWDJsMFpXMHRjMlZqYjI1a1lYSjVMV052Ym5SbGJuUmNJajQ4YzNCaGJqNGdKSHR1WVcxbExuUnlZV05yWDJSMWNtRjBhVzl1ZlNBOEwzTndZVzQrUEM5emNHRnVQbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRHd2YzNCaGJqNWNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQThaR2wySUdOc1lYTnpQVndpYldGMFpYSnBZV3d0YVdOdmJuTWdiV0ZwYmxCc1lYbGNJaUJrWVhSaExXbHVaR1Y0UFZ3aUpIdHBmVndpUG5Cc1lYbGZZMmx5WTJ4bFgyWnBiR3hsWkR3dlpHbDJQbHh1SUNBZ0lDQWdJQ0FnSUNBZ1BDOWthWFkrWEc0Z0lDQWdJQ0FnSUR3dlpHbDJQbHh1SUNBZ0lEd3ZaR2wyUG1BN1hHNGdJQ0FnZlNrN1hHNWNiaUFnSUNCc1pYUWdZblJ1UVhKeVlYa2dQU0JrYjJOMWJXVnVkQzV4ZFdWeWVWTmxiR1ZqZEc5eVFXeHNLQ2N1YldGcGJsQnNZWGtuS1R0Y2JpQWdJQ0JpZEc1QmNuSmhlUzVtYjNKRllXTm9LR0owYmlBOVBpQjdYRzRnSUNBZ0lDQnNaWFFnWkdGMFlTQTlJR1JoZEdGTlRUdGNiaUFnSUNBZ0lHSjBiaTVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLQ2RqYkdsamF5Y3NJQ2hsZG1WdWRDd2daR0YwWVNrZ1BUNGdaWFpsYm5SSVlXNWtiR1Z5S0dSaGRHRk5UU3dnWlhabGJuUXBLVnh1SUNBZ0lIMHBYRzVjYmx4dUlDQWdJR3hsZENCMGNtRmphMGx1WkdWNElEMGdNRHRjYmx4dUlDQWdJR3hsZENCQmRXUnBiMUJzWVhsbGNpQTlJSGxoTG0xMWMybGpMa0YxWkdsdk8xeHVYRzRnSUNBZ2JHVjBJR0YxWkdsdlVHeGhlV1Z5SUQwZ2JtVjNJRUYxWkdsdlVHeGhlV1Z5S0c1MWJHd3NJSFJvYVhNdVpHOXRMbTkyWlhKc1lYa3BPMXh1WEc0Z0lDQWdkbUZ5SUhOMFlYSjBVR3hoZVNBOUlHWjFibU4wYVc5dUlDZ3BJSHRjYmlBZ0lDQWdJSFpoY2lCMGNtRmpheUE5SUhSeVlXTnJWWEpzYzF0MGNtRmphMGx1WkdWNFhUdGNiaUFnSUNBZ0lHbG1JQ2hoZFdScGIxQnNZWGxsY2k1cGMxQnlaV3h2WVdSbFpDaDBjbUZqYXlrcElIdGNiaUFnSUNBZ0lDQWdZWFZrYVc5UWJHRjVaWEl1Y0d4aGVWQnlaV3h2WVdSbFpDaDBjbUZqYXlrN1hHNGdJQ0FnSUNCOUlHVnNjMlVnZTF4dUlDQWdJQ0FnSUNCaGRXUnBiMUJzWVhsbGNpNXdiR0Y1S0hSeVlXTnJLVHRjYmx4dUlDQWdJQ0FnZlZ4dUlDQWdJSDA3WEc1Y2JpQWdJQ0JoZFdScGIxQnNZWGxsY2k1dmJpaDVZUzV0ZFhOcFl5NUJkV1JwYnk1RlZrVk9WRjlNVDBGRVJVUXNJR1oxYm1OMGFXOXVJQ2dwSUh0Y2JpQWdJQ0FnSUdsbUlDaDBjbUZqYTBsdVpHVjRJQ3NnTVNBOElIUnlZV05yVlhKc2N5NXNaVzVuZEdncElIdGNiaUFnSUNBZ0lDQWdZWFZrYVc5UWJHRjVaWEl1Y0hKbGJHOWhaQ2gwY21GamExVnliSE5iZEhKaFkydEpibVJsZUNBcklERmRLVHRjYmlBZ0lDQWdJSDFjYmlBZ0lDQjlLVHRjYmx4dVhHNGdJQ0FnZEdocGN5NWtiMjB1Y0d4aGVTNWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtGd2lZMnhwWTJ0Y0lpd2dablZ1WTNScGIyNGdLQ2tnZTF4dUlDQWdJQ0FnWTI5dWMyOXNaUzVzYjJjb1hDSjBkWFJRYkdGNVhDSXBPMXh1WEc0Z0lDQWdJQ0JzWlhRZ2RISmhZMnRFZFhKaGRHbHZiaUE5SUdSaGRHRk5UUzVoVkhKaFkydHpXekJkTG5SeVlXTnJYMlIxY21GMGFXOXVPeTh2WkdGMFlVMU5MbUZVY21GamEzTmJNVEJkTG5SeVlXTnJYMlIxY21GMGFXOXVPeUF2THlCelpXTWdNem96TUZ4dUlDQWdJQ0FnZEdocGN5NWtiMjB1WkhWeVlYUnBiMjR1YVc1dVpYSklWRTFNSUQwZ2RISmhZMnRFZFhKaGRHbHZianRjYmlBZ0lDQWdJR3hsZENCdFlYaEVkWEpoZEdsdmJrRnljaUE5SUhSeVlXTnJSSFZ5WVhScGIyNHVjM0JzYVhRb1hDSTZYQ0lwT3lBdkwxc3pMRE13WFZ4dUlDQWdJQ0FnYkdWMElHMWhlRVIxY21GMGFXOXVVMlZqSUQwZ0tHMWhlRVIxY21GMGFXOXVRWEp5V3pCZElDb2dOakFwSUNzZ0syMWhlRVIxY21GMGFXOXVRWEp5V3pGZE95QXZMOUMvMExYUmdOQzEwTExRdnRDMElOQ3lJTkdCMExYUXV0R0QwTDNRdE5HTElESXhNSE5sWXlBb2JuVnRZbVZ5S1Z4dUlDQWdJQ0FnYkdWMElIUm9ZWFFnUFNCMGFHbHpPMXh1WEc0Z0lDQWdJQ0JtZFc1amRHbHZiaUJ3Y21sdWRFNTFiV0psY25OVWFXMWxiM1YwS0cxaGVFUjFjbUYwYVc5dVUyVmpLU0I3WEc1Y2JpQWdJQ0FnSUNBZ2RtRnlJR2tnUFNBeE8xeHVJQ0FnSUNBZ0lDQjJZWElnZEdsdFpYSkpaQ0E5SUhObGRGUnBiV1Z2ZFhRb1puVnVZM1JwYjI0Z1oyOG9LU0I3WEc0Z0lDQWdJQ0FnSUNBZ1kyOXVjMjlzWlM1c2IyY29hU2s3WEc0Z0lDQWdJQ0FnSUNBZ2FXWWdLR2tnUENCdFlYaEVkWEpoZEdsdmJsTmxZeWtnYzJWMFZHbHRaVzkxZENobmJ5d2dNVEF3TkNrN1hHNGdJQ0FnSUNBZ0lDQWdhU3NyTzF4dVhHNGdJQ0FnSUNBZ0lDQWdkR2hoZEM1a2IyMHVjSEp2WjNKbGMzTXVZM1Z5Y21WdWRDNXpkSGxzWlM1M2FXUjBhQ0E5SUNnb2FTQXFJREV3TUNrZ0x5QnRZWGhFZFhKaGRHbHZibE5sWXlrdWRHOUdhWGhsWkNncElDc2dYQ0lsWENJN0lDOHYwTC9SZ05DKzBML1F2dEdBMFliUXVOR1BYRzRnSUNBZ0lDQWdJSDBzSURFd01EUXBPMXh1SUNBZ0lDQWdmVnh1WEc0Z0lDQWdJQ0F2THlEUXN0R0wwTGZRdnRDeVhHNGdJQ0FnSUNCd2NtbHVkRTUxYldKbGNuTlVhVzFsYjNWMEtHMWhlRVIxY21GMGFXOXVVMlZqS1R0Y2JpQWdJQ0FnSUM4dlhHNGdJQ0FnSUNCc1pYUWdjM1JoZEdVZ1BTQmhkV1JwYjFCc1lYbGxjaTVuWlhSVGRHRjBaU2dwTzF4dUlDQWdJQ0FnWVhWa2FXOVFiR0Y1WlhJdWIyNG9lV0V1YlhWemFXTXVRWFZrYVc4dVJWWkZUbFJmVUZKUFIxSkZVMU1zSUhScGJXbHVaM01nUFQ0Z2UxeHVJQ0FnSUNBZ0lDQmpiMjV6YjJ4bExteHZaeWgwYVcxcGJtZHpLVHRjYmlBZ0lDQWdJQ0FnYVdZZ0tIUnBiV2x1WjNNdWJHOWhaR1ZrSUR3Z01UQXdLU0I3WEc0Z0lDQWdJQ0FnSUNBZ2RHaHBjeTVrYjIwdWNISnZaM0psYzNNdWJHOWhaR1ZrTG5OMGVXeGxMbmRwWkhSb0lEMGdkR2x0YVc1bmN5NXNiMkZrWldRZ0t5QmNJaVZjSWp0Y2JpQWdJQ0FnSUNBZ2ZWeHVJQ0FnSUNBZ0lDQmxiSE5sSUh0Y2JpQWdJQ0FnSUNBZ0lDQjBhR2x6TG1SdmJTNXdjbTluY21WemN5NXNiMkZrWldRdWMzUjViR1V1ZDJsa2RHZ2dQU0JjSWpFd01DVmNJanRjYmlBZ0lDQWdJQ0FnZlR0Y2JpQWdJQ0FnSUgwcE8xeHVYRzRnSUNBZ0lDQnpkMmwwWTJnZ0tITjBZWFJsS1NCN1hHNGdJQ0FnSUNBZ0lHTmhjMlVnZVdFdWJYVnphV011UVhWa2FXOHVVMVJCVkVWZlVFeEJXVWxPUnpwY2JpQWdJQ0FnSUNBZ0lDQmhkV1JwYjFCc1lYbGxjaTV3WVhWelpTZ3BPMXh1SUNBZ0lDQWdJQ0FnSUdOdmJuTnZiR1V1Ykc5bktGd2ljR0YxYzJWY0lpazdYRzRnSUNBZ0lDQWdJQ0FnWW5KbFlXczdYRzVjYmlBZ0lDQWdJQ0FnWTJGelpTQjVZUzV0ZFhOcFl5NUJkV1JwYnk1VFZFRlVSVjlRUVZWVFJVUTZYRzRnSUNBZ0lDQWdJQ0FnWVhWa2FXOVFiR0Y1WlhJdWNtVnpkVzFsS0NrN1hHNGdJQ0FnSUNBZ0lDQWdZMjl1YzI5c1pTNXNiMmNvWENKeVpYTjFiV1ZjSWlrN1hHNGdJQ0FnSUNBZ0lDQWdZbkpsWVdzN1hHNWNiaUFnSUNBZ0lDQWdaR1ZtWVhWc2REcGNiaUFnSUNBZ0lDQWdJQ0J6ZEdGeWRGQnNZWGtvS1R0Y2JpQWdJQ0FnSUNBZ0lDQmljbVZoYXp0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0I5TG1KcGJtUW9kR2hwY3lrcE8xeHVYRzRnSUNBZ1lYVmthVzlRYkdGNVpYSXViMjRvZVdFdWJYVnphV011UVhWa2FXOHVSVlpGVGxSZlJVNUVSVVFzSUdaMWJtTjBhVzl1SUNncElIdGNiaUFnSUNBZ0lIUnlZV05yU1c1a1pYZ3JLenRjYmx4dUlDQWdJQ0FnYVdZZ0tIUnlZV05yU1c1a1pYZ2dQQ0IwY21GamExVnliSE11YkdWdVozUm9LU0I3WEc0Z0lDQWdJQ0FnSUhOMFlYSjBVR3hoZVNncE8xeHVJQ0FnSUNBZ2ZWeHVJQ0FnSUgwcE8xeHVYRzRnSUNBZ2RHaHBjeTVrYjIwdWNHeGhlUzVoWkdSRmRtVnVkRXhwYzNSbGJtVnlLRndpWTJ4cFkydGNJaXdnS0NrZ1BUNGdlMXh1SUNBZ0lDQWdhV1lnS0hSb2FYTXVaRzl0TG5Cc1lYa3VhVzV1WlhKSVZFMU1JRDA5UFNCY0luQnNZWGxmWTJseVkyeGxYMlpwYkd4bFpGd2lLU0I3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVaRzl0TG5Cc1lYa3VhVzV1WlhKSVZFMU1JRDBnWENKd1lYVnpaVjlqYVhKamJHVmZabWxzYkdWa1hDSTdYRzRnSUNBZ0lDQjlJR1ZzYzJVZ2FXWWdLSFJvYVhNdVpHOXRMbkJzWVhrdWFXNXVaWEpJVkUxTUlEMDlQU0JjSW5CaGRYTmxYMk5wY21Oc1pWOW1hV3hzWldSY0lpa2dlMXh1SUNBZ0lDQWdJQ0IwYUdsekxtUnZiUzV3YkdGNUxtbHVibVZ5U0ZSTlRDQTlJRndpY0d4aGVWOWphWEpqYkdWZlptbHNiR1ZrWENJN1hHNGdJQ0FnSUNCOVhHNGdJQ0FnZlNrN0lDOHZJTkdCMEw3UmdkR0MwTDdSajlDOTBMalF0Vnh1SUNBZ0lHRjFaR2x2VUd4aGVXVnlMbTl1S0hsaExtMTFjMmxqTGtGMVpHbHZMa1ZXUlU1VVgxTlVRVlJGTENCbWRXNWpkR2x2YmlBb2MzUmhkR1VwSUh0Y2JpQWdJQ0FnSUhOM2FYUmphQ0FvYzNSaGRHVXBJSHRjYmlBZ0lDQWdJQ0FnWTJGelpTQjVZUzV0ZFhOcFl5NUJkV1JwYnk1VFZFRlVSVjlKVGtsVU9pQmpiMjV6YjJ4bExteHZaeWhjSXRDWTBMM1F1TkdHMExqUXNOQzcwTGpRdDlDdzBZYlF1TkdQSU5DLzBMdlF0ZEMxMFlEUXNGd2lLVHNnWW5KbFlXczdYRzRnSUNBZ0lDQWdJR05oYzJVZ2VXRXViWFZ6YVdNdVFYVmthVzh1VTFSQlZFVmZTVVJNUlRvZ1kyOXVjMjlzWlM1c2IyY29YQ0xRbjlDNzBMWFF0ZEdBSU5DejBMN1JndEMrMExJZzBMZ2cwTDdRdHRDNDBMVFFzTkMxMFlKY0lpazdJR0p5WldGck8xeHVJQ0FnSUNBZ0lDQmpZWE5sSUhsaExtMTFjMmxqTGtGMVpHbHZMbE5VUVZSRlgxQk1RVmxKVGtjNklHTnZibk52YkdVdWJHOW5LRndpMEovUXU5QzEwTFhSZ0NEUXY5R0EwTDdRdU5DejBZRFJpOUN5MExEUXRkR0NJTkM4MFlQUXQ5R0wwTHJSZzF3aUtUc2dZbkpsWVdzN1hHNGdJQ0FnSUNBZ0lHTmhjMlVnZVdFdWJYVnphV011UVhWa2FXOHVVMVJCVkVWZlVFRlZVMFZFT2lCamIyNXpiMnhsTG14dlp5aGNJdENmMEx2UXRkQzEwWUFnMEwvUXZ0R0IwWUxRc05DeTBMdlF0ZEM5SU5DOTBMQWcwTC9Rc05HRDBMZlJnMXdpS1RzZ1luSmxZV3M3WEc0Z0lDQWdJQ0FnSUdOaGMyVWdlV0V1YlhWemFXTXVRWFZrYVc4dVUxUkJWRVZmUTFKQlUwaEZSRG9nWTI5dWMyOXNaUzVzYjJjb1hDTFFuZEMxSU5HRDBMVFFzTkM3MEw3UmdkR01JTkM0MEwzUXVOR0cwTGpRc05DNzBMalF0OUM0MFlEUXZ0Q3kwTERSZ3RHTUlOQy8wTHZRdGRDMTBZQmNJaWs3SUdKeVpXRnJPMXh1SUNBZ0lDQWdmVnh1SUNBZ0lIMHBPMXh1SUNBZ0lDOHZJRzVsWldRZ2MyOXRaU0IwYUdsdWF5QmhZbTkxZENCcGREcGNiaUFnSUNCMllYSWdiMlptYzJWMFRHVm1kQ0E5SUdaMWJtTjBhVzl1SUNodWIyUmxLU0I3WEc0Z0lDQWdJQ0IyWVhJZ2IyWm1jMlYwSUQwZ2JtOWtaUzV2Wm1aelpYUk1aV1owTzF4dUlDQWdJQ0FnYVdZZ0tHNXZaR1V1YjJabWMyVjBVR0Z5Wlc1MEtTQjdYRzRnSUNBZ0lDQWdJRzltWm5ObGRDQXJQU0J2Wm1aelpYUk1aV1owS0c1dlpHVXViMlptYzJWMFVHRnlaVzUwS1R0Y2JpQWdJQ0FnSUgxY2JpQWdJQ0FnSUhKbGRIVnliaUJ2Wm1aelpYUTdYRzRnSUNBZ2ZUdGNibHh1SUNBZ0lIWmhjaUJ2Wm1aelpYUlViM0FnUFNCbWRXNWpkR2x2YmlBb2JtOWtaU2tnZTF4dUlDQWdJQ0FnZG1GeUlHOW1abk5sZENBOUlHNXZaR1V1YjJabWMyVjBWRzl3TzF4dUlDQWdJQ0FnYVdZZ0tHNXZaR1V1YjJabWMyVjBVR0Z5Wlc1MEtTQjdYRzRnSUNBZ0lDQWdJRzltWm5ObGRDQXJQU0J2Wm1aelpYUlViM0FvYm05a1pTNXZabVp6WlhSUVlYSmxiblFwTzF4dUlDQWdJQ0FnZlZ4dUlDQWdJQ0FnY21WMGRYSnVJRzltWm5ObGREdGNiaUFnSUNCOU8xeHVYRzRnSUNBZ2RHaHBjeTVrYjIwdWRtOXNkVzFsTG1KaGNpNWhaR1JGZG1WdWRFeHBjM1JsYm1WeUtDZGphR0Z1WjJVbkxDQW9LU0E5UGlCN1hHNGdJQ0FnSUNCc1pYUWdkbTlzZFcxbElEMGdaRzl0TG5admJIVnRaUzVpWVhJdWRtRnNkV1U3WEc1Y2JpQWdJQ0FnSUhSb2FYTXVaRzl0TG5admJIVnRaUzUyWVd4MVpWWnZiSFZ0WlM1cGJtNWxja2hVVFV3Z1BTQjJiMngxYldVN1hHNGdJQ0FnSUNCc1pYUWdkbTlzZFcxbFUyVjBJRDBnZG05c2RXMWxJQzhnTVRBd08xeHVJQ0FnSUNBZ1lYVmthVzlRYkdGNVpYSXVjMlYwVm05c2RXMWxLSFp2YkhWdFpWTmxkQ2s3WEc0Z0lDQWdmU2s3WEc1Y2JpQWdJQ0F2THlCMGFHbHpMbVJ2YlM1d2NtOW5jbVZ6Y3k1aVlYSXVZV1JrUlhabGJuUk1hWE4wWlc1bGNpaGNJbU5zYVdOclhDSXNJR1oxYm1OMGFXOXVJQ2hsZG5RcElIdGNiaUFnSUNBdkx5QWdJR1JsWW5WbloyVnlPMXh1SUNBZ0lDOHZJQ0FnZG1GeUlHWjFiR3hYYVdSMGFDQTlJSFJvYVhNdVpHOXRMbkJ5YjJkeVpYTnpMbUpoY2k1dlptWnpaWFJYYVdSMGFEdGNiaUFnSUNBdkx5QWdJSFpoY2lCdlptWnpaWFFnUFNCdlptWnpaWFJNWldaMEtIUm9hWE11Wkc5dExuQnliMmR5WlhOekxtSmhjaWs3WEc1Y2JpQWdJQ0F2THlBZ0lIWmhjaUJ5Wld4aGRHbDJaVkJ2YzJsMGFXOXVJRDBnVFdGMGFDNXRZWGdvWEc0Z0lDQWdMeThnSUNBZ0lEQXNYRzRnSUNBZ0x5OGdJQ0FnSUUxaGRHZ3ViV2x1S0RFc0lDZ29aWFowTG5CaFoyVllJSHg4SUdWMmRDNXpZM0psWlc1WUtTQXRJRzltWm5ObGRDa2dMeUJtZFd4c1YybGtkR2dwWEc0Z0lDQWdMeThnSUNBcE8xeHVJQ0FnSUM4dklDQWdkbUZ5SUdSMWNtRjBhVzl1SUQwZ1lYVmthVzlRYkdGNVpYSXVaMlYwUkhWeVlYUnBiMjRvTVNrN1hHNWNiaUFnSUNBdkx5QWdJR0YxWkdsdlVHeGhlV1Z5TG5ObGRGQnZjMmwwYVc5dUtHUjFjbUYwYVc5dUlDb2djbVZzWVhScGRtVlFiM05wZEdsdmJpazdYRzRnSUNBZ0x5OGdmU2s3WEc1Y2JseHVJQ0I5WEc1OVhHNWxlSEJ2Y25RZ2V5QkJjR2xEYjI1dVpXTjBJSDA3WEc0aVhYMD1cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvY29tcG9uZW50c1xcXFxhcGlDb25uZWN0LmpzXCIsXCIvY29tcG9uZW50c1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoZGF0YU1NLCBldikge1xuICBjb25zb2xlLmxvZyhcInR1dFBsYXlcIik7XG4gIGNvbnNvbGUubG9nKCcgJywgZGF0YU1NLCBldik7XG5cbiAgdmFyIGluZGV4TXVzaWMgPSBldi50YXJnZXQuZGF0YXNldC5pbmRleDsgLy/QuNC90LTQtdC60YEg0YLRgNC10LrQsFxuXG4gIGlmICghaW5kZXhNdXNpYykge1xuICAgIGNvbnNvbGUubG9nKGluZGV4TXVzaWMpO1xuICAgIGluZGV4TXVzaWMgPSAwO1xuICB9O1xuXG4gIHZhciB0cmFja0R1cmF0aW9uID0gZGF0YU1NLmFUcmFja3NbaW5kZXhNdXNpY10udHJhY2tfZHVyYXRpb247IC8vZGF0YU1NLmFUcmFja3NbMTBdLnRyYWNrX2R1cmF0aW9uOyAvLyBzZWMgMzozMFxuICBkb20uZHVyYXRpb24uaW5uZXJIVE1MID0gdHJhY2tEdXJhdGlvbjtcbiAgdmFyIG1heER1cmF0aW9uQXJyID0gdHJhY2tEdXJhdGlvbi5zcGxpdChcIjpcIik7IC8vWzMsMzBdXG4gIHZhciBtYXhEdXJhdGlvblNlYyA9IG1heER1cmF0aW9uQXJyWzBdICogNjAgKyArbWF4RHVyYXRpb25BcnJbMV07IC8v0L/QtdGA0LXQstC+0LQg0LIg0YHQtdC60YPQvdC00YsgMjEwc2VjIChudW1iZXIpXG4gIHZhciB0aGF0ID0gdGhpcztcblxuICBmdW5jdGlvbiBwcmludE51bWJlcnNUaW1lb3V0KG1heER1cmF0aW9uU2VjKSB7XG5cbiAgICB2YXIgaSA9IDE7XG4gICAgdmFyIHRpbWVySWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIGdvKCkge1xuICAgICAgY29uc29sZS5sb2coaSk7XG4gICAgICBpZiAoaSA8IG1heER1cmF0aW9uU2VjKSBzZXRUaW1lb3V0KGdvLCAxMDA0KTtcbiAgICAgIGkrKztcblxuICAgICAgZG9tLnByb2dyZXNzLmN1cnJlbnQuc3R5bGUud2lkdGggPSAoaSAqIDEwMCAvIG1heER1cmF0aW9uU2VjKS50b0ZpeGVkKCkgKyBcIiVcIjsgLy/Qv9GA0L7Qv9C+0YDRhtC40Y9cbiAgICB9LCAxMDA0KTtcbiAgfTtcblxuICAvLyDQstGL0LfQvtCyXG4gIHByaW50TnVtYmVyc1RpbWVvdXQobWF4RHVyYXRpb25TZWMpO1xuICAvL1xuICB2YXIgQXVkaW9QbGF5ZXIgPSB5YS5tdXNpYy5BdWRpbztcbiAgdmFyIGF1ZGlvUGxheWVyID0gbmV3IEF1ZGlvUGxheWVyKG51bGwsIGRvbS5vdmVybGF5KTtcbiAgdmFyIHN0YXRlID0gYXVkaW9QbGF5ZXIuZ2V0U3RhdGUoKTtcblxuICBmdW5jdGlvbiBzdGFydFBsYXkoKSB7XG4gICAgdmFyIHRyYWNrcyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2RhdGFNTScpKTtcbiAgICBjb25zb2xlLmxvZyh0cmFja3MpO1xuICAgIHZhciB0cmFjayA9IHRyYWNrcy5hVHJhY2tzW2luZGV4TXVzaWNdLnRyYWNrX2xpc3Rlbl91cmw7XG4gICAgaWYgKGF1ZGlvUGxheWVyLmlzUHJlbG9hZGVkKHRyYWNrKSkge1xuICAgICAgYXVkaW9QbGF5ZXIucGxheVByZWxvYWRlZCh0cmFjayk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF1ZGlvUGxheWVyLnBsYXkodHJhY2spO1xuICAgIH1cbiAgfTtcblxuICBhdWRpb1BsYXllci5vbih5YS5tdXNpYy5BdWRpby5FVkVOVF9QUk9HUkVTUywgZnVuY3Rpb24gKHRpbWluZ3MpIHtcbiAgICBjb25zb2xlLmxvZyh0aW1pbmdzKTtcbiAgICBpZiAodGltaW5ncy5sb2FkZWQgPCAxMDApIHtcbiAgICAgIGRvbS5wcm9ncmVzcy5sb2FkZWQuc3R5bGUud2lkdGggPSB0aW1pbmdzLmxvYWRlZCArIFwiJVwiO1xuICAgIH0gZWxzZSB7XG4gICAgICBkb20ucHJvZ3Jlc3MubG9hZGVkLnN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgfTtcbiAgfSk7XG5cbiAgYXVkaW9QbGF5ZXIub24oeWEubXVzaWMuQXVkaW8uRVZFTlRfU1RBVEUsIGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgIGlmIChzdGF0ZSA9PT0geWEubXVzaWMuQXVkaW8uU1RBVEVfUExBWUlORykge1xuICAgICAgZG9tLnBsYXkuaW5uZXJIVE1MID0gXCJwYXVzZV9jaXJjbGVfZmlsbGVkXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRvbS5wbGF5LmlubmVySFRNTCA9IFwicGxheV9jaXJjbGVfZmlsbGVkXCI7XG4gICAgfVxuICB9KTtcblxuICAvLyBpZiAoeWEubXVzaWMuQXVkaW8uU1RBVEVfUExBWUlORykge1xuICAvLyAgIGNvbnNvbGUubG9nKFwic3RvcFwiKTtcbiAgLy8gICBhdWRpb1BsYXllci5zdG9wKCk7XG4gIC8vIH1cblxuXG4gIHN3aXRjaCAoc3RhdGUpIHtcbiAgICBjYXNlIHlhLm11c2ljLkF1ZGlvLlNUQVRFX1BMQVlJTkc6XG4gICAgICBhdWRpb1BsYXllci5wYXVzZSgpO1xuICAgICAgY29uc29sZS5sb2coXCJwYXVzZVwiKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSB5YS5tdXNpYy5BdWRpby5TVEFURV9QQVVTRUQ6XG4gICAgICBhdWRpb1BsYXllci5yZXN1bWUoKTtcbiAgICAgIGNvbnNvbGUubG9nKFwicmVzdW1lXCIpO1xuICAgICAgYnJlYWs7XG5cbiAgICBkZWZhdWx0OlxuICAgICAgY29uc29sZS5sb2coXCJwYXVzZTJcIik7XG4gICAgICBhdWRpb1BsYXllci5wYXVzZSgpO1xuICAgICAgc3RhcnRQbGF5KCk7XG4gICAgICBicmVhaztcbiAgfTtcblxuICBkb20udm9sdW1lLmJhci5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHZvbHVtZSA9IGRvbS52b2x1bWUuYmFyLnZhbHVlO1xuXG4gICAgZG9tLnZvbHVtZS52YWx1ZVZvbHVtZS5pbm5lckhUTUwgPSB2b2x1bWU7XG4gICAgdmFyIHZvbHVtZVNldCA9IHZvbHVtZSAvIDEwMDtcbiAgICBhdWRpb1BsYXllci5zZXRWb2x1bWUodm9sdW1lU2V0KTtcbiAgfSk7XG5cbiAgLy9kZWJ1Z2dlcjtcbiAgaWYgKGV2LnRhcmdldC5pbm5lckhUTUwgIT09ICdwYXVzZV9jaXJjbGVfZmlsbGVkJykge1xuICAgIGV2LnRhcmdldC5pbm5lckhUTUwgPSAncGF1c2VfY2lyY2xlX2ZpbGxlZCc7XG4gIH0gZWxzZSB7XG4gICAgZXYudGFyZ2V0LmlubmVySFRNTCA9ICdwbGF5X2NpcmNsZV9maWxsZWQnO1xuICB9XG59O1xuXG5mdW5jdGlvbiAkJChzdHIpIHtcbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc3RyKTtcbn1cbnZhciBkb20gPSB7XG4gIHBsYXllcjogJCQoXCIucGxheWVyXCIpLFxuXG4gIHBsYXk6ICQkKFwiLnBsYXlcIiksXG4gIHBhdXNlOiAkJChcIi5wYXVzZVwiKSxcblxuICBtYWluUGxheTogJCQoXCIubWFpblBsYXlcIiksXG5cbiAgcHJvZ3Jlc3M6IHtcbiAgICBiYXI6ICQkKFwiLnByb2dyZXNzXCIpLFxuICAgIGxvYWRlZDogJCQoXCIucHJvZ3Jlc3NfbG9hZGVkXCIpLFxuICAgIGN1cnJlbnQ6ICQkKFwiLnByb2dyZXNzX2N1cnJlbnRcIilcbiAgfSxcbiAgZHVyYXRpb246ICQkKFwiLmR1cmF0aW9uXCIpLFxuXG4gIHZvbHVtZToge1xuICAgIGJhcjogJCQoXCIudm9sdW1lXCIpLFxuICAgIHZhbHVlOiAkJChcIi52b2x1bWVfX2JhclwiKSxcbiAgICB2YWx1ZVZvbHVtZTogJCQoXCIudmFsdWVWb2x1bWVcIilcbiAgfSxcblxuICByYWRpbzogJCQoXCIuZGl2UmFkaW9cIiksXG4gIG92ZXJsYXk6ICQkKFwiLm92ZXJsYXlcIilcbn07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbVYyWlc1MFNHRnVaR3hsY2k1cWN5SmRMQ0p1WVcxbGN5STZXeUprWVhSaFRVMGlMQ0psZGlJc0ltTnZibk52YkdVaUxDSnNiMmNpTENKcGJtUmxlRTExYzJsaklpd2lkR0Z5WjJWMElpd2laR0YwWVhObGRDSXNJbWx1WkdWNElpd2lkSEpoWTJ0RWRYSmhkR2x2YmlJc0ltRlVjbUZqYTNNaUxDSjBjbUZqYTE5a2RYSmhkR2x2YmlJc0ltUnZiU0lzSW1SMWNtRjBhVzl1SWl3aWFXNXVaWEpJVkUxTUlpd2liV0Y0UkhWeVlYUnBiMjVCY25JaUxDSnpjR3hwZENJc0ltMWhlRVIxY21GMGFXOXVVMlZqSWl3aWRHaGhkQ0lzSW5CeWFXNTBUblZ0WW1WeWMxUnBiV1Z2ZFhRaUxDSnBJaXdpZEdsdFpYSkpaQ0lzSW5ObGRGUnBiV1Z2ZFhRaUxDSm5ieUlzSW5CeWIyZHlaWE56SWl3aVkzVnljbVZ1ZENJc0luTjBlV3hsSWl3aWQybGtkR2dpTENKMGIwWnBlR1ZrSWl3aVFYVmthVzlRYkdGNVpYSWlMQ0o1WVNJc0ltMTFjMmxqSWl3aVFYVmthVzhpTENKaGRXUnBiMUJzWVhsbGNpSXNJbTkyWlhKc1lYa2lMQ0p6ZEdGMFpTSXNJbWRsZEZOMFlYUmxJaXdpYzNSaGNuUlFiR0Y1SWl3aWRISmhZMnR6SWl3aVNsTlBUaUlzSW5CaGNuTmxJaXdpYkc5allXeFRkRzl5WVdkbElpd2laMlYwU1hSbGJTSXNJblJ5WVdOcklpd2lkSEpoWTJ0ZmJHbHpkR1Z1WDNWeWJDSXNJbWx6VUhKbGJHOWhaR1ZrSWl3aWNHeGhlVkJ5Wld4dllXUmxaQ0lzSW5Cc1lYa2lMQ0p2YmlJc0lrVldSVTVVWDFCU1QwZFNSVk5USWl3aWRHbHRhVzVuY3lJc0lteHZZV1JsWkNJc0lrVldSVTVVWDFOVVFWUkZJaXdpVTFSQlZFVmZVRXhCV1VsT1J5SXNJbkJoZFhObElpd2lVMVJCVkVWZlVFRlZVMFZFSWl3aWNtVnpkVzFsSWl3aWRtOXNkVzFsSWl3aVltRnlJaXdpWVdSa1JYWmxiblJNYVhOMFpXNWxjaUlzSW5aaGJIVmxJaXdpZG1Gc2RXVldiMngxYldVaUxDSjJiMngxYldWVFpYUWlMQ0p6WlhSV2IyeDFiV1VpTENJa0pDSXNJbk4wY2lJc0ltUnZZM1Z0Wlc1MElpd2ljWFZsY25sVFpXeGxZM1J2Y2lJc0luQnNZWGxsY2lJc0ltMWhhVzVRYkdGNUlpd2ljbUZrYVc4aVhTd2liV0Z3Y0dsdVozTWlPaUk3T3pzN096dHJRa0UyUW1Vc1ZVRkJWVUVzVFVGQlZpeEZRVUZyUWtNc1JVRkJiRUlzUlVGQmMwSTdRVUZEYmtORExGVkJRVkZETEVkQlFWSXNRMEZCV1N4VFFVRmFPMEZCUTBGRUxGVkJRVkZETEVkQlFWSXNRMEZCV1N4SFFVRmFMRVZCUVdsQ1NDeE5RVUZxUWl4RlFVRjVRa01zUlVGQmVrSTdPMEZCUlVFc1RVRkJTVWNzWVVGQllVZ3NSMEZCUjBrc1RVRkJTQ3hEUVVGVlF5eFBRVUZXTEVOQlFXdENReXhMUVVGdVF5eERRVXB0UXl4RFFVbFBPenRCUVVVeFF5eE5RVUZKTEVOQlFVTklMRlZCUVV3c1JVRkJhVUk3UVVGRFprWXNXVUZCVVVNc1IwRkJVaXhEUVVGWlF5eFZRVUZhTzBGQlEwRkJMR2xDUVVGaExFTkJRV0k3UVVGRFJEczdRVUZGUkN4TlFVRkpTU3huUWtGQlowSlNMRTlCUVU5VExFOUJRVkFzUTBGQlpVd3NWVUZCWml4RlFVRXlRazBzWTBGQkwwTXNRMEZZYlVNc1EwRlhNa0k3UVVGRE9VUkRMRTFCUVVsRExGRkJRVW9zUTBGQllVTXNVMEZCWWl4SFFVRjVRa3dzWVVGQmVrSTdRVUZEUVN4TlFVRkpUU3hwUWtGQmFVSk9MR05CUVdOUExFdEJRV1FzUTBGQmIwSXNSMEZCY0VJc1EwRkJja0lzUTBGaWJVTXNRMEZoV1R0QlFVTXZReXhOUVVGSlF5eHBRa0ZCYTBKR0xHVkJRV1VzUTBGQlppeEpRVUZ2UWl4RlFVRnlRaXhIUVVFeVFpeERRVUZEUVN4bFFVRmxMRU5CUVdZc1EwRkJha1FzUTBGa2JVTXNRMEZqYVVNN1FVRkRjRVVzVFVGQlNVY3NUMEZCVHl4SlFVRllPenRCUVVWQkxGZEJRVk5ETEcxQ1FVRlVMRU5CUVRaQ1JpeGpRVUUzUWl4RlFVRTJRenM3UVVGRk0wTXNVVUZCU1Vjc1NVRkJTU3hEUVVGU08wRkJRMEVzVVVGQlNVTXNWVUZCVlVNc1YwRkJWeXhUUVVGVFF5eEZRVUZVTEVkQlFXTTdRVUZEY2tOd1FpeGpRVUZSUXl4SFFVRlNMRU5CUVZsblFpeERRVUZhTzBGQlEwRXNWVUZCU1VFc1NVRkJTVWdzWTBGQlVpeEZRVUYzUWtzc1YwRkJWME1zUlVGQldDeEZRVUZsTEVsQlFXWTdRVUZEZUVKSU96dEJRVVZCVWl4VlFVRkpXU3hSUVVGS0xFTkJRV0ZETEU5QlFXSXNRMEZCY1VKRExFdEJRWEpDTEVOQlFUSkNReXhMUVVFelFpeEhRVUZ0UXl4RFFVRkZVQ3hKUVVGSkxFZEJRVXdzUjBGQldVZ3NZMEZCWWl4RlFVRTJRbGNzVDBGQk4wSXNTMEZCZVVNc1IwRkJOVVVzUTBGTWNVTXNRMEZMTkVNN1FVRkRiRVlzUzBGT1lTeEZRVTFZTEVsQlRsY3NRMEZCWkR0QlFVOUVPenRCUVVWRU8wRkJRMEZVTEhOQ1FVRnZRa1lzWTBGQmNFSTdRVUZEUVR0QlFVTkJMRTFCUVVsWkxHTkJRV05ETEVkQlFVZERMRXRCUVVnc1EwRkJVME1zUzBGQk0wSTdRVUZEUVN4TlFVRkpReXhqUVVGakxFbEJRVWxLTEZkQlFVb3NRMEZCWjBJc1NVRkJhRUlzUlVGQmMwSnFRaXhKUVVGSmMwSXNUMEZCTVVJc1EwRkJiRUk3UVVGRFFTeE5RVUZKUXl4UlFVRlJSaXhaUVVGWlJ5eFJRVUZhTEVWQlFWbzdPMEZCUlVFc1YwRkJVME1zVTBGQlZDeEhRVUZ4UWp0QlFVTnVRaXhSUVVGSlF5eFRRVUZUUXl4TFFVRkxReXhMUVVGTUxFTkJRVmRETEdGQlFXRkRMRTlCUVdJc1EwRkJjVUlzVVVGQmNrSXNRMEZCV0N4RFFVRmlPMEZCUTBGMlF5eFpRVUZSUXl4SFFVRlNMRU5CUVZsclF5eE5RVUZhTzBGQlEwRXNVVUZCU1Vzc1VVRkJVVXdzVDBGQlR6VkNMRTlCUVZBc1EwRkJaVXdzVlVGQlppeEZRVUV5UW5WRExHZENRVUYyUXp0QlFVTkJMRkZCUVVsWUxGbEJRVmxaTEZkQlFWb3NRMEZCZDBKR0xFdEJRWGhDTEVOQlFVb3NSVUZCYjBNN1FVRkRiRU5XTEd0Q1FVRlpZU3hoUVVGYUxFTkJRVEJDU0N4TFFVRXhRanRCUVVORUxFdEJSa1FzVFVGRlR6dEJRVU5NVml4clFrRkJXV01zU1VGQldpeERRVUZwUWtvc1MwRkJha0k3UVVGRlJEdEJRVU5HT3p0QlFVVkVWaXhqUVVGWlpTeEZRVUZhTEVOQlFXVnNRaXhIUVVGSFF5eExRVUZJTEVOQlFWTkRMRXRCUVZRc1EwRkJaV2xDTEdOQlFUbENMRVZCUVRoRExHMUNRVUZYTzBGQlEzWkVPVU1zV1VGQlVVTXNSMEZCVWl4RFFVRlpPRU1zVDBGQldqdEJRVU5CTEZGQlFVbEJMRkZCUVZGRExFMUJRVklzUjBGQmFVSXNSMEZCY2tJc1JVRkJNRUk3UVVGRGVFSjJReXhWUVVGSldTeFJRVUZLTEVOQlFXRXlRaXhOUVVGaUxFTkJRVzlDZWtJc1MwRkJjRUlzUTBGQk1FSkRMRXRCUVRGQ0xFZEJRV3REZFVJc1VVRkJVVU1zVFVGQlVpeEhRVUZwUWl4SFFVRnVSRHRCUVVORUxFdEJSa1FzVFVGSFN6dEJRVU5JZGtNc1ZVRkJTVmtzVVVGQlNpeERRVUZoTWtJc1RVRkJZaXhEUVVGdlFucENMRXRCUVhCQ0xFTkJRVEJDUXl4TFFVRXhRaXhIUVVGclF5eE5RVUZzUXp0QlFVTkVPMEZCUTBZc1IwRlNSRHM3UVVGVlFVMHNZMEZCV1dVc1JVRkJXaXhEUVVGbGJFSXNSMEZCUjBNc1MwRkJTQ3hEUVVGVFF5eExRVUZVTEVOQlFXVnZRaXhYUVVFNVFpeEZRVUV5UXl4cFFrRkJVenRCUVVOc1JDeFJRVUZKYWtJc1ZVRkJWVXdzUjBGQlIwTXNTMEZCU0N4RFFVRlRReXhMUVVGVUxFTkJRV1Z4UWl4aFFVRTNRaXhGUVVFMFF6dEJRVU14UTNwRExGVkJRVWx0UXl4SlFVRktMRU5CUVZOcVF5eFRRVUZVTEVkQlFYRkNMSEZDUVVGeVFqdEJRVU5FTEV0QlJrUXNUVUZGVHp0QlFVTk1SaXhWUVVGSmJVTXNTVUZCU2l4RFFVRlRha01zVTBGQlZDeEhRVUZ4UWl4dlFrRkJja0k3UVVGRFJEdEJRVU5HTEVkQlRrUTdPMEZCVVVFN1FVRkRRVHRCUVVOQk8wRkJRMEU3T3p0QlFVbEJMRlZCUVZGeFFpeExRVUZTTzBGQlEwVXNVMEZCUzB3c1IwRkJSME1zUzBGQlNDeERRVUZUUXl4TFFVRlVMRU5CUVdWeFFpeGhRVUZ3UWp0QlFVTkZjRUlzYTBKQlFWbHhRaXhMUVVGYU8wRkJRMEZ1UkN4alFVRlJReXhIUVVGU0xFTkJRVmtzVDBGQldqdEJRVU5CT3p0QlFVVkdMRk5CUVVzd1FpeEhRVUZIUXl4TFFVRklMRU5CUVZORExFdEJRVlFzUTBGQlpYVkNMRmxCUVhCQ08wRkJRMFYwUWl4clFrRkJXWFZDTEUxQlFWbzdRVUZEUVhKRUxHTkJRVkZETEVkQlFWSXNRMEZCV1N4UlFVRmFPMEZCUTBFN08wRkJSVVk3UVVGRFJVUXNZMEZCVVVNc1IwRkJVaXhEUVVGWkxGRkJRVm83UVVGRFFUWkNMR3RDUVVGWmNVSXNTMEZCV2p0QlFVTkJha0k3UVVGRFFUdEJRV1pLTEVkQlowSkRPenRCUVV0RWVrSXNUVUZCU1RaRExFMUJRVW9zUTBGQlYwTXNSMEZCV0N4RFFVRmxReXhuUWtGQlppeERRVUZuUXl4UlFVRm9ReXhGUVVFd1F5eFpRVUZOTzBGQlF6bERMRkZCUVVsR0xGTkJRVk0zUXl4SlFVRkpOa01zVFVGQlNpeERRVUZYUXl4SFFVRllMRU5CUVdWRkxFdEJRVFZDT3p0QlFVVkJhRVFzVVVGQlNUWkRMRTFCUVVvc1EwRkJWMGtzVjBGQldDeERRVUYxUWk5RExGTkJRWFpDTEVkQlFXMURNa01zVFVGQmJrTTdRVUZEUVN4UlFVRkpTeXhaUVVGWlRDeFRRVUZUTEVkQlFYcENPMEZCUTBGNFFpeG5Ra0ZCV1RoQ0xGTkJRVm9zUTBGQmMwSkVMRk5CUVhSQ08wRkJRMFFzUjBGT1JEczdRVUZSUVR0QlFVTkJMRTFCUVVrMVJDeEhRVUZIU1N4TlFVRklMRU5CUVZWUkxGTkJRVllzUzBGQmQwSXNjVUpCUVRWQ0xFVkJRVzFFTzBGQlEycEVXaXhQUVVGSFNTeE5RVUZJTEVOQlFWVlJMRk5CUVZZc1IwRkJjMElzY1VKQlFYUkNPMEZCUTBRc1IwRkdSQ3hOUVVWUE8wRkJRMHhhTEU5QlFVZEpMRTFCUVVnc1EwRkJWVkVzVTBGQlZpeEhRVUZ6UWl4dlFrRkJkRUk3UVVGRFJEdEJRVU5HTEVNN08wRkJla2xFTEZOQlFWTnJSQ3hGUVVGVUxFTkJRVmxETEVkQlFWb3NSVUZCYVVJN1FVRkRaaXhUUVVGUFF5eFRRVUZUUXl4aFFVRlVMRU5CUVhWQ1JpeEhRVUYyUWl4RFFVRlFPMEZCUTBRN1FVRkRSQ3hKUVVGSmNrUXNUVUZCVFR0QlFVTlNkMFFzVlVGQlVVb3NSMEZCUnl4VFFVRklMRU5CUkVFN08wRkJSMUpxUWl4UlFVRk5hVUlzUjBGQlJ5eFBRVUZJTEVOQlNFVTdRVUZKVWxZc1UwRkJUMVVzUjBGQlJ5eFJRVUZJTEVOQlNrTTdPMEZCVFZKTExGbEJRVlZNTEVkQlFVY3NWMEZCU0N4RFFVNUdPenRCUVZOU2VFTXNXVUZCVlR0QlFVTlNhME1zVTBGQlMwMHNSMEZCUnl4WFFVRklMRU5CUkVjN1FVRkZVbUlzV1VGQlVXRXNSMEZCUnl4clFrRkJTQ3hEUVVaQk8wRkJSMUoyUXl4aFFVRlRkVU1zUjBGQlJ5eHRRa0ZCU0R0QlFVaEVMRWRCVkVZN1FVRmpVbTVFTEZsQlFWVnRSQ3hIUVVGSExGZEJRVWdzUTBGa1JqczdRVUZuUWxKUUxGVkJRVkU3UVVGRFRrTXNVMEZCUzAwc1IwRkJSeXhUUVVGSUxFTkJSRU03UVVGRlRrb3NWMEZCVDBrc1IwRkJSeXhqUVVGSUxFTkJSa1E3UVVGSFRrZ3NhVUpCUVdGSExFZEJRVWNzWTBGQlNEdEJRVWhRTEVkQmFFSkJPenRCUVhOQ1VrMHNVMEZCVDA0c1IwRkJSeXhYUVVGSUxFTkJkRUpETzBGQmRVSlNPVUlzVjBGQlV6aENMRWRCUVVjc1ZVRkJTRHRCUVhaQ1JDeERRVUZXSWl3aVptbHNaU0k2SW1WMlpXNTBTR0Z1Wkd4bGNpNXFjeUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSW1aMWJtTjBhVzl1SUNRa0tITjBjaWtnZTF4dUlDQnlaWFIxY200Z1pHOWpkVzFsYm5RdWNYVmxjbmxUWld4bFkzUnZjaWh6ZEhJcE8xeHVmVnh1YkdWMElHUnZiU0E5SUh0Y2JpQWdjR3hoZVdWeU9pQWtKQ2hjSWk1d2JHRjVaWEpjSWlrc1hHNWNiaUFnY0d4aGVUb2dKQ1FvWENJdWNHeGhlVndpS1N4Y2JpQWdjR0YxYzJVNklDUWtLRndpTG5CaGRYTmxYQ0lwTEZ4dVhHNGdJRzFoYVc1UWJHRjVPaUFrSkNoY0lpNXRZV2x1VUd4aGVWd2lLU3hjYmx4dVhHNGdJSEJ5YjJkeVpYTnpPaUI3WEc0Z0lDQWdZbUZ5T2lBa0pDaGNJaTV3Y205bmNtVnpjMXdpS1N4Y2JpQWdJQ0JzYjJGa1pXUTZJQ1FrS0Z3aUxuQnliMmR5WlhOelgyeHZZV1JsWkZ3aUtTeGNiaUFnSUNCamRYSnlaVzUwT2lBa0pDaGNJaTV3Y205bmNtVnpjMTlqZFhKeVpXNTBYQ0lwWEc0Z0lIMHNYRzRnSUdSMWNtRjBhVzl1T2lBa0pDaGNJaTVrZFhKaGRHbHZibHdpS1N4Y2JseHVJQ0IyYjJ4MWJXVTZJSHRjYmlBZ0lDQmlZWEk2SUNRa0tGd2lMblp2YkhWdFpWd2lLU3hjYmlBZ0lDQjJZV3gxWlRvZ0pDUW9YQ0l1ZG05c2RXMWxYMTlpWVhKY0lpa3NYRzRnSUNBZ2RtRnNkV1ZXYjJ4MWJXVTZJQ1FrS0Z3aUxuWmhiSFZsVm05c2RXMWxYQ0lwWEc0Z0lIMHNYRzVjYmlBZ2NtRmthVzg2SUNRa0tGd2lMbVJwZGxKaFpHbHZYQ0lwTEZ4dUlDQnZkbVZ5YkdGNU9pQWtKQ2hjSWk1dmRtVnliR0Y1WENJcFhHNTlPMXh1WEc1bGVIQnZjblFnWkdWbVlYVnNkQ0JtZFc1amRHbHZiaUFvWkdGMFlVMU5MQ0JsZGlrZ2UxeHVJQ0JqYjI1emIyeGxMbXh2WnloY0luUjFkRkJzWVhsY0lpazdYRzRnSUdOdmJuTnZiR1V1Ykc5bktDY2dKeXdnWkdGMFlVMU5MQ0JsZGlrN1hHNWNiaUFnYkdWMElHbHVaR1Y0VFhWemFXTWdQU0JsZGk1MFlYSm5aWFF1WkdGMFlYTmxkQzVwYm1SbGVEc2dMeS9RdU5DOTBMVFF0ZEM2MFlFZzBZTFJnTkMxMExyUXNGeHVYRzRnSUdsbUlDZ2hhVzVrWlhoTmRYTnBZeWtnZTF4dUlDQWdJR052Ym5OdmJHVXViRzluS0dsdVpHVjRUWFZ6YVdNcE8xeHVJQ0FnSUdsdVpHVjRUWFZ6YVdNZ1BTQXdPMXh1SUNCOU8xeHVYRzRnSUd4bGRDQjBjbUZqYTBSMWNtRjBhVzl1SUQwZ1pHRjBZVTFOTG1GVWNtRmphM05iYVc1a1pYaE5kWE5wWTEwdWRISmhZMnRmWkhWeVlYUnBiMjQ3THk5a1lYUmhUVTB1WVZSeVlXTnJjMXN4TUYwdWRISmhZMnRmWkhWeVlYUnBiMjQ3SUM4dklITmxZeUF6T2pNd1hHNGdJR1J2YlM1a2RYSmhkR2x2Ymk1cGJtNWxja2hVVFV3Z1BTQjBjbUZqYTBSMWNtRjBhVzl1TzF4dUlDQnNaWFFnYldGNFJIVnlZWFJwYjI1QmNuSWdQU0IwY21GamEwUjFjbUYwYVc5dUxuTndiR2wwS0Z3aU9sd2lLVHNnTHk5Yk15d3pNRjFjYmlBZ2JHVjBJRzFoZUVSMWNtRjBhVzl1VTJWaklEMGdLRzFoZUVSMWNtRjBhVzl1UVhKeVd6QmRJQ29nTmpBcElDc2dLMjFoZUVSMWNtRjBhVzl1UVhKeVd6RmRPeUF2TDlDLzBMWFJnTkMxMExMUXZ0QzBJTkN5SU5HQjBMWFF1dEdEMEwzUXROR0xJREl4TUhObFl5QW9iblZ0WW1WeUtWeHVJQ0JzWlhRZ2RHaGhkQ0E5SUhSb2FYTTdYRzVjYmlBZ1puVnVZM1JwYjI0Z2NISnBiblJPZFcxaVpYSnpWR2x0Wlc5MWRDaHRZWGhFZFhKaGRHbHZibE5sWXlrZ2UxeHVYRzRnSUNBZ2RtRnlJR2tnUFNBeE8xeHVJQ0FnSUhaaGNpQjBhVzFsY2tsa0lEMGdjMlYwVkdsdFpXOTFkQ2htZFc1amRHbHZiaUJuYnlncElIdGNiaUFnSUNBZ0lHTnZibk52YkdVdWJHOW5LR2twTzF4dUlDQWdJQ0FnYVdZZ0tHa2dQQ0J0WVhoRWRYSmhkR2x2YmxObFl5a2djMlYwVkdsdFpXOTFkQ2huYnl3Z01UQXdOQ2s3WEc0Z0lDQWdJQ0JwS3lzN1hHNWNiaUFnSUNBZ0lHUnZiUzV3Y205bmNtVnpjeTVqZFhKeVpXNTBMbk4wZVd4bExuZHBaSFJvSUQwZ0tDaHBJQ29nTVRBd0tTQXZJRzFoZUVSMWNtRjBhVzl1VTJWaktTNTBiMFpwZUdWa0tDa2dLeUJjSWlWY0lqc2dMeS9RdjlHQTBMN1F2OUMrMFlEUmh0QzQwWTljYmlBZ0lDQjlMQ0F4TURBMEtUdGNiaUFnZlR0Y2JseHVJQ0F2THlEUXN0R0wwTGZRdnRDeVhHNGdJSEJ5YVc1MFRuVnRZbVZ5YzFScGJXVnZkWFFvYldGNFJIVnlZWFJwYjI1VFpXTXBPMXh1SUNBdkwxeHVJQ0JzWlhRZ1FYVmthVzlRYkdGNVpYSWdQU0I1WVM1dGRYTnBZeTVCZFdScGJ6dGNiaUFnYkdWMElHRjFaR2x2VUd4aGVXVnlJRDBnYm1WM0lFRjFaR2x2VUd4aGVXVnlLRzUxYkd3c0lHUnZiUzV2ZG1WeWJHRjVLVHRjYmlBZ2JHVjBJSE4wWVhSbElEMGdZWFZrYVc5UWJHRjVaWEl1WjJWMFUzUmhkR1VvS1R0Y2JseHVJQ0JtZFc1amRHbHZiaUJ6ZEdGeWRGQnNZWGtvS1NCN1hHNGdJQ0FnYkdWMElIUnlZV05yY3lBOUlFcFRUMDR1Y0dGeWMyVW9iRzlqWVd4VGRHOXlZV2RsTG1kbGRFbDBaVzBvSjJSaGRHRk5UU2NwS1R0Y2JpQWdJQ0JqYjI1emIyeGxMbXh2WnloMGNtRmphM01wTzF4dUlDQWdJSFpoY2lCMGNtRmpheUE5SUhSeVlXTnJjeTVoVkhKaFkydHpXMmx1WkdWNFRYVnphV05kTG5SeVlXTnJYMnhwYzNSbGJsOTFjbXc3WEc0Z0lDQWdhV1lnS0dGMVpHbHZVR3hoZVdWeUxtbHpVSEpsYkc5aFpHVmtLSFJ5WVdOcktTa2dlMXh1SUNBZ0lDQWdZWFZrYVc5UWJHRjVaWEl1Y0d4aGVWQnlaV3h2WVdSbFpDaDBjbUZqYXlrN1hHNGdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJR0YxWkdsdlVHeGhlV1Z5TG5Cc1lYa29kSEpoWTJzcE8xeHVYRzRnSUNBZ2ZWeHVJQ0I5TzF4dVhHNGdJR0YxWkdsdlVHeGhlV1Z5TG05dUtIbGhMbTExYzJsakxrRjFaR2x2TGtWV1JVNVVYMUJTVDBkU1JWTlRMQ0IwYVcxcGJtZHpJRDArSUh0Y2JpQWdJQ0JqYjI1emIyeGxMbXh2WnloMGFXMXBibWR6S1R0Y2JpQWdJQ0JwWmlBb2RHbHRhVzVuY3k1c2IyRmtaV1FnUENBeE1EQXBJSHRjYmlBZ0lDQWdJR1J2YlM1d2NtOW5jbVZ6Y3k1c2IyRmtaV1F1YzNSNWJHVXVkMmxrZEdnZ1BTQjBhVzFwYm1kekxteHZZV1JsWkNBcklGd2lKVndpTzF4dUlDQWdJSDFjYmlBZ0lDQmxiSE5sSUh0Y2JpQWdJQ0FnSUdSdmJTNXdjbTluY21WemN5NXNiMkZrWldRdWMzUjViR1V1ZDJsa2RHZ2dQU0JjSWpFd01DVmNJanRjYmlBZ0lDQjlPMXh1SUNCOUtUdGNibHh1SUNCaGRXUnBiMUJzWVhsbGNpNXZiaWg1WVM1dGRYTnBZeTVCZFdScGJ5NUZWa1ZPVkY5VFZFRlVSU3dnYzNSaGRHVWdQVDRnZTF4dUlDQWdJR2xtSUNoemRHRjBaU0E5UFQwZ2VXRXViWFZ6YVdNdVFYVmthVzh1VTFSQlZFVmZVRXhCV1VsT1J5a2dlMXh1SUNBZ0lDQWdaRzl0TG5Cc1lYa3VhVzV1WlhKSVZFMU1JRDBnWENKd1lYVnpaVjlqYVhKamJHVmZabWxzYkdWa1hDSTdYRzRnSUNBZ2ZTQmxiSE5sSUh0Y2JpQWdJQ0FnSUdSdmJTNXdiR0Y1TG1sdWJtVnlTRlJOVENBOUlGd2ljR3hoZVY5amFYSmpiR1ZmWm1sc2JHVmtYQ0k3WEc0Z0lDQWdmVnh1SUNCOUtUdGNibHh1SUNBdkx5QnBaaUFvZVdFdWJYVnphV011UVhWa2FXOHVVMVJCVkVWZlVFeEJXVWxPUnlrZ2UxeHVJQ0F2THlBZ0lHTnZibk52YkdVdWJHOW5LRndpYzNSdmNGd2lLVHRjYmlBZ0x5OGdJQ0JoZFdScGIxQnNZWGxsY2k1emRHOXdLQ2s3WEc0Z0lDOHZJSDFjYmx4dVhHNWNiaUFnYzNkcGRHTm9JQ2h6ZEdGMFpTa2dlMXh1SUNBZ0lHTmhjMlVnZVdFdWJYVnphV011UVhWa2FXOHVVMVJCVkVWZlVFeEJXVWxPUnpwY2JpQWdJQ0FnSUdGMVpHbHZVR3hoZVdWeUxuQmhkWE5sS0NrN1hHNGdJQ0FnSUNCamIyNXpiMnhsTG14dlp5aGNJbkJoZFhObFhDSXBPMXh1SUNBZ0lDQWdZbkpsWVdzN1hHNWNiaUFnSUNCallYTmxJSGxoTG0xMWMybGpMa0YxWkdsdkxsTlVRVlJGWDFCQlZWTkZSRHBjYmlBZ0lDQWdJR0YxWkdsdlVHeGhlV1Z5TG5KbGMzVnRaU2dwTzF4dUlDQWdJQ0FnWTI5dWMyOXNaUzVzYjJjb1hDSnlaWE4xYldWY0lpazdYRzRnSUNBZ0lDQmljbVZoYXp0Y2JseHVJQ0FnSUdSbFptRjFiSFE2WEc0Z0lDQWdJQ0JqYjI1emIyeGxMbXh2WnloY0luQmhkWE5sTWx3aUtUdGNiaUFnSUNBZ0lHRjFaR2x2VUd4aGVXVnlMbkJoZFhObEtDazdYRzRnSUNBZ0lDQnpkR0Z5ZEZCc1lYa29LVHRjYmlBZ0lDQWdJR0p5WldGck8xeHVJQ0I5TzF4dVhHNWNibHh1WEc0Z0lHUnZiUzUyYjJ4MWJXVXVZbUZ5TG1Ga1pFVjJaVzUwVEdsemRHVnVaWElvSjJOb1lXNW5aU2NzSUNncElEMCtJSHRjYmlBZ0lDQnNaWFFnZG05c2RXMWxJRDBnWkc5dExuWnZiSFZ0WlM1aVlYSXVkbUZzZFdVN1hHNWNiaUFnSUNCa2IyMHVkbTlzZFcxbExuWmhiSFZsVm05c2RXMWxMbWx1Ym1WeVNGUk5UQ0E5SUhadmJIVnRaVHRjYmlBZ0lDQnNaWFFnZG05c2RXMWxVMlYwSUQwZ2RtOXNkVzFsSUM4Z01UQXdPMXh1SUNBZ0lHRjFaR2x2VUd4aGVXVnlMbk5sZEZadmJIVnRaU2gyYjJ4MWJXVlRaWFFwTzF4dUlDQjlLVHRjYmx4dUlDQXZMMlJsWW5WbloyVnlPMXh1SUNCcFppQW9aWFl1ZEdGeVoyVjBMbWx1Ym1WeVNGUk5UQ0FoUFQwZ0ozQmhkWE5sWDJOcGNtTnNaVjltYVd4c1pXUW5LU0I3WEc0Z0lDQWdaWFl1ZEdGeVoyVjBMbWx1Ym1WeVNGUk5UQ0E5SUNkd1lYVnpaVjlqYVhKamJHVmZabWxzYkdWa0p6dGNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQmxkaTUwWVhKblpYUXVhVzV1WlhKSVZFMU1JRDBnSjNCc1lYbGZZMmx5WTJ4bFgyWnBiR3hsWkNjN1hHNGdJSDFjYm4waVhYMD1cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvY29tcG9uZW50c1xcXFxoZWxwZXJzXFxcXGV2ZW50SGFuZGxlci5qc1wiLFwiL2NvbXBvbmVudHNcXFxcaGVscGVyc1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgVGhlbWVzID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRoZW1lcygpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFRoZW1lcyk7XG5cbiAgICAgICAgdmFyIG9wdGlvbnMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSgnb3B0aW9ucycpO1xuICAgICAgICB2YXIgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhlYWRlcicpO1xuICAgICAgICB2YXIgbWlkZGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW5Db250ZW50MicpO1xuICAgICAgICB2YXIgZm9vdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3RlcmNsaScpO1xuICAgICAgICB2YXIgcmFkaW9DbGljayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kaXZSYWRpbycpO1xuICAgICAgICB0aGlzLnJhZGlvID0gb3B0aW9ucztcbiAgICAgICAgdGhpcy5oZWFkZXIgPSBoZWFkZXI7XG4gICAgICAgIHRoaXMubWlkZGxlID0gbWlkZGxlO1xuICAgICAgICB0aGlzLmZvb3RlciA9IGZvb3RlcjtcbiAgICAgICAgdGhpcy5yYWRpb0NsaWNrID0gcmFkaW9DbGljaztcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoVGhlbWVzLCBbe1xuICAgICAgICBrZXk6ICd0aGVtZVN0YXRlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHRoZW1lU3RhdGUoKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlQ2hlY2soKTtcbiAgICAgICAgICAgIHRoaXMucmFkaW9DbGljay5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJhZGlvWzBdLnR5cGUgPT09IFwicmFkaW9cIiAmJiB0aGlzLnJhZGlvWzBdLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFkZXIuc3R5bGUucmVtb3ZlUHJvcGVydHkoXCJiYWNrZ3JvdW5kXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pZGRsZS5zdHlsZS5yZW1vdmVQcm9wZXJ0eShcImJhY2tncm91bmRcIik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9vdGVyLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwiYmFja2dyb3VuZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oXCJvYmplY3RUaGVtZVwiKTtcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJhZGlvWzFdLnR5cGUgPT09IFwicmFkaW9cIiAmJiB0aGlzLnJhZGlvWzFdLmNoZWNrZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRoZW1lID0gXCJibGFja1doaXRlXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyLnN0eWxlLmJhY2tncm91bmQgPSBcImJsYWNrXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWlkZGxlLnN0eWxlLmJhY2tncm91bmQgPSBcIndoaXRlXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9vdGVyLnN0eWxlLmJhY2tncm91bmQgPSBcImJsYWNrXCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2F2ZSh0aGVtZSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yYWRpb1syXS50eXBlID09PSBcInJhZGlvXCIgJiYgdGhpcy5yYWRpb1syXS5jaGVja2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBfdGhlbWUgPSBcInNhbmRcIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFkZXIuc3R5bGUuYmFja2dyb3VuZCA9IFwiI0RFQjg4N1wiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1pZGRsZS5zdHlsZS5iYWNrZ3JvdW5kID0gXCIjRkZFNEM0XCI7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9vdGVyLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwiYmFja2dyb3VuZFwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zYXZlKF90aGVtZSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgIH1cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3N0YXRlQ2hlY2snLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc3RhdGVDaGVjaygpIHtcbiAgICAgICAgICAgIHZhciByZXRPYmogPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwib2JqZWN0VGhlbWVcIikpO1xuICAgICAgICAgICAgaWYgKHJldE9iaiA9PT0gXCJibGFja1doaXRlXCIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJhZGlvWzFdLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyLnN0eWxlLmJhY2tncm91bmQgPSBcImJsYWNrXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5taWRkbGUuc3R5bGUuYmFja2dyb3VuZCA9IFwid2hpdGVcIjtcbiAgICAgICAgICAgICAgICB0aGlzLmZvb3Rlci5zdHlsZS5iYWNrZ3JvdW5kID0gXCJibGFja1wiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChyZXRPYmogPT09IFwic2FuZFwiKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yYWRpb1syXS5jaGVja2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmhlYWRlci5zdHlsZS5iYWNrZ3JvdW5kID0gXCIjREVCODg3XCI7XG4gICAgICAgICAgICAgICAgdGhpcy5taWRkbGUuc3R5bGUuYmFja2dyb3VuZCA9IFwiI0ZGRTRDNFwiO1xuICAgICAgICAgICAgICAgIHRoaXMuZm9vdGVyLnN0eWxlLnJlbW92ZVByb3BlcnR5KFwiYmFja2dyb3VuZFwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc2F2ZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzYXZlKHRoZW1lKSB7XG4gICAgICAgICAgICB2YXIgc09iaiA9IEpTT04uc3RyaW5naWZ5KHRoZW1lKTtcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwib2JqZWN0VGhlbWVcIiwgc09iaik7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gVGhlbWVzO1xufSgpO1xuXG52YXIgc3RhdGUgPSBuZXcgVGhlbWVzKCk7XG5zdGF0ZS50aGVtZVN0YXRlKCk7XG5cbmV4cG9ydHMuVGhlbWVzID0gVGhlbWVzO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW5Sb1pXMWxjeTVxY3lKZExDSnVZVzFsY3lJNld5SlVhR1Z0WlhNaUxDSnZjSFJwYjI1eklpd2laRzlqZFcxbGJuUWlMQ0puWlhSRmJHVnRaVzUwYzBKNVRtRnRaU0lzSW1obFlXUmxjaUlzSW5GMVpYSjVVMlZzWldOMGIzSWlMQ0p0YVdSa2JHVWlMQ0ptYjI5MFpYSWlMQ0p5WVdScGIwTnNhV05ySWl3aWNtRmthVzhpTENKemRHRjBaVU5vWldOcklpd2lZV1JrUlhabGJuUk1hWE4wWlc1bGNpSXNJblI1Y0dVaUxDSmphR1ZqYTJWa0lpd2ljM1I1YkdVaUxDSnlaVzF2ZG1WUWNtOXdaWEowZVNJc0lteHZZMkZzVTNSdmNtRm5aU0lzSW5KbGJXOTJaVWwwWlcwaUxDSjBhR1Z0WlNJc0ltSmhZMnRuY205MWJtUWlMQ0p6WVhabElpd2lZbWx1WkNJc0luSmxkRTlpYWlJc0lrcFRUMDRpTENKd1lYSnpaU0lzSW1kbGRFbDBaVzBpTENKelQySnFJaXdpYzNSeWFXNW5hV1o1SWl3aWMyVjBTWFJsYlNJc0luTjBZWFJsSWl3aWRHaGxiV1ZUZEdGMFpTSmRMQ0p0WVhCd2FXNW5jeUk2SWpzN096czdPenM3T3p0SlFVRk5RU3hOTzBGQlEwWXNjMEpCUVdNN1FVRkJRVHM3UVVGRFZpeFpRVUZKUXl4VlFVRlZReXhUUVVGVFF5eHBRa0ZCVkN4RFFVRXlRaXhUUVVFelFpeERRVUZrTzBGQlEwRXNXVUZCU1VNc1UwRkJVMFlzVTBGQlUwY3NZVUZCVkN4RFFVRjFRaXhUUVVGMlFpeERRVUZpTzBGQlEwRXNXVUZCU1VNc1UwRkJVMG9zVTBGQlUwY3NZVUZCVkN4RFFVRjFRaXhsUVVGMlFpeERRVUZpTzBGQlEwRXNXVUZCU1VVc1UwRkJVMHdzVTBGQlUwY3NZVUZCVkN4RFFVRjFRaXhaUVVGMlFpeERRVUZpTzBGQlEwRXNXVUZCU1Vjc1lVRkJZVTRzVTBGQlUwY3NZVUZCVkN4RFFVRjFRaXhYUVVGMlFpeERRVUZxUWp0QlFVTkJMR0ZCUVV0SkxFdEJRVXdzUjBGQllWSXNUMEZCWWp0QlFVTkJMR0ZCUVV0SExFMUJRVXdzUjBGQlkwRXNUVUZCWkR0QlFVTkJMR0ZCUVV0RkxFMUJRVXdzUjBGQlkwRXNUVUZCWkR0QlFVTkJMR0ZCUVV0RExFMUJRVXdzUjBGQlkwRXNUVUZCWkR0QlFVTkJMR0ZCUVV0RExGVkJRVXdzUjBGQmEwSkJMRlZCUVd4Q08wRkJRMGc3T3pzN2NVTkJSVms3UVVGRFZDeHBRa0ZCUzBVc1ZVRkJURHRCUVVOQkxHbENRVUZMUml4VlFVRk1MRU5CUVdkQ1J5eG5Ra0ZCYUVJc1EwRkJhVU1zVDBGQmFrTXNSVUZCTUVNc1dVRkJXVHRCUVVOc1JDeHZRa0ZCU1N4TFFVRkxSaXhMUVVGTUxFTkJRVmNzUTBGQldDeEZRVUZqUnl4SlFVRmtMRXRCUVhWQ0xFOUJRWFpDTEVsQlFXdERMRXRCUVV0SUxFdEJRVXdzUTBGQlZ5eERRVUZZTEVWQlFXTkpMRTlCUVhCRUxFVkJRVFpFTzBGQlEzcEVMSGxDUVVGTFZDeE5RVUZNTEVOQlFWbFZMRXRCUVZvc1EwRkJhMEpETEdOQlFXeENMRU5CUVdsRExGbEJRV3BETzBGQlEwRXNlVUpCUVV0VUxFMUJRVXdzUTBGQldWRXNTMEZCV2l4RFFVRnJRa01zWTBGQmJFSXNRMEZCYVVNc1dVRkJha003UVVGRFFTeDVRa0ZCUzFJc1RVRkJUQ3hEUVVGWlR5eExRVUZhTEVOQlFXdENReXhqUVVGc1FpeERRVUZwUXl4WlFVRnFRenRCUVVOQlF5eHBRMEZCWVVNc1ZVRkJZaXhEUVVGM1FpeGhRVUY0UWp0QlFVTklPMEZCUTBRc2IwSkJRVWtzUzBGQlMxSXNTMEZCVEN4RFFVRlhMRU5CUVZnc1JVRkJZMGNzU1VGQlpDeExRVUYxUWl4UFFVRjJRaXhKUVVGclF5eExRVUZMU0N4TFFVRk1MRU5CUVZjc1EwRkJXQ3hGUVVGalNTeFBRVUZ3UkN4RlFVRTJSRHRCUVVONlJDeDNRa0ZCU1Vzc1VVRkJVU3haUVVGYU8wRkJRMEVzZVVKQlFVdGtMRTFCUVV3c1EwRkJXVlVzUzBGQldpeERRVUZyUWtzc1ZVRkJiRUlzUjBGQkswSXNUMEZCTDBJN1FVRkRRU3g1UWtGQlMySXNUVUZCVEN4RFFVRlpVU3hMUVVGYUxFTkJRV3RDU3l4VlFVRnNRaXhIUVVFclFpeFBRVUV2UWp0QlFVTkJMSGxDUVVGTFdpeE5RVUZNTEVOQlFWbFBMRXRCUVZvc1EwRkJhMEpMTEZWQlFXeENMRWRCUVN0Q0xFOUJRUzlDTzBGQlEwRXNlVUpCUVV0RExFbEJRVXdzUTBGQlZVWXNTMEZCVmp0QlFVZElPMEZCUTBRc2IwSkJRVWtzUzBGQlMxUXNTMEZCVEN4RFFVRlhMRU5CUVZnc1JVRkJZMGNzU1VGQlpDeExRVUYxUWl4UFFVRjJRaXhKUVVGclF5eExRVUZMU0N4TFFVRk1MRU5CUVZjc1EwRkJXQ3hGUVVGalNTeFBRVUZ3UkN4RlFVRTJSRHRCUVVONlJDeDNRa0ZCU1Vzc1UwRkJVU3hOUVVGYU8wRkJRMEVzZVVKQlFVdGtMRTFCUVV3c1EwRkJXVlVzUzBGQldpeERRVUZyUWtzc1ZVRkJiRUlzUjBGQkswSXNVMEZCTDBJN1FVRkRRU3g1UWtGQlMySXNUVUZCVEN4RFFVRlpVU3hMUVVGYUxFTkJRV3RDU3l4VlFVRnNRaXhIUVVFclFpeFRRVUV2UWp0QlFVTkJMSGxDUVVGTFdpeE5RVUZNTEVOQlFWbFBMRXRCUVZvc1EwRkJhMEpETEdOQlFXeENMRU5CUVdsRExGbEJRV3BETzBGQlEwRXNlVUpCUVV0TExFbEJRVXdzUTBGQlZVWXNUVUZCVmp0QlFVTklPMEZCU1Vvc1lVRXhRbmxETEVOQk1FSjRRMGNzU1VFeFFuZERMRU5CTUVKdVF5eEpRVEZDYlVNc1EwRkJNVU03UVVFMFFrZzdPenR4UTBGRldUdEJRVU5VTEdkQ1FVRkpReXhUUVVGVFF5eExRVUZMUXl4TFFVRk1MRU5CUVZkU0xHRkJRV0ZUTEU5QlFXSXNRMEZCY1VJc1lVRkJja0lzUTBGQldDeERRVUZpTzBGQlEwRXNaMEpCUVVsSUxGZEJRVmNzV1VGQlppeEZRVUUyUWp0QlFVTjZRaXh4UWtGQlMySXNTMEZCVEN4RFFVRlhMRU5CUVZnc1JVRkJZMGtzVDBGQlpDeEhRVUYzUWl4SlFVRjRRanRCUVVOQkxIRkNRVUZMVkN4TlFVRk1MRU5CUVZsVkxFdEJRVm9zUTBGQmEwSkxMRlZCUVd4Q0xFZEJRU3RDTEU5QlFTOUNPMEZCUTBFc2NVSkJRVXRpTEUxQlFVd3NRMEZCV1ZFc1MwRkJXaXhEUVVGclFrc3NWVUZCYkVJc1IwRkJLMElzVDBGQkwwSTdRVUZEUVN4eFFrRkJTMW9zVFVGQlRDeERRVUZaVHl4TFFVRmFMRU5CUVd0Q1N5eFZRVUZzUWl4SFFVRXJRaXhQUVVFdlFqdEJRVU5JTEdGQlRFUXNUVUZOU3l4SlFVRkpSeXhYUVVGWExFMUJRV1lzUlVGQmRVSTdRVUZEZUVJc2NVSkJRVXRpTEV0QlFVd3NRMEZCVnl4RFFVRllMRVZCUVdOSkxFOUJRV1FzUjBGQmQwSXNTVUZCZUVJN1FVRkRRU3h4UWtGQlMxUXNUVUZCVEN4RFFVRlpWU3hMUVVGYUxFTkJRV3RDU3l4VlFVRnNRaXhIUVVFclFpeFRRVUV2UWp0QlFVTkJMSEZDUVVGTFlpeE5RVUZNTEVOQlFWbFJMRXRCUVZvc1EwRkJhMEpMTEZWQlFXeENMRWRCUVN0Q0xGTkJRUzlDTzBGQlEwRXNjVUpCUVV0YUxFMUJRVXdzUTBGQldVOHNTMEZCV2l4RFFVRnJRa01zWTBGQmJFSXNRMEZCYVVNc1dVRkJha003UVVGRFNEdEJRVU5LT3pzN05rSkJSVWxITEVzc1JVRkJUenRCUVVOU0xHZENRVUZKVVN4UFFVRlBTQ3hMUVVGTFNTeFRRVUZNTEVOQlFXVlVMRXRCUVdZc1EwRkJXRHRCUVVOQlJpeDVRa0ZCWVZrc1QwRkJZaXhEUVVGeFFpeGhRVUZ5UWl4RlFVRnZRMFlzU1VGQmNFTTdRVUZEU0RzN096czdPMEZCUjB3c1NVRkJTVWNzVVVGQlVTeEpRVUZKTjBJc1RVRkJTaXhGUVVGYU8wRkJRMEUyUWl4TlFVRk5ReXhWUVVGT096dFJRVVZUT1VJc1RTeEhRVUZCUVN4Tklpd2labWxzWlNJNkluUm9aVzFsY3k1cWN5SXNJbk52ZFhKalpYTkRiMjUwWlc1MElqcGJJbU5zWVhOeklGUm9aVzFsY3lCN1hHNGdJQ0FnWTI5dWMzUnlkV04wYjNJb0tTQjdYRzRnSUNBZ0lDQWdJR3hsZENCdmNIUnBiMjV6SUQwZ1pHOWpkVzFsYm5RdVoyVjBSV3hsYldWdWRITkNlVTVoYldVb0oyOXdkR2x2Ym5NbktUdGNiaUFnSUNBZ0lDQWdiR1YwSUdobFlXUmxjaUE5SUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9KeTVvWldGa1pYSW5LVHRjYmlBZ0lDQWdJQ0FnYkdWMElHMXBaR1JzWlNBOUlHUnZZM1Z0Wlc1MExuRjFaWEo1VTJWc1pXTjBiM0lvSnk1dFlXbHVRMjl1ZEdWdWRESW5LVHRjYmlBZ0lDQWdJQ0FnYkdWMElHWnZiM1JsY2lBOUlHUnZZM1Z0Wlc1MExuRjFaWEo1VTJWc1pXTjBiM0lvSnk1bWIyOTBaWEpqYkdrbktUdGNiaUFnSUNBZ0lDQWdiR1YwSUhKaFpHbHZRMnhwWTJzZ1BTQmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0NjdVpHbDJVbUZrYVc4bktUdGNiaUFnSUNBZ0lDQWdkR2hwY3k1eVlXUnBieUE5SUc5d2RHbHZibk03WEc0Z0lDQWdJQ0FnSUhSb2FYTXVhR1ZoWkdWeUlEMGdhR1ZoWkdWeU8xeHVJQ0FnSUNBZ0lDQjBhR2x6TG0xcFpHUnNaU0E5SUcxcFpHUnNaVHRjYmlBZ0lDQWdJQ0FnZEdocGN5NW1iMjkwWlhJZ1BTQm1iMjkwWlhJN1hHNGdJQ0FnSUNBZ0lIUm9hWE11Y21Ga2FXOURiR2xqYXlBOUlISmhaR2x2UTJ4cFkyczdYRzRnSUNBZ2ZWeHVYRzRnSUNBZ2RHaGxiV1ZUZEdGMFpTZ3BJSHRjYmlBZ0lDQWdJQ0FnZEdocGN5NXpkR0YwWlVOb1pXTnJLQ2xjYmlBZ0lDQWdJQ0FnZEdocGN5NXlZV1JwYjBOc2FXTnJMbUZrWkVWMlpXNTBUR2x6ZEdWdVpYSW9YQ0pqYkdsamExd2lMQ0JtZFc1amRHbHZiaUFvS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0JwWmlBb2RHaHBjeTV5WVdScGIxc3dYUzUwZVhCbElEMDlQU0JjSW5KaFpHbHZYQ0lnSmlZZ2RHaHBjeTV5WVdScGIxc3dYUzVqYUdWamEyVmtLU0I3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NW9aV0ZrWlhJdWMzUjViR1V1Y21WdGIzWmxVSEp2Y0dWeWRIa29YQ0ppWVdOclozSnZkVzVrWENJcE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE11Yldsa1pHeGxMbk4wZVd4bExuSmxiVzkyWlZCeWIzQmxjblI1S0Z3aVltRmphMmR5YjNWdVpGd2lLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxtWnZiM1JsY2k1emRIbHNaUzV5WlcxdmRtVlFjbTl3WlhKMGVTaGNJbUpoWTJ0bmNtOTFibVJjSWlrN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2JHOWpZV3hUZEc5eVlXZGxMbkpsYlc5MlpVbDBaVzBvWENKdlltcGxZM1JVYUdWdFpWd2lLVHRjYmlBZ0lDQWdJQ0FnSUNBZ0lIMDdYRzRnSUNBZ0lDQWdJQ0FnSUNCcFppQW9kR2hwY3k1eVlXUnBiMXN4WFM1MGVYQmxJRDA5UFNCY0luSmhaR2x2WENJZ0ppWWdkR2hwY3k1eVlXUnBiMXN4WFM1amFHVmphMlZrS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2JHVjBJSFJvWlcxbElEMGdYQ0ppYkdGamExZG9hWFJsWENJN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2RHaHBjeTVvWldGa1pYSXVjM1I1YkdVdVltRmphMmR5YjNWdVpDQTlJRndpWW14aFkydGNJanRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxtMXBaR1JzWlM1emRIbHNaUzVpWVdOclozSnZkVzVrSUQwZ1hDSjNhR2wwWlZ3aU8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lIUm9hWE11Wm05dmRHVnlMbk4wZVd4bExtSmhZMnRuY205MWJtUWdQU0JjSW1Kc1lXTnJYQ0k3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZEdocGN5NXpZWFpsS0hSb1pXMWxLVHRjYmx4dVhHNGdJQ0FnSUNBZ0lDQWdJQ0I5TzF4dUlDQWdJQ0FnSUNBZ0lDQWdhV1lnS0hSb2FYTXVjbUZrYVc5Yk1sMHVkSGx3WlNBOVBUMGdYQ0p5WVdScGIxd2lJQ1ltSUhSb2FYTXVjbUZrYVc5Yk1sMHVZMmhsWTJ0bFpDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR3hsZENCMGFHVnRaU0E5SUZ3aWMyRnVaRndpTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhSb2FYTXVhR1ZoWkdWeUxuTjBlV3hsTG1KaFkydG5jbTkxYm1RZ1BTQmNJaU5FUlVJNE9EZGNJanRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxtMXBaR1JzWlM1emRIbHNaUzVpWVdOclozSnZkVzVrSUQwZ1hDSWpSa1pGTkVNMFhDSTdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k1bWIyOTBaWEl1YzNSNWJHVXVjbVZ0YjNabFVISnZjR1Z5ZEhrb1hDSmlZV05yWjNKdmRXNWtYQ0lwTzF4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhSb2FYTXVjMkYyWlNoMGFHVnRaU2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjlPMXh1WEc1Y2JseHVJQ0FnSUNBZ0lDQjlMbUpwYm1Rb2RHaHBjeWtwTzF4dVhHNGdJQ0FnZlZ4dVhHNGdJQ0FnYzNSaGRHVkRhR1ZqYXlncElIdGNiaUFnSUNBZ0lDQWdiR1YwSUhKbGRFOWlhaUE5SUVwVFQwNHVjR0Z5YzJVb2JHOWpZV3hUZEc5eVlXZGxMbWRsZEVsMFpXMG9YQ0p2WW1wbFkzUlVhR1Z0WlZ3aUtTazdYRzRnSUNBZ0lDQWdJR2xtSUNoeVpYUlBZbW9nUFQwOUlGd2lZbXhoWTJ0WGFHbDBaVndpS1NCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxuSmhaR2x2V3pGZExtTm9aV05yWldRZ1BTQjBjblZsTzF4dUlDQWdJQ0FnSUNBZ0lDQWdkR2hwY3k1b1pXRmtaWEl1YzNSNWJHVXVZbUZqYTJkeWIzVnVaQ0E5SUZ3aVlteGhZMnRjSWp0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFJvYVhNdWJXbGtaR3hsTG5OMGVXeGxMbUpoWTJ0bmNtOTFibVFnUFNCY0luZG9hWFJsWENJN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxtWnZiM1JsY2k1emRIbHNaUzVpWVdOclozSnZkVzVrSUQwZ1hDSmliR0ZqYTF3aU8xeHVJQ0FnSUNBZ0lDQjlYRzRnSUNBZ0lDQWdJR1ZzYzJVZ2FXWWdLSEpsZEU5aWFpQTlQVDBnWENKellXNWtYQ0lwSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFJvYVhNdWNtRmthVzliTWwwdVkyaGxZMnRsWkNBOUlIUnlkV1U3WEc0Z0lDQWdJQ0FnSUNBZ0lDQjBhR2x6TG1obFlXUmxjaTV6ZEhsc1pTNWlZV05yWjNKdmRXNWtJRDBnWENJalJFVkNPRGczWENJN1hHNGdJQ0FnSUNBZ0lDQWdJQ0IwYUdsekxtMXBaR1JzWlM1emRIbHNaUzVpWVdOclozSnZkVzVrSUQwZ1hDSWpSa1pGTkVNMFhDSTdYRzRnSUNBZ0lDQWdJQ0FnSUNCMGFHbHpMbVp2YjNSbGNpNXpkSGxzWlM1eVpXMXZkbVZRY205d1pYSjBlU2hjSW1KaFkydG5jbTkxYm1SY0lpazdYRzRnSUNBZ0lDQWdJSDFjYmlBZ0lDQjlYRzVjYmlBZ0lDQnpZWFpsS0hSb1pXMWxLU0I3WEc0Z0lDQWdJQ0FnSUd4bGRDQnpUMkpxSUQwZ1NsTlBUaTV6ZEhKcGJtZHBabmtvZEdobGJXVXBPMXh1SUNBZ0lDQWdJQ0JzYjJOaGJGTjBiM0poWjJVdWMyVjBTWFJsYlNoY0ltOWlhbVZqZEZSb1pXMWxYQ0lzSUhOUFltb3BPMXh1SUNBZ0lIMWNibjFjYmx4dWJHVjBJSE4wWVhSbElEMGdibVYzSUZSb1pXMWxjeWdwTzF4dWMzUmhkR1V1ZEdobGJXVlRkR0YwWlNncE8xeHVYRzVsZUhCdmNuUWdleUJVYUdWdFpYTWdmVHRjYmlKZGZRPT1cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvY29tcG9uZW50c1xcXFx0aGVtZXMuanNcIixcIi9jb21wb25lbnRzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfUm91dGVyID0gcmVxdWlyZShcIi4vdXRpbHMvUm91dGVyLmpzXCIpO1xuXG52YXIgX1JvdXRlcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9Sb3V0ZXIpO1xuXG52YXIgX21haW4gPSByZXF1aXJlKFwiLi9yb3V0ZXMvbWFpbi5qc1wiKTtcblxudmFyIF9zb25ncyA9IHJlcXVpcmUoXCIuL3JvdXRlcy9zb25ncy5qc1wiKTtcblxudmFyIF9hbGJ1bXMgPSByZXF1aXJlKFwiLi9yb3V0ZXMvYWxidW1zLmpzXCIpO1xuXG52YXIgX2Zhdm9yaXRlcyA9IHJlcXVpcmUoXCIuL3JvdXRlcy9mYXZvcml0ZXMuanNcIik7XG5cbnZhciBfYXV0aG9yID0gcmVxdWlyZShcIi4vcm91dGVzL2F1dGhvci5qc1wiKTtcblxudmFyIF9oZWxwID0gcmVxdWlyZShcIi4vcm91dGVzL2hlbHAuanNcIik7XG5cbnZhciBfdGhlbWVzID0gcmVxdWlyZShcIi4vY29tcG9uZW50cy90aGVtZXMuanNcIik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciByb3V0ZXMgPSBbX2F1dGhvci5hdXRob3IsIF9oZWxwLmhlbHAsIF9tYWluLm1haW4sIF9zb25ncy5zb25ncywgX2FsYnVtcy5hbGJ1bXMsIF9mYXZvcml0ZXMuZmF2b3JpdGVzXTtcblxubmV3IF9Sb3V0ZXIyLmRlZmF1bHQoeyByb3V0ZXM6IHJvdXRlcyB9KS5pbml0KCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbVpoYTJWZk1tWXpaVFpsT0RVdWFuTWlYU3dpYm1GdFpYTWlPbHNpY205MWRHVnpJaXdpYVc1cGRDSmRMQ0p0WVhCd2FXNW5jeUk2SWpzN1FVRkJRVHM3T3p0QlFVVkJPenRCUVVOQk96dEJRVU5CT3p0QlFVTkJPenRCUVVOQk96dEJRVU5CT3p0QlFVTkJPenM3TzBGQlJVRXNTVUZCU1VFc1UwRkJVeXcwUmtGQllqczdRVUZGUVN4eFFrRkJWeXhGUVVGRlFTeGpRVUZHTEVWQlFWZ3NSVUZCZFVKRExFbEJRWFpDSWl3aVptbHNaU0k2SW1aaGEyVmZNbVl6WlRabE9EVXVhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lKcGJYQnZjblFnVW05MWRHVnlJR1p5YjIwZ0p5NHZkWFJwYkhNdlVtOTFkR1Z5TG1wekp6dGNjbHh1WEhKY2JtbHRjRzl5ZENCN0lHMWhhVzRnZlNCbWNtOXRJRndpTGk5eWIzVjBaWE12YldGcGJpNXFjMXdpTzF4eVhHNXBiWEJ2Y25RZ2V5QnpiMjVuY3lCOUlHWnliMjBnWENJdUwzSnZkWFJsY3k5emIyNW5jeTVxYzF3aU8xeHlYRzVwYlhCdmNuUWdleUJoYkdKMWJYTWdmU0JtY205dElGd2lMaTl5YjNWMFpYTXZZV3hpZFcxekxtcHpYQ0k3WEhKY2JtbHRjRzl5ZENCN0lHWmhkbTl5YVhSbGN5QjlJR1p5YjIwZ1hDSXVMM0p2ZFhSbGN5OW1ZWFp2Y21sMFpYTXVhbk5jSWp0Y2NseHVhVzF3YjNKMElIc2dZWFYwYUc5eUlIMGdabkp2YlNBbkxpOXliM1YwWlhNdllYVjBhRzl5TG1wekp6dGNjbHh1YVcxd2IzSjBJSHNnYUdWc2NDQjlJR1p5YjIwZ0p5NHZjbTkxZEdWekwyaGxiSEF1YW5Nbk8xeHlYRzVwYlhCdmNuUWdleUJVYUdWdFpYTWdmU0JtY205dElGd2lMaTlqYjIxd2IyNWxiblJ6TDNSb1pXMWxjeTVxYzF3aU8xeHlYRzVjY2x4dWJHVjBJSEp2ZFhSbGN5QTlJRnRoZFhSb2IzSXNJR2hsYkhBc0lHMWhhVzRzSUhOdmJtZHpMQ0JoYkdKMWJYTXNJR1poZG05eWFYUmxjMTA3WEhKY2JseHlYRzV1WlhjZ1VtOTFkR1Z5S0hzZ2NtOTFkR1Z6SUgwcExtbHVhWFFvS1NKZGZRPT1cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvZmFrZV8yZjNlNmU4NS5qc1wiLFwiL1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmFsYnVtcyA9IHVuZGVmaW5lZDtcblxudmFyIF9BbGJ1bXMgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9BbGJ1bXNcIik7XG5cbnZhciBfQWxidW1zMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0FsYnVtcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBtYWluQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbkNvbnRlbnRcIik7XG52YXIgYWxidW1zcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWxidW1zXCIpO1xuXG52YXIgYWxidW1zID0ge1xuICAgIG5hbWU6IFwiYWxidW1zXCIsXG4gICAgbWF0Y2g6IFwiYWxidW1zXCIsXG4gICAgb25CZWZvcmVFbnRlcjogZnVuY3Rpb24gb25CZWZvcmVFbnRlcigpIHtcbiAgICAgICAgYWxidW1zcy5zdHlsZS5ib3JkZXJCb3R0b20gPSBcInNvbGlkIHllbGxvd1wiO1xuICAgIH0sXG4gICAgb25FbnRlcjogZnVuY3Rpb24gb25FbnRlcigpIHtcbiAgICAgICAgbmV3IF9BbGJ1bXMyLmRlZmF1bHQoKS5pbml0KCk7XG4gICAgfSxcbiAgICBvbkxlYXZlOiBmdW5jdGlvbiBvbkxlYXZlKCkge1xuICAgICAgICBtYWluQ29udGVudC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgYWxidW1zcy5zdHlsZS5ib3JkZXJCb3R0b20gPSAnJztcbiAgICB9XG59O1xuXG5leHBvcnRzLmFsYnVtcyA9IGFsYnVtcztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltRnNZblZ0Y3k1cWN5SmRMQ0p1WVcxbGN5STZXeUp0WVdsdVEyOXVkR1Z1ZENJc0ltUnZZM1Z0Wlc1MElpd2ljWFZsY25sVFpXeGxZM1J2Y2lJc0ltRnNZblZ0YzNNaUxDSmhiR0oxYlhNaUxDSnVZVzFsSWl3aWJXRjBZMmdpTENKdmJrSmxabTl5WlVWdWRHVnlJaXdpYzNSNWJHVWlMQ0ppYjNKa1pYSkNiM1IwYjIwaUxDSnZia1Z1ZEdWeUlpd2lhVzVwZENJc0ltOXVUR1ZoZG1VaUxDSnBibTVsY2toVVRVd2lYU3dpYldGd2NHbHVaM01pT2lJN096czdPenM3UVVGQlFUczdPenM3TzBGQlEwRXNTVUZCU1VFc1kwRkJZME1zVTBGQlUwTXNZVUZCVkN4RFFVRjFRaXhqUVVGMlFpeERRVUZzUWp0QlFVTkJMRWxCUVVsRExGVkJRVlZHTEZOQlFWTkRMR0ZCUVZRc1EwRkJkVUlzVTBGQmRrSXNRMEZCWkRzN1FVRkZRU3hKUVVGTlJTeFRRVUZUTzBGQlExaERMRlZCUVUwc1VVRkVTenRCUVVWWVF5eFhRVUZQTEZGQlJrazdRVUZIV0VNc2JVSkJRV1VzZVVKQlFVMDdRVUZEYWtKS0xHZENRVUZSU3l4TFFVRlNMRU5CUVdORExGbEJRV1FzUjBGQk5rSXNZMEZCTjBJN1FVRkRTQ3hMUVV4Vk8wRkJUVmhETEdGQlFWTXNiVUpCUVUwN1FVRkRXQ3dyUWtGQllVTXNTVUZCWWp0QlFVTklMRXRCVWxVN1FVRlRXRU1zWVVGQlV5eHRRa0ZCVFR0QlFVTllXaXh2UWtGQldXRXNVMEZCV2l4SFFVRjNRaXhGUVVGNFFqdEJRVU5CVml4blFrRkJVVXNzUzBGQlVpeERRVUZqUXl4WlFVRmtMRWRCUVRaQ0xFVkJRVGRDTzBGQlEwZzdRVUZhVlN4RFFVRm1PenRSUVdWVFRDeE5MRWRCUVVGQkxFMGlMQ0ptYVd4bElqb2lZV3hpZFcxekxtcHpJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpYVcxd2IzSjBJRUZzWW5WdGN5Qm1jbTl0SUNjdUxpOWpiMjF3YjI1bGJuUnpMMEZzWW5WdGN5ZGNibXhsZENCdFlXbHVRMjl1ZEdWdWRDQTlJR1J2WTNWdFpXNTBMbkYxWlhKNVUyVnNaV04wYjNJb1hDSXViV0ZwYmtOdmJuUmxiblJjSWlrN1hHNXNaWFFnWVd4aWRXMXpjeUE5SUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9YQ0l1WVd4aWRXMXpYQ0lwTzF4dVhHNWpiMjV6ZENCaGJHSjFiWE1nUFNCN1hHNGdJQ0FnYm1GdFpUb2dYQ0poYkdKMWJYTmNJaXhjYmlBZ0lDQnRZWFJqYURvZ1hDSmhiR0oxYlhOY0lpeGNiaUFnSUNCdmJrSmxabTl5WlVWdWRHVnlPaUFvS1NBOVBpQjdYRzRnSUNBZ0lDQWdJR0ZzWW5WdGMzTXVjM1I1YkdVdVltOXlaR1Z5UW05MGRHOXRJRDBnWENKemIyeHBaQ0I1Wld4c2IzZGNJanRjYmlBZ0lDQjlMRnh1SUNBZ0lHOXVSVzUwWlhJNklDZ3BJRDArSUh0Y2JpQWdJQ0FnSUNBZ2JtVjNJRUZzWW5WdGN5Z3BMbWx1YVhRb0tUdGNiaUFnSUNCOUxGeHVJQ0FnSUc5dVRHVmhkbVU2SUNncElEMCtJSHRjYmlBZ0lDQWdJQ0FnYldGcGJrTnZiblJsYm5RdWFXNXVaWEpJVkUxTUlEMGdKeWM3WEc0Z0lDQWdJQ0FnSUdGc1luVnRjM011YzNSNWJHVXVZbTl5WkdWeVFtOTBkRzl0SUQwZ0p5YzdYRzRnSUNBZ2ZWeHVmVHRjYmx4dVpYaHdiM0owSUhzZ1lXeGlkVzF6SUgwN0lsMTlcbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvcm91dGVzXFxcXGFsYnVtcy5qc1wiLFwiL3JvdXRlc1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgbWFpbkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW5Db250ZW50XCIpO1xuXG52YXIgYXV0aG9yID0ge1xuICAgIG5hbWU6IFwiYXV0aG9yXCIsXG4gICAgbWF0Y2g6IFwiYXV0aG9yXCIsXG4gICAgb25CZWZvcmVFbnRlcjogZnVuY3Rpb24gb25CZWZvcmVFbnRlcigpIHt9LFxuICAgIG9uRW50ZXI6IGZ1bmN0aW9uIG9uRW50ZXIoKSB7XG4gICAgICAgIG1haW5Db250ZW50LmlubmVySFRNTCA9IFwiXFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJhdXRob3JJTUdcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiZGVtby1jYXJkLWltYWdlIG1kbC1jYXJkIG1kbC1zaGFkb3ctLTJkcFxcXCI+XFxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cXFwibWRsLWNhcmRfX3RpdGxlIG1kbC1jYXJkLS1leHBhbmRcXFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVxcXCJtZGwtY2FyZF9fYWN0aW9uc1xcXCI+XFxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVxcXCJkZW1vLWNhcmQtaW1hZ2VfX2ZpbGVuYW1lXFxcIj5BbGV4IE1hbHY8L3NwYW4+ICAgICAgXFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgICAgPGRpdiBjbGFzcyA9XFxcImF1dGhvclRleHRcXFwiPlxcbiAgICAgICAgTXVzaWMgaXMgYW4gYXJ0IGZvcm0gYW5kIGN1bHR1cmFsIGFjdGl2aXR5IHdob3NlIG1lZGl1bSBpcyBzb3VuZCBvcmdhbml6ZWQgaW4gdGltZS4gPGJyPlxcbiAgICAgICAgSSBob3BlIHRoaXMgcGxheWVyIHdpbGwgb25seSBoZWxwIHlvdSB0byBlbmpveSB0aGUgYXJ0LlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgXCI7XG4gICAgfSxcbiAgICBvbkxlYXZlOiBmdW5jdGlvbiBvbkxlYXZlKCkge1xuICAgICAgICBtYWluQ29udGVudC5pbm5lckhUTUwgPSAnJztcbiAgICB9XG59O1xuXG5leHBvcnRzLmF1dGhvciA9IGF1dGhvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltRjFkR2h2Y2k1cWN5SmRMQ0p1WVcxbGN5STZXeUp0WVdsdVEyOXVkR1Z1ZENJc0ltUnZZM1Z0Wlc1MElpd2ljWFZsY25sVFpXeGxZM1J2Y2lJc0ltRjFkR2h2Y2lJc0ltNWhiV1VpTENKdFlYUmphQ0lzSW05dVFtVm1iM0psUlc1MFpYSWlMQ0p2YmtWdWRHVnlJaXdpYVc1dVpYSklWRTFNSWl3aWIyNU1aV0YyWlNKZExDSnRZWEJ3YVc1bmN5STZJanM3T3pzN1FVRkJRU3hKUVVGSlFTeGpRVUZqUXl4VFFVRlRReXhoUVVGVUxFTkJRWFZDTEdOQlFYWkNMRU5CUVd4Q096dEJRVVZCTEVsQlFVMURMRk5CUVZNN1FVRkRXRU1zVlVGQlRTeFJRVVJMTzBGQlJWaERMRmRCUVU4c1VVRkdTVHRCUVVkWVF5eHRRa0ZCWlN4NVFrRkJUU3hEUVVGSExFTkJTR0k3UVVGSldFTXNZVUZCVXl4dFFrRkJUVHRCUVVOWVVDeHZRa0ZCV1ZFc1UwRkJXanRCUVdOSUxFdEJia0pWTzBGQmIwSllReXhoUVVGVExHMUNRVUZOTzBGQlExaFVMRzlDUVVGWlVTeFRRVUZhTEVkQlFYZENMRVZCUVhoQ08wRkJSVWc3UVVGMlFsVXNRMEZCWmpzN1VVRXdRbE5NTEUwc1IwRkJRVUVzVFNJc0ltWnBiR1VpT2lKaGRYUm9iM0l1YW5NaUxDSnpiM1Z5WTJWelEyOXVkR1Z1ZENJNld5SnNaWFFnYldGcGJrTnZiblJsYm5RZ1BTQmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0Z3aUxtMWhhVzVEYjI1MFpXNTBYQ0lwTzF4dVhHNWpiMjV6ZENCaGRYUm9iM0lnUFNCN1hHNGdJQ0FnYm1GdFpUb2dYQ0poZFhSb2IzSmNJaXhjYmlBZ0lDQnRZWFJqYURvZ1hDSmhkWFJvYjNKY0lpeGNiaUFnSUNCdmJrSmxabTl5WlVWdWRHVnlPaUFvS1NBOVBpQjdJSDBzWEc0Z0lDQWdiMjVGYm5SbGNqb2dLQ2tnUFQ0Z2UxeHVJQ0FnSUNBZ0lDQnRZV2x1UTI5dWRHVnVkQzVwYm01bGNraFVUVXdnUFNCZ1hHNGdJQ0FnSUNBZ0lEeGthWFlnWTJ4aGMzTTlYQ0poZFhSb2IzSkpUVWRjSWo1Y2JpQWdJQ0FnSUNBZ1BHUnBkaUJqYkdGemN6MWNJbVJsYlc4dFkyRnlaQzFwYldGblpTQnRaR3d0WTJGeVpDQnRaR3d0YzJoaFpHOTNMUzB5WkhCY0lqNWNiaUFnSUNBZ0lDQWdJQ0FnSUR4a2FYWWdZMnhoYzNNOVhDSnRaR3d0WTJGeVpGOWZkR2wwYkdVZ2JXUnNMV05oY21RdExXVjRjR0Z1WkZ3aVBqd3ZaR2wyUGx4dUlDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUR4a2FYWWdZMnhoYzNNOVhDSnRaR3d0WTJGeVpGOWZZV04wYVc5dWMxd2lQbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJRHh6Y0dGdUlHTnNZWE56UFZ3aVpHVnRieTFqWVhKa0xXbHRZV2RsWDE5bWFXeGxibUZ0WlZ3aVBrRnNaWGdnVFdGc2Rqd3ZjM0JoYmo0Z0lDQWdJQ0JjYmlBZ0lDQWdJQ0FnSUNBZ0lEd3ZaR2wyUGx4dUlDQWdJQ0FnSUNBOEwyUnBkajVjYmlBZ0lDQWdJQ0FnUEM5a2FYWStYRzRnSUNBZ0lDQWdJRHhrYVhZZ1kyeGhjM01nUFZ3aVlYVjBhRzl5VkdWNGRGd2lQbHh1SUNBZ0lDQWdJQ0JOZFhOcFl5QnBjeUJoYmlCaGNuUWdabTl5YlNCaGJtUWdZM1ZzZEhWeVlXd2dZV04wYVhacGRIa2dkMmh2YzJVZ2JXVmthWFZ0SUdseklITnZkVzVrSUc5eVoyRnVhWHBsWkNCcGJpQjBhVzFsTGlBOFluSStYRzRnSUNBZ0lDQWdJRWtnYUc5d1pTQjBhR2x6SUhCc1lYbGxjaUIzYVd4c0lHOXViSGtnYUdWc2NDQjViM1VnZEc4Z1pXNXFiM2tnZEdobElHRnlkQzVjYmlBZ0lDQWdJQ0FnUEM5a2FYWStYRzRnSUNBZ0lDQmdPMXh1SUNBZ0lIMHNYRzRnSUNBZ2IyNU1aV0YyWlRvZ0tDa2dQVDRnZTF4dUlDQWdJQ0FnSUNCdFlXbHVRMjl1ZEdWdWRDNXBibTVsY2toVVRVd2dQU0FuSnp0Y2JseHVJQ0FnSUgxY2JuMDdYRzVjYm1WNGNHOXlkQ0I3SUdGMWRHaHZjaUI5T3lKZGZRPT1cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvcm91dGVzXFxcXGF1dGhvci5qc1wiLFwiL3JvdXRlc1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmZhdm9yaXRlcyA9IHVuZGVmaW5lZDtcblxudmFyIF9GYXZvcml0ZXMgPSByZXF1aXJlKFwiLi4vY29tcG9uZW50cy9GYXZvcml0ZXNcIik7XG5cbnZhciBfRmF2b3JpdGVzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX0Zhdm9yaXRlcyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbnZhciBtYWluQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbkNvbnRlbnRcIik7XG52YXIgc29uZ3NzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mYXZvcml0ZXNcIik7XG5cbnZhciBmYXZvcml0ZXMgPSB7XG4gICAgbmFtZTogXCJmYXZvcml0ZXNcIixcbiAgICBtYXRjaDogXCJmYXZvcml0ZXNcIixcbiAgICBvbkJlZm9yZUVudGVyOiBmdW5jdGlvbiBvbkJlZm9yZUVudGVyKCkge1xuICAgICAgICBzb25nc3Muc3R5bGUuYm9yZGVyQm90dG9tID0gXCJzb2xpZCB5ZWxsb3dcIjtcbiAgICB9LFxuICAgIG9uRW50ZXI6IGZ1bmN0aW9uIG9uRW50ZXIoKSB7XG4gICAgICAgIG5ldyBfRmF2b3JpdGVzMi5kZWZhdWx0KCkuaW5pdCgpO1xuICAgIH0sXG4gICAgb25MZWF2ZTogZnVuY3Rpb24gb25MZWF2ZSgpIHtcbiAgICAgICAgbWFpbkNvbnRlbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIHNvbmdzcy5zdHlsZS5ib3JkZXJCb3R0b20gPSAnJztcbiAgICB9XG59O1xuXG5leHBvcnRzLmZhdm9yaXRlcyA9IGZhdm9yaXRlcztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltWmhkbTl5YVhSbGN5NXFjeUpkTENKdVlXMWxjeUk2V3lKdFlXbHVRMjl1ZEdWdWRDSXNJbVJ2WTNWdFpXNTBJaXdpY1hWbGNubFRaV3hsWTNSdmNpSXNJbk52Ym1kemN5SXNJbVpoZG05eWFYUmxjeUlzSW01aGJXVWlMQ0p0WVhSamFDSXNJbTl1UW1WbWIzSmxSVzUwWlhJaUxDSnpkSGxzWlNJc0ltSnZjbVJsY2tKdmRIUnZiU0lzSW05dVJXNTBaWElpTENKcGJtbDBJaXdpYjI1TVpXRjJaU0lzSW1sdWJtVnlTRlJOVENKZExDSnRZWEJ3YVc1bmN5STZJanM3T3pzN096dEJRVUZCT3pzN096czdRVUZEUVN4SlFVRkpRU3hqUVVGalF5eFRRVUZUUXl4aFFVRlVMRU5CUVhWQ0xHTkJRWFpDTEVOQlFXeENPMEZCUTBFc1NVRkJTVU1zVTBGQlUwWXNVMEZCVTBNc1lVRkJWQ3hEUVVGMVFpeFpRVUYyUWl4RFFVRmlPenRCUVVWQkxFbEJRVTFGTEZsQlFWazdRVUZEWkVNc1ZVRkJUU3hYUVVSUk8wRkJSV1JETEZkQlFVOHNWMEZHVHp0QlFVZGtReXh0UWtGQlpTeDVRa0ZCVFR0QlFVTnFRa29zWlVGQlQwc3NTMEZCVUN4RFFVRmhReXhaUVVGaUxFZEJRVFJDTEdOQlFUVkNPMEZCUTBnc1MwRk1ZVHRCUVUxa1F5eGhRVUZUTEcxQ1FVRk5PMEZCUTFnc2EwTkJRV2RDUXl4SlFVRm9RanRCUVVOSUxFdEJVbUU3UVVGVFpFTXNZVUZCVXl4dFFrRkJUVHRCUVVOWVdpeHZRa0ZCV1dFc1UwRkJXaXhIUVVGM1FpeEZRVUY0UWp0QlFVTkJWaXhsUVVGUFN5eExRVUZRTEVOQlFXRkRMRmxCUVdJc1IwRkJORUlzUlVGQk5VSTdRVUZEU0R0QlFWcGhMRU5CUVd4Q096dFJRV1ZUVEN4VExFZEJRVUZCTEZNaUxDSm1hV3hsSWpvaVptRjJiM0pwZEdWekxtcHpJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpYVcxd2IzSjBJRVpoZG05eWFYUmxjeUJtY205dElDY3VMaTlqYjIxd2IyNWxiblJ6TDBaaGRtOXlhWFJsY3lkY2JteGxkQ0J0WVdsdVEyOXVkR1Z1ZENBOUlHUnZZM1Z0Wlc1MExuRjFaWEo1VTJWc1pXTjBiM0lvWENJdWJXRnBia052Ym5SbGJuUmNJaWs3WEc1c1pYUWdjMjl1WjNOeklEMGdaRzlqZFcxbGJuUXVjWFZsY25sVFpXeGxZM1J2Y2loY0lpNW1ZWFp2Y21sMFpYTmNJaWs3WEc1Y2JtTnZibk4wSUdaaGRtOXlhWFJsY3lBOUlIdGNiaUFnSUNCdVlXMWxPaUJjSW1aaGRtOXlhWFJsYzF3aUxGeHVJQ0FnSUcxaGRHTm9PaUJjSW1aaGRtOXlhWFJsYzF3aUxGeHVJQ0FnSUc5dVFtVm1iM0psUlc1MFpYSTZJQ2dwSUQwK0lIdGNiaUFnSUNBZ0lDQWdjMjl1WjNOekxuTjBlV3hsTG1KdmNtUmxja0p2ZEhSdmJTQTlJRndpYzI5c2FXUWdlV1ZzYkc5M1hDSTdYRzRnSUNBZ2ZTeGNiaUFnSUNCdmJrVnVkR1Z5T2lBb0tTQTlQaUI3WEc0Z0lDQWdJQ0FnSUc1bGR5QkdZWFp2Y21sMFpYTW9LUzVwYm1sMEtDazdYRzRnSUNBZ2ZTeGNiaUFnSUNCdmJreGxZWFpsT2lBb0tTQTlQaUI3WEc0Z0lDQWdJQ0FnSUcxaGFXNURiMjUwWlc1MExtbHVibVZ5U0ZSTlRDQTlJQ2NuTzF4dUlDQWdJQ0FnSUNCemIyNW5jM011YzNSNWJHVXVZbTl5WkdWeVFtOTBkRzl0SUQwZ0p5YzdYRzRnSUNBZ2ZWeHVmVHRjYmx4dVpYaHdiM0owSUhzZ1ptRjJiM0pwZEdWeklIMDdJbDE5XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL3JvdXRlc1xcXFxmYXZvcml0ZXMuanNcIixcIi9yb3V0ZXNcIikiLCIoZnVuY3Rpb24gKHByb2Nlc3MsZ2xvYmFsLEJ1ZmZlcixfX2FyZ3VtZW50MCxfX2FyZ3VtZW50MSxfX2FyZ3VtZW50MixfX2FyZ3VtZW50MyxfX2ZpbGVuYW1lLF9fZGlybmFtZSl7XG5cInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xudmFyIG1haW5Db250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluQ29udGVudFwiKTtcblxudmFyIGhlbHAgPSB7IC8vbWFpbiBoZWxwXG4gICAgbmFtZTogXCJoZWxwXCIsXG4gICAgbWF0Y2g6IFwiaGVscFwiLFxuICAgIG9uQmVmb3JlRW50ZXI6IGZ1bmN0aW9uIG9uQmVmb3JlRW50ZXIoKSB7fSxcbiAgICBvbkVudGVyOiBmdW5jdGlvbiBvbkVudGVyKCkge1xuICAgICAgICBtYWluQ29udGVudC5pbm5lckhUTUwgPSBcIlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwiaGVscG1lXFxcIj5cXG4gICAgICAgIDxkaXY+XFxuICAgICAgICA8aDE+V0hBVD8hPC9oMT5cXG4gICAgICAgIDxoMj5UaGlzIGlzIGEgcGVyZmVjdCBkZXNpZ24gYW5kIHVzZXItZnJpZW5kbHkgd2ViLWFwcCFcXG4gICAgICAgIDwvaDI+XFxuICAgICAgICA8aDI+XFxuICAgICAgICA8ZGl2PklmIHlvdSB3YW50LCB5b3UgYWxzbyBjYW4gcmVwb3J0IHNvbWUgYnVncyA6IDxhIGhyZWY9XFxcImh0dHBzOi8vZ2l0aHViLmNvbS9Penp5TWFsdi9tdXNpY19wbGF5ZXIvaXNzdWVzXFxcIiB0YXJnZXQ9XFxcIl9ibGFua1xcXCJzdHlsZT1cXFwiY29sb3I6IHdoaXRlXFxcIj5HSVQ8L2E+PC9kaXY+XFxuICAgICAgICA8L2gyPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgXFxuICAgICAgXCI7XG4gICAgfSxcbiAgICBvbkxlYXZlOiBmdW5jdGlvbiBvbkxlYXZlKCkge1xuICAgICAgICBtYWluQ29udGVudC5pbm5lckhUTUwgPSAnJztcbiAgICB9XG59O1xuXG5leHBvcnRzLmhlbHAgPSBoZWxwO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSW1obGJIQXVhbk1pWFN3aWJtRnRaWE1pT2xzaWJXRnBia052Ym5SbGJuUWlMQ0prYjJOMWJXVnVkQ0lzSW5GMVpYSjVVMlZzWldOMGIzSWlMQ0pvWld4d0lpd2libUZ0WlNJc0ltMWhkR05vSWl3aWIyNUNaV1p2Y21WRmJuUmxjaUlzSW05dVJXNTBaWElpTENKcGJtNWxja2hVVFV3aUxDSnZia3hsWVhabElsMHNJbTFoY0hCcGJtZHpJam9pT3pzN096dEJRVUZCTEVsQlFVbEJMR05CUVdORExGTkJRVk5ETEdGQlFWUXNRMEZCZFVJc1kwRkJka0lzUTBGQmJFSTdPMEZCUlVFc1NVRkJUVU1zVDBGQlR5eEZRVUZGTzBGQlExaERMRlZCUVUwc1RVRkVSenRCUVVWVVF5eFhRVUZQTEUxQlJrVTdRVUZIVkVNc2JVSkJRV1VzZVVKQlFVMHNRMEZCUnl4RFFVaG1PMEZCU1ZSRExHRkJRVk1zYlVKQlFVMDdRVUZEV0ZBc2IwSkJRVmxSTEZOQlFWbzdRVUZoU0N4TFFXeENVVHRCUVcxQ1ZFTXNZVUZCVXl4dFFrRkJUVHRCUVVOWVZDeHZRa0ZCV1ZFc1UwRkJXaXhIUVVGM1FpeEZRVUY0UWp0QlFVTklPMEZCY2tKUkxFTkJRV0k3TzFGQmQwSlRUQ3hKTEVkQlFVRkJMRWtpTENKbWFXeGxJam9pYUdWc2NDNXFjeUlzSW5OdmRYSmpaWE5EYjI1MFpXNTBJanBiSW14bGRDQnRZV2x1UTI5dWRHVnVkQ0E5SUdSdlkzVnRaVzUwTG5GMVpYSjVVMlZzWldOMGIzSW9YQ0l1YldGcGJrTnZiblJsYm5SY0lpazdYRzVjYm1OdmJuTjBJR2hsYkhBZ1BTQjdJQzh2YldGcGJpQm9aV3h3WEc0Z0lDQWdibUZ0WlRvZ1hDSm9aV3h3WENJc1hHNGdJQ0FnYldGMFkyZzZJRndpYUdWc2NGd2lMRnh1SUNBZ0lHOXVRbVZtYjNKbFJXNTBaWEk2SUNncElEMCtJSHNnZlN4Y2JpQWdJQ0J2YmtWdWRHVnlPaUFvS1NBOVBpQjdYRzRnSUNBZ0lDQWdJRzFoYVc1RGIyNTBaVzUwTG1sdWJtVnlTRlJOVENBOUlHQmNiaUFnSUNBZ0lDQWdQR1JwZGlCamJHRnpjejFjSW1obGJIQnRaVndpUGx4dUlDQWdJQ0FnSUNBOFpHbDJQbHh1SUNBZ0lDQWdJQ0E4YURFK1YwaEJWRDhoUEM5b01UNWNiaUFnSUNBZ0lDQWdQR2d5UGxSb2FYTWdhWE1nWVNCd1pYSm1aV04wSUdSbGMybG5iaUJoYm1RZ2RYTmxjaTFtY21sbGJtUnNlU0IzWldJdFlYQndJVnh1SUNBZ0lDQWdJQ0E4TDJneVBseHVJQ0FnSUNBZ0lDQThhREkrWEc0Z0lDQWdJQ0FnSUR4a2FYWStTV1lnZVc5MUlIZGhiblFzSUhsdmRTQmhiSE52SUdOaGJpQnlaWEJ2Y25RZ2MyOXRaU0JpZFdkeklEb2dQR0VnYUhKbFpqMWNJbWgwZEhCek9pOHZaMmwwYUhWaUxtTnZiUzlQZW5wNVRXRnNkaTl0ZFhOcFkxOXdiR0Y1WlhJdmFYTnpkV1Z6WENJZ2RHRnlaMlYwUFZ3aVgySnNZVzVyWENKemRIbHNaVDFjSW1OdmJHOXlPaUIzYUdsMFpWd2lQa2RKVkR3dllUNDhMMlJwZGo1Y2JpQWdJQ0FnSUNBZ1BDOW9NajVjYmlBZ0lDQWdJQ0FnUEM5a2FYWStYRzRnSUNBZ0lDQWdJRHd2WkdsMlBseHVJQ0FnSUNBZ0lGeHVJQ0FnSUNBZ1lEdGNiaUFnSUNCOUxGeHVJQ0FnSUc5dVRHVmhkbVU2SUNncElEMCtJSHRjYmlBZ0lDQWdJQ0FnYldGcGJrTnZiblJsYm5RdWFXNXVaWEpJVkUxTUlEMGdKeWM3WEc0Z0lDQWdmVnh1ZlR0Y2JseHVaWGh3YjNKMElIc2dhR1ZzY0NCOU95SmRmUT09XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL3JvdXRlc1xcXFxoZWxwLmpzXCIsXCIvcm91dGVzXCIpIiwiKGZ1bmN0aW9uIChwcm9jZXNzLGdsb2JhbCxCdWZmZXIsX19hcmd1bWVudDAsX19hcmd1bWVudDEsX19hcmd1bWVudDIsX19hcmd1bWVudDMsX19maWxlbmFtZSxfX2Rpcm5hbWUpe1xuXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMubWFpbiA9IHVuZGVmaW5lZDtcblxudmFyIF9hcGlDb25uZWN0ID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvYXBpQ29ubmVjdC5qc1wiKTtcblxudmFyIG1haW5Db250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluQ29udGVudFwiKTtcbnZhciBtYWluY2hvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluXCIpO1xuXG52YXIgbWFpbiA9IHtcbiAgICBuYW1lOiBcIm1haW5cIixcbiAgICBtYXRjaDogXCJcIixcbiAgICBvbkJlZm9yZUVudGVyOiBmdW5jdGlvbiBvbkJlZm9yZUVudGVyKCkge1xuICAgICAgICBtYWluY2hvLnN0eWxlLmJvcmRlckJvdHRvbSA9IFwic29saWQgeWVsbG93XCI7XG4gICAgfSxcbiAgICBvbkVudGVyOiBmdW5jdGlvbiBvbkVudGVyKCkge1xuICAgICAgICB2YXIgY29ubmVjdCA9IG5ldyBfYXBpQ29ubmVjdC5BcGlDb25uZWN0KCk7XG4gICAgICAgIGNvbm5lY3QuaW5pdCgpO1xuICAgIH0sXG4gICAgb25MZWF2ZTogZnVuY3Rpb24gb25MZWF2ZSgpIHtcbiAgICAgICAgbWFpbkNvbnRlbnQuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIG1haW5jaG8uc3R5bGUuYm9yZGVyQm90dG9tID0gJyc7XG4gICAgfVxufTtcblxuZXhwb3J0cy5tYWluID0gbWFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltMWhhVzR1YW5NaVhTd2libUZ0WlhNaU9sc2liV0ZwYmtOdmJuUmxiblFpTENKa2IyTjFiV1Z1ZENJc0luRjFaWEo1VTJWc1pXTjBiM0lpTENKdFlXbHVZMmh2SWl3aWJXRnBiaUlzSW01aGJXVWlMQ0p0WVhSamFDSXNJbTl1UW1WbWIzSmxSVzUwWlhJaUxDSnpkSGxzWlNJc0ltSnZjbVJsY2tKdmRIUnZiU0lzSW05dVJXNTBaWElpTENKamIyNXVaV04wSWl3aWFXNXBkQ0lzSW05dVRHVmhkbVVpTENKcGJtNWxja2hVVFV3aVhTd2liV0Z3Y0dsdVozTWlPaUk3T3pzN096czdRVUZCUVRzN1FVRkRRU3hKUVVGSlFTeGpRVUZqUXl4VFFVRlRReXhoUVVGVUxFTkJRWFZDTEdOQlFYWkNMRU5CUVd4Q08wRkJRMEVzU1VGQlNVTXNWVUZCVlVZc1UwRkJVME1zWVVGQlZDeERRVUYxUWl4UFFVRjJRaXhEUVVGa096dEJRVWxCTEVsQlFVMUZMRTlCUVU4N1FVRkRWRU1zVlVGQlRTeE5RVVJITzBGQlJWUkRMRmRCUVU4c1JVRkdSVHRCUVVkVVF5eHRRa0ZCWlN4NVFrRkJUVHRCUVVOcVFrb3NaMEpCUVZGTExFdEJRVklzUTBGQlkwTXNXVUZCWkN4SFFVRTJRaXhqUVVFM1FqdEJRVU5JTEV0QlRGRTdRVUZOVkVNc1lVRkJVeXh0UWtGQlRUdEJRVU5ZTEZsQlFVbERMRlZCUVZVc05FSkJRV1E3UVVGRFFVRXNaMEpCUVZGRExFbEJRVkk3UVVGRFNDeExRVlJSTzBGQlZWUkRMR0ZCUVZNc2JVSkJRVTA3UVVGRFdHSXNiMEpCUVZsakxGTkJRVm9zUjBGQmQwSXNSVUZCZUVJN1FVRkRRVmdzWjBKQlFWRkxMRXRCUVZJc1EwRkJZME1zV1VGQlpDeEhRVUUyUWl4RlFVRTNRanRCUVVWSU8wRkJaRkVzUTBGQllqczdVVUZwUWxOTUxFa3NSMEZCUVVFc1NTSXNJbVpwYkdVaU9pSnRZV2x1TG1weklpd2ljMjkxY21ObGMwTnZiblJsYm5RaU9sc2lhVzF3YjNKMElIc2dRWEJwUTI5dWJtVmpkQ0I5SUdaeWIyMGdKeTR1TDJOdmJYQnZibVZ1ZEhNdllYQnBRMjl1Ym1WamRDNXFjeWM3WEc1c1pYUWdiV0ZwYmtOdmJuUmxiblFnUFNCa2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLRndpTG0xaGFXNURiMjUwWlc1MFhDSXBPMXh1YkdWMElHMWhhVzVqYUc4Z1BTQmtiMk4xYldWdWRDNXhkV1Z5ZVZObGJHVmpkRzl5S0Z3aUxtMWhhVzVjSWlrN1hHNWNibHh1WEc1amIyNXpkQ0J0WVdsdUlEMGdlMXh1SUNBZ0lHNWhiV1U2SUZ3aWJXRnBibHdpTEZ4dUlDQWdJRzFoZEdOb09pQmNJbHdpTEZ4dUlDQWdJRzl1UW1WbWIzSmxSVzUwWlhJNklDZ3BJRDArSUh0Y2JpQWdJQ0FnSUNBZ2JXRnBibU5vYnk1emRIbHNaUzVpYjNKa1pYSkNiM1IwYjIwZ1BTQmNJbk52Ykdsa0lIbGxiR3h2ZDF3aU8xeHVJQ0FnSUgwc1hHNGdJQ0FnYjI1RmJuUmxjam9nS0NrZ1BUNGdlMXh1SUNBZ0lDQWdJQ0JzWlhRZ1kyOXVibVZqZENBOUlHNWxkeUJCY0dsRGIyNXVaV04wS0NrN1hHNGdJQ0FnSUNBZ0lHTnZibTVsWTNRdWFXNXBkQ2dwTzF4dUlDQWdJSDBzWEc0Z0lDQWdiMjVNWldGMlpUb2dLQ2tnUFQ0Z2UxeHVJQ0FnSUNBZ0lDQnRZV2x1UTI5dWRHVnVkQzVwYm01bGNraFVUVXdnUFNBbkp6dGNiaUFnSUNBZ0lDQWdiV0ZwYm1Ob2J5NXpkSGxzWlM1aWIzSmtaWEpDYjNSMGIyMGdQU0FuSnp0Y2JseHVJQ0FnSUgxY2JuMDdYRzVjYm1WNGNHOXlkQ0I3SUcxaGFXNGdmVHNpWFgwPVxufSkuY2FsbCh0aGlzLHJlcXVpcmUoXCJlL1UrOTdcIiksdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9LHJlcXVpcmUoXCJidWZmZXJcIikuQnVmZmVyLGFyZ3VtZW50c1szXSxhcmd1bWVudHNbNF0sYXJndW1lbnRzWzVdLGFyZ3VtZW50c1s2XSxcIi9yb3V0ZXNcXFxcbWFpbi5qc1wiLFwiL3JvdXRlc1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcblwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLnNvbmdzID0gdW5kZWZpbmVkO1xuXG52YXIgX1NvbmdzID0gcmVxdWlyZShcIi4uL2NvbXBvbmVudHMvU29uZ3NcIik7XG5cbnZhciBfU29uZ3MyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfU29uZ3MpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG52YXIgbWFpbkNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW5Db250ZW50XCIpO1xudmFyIHNvbmdzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc29uZ3NcIik7XG52YXIgc29uZ3MgPSB7XG4gICAgbmFtZTogXCJzb25nc1wiLFxuICAgIG1hdGNoOiBcInNvbmdzXCIsXG4gICAgb25CZWZvcmVFbnRlcjogZnVuY3Rpb24gb25CZWZvcmVFbnRlcigpIHtcbiAgICAgICAgc29uZ3NzLnN0eWxlLmJvcmRlckJvdHRvbSA9IFwic29saWQgeWVsbG93XCI7XG4gICAgfSxcbiAgICBvbkVudGVyOiBmdW5jdGlvbiBvbkVudGVyKCkge1xuXG4gICAgICAgIG5ldyBfU29uZ3MyLmRlZmF1bHQoKS5pbml0KCk7XG4gICAgfSxcbiAgICBvbkxlYXZlOiBmdW5jdGlvbiBvbkxlYXZlKCkge1xuICAgICAgICBtYWluQ29udGVudC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgc29uZ3NzLnN0eWxlLmJvcmRlckJvdHRvbSA9ICcnO1xuICAgIH1cbn07XG5cbmV4cG9ydHMuc29uZ3MgPSBzb25ncztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkluTnZibWR6TG1weklsMHNJbTVoYldWeklqcGJJbTFoYVc1RGIyNTBaVzUwSWl3aVpHOWpkVzFsYm5RaUxDSnhkV1Z5ZVZObGJHVmpkRzl5SWl3aWMyOXVaM056SWl3aWMyOXVaM01pTENKdVlXMWxJaXdpYldGMFkyZ2lMQ0p2YmtKbFptOXlaVVZ1ZEdWeUlpd2ljM1I1YkdVaUxDSmliM0prWlhKQ2IzUjBiMjBpTENKdmJrVnVkR1Z5SWl3aWFXNXBkQ0lzSW05dVRHVmhkbVVpTENKcGJtNWxja2hVVFV3aVhTd2liV0Z3Y0dsdVozTWlPaUk3T3pzN096czdRVUZCUVRzN096czdPMEZCUTBFc1NVRkJTVUVzWTBGQlkwTXNVMEZCVTBNc1lVRkJWQ3hEUVVGMVFpeGpRVUYyUWl4RFFVRnNRanRCUVVOQkxFbEJRVWxETEZOQlFWTkdMRk5CUVZORExHRkJRVlFzUTBGQmRVSXNVVUZCZGtJc1EwRkJZanRCUVVOQkxFbEJRVTFGTEZGQlFWRTdRVUZEVmtNc1ZVRkJUU3hQUVVSSk8wRkJSVlpETEZkQlFVOHNUMEZHUnp0QlFVZFdReXh0UWtGQlpTeDVRa0ZCVFR0QlFVTnFRa29zWlVGQlQwc3NTMEZCVUN4RFFVRmhReXhaUVVGaUxFZEJRVFJDTEdOQlFUVkNPMEZCUTBnc1MwRk1VenRCUVUxV1F5eGhRVUZUTEcxQ1FVRk5PenRCUVVWWUxEaENRVUZaUXl4SlFVRmFPMEZCUTBnc1MwRlVVenRCUVZWV1F5eGhRVUZUTEcxQ1FVRk5PMEZCUTFoYUxHOUNRVUZaWVN4VFFVRmFMRWRCUVhkQ0xFVkJRWGhDTzBGQlEwRldMR1ZCUVU5TExFdEJRVkFzUTBGQllVTXNXVUZCWWl4SFFVRTBRaXhGUVVFMVFqdEJRVU5JTzBGQllsTXNRMEZCWkRzN1VVRm5RbE5NTEVzc1IwRkJRVUVzU3lJc0ltWnBiR1VpT2lKemIyNW5jeTVxY3lJc0luTnZkWEpqWlhORGIyNTBaVzUwSWpwYkltbHRjRzl5ZENCVGIyNW5jeUJtY205dElDY3VMaTlqYjIxd2IyNWxiblJ6TDFOdmJtZHpKMXh1YkdWMElHMWhhVzVEYjI1MFpXNTBJRDBnWkc5amRXMWxiblF1Y1hWbGNubFRaV3hsWTNSdmNpaGNJaTV0WVdsdVEyOXVkR1Z1ZEZ3aUtUdGNibXhsZENCemIyNW5jM01nUFNCa2IyTjFiV1Z1ZEM1eGRXVnllVk5sYkdWamRHOXlLRndpTG5OdmJtZHpYQ0lwTzF4dVkyOXVjM1FnYzI5dVozTWdQU0I3WEc0Z0lDQWdibUZ0WlRvZ1hDSnpiMjVuYzF3aUxGeHVJQ0FnSUcxaGRHTm9PaUJjSW5OdmJtZHpYQ0lzWEc0Z0lDQWdiMjVDWldadmNtVkZiblJsY2pvZ0tDa2dQVDRnZTF4dUlDQWdJQ0FnSUNCemIyNW5jM011YzNSNWJHVXVZbTl5WkdWeVFtOTBkRzl0SUQwZ1hDSnpiMnhwWkNCNVpXeHNiM2RjSWp0Y2JpQWdJQ0I5TEZ4dUlDQWdJRzl1Ulc1MFpYSTZJQ2dwSUQwK0lIdGNibHh1SUNBZ0lDQWdJQ0J1WlhjZ1UyOXVaM01vS1M1cGJtbDBLQ2s3WEc0Z0lDQWdmU3hjYmlBZ0lDQnZia3hsWVhabE9pQW9LU0E5UGlCN1hHNGdJQ0FnSUNBZ0lHMWhhVzVEYjI1MFpXNTBMbWx1Ym1WeVNGUk5UQ0E5SUNjbk8xeHVJQ0FnSUNBZ0lDQnpiMjVuYzNNdWMzUjViR1V1WW05eVpHVnlRbTkwZEc5dElEMGdKeWM3WEc0Z0lDQWdmVnh1ZlR0Y2JseHVaWGh3YjNKMElIc2djMjl1WjNNZ2ZUc2lYWDA9XG59KS5jYWxsKHRoaXMscmVxdWlyZShcImUvVSs5N1wiKSx0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30scmVxdWlyZShcImJ1ZmZlclwiKS5CdWZmZXIsYXJndW1lbnRzWzNdLGFyZ3VtZW50c1s0XSxhcmd1bWVudHNbNV0sYXJndW1lbnRzWzZdLFwiL3JvdXRlc1xcXFxzb25ncy5qc1wiLFwiL3JvdXRlc1wiKSIsIihmdW5jdGlvbiAocHJvY2VzcyxnbG9iYWwsQnVmZmVyLF9fYXJndW1lbnQwLF9fYXJndW1lbnQxLF9fYXJndW1lbnQyLF9fYXJndW1lbnQzLF9fZmlsZW5hbWUsX19kaXJuYW1lKXtcbid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgUm91dGVyID0gZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFJvdXRlcihvcHRpb25zLCBldmVudEJ1cykge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUm91dGVyKTtcblxuICAgICAgICB0aGlzLnJvdXRlcyA9IG9wdGlvbnMucm91dGVzO1xuICAgICAgICB0aGlzLmV2ZW50QnVzID0gZXZlbnRCdXM7XG4gICAgfVxuXG4gICAgX2NyZWF0ZUNsYXNzKFJvdXRlciwgW3tcbiAgICAgICAga2V5OiAnaW5pdCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBpbml0KCkge1xuICAgICAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2hhc2hjaGFuZ2UnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5oYW5kbGVyVVJsKGV2ZW50Lm9sZFVSTC5zcGxpdCgnIycpWzFdIHx8ICcnLCBldmVudC5uZXdVUkwuc3BsaXQoJyMnKVsxXSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlclVSbCh1bmRlZmluZWQsIHdpbmRvdy5sb2NhdGlvbi5oYXNoLnNsaWNlKDEpKTtcbiAgICAgICAgfVxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnaGFuZGxlclVSbCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYW5kbGVyVVJsKG9sZFVSTCwgbmV3VVJMKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICAgICAgdmFyIGN1cnJlbnRSb3V0ZSA9IHRoaXMucm91dGVzLmZpbmQoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGl0ZW0ubWF0Y2ggPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3VVJMID0gbmV3VVJMLnNwbGl0KFwiP1wiKVswXTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ld1VSTCA9PT0gaXRlbS5tYXRjaDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtLm1hdGNoID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubWF0Y2gobmV3VVJMKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0ubWF0Y2ggaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ld1VSTC5tYXRjaChpdGVtLm1hdGNoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKG9sZFVSTCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByZXZpb3VzUm91dGUgPSB0aGlzLnJvdXRlcy5maW5kKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaXRlbS5tYXRjaCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9sZFVSTCA9PT0gaXRlbS5tYXRjaDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbS5tYXRjaCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaXRlbS5tYXRjaChvbGRVUkwpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0ubWF0Y2ggaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvbGRVUkwubWF0Y2goaXRlbS5tYXRjaCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXZpb3VzUm91dGUgJiYgcHJldmlvdXNSb3V0ZS5vbkxlYXZlICYmIHByZXZpb3VzUm91dGUub25MZWF2ZShvbGRVUkwuc3BsaXQoXCI9XCIpWzFdKTtcbiAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50Um91dGUgJiYgY3VycmVudFJvdXRlLm9uQmVmb3JlRW50ZXIgJiYgY3VycmVudFJvdXRlLm9uQmVmb3JlRW50ZXIoKTtcbiAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjdXJyZW50Um91dGUgJiYgY3VycmVudFJvdXRlLm9uRW50ZXIgJiYgY3VycmVudFJvdXRlLm9uRW50ZXIoX3RoaXMyLmV2ZW50QnVzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIFJvdXRlcjtcbn0oKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gUm91dGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LGV5SjJaWEp6YVc5dUlqb3pMQ0p6YjNWeVkyVnpJanBiSWxKdmRYUmxjaTVxY3lKZExDSnVZVzFsY3lJNld5SlNiM1YwWlhJaUxDSnZjSFJwYjI1eklpd2laWFpsYm5SQ2RYTWlMQ0p5YjNWMFpYTWlMQ0ozYVc1a2IzY2lMQ0poWkdSRmRtVnVkRXhwYzNSbGJtVnlJaXdpYUdGdVpHeGxjbFZTYkNJc0ltVjJaVzUwSWl3aWIyeGtWVkpNSWl3aWMzQnNhWFFpTENKdVpYZFZVa3dpTENKMWJtUmxabWx1WldRaUxDSnNiMk5oZEdsdmJpSXNJbWhoYzJnaUxDSnpiR2xqWlNJc0ltTjFjbkpsYm5SU2IzVjBaU0lzSW1acGJtUWlMQ0pwZEdWdElpd2liV0YwWTJnaUxDSlNaV2RGZUhBaUxDSndjbVYyYVc5MWMxSnZkWFJsSWl3aVVISnZiV2x6WlNJc0luSmxjMjlzZG1VaUxDSjBhR1Z1SWl3aWIyNU1aV0YyWlNJc0ltOXVRbVZtYjNKbFJXNTBaWElpTENKdmJrVnVkR1Z5SWwwc0ltMWhjSEJwYm1keklqb2lPenM3T3pzN096czdPMGxCUVUxQkxFMDdRVUZEUml4dlFrRkJXVU1zVDBGQldpeEZRVUZ4UWtNc1VVRkJja0lzUlVGQkswSTdRVUZCUVRzN1FVRkRNMElzWVVGQlMwTXNUVUZCVEN4SFFVRmpSaXhSUVVGUlJTeE5RVUYwUWp0QlFVTkJMR0ZCUVV0RUxGRkJRVXdzUjBGQlowSkJMRkZCUVdoQ08wRkJRMGc3T3pzN0swSkJSVTA3UVVGQlFUczdRVUZEU0VVc2JVSkJRVTlETEdkQ1FVRlFMRU5CUVhkQ0xGbEJRWGhDTEVWQlFYTkRMR2xDUVVGVE8wRkJRek5ETEhOQ1FVRkxReXhWUVVGTUxFTkJRMGxETEUxQlFVMURMRTFCUVU0c1EwRkJZVU1zUzBGQllpeERRVUZ0UWl4SFFVRnVRaXhGUVVGM1FpeERRVUY0UWl4TFFVRTRRaXhGUVVSc1F5eEZRVVZKUml4TlFVRk5SeXhOUVVGT0xFTkJRV0ZFTEV0QlFXSXNRMEZCYlVJc1IwRkJia0lzUlVGQmQwSXNRMEZCZUVJc1EwRkdTanRCUVVsSUxHRkJURVE3UVVGTlFTeHBRa0ZCUzBnc1ZVRkJUQ3hEUVVGblFrc3NVMEZCYUVJc1JVRkJNa0pRTEU5QlFVOVJMRkZCUVZBc1EwRkJaMEpETEVsQlFXaENMRU5CUVhGQ1F5eExRVUZ5UWl4RFFVRXlRaXhEUVVFelFpeERRVUV6UWp0QlFVTklPenM3YlVOQlJWVk9MRTBzUlVGQlVVVXNUU3hGUVVGUk8wRkJRVUU3TzBGQlJYWkNMR2RDUVVGSlN5eGxRVUZsTEV0QlFVdGFMRTFCUVV3c1EwRkJXV0VzU1VGQldpeERRVUZwUWl4blFrRkJVVHRCUVVONFF5eHZRa0ZCU1N4UFFVRlBReXhMUVVGTFF5eExRVUZhTEV0QlFYTkNMRkZCUVRGQ0xFVkJRVzlETzBGQlEyaERVaXcyUWtGQlUwRXNUMEZCVDBRc1MwRkJVQ3hEUVVGaExFZEJRV0lzUlVGQmEwSXNRMEZCYkVJc1EwRkJWRHRCUVVOQkxESkNRVUZQUXl4WFFVRlhUeXhMUVVGTFF5eExRVUYyUWp0QlFVTklMR2xDUVVoRUxFMUJSMDhzU1VGQlNTeFBRVUZQUkN4TFFVRkxReXhMUVVGYUxFdEJRWE5DTEZWQlFURkNMRVZCUVhORE8wRkJRM3BETERKQ1FVRlBSQ3hMUVVGTFF5eExRVUZNTEVOQlFWZFNMRTFCUVZnc1EwRkJVRHRCUVVOSUxHbENRVVpOTEUxQlJVRXNTVUZCU1U4c1MwRkJTME1zUzBGQlRDeFpRVUZ6UWtNc1RVRkJNVUlzUlVGQmEwTTdRVUZEY2tNc01rSkJRVTlVTEU5QlFVOVJMRXRCUVZBc1EwRkJZVVFzUzBGQlMwTXNTMEZCYkVJc1EwRkJVRHRCUVVOSU8wRkJRMG9zWVVGVWEwSXNRMEZCYmtJN08wRkJWMEVzWjBKQlFVbFdMRmRCUVZkSExGTkJRV1lzUlVGQk1FSTdRVUZEZEVJc2IwSkJRVWxUTEdkQ1FVRm5RaXhMUVVGTGFrSXNUVUZCVEN4RFFVRlpZU3hKUVVGYUxFTkJRV2xDTEdkQ1FVRlJPMEZCUTNwRExIZENRVUZKTEU5QlFVOURMRXRCUVV0RExFdEJRVm9zUzBGQmMwSXNVVUZCTVVJc1JVRkJiME03UVVGRGFFTXNLMEpCUVU5V0xGZEJRVmRUTEV0QlFVdERMRXRCUVhaQ08wRkJRMGdzY1VKQlJrUXNUVUZGVHl4SlFVRkpMRTlCUVU5RUxFdEJRVXRETEV0QlFWb3NTMEZCYzBJc1ZVRkJNVUlzUlVGQmMwTTdRVUZEZWtNc0swSkJRVTlFTEV0QlFVdERMRXRCUVV3c1EwRkJWMVlzVFVGQldDeERRVUZRTzBGQlEwZ3NjVUpCUmswc1RVRkZRU3hKUVVGSlV5eExRVUZMUXl4TFFVRk1MRmxCUVhOQ1F5eE5RVUV4UWl4RlFVRnJRenRCUVVOeVF5d3JRa0ZCVDFnc1QwRkJUMVVzUzBGQlVDeERRVUZoUkN4TFFVRkxReXhMUVVGc1FpeERRVUZRTzBGQlEwZzdRVUZEU2l4cFFrRlNiVUlzUTBGQmNFSTdRVUZUU0RzN1FVRkZSRWNzYjBKQlFWRkRMRTlCUVZJc1IwRkRTME1zU1VGRVRDeERRVVZSTzBGQlFVRXNkVUpCUTBGSUxHbENRVU5CUVN4alFVRmpTU3hQUVVSa0xFbEJSVUZLTEdOQlFXTkpMRTlCUVdRc1EwRkJjMEpvUWl4UFFVRlBReXhMUVVGUUxFTkJRV0VzUjBGQllpeEZRVUZyUWl4RFFVRnNRaXhEUVVGMFFpeERRVWhCTzBGQlFVRXNZVUZHVWl4RlFVOUxZeXhKUVZCTUxFTkJVVkU3UVVGQlFTeDFRa0ZEUVZJc1owSkJRMEZCTEdGQlFXRlZMR0ZCUkdJc1NVRkZRVllzWVVGQllWVXNZVUZCWWl4RlFVaEJPMEZCUVVFc1lVRlNVaXhGUVdGTFJpeEpRV0pNTEVOQlkxRTdRVUZCUVN4MVFrRkRRVklzWjBKQlEwRkJMR0ZCUVdGWExFOUJSR0lzU1VGRlFWZ3NZVUZCWVZjc1QwRkJZaXhEUVVGeFFpeFBRVUZMZUVJc1VVRkJNVUlzUTBGSVFUdEJRVUZCTEdGQlpGSTdRVUZ0UWtnN096czdPenRyUWtGSlZVWXNUU0lzSW1acGJHVWlPaUpTYjNWMFpYSXVhbk1pTENKemIzVnlZMlZ6UTI5dWRHVnVkQ0k2V3lKamJHRnpjeUJTYjNWMFpYSWdlMXh1SUNBZ0lHTnZibk4wY25WamRHOXlLRzl3ZEdsdmJuTXNJR1YyWlc1MFFuVnpLU0I3WEc0Z0lDQWdJQ0FnSUhSb2FYTXVjbTkxZEdWeklEMGdiM0IwYVc5dWN5NXliM1YwWlhNN1hHNGdJQ0FnSUNBZ0lIUm9hWE11WlhabGJuUkNkWE1nUFNCbGRtVnVkRUoxY3p0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0JwYm1sMEtDa2dlMXh1SUNBZ0lDQWdJQ0IzYVc1a2IzY3VZV1JrUlhabGJuUk1hWE4wWlc1bGNpZ25hR0Z6YUdOb1lXNW5aU2NzSUdWMlpXNTBJRDArSUh0Y2JpQWdJQ0FnSUNBZ0lDQWdJSFJvYVhNdWFHRnVaR3hsY2xWU2JDaGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQmxkbVZ1ZEM1dmJHUlZVa3d1YzNCc2FYUW9KeU1uS1ZzeFhTQjhmQ0FuSnl4Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCbGRtVnVkQzV1WlhkVlVrd3VjM0JzYVhRb0p5TW5LVnN4WFZ4dUlDQWdJQ0FnSUNBZ0lDQWdLVHRjYmlBZ0lDQWdJQ0FnZlNrN1hHNGdJQ0FnSUNBZ0lIUm9hWE11YUdGdVpHeGxjbFZTYkNoMWJtUmxabWx1WldRc0lIZHBibVJ2ZHk1c2IyTmhkR2x2Ymk1b1lYTm9Mbk5zYVdObEtERXBLVHRjYmlBZ0lDQjlYRzVjYmlBZ0lDQm9ZVzVrYkdWeVZWSnNLRzlzWkZWU1RDd2dibVYzVlZKTUtTQjdYRzVjYmlBZ0lDQWdJQ0FnYkdWMElHTjFjbkpsYm5SU2IzVjBaU0E5SUhSb2FYTXVjbTkxZEdWekxtWnBibVFvYVhSbGJTQTlQaUI3WEc0Z0lDQWdJQ0FnSUNBZ0lDQnBaaUFvZEhsd1pXOW1JR2wwWlcwdWJXRjBZMmdnUFQwOUlGd2ljM1J5YVc1blhDSXBJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J1WlhkVlVrd2dQU0J1WlhkVlVrd3VjM0JzYVhRb1hDSS9YQ0lwV3pCZE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCdVpYZFZVa3dnUFQwOUlHbDBaVzB1YldGMFkyZzdYRzRnSUNBZ0lDQWdJQ0FnSUNCOUlHVnNjMlVnYVdZZ0tIUjVjR1Z2WmlCcGRHVnRMbTFoZEdOb0lEMDlQU0JjSW1aMWJtTjBhVzl1WENJcElIdGNiaUFnSUNBZ0lDQWdJQ0FnSUNBZ0lDQnlaWFIxY200Z2FYUmxiUzV0WVhSamFDaHVaWGRWVWt3cE8xeHVJQ0FnSUNBZ0lDQWdJQ0FnZlNCbGJITmxJR2xtSUNocGRHVnRMbTFoZEdOb0lHbHVjM1JoYm1ObGIyWWdVbVZuUlhod0tTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjbVYwZFhKdUlHNWxkMVZTVEM1dFlYUmphQ2hwZEdWdExtMWhkR05vS1R0Y2JpQWdJQ0FnSUNBZ0lDQWdJSDFjYmlBZ0lDQWdJQ0FnZlNrN1hHNWNiaUFnSUNBZ0lDQWdhV1lnS0c5c1pGVlNUQ0FoUFQwZ2RXNWtaV1pwYm1Wa0tTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNCMllYSWdjSEpsZG1sdmRYTlNiM1YwWlNBOUlIUm9hWE11Y205MWRHVnpMbVpwYm1Rb2FYUmxiU0E5UGlCN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2FXWWdLSFI1Y0dWdlppQnBkR1Z0TG0xaGRHTm9JRDA5UFNCY0luTjBjbWx1WjF3aUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJ2YkdSVlVrd2dQVDA5SUdsMFpXMHViV0YwWTJnN1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2ZTQmxiSE5sSUdsbUlDaDBlWEJsYjJZZ2FYUmxiUzV0WVhSamFDQTlQVDBnWENKbWRXNWpkR2x2Ymx3aUtTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJwZEdWdExtMWhkR05vS0c5c1pGVlNUQ2s3WEc0Z0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnZlNCbGJITmxJR2xtSUNocGRHVnRMbTFoZEdOb0lHbHVjM1JoYm1ObGIyWWdVbVZuUlhod0tTQjdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0FnSUhKbGRIVnliaUJ2YkdSVlVrd3ViV0YwWTJnb2FYUmxiUzV0WVhSamFDazdYRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdmVnh1SUNBZ0lDQWdJQ0FnSUNBZ2ZTazdYRzRnSUNBZ0lDQWdJSDFjYmx4dUlDQWdJQ0FnSUNCUWNtOXRhWE5sTG5KbGMyOXNkbVVvS1Z4dUlDQWdJQ0FnSUNBZ0lDQWdMblJvWlc0b1hHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0tDa2dQVDVjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0J3Y21WMmFXOTFjMUp2ZFhSbElDWW1YRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdjSEpsZG1sdmRYTlNiM1YwWlM1dmJreGxZWFpsSUNZbVhHNGdJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ2NISmxkbWx2ZFhOU2IzVjBaUzV2Ymt4bFlYWmxLRzlzWkZWU1RDNXpjR3hwZENoY0lqMWNJaWxiTVYwcFhHNGdJQ0FnSUNBZ0lDQWdJQ0FwWEc0Z0lDQWdJQ0FnSUNBZ0lDQXVkR2hsYmloY2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNBb0tTQTlQbHh1SUNBZ0lDQWdJQ0FnSUNBZ0lDQWdJR04xY25KbGJuUlNiM1YwWlNBbUpseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHTjFjbkpsYm5SU2IzVjBaUzV2YmtKbFptOXlaVVZ1ZEdWeUlDWW1YRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdZM1Z5Y21WdWRGSnZkWFJsTG05dVFtVm1iM0psUlc1MFpYSW9LVnh1SUNBZ0lDQWdJQ0FnSUNBZ0tWeHVJQ0FnSUNBZ0lDQWdJQ0FnTG5Sb1pXNG9YRzRnSUNBZ0lDQWdJQ0FnSUNBZ0lDQWdLQ2tnUFQ1Y2JpQWdJQ0FnSUNBZ0lDQWdJQ0FnSUNCamRYSnlaVzUwVW05MWRHVWdKaVpjYmlBZ0lDQWdJQ0FnSUNBZ0lDQWdJQ0JqZFhKeVpXNTBVbTkxZEdVdWIyNUZiblJsY2lBbUpseHVJQ0FnSUNBZ0lDQWdJQ0FnSUNBZ0lHTjFjbkpsYm5SU2IzVjBaUzV2YmtWdWRHVnlLSFJvYVhNdVpYWmxiblJDZFhNcFhHNGdJQ0FnSUNBZ0lDQWdJQ0FwTzF4dUlDQWdJSDFjYmx4dWZWeHVYRzVsZUhCdmNuUWdaR1ZtWVhWc2RDQlNiM1YwWlhJaVhYMD1cbn0pLmNhbGwodGhpcyxyZXF1aXJlKFwiZS9VKzk3XCIpLHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSxyZXF1aXJlKFwiYnVmZmVyXCIpLkJ1ZmZlcixhcmd1bWVudHNbM10sYXJndW1lbnRzWzRdLGFyZ3VtZW50c1s1XSxhcmd1bWVudHNbNl0sXCIvdXRpbHNcXFxcUm91dGVyLmpzXCIsXCIvdXRpbHNcIikiXX0=
