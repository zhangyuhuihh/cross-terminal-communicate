// 发送的消息是http请求
export function http(config, callback) {
  axios(config)
    .then(result => {
      const body = result.data
      switch (body.code) {
        case 'success':
          callback(body)
          return
        default:
          return Promise.reject(body)
      }
    })
    .catch(Error => {
      callback(body)
    })
}

// 发送的消息通过postMessage
export function pm(config, callback) {
  config.targetWindow.postMessage(config.data)
}
