const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();

const {alldd,ddlogin,ddloginpost,ddDashboard,trainedfarmer,trainedFarmerFilter} = require('../controllers/dd.controller');

router.get('/',alldd);
router.get('/login',ddlogin);
router.post('/logins',ddloginpost);
router.get('/dashboard',ddDashboard);

router.get('/trainedfarmer',trainedfarmer);
router.post('/trainedFarmerFilter',trainedFarmerFilter);

module.exports = router;