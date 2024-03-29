// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url

    // 给需要权限的页面添加请求头
    if( options.url.indexOf('/my/')!==-1){
      options.headers={Authorization: localStorage.getItem('token') || ''}
    }

    options.complete=function(res){
      // console.log("都会执行complete");
      // console.log(res);
      if(res.responseJSON.message=="身份认证失败！"&& res.responseJSON.status==1){
              // 1. 清空本地存储中的 token
  localStorage.removeItem('token')
  // 2. 重新跳转到登录页面
  // 文件的地址要根据js文件导入的html文章为参考
  location.href = './login.html'
      }
    }
  })
  