$(function() {
    //获取分类放入下拉列表
   $.ajax({
       type:'get',
       url:'/categories',
       success:function (response) {
           var html= template('categoriesTpl',{data:response});
           $('#category').html(html);
       }
   })
   $('#feature').on('change',function () {
        var formdata=new FormData();
        formdata.append('cover',this.files[0])
        $.ajax({
            type:'POST',
            url:'/upload',
            data:formdata,
            processData:false,
            contentType:false,
            success:function(data) {
                $('#thumbnail').val(data[0].cover)
            }
        })
   })
    
    $('#putArticle').on('submit','#putform',function () {
        var formdata=$(this).serialize();
        $.ajax({
            type:'post',
            url:'/posts' ,
            data:formdata,
            success: function(){
                location.href='/admin/posts.html';
            },
            error:function (error) {
                console.log(error);
                
            }
        })
    return false;
    })
})