import io from 'socket.io-client'

export default class RestSocket {
	constructor(url, options = {}) {
		this.io = io(url, options)
		this.cbs = []

		this.io.on('rest', (data) => {
			this.cbs[data.guid](data)
			delete this.cbs[data.guid]
		})
	}
	on(msg, cb) {
		this.io.on(msg, (data) => {
			cb(data)
		})
	}
	get(url, params = {}, query = {}) { 
		return this.request("get", url, params, query)
	}
	post(url, params = {}, query = {}) {
		return this.request("post", url, params, query)
	}
	put(url, params = {}, query = {}) {
		return this.request("put", url, params, query)
	}
	delete(url = {}, params = {}, query = {}) {
		return this.request("delete", url, params, query)
	}
	request(method = "get", url, params = {}, query = {}) {
		return new Promise((resolve, reject) => {
			let guid = generateGuid()
			this.io.emit('rest', {url: url, method: method, body: params, query: query, guid: guid})
			this.cbs[guid] = (data) => {
				if(data.success) {
					resolve(data)
				} else {
					reject(data)
				}
			}
		})
	}
}

function generateGuid() {
	var d = new Date().getTime()

	var guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = (d + Math.random()*16)%16 | 0
		d = Math.floor(d/16)
		return (c=='x' ? r : (r&0x3|0x8)).toString(16)
	})
	return guid
}
