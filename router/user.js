const express = require('express');
// 导入路由
const routerMethods = require('../router_methods/user_methods');
const router = express.Router();


router.post('/regUser', routerMethods.regUser);
router.post('/Login', routerMethods.Login);
router.post('/getUserInfo', routerMethods.getUserInfo);

module.exports = router;