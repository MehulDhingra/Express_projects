const express = require('express');
const router = express.Router();
const { getAllProducts, getAllProductsStatic } = require('../controller/functions');
const connectMiddle = require('../middleware/connectMiddle')


router.route('/').get(connectMiddle, getAllProducts);
router.route('/static').get(connectMiddle, getAllProductsStatic);

module.exports = router;
