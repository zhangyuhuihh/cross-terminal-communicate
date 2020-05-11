import judgeConnectType from './client/judgeMents/judge_connect_type.js'
import judgeSendType from './client/judgeMents/judge_send_type.js'
import * as connectionWays from './client/ways/connection_ways.js'
import * as sendWays from './client/ways/send_ways.js.js'

const loop = () => {}

const clientSendMessage = (config, callback, type) => {
  const sendType = judgeSendType(type)
  const fn = sendWays[sendType] || loop
  fn(config, callback || loop)
}

const clientOnMessage = (config, callback, type) => {
  const connectType = judgeConnectType(type)
  const fn = connectionWays[connectType].bind(this) || loop
  fn(config, callback || loop)
}

export { clientSendMessage, clientOnMessage }
