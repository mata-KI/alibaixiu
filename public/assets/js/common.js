var logout = document.querySelector('#logout')

window.addEventListener('load',function() { 

    logout.addEventListener('click',function() { 

        if(confirm('你看我牛不牛逼？？？')) {
            $.ajax({ 
                url:'/logout',
                type:'post',
                success: function () {
                     location.reload('/admin/login.html')
                },
                error:function() {
                    console.log('退出失败');
                    
                }   
            })
        }

       
    
})
})