const express = require('express');
const { verifyToken } = require('../middlewares');
const { recommendation } = require('../controllers/recommend');

const router = express.Router();


router.post('/', verifyToken, recommendation);

module.exports = router;
