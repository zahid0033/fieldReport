const express = require("express");
const router = express.Router();
// const { Router } = require("express");
const app=express();

const {saoList,addSao,allupazilla,upazillalogin,upazillaloginpost,upazillaDashboard,upazillaTrialProgressyear,upazillaCropExpansionForm,upazillaCropExpansionPost,upazillaCropExpansionyear,upazillaTechnologyExpansionPost,upazillaCropExpansion,upazillaTechnologyExpansion,upazillaTechnologyExpansionyear,upazillaTechnologyExpansionForm,upazillaBreedExpansionForm,upazillaBreedExpansionPost,upazillaBreedExpansion,upazillaBreedExpansionyear,upazillatrainedfarmer,upazillatrainedfarmeryear,upazillatrainedfarmerform,upazillatrainedfarmerformpost,upazillaTrialProgress,upazillaTrialProgressForm,upazillaTrialProgressFormPost,upazillainitialtrial,upazillainitialtrialyear,upazillafinaltrialyear,upazillainitialtrialform,upazillainitialtrialformpost,upazillafinaltrial,upazillafinaltrialform,upazillafinaltrialformpost} = require('../controllers/upazilla.controller');

router.get('/',allupazilla);
router.get('/login',upazillalogin);
router.post('/logins',upazillaloginpost);
router.get('/dashboard',upazillaDashboard);

router.get('/upazillatrainedfarmer',upazillatrainedfarmer);
router.post('/upazillaTrainedFarmerYear',upazillatrainedfarmeryear);
// router.get('/upazillatrainedfarmer/:year',upazillatrainedfarmeryear);

router.get('/upazillatrainedfarmerform',upazillatrainedfarmerform);
router.post('/upazillatrainedfarmerforms',upazillatrainedfarmerformpost);

router.get('/upazillainitialtrial',upazillainitialtrial);
router.post('/upazillainitialtrialyear',upazillainitialtrialyear);

router.get('/upazillainitialtrialform',upazillainitialtrialform);
router.post('/upazillainitialtrialforms',upazillainitialtrialformpost);

router.get('/upazillaTrialProgress',upazillaTrialProgress);
router.post('/upazillaTrialProgressYear',upazillaTrialProgressyear);

router.get('/upazillaTrialProgressForm',upazillaTrialProgressForm);
router.post('/upazillaTrialProgressForms',upazillaTrialProgressFormPost);

router.get('/upazillafinaltrial',upazillafinaltrial);
router.post('/upazillafinaltrialyear',upazillafinaltrialyear);


router.get('/finalFormEdit/:id',upazillafinaltrialform);
router.post('/upazillafinaltrialforms',upazillafinaltrialformpost);

router.get('/upazillaBreedExpansion',upazillaBreedExpansion);
router.post('/upazillaBreedExpansionYear',upazillaBreedExpansionyear);

router.get('/upazillaBreedExpansionForm',upazillaBreedExpansionForm);
router.post('/upazillaBreedExpansionForms',upazillaBreedExpansionPost);

router.get('/upazillaTechnologyExpansion',upazillaTechnologyExpansion);
router.post('/upazillaTechnologyExpansionYear',upazillaTechnologyExpansionyear);

router.get('/upazillaTechnologyExpansionForm',upazillaTechnologyExpansionForm);
router.post('/upazillaTechnologyExpansionForms',upazillaTechnologyExpansionPost);

router.get('/upazillaCropExpansion',upazillaCropExpansion);
router.post('/upazillaCropExpansionYear',upazillaCropExpansionyear);

router.get('/upazillaCropExpansionForm',upazillaCropExpansionForm);
router.post('/upazillaCropExpansionForms',upazillaCropExpansionPost);

router.get('/saoList',saoList);
router.get('/addSao',addSao);



module.exports = router;