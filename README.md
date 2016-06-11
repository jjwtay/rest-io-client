# rest-io-client

## Client es6 class for Promise based websocket requests to server implementing rest-io-router

## Installation &nbsp;
**With [node](http://nodejs.org) [installed]:**
```sh

$ npm install rest-io-client --save
```

## Usage 

```sh
	import RestSocket from 'rest-io-client'

	/*
		class RestSocket

		params:
			url: required
			options: optional socket.io options object
	*/
	var socket = new RestSocket(url)

	socket.get("/users").then(data => {
		...
	})
```

## API 

```sh
	get(url[, params, query]).then(data => {..}).catch(err => {...})
	post(url[, params, query]).then(data => {..}).catch(err => {...})
	put(url[, params, query]).then(data => {..}).catch(err => {...})
	delete(url[, params, query]).then(data => {..}).catch(err => {...})

	*Note*
	params = any valid js object
	query = any valid js object
```

### url may also contain query strings as below

```sh
	get("/users?id=foo").then(.....
```

### Emitting/Receiving via socket.io 

```sh
	import RestSocket from 'rest-io-client'

	var socket = new RestSocket(url)

	socket.on('foo', msg => {...})
	socket.emit('bar', data)

	*Note Reserved for Promise based API*
	socket.on('rest',...
	socket.emit('rest',...
```