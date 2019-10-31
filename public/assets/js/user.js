// var userForm=document.querySelector('#userForm');
// window.addEventListener('load',function() { 
//     userForm.addEventListener('submit',function (e) {
//         e.preventDefault();
//         console.log(serialize(userForm));
//     })
// }) 

$(function () {

  // 上传头像功能
  $('#modefiyUser').on('change', '#avatar', function () {
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
  $('#modefiyUser').on('submit', '#fm', function () {
    var formdata = $(this).serialize()
    $.ajax({
      type: 'POST',
      url: '/users',
      data: formdata,
      success: function () {
        location.reload();
      },
      error: function () {
        alert("用户添加失败")
      }
    })
    return false;
  })

  $('#modefiyUser').on('submit', '#formUser', function () {
    var params = $(this).serialize()
    var id = $(this).attr('data-id')
    $.ajax({
      type: 'put',
      url: `/users/${id}`,
      data: params,
      success: function () {
        location.reload()
      },
      error: function () {
        alert("用户修改失败")
      }
    })
  })

})
window.addEventListener('load', function () {
  //获取用户信息并展示用户信息
  $.ajax({
    url: '/users',
    type: 'get',
    success: function (data) {

      var html = template('userTpl', {
        data: data
      })
      var userBody = document.querySelector('#userBody')
      userBody.innerHTML += html;
    }
  })
  var userBody = document.querySelector('#userBody');
  userBody.addEventListener('click', function (e) {
    if (e.target.className.indexOf('edit') != -1) {
      $.ajax({
        url: `/users/${e.target.parentElement.parentElement.getAttribute("data-id")}`,
        type: 'get',
        success: function (data) {

          var html = template('userModeifyTpl', {
            data: data
          })
          var modefiyUser = document.querySelector('#modefiyUser')
          modefiyUser.innerHTML = ''
          modefiyUser.innerHTML = html;
        }
      })
    }
    if (e.target.className.indexOf('delete') != -1) {
      $.ajax({
        url: `/users/${e.target.parentElement.parentElement.getAttribute("data-id")}`,
        type: 'delete',
        success: function (data) {
          location.reload();
        }
      })
    }
  })
  var checkAll = document.querySelector('#checkAll');   
  var deleteMany=document.querySelector('#deleteMany');
  checkAll.addEventListener('change', function () {
    var checkOne = document.querySelectorAll('#checkOne')
    for (var i = 0; i < checkOne.length; i++) {
      checkOne[i].checked = checkAll.checked;
    }
    if(checkAll.checked==true) {
      deleteMany.style="display: inline-block"
    }else {
      deleteMany.style="display: none"
    }
  })
  userBody.addEventListener('change', function (e) {
    var checkOne = document.querySelectorAll('#checkOne')
    var checkCount=0;
    for(var i=0;i<checkOne.length;i++) {  
      if(checkOne[i].checked==true) {
        checkCount++;
      }
    }
    if(checkCount==checkOne.length) {
      checkAll.checked=true;
    }else {
      checkAll.checked='';
    }
    if(checkCount>0){ 
      deleteMany.style="display: inline-block"
    }else { 
      deleteMany.style="display: none"
    }
  })
  deleteMany.addEventListener('click',function () {``
    var checkOne = document.querySelectorAll('#checkOne')
    var arr=[]
    for(var i=0;i<checkOne.length;i++) {
      if(checkOne[i].checked==true) {
        arr.push(checkOne[i].parentElement.parentElement.getAttribute('data-id'));
      }
    }    
    console.log(arr.join('-'));
    
    if (confirm('您真要确定要进行批量删除操作吗')) {
      $.ajax({
        url: '/users/' + arr.join('-'),
        type: 'delete',
        success: function () {
          location.reload();
        }
      })
    }
  })
})