var express = require('express');
var router = express.Router();
var comment = null;

router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/xss1', function(req, res, next) {
	var xss = req.query.xss
    res.render('index', { xss: xss });
});

router.get('/xss2', function(req, res, next) {
	var xss = req.query.xss
	res.set('X-XSS-Protection',0); // 关闭浏览器XSS拦截
    res.render('index', { xss: xss });
});

router.post('/add', function(req, res, next) {
	comment = req.body.comment;
    res.render('index');
});

router.get('/get', function(req, res, next) {
    res.render('index',{ comment: comment });
});

module.exports = router;