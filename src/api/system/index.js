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



// 获取角色列表
export function getRolesList(params) {
  return request({
      url: `/user`,
      method: 'get',
      params
  })
}

// 分配权限 /aoaoe/api/authorize/:id
export function authorize(id, data) {
  return request({
      url: `/aoaoe/api/authorize/${id}`,
      method: 'post',
      data
  })
}
// 获取分配权限弹窗内所需全部路由菜单数据 /aoaoe/api/getAllRouter 
export function getAllRouter() {
  return request({
      url: `aoaoe/api/getAllRouter`,
      method: 'get',
  })
}
// 新增角色 /aoaoe/api/role/add
export function addRoles(data) {
  return request({
      url: `/aoaoe/api/role/add`,
      method: 'post',
      data
  })
}
//编辑角色
export function editRoles(data, id) {
  return request({
      url: `/aoaoe/api/role/edit/${id}`,
      method: 'post',
      data
  })
}
// 删除角色 /role/delete/:id
export function deleteRoles(id, data) {
  return request({
      url: `/api/role/delete/${id}`,
      method: 'post',
      data
  })
}