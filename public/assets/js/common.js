window.addEventListener('load',function() {
    var login=document.querySelector('#login');
    login.addEventListener('click',function(){ 
        var email=document.querySelector('#email').value;
        var password=document.querySelector('#password').value;
        if(email.trim().length===0){ 
            alert('输入邮箱');
            return;
        }
        if(password.trim().length===0){ 
            alert('输入密码')
            return;
        }
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
})