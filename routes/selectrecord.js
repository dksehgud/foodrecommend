const express = require('express');
const { verifyToken } = require('../middlewares');
const { choice, getRecord, deleteRecord } = require('../controllers/selectrecord');

const router = express.Router();

router.post('/choice', verifyToken, choice);

router.get('/getRecord', verifyToken, getRecord);

router.post('/deleteChoice', verifyToken, deleteRecord);

module.exports = router;
