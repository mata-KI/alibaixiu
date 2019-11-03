$(function () {
    //获取分类放入下拉列表
    $.ajax({
        type: 'get',
        url: '/categories',
        success: function (response) {
            var html = template('categoriesTpl', {
                data: response
            });
            $('#category').html(html);
        }
    })
    $('#feature').on('change', function () {
        var formdata = new FormData();
        formdata.append('cover', this.files[0])
        $.ajax({
            type: 'POST',
            url: '/upload',
            data: formdata,
            processData: false,
            contentType: false,
            success: function (data) {
                $('#thumbnail').val(data[0].cover)
            }
        })
    })

    // 获取浏览器地址栏中的id参数
    var id = getUrlParams('id');

    // 当前管理员是在做修改文章操作
    function getUrlParams(name) {
        var paramsAry = location.search.substr(1).split('&');
        // 循环数据
        for (var i = 0; i < paramsAry.length; i++) {
            var tmp = paramsAry[i].split('=');
            if (tmp[0] == name) {
                return tmp[1];
            }
        }
        return -1;
    }
    if (id != -1) {
        $.ajax({
            type: 'get',
            url: `/posts/${id}`,
            success: function (data) {
                $.ajax({
                    type: 'get',
                    url: '/categories',
                    success: function (response) {
                        data.categoryList = response;
                        console.log(response);
                        console.log(data);
                        var html = template('modeifyTpl', data)
                        $('#parentBox').html(html)
                    }
                })
            }
        })
    }
    $('#parentBox').on('submit', '#putform', function () {
        var formdata = $(this).serialize();
        $.ajax({
            type: 'post',
            url: '/posts',
            data: formdata,
            success: function () {
                location.href = '/admin/posts.html';
            },
            error: function (error) {
                console.log(error);

            }
        })
        return false;
    })
    $('#parentBox').on('submit', '#modifyform', function () {
        var formdata = $(this).serialize();
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'put',
            url: `/posts/${id}`,
            data: formdata,
            success: function () {
                location.href = "posts.html"
            }
        })
        return false;
    })
})