// Practice Hub browser demo: the app's server code, running in a service worker. Built by scripts/build-static.js.
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // ../../../../../../../../JACQUE~1/AppData/Local/Temp/claude/C--Users-JacquelineTangorra-OneDrive---Omni-BI-Solutions-Desktop-OBIS-Clients-Client-Documents-Leonardo---Company/d5d84095-c8a4-49fb-ba93-aafaad14c9bc/scratchpad/deps/node_modules/base64-js/index.js
  var require_base64_js = __commonJS({
    "../../../../../../../../JACQUE~1/AppData/Local/Temp/claude/C--Users-JacquelineTangorra-OneDrive---Omni-BI-Solutions-Desktop-OBIS-Clients-Client-Documents-Leonardo---Company/d5d84095-c8a4-49fb-ba93-aafaad14c9bc/scratchpad/deps/node_modules/base64-js/index.js"(exports) {
      "use strict";
      init_globals();
      exports.byteLength = byteLength;
      exports.toByteArray = toByteArray;
      exports.fromByteArray = fromByteArray;
      var lookup = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (i = 0, len = code.length; i < len; ++i) {
        lookup[i] = code[i];
        revLookup[code.charCodeAt(i)] = i;
      }
      var i;
      var len;
      revLookup["-".charCodeAt(0)] = 62;
      revLookup["_".charCodeAt(0)] = 63;
      function getLens(b64) {
        var len2 = b64.length;
        if (len2 % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var validLen = b64.indexOf("=");
        if (validLen === -1) validLen = len2;
        var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
        return [validLen, placeHoldersLen];
      }
      function byteLength(b64) {
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function _byteLength(b64, validLen, placeHoldersLen) {
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function toByteArray(b64) {
        var tmp;
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
        var curByte = 0;
        var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
        var i2;
        for (i2 = 0; i2 < len2; i2 += 4) {
          tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
          arr[curByte++] = tmp >> 16 & 255;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 2) {
          tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 1) {
          tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        return arr;
      }
      function tripletToBase64(num) {
        return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
      }
      function encodeChunk(uint8, start2, end) {
        var tmp;
        var output = [];
        for (var i2 = start2; i2 < end; i2 += 3) {
          tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
          output.push(tripletToBase64(tmp));
        }
        return output.join("");
      }
      function fromByteArray(uint8) {
        var tmp;
        var len2 = uint8.length;
        var extraBytes = len2 % 3;
        var parts = [];
        var maxChunkLength = 16383;
        for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
          parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
        }
        if (extraBytes === 1) {
          tmp = uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "=="
          );
        } else if (extraBytes === 2) {
          tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
          parts.push(
            lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "="
          );
        }
        return parts.join("");
      }
    }
  });

  // ../../../../../../../../JACQUE~1/AppData/Local/Temp/claude/C--Users-JacquelineTangorra-OneDrive---Omni-BI-Solutions-Desktop-OBIS-Clients-Client-Documents-Leonardo---Company/d5d84095-c8a4-49fb-ba93-aafaad14c9bc/scratchpad/deps/node_modules/ieee754/index.js
  var require_ieee754 = __commonJS({
    "../../../../../../../../JACQUE~1/AppData/Local/Temp/claude/C--Users-JacquelineTangorra-OneDrive---Omni-BI-Solutions-Desktop-OBIS-Clients-Client-Documents-Leonardo---Company/d5d84095-c8a4-49fb-ba93-aafaad14c9bc/scratchpad/deps/node_modules/ieee754/index.js"(exports) {
      init_globals();
      exports.read = function(buffer, offset, isLE, mLen, nBytes) {
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
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
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
      exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
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
        for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
        }
        e = e << mLen | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
        }
        buffer[offset + i - d] |= s * 128;
      };
    }
  });

  // ../../../../../../../../JACQUE~1/AppData/Local/Temp/claude/C--Users-JacquelineTangorra-OneDrive---Omni-BI-Solutions-Desktop-OBIS-Clients-Client-Documents-Leonardo---Company/d5d84095-c8a4-49fb-ba93-aafaad14c9bc/scratchpad/deps/node_modules/buffer/index.js
  var require_buffer = __commonJS({
    "../../../../../../../../JACQUE~1/AppData/Local/Temp/claude/C--Users-JacquelineTangorra-OneDrive---Omni-BI-Solutions-Desktop-OBIS-Clients-Client-Documents-Leonardo---Company/d5d84095-c8a4-49fb-ba93-aafaad14c9bc/scratchpad/deps/node_modules/buffer/index.js"(exports) {
      "use strict";
      init_globals();
      var base64 = require_base64_js();
      var ieee754 = require_ieee754();
      var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
      exports.Buffer = Buffer4;
      exports.SlowBuffer = SlowBuffer;
      exports.INSPECT_MAX_BYTES = 50;
      var K_MAX_LENGTH = 2147483647;
      exports.kMaxLength = K_MAX_LENGTH;
      Buffer4.TYPED_ARRAY_SUPPORT = typedArraySupport();
      if (!Buffer4.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
        console.error(
          "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
        );
      }
      function typedArraySupport() {
        try {
          const arr = new Uint8Array(1);
          const proto = { foo: function() {
            return 42;
          } };
          Object.setPrototypeOf(proto, Uint8Array.prototype);
          Object.setPrototypeOf(arr, proto);
          return arr.foo() === 42;
        } catch (e) {
          return false;
        }
      }
      Object.defineProperty(Buffer4.prototype, "parent", {
        enumerable: true,
        get: function() {
          if (!Buffer4.isBuffer(this)) return void 0;
          return this.buffer;
        }
      });
      Object.defineProperty(Buffer4.prototype, "offset", {
        enumerable: true,
        get: function() {
          if (!Buffer4.isBuffer(this)) return void 0;
          return this.byteOffset;
        }
      });
      function createBuffer(length) {
        if (length > K_MAX_LENGTH) {
          throw new RangeError('The value "' + length + '" is invalid for option "size"');
        }
        const buf = new Uint8Array(length);
        Object.setPrototypeOf(buf, Buffer4.prototype);
        return buf;
      }
      function Buffer4(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          if (typeof encodingOrOffset === "string") {
            throw new TypeError(
              'The "string" argument must be of type string. Received type number'
            );
          }
          return allocUnsafe(arg);
        }
        return from(arg, encodingOrOffset, length);
      }
      Buffer4.poolSize = 8192;
      function from(value, encodingOrOffset, length) {
        if (typeof value === "string") {
          return fromString(value, encodingOrOffset);
        }
        if (ArrayBuffer.isView(value)) {
          return fromArrayView(value);
        }
        if (value == null) {
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
          );
        }
        if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof value === "number") {
          throw new TypeError(
            'The "value" argument must not be of type number. Received type number'
          );
        }
        const valueOf = value.valueOf && value.valueOf();
        if (valueOf != null && valueOf !== value) {
          return Buffer4.from(valueOf, encodingOrOffset, length);
        }
        const b = fromObject(value);
        if (b) return b;
        if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
          return Buffer4.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
        }
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      Buffer4.from = function(value, encodingOrOffset, length) {
        return from(value, encodingOrOffset, length);
      };
      Object.setPrototypeOf(Buffer4.prototype, Uint8Array.prototype);
      Object.setPrototypeOf(Buffer4, Uint8Array);
      function assertSize(size) {
        if (typeof size !== "number") {
          throw new TypeError('"size" argument must be of type number');
        } else if (size < 0) {
          throw new RangeError('The value "' + size + '" is invalid for option "size"');
        }
      }
      function alloc(size, fill, encoding) {
        assertSize(size);
        if (size <= 0) {
          return createBuffer(size);
        }
        if (fill !== void 0) {
          return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
        }
        return createBuffer(size);
      }
      Buffer4.alloc = function(size, fill, encoding) {
        return alloc(size, fill, encoding);
      };
      function allocUnsafe(size) {
        assertSize(size);
        return createBuffer(size < 0 ? 0 : checked(size) | 0);
      }
      Buffer4.allocUnsafe = function(size) {
        return allocUnsafe(size);
      };
      Buffer4.allocUnsafeSlow = function(size) {
        return allocUnsafe(size);
      };
      function fromString(string, encoding) {
        if (typeof encoding !== "string" || encoding === "") {
          encoding = "utf8";
        }
        if (!Buffer4.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        const length = byteLength(string, encoding) | 0;
        let buf = createBuffer(length);
        const actual = buf.write(string, encoding);
        if (actual !== length) {
          buf = buf.slice(0, actual);
        }
        return buf;
      }
      function fromArrayLike(array) {
        const length = array.length < 0 ? 0 : checked(array.length) | 0;
        const buf = createBuffer(length);
        for (let i = 0; i < length; i += 1) {
          buf[i] = array[i] & 255;
        }
        return buf;
      }
      function fromArrayView(arrayView) {
        if (isInstance(arrayView, Uint8Array)) {
          const copy = new Uint8Array(arrayView);
          return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
        }
        return fromArrayLike(arrayView);
      }
      function fromArrayBuffer(array, byteOffset, length) {
        if (byteOffset < 0 || array.byteLength < byteOffset) {
          throw new RangeError('"offset" is outside of buffer bounds');
        }
        if (array.byteLength < byteOffset + (length || 0)) {
          throw new RangeError('"length" is outside of buffer bounds');
        }
        let buf;
        if (byteOffset === void 0 && length === void 0) {
          buf = new Uint8Array(array);
        } else if (length === void 0) {
          buf = new Uint8Array(array, byteOffset);
        } else {
          buf = new Uint8Array(array, byteOffset, length);
        }
        Object.setPrototypeOf(buf, Buffer4.prototype);
        return buf;
      }
      function fromObject(obj) {
        if (Buffer4.isBuffer(obj)) {
          const len = checked(obj.length) | 0;
          const buf = createBuffer(len);
          if (buf.length === 0) {
            return buf;
          }
          obj.copy(buf, 0, 0, len);
          return buf;
        }
        if (obj.length !== void 0) {
          if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
            return createBuffer(0);
          }
          return fromArrayLike(obj);
        }
        if (obj.type === "Buffer" && Array.isArray(obj.data)) {
          return fromArrayLike(obj.data);
        }
      }
      function checked(length) {
        if (length >= K_MAX_LENGTH) {
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
        }
        return length | 0;
      }
      function SlowBuffer(length) {
        if (+length != length) {
          length = 0;
        }
        return Buffer4.alloc(+length);
      }
      Buffer4.isBuffer = function isBuffer(b) {
        return b != null && b._isBuffer === true && b !== Buffer4.prototype;
      };
      Buffer4.compare = function compare(a, b) {
        if (isInstance(a, Uint8Array)) a = Buffer4.from(a, a.offset, a.byteLength);
        if (isInstance(b, Uint8Array)) b = Buffer4.from(b, b.offset, b.byteLength);
        if (!Buffer4.isBuffer(a) || !Buffer4.isBuffer(b)) {
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          );
        }
        if (a === b) return 0;
        let x = a.length;
        let y = b.length;
        for (let i = 0, len = Math.min(x, y); i < len; ++i) {
          if (a[i] !== b[i]) {
            x = a[i];
            y = b[i];
            break;
          }
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      Buffer4.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      };
      Buffer4.concat = function concat(list, length) {
        if (!Array.isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list.length === 0) {
          return Buffer4.alloc(0);
        }
        let i;
        if (length === void 0) {
          length = 0;
          for (i = 0; i < list.length; ++i) {
            length += list[i].length;
          }
        }
        const buffer = Buffer4.allocUnsafe(length);
        let pos = 0;
        for (i = 0; i < list.length; ++i) {
          let buf = list[i];
          if (isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer.length) {
              if (!Buffer4.isBuffer(buf)) buf = Buffer4.from(buf);
              buf.copy(buffer, pos);
            } else {
              Uint8Array.prototype.set.call(
                buffer,
                buf,
                pos
              );
            }
          } else if (!Buffer4.isBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          } else {
            buf.copy(buffer, pos);
          }
          pos += buf.length;
        }
        return buffer;
      };
      function byteLength(string, encoding) {
        if (Buffer4.isBuffer(string)) {
          return string.length;
        }
        if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
          return string.byteLength;
        }
        if (typeof string !== "string") {
          throw new TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
          );
        }
        const len = string.length;
        const mustMatch = arguments.length > 2 && arguments[2] === true;
        if (!mustMatch && len === 0) return 0;
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "ascii":
            case "latin1":
            case "binary":
              return len;
            case "utf8":
            case "utf-8":
              return utf8ToBytes(string).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return len * 2;
            case "hex":
              return len >>> 1;
            case "base64":
              return base64ToBytes(string).length;
            default:
              if (loweredCase) {
                return mustMatch ? -1 : utf8ToBytes(string).length;
              }
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer4.byteLength = byteLength;
      function slowToString(encoding, start2, end) {
        let loweredCase = false;
        if (start2 === void 0 || start2 < 0) {
          start2 = 0;
        }
        if (start2 > this.length) {
          return "";
        }
        if (end === void 0 || end > this.length) {
          end = this.length;
        }
        if (end <= 0) {
          return "";
        }
        end >>>= 0;
        start2 >>>= 0;
        if (end <= start2) {
          return "";
        }
        if (!encoding) encoding = "utf8";
        while (true) {
          switch (encoding) {
            case "hex":
              return hexSlice(this, start2, end);
            case "utf8":
            case "utf-8":
              return utf8Slice(this, start2, end);
            case "ascii":
              return asciiSlice(this, start2, end);
            case "latin1":
            case "binary":
              return latin1Slice(this, start2, end);
            case "base64":
              return base64Slice(this, start2, end);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return utf16leSlice(this, start2, end);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = (encoding + "").toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer4.prototype._isBuffer = true;
      function swap(b, n, m) {
        const i = b[n];
        b[n] = b[m];
        b[m] = i;
      }
      Buffer4.prototype.swap16 = function swap16() {
        const len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (let i = 0; i < len; i += 2) {
          swap(this, i, i + 1);
        }
        return this;
      };
      Buffer4.prototype.swap32 = function swap32() {
        const len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (let i = 0; i < len; i += 4) {
          swap(this, i, i + 3);
          swap(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer4.prototype.swap64 = function swap64() {
        const len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (let i = 0; i < len; i += 8) {
          swap(this, i, i + 7);
          swap(this, i + 1, i + 6);
          swap(this, i + 2, i + 5);
          swap(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer4.prototype.toString = function toString() {
        const length = this.length;
        if (length === 0) return "";
        if (arguments.length === 0) return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer4.prototype.toLocaleString = Buffer4.prototype.toString;
      Buffer4.prototype.equals = function equals(b) {
        if (!Buffer4.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
        if (this === b) return true;
        return Buffer4.compare(this, b) === 0;
      };
      Buffer4.prototype.inspect = function inspect() {
        let str = "";
        const max = exports.INSPECT_MAX_BYTES;
        str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
        if (this.length > max) str += " ... ";
        return "<Buffer " + str + ">";
      };
      if (customInspectSymbol) {
        Buffer4.prototype[customInspectSymbol] = Buffer4.prototype.inspect;
      }
      Buffer4.prototype.compare = function compare(target, start2, end, thisStart, thisEnd) {
        if (isInstance(target, Uint8Array)) {
          target = Buffer4.from(target, target.offset, target.byteLength);
        }
        if (!Buffer4.isBuffer(target)) {
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
          );
        }
        if (start2 === void 0) {
          start2 = 0;
        }
        if (end === void 0) {
          end = target ? target.length : 0;
        }
        if (thisStart === void 0) {
          thisStart = 0;
        }
        if (thisEnd === void 0) {
          thisEnd = this.length;
        }
        if (start2 < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError("out of range index");
        }
        if (thisStart >= thisEnd && start2 >= end) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start2 >= end) {
          return 1;
        }
        start2 >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target) return 0;
        let x = thisEnd - thisStart;
        let y = end - start2;
        const len = Math.min(x, y);
        const thisCopy = this.slice(thisStart, thisEnd);
        const targetCopy = target.slice(start2, end);
        for (let i = 0; i < len; ++i) {
          if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i];
            y = targetCopy[i];
            break;
          }
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
        if (buffer.length === 0) return -1;
        if (typeof byteOffset === "string") {
          encoding = byteOffset;
          byteOffset = 0;
        } else if (byteOffset > 2147483647) {
          byteOffset = 2147483647;
        } else if (byteOffset < -2147483648) {
          byteOffset = -2147483648;
        }
        byteOffset = +byteOffset;
        if (numberIsNaN(byteOffset)) {
          byteOffset = dir ? 0 : buffer.length - 1;
        }
        if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
        if (byteOffset >= buffer.length) {
          if (dir) return -1;
          else byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (dir) byteOffset = 0;
          else return -1;
        }
        if (typeof val === "string") {
          val = Buffer4.from(val, encoding);
        }
        if (Buffer4.isBuffer(val)) {
          if (val.length === 0) {
            return -1;
          }
          return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
        } else if (typeof val === "number") {
          val = val & 255;
          if (typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) {
              return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            } else {
              return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
            }
          }
          return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        let indexSize = 1;
        let arrLength = arr.length;
        let valLength = val.length;
        if (encoding !== void 0) {
          encoding = String(encoding).toLowerCase();
          if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) {
              return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read(buf, i2) {
          if (indexSize === 1) {
            return buf[i2];
          } else {
            return buf.readUInt16BE(i2 * indexSize);
          }
        }
        let i;
        if (dir) {
          let foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) {
            if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
              if (foundIndex === -1) foundIndex = i;
              if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
            } else {
              if (foundIndex !== -1) i -= i - foundIndex;
              foundIndex = -1;
            }
          }
        } else {
          if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
          for (i = byteOffset; i >= 0; i--) {
            let found = true;
            for (let j = 0; j < valLength; j++) {
              if (read(arr, i + j) !== read(val, j)) {
                found = false;
                break;
              }
            }
            if (found) return i;
          }
        }
        return -1;
      }
      Buffer4.prototype.includes = function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      };
      Buffer4.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer4.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };
      function hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        const remaining = buf.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }
        const strLen = string.length;
        if (length > strLen / 2) {
          length = strLen / 2;
        }
        let i;
        for (i = 0; i < length; ++i) {
          const parsed = parseInt(string.substr(i * 2, 2), 16);
          if (numberIsNaN(parsed)) return i;
          buf[offset + i] = parsed;
        }
        return i;
      }
      function utf8Write(buf, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
      }
      function asciiWrite(buf, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf, offset, length);
      }
      function base64Write(buf, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf, offset, length);
      }
      function ucs2Write(buf, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
      }
      Buffer4.prototype.write = function write(string, offset, length, encoding) {
        if (offset === void 0) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (length === void 0 && typeof offset === "string") {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset >>> 0;
          if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === void 0) encoding = "utf8";
          } else {
            encoding = length;
            length = void 0;
          }
        } else {
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        }
        const remaining = this.length - offset;
        if (length === void 0 || length > remaining) length = remaining;
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        if (!encoding) encoding = "utf8";
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "hex":
              return hexWrite(this, string, offset, length);
            case "utf8":
            case "utf-8":
              return utf8Write(this, string, offset, length);
            case "ascii":
            case "latin1":
            case "binary":
              return asciiWrite(this, string, offset, length);
            case "base64":
              return base64Write(this, string, offset, length);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ucs2Write(this, string, offset, length);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      };
      Buffer4.prototype.toJSON = function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice(buf, start2, end) {
        if (start2 === 0 && end === buf.length) {
          return base64.fromByteArray(buf);
        } else {
          return base64.fromByteArray(buf.slice(start2, end));
        }
      }
      function utf8Slice(buf, start2, end) {
        end = Math.min(buf.length, end);
        const res = [];
        let i = start2;
        while (i < end) {
          const firstByte = buf[i];
          let codePoint = null;
          let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i + bytesPerSequence <= end) {
            let secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 128) {
                  codePoint = firstByte;
                }
                break;
              case 2:
                secondByte = buf[i + 1];
                if ((secondByte & 192) === 128) {
                  tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                  if (tempCodePoint > 127) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 3:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                  if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 4:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                fourthByte = buf[i + 3];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                  if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                    codePoint = tempCodePoint;
                  }
                }
            }
          }
          if (codePoint === null) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | codePoint & 1023;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      var MAX_ARGUMENTS_LENGTH = 4096;
      function decodeCodePointsArray(codePoints) {
        const len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) {
          return String.fromCharCode.apply(String, codePoints);
        }
        let res = "";
        let i = 0;
        while (i < len) {
          res += String.fromCharCode.apply(
            String,
            codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
          );
        }
        return res;
      }
      function asciiSlice(buf, start2, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start2; i < end; ++i) {
          ret += String.fromCharCode(buf[i] & 127);
        }
        return ret;
      }
      function latin1Slice(buf, start2, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start2; i < end; ++i) {
          ret += String.fromCharCode(buf[i]);
        }
        return ret;
      }
      function hexSlice(buf, start2, end) {
        const len = buf.length;
        if (!start2 || start2 < 0) start2 = 0;
        if (!end || end < 0 || end > len) end = len;
        let out = "";
        for (let i = start2; i < end; ++i) {
          out += hexSliceLookupTable[buf[i]];
        }
        return out;
      }
      function utf16leSlice(buf, start2, end) {
        const bytes = buf.slice(start2, end);
        let res = "";
        for (let i = 0; i < bytes.length - 1; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }
        return res;
      }
      Buffer4.prototype.slice = function slice(start2, end) {
        const len = this.length;
        start2 = ~~start2;
        end = end === void 0 ? len : ~~end;
        if (start2 < 0) {
          start2 += len;
          if (start2 < 0) start2 = 0;
        } else if (start2 > len) {
          start2 = len;
        }
        if (end < 0) {
          end += len;
          if (end < 0) end = 0;
        } else if (end > len) {
          end = len;
        }
        if (end < start2) end = start2;
        const newBuf = this.subarray(start2, end);
        Object.setPrototypeOf(newBuf, Buffer4.prototype);
        return newBuf;
      };
      function checkOffset(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
        if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer4.prototype.readUintLE = Buffer4.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        return val;
      };
      Buffer4.prototype.readUintBE = Buffer4.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          checkOffset(offset, byteLength2, this.length);
        }
        let val = this[offset + --byteLength2];
        let mul = 1;
        while (byteLength2 > 0 && (mul *= 256)) {
          val += this[offset + --byteLength2] * mul;
        }
        return val;
      };
      Buffer4.prototype.readUint8 = Buffer4.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer4.prototype.readUint16LE = Buffer4.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer4.prototype.readUint16BE = Buffer4.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer4.prototype.readUint32LE = Buffer4.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      };
      Buffer4.prototype.readUint32BE = Buffer4.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer4.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
        const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
        return BigInt(lo) + (BigInt(hi) << BigInt(32));
      });
      Buffer4.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
        return (BigInt(hi) << BigInt(32)) + BigInt(lo);
      });
      Buffer4.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer4.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let i = byteLength2;
        let mul = 1;
        let val = this[offset + --i];
        while (i > 0 && (mul *= 256)) {
          val += this[offset + --i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer4.prototype.readInt8 = function readInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 1, this.length);
        if (!(this[offset] & 128)) return this[offset];
        return (255 - this[offset] + 1) * -1;
      };
      Buffer4.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        const val = this[offset] | this[offset + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer4.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        const val = this[offset + 1] | this[offset] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer4.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer4.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer4.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
        return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
      });
      Buffer4.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = (first << 24) + // Overflow
        this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
      });
      Buffer4.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, true, 23, 4);
      };
      Buffer4.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, false, 23, 4);
      };
      Buffer4.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, true, 52, 8);
      };
      Buffer4.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, false, 52, 8);
      };
      function checkInt(buf, value, offset, ext, max, min) {
        if (!Buffer4.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
      }
      Buffer4.prototype.writeUintLE = Buffer4.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let mul = 1;
        let i = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer4.prototype.writeUintBE = Buffer4.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer4.prototype.writeUint8 = Buffer4.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer4.prototype.writeUint16LE = Buffer4.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer4.prototype.writeUint16BE = Buffer4.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer4.prototype.writeUint32LE = Buffer4.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
        return offset + 4;
      };
      Buffer4.prototype.writeUint32BE = Buffer4.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      function wrtBigUInt64LE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        return offset;
      }
      function wrtBigUInt64BE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset + 7] = lo;
        lo = lo >> 8;
        buf[offset + 6] = lo;
        lo = lo >> 8;
        buf[offset + 5] = lo;
        lo = lo >> 8;
        buf[offset + 4] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset + 3] = hi;
        hi = hi >> 8;
        buf[offset + 2] = hi;
        hi = hi >> 8;
        buf[offset + 1] = hi;
        hi = hi >> 8;
        buf[offset] = hi;
        return offset + 8;
      }
      Buffer4.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer4.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer4.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = 0;
        let mul = 1;
        let sub = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer4.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        let sub = 0;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer4.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
        if (value < 0) value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer4.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer4.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer4.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
        return offset + 4;
      };
      Buffer4.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (value < 0) value = 4294967295 + value + 1;
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      Buffer4.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      Buffer4.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      function checkIEEE754(buf, value, offset, ext, max, min) {
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
        if (offset < 0) throw new RangeError("Index out of range");
      }
      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
        }
        ieee754.write(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer4.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer4.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
        }
        ieee754.write(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer4.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer4.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer4.prototype.copy = function copy(target, targetStart, start2, end) {
        if (!Buffer4.isBuffer(target)) throw new TypeError("argument should be a Buffer");
        if (!start2) start2 = 0;
        if (!end && end !== 0) end = this.length;
        if (targetStart >= target.length) targetStart = target.length;
        if (!targetStart) targetStart = 0;
        if (end > 0 && end < start2) end = start2;
        if (end === start2) return 0;
        if (target.length === 0 || this.length === 0) return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start2 < 0 || start2 >= this.length) throw new RangeError("Index out of range");
        if (end < 0) throw new RangeError("sourceEnd out of bounds");
        if (end > this.length) end = this.length;
        if (target.length - targetStart < end - start2) {
          end = target.length - targetStart + start2;
        }
        const len = end - start2;
        if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
          this.copyWithin(targetStart, start2, end);
        } else {
          Uint8Array.prototype.set.call(
            target,
            this.subarray(start2, end),
            targetStart
          );
        }
        return len;
      };
      Buffer4.prototype.fill = function fill(val, start2, end, encoding) {
        if (typeof val === "string") {
          if (typeof start2 === "string") {
            encoding = start2;
            start2 = 0;
            end = this.length;
          } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
          }
          if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof encoding === "string" && !Buffer4.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
          if (val.length === 1) {
            const code = val.charCodeAt(0);
            if (encoding === "utf8" && code < 128 || encoding === "latin1") {
              val = code;
            }
          }
        } else if (typeof val === "number") {
          val = val & 255;
        } else if (typeof val === "boolean") {
          val = Number(val);
        }
        if (start2 < 0 || this.length < start2 || this.length < end) {
          throw new RangeError("Out of range index");
        }
        if (end <= start2) {
          return this;
        }
        start2 = start2 >>> 0;
        end = end === void 0 ? this.length : end >>> 0;
        if (!val) val = 0;
        let i;
        if (typeof val === "number") {
          for (i = start2; i < end; ++i) {
            this[i] = val;
          }
        } else {
          const bytes = Buffer4.isBuffer(val) ? val : Buffer4.from(val, encoding);
          const len = bytes.length;
          if (len === 0) {
            throw new TypeError('The value "' + val + '" is invalid for argument "value"');
          }
          for (i = 0; i < end - start2; ++i) {
            this[i + start2] = bytes[i % len];
          }
        }
        return this;
      };
      var errors = {};
      function E(sym, getMessage, Base) {
        errors[sym] = class NodeError extends Base {
          constructor() {
            super();
            Object.defineProperty(this, "message", {
              value: getMessage.apply(this, arguments),
              writable: true,
              configurable: true
            });
            this.name = `${this.name} [${sym}]`;
            this.stack;
            delete this.name;
          }
          get code() {
            return sym;
          }
          set code(value) {
            Object.defineProperty(this, "code", {
              configurable: true,
              enumerable: true,
              value,
              writable: true
            });
          }
          toString() {
            return `${this.name} [${sym}]: ${this.message}`;
          }
        };
      }
      E(
        "ERR_BUFFER_OUT_OF_BOUNDS",
        function(name) {
          if (name) {
            return `${name} is outside of buffer bounds`;
          }
          return "Attempt to access memory outside buffer bounds";
        },
        RangeError
      );
      E(
        "ERR_INVALID_ARG_TYPE",
        function(name, actual) {
          return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
        },
        TypeError
      );
      E(
        "ERR_OUT_OF_RANGE",
        function(str, range, input) {
          let msg = `The value of "${str}" is out of range.`;
          let received = input;
          if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
            received = addNumericalSeparator(String(input));
          } else if (typeof input === "bigint") {
            received = String(input);
            if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
              received = addNumericalSeparator(received);
            }
            received += "n";
          }
          msg += ` It must be ${range}. Received ${received}`;
          return msg;
        },
        RangeError
      );
      function addNumericalSeparator(val) {
        let res = "";
        let i = val.length;
        const start2 = val[0] === "-" ? 1 : 0;
        for (; i >= start2 + 4; i -= 3) {
          res = `_${val.slice(i - 3, i)}${res}`;
        }
        return `${val.slice(0, i)}${res}`;
      }
      function checkBounds(buf, offset, byteLength2) {
        validateNumber(offset, "offset");
        if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
          boundsError(offset, buf.length - (byteLength2 + 1));
        }
      }
      function checkIntBI(value, min, max, buf, offset, byteLength2) {
        if (value > max || value < min) {
          const n = typeof min === "bigint" ? "n" : "";
          let range;
          if (byteLength2 > 3) {
            if (min === 0 || min === BigInt(0)) {
              range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
            } else {
              range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
            }
          } else {
            range = `>= ${min}${n} and <= ${max}${n}`;
          }
          throw new errors.ERR_OUT_OF_RANGE("value", range, value);
        }
        checkBounds(buf, offset, byteLength2);
      }
      function validateNumber(value, name) {
        if (typeof value !== "number") {
          throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
        }
      }
      function boundsError(value, length, type) {
        if (Math.floor(value) !== value) {
          validateNumber(value, type);
          throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
        }
        if (length < 0) {
          throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
        }
        throw new errors.ERR_OUT_OF_RANGE(
          type || "offset",
          `>= ${type ? 1 : 0} and <= ${length}`,
          value
        );
      }
      var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = str.split("=")[0];
        str = str.trim().replace(INVALID_BASE64_RE, "");
        if (str.length < 2) return "";
        while (str.length % 4 !== 0) {
          str = str + "=";
        }
        return str;
      }
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        let codePoint;
        const length = string.length;
        let leadSurrogate = null;
        const bytes = [];
        for (let i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              } else if (i + 1 === length) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
          } else if (leadSurrogate) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
          }
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0) break;
            bytes.push(
              codePoint >> 6 | 192,
              codePoint & 63 | 128
            );
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0) break;
            bytes.push(
              codePoint >> 12 | 224,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else if (codePoint < 1114112) {
            if ((units -= 4) < 0) break;
            bytes.push(
              codePoint >> 18 | 240,
              codePoint >> 12 & 63 | 128,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else {
            throw new Error("Invalid code point");
          }
        }
        return bytes;
      }
      function asciiToBytes(str) {
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          byteArray.push(str.charCodeAt(i) & 255);
        }
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        let c, hi, lo;
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0) break;
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }
      function blitBuffer(src, dst, offset, length) {
        let i;
        for (i = 0; i < length; ++i) {
          if (i + offset >= dst.length || i >= src.length) break;
          dst[i + offset] = src[i];
        }
        return i;
      }
      function isInstance(obj, type) {
        return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
      }
      function numberIsNaN(obj) {
        return obj !== obj;
      }
      var hexSliceLookupTable = (function() {
        const alphabet = "0123456789abcdef";
        const table = new Array(256);
        for (let i = 0; i < 16; ++i) {
          const i16 = i * 16;
          for (let j = 0; j < 16; ++j) {
            table[i16 + j] = alphabet[i] + alphabet[j];
          }
        }
        return table;
      })();
      function defineBigIntMethod(fn) {
        return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
      }
      function BufferBigIntNotDefined() {
        throw new Error("BigInt not supported");
      }
    }
  });

  // static/shims/globals.js
  var import_buffer, toBase64Url, fromBase64Url, originalToString, originalFrom, process;
  var init_globals = __esm({
    "static/shims/globals.js"() {
      import_buffer = __toESM(require_buffer());
      toBase64Url = (s) => s.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
      fromBase64Url = (s) => s.replace(/-/g, "+").replace(/_/g, "/");
      originalToString = import_buffer.Buffer.prototype.toString;
      import_buffer.Buffer.prototype.toString = function(encoding, start2, end) {
        if (encoding === "base64url") return toBase64Url(originalToString.call(this, "base64", start2, end));
        return originalToString.call(this, encoding, start2, end);
      };
      originalFrom = import_buffer.Buffer.from;
      import_buffer.Buffer.from = function(value, encoding, length) {
        if (typeof value === "string" && encoding === "base64url") return originalFrom.call(import_buffer.Buffer, fromBase64Url(value), "base64");
        return originalFrom.call(import_buffer.Buffer, value, encoding, length);
      };
      process = {
        // Only the settings the app reads. HUB_APP_URL is filled in by the build
        // (it's the address used in the demo's made-up emails).
        env: { HUB_APP_URL: true ? "https://obis-datascience.github.io/practice-hub-demo/" : "" },
        argv: [],
        platform: "browser",
        emitWarning() {
        },
        cwd: () => "/",
        nextTick: (fn, ...args) => queueMicrotask(() => fn(...args))
      };
    }
  });

  // static/shims/node-stubs.js
  var node_stubs_exports = {};
  __export(node_stubs_exports, {
    AsyncLocalStorage: () => AsyncLocalStorage,
    fs: () => fs,
    http: () => http,
    os: () => os,
    path: () => path
  });
  var unavailable, AsyncLocalStorage, http, fs, os, join, path;
  var init_node_stubs = __esm({
    "static/shims/node-stubs.js"() {
      init_globals();
      unavailable = (name) => () => {
        throw new Error(`${name} is not available in the browser demo.`);
      };
      AsyncLocalStorage = class {
        constructor() {
          this.store = void 0;
        }
        getStore() {
          return this.store;
        }
        run(store, fn, ...args) {
          const previous = this.store;
          this.store = store;
          let result;
          try {
            result = fn(...args);
          } catch (e) {
            this.store = previous;
            throw e;
          }
          if (result && typeof result.then === "function") return result.finally(() => {
            this.store = previous;
          });
          this.store = previous;
          return result;
        }
      };
      http = {
        createServer: () => ({ listen() {
          return this;
        }, close() {
        }, address: () => null, on() {
          return this;
        } })
      };
      fs = {
        readFile: (file, cb) => cb(new Error("Not found")),
        existsSync: () => false,
        mkdtempSync: unavailable("fs.mkdtempSync"),
        mkdirSync: unavailable("fs.mkdirSync"),
        writeFileSync: unavailable("fs.writeFileSync"),
        readFileSync: unavailable("fs.readFileSync"),
        rmSync: unavailable("fs.rmSync"),
        unlinkSync: unavailable("fs.unlinkSync")
      };
      os = { tmpdir: () => "/tmp", homedir: () => "/" };
      join = (...parts) => parts.filter(Boolean).join("/").replace(/\/+/g, "/");
      path = {
        sep: "/",
        join,
        normalize: (p) => p.replace(/\/+/g, "/"),
        dirname: (p) => p.replace(/\/[^/]*$/, "") || "/",
        extname: (p) => {
          const m = /\.[^./]*$/.exec(p);
          return m ? m[0] : "";
        },
        basename: (p) => p.replace(/^.*\//, "")
      };
    }
  });

  // stub:node:http
  var require_node_http = __commonJS({
    "stub:node:http"(exports, module) {
      init_globals();
      module.exports = (init_node_stubs(), __toCommonJS(node_stubs_exports)).http;
    }
  });

  // stub:node:fs
  var require_node_fs = __commonJS({
    "stub:node:fs"(exports, module) {
      init_globals();
      module.exports = (init_node_stubs(), __toCommonJS(node_stubs_exports)).fs;
    }
  });

  // stub:node:os
  var require_node_os = __commonJS({
    "stub:node:os"(exports, module) {
      init_globals();
      module.exports = (init_node_stubs(), __toCommonJS(node_stubs_exports)).os;
    }
  });

  // stub:node:path
  var require_node_path = __commonJS({
    "stub:node:path"(exports, module) {
      init_globals();
      module.exports = (init_node_stubs(), __toCommonJS(node_stubs_exports)).path;
    }
  });

  // static/shims/crypto.js
  var crypto_exports = {};
  __export(crypto_exports, {
    createHash: () => createHash,
    createHmac: () => createHmac,
    default: () => crypto_default,
    randomBytes: () => randomBytes,
    randomUUID: () => randomUUID,
    timingSafeEqual: () => timingSafeEqual
  });
  function sha256(bytes) {
    const H = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225]);
    const len = bytes.length;
    const padded = new Uint8Array(len + 9 + 63 >> 6 << 6);
    padded.set(bytes);
    padded[len] = 128;
    const view = new DataView(padded.buffer);
    view.setUint32(padded.length - 8, Math.floor(len / 536870912));
    view.setUint32(padded.length - 4, len << 3 >>> 0);
    const W = new Uint32Array(64);
    for (let off = 0; off < padded.length; off += 64) {
      for (let i = 0; i < 16; i++) W[i] = view.getUint32(off + i * 4);
      for (let i = 16; i < 64; i++) {
        const a2 = W[i - 15], b2 = W[i - 2];
        const s0 = (a2 >>> 7 | a2 << 25) ^ (a2 >>> 18 | a2 << 14) ^ a2 >>> 3;
        const s1 = (b2 >>> 17 | b2 << 15) ^ (b2 >>> 19 | b2 << 13) ^ b2 >>> 10;
        W[i] = W[i - 16] + s0 + W[i - 7] + s1 >>> 0;
      }
      let a = H[0], b = H[1], c = H[2], d = H[3], e = H[4], f = H[5], g = H[6], h = H[7];
      for (let i = 0; i < 64; i++) {
        const S1 = (e >>> 6 | e << 26) ^ (e >>> 11 | e << 21) ^ (e >>> 25 | e << 7);
        const ch = e & f ^ ~e & g;
        const t1 = h + S1 + ch + K[i] + W[i] >>> 0;
        const S0 = (a >>> 2 | a << 30) ^ (a >>> 13 | a << 19) ^ (a >>> 22 | a << 10);
        const maj = a & b ^ a & c ^ b & c;
        const t2 = S0 + maj >>> 0;
        h = g;
        g = f;
        f = e;
        e = d + t1 >>> 0;
        d = c;
        c = b;
        b = a;
        a = t1 + t2 >>> 0;
      }
      H[0] = H[0] + a >>> 0;
      H[1] = H[1] + b >>> 0;
      H[2] = H[2] + c >>> 0;
      H[3] = H[3] + d >>> 0;
      H[4] = H[4] + e >>> 0;
      H[5] = H[5] + f >>> 0;
      H[6] = H[6] + g >>> 0;
      H[7] = H[7] + h >>> 0;
    }
    const out = new Uint8Array(32);
    const outView = new DataView(out.buffer);
    for (let i = 0; i < 8; i++) outView.setUint32(i * 4, H[i]);
    return out;
  }
  function hmacSha256(key, message) {
    let k = toBytes(key);
    if (k.length > 64) k = import_buffer2.Buffer.from(sha256(k));
    const block = new Uint8Array(64);
    block.set(k);
    const inner = new Uint8Array(64 + message.length);
    const outerKey = new Uint8Array(64);
    for (let i = 0; i < 64; i++) {
      inner[i] = block[i] ^ 54;
      outerKey[i] = block[i] ^ 92;
    }
    inner.set(message, 64);
    const innerHash = sha256(inner);
    const outer = new Uint8Array(64 + 32);
    outer.set(outerKey);
    outer.set(innerHash, 64);
    return sha256(outer);
  }
  function hasher(finish) {
    const parts = [];
    return {
      update(data, encoding) {
        parts.push(toBytes(data, encoding));
        return this;
      },
      digest(encoding) {
        const out = import_buffer2.Buffer.from(finish(import_buffer2.Buffer.concat(parts)));
        return encoding ? out.toString(encoding) : out;
      }
    };
  }
  function checkAlgorithm(algorithm) {
    if (String(algorithm).toLowerCase() !== "sha256") throw new Error(`Only sha256 is available in the browser demo (asked for ${algorithm}).`);
  }
  function createHash(algorithm) {
    checkAlgorithm(algorithm);
    return hasher((bytes) => sha256(bytes));
  }
  function createHmac(algorithm, key) {
    checkAlgorithm(algorithm);
    return hasher((bytes) => hmacSha256(key, bytes));
  }
  function randomBytes(n) {
    const out = new Uint8Array(n);
    globalThis.crypto.getRandomValues(out);
    return import_buffer2.Buffer.from(out);
  }
  function timingSafeEqual(a, b) {
    if (a.length !== b.length) throw new RangeError("Input buffers must have the same byte length");
    let diff = 0;
    for (let i = 0; i < a.length; i++) diff |= a[i] ^ b[i];
    return diff === 0;
  }
  function randomUUID() {
    return globalThis.crypto.randomUUID();
  }
  var import_buffer2, K, toBytes, crypto_default;
  var init_crypto = __esm({
    "static/shims/crypto.js"() {
      init_globals();
      import_buffer2 = __toESM(require_buffer());
      K = new Uint32Array([
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
      ]);
      toBytes = (data, encoding) => typeof data === "string" ? import_buffer2.Buffer.from(data, encoding || "utf8") : import_buffer2.Buffer.from(data);
      crypto_default = { createHash, createHmac, randomBytes, timingSafeEqual, randomUUID };
    }
  });

  // static/shims/sqlite.js
  var sqlite_exports = {};
  __export(sqlite_exports, {
    DatabaseSync: () => DatabaseSync,
    currentDatabase: () => currentDatabase,
    default: () => sqlite_default,
    startFrom: () => startFrom,
    useSqlJs: () => useSqlJs
  });
  function useSqlJs(sqlJs) {
    SQL = sqlJs;
  }
  function startFrom(bytes) {
    savedBytes = bytes || null;
  }
  function currentDatabase() {
    return current;
  }
  var SQL, savedBytes, current, READ_ONLY, StatementSync, DatabaseSync, sqlite_default;
  var init_sqlite = __esm({
    "static/shims/sqlite.js"() {
      init_globals();
      SQL = null;
      savedBytes = null;
      current = null;
      READ_ONLY = /^\s*(SELECT|PRAGMA\s+\w+\s*;?\s*$)/i;
      StatementSync = class {
        constructor(db, sql) {
          this.db = db;
          this.sql = sql;
        }
        /** Prepare, bind and hand the statement to fn, always freeing it afterwards. */
        withStatement(params, fn) {
          const st = this.db.raw.prepare(this.sql);
          try {
            st.bind(params.map((v) => typeof v === "bigint" ? Number(v) : v));
            return fn(st);
          } finally {
            st.free();
          }
        }
        all(...params) {
          return this.withStatement(params, (st) => {
            const rows = [];
            while (st.step()) rows.push(st.getAsObject());
            return rows;
          });
        }
        get(...params) {
          return this.withStatement(params, (st) => st.step() ? st.getAsObject() : void 0);
        }
        run(...params) {
          this.withStatement(params, (st) => {
            while (st.step()) {
            }
          });
          if (!READ_ONLY.test(this.sql)) this.db.dirty = true;
          const changes = this.db.raw.getRowsModified();
          const id = this.db.raw.exec("SELECT last_insert_rowid()")[0].values[0][0];
          return { changes, lastInsertRowid: id };
        }
      };
      DatabaseSync = class {
        constructor() {
          if (!SQL) throw new Error("sql.js has not been loaded yet.");
          this.raw = savedBytes ? new SQL.Database(savedBytes) : new SQL.Database();
          savedBytes = null;
          this.dirty = true;
          current = this;
        }
        exec(sql) {
          this.raw.exec(sql);
          if (!READ_ONLY.test(sql)) this.dirty = true;
        }
        prepare(sql) {
          return new StatementSync(this, sql);
        }
        close() {
          this.raw.close();
          if (current === this) current = null;
        }
        /**
         * A full copy of the database as bytes, for saving in the browser.
         * sql.js reopens the database while exporting, which switches settings back to
         * their defaults, so foreign-key checks are turned back on straight after.
         */
        export() {
          const bytes = this.raw.export();
          this.raw.exec("PRAGMA foreign_keys = ON;");
          this.dirty = false;
          return bytes;
        }
      };
      sqlite_default = { DatabaseSync };
    }
  });

  // lib/db.js
  var require_db = __commonJS({
    "lib/db.js"(exports, module) {
      "use strict";
      init_globals();
      var { AsyncLocalStorage: AsyncLocalStorage2 } = (init_node_stubs(), __toCommonJS(node_stubs_exports));
      var SCHEMA_VERSION = 3;
      var APP_TABLES = [
        "suggestion",
        "comment",
        "document",
        "portal_authorization",
        "audit_log",
        "invoice",
        "export_batch",
        "stage_history",
        "task",
        "email",
        "request_item",
        "answer",
        "engagement",
        "contact",
        "client",
        "mgmt_company",
        "staff"
      ];
      var NO_ID = /* @__PURE__ */ new Set(["answer", "app_setting"]);
      function schemaSql(dialect) {
        const ID = dialect === "sqlite" ? "INTEGER PRIMARY KEY" : "INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY";
        const REAL = dialect === "sqlite" ? "REAL" : "DOUBLE PRECISION";
        return `
CREATE TABLE IF NOT EXISTS app_setting (key TEXT PRIMARY KEY, value TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS staff (
  id ${ID},
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('partner','admin','auditor','reviewer','tax')),
  title TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  office TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS mgmt_company (
  id ${ID},
  name TEXT NOT NULL UNIQUE,
  contact_name TEXT,
  email TEXT,
  phone TEXT
);
CREATE TABLE IF NOT EXISTS client (
  id ${ID},
  name TEXT NOT NULL UNIQUE,
  entity_type TEXT NOT NULL,
  location TEXT NOT NULL,
  mgmt_company_id INTEGER REFERENCES mgmt_company(id),
  fye TEXT NOT NULL,
  units INTEGER,
  status TEXT NOT NULL DEFAULT 'Active',
  billing_instructions TEXT
);
CREATE TABLE IF NOT EXISTS contact (
  id ${ID},
  client_id INTEGER NOT NULL REFERENCES client(id),
  name TEXT NOT NULL,
  role TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  receives_requests INTEGER NOT NULL DEFAULT 0,
  cc INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS engagement (
  id ${ID},
  client_id INTEGER NOT NULL REFERENCES client(id),
  fiscal_year INTEGER NOT NULL,
  job_type TEXT NOT NULL,
  stage TEXT NOT NULL,
  stage_since TEXT NOT NULL,
  partner_id INTEGER REFERENCES staff(id),
  auditor_id INTEGER REFERENCES staff(id),
  reviewer_id INTEGER REFERENCES staff(id),
  tax_id INTEGER REFERENCES staff(id),
  fee ${REAL},
  tax_fee ${REAL},
  retainer_pct ${REAL} NOT NULL DEFAULT 50,
  quote_note TEXT,
  due_date TEXT,
  el_sent TEXT, el_signed TEXT, retainer_invoiced TEXT, retainer_paid TEXT,
  request_sent TEXT, draft_issued TEXT, final_issued TEXT,
  rolled_from_id INTEGER REFERENCES engagement(id),
  created_at TEXT NOT NULL,
  UNIQUE (client_id, fiscal_year)
);
CREATE TABLE IF NOT EXISTS answer (
  engagement_id INTEGER NOT NULL REFERENCES engagement(id),
  key TEXT NOT NULL,
  value INTEGER NOT NULL,
  PRIMARY KEY (engagement_id, key)
);
CREATE TABLE IF NOT EXISTS request_item (
  id ${ID},
  engagement_id INTEGER NOT NULL REFERENCES engagement(id),
  key TEXT NOT NULL,
  text TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Draft' CHECK (status IN ('Draft','Sent','Accepted','Returned','N/A')),
  note TEXT,
  file_name TEXT,
  updated_at TEXT
);
CREATE TABLE IF NOT EXISTS email (
  id ${ID},
  engagement_id INTEGER REFERENCES engagement(id),
  kind TEXT NOT NULL,
  direction TEXT NOT NULL CHECK (direction IN ('out','in','internal')),
  from_addr TEXT NOT NULL,
  to_addrs TEXT NOT NULL,
  cc_addrs TEXT NOT NULL DEFAULT '',
  subject TEXT NOT NULL,
  body TEXT NOT NULL,
  attachments TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'Sent' CHECK (status IN ('Sent','Scheduled','Received')),
  scheduled_for TEXT,
  at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS document (
  id ${ID},
  engagement_id INTEGER NOT NULL REFERENCES engagement(id),
  item_id INTEGER REFERENCES request_item(id),
  direction TEXT NOT NULL CHECK (direction IN ('from_client','to_client')),
  channel TEXT NOT NULL CHECK (channel IN ('portal','email','staff')),
  original_name TEXT NOT NULL,
  stored_name TEXT NOT NULL,
  mime TEXT NOT NULL,
  size INTEGER NOT NULL,
  sha256 TEXT NOT NULL,
  pdf_pages INTEGER,
  client_modified TEXT,
  uploaded_by_contact INTEGER REFERENCES contact(id),
  uploaded_by_staff INTEGER REFERENCES staff(id),
  uploaded_at TEXT NOT NULL,
  ip TEXT,
  version INTEGER NOT NULL DEFAULT 1,
  simulated INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending','Accepted','Returned','Shared')),
  reviewed_by INTEGER REFERENCES staff(id),
  reviewed_at TEXT,
  review_note TEXT
);
CREATE TABLE IF NOT EXISTS comment (
  id ${ID},
  engagement_id INTEGER NOT NULL REFERENCES engagement(id),
  item_id INTEGER REFERENCES request_item(id),
  author_contact INTEGER REFERENCES contact(id),
  author_staff INTEGER REFERENCES staff(id),
  kind TEXT NOT NULL DEFAULT 'comment' CHECK (kind IN ('comment','answer','not_applicable','eta','internal')),
  eta_date TEXT,
  body TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS portal_authorization (
  id ${ID},
  client_id INTEGER NOT NULL REFERENCES client(id),
  contact_id INTEGER NOT NULL REFERENCES contact(id),
  letter_version TEXT NOT NULL,
  letter_text TEXT NOT NULL,
  letter_sha256 TEXT NOT NULL,
  signer_name TEXT NOT NULL,
  signer_title TEXT NOT NULL,
  signed_at TEXT NOT NULL,
  ip TEXT,
  user_agent TEXT,
  revoked_at TEXT
);
CREATE TABLE IF NOT EXISTS suggestion (
  id ${ID},
  engagement_id INTEGER NOT NULL REFERENCES engagement(id),
  email_id INTEGER REFERENCES email(id),
  document_id INTEGER REFERENCES document(id),
  file_name TEXT NOT NULL,
  item_id INTEGER REFERENCES request_item(id),
  confidence TEXT,
  reason TEXT,
  flag TEXT,
  status TEXT NOT NULL DEFAULT 'Pending',
  decided_by INTEGER REFERENCES staff(id),
  decided_at TEXT
);
CREATE TABLE IF NOT EXISTS task (
  id ${ID},
  engagement_id INTEGER REFERENCES engagement(id),
  title TEXT NOT NULL,
  assigned_to INTEGER NOT NULL REFERENCES staff(id),
  assigned_by INTEGER REFERENCES staff(id),
  due TEXT,
  done_at TEXT,
  created_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS stage_history (
  id ${ID},
  engagement_id INTEGER NOT NULL REFERENCES engagement(id),
  from_stage TEXT,
  to_stage TEXT NOT NULL,
  direction TEXT NOT NULL,
  reason TEXT,
  by_id INTEGER REFERENCES staff(id),
  at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS export_batch (
  id ${ID},
  created_at TEXT NOT NULL,
  by_id INTEGER REFERENCES staff(id),
  invoice_count INTEGER NOT NULL,
  csv TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS invoice (
  id ${ID},
  engagement_id INTEGER NOT NULL REFERENCES engagement(id),
  number TEXT NOT NULL UNIQUE,
  template TEXT NOT NULL,
  amount ${REAL} NOT NULL,
  issued_at TEXT NOT NULL,
  paid_at TEXT,
  batch_id INTEGER REFERENCES export_batch(id)
);
CREATE TABLE IF NOT EXISTS audit_log (
  id ${ID},
  staff_id INTEGER REFERENCES staff(id),
  action TEXT NOT NULL,
  entity TEXT,
  entity_id INTEGER,
  detail TEXT,
  at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS ix_eng_client ON engagement(client_id);
CREATE INDEX IF NOT EXISTS ix_item_eng ON request_item(engagement_id);
CREATE INDEX IF NOT EXISTS ix_email_eng ON email(engagement_id);
CREATE INDEX IF NOT EXISTS ix_doc_eng ON document(engagement_id);
CREATE INDEX IF NOT EXISTS ix_comment_eng ON comment(engagement_id);
`;
      }
      var clean = (params) => params.map((v) => typeof v === "boolean" ? v ? 1 : 0 : v === void 0 ? null : v);
      function toPg(sql) {
        let n = 0;
        let out = "";
        let quoted = false;
        for (const ch of sql) {
          if (ch === "'") quoted = !quoted;
          out += ch === "?" && !quoted ? `$${++n}` : ch;
        }
        return out;
      }
      function openSqlite(file) {
        const originalEmitWarning = process.emitWarning;
        process.emitWarning = function(warning, ...rest) {
          if (String(warning).includes("SQLite")) return void 0;
          return originalEmitWarning.call(process, warning, ...rest);
        };
        const { DatabaseSync: DatabaseSync2 } = (init_sqlite(), __toCommonJS(sqlite_exports));
        const raw = new DatabaseSync2(file);
        raw.exec("PRAGMA foreign_keys = ON;");
        const inTx = new AsyncLocalStorage2();
        let queue2 = Promise.resolve();
        return {
          dialect: "sqlite",
          async all(sql, ...p) {
            return raw.prepare(sql).all(...clean(p));
          },
          async get(sql, ...p) {
            return raw.prepare(sql).get(...clean(p));
          },
          async run(sql, ...p) {
            const r = raw.prepare(sql).run(...clean(p));
            return { changes: Number(r.changes), lastInsertRowid: Number(r.lastInsertRowid) };
          },
          async exec(sql) {
            raw.exec(sql);
          },
          // SQLite has one connection, so transactions take turns in a queue.
          tx(fn) {
            if (inTx.getStore()) return fn();
            const go = () => inTx.run(true, async () => {
              raw.exec("BEGIN");
              try {
                const out = await fn();
                raw.exec("COMMIT");
                return out;
              } catch (e) {
                raw.exec("ROLLBACK");
                throw e;
              }
            });
            const p = queue2.then(go, go);
            queue2 = p.catch(() => {
            });
            return p;
          },
          async lock() {
          },
          async resetSequences() {
          },
          async schemaVersion() {
            return raw.prepare("PRAGMA user_version").get().user_version;
          },
          async setSchemaVersion(v) {
            raw.exec(`PRAGMA user_version = ${Number(v)}`);
          },
          async dropAll(includeSettings) {
            raw.exec("PRAGMA foreign_keys = OFF;");
            for (const t of [...APP_TABLES, ...includeSettings ? ["app_setting"] : []]) raw.exec(`DROP TABLE IF EXISTS "${t}"`);
            raw.exec("PRAGMA foreign_keys = ON;");
          },
          async close() {
            raw.close();
          }
        };
      }
      function wrapPg(backend, dialect) {
        const txClient = new AsyncLocalStorage2();
        const q = async (sql, params) => {
          const client = txClient.getStore();
          const r = await (client ? client.query(toPg(sql), clean(params)) : backend.query(toPg(sql), clean(params)));
          return { rows: r.rows, count: r.rowCount ?? r.affectedRows ?? 0 };
        };
        const db = {
          dialect,
          async all(sql, ...p) {
            return (await q(sql, p)).rows;
          },
          async get(sql, ...p) {
            return (await q(sql, p)).rows[0];
          },
          async run(sql, ...p) {
            let s = sql.trim().replace(/;$/, "");
            const ins = /^INSERT\s+INTO\s+(\w+)/i.exec(s);
            const wantId = ins && !NO_ID.has(ins[1].toLowerCase()) && !/RETURNING/i.test(s);
            if (wantId) s += " RETURNING id";
            const r = await q(s, p);
            return { changes: r.count, lastInsertRowid: wantId ? Number(r.rows[0].id) : void 0 };
          },
          // Runs SQL text with no parameters (used for the table definitions, which are several statements).
          async exec(sql) {
            const client = txClient.getStore();
            if (!client) return backend.exec(sql);
            return typeof client.exec === "function" ? client.exec(sql) : client.query(sql);
          },
          tx(fn) {
            if (txClient.getStore()) return fn();
            return backend.transaction((client) => txClient.run(client, fn));
          },
          // Only one copy of the app may build or reset the demo data at a time.
          async lock(key) {
            await q("SELECT pg_advisory_xact_lock(?)", [key]);
          },
          // After rows are inserted with fixed ids, move each id counter past them.
          async resetSequences(tables) {
            for (const t of tables) await q(`SELECT setval(pg_get_serial_sequence('${t}', 'id'), (SELECT COALESCE(MAX(id), 0) + 1 FROM ${t}), false)`, []);
          },
          async schemaVersion() {
            await db.exec("CREATE TABLE IF NOT EXISTS app_setting (key TEXT PRIMARY KEY, value TEXT NOT NULL)");
            const row = await db.get("SELECT value FROM app_setting WHERE key = 'schema_version'");
            return row ? Number(row.value) : 0;
          },
          async setSchemaVersion(v) {
            await db.run("INSERT INTO app_setting (key, value) VALUES ('schema_version', ?) ON CONFLICT (key) DO UPDATE SET value = excluded.value", String(v));
          },
          async dropAll(includeSettings) {
            for (const t of [...APP_TABLES, ...includeSettings ? ["app_setting"] : []]) await db.exec(`DROP TABLE IF EXISTS ${t} CASCADE`);
          },
          close: () => backend.close()
        };
        return db;
      }
      function openNeon(connectionString) {
        const { Pool, neonConfig, types } = __require("@neondatabase/serverless");
        types.setTypeParser(20, (v) => parseInt(v, 10));
        types.setTypeParser(1700, (v) => parseFloat(v));
        if (globalThis.WebSocket) neonConfig.webSocketConstructor = globalThis.WebSocket;
        const pool = new Pool({ connectionString, max: 5, idleTimeoutMillis: 1e4 });
        pool.on("error", (err) => console.error("Database connection error:", err.message));
        return wrapPg({
          query: (text, params) => pool.query(text, params),
          exec: (sql) => pool.query(sql),
          async transaction(fn) {
            const client = await pool.connect();
            try {
              await client.query("BEGIN");
              const out = await fn(client);
              await client.query("COMMIT");
              return out;
            } catch (e) {
              await client.query("ROLLBACK").catch(() => {
              });
              throw e;
            } finally {
              client.release();
            }
          },
          close: () => pool.end()
        }, "postgres");
      }
      async function openPglite() {
        const { PGlite } = __require("@electric-sql/pglite");
        const pg = new PGlite({ parsers: { 20: (v) => parseInt(v, 10), 1700: (v) => parseFloat(v) } });
        await pg.waitReady;
        return wrapPg({
          query: (text, params) => pg.query(text, params),
          exec: (sql) => pg.exec(sql),
          transaction: (fn) => pg.transaction((tx) => fn(tx)),
          close: () => pg.close()
        }, "pglite");
      }
      async function openDb(opts = {}) {
        const db = opts.databaseUrl ? openNeon(opts.databaseUrl) : opts.pglite ? await openPglite() : openSqlite(opts.file || ":memory:");
        await db.tx(async () => {
          await db.lock(4242);
          if (await db.schemaVersion() !== SCHEMA_VERSION) {
            await db.dropAll(db.dialect === "sqlite");
            await db.exec(schemaSql(db.dialect === "sqlite" ? "sqlite" : "pg"));
            await db.setSchemaVersion(SCHEMA_VERSION);
          } else {
            await db.exec(schemaSql(db.dialect === "sqlite" ? "sqlite" : "pg"));
          }
        });
        return db;
      }
      async function resetTables(db) {
        await db.dropAll(false);
        await db.exec(schemaSql(db.dialect === "sqlite" ? "sqlite" : "pg"));
      }
      module.exports = { openDb, resetTables, SCHEMA_VERSION, toPg };
    }
  });

  // lib/rules.js
  var require_rules = __commonJS({
    "lib/rules.js"(exports, module) {
      "use strict";
      init_globals();
      var STAGES = ["Onboarding", "Admin", "Auditor", "Reviewer", "Tax", "Draft", "Final", "Closed"];
      var JOB_TYPES = ["Audit", "Review", "Compilation", "Tax only"];
      var LOCATIONS = ["Boca", "Stuart"];
      var ROLES = ["partner", "admin", "auditor", "reviewer", "tax"];
      var QUESTIONS = [
        { key: "employees", text: "Does the association have its own employees (payroll)?" },
        { key: "litigation", text: "Is there any pending or threatened litigation?" },
        { key: "special_assessment", text: "Was a special assessment levied or collected this year?" },
        { key: "loan", text: "Does the association have a loan or line of credit?" }
      ];
      var ITEMS = {
        bank_statements: { text: "Year-end bank statements for every operating and reserve account", kw: ["bank statement", "bank stmt", "operating account", "reserve account", "statement", "bank"] },
        bank_recs: { text: "Year-end bank reconciliations for every account", kw: ["bank reconciliation", "reconciliation", "bank rec", "recon"] },
        fin_package: { text: "Year-end financial package (balance sheet, income statement, budget vs. actual)", kw: ["financial package", "financials", "balance sheet", "income statement", "package"] },
        general_ledger: { text: "General ledger and trial balance for the full year", kw: ["general ledger", "trial balance", "ledger", " gl ", " tb "] },
        ar_aging: { text: "Owner receivables (delinquency) aging at year-end", kw: ["ar aging", "a r aging", "receivable", "delinquen", "owner aging"] },
        ap_aging: { text: "Accounts payable aging or unpaid bills at year-end", kw: ["ap aging", "a p aging", "payable", "unpaid bills"] },
        prepaids: { text: "Prepaid assessments detail at year-end", kw: ["prepaid"] },
        insurance: { text: "Insurance declarations pages (property, liability, D&O, flood)", kw: ["insurance", "declarations", "dec page", "policy", "flood"] },
        minutes: { text: "Board and owner meeting minutes for the year and up to today", kw: ["minutes", "meeting"] },
        budget: { text: "Approved budgets for this year and next year", kw: ["approved budget", "budget"] },
        reserve_study: { text: "Most recent reserve study and the reserve activity schedule", kw: ["reserve study", "reserve schedule", "reserve activity"] },
        investments: { text: "Year-end investment and CD statements", kw: ["cd statement", "investment", "certificate of deposit", "brokerage"] },
        contracts: { text: "Contracts signed during the year (over $10,000) and the management agreement", kw: ["contract", "agreement"] },
        board_list: { text: "Current board members and officers, with emails", kw: ["board list", "board members", "officers", "roster"] },
        subsequent_checks: { text: "Check register for the first two months after year-end", kw: ["check register", "disbursement", "subsequent"] },
        payroll: { text: "Payroll: Forms 941 (all quarters), Form 940, W-2/W-3 and the payroll register", kw: ["941", "940", "w 2", "w2", "payroll"] },
        legal: { text: "Attorney names and contact details for legal letters, and a summary of any claims", kw: ["attorney", "legal", "litigation", "lawsuit"] },
        special_assessment: { text: "Special assessment resolution, billing and collection schedule", kw: ["special assessment", "assessment resolution"] },
        loan: { text: "Loan or line-of-credit statements and amortization schedule at year-end", kw: ["loan", "line of credit", "amortization", "note payable"] },
        prior_return: { text: "Prior-year tax return (Form 1120-H or 1120)", kw: ["1120", "tax return", "prior year return"] },
        form_8879: { text: "Signed Form 8879 (e-file authorization)", kw: ["8879"] }
      };
      var TEMPLATES = {
        Audit: {
          base: [
            "bank_statements",
            "bank_recs",
            "fin_package",
            "general_ledger",
            "ar_aging",
            "ap_aging",
            "prepaids",
            "insurance",
            "minutes",
            "budget",
            "reserve_study",
            "investments",
            "contracts",
            "board_list",
            "subsequent_checks"
          ],
          conditional: { employees: ["payroll"], litigation: ["legal"], special_assessment: ["special_assessment"], loan: ["loan"] }
        },
        Review: {
          base: ["bank_statements", "bank_recs", "fin_package", "general_ledger", "ar_aging", "ap_aging", "prepaids", "minutes", "budget", "reserve_study"],
          conditional: { employees: ["payroll"], litigation: ["legal"], special_assessment: ["special_assessment"], loan: ["loan"] }
        },
        Compilation: {
          base: ["bank_statements", "fin_package", "general_ledger", "budget", "reserve_study"],
          conditional: { special_assessment: ["special_assessment"], loan: ["loan"] }
        },
        "Tax only": { base: ["fin_package", "prior_return", "form_8879"], conditional: {} }
      };
      var PERIOD_ITEMS = /* @__PURE__ */ new Set(["bank_statements", "bank_recs", "fin_package", "ar_aging", "ap_aging", "prepaids", "investments", "general_ledger"]);
      var MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
      var cap = (s) => s[0].toUpperCase() + s.slice(1);
      function requestItemKeys(jobType, answers) {
        const t = TEMPLATES[jobType] || TEMPLATES.Audit;
        const keys = [...t.base];
        for (const [q, extra] of Object.entries(t.conditional)) if (answers[q]) keys.push(...extra);
        return keys;
      }
      function ownerFor(stage, eng, adminId) {
        switch (stage) {
          case "Onboarding":
          case "Admin":
            return adminId;
          case "Auditor":
          case "Draft":
            return eng.auditor_id;
          case "Reviewer":
            return eng.reviewer_id;
          case "Tax":
            return eng.tax_id;
          case "Final":
            return eng.partner_id;
          default:
            return null;
        }
      }
      function gateMissing(eng) {
        const missing = [];
        if (!eng.el_signed) missing.push("engagement letter not signed");
        if (!eng.retainer_paid) missing.push("retainer not received");
        return missing;
      }
      function fyeLabel(fye, fiscalYear) {
        const [mm, dd] = fye.split("-").map(Number);
        return `${cap(MONTHS[mm - 1])} ${dd}, ${fiscalYear}`;
      }
      function matchAttachment(fileName, items, fye, fiscalYear) {
        const name = " " + fileName.toLowerCase().replace(/\.[a-z0-9]+$/, "").replace(/[_\-./()]+/g, " ") + " ";
        let best = null;
        for (const it of items) {
          if (it.status === "Accepted" || it.status === "N/A") continue;
          const lib = ITEMS[it.key];
          if (!lib) continue;
          let score = 0;
          const hits = [];
          for (const k of lib.kw) if (name.includes(k)) {
            score += k.trim().length;
            hits.push(k.trim());
          }
          if (score > 0 && (!best || score > best.score)) best = { item: it, score, hits };
        }
        if (!best) return { item: null, confidence: null, reason: "No request item matched the file name.", flag: null };
        const confidence = best.score >= 8 ? "High" : best.score >= 5 ? "Medium" : "Low";
        const reason = `File name mentions "${best.hits.slice(0, 2).join('", "')}".`;
        const flag = periodFlag(fileName, best.item.key, fye, fiscalYear);
        return { item: best.item, confidence, reason, flag };
      }
      function periodFlag(fileName, itemKey, fye, fiscalYear) {
        if (!PERIOD_ITEMS.has(itemKey)) return null;
        const name = " " + fileName.toLowerCase().replace(/\.[a-z0-9]+$/, "").replace(/[_\-./()]+/g, " ") + " ";
        const fyeMonth = Number(fye.split("-")[0]);
        const named = MONTHS.findIndex((m) => new RegExp(`\\b(${m}|${m.slice(0, 3)})\\b`).test(name));
        const numeric = /\b(\d{1,2})\s(\d{1,2})\s(20\d{2})\b/.exec(name);
        const fileMonth = named >= 0 ? named + 1 : numeric ? Number(numeric[1]) : null;
        const yearMatch = /\b(20\d{2})\b/.exec(name);
        if (fileMonth && fileMonth !== fyeMonth) {
          return `Check the period: the file looks like ${cap(MONTHS[fileMonth - 1])}, but year-end is ${cap(MONTHS[fyeMonth - 1])}.`;
        }
        if (yearMatch && Number(yearMatch[1]) !== fiscalYear) {
          return `Check the period: the file mentions ${yearMatch[1]}, but this engagement is fiscal ${fiscalYear}.`;
        }
        return null;
      }
      function checklist(items, withNotes) {
        return items.map((it, i) => {
          const note = withNotes && it.status === "Returned" && it.note ? `
      Returned: ${it.note}` : "";
          return `[ ] ${i + 1}. ${it.text}${note}`;
        }).join("\n");
      }
      function greeting(contacts) {
        const first = contacts.map((c) => c.name.split(" ")[0]);
        if (first.length === 0) return "Hello,";
        if (first.length <= 3) return `Hello ${first.join(", ").replace(/, ([^,]*)$/, " and $1")},`;
        return "Hello everyone,";
      }
      function signature(sender) {
        return `Thank you,
${sender.name}
${sender.title}
Leonardo & Company, CPAs`;
      }
      function requestListEmail({ eng, client, items, to, sender }) {
        return {
          subject: `${client.name}: fiscal ${eng.fiscal_year} ${eng.job_type.toLowerCase()} request list`,
          body: `${greeting(to)}

Thank you for choosing Leonardo & Company for the fiscal ${eng.fiscal_year} ${eng.job_type.toLowerCase()}. To get started, please send the items below for the fiscal year ending ${fyeLabel(client.fye, eng.fiscal_year)}. Just reply to this email with attachments, and put an X next to each item you are sending. If an item does not apply, write N/A next to it.

${checklist(items)}

Replying to all keeps everyone on this thread informed.

${signature(sender)}`
        };
      }
      function followUpEmail({ eng, client, open, returned, received, total, to, sender }) {
        let body = `${greeting(to)}

Thank you for what you have sent so far. We have ${received} of ${total} items for the fiscal ${eng.fiscal_year} ${eng.job_type.toLowerCase()}.`;
        if (returned.length) body += `

These items need another look (our note is under each one):

${checklist(returned, true)}`;
        if (open.length) body += `

These items are still outstanding:

${checklist(open)}`;
        body += `

You can reply to this email with the attachments.

${signature(sender)}`;
        return { subject: `Reminder: items still needed for ${client.name} (fiscal ${eng.fiscal_year})`, body };
      }
      function onboardingEmail({ eng, client, items, to, sender, invoice }) {
        const money = (n) => "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
        const billing = client.billing_instructions ? ` ${client.billing_instructions}` : "";
        return {
          subject: `${client.name}: fiscal ${eng.fiscal_year} ${eng.job_type.toLowerCase()} engagement letter, retainer invoice and request list`,
          body: `${greeting(to)}

It's time to begin the fiscal ${eng.fiscal_year} ${eng.job_type.toLowerCase()} for ${client.name}. This email has three parts:

1. Engagement letter (attached). Please sign and return it.
2. Retainer invoice ${invoice.number} for ${money(invoice.amount)}, which is ${eng.retainer_pct}% of the engagement fee (attached).${billing}
3. Request list. After your year-end on ${fyeLabel(client.fye, eng.fiscal_year)}, please send:

${checklist(items)}

We start as soon as the signed letter and the retainer arrive.

${signature(sender)}`,
          attachments: [`Engagement Letter FY${eng.fiscal_year}.pdf`, `Invoice ${invoice.number}.pdf`]
        };
      }
      function handoffEmail({ eng, client, from, to, by, receiver, reason, appUrl }) {
        const back = STAGES.indexOf(to) < STAGES.indexOf(from);
        const verb = back ? "was sent back" : "moved";
        let body = `${receiver.name.split(" ")[0]},

${client.name} (fiscal ${eng.fiscal_year} ${eng.job_type.toLowerCase()}) ${verb} from ${from} to ${to} by ${by}. It is now on your list.`;
        if (reason) body += `

Reason: ${reason}

A task was added to your task list.`;
        body += `

Open the job: ${appUrl}/#/job/${eng.id}`;
        return { subject: `${back ? "Sent back to you" : "Now with you"}: ${client.name} (${to})`, body };
      }
      module.exports = {
        STAGES,
        JOB_TYPES,
        LOCATIONS,
        ROLES,
        QUESTIONS,
        ITEMS,
        TEMPLATES,
        requestItemKeys,
        ownerFor,
        gateMissing,
        fyeLabel,
        matchAttachment,
        periodFlag,
        requestListEmail,
        followUpEmail,
        onboardingEmail,
        handoffEmail
      };
    }
  });

  // lib/time.js
  var require_time = __commonJS({
    "lib/time.js"(exports, module) {
      "use strict";
      init_globals();
      var ZONE = process.env.HUB_TIMEZONE || "America/New_York";
      var FMT = new Intl.DateTimeFormat("en-CA", {
        timeZone: ZONE,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hourCycle: "h23"
      });
      function local(date) {
        const o = {};
        for (const p of FMT.formatToParts(date)) o[p.type] = p.value;
        return `${o.year}-${o.month}-${o.day}T${o.hour}:${o.minute}:${o.second}`;
      }
      function today() {
        return local(/* @__PURE__ */ new Date()).slice(0, 10);
      }
      function now() {
        return local(/* @__PURE__ */ new Date());
      }
      function addDays(date, days) {
        const d = /* @__PURE__ */ new Date(date.slice(0, 10) + "T12:00:00Z");
        d.setUTCDate(d.getUTCDate() + days);
        return d.toISOString().slice(0, 10);
      }
      function daysBetween(a, b) {
        return Math.round((/* @__PURE__ */ new Date(b.slice(0, 10) + "T12:00:00Z") - /* @__PURE__ */ new Date(a.slice(0, 10) + "T12:00:00Z")) / 864e5);
      }
      function stamp(date, hour = 10, minute = 0) {
        return `${date}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`;
      }
      function fromDate(value) {
        const d = new Date(value);
        return Number.isNaN(d.getTime()) ? null : local(d);
      }
      module.exports = { today, now, addDays, daysBetween, stamp, fromDate };
    }
  });

  // lib/pdf.js
  var require_pdf = __commonJS({
    "lib/pdf.js"(exports, module) {
      "use strict";
      init_globals();
      var NAVY = "0.075 0.196 0.412";
      var TEAL = "0.149 0.490 0.620";
      var INK = "0.2 0.2 0.2";
      var GREY = "0.333 0.333 0.333";
      var W = 612;
      var H = 792;
      var LEFT = 54;
      var TOP = 690;
      var BOTTOM = 64;
      function ascii(s) {
        return String(s ?? "").replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/[–—]/g, "-").replace(/…/g, "...").replace(/[  ]/g, " ").replace(/✓/g, "v").replace(/[^\x20-\x7E]/g, "?");
      }
      var esc = (s) => ascii(s).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
      function wrap(text, max) {
        const out = [];
        for (const para of ascii(text).split("\n")) {
          let cur = "";
          for (const word of para.split(/\s+/)) {
            if (!word) continue;
            if ((cur ? cur.length + 1 : 0) + word.length > max && cur) {
              out.push(cur);
              cur = word;
            } else cur = cur ? `${cur} ${word}` : word;
          }
          out.push(cur);
        }
        return out;
      }
      var STYLES = {
        h: ["F2", 12, 80, 17, NAVY, 8],
        p: ["F1", 10, 100, 14, INK, 2],
        bullet: ["F1", 10, 94, 14, INK, 1],
        mono: ["F3", 8.5, 104, 11, INK, 0],
        small: ["F1", 8, 125, 11, GREY, 2],
        strong: ["F2", 10, 92, 14, INK, 2]
      };
      function makePdf(doc) {
        const pages = [[]];
        let y = doc.banner ? TOP - 14 : TOP;
        for (const b of doc.blocks || []) {
          if (b.style === "gap") {
            y -= 8;
            continue;
          }
          const [font, size, max, lead, color, before] = STYLES[b.style] || STYLES.p;
          const lines = b.style === "mono" ? [ascii(b.text).slice(0, max)] : wrap(b.text, max);
          y -= before;
          lines.forEach((line, i) => {
            if (y - lead < BOTTOM) {
              pages.push([]);
              y = TOP;
            }
            y -= lead;
            const x = b.style === "bullet" ? LEFT + 14 : LEFT;
            if (b.style === "bullet" && i === 0) pages[pages.length - 1].push({ font, size, color, x: LEFT + 2, y, text: "-" });
            pages[pages.length - 1].push({ font, size, color, x, y, text: line });
          });
        }
        const streams = pages.map((items, i) => {
          const parts = [
            `${NAVY} rg 0 ${H - 66} ${W} 66 re f`,
            `BT /F2 16 Tf 1 1 1 rg 1 0 0 1 ${LEFT} ${H - 38} Tm (${esc(doc.title)}) Tj ET`,
            doc.subtitle ? `BT /F1 9 Tf 1 1 1 rg 1 0 0 1 ${LEFT} ${H - 54} Tm (${esc(doc.subtitle)}) Tj ET` : "",
            doc.banner && i === 0 ? `BT /F2 9 Tf ${TEAL} rg 1 0 0 1 ${LEFT} ${TOP + 2} Tm (${esc(doc.banner)}) Tj ET` : "",
            ...items.map((t) => `BT /${t.font} ${t.size} Tf ${t.color} rg 1 0 0 1 ${t.x} ${t.y.toFixed(1)} Tm (${esc(t.text)}) Tj ET`),
            `${GREY} RG 0.5 w ${LEFT} 44 m ${W - LEFT} 44 l S`,
            `BT /F1 8 Tf ${GREY} rg 1 0 0 1 ${LEFT} 30 Tm (${esc(doc.footer || "")}) Tj ET`,
            `BT /F1 8 Tf ${GREY} rg 1 0 0 1 ${W - LEFT - 60} 30 Tm (Page ${i + 1} of ${pages.length}) Tj ET`
          ];
          return parts.filter(Boolean).join("\n");
        });
        const objects = [];
        const add = (body) => {
          objects.push(body);
          return objects.length;
        };
        add("<< /Type /Catalog /Pages 2 0 R >>");
        add("PAGES");
        add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>");
        add("<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>");
        add("<< /Type /Font /Subtype /Type1 /BaseFont /Courier /Encoding /WinAnsiEncoding >>");
        const kids = [];
        for (const s of streams) {
          const pageNo = objects.length + 1;
          kids.push(`${pageNo} 0 R`);
          add(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 3 0 R /F2 4 0 R /F3 5 0 R >> >> /Contents ${pageNo + 1} 0 R >>`);
          add(`<< /Length ${s.length} >>
stream
${s}
endstream`);
        }
        objects[1] = `<< /Type /Pages /Kids [${kids.join(" ")}] /Count ${kids.length} >>`;
        const info = add(`<< /Title (${esc(doc.title)}) /Producer (Leonardo Practice Hub demo) >>`);
        let out = "%PDF-1.4\n";
        const offsets = [];
        objects.forEach((body, i) => {
          offsets.push(out.length);
          out += `${i + 1} 0 obj
${body}
endobj
`;
        });
        const xref = out.length;
        out += `xref
0 ${objects.length + 1}
0000000000 65535 f 
${offsets.map((o) => `${String(o).padStart(10, "0")} 00000 n 
`).join("")}`;
        out += `trailer
<< /Size ${objects.length + 1} /Root 1 0 R /Info ${info} 0 R >>
startxref
${xref}
%%EOF
`;
        return import_buffer.Buffer.from(out, "latin1");
      }
      module.exports = { makePdf, ascii };
    }
  });

  // lib/samples.js
  var require_samples = __commonJS({
    "lib/samples.js"(exports, module) {
      "use strict";
      init_globals();
      var { makePdf } = require_pdf();
      var R = require_rules();
      var BANNER = "SYNTHETIC DEMO DOCUMENT - NOT REAL DATA";
      var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      var money = (n) => n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      var pad = (s, n) => String(s).padEnd(n).slice(0, n);
      var lpad = (s, n) => String(s).padStart(n).slice(-n);
      function rng(seedText) {
        let h = 2166136261;
        for (const c of String(seedText)) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
        return () => {
          h = Math.imul(h ^ h >>> 13, 1274126177);
          return ((h ^ h >>> 16) >>> 0) / 4294967296;
        };
      }
      function period(fye, fiscalYear, monthOffset = 0) {
        const [m, d] = fye.split("-").map(Number);
        let month = m + monthOffset;
        let year = fiscalYear;
        while (month < 1) {
          month += 12;
          year -= 1;
        }
        while (month > 12) {
          month -= 12;
          year += 1;
        }
        const last = new Date(year, month, 0).getDate();
        return { month, year, name: MONTHS[month - 1], mm: String(month).padStart(2, "0"), dd: String(monthOffset === 0 ? d : last).padStart(2, "0"), last };
      }
      function pdfDoc(title, subtitle, blocks, clientName) {
        return makePdf({ title, subtitle, banner: BANNER, blocks, footer: `${clientName} - synthetic sample for the Leonardo Practice Hub demo` });
      }
      var BUILDERS = {
        bank_statements(ctx, r) {
          const p = ctx.period;
          let bal = 18e4 + Math.round(r() * 9e4);
          const rows = [];
          const add = (day, desc, amt) => {
            bal += amt;
            rows.push(`${p.mm}/${String(day).padStart(2, "0")}  ${pad(desc, 44)} ${lpad(amt > 0 ? money(amt) : "", 12)} ${lpad(amt < 0 ? money(-amt) : "", 12)} ${lpad(money(bal), 13)}`);
          };
          const start2 = bal;
          add(1, "Owner assessments - lockbox deposit", 41e3 + Math.round(r() * 9e3));
          add(3, "Landscaping services - check 4471", -(5200 + Math.round(r() * 900)));
          add(5, "Management fee - ACH", -(3800 + Math.round(r() * 400)));
          add(9, "Insurance premium installment - ACH", -(9100 + Math.round(r() * 1200)));
          add(12, "Owner assessments - lockbox deposit", 6200 + Math.round(r() * 2e3));
          add(15, "Electric utility - ACH", -(2100 + Math.round(r() * 500)));
          add(18, "Pool maintenance - check 4472", -(1450 + Math.round(r() * 300)));
          add(22, "Transfer to reserve money market", -(8e3 + Math.round(r() * 2e3)));
          add(26, "Late fees and interest", 380 + Math.round(r() * 200));
          add(p.last, "Interest earned", 12 + Math.round(r() * 30));
          return pdfDoc("Operating Account Statement", `Coastal Federal Bank (synthetic) - account ending x${4800 + Math.floor(r() * 199)}`, [
            { style: "h", text: ctx.clientName },
            { style: "p", text: `Statement period: ${p.name} 1 - ${p.name} ${p.last}, ${p.year}` },
            { style: "gap" },
            { style: "strong", text: `Beginning balance: $${money(start2)}     Ending balance: $${money(bal)}` },
            { style: "gap" },
            { style: "mono", text: `Date   ${pad("Description", 44)} ${lpad("Deposits", 12)} ${lpad("Withdrawals", 12)} ${lpad("Balance", 13)}` },
            { style: "mono", text: "-".repeat(91) },
            ...rows.map((t) => ({ style: "mono", text: t })),
            { style: "gap" },
            { style: "small", text: "Account numbers are masked. This statement was generated for a software demonstration and does not describe a real account." }
          ], ctx.clientName);
        },
        ar_aging(ctx, r) {
          const p = ctx.period;
          const lines = ["Unit,Owner,Current,31-60 days,61-90 days,Over 90 days,Total"];
          let tot = [0, 0, 0, 0];
          for (let i = 0; i < 14; i++) {
            const unit = 100 + Math.floor(r() * 300);
            const vals = [Math.round(r() * 450), r() < 0.4 ? Math.round(r() * 450) : 0, r() < 0.2 ? Math.round(r() * 450) : 0, r() < 0.12 ? Math.round(r() * 2400) : 0];
            tot = tot.map((t, k) => t + vals[k]);
            lines.push(`${unit},Owner ${String.fromCharCode(65 + i)} (synthetic),${vals.map((v) => v.toFixed(2)).join(",")},${vals.reduce((a, b) => a + b, 0).toFixed(2)}`);
          }
          lines.push(`TOTAL,,${tot.map((v) => v.toFixed(2)).join(",")},${tot.reduce((a, b) => a + b, 0).toFixed(2)}`);
          lines.push(`"Aging as of ${p.name} ${Number(p.dd)}, ${p.year} - ${ctx.clientName} - ${BANNER}"`);
          return import_buffer.Buffer.from(lines.join("\r\n") + "\r\n", "utf8");
        },
        general_ledger(ctx, r) {
          const lines = ["Date,Account,Description,Debit,Credit"];
          const accts = [["4000", "Assessment income"], ["5100", "Landscaping"], ["5200", "Utilities"], ["5300", "Insurance"], ["5400", "Management fees"], ["5500", "Repairs and maintenance"]];
          for (let i = 0; i < 24; i++) {
            const [no, name] = accts[Math.floor(r() * accts.length)];
            const amt = (200 + r() * 6e3).toFixed(2);
            const mo = String(1 + Math.floor(r() * 12)).padStart(2, "0");
            lines.push(`${ctx.fiscalYear}-${mo}-${String(1 + Math.floor(r() * 27)).padStart(2, "0")},${no} ${name},${name} - entry ${1e3 + i},${no === "4000" ? "" : amt},${no === "4000" ? amt : ""}`);
          }
          lines.push(`"${ctx.clientName} - fiscal ${ctx.fiscalYear} general ledger extract - ${BANNER}"`);
          return import_buffer.Buffer.from(lines.join("\r\n") + "\r\n", "utf8");
        },
        fin_package(ctx, r) {
          const cash = 21e4 + Math.round(r() * 8e4);
          const reserve = 34e4 + Math.round(r() * 2e5);
          const income = 52e4 + Math.round(r() * 12e4);
          const exp = Math.round(income * (0.88 + r() * 0.1));
          return pdfDoc("Year-End Financial Package", `${ctx.clientName} - fiscal year ending ${ctx.period.name} ${ctx.period.dd}, ${ctx.period.year}`, [
            { style: "h", text: "Balance sheet (summary)" },
            { style: "mono", text: `${pad("Operating cash", 40)} ${lpad(money(cash), 14)}` },
            { style: "mono", text: `${pad("Reserve cash and money market", 40)} ${lpad(money(reserve), 14)}` },
            { style: "mono", text: `${pad("Owner receivables, net", 40)} ${lpad(money(8e3 + Math.round(r() * 9e3)), 14)}` },
            { style: "mono", text: `${pad("Prepaid insurance", 40)} ${lpad(money(22e3 + Math.round(r() * 8e3)), 14)}` },
            { style: "h", text: "Income statement (summary)" },
            { style: "mono", text: `${pad("Assessment income", 40)} ${lpad(money(income), 14)}` },
            { style: "mono", text: `${pad("Operating expenses", 40)} ${lpad(money(exp), 14)}` },
            { style: "mono", text: `${pad("Excess of income over expenses", 40)} ${lpad(money(income - exp), 14)}` },
            { style: "h", text: "Budget vs. actual" },
            { style: "p", text: "Landscaping 4% over budget; insurance 11% over budget after renewal; utilities 3% under budget." }
          ], ctx.clientName);
        },
        payroll(ctx, r) {
          const wages = 38e3 + Math.round(r() * 12e3);
          return pdfDoc("Form 941 Summary", `${ctx.clientName} - quarterly payroll summary (synthetic)`, [
            { style: "p", text: "Summary prepared by the payroll provider. Not an IRS form." },
            { style: "mono", text: `${pad("Wages, tips and other compensation", 44)} ${lpad(money(wages), 14)}` },
            { style: "mono", text: `${pad("Federal income tax withheld", 44)} ${lpad(money(wages * 0.11), 14)}` },
            { style: "mono", text: `${pad("Social Security and Medicare (employee + employer)", 44)} ${lpad(money(wages * 0.153), 14)}` },
            { style: "mono", text: `${pad("Total taxes after adjustments", 44)} ${lpad(money(wages * 0.263), 14)}` }
          ], ctx.clientName);
        }
      };
      function sampleDocument(key, ctx) {
        const p = period(ctx.fye, ctx.fiscalYear, ctx.monthOffset || 0);
        const full = { ...ctx, period: p };
        const r = rng(`${ctx.clientName}|${key}|${ctx.fiscalYear}|${ctx.monthOffset || 0}`);
        const short = (R.ITEMS[key] ? R.ITEMS[key].text : key).split(" (")[0].split(":")[0];
        const names = {
          bank_statements: `Operating Bank Statement ${p.name} ${p.year}.pdf`,
          ar_aging: `AR Aging ${p.mm}-${p.dd}-${p.year}.csv`,
          general_ledger: `General Ledger FY${ctx.fiscalYear}.csv`,
          fin_package: `Financial Package ${p.name} ${p.year}.pdf`,
          payroll: `Payroll 941 Summary ${p.year}.pdf`
        };
        if (BUILDERS[key]) return { name: names[key], buffer: BUILDERS[key](full, r) };
        return {
          name: `${short}.pdf`,
          buffer: pdfDoc(short, `${ctx.clientName} - fiscal ${ctx.fiscalYear}`, [
            { style: "p", text: `This is a made-up sample document standing in for: ${R.ITEMS[key] ? R.ITEMS[key].text : key}.` },
            { style: "p", text: "In a real engagement this is where the association's own record would be. The demo uses it to show how documents are stored, previewed and tracked." }
          ], ctx.clientName)
        };
      }
      function placeholderFor(fileName, clientName) {
        if (/\.(csv|txt)$/i.test(fileName)) {
          return { buffer: import_buffer.Buffer.from(`Simulated attachment,${fileName}\r
Client,${clientName}\r
Note,${BANNER}\r
`, "utf8"), pdf: false };
        }
        return {
          pdf: true,
          buffer: pdfDoc("Simulated email attachment", fileName, [
            { style: "p", text: `The demo created this placeholder for an attachment named "${fileName}" from ${clientName}.` },
            { style: "p", text: "In the real build, the actual file from the client's email would be saved here automatically." }
          ], clientName)
        };
      }
      module.exports = { sampleDocument, placeholderFor, period, BANNER };
    }
  });

  // lib/authorization.js
  var require_authorization = __commonJS({
    "lib/authorization.js"(exports, module) {
      "use strict";
      init_globals();
      var crypto = (init_crypto(), __toCommonJS(crypto_exports));
      var LETTER_VERSION = "1.0";
      var LETTER_DATE = "October 2026";
      var DRAFT_NOTICE = "Draft template for review by Leonardo & Company and its legal counsel. Not legal advice. Not for use with real clients until approved.";
      function letterSections(clientName) {
        return [
          { heading: "Parties", paragraphs: [`This agreement is between Leonardo & Company, CPAs ("Leonardo") and ${clientName} (the "Association").`] },
          { heading: "1. Purpose", paragraphs: [`Leonardo provides a secure online client portal (the "Portal") so the Association can send records, answer questions and exchange messages and documents with Leonardo for the services described in the Association's engagement letter, such as audit, review, compilation and tax services.`] },
          { heading: "2. Your authority", paragraphs: ["By signing, you confirm that you are a board member, officer or community association manager of the Association; that the Association has authorized you to provide its records and information to Leonardo through the Portal; and that the Association authorizes Leonardo to receive, store and use those records to perform the services in its engagement letter."] },
          { heading: "3. Electronic records and signatures", paragraphs: ["The Association agrees to receive requests, notices and documents from Leonardo electronically, through the Portal and by email. Electronic signatures and records exchanged through the Portal have the same effect as signed paper originals. The Association may withdraw this consent, or ask for paper copies, by writing to Leonardo. Withdrawing consent may slow down the services."] },
          { heading: "4. Your responsibilities", paragraphs: ["When using the Portal, you agree to:"], bullets: [
            "Keep your Portal sign-in private and not share it with anyone.",
            "Upload only the information Leonardo requests, and not upload Social Security numbers or full bank account numbers unless Leonardo specifically asks for them.",
            "Check that files are complete and cover the correct period before you upload them.",
            "Tell Leonardo promptly if someone leaves the board or the management company, or if you think someone has used the Portal without permission."
          ] },
          { heading: "5. How Leonardo protects your information", paragraphs: ["Leonardo limits Portal access to its staff working on the Association's engagements and to the people the Association authorizes; protects information while it is sent and while it is stored; records Portal activity, including who uploaded each document and when; and keeps client information confidential as professional standards require."] },
          { heading: "6. Authorized users", paragraphs: ["The Association will tell Leonardo who is authorized to use the Portal on its behalf. Leonardo may rely on information and instructions from any authorized user until the Association tells Leonardo in writing that the person is no longer authorized."] },
          { heading: "7. Records and retention", paragraphs: ["Documents uploaded to the Portal become part of Leonardo's engagement records and are kept according to Leonardo's records retention policy and professional requirements. Leonardo may remove Portal access when an engagement ends."] },
          { heading: "8. Term", paragraphs: ["This agreement stays in effect until the Association or Leonardo ends it in writing. It does not change the engagement letter, which continues to govern the services, fees and responsibilities of both parties."] }
        ];
      }
      function letterText(clientName) {
        const lines = [`CLIENT PORTAL AUTHORIZATION AND ELECTRONIC COMMUNICATIONS AGREEMENT`, `Version ${LETTER_VERSION} (${LETTER_DATE})`, ""];
        for (const s of letterSections(clientName)) {
          lines.push(s.heading);
          s.paragraphs.forEach((p) => lines.push(p));
          (s.bullets || []).forEach((b) => lines.push(`- ${b}`));
          lines.push("");
        }
        return lines.join("\n");
      }
      var fingerprint = (text) => crypto.createHash("sha256").update(text, "utf8").digest("hex");
      module.exports = { LETTER_VERSION, LETTER_DATE, DRAFT_NOTICE, letterSections, letterText, fingerprint };
    }
  });

  // lib/files.js
  var require_files = __commonJS({
    "lib/files.js"(exports, module) {
      "use strict";
      init_globals();
      var crypto = (init_crypto(), __toCommonJS(crypto_exports));
      var T = require_time();
      var MAX_MB = Number(process.env.HUB_MAX_UPLOAD_MB) || (process.env.VERCEL ? 4 : 25);
      var MAX_BYTES = MAX_MB * 1024 * 1024;
      var isZip = (b) => b.length > 3 && b[0] === 80 && b[1] === 75 && b[2] === 3 && b[3] === 4;
      var isOle = (b) => b.length > 3 && b[0] === 208 && b[1] === 207 && b[2] === 17 && b[3] === 224;
      var isText = (b) => !b.subarray(0, 4096).includes(0);
      var TYPES = {
        pdf: { mime: "application/pdf", label: "PDF", preview: "pdf", check: (b) => b.subarray(0, 5).toString("latin1") === "%PDF-" },
        png: { mime: "image/png", label: "Image", preview: "image", check: (b) => b[0] === 137 && b.subarray(1, 4).toString("latin1") === "PNG" },
        jpg: { mime: "image/jpeg", label: "Image", preview: "image", check: (b) => b[0] === 255 && b[1] === 216 && b[2] === 255 },
        jpeg: { mime: "image/jpeg", label: "Image", preview: "image", check: (b) => b[0] === 255 && b[1] === 216 && b[2] === 255 },
        csv: { mime: "text/csv", label: "CSV", preview: "text", check: isText },
        txt: { mime: "text/plain", label: "Text", preview: "text", check: isText },
        xlsx: { mime: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", label: "Excel", preview: null, check: isZip },
        xls: { mime: "application/vnd.ms-excel", label: "Excel", preview: null, check: isOle },
        docx: { mime: "application/vnd.openxmlformats-officedocument.wordprocessingml.document", label: "Word", preview: null, check: isZip },
        doc: { mime: "application/msword", label: "Word", preview: null, check: isOle }
      };
      var FileError = class extends Error {
        constructor(status, message) {
          super(message);
          this.status = status;
        }
      };
      function cleanName(name) {
        const base = String(name || "").split(/[\\/]/).pop().replace(/[\x00-\x1f<>:"|?*]/g, " ").replace(/\s+/g, " ").trim();
        return base.slice(0, 150) || "file";
      }
      function inspectFile(name, buf) {
        const ext = ((/\.([a-z0-9]+)$/i.exec(name) || [])[1] || "").toLowerCase();
        const type = TYPES[ext];
        if (!type) throw new FileError(415, `"${name}" can't be uploaded. Allowed types: PDF, Excel, Word, CSV, text, JPG and PNG.`);
        if (!buf.length) throw new FileError(400, `"${name}" is empty.`);
        if (buf.length > MAX_BYTES) throw new FileError(413, `"${name}" is larger than ${MAX_MB} MB.`);
        if (!type.check(buf)) throw new FileError(415, `"${name}" doesn't look like a real .${ext} file, so it was not accepted.`);
        const sha2562 = crypto.createHash("sha256").update(buf).digest("hex");
        let pdfPages = null;
        if (ext === "pdf") {
          const m = buf.toString("latin1").match(/\/Type\s*\/Page(?![s\w])/g);
          pdfPages = m ? m.length : null;
        }
        return { ext, mime: type.mime, label: type.label, preview: type.preview, sha256: sha2562, pdfPages };
      }
      async function storeDocument(db, storage, o) {
        const name = cleanName(o.name);
        const meta = o.mimeOverride ? { ext: "pdf", mime: o.mimeOverride, label: "PDF", preview: "pdf", sha256: crypto.createHash("sha256").update(o.buffer).digest("hex"), pdfPages: 1 } : inspectFile(name, o.buffer);
        const stored = `${meta.sha256.slice(0, 12)}-${crypto.randomBytes(4).toString("hex")}.${meta.ext}`;
        await storage.save(documentKey({ engagement_id: o.engagementId, stored_name: stored }), o.buffer, meta.mime);
        const direction = o.direction || "from_client";
        const version = o.itemId ? 1 + (await db.get("SELECT COUNT(*) AS n FROM document WHERE engagement_id = ? AND item_id = ? AND direction = ?", o.engagementId, o.itemId, direction)).n : 1;
        const id = (await db.run(
          `INSERT INTO document (engagement_id, item_id, direction, channel, original_name, stored_name, mime, size, sha256, pdf_pages,
      client_modified, uploaded_by_contact, uploaded_by_staff, uploaded_at, ip, version, simulated, status, reviewed_by, reviewed_at, review_note)
      VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
          o.engagementId,
          o.itemId || null,
          direction,
          o.channel,
          name,
          stored,
          meta.mime,
          o.buffer.length,
          meta.sha256,
          meta.pdfPages,
          o.clientModified || null,
          o.contactId || null,
          o.staffId || null,
          o.uploadedAt || T.now(),
          o.ip || null,
          version,
          o.simulated ? 1 : 0,
          o.status || (direction === "to_client" ? "Shared" : "Pending"),
          o.reviewedBy || null,
          o.reviewedAt || null,
          o.reviewNote || null
        )).lastInsertRowid;
        return db.get("SELECT * FROM document WHERE id = ?", id);
      }
      var documentKey = (doc) => `${doc.engagement_id}/${doc.stored_name}`;
      function contentDisposition(kind, name) {
        const fallback = name.replace(/[^\x20-\x7E]/g, "_").replace(/["\\]/g, "_");
        return `${kind}; filename="${fallback}"; filename*=UTF-8''${encodeURIComponent(name)}`;
      }
      module.exports = { TYPES, MAX_BYTES, MAX_MB, FileError, cleanName, inspectFile, storeDocument, documentKey, contentDisposition };
    }
  });

  // lib/seed.js
  var require_seed = __commonJS({
    "lib/seed.js"(exports, module) {
      "use strict";
      init_globals();
      var R = require_rules();
      var T = require_time();
      var S = require_samples();
      var A = require_authorization();
      var { storeDocument } = require_files();
      var APP_URL = process.env.HUB_APP_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");
      function mulberry32(seed2) {
        return function() {
          seed2 |= 0;
          seed2 = seed2 + 1831565813 | 0;
          let t = Math.imul(seed2 ^ seed2 >>> 15, 1 | seed2);
          t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
          return ((t ^ t >>> 14) >>> 0) / 4294967296;
        };
      }
      var STAFF = [
        ["Alex Leonardo", "partner", "Managing Partner", "alex@leonardo-demo.test", "Boca"],
        ["Mily Leonardo", "partner", "Partner, Operations", "mily@leonardo-demo.test", "Boca"],
        ["Jenna Cole", "admin", "Client Services Administrator", "jenna@leonardo-demo.test", "Boca"],
        ["Dana Ruiz", "auditor", "Senior Auditor", "dana@leonardo-demo.test", "Boca"],
        ["Marcus Lee", "auditor", "Auditor", "marcus@leonardo-demo.test", "Stuart"],
        ["Sofia Grant", "auditor", "Auditor", "sofia@leonardo-demo.test", "Boca"],
        ["Priya Shah", "reviewer", "Audit Manager (Reviewer)", "priya@leonardo-demo.test", "Boca"],
        ["Tom Becker", "tax", "Tax Preparer", "tom@leonardo-demo.test", "Stuart"]
      ];
      var ID = { alex: 1, mily: 2, jenna: 3, dana: 4, marcus: 5, sofia: 6, priya: 7, tom: 8 };
      var MGMT = [
        ["Coastal Community Management", "Karen Mills", "karen@coastal-cm.example", "561-555-0141", "coastal-cm.example"],
        ["Palm Harbor Property Services", "Luis Ortega", "lortega@palmharbor-ps.example", "561-555-0177", "palmharbor-ps.example"],
        ["Seabreeze Association Management", "Dee Walsh", "dee@seabreeze-am.example", "561-555-0123", "seabreeze-am.example"],
        ["Treasure Coast Community Partners", "Bill Hayes", "bhayes@tccp.example", "772-555-0160", "tccp.example"],
        ["Atlantic Condo Services", "Nina Patel", "nina@atlantic-cs.example", "561-555-0109", "atlantic-cs.example"]
      ];
      var CLIENTS = [
        ["Mariner's Cove Condominium Association", "Condo", "Boca", 1, "12-31", 212, "Audit", "dana", 9800],
        ["Pelican Pointe Homeowners Association", "HOA", "Boca", 1, "12-31", 340, "Audit", "dana", 11200],
        ["Banyan Lakes Homeowners Association", "HOA", "Boca", 2, "12-31", 518, "Audit", "sofia", 13500],
        ["Royal Palm Isles Condominium Association", "Condo", "Boca", 2, "12-31", 96, "Review", "sofia", 5200],
        ["Heron Bay Master Association", "HOA", "Boca", 3, "12-31", 1240, "Audit", "dana", 18900],
        ["Sandpiper Villas Condominium Association", "Condo", "Boca", 3, "12-31", 48, "Compilation", "sofia", 2900],
        ["Coral Ridge Townhomes Association", "HOA", "Boca", 1, "12-31", 120, "Review", "dana", 4800],
        ["Seagrape Landing Homeowners Association", "HOA", "Boca", null, "12-31", 64, "Compilation", "sofia", 2600],
        ["Starfish Harbor Condominium Association", "Condo", "Boca", 2, "12-31", 156, "Audit", "sofia", 9100],
        ["Kingfisher Lakes Homeowners Association", "HOA", "Boca", 3, "12-31", 410, "Audit", "dana", 12300],
        ["Moonlight Shores Condominium Association", "Condo", "Boca", 5, "12-31", 88, "Tax only", "sofia", 950],
        ["Osprey Run Community Association", "HOA", "Stuart", 4, "12-31", 302, "Audit", "marcus", 10900],
        ["Manatee Bend Condominium Association", "Condo", "Stuart", 4, "12-31", 140, "Review", "marcus", 5400],
        ["Cypress Hammock Homeowners Association", "HOA", "Stuart", 4, "12-31", 225, "Audit", "marcus", 9600],
        ["Tarpon Shores Condominium Association", "Condo", "Stuart", null, "12-31", 60, "Compilation", "marcus", 2800],
        ["Seashell Terrace Condominium Association", "Condo", "Stuart", 4, "12-31", 54, "Review", "marcus", 4600],
        ["Palmetto Reach Homeowners Association", "HOA", "Stuart", 1, "12-31", 380, "Audit", "marcus", 11800],
        ["Conch Bay Townhomes Association", "HOA", "Stuart", null, "12-31", 42, "Tax only", "marcus", 900],
        ["Egret Landing Homeowners Association", "HOA", "Boca", 5, "06-30", 286, "Audit", "dana", 10400],
        ["Hibiscus Court Villas Condominium", "Condo", "Boca", 5, "09-30", 72, "Review", "sofia", 5e3],
        ["Driftwood Key Condominium Association", "Condo", "Stuart", 4, "06-30", 110, "Audit", "marcus", 8700],
        ["Mangrove Isle Homeowners Association", "HOA", "Stuart", 1, "09-30", 190, "Audit", "marcus", 9300],
        ["Sea Turtle Cove Homeowners Association", "HOA", "Boca", 1, "06-30", 260, "Audit", "sofia", 9900],
        ["Bougainvillea Gardens Condominium", "Condo", "Boca", 2, "09-30", 132, "Audit", "dana", 8800]
      ];
      var FIRST = [
        "Linda",
        "Robert",
        "Maria",
        "James",
        "Patricia",
        "Michael",
        "Carol",
        "David",
        "Susan",
        "Richard",
        "Gloria",
        "Thomas",
        "Barbara",
        "Charles",
        "Diane",
        "Steven",
        "Elaine",
        "Frank",
        "Joyce",
        "George",
        "Ruth",
        "Kenneth",
        "Sandra",
        "Paul",
        "Teresa",
        "Ray",
        "Denise",
        "Victor",
        "Ann",
        "Hector",
        "Irene",
        "Walter",
        "Lorraine",
        "Arthur",
        "Yolanda",
        "Henry"
      ];
      var LAST = [
        "Alvarez",
        "Brennan",
        "Castillo",
        "Dawson",
        "Ellison",
        "Fischer",
        "Gallagher",
        "Hoffman",
        "Ibarra",
        "Jensen",
        "Kowalski",
        "Lindqvist",
        "Moreau",
        "Novak",
        "Oneill",
        "Pruitt",
        "Quintero",
        "Rasmussen",
        "Sorensen",
        "Thornton",
        "Underwood",
        "Vasquez",
        "Whitaker",
        "Yamamoto",
        "Zeller",
        "Abernathy",
        "Beaumont",
        "Cardenas",
        "Delgado",
        "Ferreira"
      ];
      async function seed(db, opts = {}) {
        const TODAY = opts.today || T.today();
        const STORE = opts.storage;
        if (!STORE) throw new Error("seed() needs opts.storage for the sample documents.");
        const CUR = Number(TODAY.slice(0, 4));
        const PREV = CUR - 1;
        const rand = mulberry32(20261013);
        const pick = (arr) => arr[Math.floor(rand() * arr.length)];
        const between = (a, b) => a + Math.floor(rand() * (b - a + 1));
        const ago = (n) => T.addDays(TODAY, -n);
        const staffById = {};
        await db.tx(async () => {
          for (const [i, s] of STAFF.entries()) {
            await db.run("INSERT INTO staff (id, name, role, title, email, office) VALUES (?,?,?,?,?,?)", i + 1, ...s);
            staffById[i + 1] = { id: i + 1, name: s[0], role: s[1], title: s[2], email: s[3] };
          }
          for (const [i, m] of MGMT.entries()) {
            await db.run("INSERT INTO mgmt_company (id, name, contact_name, email, phone) VALUES (?,?,?,?,?)", i + 1, m[0], m[1], m[2], m[3]);
          }
          const usedNames = /* @__PURE__ */ new Set();
          const person = () => {
            let n;
            do {
              n = `${pick(FIRST)} ${pick(LAST)}`;
            } while (usedNames.has(n));
            usedNames.add(n);
            return n;
          };
          const emailFor = (name, domain) => `${name.toLowerCase().replace(/[^a-z ]/g, "").replace(" ", ".")}@${domain}`;
          const clients = [];
          for (const [i, c] of CLIENTS.entries()) {
            const [name, type, location, mgmt, fye, units, jobType, auditor, fee] = c;
            const slug = name.toLowerCase().replace(/[^a-z ]/g, "").split(" ").slice(0, 2).join("");
            const domain = `${slug}.example`;
            const billing = mgmt === 2 ? "Please email payment remittances to invoices@palmharbor-ps.example (Palm Harbor lockbox)." : i % 5 === 0 ? `Invoices are paid from the lockbox; email them to ap@${domain}.` : null;
            const id = i + 1;
            await db.run(
              "INSERT INTO client (id, name, entity_type, location, mgmt_company_id, fye, units, billing_instructions) VALUES (?,?,?,?,?,?,?,?)",
              id,
              name,
              type,
              location,
              mgmt,
              fye,
              units,
              billing
            );
            const add = async (role, receives, cc, domainOverride) => {
              const n = person();
              await db.run(
                "INSERT INTO contact (client_id, name, role, email, phone, receives_requests, cc) VALUES (?,?,?,?,?,?,?)",
                id,
                n,
                role,
                emailFor(n, domainOverride || domain),
                `${location === "Stuart" ? "772" : "561"}-555-${String(between(200, 999)).padStart(4, "0")}`,
                receives,
                cc
              );
            };
            if (name.startsWith("Heron Bay")) {
              await add("Board President", 0, 1);
              await add("Treasurer", 1, 0);
              await add("Community Association Manager", 1, 0, MGMT[2][4]);
              await add("Assistant Manager", 0, 1, MGMT[2][4]);
              await add("Accounting Manager", 1, 0, MGMT[2][4]);
              for (const sub of ["Heron Bay Isles", "Heron Bay Estates", "The Preserve", "Lakeside Villas", "Heron Bay Commons", "Bayview Courts", "The Reserve"]) {
                await add(`President, ${sub}`, 0, 1);
              }
            } else {
              await add("Board President", 0, 1);
              await add("Treasurer", 1, 0);
              if (mgmt) await add("Community Association Manager", 1, 0, MGMT[mgmt - 1][4]);
              else await add("Secretary", 1, 0);
              if (i % 3 === 0 && mgmt) await add("Assistant Manager", 0, 1, MGMT[mgmt - 1][4]);
            }
            clients.push({ id, name, type, location, mgmt, fye, jobType, auditor: ID[auditor], fee, billing_instructions: billing });
          }
          let invoiceSeq = 0;
          const invoiceNo = (fy) => `${String(fy).slice(2)}-${String(++invoiceSeq).padStart(4, "0")}`;
          const contactsOf = (clientId) => db.all("SELECT * FROM contact WHERE client_id = ? ORDER BY id", clientId);
          const engagementAndClient = async (engId) => {
            const e = await db.get("SELECT * FROM engagement WHERE id = ?", engId);
            const c = await db.get("SELECT * FROM client WHERE id = ?", e.client_id);
            return { e, c };
          };
          const addEmail = async (e) => (await db.run(
            "INSERT INTO email (engagement_id, kind, direction, from_addr, to_addrs, cc_addrs, subject, body, attachments, status, scheduled_for, at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)",
            e.engagement_id,
            e.kind,
            e.direction,
            e.from,
            e.to,
            e.cc || "",
            e.subject,
            e.body,
            (e.attachments || []).join("|"),
            e.status || "Sent",
            null,
            e.at
          )).lastInsertRowid;
          const history = (engId, from, to, direction, by, at, reason = null) => db.run("INSERT INTO stage_history (engagement_id, from_stage, to_stage, direction, reason, by_id, at) VALUES (?,?,?,?,?,?,?)", engId, from, to, direction, reason, by, at);
          const addEngagement = async (client, fy, spec) => {
            const partner = client.location === "Stuart" ? ID.mily : ID.alex;
            const fee = spec.fee;
            const taxFee = client.jobType === "Tax only" ? null : between(7, 12) * 50;
            const created = spec.created || T.stamp(spec.el_sent || ago(60), 9);
            const engId = (await db.run(
              `INSERT INTO engagement (client_id, fiscal_year, job_type, stage, stage_since, partner_id, auditor_id, reviewer_id, tax_id,
          fee, tax_fee, retainer_pct, quote_note, due_date, el_sent, el_signed, retainer_invoiced, retainer_paid, request_sent, draft_issued, final_issued,
          rolled_from_id, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
              client.id,
              fy,
              client.jobType,
              spec.stage,
              spec.stage_since,
              partner,
              client.auditor,
              ID.priya,
              ID.tom,
              fee,
              taxFee,
              50,
              spec.quote_note || null,
              spec.due_date || null,
              spec.el_sent || null,
              spec.el_signed || null,
              spec.el_sent || null,
              spec.retainer_paid || null,
              spec.request_sent || null,
              spec.draft_issued || null,
              spec.final_issued || null,
              spec.rolled_from || null,
              created
            )).lastInsertRowid;
            const answers = spec.answers || {};
            for (const q of R.QUESTIONS) await db.run("INSERT INTO answer (engagement_id, key, value) VALUES (?,?,?)", engId, q.key, answers[q.key] ? 1 : 0);
            const itemStatus = spec.itemStatus || (() => spec.request_sent ? "Sent" : "Draft");
            for (const k of R.requestItemKeys(client.jobType, answers)) {
              const st = itemStatus(k);
              await db.run(
                "INSERT INTO request_item (engagement_id, key, text, status, note, file_name, updated_at) VALUES (?,?,?,?,?,?,?)",
                engId,
                k,
                R.ITEMS[k].text,
                st,
                st === "Returned" ? spec.returnNote || null : null,
                st === "Accepted" ? `${R.ITEMS[k].text.split(" (")[0].split(":")[0]}.pdf` : null,
                spec.request_sent && st !== "Draft" ? T.stamp(spec.request_sent, 11) : null
              );
            }
            const target = R.STAGES.indexOf(spec.stage);
            await history(engId, null, "Onboarding", spec.rolled_from ? "rollover" : "forward", ID.jenna, created);
            if (target > 0) {
              const start2 = spec.el_signed || spec.el_sent || ago(40);
              const span = Math.max(T.daysBetween(start2, spec.stage_since.slice(0, 10)), target);
              for (let s = 1; s <= target; s++) {
                const at = s === target ? spec.stage_since : T.stamp(T.addDays(start2, Math.round(span * s / (target + 0.5))), 9 + s);
                const from = R.STAGES[s - 1];
                const gate = from === "Onboarding";
                await history(
                  engId,
                  from,
                  R.STAGES[s],
                  gate ? "gate" : "forward",
                  gate ? null : R.ownerFor(from, { partner_id: partner, auditor_id: client.auditor, reviewer_id: ID.priya, tax_id: ID.tom }, ID.jenna),
                  at
                );
              }
            }
            if (spec.el_sent) {
              const retainer = Math.round(fee * 0.5 * 100) / 100;
              await db.run(
                "INSERT INTO invoice (engagement_id, number, template, amount, issued_at, paid_at, batch_id) VALUES (?,?,?,?,?,?,?)",
                engId,
                invoiceNo(fy),
                "Retainer (50%)",
                retainer,
                spec.el_sent,
                spec.retainer_paid || null,
                spec.exported ? 1 : null
              );
              if (spec.final_issued) {
                await db.run(
                  "INSERT INTO invoice (engagement_id, number, template, amount, issued_at, paid_at, batch_id) VALUES (?,?,?,?,?,?,?)",
                  engId,
                  invoiceNo(fy),
                  "Final balance",
                  fee - retainer,
                  spec.final_issued,
                  spec.final_paid || null,
                  1
                );
              }
            }
            return engId;
          };
          await db.run(
            "INSERT INTO export_batch (id, created_at, by_id, invoice_count, csv) VALUES (1, ?, ?, 0, ?)",
            T.stamp(ago(30), 16),
            ID.jenna,
            "History imported with the demo data"
          );
          const byName = Object.fromEntries(clients.map((c) => [c.name.split(" ")[0], c]));
          const late = { Banyan: "Tax", Kingfisher: "Draft", Palmetto: "Reviewer" };
          const prevIds = {};
          for (const c of clients) {
            let spec;
            if (c.fye === "12-31") {
              const elSent = `${PREV}-12-${String(between(3, 12)).padStart(2, "0")}`;
              const signed = T.addDays(elSent, between(3, 15));
              const paid = T.addDays(elSent, between(10, 35));
              const lateStage = late[c.name.split(" ")[0]];
              if (lateStage) {
                spec = {
                  stage: lateStage,
                  stage_since: T.stamp(ago(between(5, 20)), 14),
                  el_sent: elSent,
                  el_signed: signed,
                  retainer_paid: paid,
                  request_sent: elSent,
                  itemStatus: () => "Accepted",
                  exported: true,
                  due_date: `${CUR}-12-31`
                };
              } else {
                const draft = `${CUR}-0${between(3, 5)}-${String(between(2, 26)).padStart(2, "0")}`;
                const fin = T.addDays(draft, between(5, 12));
                spec = {
                  stage: "Closed",
                  stage_since: T.stamp(fin, 15),
                  el_sent: elSent,
                  el_signed: signed,
                  retainer_paid: paid,
                  request_sent: elSent,
                  draft_issued: draft,
                  final_issued: fin,
                  final_paid: rand() < 0.85 ? T.addDays(fin, between(5, 40)) : null,
                  itemStatus: () => "Accepted",
                  exported: true
                };
              }
            } else {
              const fyeDate = `${PREV}-${c.fye}`;
              const elSent = T.addDays(fyeDate, -between(20, 40));
              const fin = T.addDays(fyeDate, between(100, 130));
              spec = {
                stage: "Closed",
                stage_since: T.stamp(fin, 15),
                el_sent: elSent,
                el_signed: T.addDays(elSent, 5),
                retainer_paid: T.addDays(elSent, 18),
                request_sent: T.addDays(fyeDate, 5),
                draft_issued: T.addDays(fin, -8),
                final_issued: fin,
                final_paid: T.addDays(fin, 20),
                itemStatus: () => "Accepted",
                exported: true
              };
            }
            prevIds[c.id] = await addEngagement(c, PREV, { fee: c.fee, ...spec });
          }
          const raise = (fee) => Math.round(fee * 1.04 / 50) * 50;
          const rolled = (c, extra) => addEngagement(c, CUR, { fee: raise(c.fee), rolled_from: prevIds[c.id], created: T.stamp(ago(between(20, 60)), 9), ...extra });
          for (const n of ["Mariner's", "Pelican", "Heron", "Royal", "Osprey", "Cypress", "Moonlight", "Palmetto", "Sandpiper"]) {
            await rolled(byName[n], {
              stage: "Onboarding",
              stage_since: T.stamp(ago(between(20, 60)), 9),
              answers: { employees: n === "Heron", litigation: n === "Pelican", special_assessment: n === "Osprey", loan: n === "Heron" },
              quote_note: n === "Heron" ? "Quoted 4% increase; board asked for a 3-year fee lock. Hold at 4% unless they sign 3 years." : null
            });
          }
          const banyanSent = ago(10);
          const banyanId = await rolled(byName.Banyan, { stage: "Onboarding", stage_since: T.stamp(ago(30), 9), el_sent: banyanSent, request_sent: banyanSent, answers: { special_assessment: true } });
          const starSent = ago(16);
          const starId = await rolled(byName.Starfish, { stage: "Onboarding", stage_since: T.stamp(ago(35), 9), el_sent: starSent, el_signed: ago(9), request_sent: starSent });
          const kingSent = ago(21);
          const kingId = await rolled(byName.Kingfisher, { stage: "Admin", stage_since: T.stamp(ago(2), 8, 15), el_sent: kingSent, el_signed: ago(12), retainer_paid: ago(2), request_sent: kingSent });
          const egretReq = ago(30);
          const egretAccepted = /* @__PURE__ */ new Set(["fin_package", "general_ledger", "ap_aging", "prepaids", "insurance", "minutes", "budget", "contracts", "board_list"]);
          const egretId = await addEngagement(byName.Egret, CUR, {
            fee: raise(byName.Egret.fee),
            stage: "Auditor",
            stage_since: T.stamp(T.addDays(egretReq, -2), 10),
            el_sent: `${CUR}-05-12`,
            el_signed: `${CUR}-05-19`,
            retainer_paid: `${CUR}-06-02`,
            request_sent: egretReq,
            due_date: `${CUR}-10-28`,
            answers: { employees: true, loan: true },
            exported: true,
            itemStatus: (k) => egretAccepted.has(k) ? "Accepted" : k === "ar_aging" ? "Returned" : "Sent",
            returnNote: `The aging you sent is as of May 31. We need it as of June 30, ${CUR}.`
          });
          const hibId = await addEngagement(byName.Hibiscus, CUR, {
            fee: raise(byName.Hibiscus.fee),
            stage: "Auditor",
            stage_since: T.stamp(ago(3), 9, 30),
            el_sent: `${CUR}-08-04`,
            el_signed: `${CUR}-08-08`,
            retainer_paid: `${CUR}-08-21`,
            answers: { special_assessment: true },
            exported: true
          });
          const driftId = await addEngagement(byName.Driftwood, CUR, {
            fee: raise(byName.Driftwood.fee),
            stage: "Reviewer",
            stage_since: T.stamp(ago(4), 13),
            el_sent: `${CUR}-05-06`,
            el_signed: `${CUR}-05-11`,
            retainer_paid: `${CUR}-05-29`,
            request_sent: `${CUR}-07-06`,
            due_date: `${CUR}-10-28`,
            answers: { loan: true },
            itemStatus: () => "Accepted",
            exported: true
          });
          const mangroveReq = ago(5);
          const mangroveId = await addEngagement(byName.Mangrove, CUR, {
            fee: raise(byName.Mangrove.fee),
            stage: "Auditor",
            stage_since: T.stamp(T.addDays(mangroveReq, -1), 10),
            el_sent: `${CUR}-08-11`,
            el_signed: `${CUR}-08-14`,
            retainer_paid: `${CUR}-09-02`,
            request_sent: mangroveReq,
            answers: { litigation: true },
            exported: true
          });
          const turtleId = await addEngagement(byName.Sea, CUR, {
            fee: raise(byName.Sea.fee),
            stage: "Tax",
            stage_since: T.stamp(ago(6), 11),
            el_sent: `${CUR}-05-15`,
            el_signed: `${CUR}-05-20`,
            retainer_paid: `${CUR}-06-05`,
            request_sent: `${CUR}-07-03`,
            itemStatus: () => "Accepted",
            exported: true
          });
          const bougReq = ago(12);
          const bougAccepted = /* @__PURE__ */ new Set(["fin_package", "general_ledger", "budget", "minutes"]);
          const bougId = await addEngagement(byName.Bougainvillea, CUR, {
            fee: raise(byName.Bougainvillea.fee),
            stage: "Auditor",
            stage_since: T.stamp(T.addDays(bougReq, -1), 10),
            el_sent: `${CUR}-08-18`,
            el_signed: `${CUR}-08-22`,
            retainer_paid: `${CUR}-09-04`,
            request_sent: bougReq,
            exported: true,
            itemStatus: (k) => bougAccepted.has(k) ? "Accepted" : "Sent"
          });
          const driftBack = T.stamp(ago(9), 15, 20);
          await db.run("UPDATE stage_history SET at = ? WHERE engagement_id = ? AND to_stage = 'Reviewer'", T.stamp(ago(12), 16), driftId);
          await history(driftId, "Reviewer", "Auditor", "back", ID.priya, driftBack, "Reserve fund schedule does not tie to the balance sheet. Please fix the tie-out and the related note.");
          await history(driftId, "Auditor", "Reviewer", "forward", ID.marcus, T.stamp(ago(4), 13));
          const sendRequest = async (engId, at) => {
            const { e, c } = await engagementAndClient(engId);
            const cs = await contactsOf(c.id);
            const to = cs.filter((x) => x.receives_requests);
            const cc = cs.filter((x) => x.cc);
            const items = await db.all("SELECT * FROM request_item WHERE engagement_id = ? ORDER BY id", engId);
            const m = R.requestListEmail({ eng: e, client: c, items, to, sender: staffById[e.auditor_id] });
            await addEmail({
              engagement_id: engId,
              kind: "request",
              direction: "out",
              from: staffById[e.auditor_id].email,
              to: to.map((x) => x.email).join(", "),
              cc: cc.map((x) => x.email).join(", "),
              subject: m.subject,
              body: m.body,
              at
            });
          };
          await sendRequest(egretId, T.stamp(egretReq, 9, 5));
          await sendRequest(mangroveId, T.stamp(mangroveReq, 8, 40));
          await sendRequest(bougId, T.stamp(bougReq, 10, 15));
          {
            const { e, c } = await engagementAndClient(egretId);
            const cs = await contactsOf(c.id);
            const to = cs.filter((x) => x.receives_requests);
            const items = await db.all("SELECT * FROM request_item WHERE engagement_id = ? ORDER BY id", egretId);
            const open = items.filter((i) => i.status === "Sent");
            const returned = items.filter((i) => i.status === "Returned");
            const f = R.followUpEmail({ eng: e, client: c, open, returned, received: items.filter((i) => i.status === "Accepted").length, total: items.length, to, sender: staffById[e.auditor_id] });
            await addEmail({
              engagement_id: egretId,
              kind: "followup",
              direction: "out",
              from: staffById[e.auditor_id].email,
              to: to.map((x) => x.email).join(", "),
              cc: cs.filter((x) => x.cc).map((x) => x.email).join(", "),
              subject: f.subject,
              body: f.body,
              at: T.stamp(ago(14), 8, 30)
            });
            const treasurer = cs.find((x) => x.role === "Treasurer");
            const ctx = { clientName: c.name, fye: c.fye, fiscalYear: e.fiscal_year };
            const files = [S.sampleDocument("bank_statements", { ...ctx, monthOffset: -1 }), S.sampleDocument("ar_aging", ctx), S.sampleDocument("payroll", ctx)];
            const replyId = await addEmail({
              engagement_id: egretId,
              kind: "reply",
              direction: "in",
              from: treasurer.email,
              to: staffById[e.auditor_id].email,
              cc: cs.filter((x) => x.role === "Community Association Manager").map((x) => x.email).join(", "),
              subject: `RE: ${f.subject}`,
              status: "Received",
              attachments: files.map((x) => x.name),
              at: T.stamp(ago(1), 16, 42),
              body: `Hi ${staffById[e.auditor_id].name.split(" ")[0]},

Attached are the operating account statement, the corrected AR aging and the second-quarter 941 summary. The reserve study is with the engineer and should be done next week.

Thanks,
${treasurer.name}
Treasurer, ${c.name}`
            });
            for (const [i, file] of files.entries()) {
              const doc = await storeDocument(db, STORE, {
                engagementId: egretId,
                name: file.name,
                buffer: file.buffer,
                contactId: treasurer.id,
                channel: "email",
                uploadedAt: T.stamp(ago(1), 16, 42 + i),
                clientModified: T.stamp(ago(2), 11, 5 + i * 7)
              });
              const m = R.matchAttachment(file.name, items, c.fye, e.fiscal_year);
              await db.run(
                "INSERT INTO suggestion (engagement_id, email_id, document_id, file_name, item_id, confidence, reason, flag) VALUES (?,?,?,?,?,?,?,?)",
                egretId,
                replyId,
                doc.id,
                file.name,
                m.item ? m.item.id : null,
                m.confidence,
                m.reason,
                m.flag
              );
              if (m.item) await db.run("UPDATE document SET item_id = ? WHERE id = ?", m.item.id, doc.id);
            }
          }
          for (const [engId, at] of [[banyanId, banyanSent], [starId, starSent], [kingId, kingSent]]) {
            const { e, c } = await engagementAndClient(engId);
            const cs = await contactsOf(c.id);
            const to = cs.filter((x) => x.receives_requests);
            const items = await db.all("SELECT * FROM request_item WHERE engagement_id = ? ORDER BY id", engId);
            const invoice = await db.get("SELECT * FROM invoice WHERE engagement_id = ? ORDER BY id LIMIT 1", engId);
            const m = R.onboardingEmail({ eng: e, client: c, items, to, sender: staffById[ID.jenna], invoice });
            await addEmail({
              engagement_id: engId,
              kind: "onboarding",
              direction: "out",
              from: staffById[ID.jenna].email,
              to: to.map((x) => x.email).join(", "),
              cc: cs.filter((x) => x.cc).map((x) => x.email).join(", "),
              subject: m.subject,
              body: m.body,
              attachments: m.attachments,
              at: T.stamp(at, 9)
            });
          }
          const handoff = async (engId, from, to, byName_, receiverId, at, reason) => {
            const { e, c } = await engagementAndClient(engId);
            const m = R.handoffEmail({ eng: e, client: c, from, to, by: byName_, receiver: staffById[receiverId], reason, appUrl: APP_URL });
            await addEmail({ engagement_id: engId, kind: "handoff", direction: "internal", from: "practice-hub@leonardo-demo.test", to: staffById[receiverId].email, subject: m.subject, body: m.body, at });
          };
          await handoff(kingId, "Onboarding", "Admin", "the ready-to-start check (letter signed and retainer paid)", ID.jenna, T.stamp(ago(2), 8, 15));
          await handoff(driftId, "Reviewer", "Auditor", "Priya Shah", ID.marcus, driftBack, "Reserve fund schedule does not tie to the balance sheet. Please fix the tie-out and the related note.");
          await handoff(driftId, "Auditor", "Reviewer", "Marcus Lee", ID.priya, T.stamp(ago(4), 13));
          await handoff(hibId, "Admin", "Auditor", "Jenna Cole", ID.sofia, T.stamp(ago(3), 9, 30));
          await handoff(turtleId, "Reviewer", "Tax", "Priya Shah", ID.tom, T.stamp(ago(6), 11));
          const contactByRole = async (engId, role) => {
            const e = await db.get("SELECT client_id FROM engagement WHERE id = ?", engId);
            return db.get("SELECT * FROM contact WHERE client_id = ? AND role = ? ORDER BY id", e.client_id, role);
          };
          const authorize = async (engId, role, at) => {
            const ct = await contactByRole(engId, role);
            const { c } = await engagementAndClient(engId);
            const text = A.letterText(c.name);
            await db.run(`INSERT INTO portal_authorization (client_id, contact_id, letter_version, letter_text, letter_sha256, signer_name, signer_title, signed_at, ip, user_agent)
        VALUES (?,?,?,?,?,?,?,?,?,?)`, c.id, ct.id, A.LETTER_VERSION, text, A.fingerprint(text), ct.name, ct.role, at, "203.0.113.24", "Demo browser (synthetic)");
            return ct;
          };
          const fileAccepted = async (engId, channel, uploader, reviewerId, firstDay) => {
            const { e, c } = await engagementAndClient(engId);
            const done = await db.all("SELECT * FROM request_item WHERE engagement_id = ? AND status = 'Accepted' ORDER BY id", engId);
            for (const [i, it] of done.entries()) {
              const file = S.sampleDocument(it.key, { clientName: c.name, fye: c.fye, fiscalYear: e.fiscal_year });
              const reviewed = T.stamp(T.addDays(firstDay, Math.floor(i / 3) + 1), 14, 5 + i);
              const doc = await storeDocument(db, STORE, {
                engagementId: engId,
                itemId: it.id,
                name: file.name,
                buffer: file.buffer,
                contactId: uploader.id,
                channel,
                ip: channel === "portal" ? "203.0.113.24" : null,
                status: "Accepted",
                uploadedAt: T.stamp(T.addDays(firstDay, Math.floor(i / 3)), 9 + i % 3 * 2, 10 + i),
                clientModified: T.stamp(T.addDays(firstDay, -3 - i % 4), 17, 20),
                reviewedBy: reviewerId,
                reviewedAt: reviewed
              });
              await db.run("UPDATE request_item SET file_name = ?, updated_at = ? WHERE id = ?", doc.original_name, reviewed, it.id);
            }
          };
          const comment = async (engId, itemKey, who, kind, body, at, eta) => {
            const itemId = itemKey ? (await db.get("SELECT id FROM request_item WHERE engagement_id = ? AND key = ?", engId, itemKey)).id : null;
            await db.run(
              "INSERT INTO comment (engagement_id, item_id, author_contact, author_staff, kind, eta_date, body, created_at) VALUES (?,?,?,?,?,?,?,?)",
              engId,
              itemId,
              who.contact || null,
              who.staff || null,
              kind,
              eta || null,
              body,
              at
            );
          };
          const share = (engId, staffId, file, at) => storeDocument(db, STORE, { engagementId: engId, name: file.name, buffer: file.buffer, staffId, channel: "staff", direction: "to_client", uploadedAt: at });
          const formPdf = (title, lines, clientName) => require_pdf().makePdf({
            title,
            subtitle: clientName,
            banner: S.BANNER,
            footer: "Leonardo & Company, CPAs - synthetic demo document",
            blocks: lines.map((t) => ({ style: "p", text: t }))
          });
          const egretTreasurer = await authorize(egretId, "Treasurer", T.stamp(T.addDays(egretReq, 1), 19, 12));
          const egretCam = await authorize(egretId, "Community Association Manager", T.stamp(T.addDays(egretReq, 2), 8, 47));
          await fileAccepted(egretId, "portal", egretTreasurer, ID.dana, T.addDays(egretReq, 3));
          const dana = { staff: ID.dana };
          await comment(egretId, "ar_aging", dana, "comment", `Thanks for the aging. It's as of May 31, but we need it as of June 30, ${CUR}. Could you send the June 30 report?`, T.stamp(ago(16), 10, 20));
          await comment(egretId, "ar_aging", { contact: egretTreasurer.id }, "comment", "Sorry about that, our manager pulled the wrong month. I emailed the June 30 aging today.", T.stamp(ago(1), 16, 50));
          await comment(egretId, "reserve_study", { contact: egretTreasurer.id }, "eta", "The engineer is finishing the reserve study update. We will upload it as soon as we have it.", T.stamp(ago(2), 9, 15), T.addDays(TODAY, 7));
          await comment(egretId, "investments", { contact: egretCam.id }, "answer", "The association has no CDs or brokerage accounts. All reserve funds are in the money market account shown on the bank statements.", T.stamp(ago(3), 13, 2));
          await comment(egretId, "investments", dana, "internal", "Check the bank statements: if the money market is the only reserve account, accept this answer.", T.stamp(ago(2), 11, 40));
          await comment(egretId, null, { contact: egretTreasurer.id }, "comment", "Will you need the bank confirmation signed by two board members, or is one signature enough?", T.stamp(ago(6), 18, 5));
          await comment(egretId, null, dana, "comment", "Two signatures, please: the board president and you as treasurer. I will share the form here in the portal.", T.stamp(ago(5), 9, 30));
          await comment(egretId, null, dana, "internal", "The president has been slow to respond. Copy the manager when the confirmation form goes out.", T.stamp(ago(5), 9, 34));
          await comment(egretId, null, dana, "comment", "The bank confirmation form is under Documents. Please sign it and upload it back here.", T.stamp(ago(1), 10, 2));
          const egretClient = (await engagementAndClient(egretId)).c.name;
          await share(egretId, ID.jenna, { name: `Engagement Letter FY${CUR} (countersigned).pdf`, buffer: formPdf("Engagement Letter (countersigned)", ["Countersigned copy of the engagement letter for your records.", "This is a synthetic placeholder for the demo."], egretClient) }, T.stamp(`${CUR}-05-20`, 10, 4));
          await share(egretId, ID.dana, { name: "Bank Confirmation Authorization Form.pdf", buffer: formPdf("Bank Confirmation Authorization", ["Please sign below to authorize your bank to confirm balances directly to Leonardo & Company.", "Signature (board president): ____________________", "Signature (treasurer): ____________________", "This is a synthetic placeholder for the demo."], egretClient) }, T.stamp(ago(1), 10, 0));
          const bougTreasurer = await authorize(bougId, "Treasurer", T.stamp(T.addDays(bougReq, 0), 20, 31));
          await fileAccepted(bougId, "portal", bougTreasurer, ID.dana, T.addDays(bougReq, 1));
          await comment(bougId, null, { contact: bougTreasurer.id }, "comment", "We changed management companies in March. Records from before March are with the old company and we have asked them to send everything.", T.stamp(ago(10), 21, 4));
          await comment(bougId, null, dana, "comment", "Thank you for the heads-up. Please upload what you have now and the rest when it arrives.", T.stamp(ago(9), 8, 55));
          const driftTreasurer = await authorize(driftId, "Treasurer", T.stamp(`${CUR}-07-07`, 12, 0));
          await fileAccepted(driftId, "email", driftTreasurer, ID.marcus, `${CUR}-07-14`);
          {
            const { e, c } = await engagementAndClient(mangroveId);
            for (const ct of (await contactsOf(c.id)).filter((x) => x.receives_requests)) {
              await addEmail({
                engagement_id: mangroveId,
                kind: "portal_invite",
                direction: "out",
                from: staffById[e.auditor_id].email,
                to: ct.email,
                subject: `Your secure client portal for ${c.name}`,
                at: T.stamp(mangroveReq, 8, 45),
                body: `Hello ${ct.name.split(" ")[0]},

Leonardo & Company uses a secure client portal to collect documents and answer questions for your fiscal ${e.fiscal_year} audit.

The first time you sign in, you'll be asked to review and sign a short authorization letter. After that you can upload files, answer questions and message us.

Sign in: ${APP_URL}/#/portal (in the real system this is a one-time sign-in link)

${staffById[e.auditor_id].name}
Leonardo & Company, CPAs`
              });
            }
          }
          const task = (title, to, by, engId, due, done, created) => db.run("INSERT INTO task (engagement_id, title, assigned_to, assigned_by, due, done_at, created_at) VALUES (?,?,?,?,?,?,?)", engId, title, to, by, due, done, created);
          await task("Call the Egret Landing treasurer about timing of the reserve study", ID.dana, ID.alex, egretId, T.addDays(TODAY, 2), null, T.stamp(ago(1), 17));
          await task("Corrections from review: Reserve fund schedule does not tie to the balance sheet.", ID.marcus, ID.priya, driftId, null, T.stamp(ago(4), 12, 50), driftBack);
          await task("Approve the fee increase quote for Heron Bay before the December send", ID.alex, ID.jenna, null, T.addDays(TODAY, 7), null, T.stamp(ago(3), 10));
          await task("Update the lockbox address for all Palm Harbor clients", ID.jenna, ID.mily, null, null, T.stamp(ago(5), 15), T.stamp(ago(8), 9));
          await task("Confirm whether Banyan Lakes wants the special assessment schedule split by phase", ID.sofia, ID.mily, banyanId, null, null, T.stamp(ago(2), 11));
          await task("Send Driftwood Key draft to the board once review clears", ID.marcus, ID.alex, driftId, T.addDays(TODAY, 5), null, T.stamp(ago(4), 14));
          await task("Pull last year's variance explanations for Kingfisher Lakes", ID.dana, ID.priya, kingId, null, null, T.stamp(ago(1), 9));
          await db.run(
            "INSERT INTO audit_log (staff_id, action, entity, entity_id, detail, at) VALUES (NULL, ?, ?, NULL, ?, ?)",
            "Demo data loaded",
            "system",
            "Synthetic clients, contacts and history created for the proof of concept. No real client data.",
            T.now()
          );
          await db.resetSequences(["staff", "mgmt_company", "client", "export_batch"]);
        });
      }
      module.exports = { seed, APP_URL };
    }
  });

  // lib/storage.js
  var require_storage = __commonJS({
    "lib/storage.js"(exports, module) {
      "use strict";
      init_globals();
      var fs2 = require_node_fs();
      var path2 = require_node_path();
      function folderStorage(dir) {
        const where = (key) => {
          const p = path2.normalize(path2.join(dir, key));
          if (!p.startsWith(path2.normalize(dir) + path2.sep)) throw new Error("Invalid storage key.");
          return p;
        };
        return {
          kind: "folder",
          async save(key, buffer) {
            const p = where(key);
            fs2.mkdirSync(path2.dirname(p), { recursive: true });
            fs2.writeFileSync(p, buffer);
          },
          async read(key) {
            const p = where(key);
            return fs2.existsSync(p) ? fs2.readFileSync(p) : null;
          },
          async clear() {
            fs2.rmSync(dir, { recursive: true, force: true });
            fs2.mkdirSync(dir, { recursive: true });
          }
        };
      }
      function blobStorage(prefix = "docs/") {
        const blob = __require("@vercel/blob");
        return {
          kind: "blob",
          async save(key, buffer, contentType) {
            await blob.put(prefix + key, buffer, { access: "private", contentType, addRandomSuffix: false, allowOverwrite: true });
          },
          async read(key) {
            const r = await blob.get(prefix + key, { access: "private" });
            if (!r || r.statusCode !== 200) return null;
            return import_buffer.Buffer.from(await new Response(r.stream).arrayBuffer());
          },
          async clear() {
            let cursor;
            do {
              const page = await blob.list({ prefix, cursor, limit: 1e3 });
              if (page.blobs.length) await blob.del(page.blobs.map((b) => b.url));
              cursor = page.hasMore ? page.cursor : void 0;
            } while (cursor);
          }
        };
      }
      module.exports = { folderStorage, blobStorage };
    }
  });

  // server.js
  var require_server = __commonJS({
    "server.js"(exports, module) {
      "use strict";
      init_globals();
      var http2 = require_node_http();
      var fs2 = require_node_fs();
      var os2 = require_node_os();
      var path2 = require_node_path();
      var crypto = (init_crypto(), __toCommonJS(crypto_exports));
      var { openDb, resetTables } = require_db();
      var { seed, APP_URL } = require_seed();
      var R = require_rules();
      var T = require_time();
      var A = require_authorization();
      var S = require_samples();
      var { makePdf } = require_pdf();
      var { folderStorage, blobStorage } = require_storage();
      var { TYPES, MAX_BYTES, MAX_MB, storeDocument, documentKey, contentDisposition } = require_files();
      var PUBLIC_DIR = path2.join("/", "web");
      var HUB_ADDR = "practice-hub@leonardo-demo.test";
      var MIME = {
        ".html": "text/html; charset=utf-8",
        ".js": "text/javascript; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".png": "image/png",
        ".svg": "image/svg+xml",
        ".ttf": "font/ttf",
        ".ico": "image/x-icon",
        ".json": "application/json"
      };
      var FEE_ROLES = /* @__PURE__ */ new Set(["partner", "admin"]);
      var SESSION_HOURS = 12;
      var GATE_DAYS = 7;
      var HttpError = class extends Error {
        constructor(status, message, extra) {
          super(message);
          this.status = status;
          this.extra = extra;
        }
      };
      var isDate = (s) => typeof s === "string" && /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s));
      var isEmail = (s) => typeof s === "string" && s.length <= 200 && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(s);
      var text = (s, max) => typeof s === "string" ? s.trim().slice(0, max) : "";
      var money = (n) => Math.round(Number(n) * 100) / 100;
      var sha = (s) => crypto.createHash("sha256").update(String(s)).digest();
      async function createApp2(opts = {}) {
        const db = await openDb({ databaseUrl: opts.databaseUrl, pglite: opts.pglite, file: opts.dbFile });
        const ownsUploadDir = !opts.blob && !opts.storage && !opts.uploadDir;
        const uploadDir = opts.blob || opts.storage ? null : opts.uploadDir || fs2.mkdtempSync(path2.join(os2.tmpdir(), "practice-hub-"));
        const storage = opts.storage || (opts.blob ? blobStorage() : folderStorage(uploadDir));
        const SITE_PASSWORD = opts.sitePassword || "";
        await db.tx(async () => {
          await db.lock(4242);
          if (!(await db.get("SELECT COUNT(*) AS n FROM staff")).n) {
            await storage.clear();
            await seed(db, { today: opts.today, storage });
          }
        });
        let staff = {};
        let ADMIN_ID = null;
        async function loadStaff() {
          staff = Object.fromEntries((await db.all("SELECT * FROM staff")).map((s) => [s.id, s]));
          ADMIN_ID = (await db.get("SELECT id FROM staff WHERE role = 'admin' ORDER BY id")).id;
        }
        await loadStaff();
        let secret = await db.get("SELECT value FROM app_setting WHERE key = 'session_secret'");
        if (!secret) {
          await db.run("INSERT INTO app_setting (key, value) VALUES ('session_secret', ?) ON CONFLICT (key) DO NOTHING", crypto.randomBytes(32).toString("hex"));
          secret = await db.get("SELECT value FROM app_setting WHERE key = 'session_secret'");
        }
        const KEY = import_buffer.Buffer.from(secret.value, "hex");
        const signToken = (payload) => {
          const body = import_buffer.Buffer.from(JSON.stringify(payload)).toString("base64url");
          return `${body}.${crypto.createHmac("sha256", KEY).update(body).digest("base64url")}`;
        };
        const readToken = (token) => {
          if (!token || !/^[\w-]+\.[\w-]+$/.test(token)) return null;
          const [body, mac] = token.split(".");
          const expected = crypto.createHmac("sha256", KEY).update(body).digest();
          const given = import_buffer.Buffer.from(mac, "base64url");
          if (given.length !== expected.length || !crypto.timingSafeEqual(given, expected)) return null;
          try {
            const data = JSON.parse(import_buffer.Buffer.from(body, "base64url").toString("utf8"));
            return data.exp > Date.now() ? data : null;
          } catch {
            return null;
          }
        };
        const getCookie = (req, name) => {
          const m = new RegExp(`(?:^|;\\s*)${name}=([^;]+)`).exec(req.headers.cookie || "");
          return m ? m[1] : null;
        };
        const secureFlag = (req) => req.headers["x-forwarded-proto"] === "https" || process.env.VERCEL ? "; Secure" : "";
        const audit = (user, action, entity, entityId, detail) => db.run(
          "INSERT INTO audit_log (staff_id, action, entity, entity_id, detail, at) VALUES (?,?,?,?,?,?)",
          user && user.kind !== "client" ? user.id : null,
          action,
          entity,
          entityId ?? null,
          detail || null,
          T.now()
        );
        const insertEmail = async (m) => (await db.run(
          `INSERT INTO email (engagement_id, kind, direction, from_addr, to_addrs, cc_addrs, subject, body, attachments, status, scheduled_for, at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`,
          m.engagement_id ?? null,
          m.kind,
          m.direction,
          m.from,
          m.to,
          m.cc || "",
          m.subject,
          m.body,
          (m.attachments || []).join("|"),
          m.status || "Sent",
          m.scheduled_for || null,
          m.at || T.now()
        )).lastInsertRowid;
        const insertTask = async (t) => (await db.run(
          "INSERT INTO task (engagement_id, title, assigned_to, assigned_by, due, done_at, created_at) VALUES (?,?,?,?,?,?,?)",
          t.engagement_id ?? null,
          t.title,
          t.assigned_to,
          t.assigned_by ?? null,
          t.due || null,
          null,
          T.now()
        )).lastInsertRowid;
        function scope(user) {
          switch (user.role) {
            case "partner":
            case "admin":
              return ["1 = 1", []];
            case "auditor":
              return ["e.auditor_id = ?", [user.id]];
            case "reviewer":
              return ["(e.reviewer_id = ? OR e.auditor_id = ?)", [user.id, user.id]];
            case "tax":
              return ["e.tax_id = ?", [user.id]];
            default:
              return ["1 = 0", []];
          }
        }
        async function loadEng(id, user) {
          const [w, p] = scope(user);
          const e = await db.get(`SELECT e.* FROM engagement e WHERE e.id = ? AND ${w}`, Number(id), ...p);
          if (!e) throw new HttpError(404, "Job not found.");
          return e;
        }
        const ownerOf = (e, stage = e.stage) => R.ownerFor(stage, e, ADMIN_ID);
        const canMove = (user, e) => FEE_ROLES.has(user.role) || ownerOf(e) === user.id;
        const canManageRequests = (user, e) => FEE_ROLES.has(user.role) || e.auditor_id === user.id;
        function present(e, user) {
          const out = { ...e };
          out.owner_id = ownerOf(e);
          out.owner_name = out.owner_id ? staff[out.owner_id].name : null;
          out.days_in_stage = Math.max(0, T.daysBetween(e.stage_since, T.today()));
          out.gate_missing = e.stage === "Onboarding" ? R.gateMissing(e) : [];
          if (!FEE_ROLES.has(user.role)) {
            delete out.fee;
            delete out.tax_fee;
            delete out.retainer_pct;
            delete out.billed;
            delete out.paid;
            out.fees_hidden = true;
          }
          if (user.role !== "partner") delete out.quote_note;
          return out;
        }
        const LIST_SQL = `
    SELECT e.*, c.name AS client_name, c.location, c.fye, c.entity_type, c.mgmt_company_id, m.name AS mgmt_name,
      a.name AS auditor_name, r.name AS reviewer_name, t.name AS tax_name,
      (SELECT COUNT(*) FROM request_item i WHERE i.engagement_id = e.id AND i.status IN ('Sent','Returned')) AS open_items,
      (SELECT COUNT(*) FROM request_item i WHERE i.engagement_id = e.id AND i.status <> 'N/A') AS total_items,
      (SELECT COUNT(*) FROM request_item i WHERE i.engagement_id = e.id AND i.status = 'Accepted') AS accepted_items,
      (SELECT COUNT(*) FROM suggestion s WHERE s.engagement_id = e.id AND s.status = 'Pending') AS pending_review,
      (SELECT COALESCE(SUM(amount), 0) FROM invoice v WHERE v.engagement_id = e.id) AS billed,
      (SELECT COALESCE(SUM(amount), 0) FROM invoice v WHERE v.engagement_id = e.id AND v.paid_at IS NOT NULL) AS paid,
      EXISTS (SELECT 1 FROM engagement n WHERE n.client_id = e.client_id AND n.fiscal_year = e.fiscal_year + 1) AS has_next
    FROM engagement e
    JOIN client c ON c.id = e.client_id
    LEFT JOIN mgmt_company m ON m.id = c.mgmt_company_id
    LEFT JOIN staff a ON a.id = e.auditor_id
    LEFT JOIN staff r ON r.id = e.reviewer_id
    LEFT JOIN staff t ON t.id = e.tax_id`;
        async function listEngagements(user, where = "", params = []) {
          const [w, p] = scope(user);
          return (await db.all(`${LIST_SQL} WHERE ${w} ${where} ORDER BY c.name, e.fiscal_year`, ...p, ...params)).map((e) => present(e, user));
        }
        async function contextFor(e) {
          const client = await db.get("SELECT * FROM client WHERE id = ?", e.client_id);
          const contacts = await db.all("SELECT * FROM contact WHERE client_id = ? ORDER BY id", e.client_id);
          return { client, contacts, to: contacts.filter((c) => c.receives_requests), cc: contacts.filter((c) => c.cc) };
        }
        const addrs = (list) => list.map((c) => c.email).join(", ");
        async function nextInvoiceNumber(fy) {
          const m = (await db.get("SELECT MAX(CAST(substr(number, 4) AS INTEGER)) AS m FROM invoice")).m || 0;
          return `${String(fy).slice(2)}-${String(m + 1).padStart(4, "0")}`;
        }
        async function createFinalInvoice(e, user) {
          const billed = (await db.get("SELECT COALESCE(SUM(amount), 0) AS s FROM invoice WHERE engagement_id = ?", e.id)).s;
          const balance = money((e.fee || 0) - billed);
          if (balance <= 0) return null;
          const number = await nextInvoiceNumber(e.fiscal_year);
          await db.run("INSERT INTO invoice (engagement_id, number, template, amount, issued_at) VALUES (?,?,?,?,?)", e.id, number, "Final balance", balance, T.today());
          await audit(user, "Created invoice", "engagement", e.id, `${number} Final balance $${balance.toFixed(2)}`);
          return number;
        }
        async function doMove(e, target, direction, reason, user) {
          const from = e.stage;
          const at = T.now();
          await db.run("UPDATE engagement SET stage = ?, stage_since = ? WHERE id = ?", target, at, e.id);
          if (target === "Final" && !e.draft_issued) await db.run("UPDATE engagement SET draft_issued = ? WHERE id = ?", T.today(), e.id);
          if (target === "Closed") {
            if (!e.final_issued) await db.run("UPDATE engagement SET final_issued = ? WHERE id = ?", T.today(), e.id);
            await createFinalInvoice(e, user);
          }
          await db.run(
            "INSERT INTO stage_history (engagement_id, from_stage, to_stage, direction, reason, by_id, at) VALUES (?,?,?,?,?,?,?)",
            e.id,
            from,
            target,
            direction,
            reason || null,
            user ? user.id : null,
            at
          );
          const { client } = await contextFor(e);
          const receiverId = ownerOf(e, target);
          const byLabel = user ? user.name : "the ready-to-start check (letter signed and retainer paid)";
          if (receiverId) {
            const m = R.handoffEmail({ eng: e, client, from, to: target, by: byLabel, receiver: staff[receiverId], reason, appUrl: APP_URL });
            await insertEmail({ engagement_id: e.id, kind: "handoff", direction: "internal", from: HUB_ADDR, to: staff[receiverId].email, subject: m.subject, body: m.body });
            if (direction === "back") {
              await insertTask({ engagement_id: e.id, title: `Corrections from ${user.name.split(" ")[0]}: ${reason}`, assigned_to: receiverId, assigned_by: user.id });
            }
          }
          await audit(
            user,
            direction === "back" ? "Sent job back" : direction === "gate" ? "Ready to start" : "Moved job",
            "engagement",
            e.id,
            `${client.name} FY${e.fiscal_year}: ${from} to ${target}${reason ? ` (${reason})` : ""}`
          );
        }
        async function checkGate(engId) {
          const e = await db.get("SELECT * FROM engagement WHERE id = ?", engId);
          if (e.stage !== "Onboarding" || R.gateMissing(e).length) return false;
          await doMove(e, "Admin", "gate", null, null);
          if (e.auditor_id) {
            const { client } = await contextFor(e);
            await insertEmail({
              engagement_id: e.id,
              kind: "handoff",
              direction: "internal",
              from: HUB_ADDR,
              to: staff[e.auditor_id].email,
              subject: `Ready to start: ${client.name} (fiscal ${e.fiscal_year})`,
              body: `${staff[e.auditor_id].name.split(" ")[0]},

The engagement letter is signed and the retainer is paid for ${client.name}, so the job is ready to start. The admin team has it now and will pass it to you.

Open the job: ${APP_URL}/#/job/${e.id}`
            });
          }
          return true;
        }
        async function deliverOnboarding(engId, date) {
          await db.run("UPDATE engagement SET el_sent = ?, retainer_invoiced = ?, request_sent = COALESCE(request_sent, ?) WHERE id = ?", date, date, date, engId);
          await db.run("UPDATE request_item SET status = 'Sent', updated_at = ? WHERE engagement_id = ? AND status = 'Draft'", T.now(), engId);
        }
        async function runScheduler() {
          const due = await db.all("SELECT * FROM email WHERE status = 'Scheduled' AND scheduled_for <= ?", T.now());
          for (const m of due) {
            await db.tx(async () => {
              await db.run("UPDATE email SET status = 'Sent', at = ? WHERE id = ?", T.now(), m.id);
              if (m.kind === "onboarding" && m.engagement_id) await deliverOnboarding(m.engagement_id, T.today());
              await audit(null, "Scheduled email sent", "email", m.id, m.subject);
            });
          }
          return due.length;
        }
        let lastSchedulerRun = 0;
        async function maybeRunScheduler() {
          if (Date.now() - lastSchedulerRun < 15e3) return;
          lastSchedulerRun = Date.now();
          try {
            await runScheduler();
          } catch (err) {
            console.error("Scheduler error:", err.message);
          }
        }
        async function followUpDraft(e) {
          const ctx = await contextFor(e);
          const items = await db.all("SELECT * FROM request_item WHERE engagement_id = ? ORDER BY id", e.id);
          const open = items.filter((i) => i.status === "Sent" || i.status === "Draft" && e.request_sent);
          const returned = items.filter((i) => i.status === "Returned");
          const live = items.filter((i) => i.status !== "N/A");
          const sender = staff[e.auditor_id];
          const m = R.followUpEmail({
            eng: e,
            client: ctx.client,
            open,
            returned,
            received: live.filter((i) => i.status === "Accepted").length,
            total: live.length,
            to: ctx.to,
            sender
          });
          return { ...m, from: sender.email, to: addrs(ctx.to), cc: addrs(ctx.cc), outstanding: open.length + returned.length };
        }
        async function sendFollowUp(e, user, subject, body) {
          const d = await followUpDraft(e);
          if (!d.outstanding) throw new HttpError(409, "Nothing is outstanding for this job.");
          if (!d.to) throw new HttpError(400, "Mark at least one contact to receive requests first.");
          await insertEmail({
            engagement_id: e.id,
            kind: "followup",
            direction: "out",
            from: d.from,
            to: d.to,
            cc: d.cc,
            subject: text(subject, 300) || d.subject,
            body: text(body, 2e4) || d.body
          });
          await db.run("UPDATE request_item SET status = 'Sent', updated_at = ? WHERE engagement_id = ? AND status = 'Draft'", T.now(), e.id);
          await audit(user, "Sent follow-up", "engagement", e.id, `${d.outstanding} items outstanding`);
        }
        async function rebuildItems(e) {
          const answers = Object.fromEntries((await db.all("SELECT key, value FROM answer WHERE engagement_id = ?", e.id)).map((a) => [a.key, !!a.value]));
          const wanted = R.requestItemKeys(e.job_type, answers);
          const existing = await db.all("SELECT * FROM request_item WHERE engagement_id = ?", e.id);
          const have = new Set(existing.map((i) => i.key));
          for (const k of wanted) {
            if (!have.has(k)) await db.run("INSERT INTO request_item (engagement_id, key, text, status, updated_at) VALUES (?,?,?,?,?)", e.id, k, R.ITEMS[k].text, "Draft", T.now());
          }
          const AUTO_NA = "Not needed after a yes/no answer changed";
          for (const i of existing) {
            if (wanted.includes(i.key)) {
              if (i.status === "N/A" && i.note === AUTO_NA) await db.run("UPDATE request_item SET status = 'Draft', note = NULL, updated_at = ? WHERE id = ?", T.now(), i.id);
              continue;
            }
            const linked = await db.get(`SELECT 1 AS ok FROM document WHERE item_id = ? UNION SELECT 1 FROM suggestion WHERE item_id = ?
        UNION SELECT 1 FROM comment WHERE item_id = ?`, i.id, i.id, i.id);
            if (i.status === "Draft" && !linked) await db.run("DELETE FROM request_item WHERE id = ?", i.id);
            else if (i.status !== "Accepted") await db.run("UPDATE request_item SET status = 'N/A', note = ?, updated_at = ? WHERE id = ?", AUTO_NA, T.now(), i.id);
          }
        }
        const DOC_SQL = `SELECT d.*, ct.name AS contact_name, ct.role AS contact_role, st.name AS staff_name, rv.name AS reviewed_by_name, i.text AS item_text
    FROM document d LEFT JOIN contact ct ON ct.id = d.uploaded_by_contact LEFT JOIN staff st ON st.id = d.uploaded_by_staff
    LEFT JOIN staff rv ON rv.id = d.reviewed_by LEFT JOIN request_item i ON i.id = d.item_id`;
        const COMMENT_SQL = `SELECT cm.*, ct.name AS contact_name, ct.role AS contact_role, st.name AS staff_name, st.title AS staff_title
    FROM comment cm LEFT JOIN contact ct ON ct.id = cm.author_contact LEFT JOIN staff st ON st.id = cm.author_staff`;
        function docView(d, clientView) {
          const { stored_name: _hidden, ...out } = d;
          const type = Object.values(TYPES).find((t) => t.mime === d.mime);
          out.preview = type ? type.preview : null;
          out.type_label = type ? type.label : d.mime;
          out.uploaded_by = d.contact_name ? `${d.contact_name} (${d.contact_role || "client"})` : d.staff_name ? `${d.staff_name} (Leonardo)` : "Unknown";
          if (clientView) delete out.ip;
          return out;
        }
        const docsFor = async (engId, clientView) => (await db.all(`${DOC_SQL} WHERE d.engagement_id = ? ORDER BY d.uploaded_at DESC, d.id DESC`, engId)).map((d) => docView(d, clientView));
        const commentsFor = async (engId, clientView) => (await db.all(`${COMMENT_SQL} WHERE cm.engagement_id = ? ${clientView ? "AND cm.kind <> 'internal'" : ""} ORDER BY cm.created_at, cm.id`, engId)).map((c) => ({ ...c, from_client: !!c.author_contact, author: c.contact_name || c.staff_name, author_role: c.contact_role || (c.staff_name ? "Leonardo & Company" : "") }));
        async function signedAuthorization(contactId) {
          return await db.get("SELECT * FROM portal_authorization WHERE contact_id = ? AND revoked_at IS NULL AND letter_version = ? ORDER BY id DESC LIMIT 1", contactId, A.LETTER_VERSION) || null;
        }
        function clientStatus(item, docs, comments) {
          if (item.status === "Accepted") return "Accepted";
          if (item.status === "N/A") return "Not needed";
          if (docs.some((d) => d.item_id === item.id && d.direction === "from_client" && d.status === "Pending")) return "Under review";
          const since = item.updated_at || "";
          if (comments.some((c) => c.item_id === item.id && c.author_contact && (c.kind === "answer" || c.kind === "not_applicable") && c.created_at >= since)) return "Under review";
          if (item.status === "Returned") return "Needs another look";
          return "Requested";
        }
        async function saveDocument(o) {
          try {
            return await storeDocument(db, storage, o);
          } catch (err) {
            throw new HttpError(err.status || 400, err.message);
          }
        }
        async function receiveClientFile(e, o) {
          const client = await db.get("SELECT * FROM client WHERE id = ?", e.client_id);
          const doc = await saveDocument({
            engagementId: e.id,
            itemId: o.itemId,
            name: o.file.name,
            buffer: o.file.buffer,
            clientModified: o.file.modified,
            contactId: o.contactId,
            staffId: o.staffId,
            channel: o.channel,
            ip: o.ip,
            simulated: o.simulated,
            mimeOverride: o.mimeOverride
          });
          let s;
          if (o.itemId) {
            const item = await db.get("SELECT * FROM request_item WHERE id = ?", o.itemId);
            s = {
              item_id: item.id,
              confidence: "Chosen by sender",
              flag: R.periodFlag(doc.original_name, item.key, client.fye, e.fiscal_year),
              reason: o.channel === "portal" ? "The client uploaded this file to this request item." : "Filed under this request item when it was added."
            };
          } else {
            const m = R.matchAttachment(doc.original_name, await db.all("SELECT * FROM request_item WHERE engagement_id = ? ORDER BY id", e.id), client.fye, e.fiscal_year);
            s = { item_id: m.item ? m.item.id : null, confidence: m.confidence, reason: m.reason, flag: m.flag };
            if (m.item) await db.run("UPDATE document SET item_id = ? WHERE id = ?", m.item.id, doc.id);
          }
          await db.run(
            "INSERT INTO suggestion (engagement_id, email_id, document_id, file_name, item_id, confidence, reason, flag) VALUES (?,?,?,?,?,?,?,?)",
            e.id,
            o.emailId || null,
            doc.id,
            doc.original_name,
            s.item_id,
            s.confidence,
            s.reason,
            s.flag
          );
          return doc;
        }
        const addComment = async (c) => (await db.run(
          "INSERT INTO comment (engagement_id, item_id, author_contact, author_staff, kind, eta_date, body, created_at) VALUES (?,?,?,?,?,?,?,?)",
          c.engagement_id,
          c.item_id || null,
          c.author_contact || null,
          c.author_staff || null,
          c.kind || "comment",
          c.eta_date || null,
          c.body,
          T.now()
        )).lastInsertRowid;
        function longStamp(s) {
          const [d, t] = s.split("T");
          const [y, mo, da] = d.split("-").map(Number);
          const [hh, mm] = (t || "00:00").split(":").map(Number);
          const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          return `${months[mo - 1]} ${da}, ${y} at ${hh % 12 || 12}:${String(mm).padStart(2, "0")} ${hh >= 12 ? "PM" : "AM"} (Eastern time)`;
        }
        function authorizationPdf(a, clientName) {
          const blocks = [];
          a.letter_text.split("\n").slice(2).forEach((line) => {
            if (!line.trim()) blocks.push({ style: "gap" });
            else if (/^(Parties|\d+\.\s)/.test(line)) blocks.push({ style: "h", text: line });
            else if (line.startsWith("- ")) blocks.push({ style: "bullet", text: line.slice(2) });
            else blocks.push({ style: "p", text: line });
          });
          blocks.push(
            { style: "h", text: "Electronic signature" },
            { style: "strong", text: `Signed by: ${a.signer_name}, ${a.signer_title}` },
            { style: "p", text: `On behalf of: ${clientName}` },
            { style: "p", text: `Signed: ${longStamp(a.signed_at)}` },
            { style: "p", text: `From IP address: ${a.ip || "not recorded"}` },
            { style: "p", text: "The signer confirmed they read and agreed to this agreement and are authorized to sign for the Association." },
            { style: "small", text: `Fingerprint of the signed text (SHA-256): ${a.letter_sha256}` },
            { style: "gap" },
            { style: "small", text: A.DRAFT_NOTICE }
          );
          return makePdf({
            title: "Client Portal Authorization",
            subtitle: `${clientName} - version ${a.letter_version}`,
            banner: "DRAFT TEMPLATE - FOR COUNSEL REVIEW",
            blocks,
            footer: "Leonardo & Company, CPAs - signed electronically in the Practice Hub demo"
          });
        }
        function sendPdf(res, buffer, name) {
          res.writeHead(200, {
            "Content-Type": "application/pdf",
            "Content-Disposition": contentDisposition("inline", name),
            "Cache-Control": "private, no-store",
            "X-Frame-Options": "SAMEORIGIN",
            "Content-Security-Policy": "frame-ancestors 'self'"
          });
          res.end(buffer);
        }
        async function engagementDetail(id, user) {
          const e = await loadEng(id, user);
          const row = (await listEngagements(user, "AND e.id = ?", [e.id]))[0];
          const ctx = await contextFor(e);
          const [w, p] = scope(user);
          const years = await db.all(`SELECT e.id, e.fiscal_year, e.stage FROM engagement e WHERE e.client_id = ? AND ${w} ORDER BY e.fiscal_year`, e.client_id, ...p);
          const items = await db.all("SELECT * FROM request_item WHERE engagement_id = ? ORDER BY id", e.id);
          const suggestions = await db.all(`SELECT s.*, i.text AS item_text, st.name AS decided_by_name FROM suggestion s
      LEFT JOIN request_item i ON i.id = s.item_id LEFT JOIN staff st ON st.id = s.decided_by
      WHERE s.engagement_id = ? ORDER BY s.status = 'Pending' DESC, CASE WHEN s.status = 'Pending' THEN s.id ELSE -s.id END`, e.id);
          const emails = await db.all("SELECT * FROM email WHERE engagement_id = ? ORDER BY at DESC, id DESC", e.id);
          const history = await db.all(`SELECT h.*, s.name AS by_name FROM stage_history h LEFT JOIN staff s ON s.id = h.by_id
      WHERE h.engagement_id = ? ORDER BY h.at, h.id`, e.id);
          const tasks = await db.all(`SELECT t.*, a.name AS assigned_to_name, b.name AS assigned_by_name FROM task t
      JOIN staff a ON a.id = t.assigned_to LEFT JOIN staff b ON b.id = t.assigned_by WHERE t.engagement_id = ? ORDER BY t.done_at IS NOT NULL, t.created_at DESC`, e.id);
          const mgmt = ctx.client.mgmt_company_id ? await db.get("SELECT * FROM mgmt_company WHERE id = ?", ctx.client.mgmt_company_id) : null;
          const answers = Object.fromEntries((await db.all("SELECT key, value FROM answer WHERE engagement_id = ?", e.id)).map((a) => [a.key, !!a.value]));
          let billing = null;
          if (FEE_ROLES.has(user.role)) {
            const invoices = await db.all("SELECT * FROM invoice WHERE engagement_id = ? ORDER BY issued_at, id", e.id);
            const billed = invoices.reduce((s, i) => s + i.amount, 0);
            const paid = invoices.filter((i) => i.paid_at).reduce((s, i) => s + i.amount, 0);
            billing = { invoices, fee: e.fee, billed: money(billed), paid: money(paid), balance: money((e.fee || 0) - paid), unbilled: money((e.fee || 0) - billed) };
          }
          const documents = await docsFor(e.id, false);
          for (const s of suggestions) s.document = documents.find((d) => d.id === s.document_id) || null;
          const comments = await commentsFor(e.id, false);
          const authorizations = await db.all(`SELECT id, contact_id, letter_version, letter_sha256, signer_name, signer_title, signed_at, ip
      FROM portal_authorization WHERE client_id = ? AND revoked_at IS NULL ORDER BY signed_at`, e.client_id);
          return {
            engagement: row,
            client: ctx.client,
            mgmt,
            contacts: ctx.contacts,
            years,
            answers,
            items,
            suggestions,
            emails,
            history,
            tasks,
            billing,
            documents,
            comments,
            authorizations,
            permissions: {
              canMove: canMove(user, e),
              canManageRequests: canManageRequests(user, e),
              canAdmin: FEE_ROLES.has(user.role),
              canSeeFees: FEE_ROLES.has(user.role),
              isPartner: user.role === "partner"
            }
          };
        }
        const routes = [];
        const route = (method, pattern, handler, options = {}) => routes.push({
          method,
          handler,
          options,
          re: new RegExp("^" + pattern.replace(/:(\w+)/g, "(?<$1>\\d+)") + "$")
        });
        const ADMIN = { roles: ["partner", "admin"] };
        route("GET", "/api/client-config", () => ({ maxUploadMB: MAX_MB, hosted: !!(opts.hosted || process.env.VERCEL), siteGate: !!(SITE_PASSWORD || opts.clientGate) }), { public: true });
        route("GET", "/api/demo-users", () => db.all("SELECT id, name, role, title, office FROM staff ORDER BY id"), { public: true });
        route("GET", "/api/demo-clients", () => db.all(`SELECT ct.id, ct.name, ct.role, c.name AS client_name,
      EXISTS (SELECT 1 FROM portal_authorization a WHERE a.contact_id = ct.id AND a.revoked_at IS NULL) AS authorized
    FROM contact ct JOIN client c ON c.id = ct.client_id
    WHERE ct.receives_requests = 1 AND c.id IN (SELECT e.client_id FROM engagement e WHERE e.request_sent IS NOT NULL AND e.stage <> 'Closed')
      AND (c.name LIKE 'Egret%' OR c.name LIKE 'Mangrove%' OR c.name LIKE 'Bougainvillea%' OR c.name LIKE 'Banyan%')
    ORDER BY c.name, ct.id`), { public: true });
        route("POST", "/api/login", async ({ body, res, req }) => {
          let session;
          let user;
          if (body.contactId) {
            const ct = await db.get("SELECT * FROM contact WHERE id = ?", Number(body.contactId));
            if (!ct) throw new HttpError(400, "Unknown contact.");
            session = { k: "client", id: ct.id };
            user = await contactUser(ct);
            await audit(null, "Client signed in to the portal", "contact", ct.id, `${ct.name} (demo sign-in from ${clientIp(req)})`);
          } else {
            const s = staff[Number(body.staffId)];
            if (!s) throw new HttpError(400, "Unknown person.");
            session = { k: "staff", id: s.id };
            user = { id: s.id, kind: "staff", name: s.name, role: s.role, title: s.title };
            await audit(s, "Signed in", "staff", s.id, "Demo sign-in");
          }
          const token = signToken({ ...session, exp: Date.now() + SESSION_HOURS * 36e5 });
          res.setHeader("Set-Cookie", `sid=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${SESSION_HOURS * 3600}${secureFlag(req)}`);
          return user;
        }, { public: true });
        route("POST", "/api/logout", ({ req, res }) => {
          res.setHeader("Set-Cookie", `sid=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0${secureFlag(req)}`);
          return { ok: true };
        }, { public: true });
        route("GET", "/api/me", ({ user }) => user || null, { public: true });
        route("GET", "/api/meta", async () => ({
          stages: R.STAGES,
          jobTypes: R.JOB_TYPES,
          locations: R.LOCATIONS,
          questions: R.QUESTIONS,
          staff: Object.values(staff).map(({ id, name, role, title }) => ({ id, name, role, title })),
          mgmt: await db.all("SELECT id, name FROM mgmt_company ORDER BY name"),
          today: T.today()
        }));
        route("GET", "/api/today", async ({ user }) => {
          const all = await listEngagements(user);
          const atMyStage = all.filter((e) => e.owner_id === user.id && e.stage !== "Closed");
          const [w, p] = scope(user);
          const reviewQueue = await db.all(
            `SELECT s.id, s.file_name, s.engagement_id, c.name AS client_name FROM suggestion s
      JOIN engagement e ON e.id = s.engagement_id JOIN client c ON c.id = e.client_id
      WHERE s.status = 'Pending' AND ${w} ${FEE_ROLES.has(user.role) ? "" : "AND e.auditor_id = ?"} ORDER BY s.id`,
            ...p,
            ...FEE_ROLES.has(user.role) ? [] : [user.id]
          );
          const snapshot = {};
          for (const e of all) if (e.stage !== "Closed") snapshot[e.stage] = (snapshot[e.stage] || 0) + 1;
          const mineOnly = FEE_ROLES.has(user.role) ? "" : "AND e.auditor_id = ?";
          const extra = FEE_ROLES.has(user.role) ? [] : [user.id];
          const since = T.addDays(T.today(), -14);
          const clientActivity = [
            ...await db.all(`SELECT 'upload' AS type, d.id, d.engagement_id, d.original_name AS text, d.uploaded_at AS at, d.channel, ct.name AS who, c.name AS client_name
        FROM document d JOIN engagement e ON e.id = d.engagement_id JOIN client c ON c.id = e.client_id JOIN contact ct ON ct.id = d.uploaded_by_contact
        WHERE ${w} ${mineOnly} AND d.uploaded_at >= ?`, ...p, ...extra, since),
            ...await db.all(`SELECT cm.kind AS type, cm.id, cm.engagement_id, cm.body AS text, cm.created_at AS at, NULL AS channel, ct.name AS who, c.name AS client_name
        FROM comment cm JOIN engagement e ON e.id = cm.engagement_id JOIN client c ON c.id = e.client_id JOIN contact ct ON ct.id = cm.author_contact
        WHERE ${w} ${mineOnly} AND cm.created_at >= ?`, ...p, ...extra, since)
          ].sort((a, b) => a.at < b.at ? 1 : -1).slice(0, 12);
          return { atMyStage, reviewQueue, snapshot, clientActivity, ...await tasksFor(user) };
        });
        async function tasksFor(user) {
          const base = `SELECT t.*, a.name AS assigned_to_name, b.name AS assigned_by_name, c.name AS client_name, e.fiscal_year
      FROM task t JOIN staff a ON a.id = t.assigned_to LEFT JOIN staff b ON b.id = t.assigned_by
      LEFT JOIN engagement e ON e.id = t.engagement_id LEFT JOIN client c ON c.id = e.client_id`;
          const order = "ORDER BY t.done_at IS NOT NULL, t.due IS NULL, t.due, t.created_at DESC";
          return {
            myTasks: await db.all(`${base} WHERE t.assigned_to = ? AND (t.done_at IS NULL OR t.done_at >= ?) ${order}`, user.id, T.addDays(T.today(), -14)),
            assignedByMe: await db.all(`${base} WHERE t.assigned_by = ? AND t.assigned_to <> ? ${order}`, user.id, user.id)
          };
        }
        route("GET", "/api/engagements", ({ user, query }) => {
          const where = [];
          const params = [];
          const add = (sql, v) => {
            where.push(sql);
            params.push(v);
          };
          if (query.get("year")) add("e.fiscal_year = ?", Number(query.get("year")));
          if (query.get("stage")) add("e.stage = ?", query.get("stage"));
          if (query.get("location")) add("c.location = ?", query.get("location"));
          if (query.get("jobType")) add("e.job_type = ?", query.get("jobType"));
          if (query.get("mgmt")) add("c.mgmt_company_id = ?", Number(query.get("mgmt")));
          if (query.get("staff")) {
            const s = Number(query.get("staff"));
            where.push("(e.auditor_id = ? OR e.reviewer_id = ? OR e.tax_id = ? OR e.partner_id = ?)");
            params.push(s, s, s, s);
          }
          if (query.get("q")) add("LOWER(c.name) LIKE ?", `%${query.get("q").slice(0, 80).toLowerCase()}%`);
          if (query.get("open") === "1") where.push("e.stage <> 'Closed'");
          return listEngagements(user, where.map((x) => `AND ${x}`).join(" "), params);
        });
        route("GET", "/api/engagements/:id", ({ user, params }) => engagementDetail(params.id, user));
        route("PATCH", "/api/engagements/:id", async ({ user, params, body }) => {
          const e = await loadEng(params.id, user);
          const changes = [];
          const set = async (field, value) => {
            if (value === e[field]) return;
            await db.run(`UPDATE engagement SET ${field} = ? WHERE id = ?`, value, e.id);
            changes.push(`${field}: ${e[field] ?? "blank"} to ${value ?? "blank"}`);
          };
          if ("due_date" in body) {
            if (!canMove(user, e)) throw new HttpError(403, "Only the person who has the job, a partner or the admin team can change the due date.");
            if (body.due_date !== null && body.due_date !== "" && !isDate(body.due_date)) throw new HttpError(400, "Use a real date, or leave it blank.");
            await set("due_date", body.due_date || null);
          }
          for (const f of ["partner_id", "auditor_id", "reviewer_id", "tax_id"]) {
            if (f in body) {
              if (!FEE_ROLES.has(user.role)) throw new HttpError(403, "Only partners and the admin team can reassign a job.");
              const s = staff[Number(body[f])];
              const need = { partner_id: "partner", auditor_id: "auditor", reviewer_id: "reviewer", tax_id: "tax" }[f];
              if (!s || s.role !== need) throw new HttpError(400, `Pick a ${need}.`);
              await set(f, s.id);
            }
          }
          for (const f of ["fee", "tax_fee", "retainer_pct"]) {
            if (f in body) {
              if (!FEE_ROLES.has(user.role)) throw new HttpError(403, "Fees are limited to partners and the admin team.");
              const n = Number(body[f]);
              if (!Number.isFinite(n) || n < 0 || f === "retainer_pct" && n > 100) throw new HttpError(400, "Enter a valid amount.");
              await set(f, money(n));
            }
          }
          if ("quote_note" in body) {
            if (user.role !== "partner") throw new HttpError(403, "Quote notes are for partners only.");
            await set("quote_note", text(body.quote_note, 1e3) || null);
          }
          if ("job_type" in body) {
            if (!FEE_ROLES.has(user.role)) throw new HttpError(403, "Only partners and the admin team can change the job type.");
            if (!R.JOB_TYPES.includes(body.job_type)) throw new HttpError(400, "Pick a job type from the list.");
            await set("job_type", body.job_type);
            await rebuildItems({ ...e, job_type: body.job_type });
          }
          if (changes.length) await audit(user, "Updated job", "engagement", e.id, changes.join("; "));
          return engagementDetail(e.id, user);
        });
        route("POST", "/api/engagements/:id/move", async ({ user, params, body }) => {
          const e = await loadEng(params.id, user);
          if (!canMove(user, e)) throw new HttpError(403, `Only ${ownerOf(e) ? staff[ownerOf(e)].name : "a partner"}, a partner or the admin team can move this job.`);
          const idx = R.STAGES.indexOf(e.stage);
          if (body.direction === "forward") {
            if (idx >= R.STAGES.length - 1) throw new HttpError(409, "This job is already closed.");
            if (e.stage === "Onboarding") {
              const missing = R.gateMissing(e);
              if (missing.length) throw new HttpError(409, `Not ready to start yet: ${missing.join(" and ")}.`);
            }
            await db.tx(() => doMove(e, R.STAGES[idx + 1], "forward", null, user));
          } else if (body.direction === "back") {
            const to = body.to;
            const ti = R.STAGES.indexOf(to);
            if (ti < 0 || ti >= idx) throw new HttpError(400, "Pick an earlier stage to send the job back to.");
            const reason = text(body.reason, 500);
            if (!reason) throw new HttpError(400, "Say why the job is going back, so the next person knows what to fix.");
            await db.tx(() => doMove(e, to, "back", reason, user));
          } else {
            throw new HttpError(400, "Direction must be forward or back.");
          }
          return engagementDetail(e.id, user);
        });
        route("POST", "/api/engagements/:id/rollover", async ({ user, params, body }) => {
          const e = await loadEng(params.id, user);
          if (await db.get("SELECT id FROM engagement WHERE client_id = ? AND fiscal_year = ?", e.client_id, e.fiscal_year + 1)) {
            throw new HttpError(409, `Fiscal ${e.fiscal_year + 1} already exists for this client.`);
          }
          const due = body.due_date || null;
          if (due && !isDate(due)) throw new HttpError(400, "Use a real date, or leave the due date blank.");
          const newId = await db.tx(async () => {
            const id = (await db.run(
              `INSERT INTO engagement (client_id, fiscal_year, job_type, stage, stage_since, partner_id, auditor_id, reviewer_id, tax_id,
          fee, tax_fee, retainer_pct, quote_note, due_date, rolled_from_id, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
              e.client_id,
              e.fiscal_year + 1,
              e.job_type,
              "Onboarding",
              T.now(),
              e.partner_id,
              e.auditor_id,
              e.reviewer_id,
              e.tax_id,
              e.fee,
              e.tax_fee,
              e.retainer_pct,
              e.quote_note,
              due,
              e.id,
              T.now()
            )).lastInsertRowid;
            for (const a of await db.all("SELECT key, value FROM answer WHERE engagement_id = ?", e.id)) {
              await db.run("INSERT INTO answer (engagement_id, key, value) VALUES (?,?,?)", id, a.key, a.value);
            }
            await rebuildItems({ id, job_type: e.job_type, request_sent: null });
            await db.run("INSERT INTO stage_history (engagement_id, from_stage, to_stage, direction, by_id, at) VALUES (?,?,?,?,?,?)", id, null, "Onboarding", "rollover", user.id, T.now());
            const { client } = await contextFor(e);
            await audit(user, "Rolled over client", "engagement", id, `${client.name}: fiscal ${e.fiscal_year} to ${e.fiscal_year + 1}${due ? `, due ${due}` : ", no due date"}`);
            return id;
          });
          return { id: newId };
        }, ADMIN);
        route("POST", "/api/engagements/:id/el-signed", async ({ user, params, body }) => {
          const e = await loadEng(params.id, user);
          if (!e.el_sent) throw new HttpError(409, "Send the engagement letter first.");
          const date = isDate(body.date) ? body.date : T.today();
          await db.tx(async () => {
            await db.run("UPDATE engagement SET el_signed = ? WHERE id = ?", date, e.id);
            await audit(user, "Engagement letter signed", "engagement", e.id, date);
            await checkGate(e.id);
          });
          return engagementDetail(e.id, user);
        }, ADMIN);
        route("POST", "/api/engagements/:id/retainer-paid", async ({ user, params, body }) => {
          const e = await loadEng(params.id, user);
          const inv = await db.get("SELECT * FROM invoice WHERE engagement_id = ? AND template LIKE 'Retainer%' ORDER BY id LIMIT 1", e.id);
          if (!inv) throw new HttpError(409, "Send the engagement letter and retainer invoice first.");
          const date = isDate(body.date) ? body.date : T.today();
          await db.tx(async () => {
            if (!inv.paid_at) await db.run("UPDATE invoice SET paid_at = ? WHERE id = ?", date, inv.id);
            await db.run("UPDATE engagement SET retainer_paid = ? WHERE id = ?", date, e.id);
            await audit(user, "Retainer paid", "engagement", e.id, `${inv.number} paid ${date}`);
            await checkGate(e.id);
          });
          return engagementDetail(e.id, user);
        }, ADMIN);
        route("POST", "/api/engagements/:id/final-invoice", async ({ user, params }) => {
          const e = await loadEng(params.id, user);
          const number = await db.tx(() => createFinalInvoice(e, user));
          if (!number) throw new HttpError(409, "Nothing left to bill on this job.");
          return engagementDetail(e.id, user);
        }, ADMIN);
        route("POST", "/api/engagements/:id/answers", async ({ user, params, body }) => {
          const e = await loadEng(params.id, user);
          if (!canManageRequests(user, e)) throw new HttpError(403, "Only the auditor, a partner or the admin team can change the request list.");
          const answers = body.answers || {};
          await db.tx(async () => {
            for (const q of R.QUESTIONS) {
              if (q.key in answers) {
                await db.run("INSERT INTO answer (engagement_id, key, value) VALUES (?,?,?) ON CONFLICT (engagement_id, key) DO UPDATE SET value = excluded.value", e.id, q.key, answers[q.key] ? 1 : 0);
              }
            }
            await rebuildItems(e);
            await audit(user, "Updated request list answers", "engagement", e.id, JSON.stringify(answers));
          });
          return engagementDetail(e.id, user);
        });
        async function requestDraft(e) {
          const ctx = await contextFor(e);
          const items = await db.all("SELECT * FROM request_item WHERE engagement_id = ? AND status <> 'N/A' ORDER BY id", e.id);
          const sender = staff[e.auditor_id];
          const m = R.requestListEmail({ eng: e, client: ctx.client, items, to: ctx.to, sender });
          return { ...m, from: sender.email, to: addrs(ctx.to), cc: addrs(ctx.cc), count: items.length, recipients: ctx.to.length + ctx.cc.length };
        }
        route("POST", "/api/engagements/:id/request-list/preview", async ({ user, params }) => {
          const e = await loadEng(params.id, user);
          if (!canManageRequests(user, e)) throw new HttpError(403, "Only the auditor, a partner or the admin team can send the request list.");
          if (e.request_sent) throw new HttpError(409, "The request list already went out. Use a follow-up instead.");
          const d = await requestDraft(e);
          if (!d.to) throw new HttpError(400, "Mark at least one contact to receive requests first.");
          return d;
        });
        route("POST", "/api/engagements/:id/request-list/send", async ({ user, params, body }) => {
          const e = await loadEng(params.id, user);
          if (!canManageRequests(user, e)) throw new HttpError(403, "Only the auditor, a partner or the admin team can send the request list.");
          if (e.request_sent) throw new HttpError(409, "The request list already went out. Use a follow-up instead.");
          const d = await requestDraft(e);
          if (!d.to) throw new HttpError(400, "Mark at least one contact to receive requests first.");
          await db.tx(async () => {
            await insertEmail({
              engagement_id: e.id,
              kind: "request",
              direction: "out",
              from: d.from,
              to: d.to,
              cc: d.cc,
              subject: text(body.subject, 300) || d.subject,
              body: text(body.body, 2e4) || d.body
            });
            await db.run("UPDATE request_item SET status = 'Sent', updated_at = ? WHERE engagement_id = ? AND status = 'Draft'", T.now(), e.id);
            await db.run("UPDATE engagement SET request_sent = ? WHERE id = ?", T.today(), e.id);
            await audit(user, "Sent request list", "engagement", e.id, `${d.count} items to ${d.recipients} people`);
          });
          return engagementDetail(e.id, user);
        });
        route("POST", "/api/engagements/:id/follow-up/preview", async ({ user, params }) => {
          const e = await loadEng(params.id, user);
          if (!canManageRequests(user, e)) throw new HttpError(403, "Only the auditor, a partner or the admin team can send follow-ups.");
          const d = await followUpDraft(e);
          if (!d.outstanding) throw new HttpError(409, "Nothing is outstanding for this job.");
          return d;
        });
        route("POST", "/api/engagements/:id/follow-up/send", async ({ user, params, body }) => {
          const e = await loadEng(params.id, user);
          if (!canManageRequests(user, e)) throw new HttpError(403, "Only the auditor, a partner or the admin team can send follow-ups.");
          await db.tx(() => sendFollowUp(e, user, body.subject, body.body));
          return engagementDetail(e.id, user);
        });
        route("POST", "/api/engagements/:id/simulate-email", async ({ user, params, body }) => {
          const e = await loadEng(params.id, user);
          const ctx = await contextFor(e);
          const files = (Array.isArray(body.attachments) ? body.attachments : []).map((f) => text(f, 120).replace(/[<>:"/\\|?*]/g, " ")).filter(Boolean).slice(0, 10);
          const message = text(body.text, 5e3);
          const [kind, idStr] = String(body.sender || "").split(":");
          await db.tx(async () => {
            if (kind === "contact") {
              const c = ctx.contacts.find((x) => x.id === Number(idStr));
              if (!c) throw new HttpError(400, "Pick a contact for this client.");
              const emailId = await insertEmail({
                engagement_id: e.id,
                kind: "reply",
                direction: "in",
                from: c.email,
                to: staff[e.auditor_id].email,
                subject: `RE: ${ctx.client.name} request list`,
                body: message || "(no message)",
                attachments: files,
                status: "Received"
              });
              for (const f of files) {
                const ph = S.placeholderFor(f, ctx.client.name);
                await receiveClientFile(e, {
                  file: { name: f, buffer: ph.buffer, modified: null },
                  contactId: c.id,
                  channel: "email",
                  emailId,
                  simulated: true,
                  mimeOverride: ph.pdf && !/\.pdf$/i.test(f) ? "application/pdf" : void 0
                });
              }
              await audit(user, "Captured client email (simulated)", "engagement", e.id, `From ${c.name}, ${files.length} attachments`);
            } else if (kind === "staff") {
              const s = staff[Number(idStr)];
              if (!s) throw new HttpError(400, "Pick a staff member.");
              await insertEmail({
                engagement_id: e.id,
                kind: "outlook",
                direction: "out",
                from: s.email,
                to: addrs(ctx.to),
                cc: addrs(ctx.cc),
                subject: `${ctx.client.name}: quick note`,
                body: message || "(no message)",
                attachments: files
              });
              await audit(user, "Captured Outlook email (simulated)", "engagement", e.id, `Sent by ${s.name} from Outlook`);
            } else {
              throw new HttpError(400, "Pick who sent the email.");
            }
          });
          return engagementDetail(e.id, user);
        });
        route("POST", "/api/suggestions/:id/decide", async ({ user, params, body }) => {
          const s = await db.get("SELECT * FROM suggestion WHERE id = ?", Number(params.id));
          if (!s) throw new HttpError(404, "Suggestion not found.");
          const e = await loadEng(s.engagement_id, user);
          if (!canManageRequests(user, e)) throw new HttpError(403, "Only the auditor, a partner or the admin team can review client files.");
          if (s.status !== "Pending") throw new HttpError(409, "This file was already reviewed.");
          const itemId = Number(body.item_id || s.item_id);
          const item = itemId ? await db.get("SELECT * FROM request_item WHERE id = ? AND engagement_id = ?", itemId, e.id) : null;
          await db.tx(async () => {
            if (body.decision === "accept") {
              if (!item) throw new HttpError(400, "Pick the request item this file belongs to.");
              await db.run("UPDATE request_item SET status = 'Accepted', file_name = ?, note = NULL, updated_at = ? WHERE id = ?", s.file_name, T.now(), item.id);
              await db.run("UPDATE suggestion SET status = 'Accepted', item_id = ?, decided_by = ?, decided_at = ? WHERE id = ?", item.id, user.id, T.now(), s.id);
              if (s.document_id) await db.run("UPDATE document SET status = 'Accepted', item_id = ?, reviewed_by = ?, reviewed_at = ?, review_note = NULL WHERE id = ?", item.id, user.id, T.now(), s.document_id);
              await audit(user, "Accepted client file", "engagement", e.id, `${s.file_name} for "${item.text}"`);
            } else if (body.decision === "return") {
              if (!item) throw new HttpError(400, "Pick the request item this file was meant for.");
              const reason = text(body.reason, 500);
              if (!reason) throw new HttpError(400, "Tell the client what is wrong, so they can fix it.");
              await db.run("UPDATE request_item SET status = 'Returned', file_name = ?, note = ?, updated_at = ? WHERE id = ?", s.file_name, reason, T.now(), item.id);
              await db.run("UPDATE suggestion SET status = 'Returned', item_id = ?, decided_by = ?, decided_at = ? WHERE id = ?", item.id, user.id, T.now(), s.id);
              if (s.document_id) await db.run("UPDATE document SET status = 'Returned', item_id = ?, reviewed_by = ?, reviewed_at = ?, review_note = ? WHERE id = ?", item.id, user.id, T.now(), reason, s.document_id);
              await addComment({ engagement_id: e.id, item_id: item.id, author_staff: user.id, body: `Returned "${s.file_name}": ${reason}` });
              await audit(user, "Returned client file", "engagement", e.id, `${s.file_name}: ${reason}`);
            } else if (body.decision === "dismiss") {
              await db.run("UPDATE suggestion SET status = 'Dismissed', decided_by = ?, decided_at = ? WHERE id = ?", user.id, T.now(), s.id);
              if (s.document_id) await db.run("UPDATE document SET status = 'Accepted', item_id = NULL, reviewed_by = ?, reviewed_at = ?, review_note = ? WHERE id = ?", user.id, T.now(), "Kept on file; not matched to a request item.", s.document_id);
              await audit(user, "Dismissed file suggestion", "engagement", e.id, s.file_name);
            } else {
              throw new HttpError(400, "Decision must be accept, return or dismiss.");
            }
          });
          return engagementDetail(e.id, user);
        });
        route("PATCH", "/api/request-items/:id", async ({ user, params, body }) => {
          const item = await db.get("SELECT * FROM request_item WHERE id = ?", Number(params.id));
          if (!item) throw new HttpError(404, "Item not found.");
          const e = await loadEng(item.engagement_id, user);
          if (!canManageRequests(user, e)) throw new HttpError(403, "Only the auditor, a partner or the admin team can change request items.");
          const status = body.status;
          if (!["Accepted", "Returned", "N/A", "Sent"].includes(status)) throw new HttpError(400, "Unknown status.");
          const note = text(body.note, 500);
          if (status === "Returned" && !note) throw new HttpError(400, "Say why the item is being returned.");
          await db.tx(async () => {
            await db.run("UPDATE request_item SET status = ?, note = ?, updated_at = ? WHERE id = ?", status, note || null, T.now(), item.id);
            if (status === "Accepted" || status === "Returned") {
              const pending = await db.all("SELECT id FROM document WHERE item_id = ? AND direction = 'from_client' AND status = 'Pending'", item.id);
              for (const d of pending) {
                await db.run("UPDATE document SET status = ?, reviewed_by = ?, reviewed_at = ?, review_note = ? WHERE id = ?", status, user.id, T.now(), status === "Returned" ? note : null, d.id);
                await db.run("UPDATE suggestion SET status = ?, decided_by = ?, decided_at = ? WHERE document_id = ? AND status = 'Pending'", status, user.id, T.now(), d.id);
              }
            }
            if (status === "Returned") await addComment({ engagement_id: e.id, item_id: item.id, author_staff: user.id, body: `Returned: ${note}` });
            await audit(user, "Changed request item", "engagement", e.id, `"${item.text}": ${item.status} to ${status}${note ? ` (${note})` : ""}`);
          });
          return engagementDetail(e.id, user);
        });
        async function assertClientVisible(clientId, user) {
          const [w, p] = scope(user);
          if (!await db.get(`SELECT 1 AS ok FROM engagement e WHERE e.client_id = ? AND ${w}`, clientId, ...p)) throw new HttpError(404, "Client not found.");
        }
        route("POST", "/api/clients/:id/contacts", async ({ user, params, body }) => {
          await assertClientVisible(Number(params.id), user);
          const name = text(body.name, 120);
          if (!name) throw new HttpError(400, "Enter a name.");
          if (!isEmail(body.email)) throw new HttpError(400, "Enter a valid email address.");
          await db.run(
            "INSERT INTO contact (client_id, name, role, email, phone, receives_requests, cc) VALUES (?,?,?,?,?,?,?)",
            Number(params.id),
            name,
            text(body.role, 80) || null,
            body.email.trim(),
            text(body.phone, 40) || null,
            body.receives_requests ? 1 : 0,
            body.cc ? 1 : 0
          );
          await audit(user, "Added contact", "client", Number(params.id), `${name} <${body.email}>`);
          return { ok: true };
        });
        route("PATCH", "/api/contacts/:id", async ({ user, params, body }) => {
          const c = await db.get("SELECT * FROM contact WHERE id = ?", Number(params.id));
          if (!c) throw new HttpError(404, "Contact not found.");
          await assertClientVisible(c.client_id, user);
          const receives = "receives_requests" in body ? body.receives_requests ? 1 : 0 : c.receives_requests;
          const cc = "cc" in body ? body.cc ? 1 : 0 : c.cc;
          await db.run("UPDATE contact SET receives_requests = ?, cc = ? WHERE id = ?", receives, cc, c.id);
          await audit(user, "Updated contact", "client", c.client_id, `${c.name}: receives ${receives ? "yes" : "no"}, copied ${cc ? "yes" : "no"}`);
          return { ok: true };
        });
        route("GET", "/api/mgmt-companies", async ({ user }) => {
          const [w, p] = scope(user);
          const out = [];
          for (const m of await db.all("SELECT * FROM mgmt_company ORDER BY name")) {
            out.push({ ...m, clients: await db.all(`SELECT DISTINCT c.id, c.name, c.location FROM client c JOIN engagement e ON e.client_id = c.id
        WHERE c.mgmt_company_id = ? AND ${w} ORDER BY c.name`, m.id, ...p) });
          }
          return out;
        });
        route("PATCH", "/api/mgmt-companies/:id", async ({ user, params, body }) => {
          const m = await db.get("SELECT * FROM mgmt_company WHERE id = ?", Number(params.id));
          if (!m) throw new HttpError(404, "Management company not found.");
          if (body.email && !isEmail(body.email)) throw new HttpError(400, "Enter a valid email address.");
          await db.run(
            "UPDATE mgmt_company SET contact_name = ?, email = ?, phone = ? WHERE id = ?",
            text(body.contact_name, 120) || m.contact_name,
            (body.email || m.email).trim(),
            text(body.phone, 40) || m.phone,
            m.id
          );
          await audit(user, "Updated management company", "mgmt_company", m.id, m.name);
          return { ok: true };
        }, ADMIN);
        route("GET", "/api/tasks", ({ user }) => tasksFor(user));
        route("POST", "/api/tasks", async ({ user, body }) => {
          const title = text(body.title, 200);
          if (!title) throw new HttpError(400, "Describe the task.");
          const to = staff[Number(body.assigned_to)];
          if (!to) throw new HttpError(400, "Pick who the task is for.");
          if (body.due && !isDate(body.due)) throw new HttpError(400, "Use a real date, or leave the due date blank.");
          let engId = null;
          if (body.engagement_id) engId = (await loadEng(body.engagement_id, user)).id;
          const id = await insertTask({ engagement_id: engId, title, assigned_to: to.id, assigned_by: user.id, due: body.due || null });
          await audit(user, "Assigned task", "task", id, `${title} (to ${to.name})`);
          return { id };
        });
        route("POST", "/api/tasks/:id/toggle", async ({ user, params }) => {
          const t = await db.get("SELECT * FROM task WHERE id = ?", Number(params.id));
          if (!t || t.assigned_to !== user.id && t.assigned_by !== user.id) throw new HttpError(404, "Task not found.");
          await db.run("UPDATE task SET done_at = ? WHERE id = ?", t.done_at ? null : T.now(), t.id);
          await audit(user, t.done_at ? "Reopened task" : "Completed task", "task", t.id, t.title);
          return { ok: true };
        });
        async function followUpRows(user) {
          const [w, p] = scope(user);
          const n = (cond) => `SUM(CASE WHEN ${cond} THEN 1 ELSE 0 END)`;
          return (await db.all(`SELECT e.id, e.fiscal_year, e.job_type, e.request_sent, e.auditor_id, c.name AS client_name, c.location, a.name AS auditor_name,
        ${n("i.status = 'Sent'")} AS open_items, ${n("i.status = 'Returned'")} AS returned_items, ${n("i.status = 'Accepted'")} AS accepted_items,
        ${n("i.status <> 'N/A'")} AS total_items,
        (SELECT MAX(at) FROM email m WHERE m.engagement_id = e.id AND m.kind IN ('request','followup','onboarding')) AS last_sent
      FROM engagement e JOIN client c ON c.id = e.client_id JOIN request_item i ON i.engagement_id = e.id LEFT JOIN staff a ON a.id = e.auditor_id
      WHERE ${w} AND e.request_sent IS NOT NULL AND e.stage <> 'Closed'
      GROUP BY e.id, c.name, c.location, a.name HAVING ${n("i.status IN ('Sent','Returned')")} > 0 ORDER BY last_sent`, ...p)).map((r) => ({ ...r, days_since: r.last_sent ? T.daysBetween(r.last_sent, T.today()) : null }));
        }
        route("GET", "/api/follow-ups", ({ user }) => followUpRows(user));
        route("POST", "/api/follow-ups/send-all", async ({ user, body }) => {
          const minDays = Number.isFinite(Number(body.min_days)) ? Number(body.min_days) : 7;
          let sent = 0;
          await db.tx(async () => {
            for (const r of await followUpRows(user)) {
              if (r.days_since !== null && r.days_since < minDays) continue;
              const e = await loadEng(r.id, user);
              if (!canManageRequests(user, e) || !(await contextFor(e)).to.length) continue;
              await sendFollowUp(e, user);
              sent++;
            }
          });
          return { sent };
        });
        route("GET", "/api/onboarding", async ({ user, query }) => {
          const month = String(Number(query.get("month") || 12)).padStart(2, "0");
          const types = (query.get("types") || R.JOB_TYPES.join(",")).split(",").filter((t) => R.JOB_TYPES.includes(t));
          const rows = await listEngagements(user, `AND e.stage = 'Onboarding' AND e.el_sent IS NULL AND substr(c.fye, 1, 2) = ? AND e.job_type IN (${types.map(() => "?").join(",") || "''"})
      AND NOT EXISTS (SELECT 1 FROM email m WHERE m.engagement_id = e.id AND m.kind = 'onboarding' AND m.status = 'Scheduled')`, [month, ...types]);
          for (const r of rows) {
            const ctx = await contextFor(r);
            r.to_count = ctx.to.length;
            r.cc_count = ctx.cc.length;
            r.retainer = money((r.fee || 0) * (r.retainer_pct || 50) / 100);
          }
          const scheduled = await db.all(`SELECT m.id, m.scheduled_for, m.subject, c.name AS client_name, e.id AS engagement_id FROM email m
      JOIN engagement e ON e.id = m.engagement_id JOIN client c ON c.id = e.client_id WHERE m.status = 'Scheduled' ORDER BY m.scheduled_for`);
          return { rows, scheduled };
        }, ADMIN);
        async function onboardingDraft(e, invoice) {
          const ctx = await contextFor(e);
          const items = await db.all("SELECT * FROM request_item WHERE engagement_id = ? AND status <> 'N/A' ORDER BY id", e.id);
          const sender = staff[ADMIN_ID];
          const m = R.onboardingEmail({ eng: e, client: ctx.client, items, to: ctx.to, sender, invoice });
          return { ...m, from: sender.email, to: addrs(ctx.to), cc: addrs(ctx.cc) };
        }
        route("POST", "/api/onboarding/preview", async ({ user, body }) => {
          const e = await loadEng(body.id, user);
          return onboardingDraft(e, { number: "(number assigned when sent)", amount: money((e.fee || 0) * e.retainer_pct / 100) });
        }, ADMIN);
        route("POST", "/api/onboarding/send", async ({ user, body }) => {
          const ids = (Array.isArray(body.ids) ? body.ids : []).map(Number).filter(Boolean);
          if (!ids.length) throw new HttpError(400, "Pick at least one client.");
          let when = null;
          if (body.scheduled_for) {
            if (Number.isNaN(Date.parse(body.scheduled_for))) throw new HttpError(400, "Pick a valid date and time.");
            when = String(body.scheduled_for).slice(0, 16) + ":00";
          }
          const future = when && when > T.now();
          const results = [];
          await db.tx(async () => {
            for (const id of ids) {
              const e = await loadEng(id, user);
              const ctx = await contextFor(e);
              if (e.stage !== "Onboarding" || e.el_sent) {
                results.push({ id, skipped: "already sent" });
                continue;
              }
              if (!ctx.to.length) {
                results.push({ id, skipped: "no contact marked to receive requests" });
                continue;
              }
              const date = future ? when.slice(0, 10) : T.today();
              const number = await nextInvoiceNumber(e.fiscal_year);
              const amount = money((e.fee || 0) * e.retainer_pct / 100);
              await db.run("INSERT INTO invoice (engagement_id, number, template, amount, issued_at) VALUES (?,?,?,?,?)", e.id, number, `Retainer (${e.retainer_pct}%)`, amount, date);
              const d = await onboardingDraft(e, { number, amount });
              await insertEmail({
                engagement_id: e.id,
                kind: "onboarding",
                direction: "out",
                from: d.from,
                to: d.to,
                cc: d.cc,
                subject: d.subject,
                body: d.body,
                attachments: d.attachments,
                status: future ? "Scheduled" : "Sent",
                scheduled_for: future ? when : null
              });
              if (!future) await deliverOnboarding(e.id, date);
              results.push({ id, client: ctx.client.name, status: future ? "Scheduled" : "Sent", invoice: number });
            }
            await audit(
              user,
              future ? "Scheduled onboarding batch" : "Sent onboarding batch",
              "onboarding",
              null,
              `${results.filter((r) => !r.skipped).length} clients${future ? ` for ${when}` : ""}`
            );
          });
          return { results };
        }, ADMIN);
        route("GET", "/api/billing", async ({ user, query }) => {
          const year = Number(query.get("year")) || null;
          const engs = (await listEngagements(user, year ? "AND e.fiscal_year = ?" : "", year ? [year] : [])).filter((e) => e.billed > 0 || e.stage !== "Closed").map((e) => ({ ...e, balance: money((e.fee || 0) - e.paid), unbilled: money((e.fee || 0) - e.billed) }));
          const invoices = await db.all(`SELECT v.*, c.name AS client_name, c.location, e.fiscal_year, e.job_type FROM invoice v
      JOIN engagement e ON e.id = v.engagement_id JOIN client c ON c.id = e.client_id ORDER BY v.batch_id IS NOT NULL, v.issued_at DESC, v.id DESC`);
          const byLocation = R.LOCATIONS.map((loc) => {
            const rows = engs.filter((e) => e.location === loc);
            return {
              location: loc,
              fee: money(rows.reduce((s, e) => s + (e.fee || 0), 0)),
              billed: money(rows.reduce((s, e) => s + e.billed, 0)),
              paid: money(rows.reduce((s, e) => s + e.paid, 0))
            };
          });
          const batches = await db.all("SELECT b.id, b.created_at, b.invoice_count, s.name AS by_name FROM export_batch b LEFT JOIN staff s ON s.id = b.by_id ORDER BY b.id DESC");
          return { engagements: engs, invoices, byLocation, batches, unexported: invoices.filter((i) => !i.batch_id).length };
        }, ADMIN);
        route("POST", "/api/invoices/:id/pay", async ({ user, params, body }) => {
          const inv = await db.get("SELECT * FROM invoice WHERE id = ?", Number(params.id));
          if (!inv) throw new HttpError(404, "Invoice not found.");
          if (inv.paid_at) throw new HttpError(409, "This invoice is already paid.");
          const date = isDate(body.date) ? body.date : T.today();
          await db.tx(async () => {
            await db.run("UPDATE invoice SET paid_at = ? WHERE id = ?", date, inv.id);
            if (inv.template.startsWith("Retainer")) {
              await db.run("UPDATE engagement SET retainer_paid = COALESCE(retainer_paid, ?) WHERE id = ?", date, inv.engagement_id);
              await checkGate(inv.engagement_id);
            }
            await audit(user, "Recorded payment (simulated QuickBooks sync)", "invoice", inv.id, `${inv.number} $${inv.amount.toFixed(2)}`);
          });
          return { ok: true };
        }, ADMIN);
        function quickBooksCsv(invoices) {
          const us = (d) => `${d.slice(5, 7)}/${d.slice(8, 10)}/${d.slice(0, 4)}`;
          const cell = (v) => {
            const s = String(v ?? "");
            return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
          };
          const service = { Audit: "Audit Services", Review: "Review Services", Compilation: "Compilation Services", "Tax only": "Tax Services" };
          const header = ["InvoiceNo", "Customer", "InvoiceDate", "DueDate", "Terms", "Location", "Memo", "Item(Product/Service)", "ItemDescription", "ItemQuantity", "ItemRate", "ItemAmount"];
          const lines = invoices.map((v) => [
            v.number,
            v.client_name,
            us(v.issued_at),
            us(T.addDays(v.issued_at, 30)),
            "Net 30",
            v.location,
            v.template,
            service[v.job_type] || "Audit Services",
            `${v.template}: fiscal ${v.fiscal_year} ${v.job_type.toLowerCase()}`,
            1,
            v.amount.toFixed(2),
            v.amount.toFixed(2)
          ].map(cell).join(","));
          return [header.join(","), ...lines].join("\r\n") + "\r\n";
        }
        route("POST", "/api/billing/export", async ({ user }) => {
          const invoices = await db.all(`SELECT v.*, c.name AS client_name, c.location, e.fiscal_year, e.job_type FROM invoice v
      JOIN engagement e ON e.id = v.engagement_id JOIN client c ON c.id = e.client_id WHERE v.batch_id IS NULL ORDER BY v.number`);
          if (!invoices.length) throw new HttpError(409, "There are no new invoices to export.");
          const csv = quickBooksCsv(invoices);
          const batchId = await db.tx(async () => {
            const id = (await db.run("INSERT INTO export_batch (created_at, by_id, invoice_count, csv) VALUES (?,?,?,?)", T.now(), user.id, invoices.length, csv)).lastInsertRowid;
            for (const v of invoices) await db.run("UPDATE invoice SET batch_id = ? WHERE id = ?", id, v.id);
            await audit(user, "Exported invoices to QuickBooks (CSV)", "export_batch", id, `${invoices.length} invoices`);
            return id;
          });
          return { batch_id: batchId, count: invoices.length };
        }, ADMIN);
        route("GET", "/api/billing/batches/:id/csv", async ({ params, res }) => {
          const b = await db.get("SELECT * FROM export_batch WHERE id = ?", Number(params.id));
          if (!b || !b.invoice_count) throw new HttpError(404, "Batch not found.");
          res.writeHead(200, { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="quickbooks-invoices-batch-${b.id}.csv"` });
          res.end(b.csv);
        }, ADMIN);
        route("GET", "/api/reports", async ({ user }) => {
          const all = await listEngagements(user);
          const open = all.filter((e) => e.stage !== "Closed");
          const count = (rows, keyFn) => rows.reduce((acc, e) => {
            const k = keyFn(e) || "Unassigned";
            acc[k] = acc[k] || {};
            acc[k][e.stage] = (acc[k][e.stage] || 0) + 1;
            return acc;
          }, {});
          const median = (arr) => {
            if (!arr.length) return null;
            const s = [...arr].sort((a, b) => a - b);
            const m = Math.floor(s.length / 2);
            return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
          };
          const spans = (a, b) => all.filter((e) => e[a] && e[b]).map((e) => T.daysBetween(e[a], e[b])).filter((d) => d >= 0);
          const turnaround = [
            ["Engagement letter sent to signed", spans("el_sent", "el_signed")],
            ["Retainer invoiced to paid", spans("retainer_invoiced", "retainer_paid")],
            ["Draft to final", spans("draft_issued", "final_issued")]
          ].map(([label, d]) => ({ label, median: median(d), n: d.length }));
          const [w, p] = scope(user);
          const overdue = (await db.all(`SELECT e.id, c.name AS client_name, a.name AS auditor_name, e.request_sent, COUNT(*) AS items
      FROM request_item i JOIN engagement e ON e.id = i.engagement_id JOIN client c ON c.id = e.client_id LEFT JOIN staff a ON a.id = e.auditor_id
      WHERE ${w} AND i.status IN ('Sent','Returned') AND e.request_sent IS NOT NULL AND e.request_sent <= ? AND e.stage <> 'Closed'
      GROUP BY e.id, c.name, a.name ORDER BY e.request_sent`, ...p, T.addDays(T.today(), -14))).map((r) => ({ ...r, days: T.daysBetween(r.request_sent, T.today()) }));
          let fees = null;
          if (FEE_ROLES.has(user.role)) {
            const cur = Math.max(...all.map((e) => e.fiscal_year));
            fees = R.LOCATIONS.map((loc) => {
              const now_ = all.filter((e) => e.location === loc && e.fiscal_year === cur);
              const prior = all.filter((e) => e.location === loc && e.fiscal_year === cur - 1 && now_.some((x) => x.client_id === e.client_id));
              const sum = (rows, f) => money(rows.reduce((s, e) => s + (e[f] || 0), 0));
              return { location: loc, year: cur, jobs: now_.length, fee: sum(now_, "fee"), prior_fee: sum(prior, "fee"), billed: sum(now_, "billed"), paid: sum(now_, "paid") };
            });
          }
          return {
            stages: R.STAGES.filter((s) => s !== "Closed"),
            byLocation: count(open, (e) => e.location),
            byOwner: count(open, (e) => e.owner_name),
            byAuditor: count(open, (e) => e.auditor_name),
            byReviewer: count(open, (e) => e.reviewer_name),
            byJobType: count(open, (e) => e.job_type),
            turnaround,
            overdue,
            fees,
            openCount: open.length
          };
        });
        route("GET", "/api/emails", ({ user, query }) => {
          const [w, p] = scope(user);
          const kind = query.get("kind");
          return db.all(`SELECT m.*, c.name AS client_name, e.fiscal_year FROM email m JOIN engagement e ON e.id = m.engagement_id JOIN client c ON c.id = e.client_id
      WHERE ${w} ${kind ? "AND m.kind = ?" : ""} ORDER BY m.status = 'Scheduled' DESC, m.at DESC, m.id DESC LIMIT 300`, ...p, ...kind ? [kind] : []);
        });
        route("GET", "/api/audit", () => db.all("SELECT l.*, s.name AS staff_name FROM audit_log l LEFT JOIN staff s ON s.id = l.staff_id ORDER BY l.id DESC LIMIT 400"), ADMIN);
        route("POST", "/api/admin/reset-demo", async ({ user }) => {
          await db.tx(async () => {
            await db.lock(4242);
            await resetTables(db);
            await storage.clear();
            await seed(db, { today: opts.today, storage });
          });
          await loadStaff();
          await audit(user, "Reset the demo data", "system", null, "All demo data and files were restored to the starting point.");
          return { ok: true };
        }, ADMIN);
        route("POST", "/api/engagements/:id/documents", async ({ user, params, file, req }) => {
          const e = await loadEng(params.id, user);
          if (!canManageRequests(user, e)) throw new HttpError(403, "Only the auditor, a partner or the admin team can add documents to this job.");
          const direction = req.headers["x-direction"] === "to_client" ? "to_client" : "from_client";
          const itemId = Number(req.headers["x-item-id"]) || null;
          if (itemId && !await db.get("SELECT 1 AS ok FROM request_item WHERE id = ? AND engagement_id = ?", itemId, e.id)) throw new HttpError(400, "That request item is not on this job.");
          await db.tx(async () => {
            if (direction === "to_client") {
              const doc = await saveDocument({
                engagementId: e.id,
                itemId,
                name: file.name,
                buffer: file.buffer,
                clientModified: file.modified,
                staffId: user.id,
                channel: "staff",
                direction,
                ip: clientIp(req)
              });
              await audit(user, "Shared a document with the client", "document", doc.id, doc.original_name);
            } else {
              const doc = await receiveClientFile(e, { itemId, file, staffId: user.id, channel: "staff", ip: clientIp(req) });
              await audit(user, "Added a client document received another way", "document", doc.id, doc.original_name);
            }
          });
          return engagementDetail(e.id, user);
        }, { raw: true });
        route("POST", "/api/engagements/:id/comments", async ({ user, params, body }) => {
          const e = await loadEng(params.id, user);
          const message = text(body.body, 4e3);
          if (!message) throw new HttpError(400, "Write a message first.");
          const itemId = body.item_id ? Number(body.item_id) : null;
          if (itemId && !await db.get("SELECT 1 AS ok FROM request_item WHERE id = ? AND engagement_id = ?", itemId, e.id)) throw new HttpError(400, "That request item is not on this job.");
          const kind = body.internal ? "internal" : "comment";
          await addComment({ engagement_id: e.id, item_id: itemId, author_staff: user.id, kind, body: message });
          await audit(user, kind === "internal" ? "Added an internal note" : "Messaged the client in the portal", "engagement", e.id, message.slice(0, 140));
          return engagementDetail(e.id, user);
        });
        route("GET", "/api/documents/:id/file", async ({ user, params, query, res }) => {
          const d = await db.get("SELECT * FROM document WHERE id = ?", Number(params.id));
          if (!d) throw new HttpError(404, "Document not found.");
          if (user.role === "client") {
            const e = await db.get("SELECT client_id FROM engagement WHERE id = ?", d.engagement_id);
            if (!e || e.client_id !== user.client_id || !await signedAuthorization(user.contact_id)) throw new HttpError(404, "Document not found.");
          } else {
            await loadEng(d.engagement_id, user);
          }
          const bytes = await storage.read(documentKey(d));
          if (!bytes) throw new HttpError(404, "The file is missing from storage.");
          const viewable = d.mime === "application/pdf" || d.mime.startsWith("image/") || d.mime.startsWith("text/");
          const inline = query.get("download") !== "1" && viewable;
          const name = d.mime === "application/pdf" && !/\.pdf$/i.test(d.original_name) ? `${d.original_name}.pdf` : d.original_name;
          await audit(
            user.role === "client" ? null : user,
            user.role === "client" ? "Client opened a document" : "Opened a document",
            "document",
            d.id,
            user.role === "client" ? `${d.original_name} (by ${user.name}, ${user.client_name})` : d.original_name
          );
          res.writeHead(200, {
            "Content-Type": d.mime.startsWith("text/") ? `${d.mime}; charset=utf-8` : d.mime,
            "Content-Disposition": contentDisposition(inline ? "inline" : "attachment", name),
            "Content-Length": bytes.length,
            "Cache-Control": "private, no-store",
            // Allow the app's own preview window to show it, but no other website.
            "X-Frame-Options": "SAMEORIGIN",
            "Content-Security-Policy": "frame-ancestors 'self'"
          });
          res.end(bytes);
        }, { shared: true });
        route("GET", "/api/authorizations/:id/pdf", async ({ user, params, res }) => {
          const a = await db.get("SELECT * FROM portal_authorization WHERE id = ?", Number(params.id));
          if (!a) throw new HttpError(404, "Signed authorization not found.");
          await assertClientVisible(a.client_id, user);
          const client = await db.get("SELECT name FROM client WHERE id = ?", a.client_id);
          sendPdf(res, authorizationPdf(a, client.name), `Portal Authorization - ${a.signer_name}.pdf`);
        });
        route("POST", "/api/contacts/:id/invite", async ({ user, params }) => {
          const ct = await db.get("SELECT * FROM contact WHERE id = ?", Number(params.id));
          if (!ct) throw new HttpError(404, "Contact not found.");
          await assertClientVisible(ct.client_id, user);
          const client = await db.get("SELECT * FROM client WHERE id = ?", ct.client_id);
          const [w, p] = scope(user);
          const e = await db.get(`SELECT e.* FROM engagement e WHERE e.client_id = ? AND ${w} ORDER BY e.fiscal_year DESC LIMIT 1`, ct.client_id, ...p);
          await insertEmail({
            engagement_id: e.id,
            kind: "portal_invite",
            direction: "out",
            from: user.email,
            to: ct.email,
            subject: `Your secure client portal for ${client.name}`,
            body: `Hello ${ct.name.split(" ")[0]},

Leonardo & Company uses a secure client portal to collect documents and answer questions for ${client.name}.

The first time you sign in, you'll be asked to review and sign a short authorization letter. After that you can upload files, answer questions and message us.

Sign in: ${APP_URL}/#/portal (in the real system this is a one-time sign-in link)

${user.name}
Leonardo & Company, CPAs`
          });
          await audit(user, "Invited a contact to the portal (simulated)", "contact", ct.id, `${ct.name} <${ct.email}>`);
          return { ok: true };
        });
        const PROGRESS = {
          Onboarding: "Getting started",
          Admin: "Getting started",
          Auditor: "Collecting your documents",
          Reviewer: "Leonardo is reviewing the work",
          Tax: "Tax return in progress",
          Draft: "Draft report being prepared",
          Final: "Final report being issued"
        };
        function portalEngagements(user) {
          return db.all(`SELECT e.*, s.name AS auditor_name, s.email AS auditor_email FROM engagement e LEFT JOIN staff s ON s.id = e.auditor_id
      WHERE e.client_id = ? AND e.stage <> 'Closed'
        AND (e.request_sent IS NOT NULL OR EXISTS (SELECT 1 FROM document d WHERE d.engagement_id = e.id AND d.direction = 'to_client'))
      ORDER BY e.fiscal_year DESC`, user.client_id);
        }
        async function portalHome(user) {
          const client = await db.get("SELECT id, name, fye FROM client WHERE id = ?", user.client_id);
          const auth = await signedAuthorization(user.contact_id);
          const engagements = [];
          for (const e of await portalEngagements(user)) {
            const documents = await docsFor(e.id, true);
            const comments = await commentsFor(e.id, true);
            const all = await db.all("SELECT id, key, text, status, note, updated_at FROM request_item WHERE engagement_id = ? ORDER BY id", e.id);
            const items = all.map((i, n) => ({ ...i, number: n + 1 })).filter((i) => i.status !== "Draft").map((i) => ({ ...i, client_status: clientStatus(i, documents, comments) }));
            engagements.push({
              id: e.id,
              fiscal_year: e.fiscal_year,
              job_type: e.job_type,
              progress: PROGRESS[e.stage] || e.stage,
              year_end: R.fyeLabel(client.fye, e.fiscal_year),
              auditor_name: e.auditor_name,
              auditor_email: e.auditor_email,
              request_sent: e.request_sent,
              items,
              documents,
              comments
            });
          }
          return {
            me: user,
            client,
            authorization: auth ? { id: auth.id, letter_version: auth.letter_version, letter_sha256: auth.letter_sha256, signer_name: auth.signer_name, signer_title: auth.signer_title, signed_at: auth.signed_at } : null,
            engagements
          };
        }
        async function portalEngagement(id, user) {
          const e = (await portalEngagements(user)).find((x) => x.id === Number(id));
          if (!e) throw new HttpError(404, "Not found.");
          return e;
        }
        async function portalItem(id, user) {
          const item = await db.get("SELECT * FROM request_item WHERE id = ?", Number(id));
          if (!item || item.status === "Draft") throw new HttpError(404, "Not found.");
          return { item, e: await portalEngagement(item.engagement_id, user) };
        }
        route("GET", "/api/portal/me", async ({ user }) => {
          const client = await db.get("SELECT id, name FROM client WHERE id = ?", user.client_id);
          const auth = await signedAuthorization(user.contact_id);
          return {
            me: user,
            client,
            authorization: auth ? { id: auth.id, signed_at: auth.signed_at, signer_name: auth.signer_name, letter_version: auth.letter_version } : null,
            letter: { version: A.LETTER_VERSION, date: A.LETTER_DATE, draft_notice: A.DRAFT_NOTICE, sections: A.letterSections(client.name), sha256: A.fingerprint(A.letterText(client.name)) }
          };
        }, { portal: true, beforeSigning: true });
        route("POST", "/api/portal/authorization", async ({ user, body, req }) => {
          if (await signedAuthorization(user.contact_id)) throw new HttpError(409, "You have already signed the current authorization letter.");
          if (body.agree !== true || body.authority !== true) throw new HttpError(400, "Please tick both boxes to confirm you agree and are authorized to sign.");
          const name = text(body.signer_name, 120);
          const title = text(body.signer_title, 80);
          const norm = (s) => s.toLowerCase().replace(/[^a-z]/g, "");
          if (!name || norm(name) !== norm(user.name)) throw new HttpError(400, `Type your full name as Leonardo has it on file: ${user.name}.`);
          if (!title) throw new HttpError(400, "Enter your title or role, for example Treasurer.");
          const client = await db.get("SELECT name FROM client WHERE id = ?", user.client_id);
          const letter = A.letterText(client.name);
          const fp = A.fingerprint(letter);
          await db.run(`INSERT INTO portal_authorization (client_id, contact_id, letter_version, letter_text, letter_sha256, signer_name, signer_title, signed_at, ip, user_agent)
      VALUES (?,?,?,?,?,?,?,?,?,?)`, user.client_id, user.contact_id, A.LETTER_VERSION, letter, fp, name, title, T.now(), clientIp(req), text(req.headers["user-agent"], 300));
          await audit(null, "Client signed the portal authorization", "contact", user.contact_id, `${name}, ${title} (${client.name}): version ${A.LETTER_VERSION}, fingerprint ${fp.slice(0, 16)}`);
          return portalHome(user);
        }, { portal: true, beforeSigning: true });
        route("GET", "/api/portal/authorization/pdf", async ({ user, res }) => {
          const a = await signedAuthorization(user.contact_id);
          if (!a) throw new HttpError(404, "You have not signed the authorization letter yet.");
          sendPdf(res, authorizationPdf(a, user.client_name), `Portal Authorization - ${a.signer_name}.pdf`);
        }, { portal: true, beforeSigning: true });
        route("GET", "/api/portal/home", ({ user }) => portalHome(user), { portal: true });
        route("POST", "/api/portal/items/:id/upload", async ({ user, params, file, req }) => {
          const { item, e } = await portalItem(params.id, user);
          await db.tx(async () => {
            const doc = await receiveClientFile(e, { itemId: item.id, file, contactId: user.contact_id, channel: "portal", ip: clientIp(req) });
            await audit(null, "Client uploaded a document", "document", doc.id, `${doc.original_name} for "${item.text}" (by ${user.name}, ${user.client_name})`);
          });
          return portalHome(user);
        }, { portal: true, raw: true });
        route("POST", "/api/portal/engagements/:id/upload", async ({ user, params, file, req }) => {
          const e = await portalEngagement(params.id, user);
          await db.tx(async () => {
            const doc = await receiveClientFile(e, { file, contactId: user.contact_id, channel: "portal", ip: clientIp(req) });
            await audit(null, "Client uploaded a document", "document", doc.id, `${doc.original_name}, not tied to an item (by ${user.name}, ${user.client_name})`);
          });
          return portalHome(user);
        }, { portal: true, raw: true });
        route("POST", "/api/portal/items/:id/comments", async ({ user, params, body }) => {
          const { item, e } = await portalItem(params.id, user);
          const kind = ["comment", "answer", "not_applicable", "eta"].includes(body.kind) ? body.kind : "comment";
          let message = text(body.body, 4e3);
          let eta = null;
          if (kind === "eta") {
            if (!isDate(body.eta_date) || body.eta_date < T.today()) throw new HttpError(400, "Pick a date from today onward.");
            eta = body.eta_date;
            if (!message) message = "We will send this by the date shown.";
          }
          if (!message) throw new HttpError(400, kind === "not_applicable" ? "Tell us briefly why this does not apply." : "Write your answer or comment first.");
          await addComment({ engagement_id: e.id, item_id: item.id, author_contact: user.contact_id, kind, eta_date: eta, body: message });
          const label = { comment: "commented on", answer: "answered", not_applicable: 'said "does not apply" to', eta: `promised a date (${eta}) for` }[kind];
          await audit(null, "Client responded to a request item", "engagement", e.id, `${user.name} ${label} "${item.text}"`);
          return portalHome(user);
        }, { portal: true });
        route("POST", "/api/portal/engagements/:id/messages", async ({ user, params, body }) => {
          const e = await portalEngagement(params.id, user);
          const message = text(body.body, 4e3);
          if (!message) throw new HttpError(400, "Write a message first.");
          await addComment({ engagement_id: e.id, author_contact: user.contact_id, body: message });
          await audit(null, "Client sent a message", "engagement", e.id, `${user.name} (${user.client_name}): ${message.slice(0, 120)}`);
          return portalHome(user);
        }, { portal: true });
        async function currentUser(req) {
          const s = readToken(getCookie(req, "sid"));
          if (!s) return null;
          if (s.k === "client") {
            const ct = await db.get("SELECT * FROM contact WHERE id = ?", s.id);
            return ct ? contactUser(ct) : null;
          }
          const st = staff[s.id];
          return st ? { id: st.id, kind: "staff", name: st.name, role: st.role, title: st.title, email: st.email } : null;
        }
        async function contactUser(ct) {
          const client = await db.get("SELECT id, name FROM client WHERE id = ?", ct.client_id);
          return { id: ct.id, kind: "client", role: "client", contact_id: ct.id, client_id: client.id, client_name: client.name, name: ct.name, title: ct.role, email: ct.email };
        }
        function clientIp(req) {
          if (process.env.VERCEL) {
            const fwd = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim();
            if (fwd) return fwd;
          }
          return String(req.socket && req.socket.remoteAddress || "").replace(/^::ffff:/, "");
        }
        function readBody(req, limit, tooBig) {
          return new Promise((resolve, reject) => {
            let size = 0;
            const chunks = [];
            req.on("data", (c) => {
              size += c.length;
              if (size > limit) {
                reject(new HttpError(413, tooBig));
                req.destroy();
              } else chunks.push(c);
            });
            req.on("end", () => resolve(import_buffer.Buffer.concat(chunks)));
            req.on("error", reject);
          });
        }
        const readRaw = (req) => readBody(req, MAX_BYTES, `Files must be ${MAX_MB} MB or smaller.`);
        async function readJson(req) {
          const buf = await readBody(req, 1e6, "Request too large.");
          try {
            return buf.length ? JSON.parse(buf.toString("utf8")) : {};
          } catch {
            throw new HttpError(400, "Invalid JSON.");
          }
        }
        function sendJson(res, status, data) {
          res.writeHead(status, { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" });
          res.end(JSON.stringify(data));
        }
        function serveStatic(pathname, res) {
          let rel;
          try {
            rel = pathname === "/" ? "index.html" : decodeURIComponent(pathname).replace(/^\/+/, "");
          } catch {
            rel = "";
          }
          const file = path2.normalize(path2.join(PUBLIC_DIR, rel));
          if (!file.startsWith(PUBLIC_DIR + path2.sep)) {
            res.writeHead(404);
            return res.end("Not found");
          }
          fs2.readFile(file, (err, data) => {
            if (err) {
              res.writeHead(404);
              return res.end("Not found");
            }
            res.writeHead(200, { "Content-Type": MIME[path2.extname(file).toLowerCase()] || "application/octet-stream", "Cache-Control": "no-cache" });
            res.end(data);
          });
        }
        const misses = /* @__PURE__ */ new Map();
        const GATE_OPEN = /* @__PURE__ */ new Set(["/site-login", "/site-logout", "/favicon.svg", "/leonardo_logo.png", "/fonts/Montserrat-Regular.ttf", "/fonts/Montserrat-Bold.ttf", "/robots.txt"]);
        const gateTag = crypto.createHmac("sha256", KEY).update(`site-gate:${SITE_PASSWORD}`).digest("base64url").slice(0, 22);
        const passedGate = (req) => {
          if (!SITE_PASSWORD) return true;
          const pass = readToken(getCookie(req, "site"));
          return !!pass && pass.gate === gateTag;
        };
        function gatePage(res, status, message) {
          const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
          res.writeHead(status, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" });
          res.end(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Leonardo Practice Hub (demo)</title><link rel="icon" href="/favicon.svg" type="image/svg+xml">
<style>
@font-face{font-family:Montserrat;src:url(/fonts/Montserrat-Regular.ttf);font-weight:400}@font-face{font-family:Montserrat;src:url(/fonts/Montserrat-Bold.ttf);font-weight:700}
:root{--navy:#133269;--teal:#267D9E;--sky:#319BC3;--royal:#447FE5;--ai:#EAF4F8;--ink:#333333;--muted:#555555;--grey:#CCCCCC;--grey-l:#F5F5F5}
*{box-sizing:border-box}body{margin:0;font-family:Montserrat,'Segoe UI',Arial,sans-serif;background:var(--grey-l);color:var(--ink);display:grid;place-items:center;min-height:100vh;padding:16px}
.card{width:100%;max-width:420px;background:#FFFFFF;border-radius:10px;box-shadow:0 2px 12px rgba(19,50,105,.12);overflow:hidden}
.top{background:linear-gradient(to right,#133269 2%,#267D9E 46%,#319BC3 81%);padding:22px 24px;color:#FFFFFF}.top img{height:38px;display:block;margin-bottom:12px}
.top b{font-size:18px}.body{padding:22px 24px}label{display:block;font-weight:700;color:var(--navy);font-size:13px;margin-bottom:6px}
input{width:100%;padding:10px 12px;border:1px solid var(--grey);border-radius:6px;font:inherit}input:focus{outline:2px solid var(--sky)}
button{margin-top:14px;width:100%;padding:11px;border:0;border-radius:6px;background:var(--navy);color:#FFFFFF;font:inherit;font-weight:700;cursor:pointer}
button:hover{background:var(--teal)}.msg{background:var(--ai);border-left:4px solid var(--navy);padding:8px 12px;font-size:13px;margin-bottom:14px;color:var(--navy)}
.small{font-size:12px;color:var(--muted);margin-top:14px;line-height:1.5}
</style></head><body><main class="card"><div class="top"><img src="/leonardo_logo.png" alt="Leonardo &amp; Company"><b>Practice Hub: proof of concept</b></div>
<div class="body">${message ? `<div class="msg" role="alert">${esc(message)}</div>` : ""}
<form method="post" action="/site-login"><label for="pw">Demo password</label><input id="pw" name="password" type="password" autocomplete="current-password" required autofocus>
<button type="submit">Enter the demo</button></form>
<p class="small">This demo contains made-up data only. Please don't upload real client documents.</p></div></main></body></html>`);
        }
        async function handleGate(req, res, url) {
          if (url.pathname === "/site-logout") {
            res.writeHead(303, { Location: "/", "Set-Cookie": `site=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0${secureFlag(req)}` });
            return res.end();
          }
          if (req.method !== "POST") return gatePage(res, 200, "");
          const ip = clientIp(req);
          const m = misses.get(ip);
          if (m && m.count >= 5 && Date.now() < m.until) return gatePage(res, 429, "Too many tries. Please wait 15 minutes and try again.");
          const form = new URLSearchParams((await readBody(req, 4096, "Too long.")).toString("utf8"));
          if (crypto.timingSafeEqual(sha(form.get("password") || ""), sha(SITE_PASSWORD))) {
            misses.delete(ip);
            const token = signToken({ gate: gateTag, exp: Date.now() + GATE_DAYS * 864e5 });
            res.writeHead(303, { Location: "/", "Set-Cookie": `site=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=${GATE_DAYS * 86400}${secureFlag(req)}` });
            return res.end();
          }
          misses.set(ip, { count: (m && Date.now() < m.until ? m.count : 0) + 1, until: Date.now() + 15 * 6e4 });
          return gatePage(res, 401, "That password is not right. Please try again.");
        }
        async function handle(req, res) {
          res.setHeader("X-Content-Type-Options", "nosniff");
          res.setHeader("X-Frame-Options", "DENY");
          res.setHeader("Referrer-Policy", "no-referrer");
          res.setHeader("Content-Security-Policy", "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; frame-ancestors 'none'");
          if (SITE_PASSWORD) res.setHeader("X-Robots-Tag", "noindex, nofollow");
          try {
            const url = new URL(req.url, "http://localhost");
            if (url.pathname === "/robots.txt") {
              res.writeHead(200, { "Content-Type": "text/plain" });
              return res.end("User-agent: *\nDisallow: /\n");
            }
            if (SITE_PASSWORD && (url.pathname === "/site-login" || url.pathname === "/site-logout")) return await handleGate(req, res, url);
            if (!passedGate(req) && !GATE_OPEN.has(url.pathname)) {
              if (url.pathname.startsWith("/api/")) throw new HttpError(401, "Enter the demo password first.", { gate: true });
              return gatePage(res, 200, "");
            }
            if (!url.pathname.startsWith("/api/")) return serveStatic(url.pathname, res);
            await maybeRunScheduler();
            let match = null;
            const r = routes.find((x) => x.method === req.method && (match = x.re.exec(url.pathname)));
            if (!r) throw new HttpError(404, "Not found.");
            const user = await currentUser(req);
            if (!r.options.public && !user) throw new HttpError(401, "Please sign in.");
            if (user && !r.options.public) {
              if (r.options.portal && user.role !== "client") throw new HttpError(403, "This is the client portal. Staff use the main app.");
              if (!r.options.portal && !r.options.shared && user.role === "client") throw new HttpError(403, "Clients can only use the client portal.");
              if (r.options.portal && !r.options.beforeSigning && !await signedAuthorization(user.contact_id)) {
                throw new HttpError(403, "Please review and sign the portal authorization letter first.");
              }
            }
            if (r.options.roles && !r.options.roles.includes(user.role)) throw new HttpError(403, "Your role does not have access to this.");
            let body = {};
            let file = null;
            if (req.method !== "GET") {
              if (r.options.raw) {
                if (!req.headers["x-file-name"]) throw new HttpError(400, "The upload is missing its file name.");
                let name;
                try {
                  name = decodeURIComponent(req.headers["x-file-name"]);
                } catch {
                  throw new HttpError(400, "The file name could not be read.");
                }
                file = { name, buffer: await readRaw(req), modified: req.headers["x-file-modified"] ? T.fromDate(req.headers["x-file-modified"]) : null, headers: req.headers };
              } else {
                if (!/^application\/json/.test(req.headers["content-type"] || "")) throw new HttpError(415, "Requests must be sent as JSON.");
                body = await readJson(req);
              }
            }
            const out = await r.handler({ req, res, user, params: match.groups || {}, query: url.searchParams, body, file });
            if (out !== void 0 && !res.headersSent) sendJson(res, 200, out);
          } catch (e) {
            const status = e.status || 500;
            if (status === 500) console.error(e);
            if (!res.headersSent) sendJson(res, status, { error: status === 500 ? "Something went wrong on the server." : e.message, ...e.extra || {} });
          }
        }
        const server = http2.createServer(handle);
        const timer = opts.timer ? setInterval(() => {
          runScheduler().catch((err) => console.error("Scheduler error:", err.message));
        }, 5e3) : null;
        if (timer) timer.unref();
        return {
          server,
          handle,
          db,
          storage,
          runScheduler,
          uploadDir,
          close: async () => {
            if (timer) clearInterval(timer);
            server.close();
            await db.close();
            if (ownsUploadDir) fs2.rmSync(uploadDir, { recursive: true, force: true });
          }
        };
      }
      if (__require.main === module) {
        (async () => {
          const dataDir = process.env.HUB_DATA_DIR || path2.join(process.env.LOCALAPPDATA || path2.join(os2.homedir(), ".local", "share"), "LeonardoPracticeHub");
          fs2.mkdirSync(dataDir, { recursive: true });
          const dbFile = path2.join(dataDir, "practice-hub.db");
          const uploadDir = path2.join(dataDir, "uploads");
          if (process.argv.includes("--reset") && fs2.existsSync(dbFile)) {
            fs2.unlinkSync(dbFile);
            console.log("Demo data reset.");
          }
          const port = Number(process.env.PORT) || 3e3;
          const app2 = await createApp2({ dbFile, uploadDir, timer: true, sitePassword: process.env.SITE_PASSWORD });
          console.log(`Demo data and uploaded files are stored in: ${dataDir}`);
          app2.server.on("error", (err) => {
            if (err.code === "EADDRINUSE") {
              console.error(`
Port ${port} is already in use. Either the Practice Hub is already running`);
              console.error("(check your other windows), or another program has that port.");
              console.error("To use a different port in PowerShell:  $env:PORT=3080; node server.js\n");
              process.exit(1);
            }
            throw err;
          });
          app2.server.listen(port, "127.0.0.1", () => {
            const ipv6 = http2.createServer(app2.handle);
            ipv6.on("error", () => {
            });
            ipv6.listen(port, "::1");
            console.log("\nLeonardo Practice Hub (proof of concept) is running.");
            console.log(`Open http://localhost:${port} in your browser. Keep this window open while you use it.`);
            console.log("Press Ctrl+C here to stop.\n");
          });
        })().catch((err) => {
          console.error(err);
          process.exit(1);
        });
      }
      module.exports = { createApp: createApp2 };
    }
  });

  // static/sw-entry.js
  init_globals();
  var import_server = __toESM(require_server());
  init_sqlite();
  importScripts("vendor/sql-wasm.js");
  var BASE = new URL(self.registration.scope).pathname;
  var DB_NAME = "practice-hub-demo";
  var idbPromise = null;
  function idb() {
    idbPromise = idbPromise || new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => {
        req.result.createObjectStore("meta");
        req.result.createObjectStore("files");
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    return idbPromise;
  }
  async function idbDo(store, mode, fn) {
    const db = await idb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(store, mode);
      const req = fn(tx.objectStore(store));
      tx.oncomplete = () => resolve(req && req.result);
      tx.onerror = () => reject(tx.error);
      tx.onabort = () => reject(tx.error || new Error("Browser storage write was cancelled (is the disk full?)."));
    });
  }
  var idbGet = (store, key) => idbDo(store, "readonly", (s) => s.get(key));
  var idbPut = (store, key, value) => idbDo(store, "readwrite", (s) => s.put(value, key));
  var idbClear = (store) => idbDo(store, "readwrite", (s) => s.clear());
  var browserStorage = {
    kind: "browser",
    async save(key, buffer) {
      await idbPut("files", key, new Uint8Array(buffer));
    },
    async read(key) {
      const v = await idbGet("files", key);
      return v ? import_buffer.Buffer.from(v) : null;
    },
    async clear() {
      await idbClear("files");
    }
  };
  var jar = /* @__PURE__ */ new Map();
  var cookieHeader = () => [...jar].map(([k, v]) => `${k}=${v}`).join("; ");
  async function rememberCookies(setCookie) {
    if (!setCookie) return;
    for (const line of [].concat(setCookie)) {
      const [pair, ...attrs] = String(line).split(";");
      const eq = pair.indexOf("=");
      const name = pair.slice(0, eq).trim();
      const value = pair.slice(eq + 1).trim();
      const expired = attrs.some((a) => /^\s*max-age\s*=\s*0\s*$/i.test(a));
      if (!value || expired) jar.delete(name);
      else jar.set(name, value);
    }
    await idbPut("meta", "cookies", Object.fromEntries(jar));
  }
  var app = null;
  var starting = null;
  function start() {
    starting = starting || (async () => {
      const SQL2 = await initSqlJs({ locateFile: (file) => `vendor/${file}` });
      useSqlJs(SQL2);
      startFrom(await idbGet("meta", "database"));
      jar = new Map(Object.entries(await idbGet("meta", "cookies") || {}));
      app = await (0, import_server.createApp)({ dbFile: ":memory:", storage: browserStorage, hosted: true, clientGate: true });
      await saveIfChanged();
      return app;
    })().catch((err) => {
      starting = null;
      throw err;
    });
    return starting;
  }
  async function saveIfChanged() {
    const db = currentDatabase();
    if (db && db.dirty) await idbPut("meta", "database", db.export());
  }
  function fakeRequest(method, url, headers, body) {
    const listeners = {};
    let sent = false;
    return {
      method,
      url,
      headers,
      socket: { remoteAddress: "127.0.0.1" },
      on(event, fn) {
        (listeners[event] = listeners[event] || []).push(fn);
        if (event === "end" && !sent) {
          sent = true;
          queueMicrotask(() => {
            if (body && body.length) (listeners.data || []).forEach((f) => f(body));
            (listeners.end || []).forEach((f) => f());
          });
        }
        return this;
      },
      destroy() {
      }
    };
  }
  function fakeResponse() {
    let finish;
    const done = new Promise((resolve) => {
      finish = resolve;
    });
    const headers = {};
    const chunks = [];
    const toBuffer = (c) => typeof c === "string" ? import_buffer.Buffer.from(c, "utf8") : import_buffer.Buffer.from(c);
    const res = {
      statusCode: 200,
      headersSent: false,
      setHeader(k, v) {
        headers[k.toLowerCase()] = v;
        return res;
      },
      getHeader(k) {
        return headers[k.toLowerCase()];
      },
      removeHeader(k) {
        delete headers[k.toLowerCase()];
      },
      writeHead(status, h) {
        res.statusCode = status;
        for (const [k, v] of Object.entries(h || {})) headers[k.toLowerCase()] = v;
        res.headersSent = true;
        return res;
      },
      write(chunk) {
        chunks.push(toBuffer(chunk));
        return true;
      },
      end(chunk) {
        if (chunk !== void 0 && chunk !== null) chunks.push(toBuffer(chunk));
        res.headersSent = true;
        finish({ status: res.statusCode, headers, body: import_buffer.Buffer.concat(chunks) });
      },
      on() {
        return res;
      },
      once() {
        return res;
      }
    };
    return { res, done };
  }
  async function answer(request, path2) {
    await start();
    const headers = {};
    request.headers.forEach((v, k) => {
      headers[k] = v;
    });
    headers.cookie = cookieHeader();
    const body = request.method === "GET" || request.method === "HEAD" ? null : import_buffer.Buffer.from(await request.arrayBuffer());
    const { res, done } = fakeResponse();
    await app.handle(fakeRequest(request.method, path2, headers, body), res);
    const out = await done;
    await rememberCookies(out.headers["set-cookie"]);
    await saveIfChanged();
    const responseHeaders = new Headers();
    for (const [k, v] of Object.entries(out.headers)) {
      if (k === "set-cookie" || k === "content-length") continue;
      responseHeaders.set(k, String(v));
    }
    const empty = out.status === 204 || out.status === 304 || request.method === "HEAD";
    return new Response(empty ? null : out.body, { status: out.status, headers: responseHeaders });
  }
  var queue = Promise.resolve();
  function inTurn(fn) {
    const turn = queue.then(fn, fn);
    queue = turn.catch(() => {
    });
    return turn;
  }
  async function safely(request, path2) {
    try {
      return await inTurn(() => answer(request, path2));
    } catch (err) {
      console.error("Practice Hub demo error:", err);
      return new Response(
        JSON.stringify({ error: `The demo hit a problem in this browser: ${err.message}` }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  }
  async function leave() {
    jar.clear();
    await idbPut("meta", "cookies", {});
    const html = '<!doctype html><meta charset="utf-8"><title>Leaving the demo</title><script>try { localStorage.removeItem("hub-gate"); } catch (e) {} location.replace("./");<\/script>';
    return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
  }
  self.addEventListener("install", () => self.skipWaiting());
  self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));
  self.addEventListener("message", (event) => {
    if (event.data === "warm-up") event.waitUntil(start().catch(() => {
    }));
  });
  self.addEventListener("fetch", (event) => {
    const url = new URL(event.request.url);
    if (url.origin !== self.location.origin || !url.pathname.startsWith(BASE)) return;
    const path2 = `/${url.pathname.slice(BASE.length)}`;
    if (path2 === "/site-logout") return event.respondWith(leave());
    if (!path2.startsWith("/api/")) return;
    event.respondWith(safely(event.request, path2 + url.search));
  });
})();
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)
*/
