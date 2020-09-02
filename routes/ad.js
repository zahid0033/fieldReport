const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();

const {allad,adlogin,adloginpost,trainedfarmer,adDashboard,trainedFarmerFilter,fetchUpazilla} = require('../controllers/ad.controller');

router.get('/',allad);
router.get('/login',adlogin);
router.post('/logins',adloginpost);
router.get('/dashboard',adDashboard);

router.get('/trainedfarmer',trainedfarmer);
router.post('/trainedFarmerFilter',trainedFarmerFilter);
router.post('/fetchUpazilla',fetchUpazilla);

module.exports = router;