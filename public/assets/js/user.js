// var userForm=document.querySelector('#userForm');
// window.addEventListener('load',function() { 
//     userForm.addEventListener('submit',function (e) {
//         e.preventDefault();
//         console.log(serialize(userForm));
//     })
// })

$(function () {
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
  // 上传头像
  $('#avatar').on('change',function(){
    var formdata=new FormData() 
    formdata.append('avatar',this.files[0])
    $.ajax({
      type:'post',
      url:'/upload',
      data:formdata,
      processData:false,
      contentType:false,
      success:function(data){
        $('#tx').attr('src',data[0].avatar)
        $('#hdinput').val(data[0].avatar)
      }
    })
  })