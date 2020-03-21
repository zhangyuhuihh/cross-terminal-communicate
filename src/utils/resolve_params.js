export default function resolveParams(config) {
  let paramsString = '?'
  const params = config.params || {}
  for (let key in params) {
    if (params[key]) {
      paramsString += `&${key}=${params[key]}`
    }
  }
  return paramsString
}