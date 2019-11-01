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
    
// 获取全选按钮
var checkAll = $('#checkAll');
console.log(checkAll.prop('checked'));

// 获取批量删除按钮
var deleteMany = $('#deleteMany');

// 当全选按钮的状态发生改变时
checkAll.on('change', function () {
	// 获取到全选按钮当前的状态
	var status = $(this).prop('checked');

	if (status) {
		// 显示批量删除按钮
		deleteMany.show();
	}else {
		// 隐藏批量删除按钮
		deleteMany.hide();
	}

	// 获取到所有的用户并将用户的状态和全选按钮保持一致
	$('#disForm').find('input').prop('checked', status);
});

// 当用户前面的复选框状态发生改变时
$('#disForm').on('change', '.checkOne', function () {
	// 获取到所有用户 在所有用户中过滤出选中的用户
	// 判断选中用户的数量和所有用户的数量是否一致
	// 如果一致 就说明所有的用户都是选中的
	// 否则 就是有用户没有被选中
	var inputs = $('#disForm').find('input');

	if (inputs.length == inputs.filter(':checked').length) {
		// alert('所有用户都是选中的')
		checkAll.prop('checked', true)
	}else {
		// alert('不是所有用户都是选中的')
		checkAll.prop('checked', false)
	}

	// 如果选中的复选框的数量大于0 就说明有选中的复选框
	if (inputs.filter(':checked').length > 0) {
		// 显示批量删除按钮
		deleteMany.show();
	}else {
		// 隐藏批量删除按钮
		deleteMany.hide();
	}
});

// 为批量删除按钮添加点击事件
deleteMany.on('click', function () {
	var ids = [];
	// 获取选中的用户
	var checkedUser = $('#disForm').find('input').filter(':checked');
	// 循环复选框 从复选框元素的身上获取data-id属性的值
	checkedUser.each(function (index, element) {
		ids.push($(element).parent().parent().attr('data-id'));
	});

	if (confirm('您真要确定要进行批量删除操作吗')) {
		$.ajax({
			type: 'delete',
			url: '/categories/' + ids.join('-'),
			success: function () {
				location.reload();
			}
		})
	}
});
})