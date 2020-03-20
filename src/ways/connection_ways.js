// import axios from '../node_modules/axios'

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

export function ls(config, callback) {
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


export function pm(config, callback) {
  window.addEventListener('message', (event) => {
    callback(event.data)
  })
}