const db=require('../models');
const pd = db.pd;
const initaialTrial = db.initialtrial;
const finalTrial = db.finaltrial;
const upazilla = db.upazilla;
const { request, response } = require('express');
const express = require('express');

module.exports.allpd=async(req,res)=>{
    res.json({ title: 'Field Trial Software',msg:'' });
    console.log("hello PD");
}
module.exports.pdlogin=async(req,res)=>{
    res.render('pd/pdlogin', { title: 'Field Trial Software',msg:'' });
    console.log("hello PD Login");
}
module.exports.pdloginpost=async(req,res)=>{
    console.log('PD post working');
    try {
        const {uname,password}=req.body;
        if(!uname || !password){
        return res.status(200).render('pdlogin', { title: 'Field Trial software',msg:'Please provide a username and password' });
        }

        pd.findAll({ where: {uname: uname,password:password} })
        .then(data => {

        if(data.length > 0){
            res.locals.type="pd";
            res.render('pd/pddashboard', { title: 'Field Trial software',msg:'Please provide a username and password' });
        }else{
            return res.status(200).render('pdlogin', { title: 'Field Trial software',msg:'Please provide a username and password' });
        }
         
      
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });

         

    }
    catch(error){
        console.log(error);
    } 
}

module.exports.pdinitialtrial=async(req,res)=>{
    res.locals.type="pd";
    await upazilla.findAll()
            .then(data => {
                res.render('pd/pdinitialtrial', { title: 'Field Trial Initial Report', records:data });
            })


}
module.exports.initialTrialReportSearch = async (req,res) => {
    await initaialTrial.findAll({
        where: {
            upazilla_id : req.params.upazillaId
        }
    })
    .then(data => {
        res.locals.type="pd";
        res.render('pd/pdinitialresult', { title: 'Field Trial Initial Report', records:data });
    })
}

module.exports.pdfinaltrial = async (req,res) => {
    res.locals.type="pd";
    await upazilla.findAll()
        .then(data => {
            res.render('pd/pdfinaltrial', { title: 'Field Trial Final Report', records:data });
        })
}

module.exports.finalTrialReportSearch = async (req,res) => {
    await finalTrial.findAll({
        where: {
            upazilla_id : req.params.upazillaId
        }
    })
        .then(data => {
            res.locals.type="pd";
            res.render('pd/pdfinalresult', { title: 'Field Trial Final Report', records:data });
        })
}


