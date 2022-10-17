import request from '@/utils/request'
// 获取菜单列表
export function getMenuList(params) {
    return request({
      url: '/menu',
    //   url: '/aoaoe/api/getMenuList',
      method: 'get',
      params
    })
  }
//  新增菜单
export function addMenu(data) {
    return request({
      url: '/menu',
    //   url: '/aoaoe/api/menu/add',
      method: 'post',
      data
    })
  }
//   修改菜单
export function updateMenu(id,data) {
    return request({
      url: `/menu/${id}`,
    //   url: `/aoaoe/api/menu/update/${id}`,
      method: 'put',
      data
    })
  }
//   删除菜单
export function delMenu(id) {
    return request({
      url: `/menu/${id}`,
    //   url: `/aoaoe/api/menu/delete/${id}`,
      method: 'delete',
    })
  }

  // 获取用户列表
export function getUsersList(params) {
  return request({
      url: `/user`,
    //   url: `/admin/api/boss/list`,
      method: 'get',
      params
  })
}
//新增用户 /boss/add
export function addUser(data) {
  return request({
      url: `/user`,
    //   url: `/admin/api/boss/add`,
      method: 'post',
      data
  })
}
// 编辑用户 /boss/update/:id
export function updateUser(data, id) {
  return request({
      url: `/user/${id}`,
    //   url: `/admin/api/boss/update/${id}`,
      method: 'put',
      data
  })
}
// 删除用户 /boss/delete/:id
export function delUser(id) {
  return request({
      url: `/user/${id}`,
    //   url: `/admin/api/boss/delete/${id}`,
      method: 'delete',
  })
}
// 获取api列表 
export function apiList() {
  return request({
      url: `/api`,
      method: 'get',
  })
}
// 根据id获取api信息
export function api(id) {
  return request({
      url: `/api/${id}`,
    //   url: `/admin/api/boss/delete/${id}`,
      method: 'get',
  })
}