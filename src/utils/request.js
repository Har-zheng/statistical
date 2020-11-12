import axios from "axios";
import { Message, MessageBox } from "element-ui";
import store from "../store";
import { getToken } from "@/utils/auth";

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_URL, // api 的 base_url
  timeout: 5000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    console.log(getToken());
    if (getToken()) {
      config.headers["token"] = getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // config.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);
const tips = {
  500: "系统错误",
  10099: "API处理超时",
  10002: "渠道ID不存在",
  10003: "渠道状态异常",
  10004: "手机验证码失败",
  10007: "短信发送频率过高",
  10008: "短信发送失败",
  10005: "咨询师不存在",
  10006: "咨询师状态异常",
  10102: "用户未注册",
  10103: "用户已被锁定",
  10104: "用户已注销",
  10106: "面部模型正在设计",
  10107: "面部设计结果未发现",
  10110: "设计请求不存在",
  10111: "取消设计请求失败",
  10113: "设计请求已经被删除",
  10114: "删除收藏失败",
  10118: "设计请求状态不正确",
  10120: "设计提交状态不正确",
  10128: "无权取消设计请求",
  10129: "扫描二维码记录不存在",
  10109: "数据模型已经删除",
  30006: "url资源类型不允许",
  30007: "url索引类型不允许",
  10116: "设计师信息不正确",
  10117: "设计师信息不正确",
  10124: "版本号不存在",
  10125: "IM通行证创建失败",
  10126: "指定用户的IM通信证未找到",
  10127: "指定的扫描人脸不存在",
  10131: "扫描人脸校准",
  10132: "扫描人脸绑定用户时平台账号不匹配",
  10135: "扫描人脸状态错误",
  10136: "渠道账号不存在",
  10137: "渠道账号被锁定",
  10138: "渠道账号被禁用",
  30005: "OPENID信息错误",
  10300: "OPENID无法找到用户",
  10302: "OPENID已绑定但不是指定用户",
  10303: "OPENID已经绑定， 且为指定用户",
  10304: "手机号码与openid不匹配",
  10305: "用户openid已经解绑",
  10201: "标签释义不存在",
  10501: "扫描皮肤不存在",
  10502: "扫描皮肤已经被删除",
  10503: "扫描皮肤重复",
  10601: "咨询模版不存在",
  10400: "用户咨询建议不存在",
  10701: "案例部位不存在",
  10702: "案例指定扫描不存在",
  10703: "案例指定设计结果不存在",
  10704: "案例指定设计结果不存在",
  10801: "模版不存在",
  10802: "模版实例不存在",
  10901: "AI人脸已经绑定用户",
  10902: "AI报告为空",
  11001: "部位不存在",
  11002: "特征不存在",
  11003: "渠道自定义特征不存在",
  11101: "咨询问卷不存在",
  11102: "模板实例未绑定咨询问卷",
  11201: "医美咨询记录不存在",
  11202: "医美经历不存在",
  11203: "医美诉求不存在",
  20003: "设备未注册",
  20004: "设备不可用",
  20016: "人脸已经绑定过用户",
  30008: "设计草稿不存在",
  40001: "报告不存在",
  40002: "生成报告失败",
  40004: "报告无法渲染",
  40005: "报告版本过旧， 需要更新报告",
  41001: "扫描FEELINGS没有更改",
  41002: "扫描FEELINGS中select选项不能含空值",
  50001: "校准请求不存在",
  50002: "服务器远程操作请求不存在",
  60001: "问卷的提交结果选项不足",
  60002: "问卷的提交结果不合法",
  60003: "问卷的提交结果指定的关联数据不合法",
  60101: "账号不存在",
  60102: "账号密码错误",
  60103: "账号验证次数过多",
  60104: "账号被锁定",
  60105: "账号被停用",
  60106: "账号角色不存在或者被禁用",
  62101: "CURL请求超时",
  62202: "COS bucket不存在",
  62301: "产品服务不存在",
  62302: "产品服务验证失败",
  11301: "平台资源重复导出",
  11302: "要更改或者删除的资源被引用"
};
// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错
     */
    const res = response.data;
    // console.log(response)
    if (res === undefined) return response;
    // console.log(res.code)
    // 兼容一些需要 状态码11102 这里不统一报错
    if (res.code !== 0) {
      // console.log('请求返回状态吗错误!!!' + res.code)
      if (res.code === 11102) {
        return response;
      } else {
        let tips_cont = res.msg;
        if (tips[res.code]) {
          tips_cont = tips[res.code];
        }
        // tips_cont
        Message({
          message: tips_cont,
          type: "error",
          duration: 5 * 1000
        });
      }
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 606) {
        MessageBox.confirm(
          "你已被登出，可以取消继续留在该页面，或者重新登录",
          "确定登出",
          {
            confirmButtonText: "重新登录",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).then(() => {
          store.dispatch("FedLogOut").then(() => {
            location.reload(); // 为了重新实例化vue-router对象 避免bug
          });
        });
      }

      return Promise.reject("error");
    } else {
      return response;
    }
  },
  error => {
    console.log("err" + error); // for debug
    Message({
      message: error.message,
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
