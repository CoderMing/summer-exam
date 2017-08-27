const http = require('http');
const fs = require('fs');
const mysql = require('mysql');
const opn = require('opn');
const sqlEtc = require('./etc/sqletc.js');


let sqlCon = mysql.createConnection(sqlEtc);
sqlCon.connect(err => {
	if (err) console.log(err);
	else console.log("success!");
})



let route = http.createServer((req, res) => {
	console.log(req.url);
	// 主文件
	if (req.url !== '/api/') {
		fs.readFile('src/index.html', (err, file) => {
			if (err) console.log(err);
			else {
				res.end(file);
			}
		});
	}
	else if (req.url === '/api/') {
		sqlCon.query('SELECT * FROM `data`', (err, data) => {
			if (err) console.log(err);
			else {
				console.log(data);
				res.writeHead(200, {
					'Content-Type': 'application/json;charset=utf-8'
				})
				res.end(JSON.stringify(data));
			}
		})
	}
})
route.listen(3000, err => {
	if (err) console.log(err);
	else {
		console.log("运行在3000端口");
		opn('http://127.0.0.1:3000/');
	}
})



