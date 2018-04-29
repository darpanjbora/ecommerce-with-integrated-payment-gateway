var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var config = require('../config');
var course = require('../models/course-schema');
var paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.CLIENT_ID,
    'client_secret': process.env.CLIENT_SECRET
});



/* GET courses. */
router.get('/getcourse', function(req, res, next) {
    course.getCourse(function(err, data) {
        if (err) {
            throw err;
        }
        res.json(data);
    })
})



/* POST courses. */
router.post('/postcourse', function(req, res, next) {
    var data = JSON.parse(req.body.data);
    course.postCourse(data, function(err, data) {
        if (err) {
            throw err;
        }
        res.json(data);
    })
})


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});



/* GET route to send the payment receipt through mail. */
router.get('/sendmail', function(req, res, next) {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        port: 25,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let HelperOptions = {
        from: '"COURSE STORE" <no-reply@coursestore.com>',
        to: req.query.email,
        subject: 'Thank you for purchasing the course!',
        text: 'Your payment for the course is successful! Your invoice id is 123456789. Thank you'
    };

    transporter.sendMail(HelperOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        res.redirect('/');
    });
});



/* GET payment form for a particular course. */
router.get('/:id/payment', function(req, res, next) {
    var id = req.params.id;
    res.render('payment', { id: id });
});




/* GET success page on successful payment and reflect changes to the paypal account. */
router.get('/success', function(req, res, next) {

    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    var execute_payment_json = {
        "payer_id": payerId,
        "transactions": [{
            "amount": {
                "currency": "INR",
                "total": "1.00"
            }
        }]
    };

    paypal.payment.execute(paymentId, execute_payment_json, function(error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            res.render('success', { payment: payment });
        }
    });
})




/* POST route to make payment. Redirects to paypal. */
router.post('/pay', function(req, res, next) {

    var userDetails = req.body

    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/success",
            "cancel_url": "http://localhost:3000/"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Course",
                    "sku": "0001",
                    "price": "1.00",
                    "currency": "INR",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "INR",
                "total": "1.00"
            },
            "description": "Pay for the course"
        }]
    };

    paypal.payment.create(create_payment_json, function(error, payment) {
        if (error) {
            throw error;
        } else {
            for (var i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });
})

module.exports = router;