$(function() {
    $.ajax({
        type:'get',
        url:'/posts',
        success:function(data) {  
            var html= template('postTpl',{data:data.records}) 
            $('#postBox').html(html)
            var html= template('paginationTpl',data) 
            $('#pagination').html(html)
        }
    })
    
})
// tempalte.defaults.importss.dataFormat=
function changePage(page) {
    $.ajax({
        type:'get',
        url:'/posts',
        data: {
            page:page
        },
        success:function(data) {  
            var html= template('postTpl',{data:data.records}) 
            $('#postBox').html(html)
            var html= template('paginationTpl',data) 
            $('#pagination').html(html)
        }
    })
}