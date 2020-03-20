// import axios from '../node_modules/axios'
import judgeConnectType from './judgeMents/judge_connect_type.js'
import judgeSendType from './judgeMents/judge_send_type.js'
import * as connectionWays from './ways/connection_ways.js'
import * as sendWays from './ways/send_ways.js'

const loop = () => {}

class CrossIO {
  // 发送方法，发送端
  sendMessage(config, callback, type) {
    const sendType = judgeSendType(type)
    const fn = sendWays[sendType] || loop
    fn(config, callback)
  }

  // 接收方法
  onMessage(config, callback, type) {
    const connectType = judgeConnectType(type)
    const fn = connectionWays[connectType] || loop
    fn(config, callback)
  }

  // 断开以及销毁方法
  close() {}
}

export default CrossIO
