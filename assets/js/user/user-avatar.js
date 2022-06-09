$(function(){
    
     // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)


  
// 选择文件
$('#btnChooseImage').on('click',function(){
    $('#file').click()
})

// 更改图片
$('#file').on('change',function(e){
    console.log(e);
    var filelist=e.target.files
//    console.log(filelist);
// 这段代码的触发有问题，必须要先上传图片，再不上传图片，好像就只是触发一次
if(filelist.length===0){
    // console.log("0");
    return layui.layer.msg('请选择照片')
}

 // 1. 拿到用户选择的文件
 var file = e.target.files[0]
//  console.log('file:',file);
 // 2. 将文件，转化为路径
 var imgURL = URL.createObjectURL(file)
 // 3. 重新初始化裁剪区域
 $image
   .cropper('destroy') // 销毁旧的裁剪区域
   .attr('src', imgURL) // 重新设置图片路径
   .cropper(options) // 重新初始化裁剪区域

})

// 将头像图片上传到服务器
$('#btnUpload').on('click',function(){
    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

    //   发起ajax请求
    $.ajax({
        url:'/my/update/avatar',
        method:'post',
        data:{avatar:dataURL },
        success:function(res){
            if(res.status!==0){
                return layui.layer.msg('更改图片失败')
            }
            return layui.layer.msg('更改图片成功')
            // 将更改的资料渲染到头像处
          getUserinfo1()
        
            
        }
    })
})
})
function hello(){
    console.log("ok");
}


// 获取用户的基本信息
function getUserinfo1(){
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
       
        // 请求头配置对象
        // headers的字母开头要小写，大小写不敏感
        // headers:{Authorization: localStorage.getItem('token') || ''},
        success:function(res){
            // console.log(res);
            if (res.status!==0){
              return layui.layer.msg('获取用户信息失败！')
              // return console.log("失败");
            }
            // 渲染头像
            // console.log(res.data);
            renderAvader(res.data)
        },

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
