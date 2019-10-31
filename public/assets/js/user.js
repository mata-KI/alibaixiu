// var userForm=document.querySelector('#userForm');
// window.addEventListener('load',function() { 
//     userForm.addEventListener('submit',function (e) {
//         e.preventDefault();
//         console.log(serialize(userForm));
//     })
// })

$(function () {
 


   // 上传头像功能
   $('#avatar').on('change', function () {
    // 创建formData对象
    var formdata = new FormData()
    // 设置formData对象的自定义属性，属性值为上传文件的路径
    formdata.append('avatar', this.files[0])
    $.ajax({
      type: 'post',
      url: '/upload',
      data: formdata,
      // 告诉 $.ajax 方法不要设置参数的类型（formData对象会自动设置参数类型）
      contentType: false,
      // 告诉 $.ajax 方法不要解析参数（因为上传文件是二进制文件）
      processData: false,
      success: function (response) {
        // 实现图片预览
        $('#tx').attr('src', response[0].avatar)
        // 把图片地址保存在隐藏域的value属性中，由表单提交到数据库
        $('#hdinput').val(response[0].avatar.split('\\').join('/'))
      },
      error: function () {
        alert('头像上传失败')
      }
    })
  })
 //创建用户并上传
 $('#fm').on('submit', function () {
  var formdata = $(this).serialize()
  $.ajax({
    type:'POST',
    url:'/users',
    data:formdata,
    success:function(){
      location.reload
    },
    error:function(){
      alert("用户添加失败")
    }
  })
})
return false
})
  window.addEventListener('load',function () {    
    //获取用户信息并展示用户信息
    $.ajax({
      url:'/users',
      type:'get',
      success:function(data) { 
        console.log(data);
        var  html=template('userTpl',{data:data})
        var userBody=document.querySelector('#userBody')
        userBody.innerHTML+=html;
      }
    })
  })



