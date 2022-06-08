$(function(){
  // 获取用户的基本信息
  getUserinfo()

  // 退出
  $('#btnLogout').on('click',function(){
    // console.log("ok");
    var layer=layui.layer
    layer.confirm('此操作将退出登录, 是否继续?', {icon: 3, title:'提示'}, function(index){
      //do something
        //do something
      // 1. 清空本地存储中的 token
      localStorage.removeItem('token')
      // 2. 重新跳转到登录页面
      // 文件的地址要根据js文件导入的html文章为参考
      location.href = './login.html'

      
      layer.close(index);
    });
  })



})


// 获取用户的基本信息
function getUserinfo(){
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
       
        // 请求头配置对象
        // headers的字母开头要小写，大小写不敏感
        // headers:{Authorization: localStorage.getItem('token') || ''},
        success:function(res){
            console.log(res);
            if (res.status!==0){
              return layui.layer.msg('获取用户信息失败！')
              // return console.log("失败");
            }
            // 渲染头像
            // console.log(res.data);
            renderAvader(res.data)
        },
      //   complete:function(res){
      //     console.log("都会执行complete");
      //     console.log(res);
      //     if(res.responseJSON.message=="身份认证失败！"&& res.responseJSON.status==1){
      //             // 1. 清空本地存储中的 token
      // localStorage.removeItem('token')
      // // 2. 重新跳转到登录页面
      // // 文件的地址要根据js文件导入的html文章为参考
      // location.href = './login.html'
      //     }
      //   }

    })
}
function renderAvader(user){
  var name = user.nickname||user.username
  $('#welcome').html('欢迎&nbsp;&nbsp;'+name)

  // 显示文本头像还是图片头像选择
  //  显示图片
  if (user.user_pic!==null){
   $('.layui-nav-img').attr('src',user.user_pic).show()
   $('.text-avatar').hide()
  }
  else{
    var first_name=name[0].toUpperCase()
    $('.text-avatar').html(first_name).show
    $('.layui-nav-img').hide()
  }


}

