####登录思路
给登录按钮绑定点击事件
获取邮箱和密码
判断邮箱和密码是否为空，如果成功，需要给提示,同时组织代码向下运行
发送ajax请求
如果成功，进入网站后台，如果失败，提示用户
####登录拦截
使用script标签加载服务器端提供的端口地址
因为script具有同步（阻塞）特性，也就是当script(#`O′)不完成就不会向下运行
####退出功能
为退出绑定点击事件，
询问用户是否退出
发送ajax请求，
####用户添加
为添加按钮绑定点击事件
获取表单中用户的信息
进行信息提交
然后获取图片添加到formdata中，
实现图片预览
####用户展示
打开页面，发送ajax请求，后台返回json格式的数据
引用模板文件，定义模板
引用template()方法，让数据进行拼接
获父级，把生成的节点放入父级里边去
####用户编辑功能
使用事件委托的形式给编辑按钮绑定事件，同时获取唯一的id值
根据id需要发送ajax请求，获取该用户信息
将信息展示在左侧
开始更新数据，发送ajax，然后当点击保存按钮，更新页面
####修改密码
去绑定事件
发送ajax请求
####添加修改分类
绑定事件
发送ajax请求