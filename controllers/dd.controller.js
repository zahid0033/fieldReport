const db=require('../models');
const dd = db.dd;
const initialTrial = db.initialtrial;
const upazilla = db.upazilla;
const trainedfarmer = db.trainedfarmer;
const finalTrial = db.finaltrial;
const { request, response } = require('express');
var session = require('express-session');
const express = require('express');

// app.use(session({
//   key: 'session_cookie_name',
//   secret: 'session_cookie_secret',
//   store: sessionStore,
//   resave: false,
//   saveUninitialized: false
// }));

module.exports.alldd=async(req,res)=>{
    res.json({ message: "hello DD" });
    console.log("hello DD");
};
module.exports.ddlogin=async(req,res)=>{
    res.render('dd/ddlogin', { title: 'Field Trial Software',msg:'' });
    console.log("hello DD");
};
module.exports.ddloginpost=async(req,res)=>{
    try {
        const {uname,password}=req.body;
        if(!uname || !password){
            return res.status(200).render('ddlogin', { title: 'Field Trial software',msg:'Please provide a username and password' });
        }

        dd.findAll({ where: {uname: uname,password:password} })
        .then(data => {
            if(data.length > 0){
                req.session.type = "dd";
                req.session.user_id = data[0].id;
                res.redirect('/dd/dashboard');
            }else{
                return res.status(200).render('ddlogin', { title: 'Field Trial software',msg:'Please provide a username and password' });
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
};
module.exports.ddDashboard = async (req,res) => {
    return res.render('dd/dddashboard',{ title: 'Field Trial Initial Report',success:'' });
};

module.exports.trainedfarmer = async (req,res) => {
    await upazilla.findAll({
        where: {dd_id : req.session.user_id}
    })
    .then(data => {
        res.render('dd/trainedFarmer/trainedFarmer', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', upazillas: data });
    })
    .catch(err => {
        console.log(err);
    })

};
module.exports.trainedFarmerFilter = async (req,res) => {
    await trainedfarmer.findAll({
        where: {upazilla_id : req.body.upazilla, year: req.body.year}
    })
        .then(data => {
            console.log(data)
            res.render('dd/trainedFarmer/trainedFarmersTable', {records: data} ,function(err, html) {
                res.send(html);
            });
        })
        .catch(err => {
            console.log(err);
        })
}

