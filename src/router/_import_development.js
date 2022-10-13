// 开发环境导入组件
module.exports = file => require('@/views/' + file + '.vue').default // vue-loader at least v13.0.0+
// module.exports = file => {
//     console.log(file);
//     return require('@/views/' + file + '.vue').default
//  }