function canUseWebSocket() {
  return typeof WebSocket !== 'undefined'
}

function judgeConnectType(type) {
  // postMessage形式
  switch (type) {
    case 'pm':
      return 'pm'

    case 'ws':
      if (!canUseWebSocket()) {
        console.log('您的浏览器不支持websocket')
        break
      }
      return 'ws'

    case 'lc':
      return 'lc'

    default:
      // 默认优先使用websocket进行通信
      if (canUseWebSocket()) {
        return 'ws'
      } else {
        return 'lc'
      }
  }
}

export default judgeConnectType
