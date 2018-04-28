var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

var paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': process.env.CLIENT_ID,
    'client_secret': process.env.CLIENT_SECRET
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/:id/payment', function(req, res, next) {
    var id = req.params.id;
    res.render('payment', { id: id });
});

router.get('/success', function(req, res, next) {
    res.render('success');
})

router.post('/pay', function(req, res, next) {

    var userDetails = req.body

    console.log(userDetails);

    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "https://course-store.herokuapp.com/success",
            "cancel_url": "https://course-store.herokuapp.com/"
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