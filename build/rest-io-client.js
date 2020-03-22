import io from 'socket.io-client';

var GET = 'get';
var POST = 'post';
var PUT = 'put';
var DELETE = 'delete';
var REST = 'rest';
var RestSocket = /** @class */ (function () {
    function RestSocket(url, options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        this.cbs = {};
        this.io = io(url, options);
        this.io.on(REST, function (data) {
            _this.cbs[data.guid](data);
            delete _this.cbs[data.guid];
        });
    }
    RestSocket.prototype.on = function (msg, cb) {
        this.io.on(msg, function (data) {
            cb(data);
        });
    };
    RestSocket.prototype.get = function (url, params, query) {
        if (params === void 0) { params = {}; }
        if (query === void 0) { query = {}; }
        return this.request(GET, url, params, query);
    };
    RestSocket.prototype.post = function (url, params, query) {
        if (params === void 0) { params = {}; }
        if (query === void 0) { query = {}; }
        return this.request(POST, url, params, query);
    };
    RestSocket.prototype.put = function (url, params, query) {
        if (params === void 0) { params = {}; }
        if (query === void 0) { query = {}; }
        return this.request(PUT, url, params, query);
    };
    RestSocket.prototype["delete"] = function (url, params, query) {
        if (params === void 0) { params = {}; }
        if (query === void 0) { query = {}; }
        return this.request(DELETE, url, params, query);
    };
    RestSocket.prototype.request = function (method, url, params, query) {
        var _this = this;
        if (method === void 0) { method = GET; }
        if (params === void 0) { params = {}; }
        if (query === void 0) { query = {}; }
        return new Promise(function (resolve, reject) {
            var guid = generateGuid();
            _this.io.emit(REST, { url: url, method: method, body: params, query: query, guid: guid });
            var cb = function (data) {
                if (data.success) {
                    resolve(data);
                }
                else {
                    reject(data);
                }
            };
            _this.cbs[guid] = cb;
        });
    };
    return RestSocket;
}());
var generateGuid = function () {
    var d = new Date().getTime();
    var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return guid;
};

export default RestSocket;
