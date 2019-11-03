$(function(){
    $('#image').on('change',function () {
        var file=this.files[0];
        var formData=new FormData();
        formData.append('image',file)
        $.ajax({
            type:'post',
            url:'/upload',
            data:formData,
            processData:false,
            contentType:false,
            success:function (response) { 
                $('#hiddenImage').val(response[0].image)
            }
        })
    })
    $('#postForm').on('submit',function() {
        var formdata=$(this).serialize();
        $.ajax({
            type:'post',
            url:'/slides',
            data:formdata,
            success:function(response) {
                location.reload();
            }
        })
        return false;   
    })
    $.ajax({
        type:'GET',
        url:'/slides',
        success:function (response) {
            var html=template('slideTpl',{data:response})
            $('tbody').html(html)
        }
    })
    $('tbody').on('click','.delete',function () {
        var id=$(this).attr('data-id')
        $.ajax({
            type:'delete',
            url:`/slides/${id}`,
            success:function (response) {
                location.reload();
            }
        })
    })
})