import { clientSendMessage, clientOnMessage } from './client/index'
import { serverSendMessage, serverOnMessage } from './server/index'

const loop = () => {}

class CrossIO {
  constructor() {
    this.stopConnectionFn = loop
  }

  /**发送方法，发送端
   * @param  {Object} config 如果是http,和axios中config保持一致
   * @param  {Function} callback 调用方法传入的回调函数，参数为返回体(http请求时)
   * @param  {String} type http || pm http：使用http请求， pm: postMessage形式 不传默认走http
   */
  sendMessage(config, callback, type) {
    if (window) {
      // 运行在浏览器端
      clientSendMessage(config, callback, type)
    } else {
      // 运行在服务器端
      serverSendMessage(config, callback)
    }
  }

  /**监听方法
   * @param {Object} config 必传url, 如要携带参数，使用params
   * @param  {Function} callback 监听到数据的时候的回调函数，参数为接收的数据
   * @param {String} type ws | lc | pm 可传入手动指定参数，分别代表websocket，长轮询，和postMessage,不传时优先判断是否可以使用websocket
   */
  onMessage(config, callback, type) {
    if (window) {
      // 运行在浏览器端
      clientOnMessage(config, callback, type)
    } else {
      // 运行在服务器端
      serverOnMessage(config, callback)
    }
  }

  /**
   * 断开方法
   */
  close() {
    this.stopConnectionFn()
  }
}

export default CrossIO
