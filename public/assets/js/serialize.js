function serialize(form) {
    var parts = [],
        field = null,
        i,
        len,
        j,
        optLen,
        option,
        optValue;
    //form.elements.length是表单元素的长度
    for (i = 0, len = form.elements.length; i < len; i++) {
        //field是form的元素
        field = form.elements[i]
        //选择field的属性
        switch (field.type) {
            case 'select-one':
            case 'select-multiple':
                if (field.name.length) {
                    for (j = 0, optLen = field.options.length; j < optLen; j++) {
                        option = field.options[j]
                        if (option.selected) {
                            optValue = ""
                            if (option.hasAttribute) {
                                optValue = (option.hasAttribute('value') ? option.value : option.text)
                            } else {
                                optValue = (option.hasAttribute['value'].specified ? option.value : option.text)
                            }
                            parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(optValue))
                        }
                    }
                }
                break;
            case undefined: //字段集
            case "file":    //文件提交
            case "submit":  //提价按钮
            case "reset":   //重置按钮
            case "button":  //自定义按钮
                break;
            case "radio":   //单选按钮
            case "checkbox":     //复选框
                if (!field.checked) {
                    break
                }
                //执行默认操作
            default:
                //不包含没有名字的表单字段
                console.log(field);
                console.log(field.value);   
                if (field[name].length) {
                    parts.push(encodeURIComponent(field.name) + '=' + encodeURIComponent(field.value))
                }
        }
    }
    console.log( parts.join("&"));   
    return parts.join("&")

}