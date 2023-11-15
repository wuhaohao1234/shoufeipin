// 图片上传
var api = require("./api")

export function service(tempFilePaths) {
  var promise = Promise.all(tempFilePaths.map((item, index) => {
    return new Promise(function(resolve, reject) {
      wx.uploadFile({
        url: api.serverPath + "/common/upload",
        filePath: item,
        name: 'file',
        formData: {
          'token': wx.getStorageSync("token"),
          'file': item
        },
        success: function(res) {
          resolve(JSON.parse(res.data).data)
        },
        fail: function(err) {
          reject(new Error('上传失败'));
        }
      })
    })
  }))
  return promise
}

