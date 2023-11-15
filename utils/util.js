const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const dateFormatting = data => {
  data = data.toString()
  var newData = data.substr(0, 4) + "年" + data.substr(5, 2) + "月" + data.substr(8, 2) + "日 " + data.substr(10, 6)
  return newData
}

const formatDate = date => {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return year + '-' + (month < 10 ? '0' + month : month) + '-' + (day < 10 ? '0' + day : day)
}

const formatDateTime = date => {
  const hour = date.getHours()
  const minute = date.getMinutes()
  return (hour < 10 ? '0' + hour : hour) + ':' + (minute < 10 ? '0' + minute : minute)
}

//省市区截取
const getArea = str => {
  let area = {}
  let index11 = 0
  let index1 = str.indexOf("省")
  if (index1 == -1) {
    index11 = str.indexOf("自治区")
    if (index11 != -1) {
      area.province = str.substring(0, index11 + 3)
    } else {
      area.province = str.substring(0, 0)
    }
  } else {
    area.province = str.substring(0, index1 + 1)
  }

  let index2 = str.indexOf("市")
  if (index11 == -1) {
    area.city = str.substring(index11 + 1, index2 + 1)
  } else {
    if (index11 == 0) {
      area.city = str.substring(index1 + 1, index2 + 1)
    } else {
      area.city = str.substring(index11 + 3, index2 + 1)
    }
  }

  let index3 = str.lastIndexOf("区")
  if (index3 == -1) {
    index3 = str.indexOf("县")
    area.district = str.substring(index2 + 1, index3 + 1)
  } else {
    area.district = str.substring(index2 + 1, index3 + 1)
  }
  return area;
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  formatDateTime: formatDateTime,
  dateFormatting: dateFormatting,
  getArea: getArea
}