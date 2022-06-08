$(function () {
    // 去注册界面
    $('#link_reg').on('click',function(){
        $('.log_box').hide()
        $('.reg_box').show()
    })
//   去登入界面
    $('#link_log').on('click',function(){
        $('.log_box').show()
        $('.reg_box').hide()
    })

    // 对表格的密码设置一个自定义的正则表达式,基于laui的框架
    const  form =layui.form
    // 引入提醒对象layer
    const layer=layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            // ,'密码必须6到12位，且不能出现空格'
          ] ,
        //  注册页面的第二次确认密码需要校验
        // value式使用过改规则的值,在这里是第二次输入的密码值
         repwd:function(value){
            //  获得第一次输入的密码值
            var pwd =$('.reg_box [name=password]').val()
            console.log('pwd:',pwd);
            console.log('value:',value);
            if(pwd !== value){
        
                return '两次密码不一致'
            }
         }
    })


    // 注册界面的ajax通信,表达注册的提交事件
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        var data=  { username:$('#form_reg [name=username').val(), password:$('#form_reg [name=password]').val() }
        $.post('/api/reguser',data,

        function(res){
            if(res.status!==0){

                // 这里需要返回return
                //   return console.log(res.message);
                return  layer.msg(res.message);//res.message是用户名被占用，请更换其他用户名！
            }
            console.log('注册成功');
            layer.msg('注册成功,请登录');
            // 模拟人的点击行为
            $('#link_log').click()

        }
        )

    })

    //  登录接口监听
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'post',
            // 获取表单的数据
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.msg('登录失败')
                }
                layer.msg('登录成功')

                // 将登录成功的token字符串，保存到localstorage
                localStorage.setItem('token',res.token)
                // 跳转到后台主页
                location.href='./index.html'
            }

        }
           
        )
    })

})