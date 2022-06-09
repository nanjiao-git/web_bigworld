$(function(){

    // 对表单内容制定规则
    var form =layui.form
    var layer=layui.layer
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            // ,'密码必须6到12位，且不能出现空格'
          ] ,
        //   新密码和旧密码不能一样
          passsame:function(value){
              if(value===$('[name=oldPwd]').val()){
                  return '新密码和旧密码不能一样'
              }
          },

             //   新密码和再次输入密码不一样
             resame:function(value){
                if(value!==$('[name=newPwd]').val()){
                    return '新密码和再次输入密码不一样'
                }
            },          
    })
//    密码修改发起ajax请求
$('.layui-form').on('submit',function(e){
    e.preventDefault()
    $.ajax({
        url:'/my/updatepwd',
        method:'POST',
        data:$(this).serialize(),
        success:function(res){
            // console.log(res);
            if(res.status!==0){
                return layer.msg('修改密码失败')
            }
            return layer.msg('修改密码成功')
        }

    })
  })

// $('.layui-form').on('submit', function(e) {
//   e.preventDefault()
//   $.ajax({
//     method: 'POST',
//     url: '/my/updatepwd',
//     data: $(this).serialize(),
//     success: function(res) {
//       if (res.status !== 0) {
//         return layui.layer.msg('更新密码失败！')
//       }
//       layui.layer.msg('更新密码成功！')
//       // 重置表单
//       $('.layui-form')[0].reset()
//     }
//   })
// })

})