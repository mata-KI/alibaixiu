var logout = document.querySelector('#logout')

window.addEventListener('load', function () {

    logout.addEventListener('click', function () {

        if (confirm('你看我牛不牛逼？？？')) {
            $.ajax({
                url: '/logout',
                type: 'post',
                success: function () {
                    location.reload('/admin/login.html')
                },
                error: function () {
                    console.log('退出失败');
                }
            })
        }
    })
})

$.ajax({
    type:'get',
    url:'/posts/count',
    success:function(response) {
        $('#postAll').html(`<strong>${$data.postCount}</strong>篇文章（<strong>2</strong>篇草稿）`)    
    }
})
$.ajax({
    type:'get',
    url:'/categories/count',
    success:function(response) {
        $('#cateAll').html(`<strong>${data.categoryCount}</strong>个分类`)    
    }
})
$.ajax({
    type:'get',
    url:'/comments/count',
    success:function(response) {
        $('#commitAll').html(`<strong>${data.commentCount}</strong>条评论（<strong>1</strong>条待审核）`)    
    }
})