$(function () {
    $('#logo').on('change', function () {
        var file = this.files[0];
        var formData = new FormData();
        formData.append('logo', file)
        $.ajax({
            type: 'post',
            url: '/upload',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                $('#hiddenLogo').val(response[0].logo)
                $('#preview').attr('src', response[0].logo)
            }
        })
    })
    $.ajax({
        type: 'get',
        url: '/settings',
        success: function (response) {
            console.log(response);
            $('#preview').attr('src', response.logo)
            $('#hiddenLogo').val(response.logo)
            $('input[name="title"]').val(response.title)
            $('input[name="comment"]').prop('checked', response.comment)
            // $('input[name="comment"]').val(response.comment)
            // $('input[name="review"]').val(response.review)
            $('input[name="review"]').prop('checked', response.review)
        }
    })
    $('#settingsForm').on('submit', function () {
        var formdata = $(this).serialize();
        $.ajax({
            type: 'post',
            url: '/settings',
            data: formdata,
            success: function (response) {
                // location.reload();
                console.log(response);
                
            }
        })
        return false;
    })
})