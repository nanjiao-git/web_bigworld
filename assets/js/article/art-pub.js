$(function(){
    var form =layui.form
    initCate()
    // / 初始化文章分类的方法
    // 初始化富文本编辑器
initEditor()
  function initCate() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('获取分类数据失败！')
        }
        // 调用模板引擎渲染分类的可选项
        var htmlStr = template('tpl-cate', res)
        // console.log(htmlStr);
        $('[name=cate_id]').html(htmlStr)
        // 通过 layui 重新渲染表单区域的UI结构
        form.render()
      }
    })
  }

    // 1. 初始化图片裁剪器
    var $image = $('#image')
  
    // 2. 裁剪选项
    var options = {
      aspectRatio: 400 / 280,
      preview: '.img-preview'
    }
    
    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 选择文件
$('#btnChooseImage').on('click',function(){
    $('#file').click()
})

// 选择文件
$('#btnChooseImage').on('click',function(){
    $('#cover-file').click()
})

// 更改图片
$('#cover-file').on('change',function(e){
    console.log(e);
    var filelist=e.target.files
if(filelist.length===0){
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
// 默认是发布
var art_state ='已发布'
$('#btnSave2').on('click',function(){
    art_state='草稿'
})

 
  // 为表单绑定 submit 提交事件
$('#form-pub').on('submit', function(e) {
    // 1. 阻止表单的默认提交行为
    e.preventDefault()
    // 2. 基于 form 表单，快速创建一个 FormData 对象
    var fd = new FormData($(this)[0])
    // 3. 将文章的发布状态，存到 fd 中
    fd.append('state', art_state)
    // 4. 将封面裁剪过后的图片，输出为一个文件对象
    $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280
      })
      .toBlob(function(blob) {
        // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        // 5. 将文件对象，存储到 fd 中
        fd.append('cover_img', blob)
        // 6. 发起 ajax 数据请求
        // fd.forEach(function(k,v){
        //     console.log(k,v);
        // })
        publishArticle(fd)
      })
})

function publishArticle(fd) {
    $.ajax({
      method: 'POST',
      url: '/my/article/add',
      data: fd,
      // 注意：如果向服务器提交的是 FormData 格式的数据，
      // 必须添加以下两个配置项
      contentType: false,
      processData: false,
      success: function(res) {
        if (res.status !== 0) {
          return layer.msg('发布文章失败！')
        }
        layer.msg('发布文章成功！')
        // 发布文章成功后，跳转到文章列表页面
        location.href = './art-list.html'
      }
    })
}

})