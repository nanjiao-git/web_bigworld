$(function(){
  var layer = layui.layer
  var form= layui.form
  initArtCateList()
    function initArtCateList(){
        $.ajax({
            url:'/my/article/cates',
            method:'get',
            success:function(res){
                // console.log(res);
                // template接收的数据格式是对象
              var htmlstr =  template('tpl-table',res)
              $('tbody').html(htmlstr)
            }
        })
    }



    // 添加类别,只是在页面布局上显示
    // 给弹出层命名
    var indexAdd = null
   $('#btnAddCate') .on('click',function(){
    //    console.log('ok');
    indexAdd=layer.open({
        type:1,
        area:['500px ','250px'],
        title: '添加文章分类',
        content: $('#dialog-add').html()

      })   
        
   })

//    添加类别，发起ajax向后端，重新在页面上渲染
// 由于弹出的页面一开始是不存在的，所以需要代理形式
// 通过代理的形式，为 form-add 表单绑定 submit 事件
$('body').on('submit','#form-add',function(e){
    e.preventDefault()
    $.ajax({
        url:'/my/article/addcates',
        method:'POST',
        data:$(this).serialize(),
        success:function(res){
         if(res.status !==0){
           return layer.msg('添加数据失败')
         }
         initArtCateList()
         layer.msg('新增分类成功！')
             // 根据索引，关闭对应的弹出层
            layer.close(indexAdd)
        }
    })
})


// 修改的弹窗
var indexEdit= null
$('tbody').on('click','#btn-edit',function(){
// console.log('ok');
indexEdit=layer.open({
  type:1,
  area:['500px ','250px'],
  title: '修改类别',
  content: $('#dialog-edit').html()

})
// 使得弹窗内显示已有信息
var id = $(this).attr('data-id')
$.ajax({
  url:'/my/article/cates/'+id,
  method:"get",
  success:function(res){
    form.val('form-edit', res.data)
    // 用下面方法更改数据，虽然可以显示，但是提交的时候有问题
    // $('#edit-name').attr('value',res.data.name)
    // $('#edit-alias').attr('value',res.data.alias)

  }
})
})

// 修改弹窗的信息
$('body').on('submit', '#form-edit', function(e) {
  e.preventDefault()
  $.ajax({
        method: 'POST',
        url: '/my/article/updatecate',
        data: $(this).serialize(),
        success: function(res) {
          if (res.status !== 0) {
            return layer.msg('更新分类数据失败！')
          }
          layer.msg('更新分类数据成功！')
          layer.close(indexEdit)
          initArtCateList()
        }
  })
})

// 删除内容,也需要代理
$('body').on('click','#btn-delete',function(){

  // console.log(this);
  // 不能用$('#btn-delete')，因为最终生成的div盒子的id都是一样的，只会取值第一个
  var id= $(this).attr('data-id')
 //eg1
layer.confirm('确认删除', {icon: 3, title:'提示'}, function(index){
  $.ajax({
    method: 'GET',
    url: '/my/article/deletecate/' + id,
    success: function(res) {
      if (res.status !== 0) {
        return layer.msg('删除分类失败！')
      }
      layer.msg('删除分类成功！')
      layer.close(index)
      initArtCateList()
    }
  })
  //do something
  
  // layer.close(index);
});
   
})






  

})