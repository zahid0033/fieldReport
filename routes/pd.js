const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();

const {allpd,pdlogin,pdloginpost,pdinitialtrial,initialTrialReportSearch,pdfinaltrial,finalTrialReportSearch} = require('../controllers/pd.controller');


router.get('/',allpd);
router.get('/login',pdlogin);
router.post('/logins',pdloginpost);

router.get('/initialtrial',pdinitialtrial);
router.get('/initialTrialReportSearch/:upazillaId',initialTrialReportSearch);

router.get('/finaltrial',pdfinaltrial);
router.get('/finalTrialReportSearch/:upazillaId',finalTrialReportSearch);


module.exports = router;