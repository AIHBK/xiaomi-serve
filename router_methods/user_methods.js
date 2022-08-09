const uuid = require('node-uuid');
const db = require('../db/mysql');
// state:0,用户名或密码不能为空
// state:1,用户名已存在
// state:2,error
// state:3,success
exports.regUser = (req, res) => {
    if(!req.body.name || !req.body.password) {
        return res.send({
            state: 0,
            msg: '用户名或密码不能为空'
        });
    }
    db.query({
        sql: 'select * from admin where name=?',
        values: [req.body.name]
    },(err,data)=>{
        if(err){
            return res.send({
                state: 2,
                msg: 'SqlError'
            });
        }
        if(data.length > 0){
            return res.send({
                state: 1,
                msg: '用户名已存在'
            });
        }
        db.query({
            sql: 'insert into admin set ?',
            values:[req.body]
        }, (err, data) => {
            if(err){
                return res.send({
                    state: 2,
                    msg: '添加失败'
                });
            }
            return res.send({
                state: 3,
                msg: 'success'
            });
        });
    }) 
}
exports.Login = (req, res) => { 
    // console.log(req.body.username);
    if(!req.body.username || !req.body.loginPass) {
        return res.send({
            state: 0,
            msg: '用户名或密码不能为空'
        });
    }
    db.query({
        sql: 'select * from admin where name=? and password=?',
        values: [req.body.username, req.body.loginPass]
    }, (err, data) => { 
        if(err){
            return res.send({
                state: 2,
                msg: 'SqlError'
            });
        }
        if(data.length == 1){
            db.query({
                sql: 'select * from userinfo',
            }, (err, data) => {
                return res.send({
                    state: 3,
                    msg: 'success',
                    list: data
                });
            })            
        }
    })
}
exports.getUserInfo = (req, res) => {
    db.query({
        sql: 'select * from userinfo',
    },(err,data)=>{
        if(err){
            return res.send({
                state: 2,
                msg: 'SqlError'
            });
        }
        console.log(data);
        return res.send({
            state: 3,
            msg: 'success',
            list: data
        });
    })
}