// created by gpake
const cryption = require('../../utils/encrypt/cryption.js')
const storageKeyName = require('../../utils/encrypt/storageKeyName.js')

var config = {
    qiniuRegion: '',
    qiniuImageURLPrefix: '',
    qiniuUploadToken: '',
    qiniuUploadTokenURL: '',
    qiniuUploadTokenFunction: null,
    qiniuShouldUseQiniuFileName: false
}

module.exports = {
    init: init,
    upload: upload,
}

// 在整个程序生命周期中，只需要 init 一次即可
// 如果需要变更参数，再调用 init 即可
function init(options) {
    config = {
        qiniuRegion: '',
        qiniuImageURLPrefix: '',
        qiniuUploadToken: '',
        qiniuUploadTokenURL: '',
        qiniuUploadTokenFunction: null,
        qiniuShouldUseQiniuFileName: false
    };
    console.log("init config===" + JSON.stringify(config));
    updateConfigWithOptions(options);
}

function updateConfigWithOptions(options) {
    if (options.region) {
        config.qiniuRegion = options.region;
    } else {
        console.error('qiniu uploader need your bucket region');
    }
    if (options.uptoken) {
        config.qiniuUploadToken = options.uptoken;
    } else if (options.uptokenURL) {
        config.qiniuUploadTokenURL = options.uptokenURL;
    } else if(options.uptokenFunc) {
        config.qiniuUploadTokenFunction = options.uptokenFunc;
    }
    if (options.domain) {
        config.qiniuImageURLPrefix = options.domain;
    }
    config.qiniuShouldUseQiniuFileName = options.shouldUseQiniuFileName
}

function upload(filePath, success, fail, options, progress, cancelTask) {
    if (null == filePath) {
        console.error('qiniu uploader need filePath to upload');
        return;
    }
    if (options) {
      updateConfigWithOptions(options);
    }
    
    var fileName = filePath.split('//')[1];
    if (options && options.key) {
        fileName = options.key;
    }
  getQNUpToken(filePath, storageKeyName.uploadSpace, fileName, success, fail, options, progress, cancelTask);    
}

function doUpload(filePath, success, fail, options, progress, cancelTask) {
    if (null == config.qiniuUploadToken && config.qiniuUploadToken.length > 0) {
        console.error('qiniu UploadToken is null, please check the init config or networking');
        return
    }
    var url = uploadURLFromRegionCode(config.qiniuRegion);
    var fileName = filePath.split('//')[1];
    if (options && options.key) {
        fileName = options.key;
    }
    console.log("fileName===========" + fileName);
    //fileName = "xiaoxuntong/pc/" + fileName;
    console.log("config.qiniuUploadToken===========" + config.qiniuUploadToken);
    var formData = {
        'token': config.qiniuUploadToken
    };
    if (!config.qiniuShouldUseQiniuFileName) {
      formData['key'] = storageKeyName.projectName + "/" + storageKeyName.uploadSpace + fileName
    }
    console.log("begin upload...................");
    var uploadTask = wx.uploadFile({
        url: url,
        filePath: filePath,
        name: 'file',
        formData: formData,
        success: function (res) {
          var dataString = res.data
          console.log("dataString===========" + JSON.stringify(dataString));
          if(res.data.hasOwnProperty('type') && res.data.type === 'Buffer'){
            dataString = String.fromCharCode.apply(null, res.data.data)
          }
          try {
            var dataObject = JSON.parse(dataString);
            //do something
            var imageUrl = config.qiniuImageURLPrefix + '/' + dataObject.key;
            dataObject.imageURL = imageUrl;
            console.log(dataObject);
            if (success) {
              success(dataObject);
            }
          } catch(e) {
            console.log('parse JSON failed, origin String is: ' + dataString)
            if (fail) {
              fail(e);
            }
          }
        },
        fail: function (error) {
            console.error(error);
            if (fail) {
                fail(error);
            }
        }
    })

    uploadTask.onProgressUpdate((res) => {
        progress && progress(res)
    })

    cancelTask && cancelTask(() => {
        uploadTask.abort()
    })
}

function getQiniuToken(configure, filePath, success, fail, options, progress, cancelTask) {
  console.log("qiniuUploadTokenURL=============" + config.qiniuUploadTokenURL);
  console.log("options=============" + JSON.stringify(configure.options));
  wx.request({
    url: config.qiniuUploadTokenURL,
    data: configure.options,
    method: 'POST',
    header: {
      "content-type": "application/x-www-form-urlencoded"
    },
    success: function (res) {
      console.log(JSON.stringify(res))
      var token = res.data.Data.Token;
      console.log("token=============" + token);
      if (token && token.length > 0) {
        config.qiniuUploadToken = token;
      } else {
        console.error('qiniuUploader cannot get your token, please check the uptokenURL or server')
      }
      doUpload(filePath, success, fail, options, progress, cancelTask);
    },
    fail: function (error) {
      console.error('qiniu UploadToken is null, please check the init config or networking: ' + error);
    }
  })
}

function uploadURLFromRegionCode(code) {
    var uploadURL = null;
    switch(code) {
        case 'ECN': uploadURL = 'https://up.qbox.me'; break; //华东
        case 'NCN': uploadURL = 'https://up-z1.qbox.me'; break; //华北
        case 'SCN': uploadURL = 'https://up-z2.qbox.me'; break; //华南
        case 'NA': uploadURL = 'https://up-na0.qbox.me'; break; //北美
        case 'ASG': uploadURL = 'https://up-as0.qbox.me'; break;
        default: console.error('please make the region is with one of [ECN, SCN, NCN, NA, ASG]');
    }
    return uploadURL;
}

function getQNUpToken(filePath, uploadSpace, fileName, success, fail, options, progress, cancelTask) {
  //		console.log('uploadSpace ' + uploadSpace + ' ' + JSON.stringify(fileName));
  var type = ''; //获取上传token的类型。0上传需要生成缩略图的文件；1上传文件
  var QNFileName = ''; //存放到七牛的文件名
  var fileList = []; //上传文件的路径
  var desKey = ''; //项目名称
  var appId = 0; //项目id
  var mainSpace = ''; //文件存放在私有空间或公有空间
  var saveSpace = ''; //上传的空间
  var configure = {}; //配置的数据

  if (fileName) {
    QNFileName = fileName;
  }
  if (storageKeyName.qiNiuAppId) {
    appId = storageKeyName.qiNiuAppId;
    desKey = storageKeyName.qiNiuAppPwd;
  }
  mainSpace = 'pb';
  saveSpace = uploadSpace;

  var ops = '' //七牛预持久化命令
  console.log("saveSpace + QNFileName================" + saveSpace + "@@@" + QNFileName);
  var param = {
    Bucket: mainSpace,
    Key: saveSpace + QNFileName,
    Pops: ops,
    NotifyUrl: ''
  }
  console.log("参数数据1：" + desKey);
  console.log("参数数据2：" + JSON.stringify(param));

  configure.options = "AppID=" + appId + "&Param=" + cryption.encryptByDES(desKey, JSON.stringify(param))

  console.log("参数数据3：" + JSON.stringify(configure.options))
  //获取token
  getQiniuToken(configure, filePath, success, fail, options, progress, cancelTask);
}

