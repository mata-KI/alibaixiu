$(function() {
    $("#addCategories").on('submit',function () {
        var formdata =$(this).serialize();        
        $.ajax({
            type:'post',
            url:'/categories',
            data:formdata,
            success:function(data) {
                location.reload();
            }
        })
        return false;
    })
    $.ajax({
        type:'get',
        url:'/categories',
        success:function(data) {
            var html = template('categoriesDisTpl',{
                data:data
            })
            $('#disForm').html(html);
        }
    })
    $('#disForm').on('click','.edit',function() {
        var id=$(this).parent().parent().attr('data-id')
        $.ajax({
            type:'GET',
            url:`/categories/${id}`,
            success:function (data){
                var html = template('disCategories',{
                    data:data
                })
                $('#raiseForm').html(html);
            }
        })
        return false;
    })
    
    $('#raiseForm').on('submit','#addCategories',function() { 
        var id=$(this).attr('data-id');
        var formdata =$(this).serialize();   
        $.ajax({
            type:'put',
            url:`/categories/${id}`,
            data:formdata,
            success:function(data) {
                location.reload();
            }
        })
        return false;
    })
    $('#disForm').on('click','.delete',function() {
        var id=$(this).parent().parent().attr('data-id')
        $.ajax({
            type:'DELETE',
            url:`/categories/${id}`,
            success:function (data){
               location.reload();
            }
        })
        return false;
    })
})