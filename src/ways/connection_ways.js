// websocket
export function ws(config, callback) {
  const url = 'ws://' + config.url || ''
  const ws = new WebSocket(url)
  ws.onmessage = event => {
    callback(event.data)
  }
  ws.onclose = () => {
    console.log('websocket连接已关闭')
  }
  ws.onerror = () => {
    console.log('websocket连接发生错误')
  }
}

// 长轮询
export function lc(config, callback) {
  const longConnect = (cf, cb) => {
    axios(cf)
      .then(result => {
        const body = result.data
        if (body.code === 'success') {
          cb(body.data)
          longConnect(cf, cb)
        } else {
          return Promise.reject(body.message)
        }
      })
      .catch(Error => {
        cb(Error)
      })
  }
  let newConfig = {
    ...config,
    url: 'http://' + config.url
  }
  longConnect(newConfig, callback)
}

// postMessage
export function pm(config, callback) {
  window.addEventListener('message', (event) => {
    callback(event.data)
  })
}