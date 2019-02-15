"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _socket = _interopRequireDefault(require("socket.io-client"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var RestSocket =
/*#__PURE__*/
function () {
  function RestSocket(url) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, RestSocket);

    this.io = (0, _socket.default)(url, options);
    this.cbs = [];
    this.io.on('rest', function (data) {
      _this.cbs[data.guid](data);

      delete _this.cbs[data.guid];
    });
  }

  _createClass(RestSocket, [{
    key: "on",
    value: function on(msg, cb) {
      this.io.on(msg, function (data) {
        cb(data);
      });
    }
  }, {
    key: "get",
    value: function get(url) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request("get", url, params, query);
    }
  }, {
    key: "post",
    value: function post(url) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request("post", url, params, query);
    }
  }, {
    key: "put",
    value: function put(url) {
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request("put", url, params, query);
    }
  }, {
    key: "delete",
    value: function _delete() {
      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var query = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.request("delete", url, params, query);
    }
  }, {
    key: "request",
    value: function request() {
      var _this2 = this;

      var method = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "get";
      var url = arguments.length > 1 ? arguments[1] : undefined;
      var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var query = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      return new Promise(function (resolve, reject) {
        var guid = generateGuid();

        _this2.io.emit('rest', {
          url: url,
          method: method,
          body: params,
          query: query,
          guid: guid
        });

        _this2.cbs[guid] = function (data) {
          if (data.success) {
            resolve(data);
          } else {
            reject(data);
          }
        };
      });
    }
  }]);

  return RestSocket;
}();

exports.default = RestSocket;

function generateGuid() {
  var d = new Date().getTime();
  var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : r & 0x3 | 0x8).toString(16);
  });
  return guid;
}