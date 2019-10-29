window.addEventListener('load',function() {
    var login=document.querySelector('#login');
    login.addEventListener('click',function(){ 
        //获取邮箱和密码
        var email=document.querySelector('#email').value;
        var password=document.querySelector('#password').value;
        // 判空
        if(email.trim().length===0){ 
            alert('输入邮箱');
            return;
        }
        if(password.trim().length===0){ 
            alert('输入密码')
            return;
        }
        // 发送请求
        $.ajax({
            url:'/login',
            type:'post',
            data: { 
                email:email,
                password:password
            },
            success:function(response) {
                location.href='/admin/index.html';
            },
            error:function(){
                alert('账户或者密码错误？？？')
            } 
        })
    })
    // 判断是否按下回车
    document.body.addEventListener('keydown',function (e) {
        if(e.keyCode==13) {
            login.click();
        }
    })
})