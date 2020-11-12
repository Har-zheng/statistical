import Cookies from "js-cookie";

const Mirage3DRecharge_token = "channel_token";
const permissions = "permissions";
const platformInfo = "info";
// console.log(Cookies.get().Mirage3D_token)
// console.log(Cookies.get())
export function getToken() {
  return Cookies.get(Mirage3DRecharge_token);
}

export function setToken(token) {
  return Cookies.set(Mirage3DRecharge_token, token);
}

export function removeToken() {
  return Cookies.remove(Mirage3DRecharge_token);
}
// Permissions权限组储存
export function getPermissions() {
  return Cookies.get(permissions);
}

export function setPermissions(permission) {
  return Cookies.set(permissions, permission);
}

export function removePermissions() {
  return Cookies.remove(permissions);
}
// 登录的渠道信息
export function getPlatformInfo() {
  return Cookies.get(platformInfo);
}

export function setPlatformInfo(info) {
  return Cookies.set(platformInfo, info);
}

export function removePlatformInfo() {
  return Cookies.remove(platformInfo);
}
