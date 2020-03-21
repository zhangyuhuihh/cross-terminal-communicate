import loadStopMethod from '../utils/load_stop_method.js' // 装载关闭方法
import resolveParams from '../utils/resolve_params.js'
// websocket
export function ws(config, callback) {
  const url = 'ws://' + config.url + resolveParams(config)
  const ws = new WebSocket(url)
  ws.onmessage = event => {
    callback(event.data)
  }
  ws.onerror = (event) => {
    callback(event.data)
    console.log('websocket连接发生错误')
  }
  loadStopMethod.call(this, ws.close)
}

// 长轮询
export function lc(config, callback) {
  const CancelToken = axios.CancelToken
  let _this = this
  const longConnect = (cf, cb) => {
    axios({
      ...cf,
      cancelToken: new CancelToken(function executor(c) {
        loadStopMethod.call(_this, c)
      })
    })
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
  const resolveEvent = event => {
    callback(event.data)
  }
  window.addEventListener('message', resolveEvent)
  loadStopMethod.call(this, () => {
    window.removeEventListener('message', resolveEvent)
  })
}
