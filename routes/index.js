var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/:id/payment', function(req, res, next) {
    var id = req.params.id;
    res.render('payment', { id: id });
});

module.exports = router;