function judgeSendType(type) {
  switch (type) {
    case 'http':
      return 'http'

    case 'pm':
      return 'pm'

    default:
      return 'http'
  }
}

export default judgeSendType
