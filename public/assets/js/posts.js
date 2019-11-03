$.ajax({
    type: 'get',
    url: '/posts',
    success: function (data) {
        var html = template('postTpl', {
            data: data.records
        })
        $('#postBox').html(html)
        var html = template('paginationTpl', data)
        $('#pagination').html(html)
    }
})

$.ajax({
    type: 'get',
    url: '/categories',
    success: function (response) {
        var html = template('categoriesTpl', {
            data: response
        })
        $('#Allcategories').html(html)
    }
})

$('#cooptionForm').on('submit', function () {

    var formdata = $(this).serialize();
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formdata,
        success: function (data) {
            console.log(data);
            var html = template('postTpl', {
                data: data.records
            })
            $('#postBox').html(html)
            var html = template('paginationTpl', data)
            $('#pagination').html(html)
        }
    })
    return false;
})

$('#postBox').on('click', '.delete', function () {
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'delete',
        url: `/posts/${id}`,
        success: function (data) {
            location.reload();
        }

    })
})

function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page
        },
        success: function (data) {
            var html = template('postTpl', {
                data: data.records
            })
            $('#postBox').html(html)
            var html = template('paginationTpl', data)
            $('#pagination').html(html)
        }
    })
}