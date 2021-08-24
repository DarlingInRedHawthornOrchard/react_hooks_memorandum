// 时分秒补0
function _addZero(value) {
  return value < 10 ? ('0' + value) : value
}


// 格式化日期
function formatDateTime(timestamp) {
  const date = new Date(timestamp)

  const y = date.getFullYear(),
        m = date.getMonth() + 1,
        d = date.getDate(),
        h = _addZero(date.getHours()),
        i = _addZero(date.getMinutes()),
        s = _addZero(date.getSeconds())
  return `${y}年${m}月${d}日${h}时${i}分${s}秒`
}

export {
  formatDateTime
}