import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    // url: '/admin/api/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user',
    // url: '/admin/api/boss/detail',
    method: 'get',

  })
}
//  获取路由表接口
export function getRouter() {
  return request({
    url: '/user/getRouter',
  //   url: '/aoaoe/api/getMoveRouter',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
