/*
 * API registry for all HTTP API actions such as
 * GET, PUT, DELETE
 */

const fs          = require('fs');
const express     = require('express');
const bodyparser  = require('body-parser');

const authapi     = require('./controllers/auth.js')
const caapi       = require('./controllers/ca.js');
const certapi     = require('./controllers/certificate.js');

const router = express.Router();

router.post('/auth/check/', (req, res)=>{
    authapi.auth.check(req,res);
})

router.post('/ca/cert/get', (req,res)=>{
    caapi.cert.get(req,res);
})

router.post('/certificates/list/', (req, res) => {
    certapi.certificates.list(req, res);
});

router.post('/certificate/get/', (req, res) => {
    certapi.certificate.get(req, res);
});

router.post('/certificate/request/', (req, res)=> {
    certapi.certificate.request(req, res);
});

router.post('/certificate/revoke/', (req, res) => {
    certapi.certificate.revoke(req, res);
});

module.exports = router;

