//此js用于保存常量参数，以及本地存储时用到的key值
var storageKeyName = (function (mod) {
  mod.key = 0; //0,开发;1,部署外网
  switch (mod.key) {
    case 0: //开发
      mod.SCHOOLID = 100005;//学校ID
      mod.USERTYPE = 0;//用户类型，0老师,1家长,2学生
      mod.INTERFACEGU = 'https://jsypay.jiaobaowang.net/useradminwebapi/api/data/';//顾工接口
      mod.INTERFACEKONG = 'https://jbyj.jiaobaowang.net/SchoolCommunicationService/';//孔工接口
      mod.TEACHERIMG = 'http://jsypay.jiaobaowang.net/jsyadmin/upuserimg.ashx?userid='; //老师上传头像
      mod.WXPAYSERVER = 'http://jsypay.jiaobaowang.net/jsypay/wxpay/sys/AppServer.aspx';//微信支付地址
      mod.SEARCHPAYSESULT = 'http://jsypay.jiaobaowang.net/jsypay/wxpay/sys/PcQRCode.aspx';//获取支付结果的地址
      break;
    case 1: //部署外网
      mod.SCHOOLID = 100102;//学校ID
      mod.USERTYPE = 0;//用户类型，0老师,1家长,2学生
      mod.INTERFACEGU = 'https://zhxy.jiaobaowang.net:8515/schadminwebapi/api/data/';//顾工接口
      mod.INTERFACEKONG = 'https://jbyj.jiaobaowang.net:8443/SchoolCommunicationService/';//孔工接口
      mod.TEACHERIMG = 'https://zhxy.jiaobaowang.net:8515/schadminwebadmin/upuserimg.ashx?userid='; //老师上传头像
      mod.WXPAYSERVER = 'http://jsypay.jiaobaowang.net/jsypay/wxpay/sys/AppServer.aspx';//微信支付地址
      break;
    default:
      break;
  }
  mod.SIGNKEY = 'jsy309'; //签名密钥
  /***********常量 end *****************/




  mod.phoneNumber = 'phoneNumber';
  mod.code = 'code';
  mod.openId = 'openId';
  mod.unionId = 'unionId';
  mod.shakeHand = 'shakeHand';//公钥
  mod.UUID = 'uuid';
  mod.shakeType = 'wxlg';//小程序握手类型
  mod.appId = 'wxxcx';
  mod.publicParameter = 'publicParameter'//共用参数
  mod.personalInfo = 'personalInfo'; //个人信息，登录成功后返回值

  mod.qiNiuHttp = 'https';
  mod.qiNiuSpace = 'qn-educds.jiaobaowang.net';
  mod.getUpLoadToKenUrl = 'https://jbyc.jiaobaowang.net:8504/Api/QiNiu/GetUpLoadToKen';
  mod.qiNiuAppId = 4;
  mod.qiNiuAppPwd = 'jsy@180526';
  mod.uploadSpace = "pc/";
  mod.projectName = "xiaoxuntong";
   /***********key值 end *****************/
  return mod;
})(storageKeyName || {});

module.exports = storageKeyName