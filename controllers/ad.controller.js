const db=require('../models');
const ad = db.ad;
const upazilla = db.upazilla;
const dd = db.dd;
const trainedFarmer = db.trainedfarmer;
const { request, response } = require('express');
const express = require('express');

module.exports.allad=async(req,res)=>{
    res.json({ message: "hello AD" });
};
module.exports.adlogin=async(req,res)=>{
    res.render('ad/adlogin', { title: 'Field Trial Software',msg:'' });
};
module.exports.adloginpost=async(req,res)=>{
    try {
        const {uname,password}=req.body;
        if(!uname || !password){
        return res.status(200).render('adlogin', { title: 'Field Trial software',msg:'Please provide a username and password' });
        }

        ad.findAll({ where: {uname: uname,password:password} })
        .then(data => {
            if(data.length > 0){
                req.session.type = "ad";
                req.session.user_id = data[0].id;
                res.redirect('/ad/dashboard');
            }else{
                return res.status(200).render('adlogin', { title: 'Field Trial software',msg:'Please provide a username and password' });
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
module.exports.adDashboard = async (req,res) => {
    return res.render('ad/addashboard',{ title: 'Field Trial Initial Report',success:'' });
};

module.exports.trainedfarmer = async(req,res) => {
    await dd.findAll()
    .then(data => {
        res.render('ad/trainedFarmer/trainedFarmer', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', districts: data });
    })
    .catch(err => {
        console.log(err);
    })

};
module.exports.trainedFarmerFilter = async (req,res) => {
    await upazilla.findAll({
        where: {dd_id : req.body.district}
    })
        .then(data => {
            trainedFarmer.findAll({
                where: {upazilla_id: req.body.upazilla,year: req.body.year}
            })
                .then(data => {
                    res.render('ad/trainedFarmer/trainedFarmersTable', {records: data} ,function(err, html) {
                        res.send(html);
                    });
                })
                .catch(err => {
                    console.log(err)
                })

        })
        .catch(err => {
            console.log(err);
        })
};

module.exports.fetchUpazilla = async (req,res) => {
    upazilla.findAll({
        where: {dd_id: req.body.district}
    })
        .then(data => {
            res.send(JSON.stringify(data))
            console.log(data.length)
        })
        .catch(err => {
            console.log(err)
        })
};

