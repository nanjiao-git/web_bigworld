$(function(){
    // 对表单内容制定规则
    var form =layui.form
    var layer=layui.layer
    form.verify({
        nickname:function(value){
            if(value.length>6){
                return layer.msg('昵称长度要在1到6之间')
            }
        }
    })
  // 初始化用户的基本信息
    initUserInfo()
  // 初始化用户的基本信息
  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败！')
        }
        // console.log(res)
        // layui的封装api使用不了
        // form.val('formUserInfo', res.data)
        $('.form-username').attr('value', res.data.username)
        $('.form-nickname').attr('value', res.data.nickname)
        $('.form-email').attr('value', res.data.email)
        $('.form-id').attr('value', res.data.id)
        
      }
    })
  }


  // 重置按钮的设置
  $('#btnReset').on('click',function(e){
    // 阻止去除表单内所有内容的默认行为
    e.preventDefault()
    // 重新获得表单当前的数据
      // 初始化用户的基本信息
      initUserInfo()
      
  })

  // 表单的提交
  // 表单的提交不要设置按钮，要设置表格
  $('.layui-form').on(
    'submit',function(e){
      e.preventDefault()
      $.ajax({
        method:'post',
        url:'/my/userinfo',
        data:$(this).serialize(),
        success:function(res){
          if(res.status!==0){
            return layui.layer.msg("修改信息失败")
          }
          return layui.layer.msg("修改信息成功")
          window.parent.getUserinfo()
          console.log($(this).serialize());
           // 调用父页面中的方法，重新渲染用户的头像和用户的信息

        }

      }
      )
    }
  )

  

})

