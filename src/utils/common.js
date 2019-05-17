export const setStorage = function (key, value) {
  let type = typeof value
  const obj = {
    type,
    data: value
  }
  localStorage.setItem(key, JSON.stringify(obj))
}

export const getStorage = function (key) {
  let objStr = localStorage.getItem(key)
  if (!objStr) return null
  let obj = JSON.parse(objStr)
  return obj.data
}

export const removeStorage = function (key) {
  localStorage.removeItem(key)
}