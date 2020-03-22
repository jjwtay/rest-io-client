import io from 'socket.io-client'

const GET = 'get'
const POST = 'post'
const PUT = 'put'
const DELETE = 'delete'
const REST = 'rest'

interface RestResponse {
	success: boolean
}

type RequestTypes = typeof GET | typeof POST | typeof PUT | typeof DELETE

export default class RestSocket {

    io: SocketIOClient.Socket
    cbs: Record<string, (data: any) => void> = {}

	constructor (url, options = {}) {
		this.io = io(url, options)

		this.io.on(REST, (data) => {
			this.cbs[data.guid](data)
			delete this.cbs[data.guid]
		})
	}
	on(msg: string, cb: (val: any) => void) {
		this.io.on(msg, (data) => {
			cb(data)
		})
	}

	get<GetResponse extends  RestResponse>(url: string, params = {}, query = {}) { 
		return this.request<GetResponse>(GET, url, params, query)
	}

	post<PostResponse extends RestResponse>(url: string, params = {}, query = {}) {
		return this.request<PostResponse>(POST, url, params, query)
	}

	put<PutResponse extends RestResponse>(url: string, params = {}, query = {}) {
		return this.request<PutResponse>(PUT, url, params, query)
	}

	delete<DeleteResponse extends RestResponse>(url, params = {}, query = {}) {
		return this.request<DeleteResponse>(DELETE, url, params, query)
	}

	request<T extends RestResponse>(method: RequestTypes = GET, url: string, params = {}, query = {}) {
		return new Promise<T>((resolve, reject) => {
			let guid = generateGuid()
			this.io.emit(REST, { url, method, body: params, query, guid })
			
			const cb = (data: T) => {
				if(data.success) {
					resolve(data)
				} else {
					reject(data)
				}
			}
			this.cbs[guid] = cb
		})
	}
}

const generateGuid = () => {
	let d = new Date().getTime()

	const guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		const r = (d + Math.random()*16)%16 | 0
		d = Math.floor(d/16)
		return (c=='x' ? r : (r&0x3|0x8)).toString(16)
	})
	return guid
}
