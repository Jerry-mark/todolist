// 引入express框架
const express = require('express');
// 路径处理模块
const path = require('path');
// 导入mongoose模块
const mongoose = require('mongoose');
// 导入bodyParser模块
const bodyParser = require('body-parser');
// 创建web服务器
const app = express();
// 静态资源访问服务功能
app.use(express.static(path.join(__dirname, 'public')));
// 处理post请求参数
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

// 数据库连接
mongoose.connect('mongodb://localhost:27017/todo', { useNewUrlParser: true })
	.then(()=>{console.log('成功')})
	.catch(()=>{console.log('失败')})
app.get('/base', (req, res) => {
	res.send({
		name: 'zhangsan',
		age: 30
	})
});

app.post('/base', (req, res) => {
	res.status(400).send({
		name: 'zhaoliu',
		age: 35
	})
});

app.get('/user', (req, res) => {
	res.send(req.query);
});

app.post('/user', (req, res) => {
	res.send(req.body)
});

app.get('/jsonp', (req, res) => {
	const cb = req.query.cb
	const data = cb+"({name: 'zhaoliu'})"
	res.send(data);
	// res.jsonp({
	// 	name: 'lisi',
	// 	age: 50
	// })
});

// 导入todo路由案例
const todoRouter = require('./route/todo')
// 当客户端的请求路径以/todo开头时
app.use('/todo', todoRouter);

// 获取用户列表信息
app.get('/users', (req, res) => {
	res.send('当前是获取用户列表信息的路由');
});

// 获取某一个用户具体信息的路由
app.get('/users/:id', (req, res) => {
	// 获取客户端传递过来的用户id
	const id = req.params.id;
	res.send(`当前我们是在获取id为${id}用户信息`);
});

// 删除某一个用户
app.delete('/users/:id', (req, res) => {
	// 获取客户端传递过来的用户id
	const id = req.params.id;
	res.send(`当前我们是在删除id为${id}用户信息`);
});

// 修改某一个用户的信息
app.put('/users/:id', (req, res) => {
	// 获取客户端传递过来的用户id
	const id = req.params.id;
	res.send(`当前我们是在修改id为${id}用户信息`);
});

app.get('/xml', (req, res) => {
	res.header('content-type', 'text/xml');
	res.send('<message><title>消息标题</title><content>消息内容</content></message>')
});


// 监听端口
app.listen(3090);
// 控制台提示输出
console.log('服务器启动成功');