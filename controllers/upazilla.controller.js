const db=require('../models');
const upazilla = db.upazilla;
const trainedfarmer = db.trainedfarmer;
const initialTrial = db.initialtrial;
const TrialProgress = db.TrialProgress;
const finalTrial = db.finaltrial;
const BreedExpansion = db.BreedExpansion;
const TechnologyExpansion = db.TechnologyExpansion;
const CropExpansion = db.CropExpansion;
const sao = db.sao;
const upazillatable=db.upazillatable;
const { request, response } = require('express');
const express = require('express');

module.exports.upazillatable=async(req,res)=>{
    res.json({ message: "hello upazilla" });
};

module.exports.allupazilla=async(req,res)=>{
    res.json({ message: "hello upazilla" });
};

module.exports.upazillalogin=async(req,res)=>{
    res.render('upazilla/upazillalogin', { title: 'Field Trial Software',msg:'' });
};

module.exports.upazillaloginpost=async(req,res)=>{
    try {
        const {uname,password}=req.body;
        if(!uname || !password){
        return res.status(200).render('upazilla/upazillalogin', { title: 'Field Trial software',msg:'Please provide a username and password' });
        }

        upazilla.findAll({ where: {uname: uname,password:password} })
        .then(data => {

            if(data.length > 0){
                req.session.type = "upazilla";
                req.session.user_id = data[0].id;
                res.redirect('/upazilla/dashboard');
            }else{
                return res.status(200).render('upazilla/upazillalogin', { title: 'Field Trial software',msg:'Please provide a username and password' });
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

module.exports.upazillaDashboard = async(req,res) => {
    res.render('upazilla/upazilladashboard', { title: 'Field Trial software',msg:'Welcome' });
};

//trained farmers controller
module.exports.upazillatrainedfarmer=async(req,res)=>{

    await trainedfarmer.findAll({
        where: {upazilla_id: req.session.user_id}
    })
    .then(data => {
        console.log("inside");
        res.render('upazilla/upazillaTrainedFarmer/upazillatrainedfarmer', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/upazillaTrainedFarmer/upazillatrainedfarmer', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', records: err });
    })
     
    //  records:result

};

module.exports.upazillatrainedfarmeryear=async(req,res)=>{
    await trainedfarmer.findAll({
        where: {year: req.body.year, upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/upazillaTrainedFarmer/upazillaTrainedFarmerTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/upazillaTrainedFarmer/upazillatrainedfarmeryear', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', records: err });
    })

};

module.exports.upazillatrainedfarmerform=async(req,res)=>{
    res.render('upazilla/upazillaTrainedFarmer/upazillatrainedfarmerform', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',msg:'' ,success:'', user_id: req.session.user_id});
};

module.exports.upazillatrainedfarmerformpost=async(req,res)=>{
    var name= req.body.name;
    var fname= req.body.fname;
    var vname= req.body.vname;
    var nid= req.body.nid;
    var mnum= req.body.mnum;
    var ptype= req.body.ptype;
    var pname= req.body.pname;
    var date= req.body.date;
    var block= req.body.block;
    var saooname= req.body.saooname;
    var pnum= req.body.pnum;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await trainedfarmer.create({
            name: name,
            fname:fname,
            vname:vname,
            nid:nid,
            mnum:mnum,
            ptype:ptype,
            pname:pname,
            date:date,
            block:block,
            saooname:saooname,
            pnum:pnum,
            year:year,
            upazilla_id:user_id

    }).then(data => {
        initialTrial.create({
            name: name,
            fname:fname,
            vname:vname,
            nid:nid,
            mnum:mnum,
            ptype:ptype,
            pname:pname,
            blockname:block,
            saooname:saooname,
            pnum:pnum,
            year:year,
            upazilla_id:user_id

        }).then(data => {
            finalTrial.create({
                name: name,
                fname:fname,
                vname:vname,
                nid:nid,
                mnum:mnum,
                ptype:ptype,
                pname:pname,
                year:year,
                upazilla_id:user_id
            })
                .then(data => {
                    res.redirect('/upazilla/upazillatrainedfarmer');
                })
                .catch(err => {
                    console.log(err);
                })
        }).catch(err => {
            // res.render('error',err);
            console.log(err)
        });


    }).catch(err => {
        // res.render('error',err);
        console.log(err)
    });
  
};
//trained farmers controller end

//initial trial controller
module.exports.upazillainitialtrial=async(req,res)=>{

    await initialTrial.findAll({
        where: {upazilla_id: req.session.user_id}
    })

    .then(data => {

        console.log("inside");
        res.render('upazilla/upazillainitialtrial/upazillainitialtrial', { title: 'প্রদর্শনীর প্রাথমিক প্রতিবেদন',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/upazillainitialtrial/upazillainitialtrial', { title: 'প্রদর্শনীর প্রাথমিক প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};

module.exports.upazillainitialtrialyear=async(req,res)=>{
    await initialTrial.findAll({
        where: {year: req.body.year, upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/upazillainitialtrial/upazillainitialtrialTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/upazillainitialtrial/upazillainitialtrialyear', { title: 'প্রদর্শনীর প্রাথমিক প্রতিবেদন',success:'', records: err });
    })

};

module.exports.upazillainitialtrialform=async(req,res)=>{

    res.render('upazilla/upazillainitialtrial/upazillainitialtrialform', { title: 'প্রদর্শনীর প্রাথমিক প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
    console.log("hello PD Login");
};

module.exports.upazillainitialtrialformpost=async(req,res)=>{
    console.log("formPost");
    var name= req.body.name;
    var fname= req.body.fname;
    var vname= req.body.vname;
    var nid= req.body.nid;
    var mnum= req.body.mnum;
    var cdistribution= req.body.cdistribution;
    var pdistribution= req.body.pdistribution;
    var trialtype= req.body.trialtype;
    var cropname= req.body.cropname;
    var breedname= req.body.breedname;
    var source= req.body.source;
    var trialsize= req.body.trialsize;
    var trialdate= req.body.trialdate;
    var blockname= req.body.blockname;
    var saooname= req.body.saooname;
    var pnum= req.body.pnum;
    var year=req.body.year;
    var user_id =req.body.user_id;
    await initialTrial.create({
            name: name,
            fname:fname,
            vname:vname,
            nid:nid,
            mnum:mnum,
            cdistribution:cdistribution,
            pdistribution:pdistribution,
            ptype:ptype,
            pname:pname,
            breedname:breedname,
            source: source,
            trialsize:trialsize,
            trialdate:trialdate,
            blockname:blockname,
            saooname:saooname,
            pnum:pnum,
            year:year,
            upazilla_id:user_id

        }).then(data => {
            res.redirect('/upazilla/upazillainitialtrial');
        }).catch(err => {
            res.render('errorpage',err);
        });

    await finalTrial.create({
            name: name,
            fname:fname,
            vname:vname,
            nid:nid,
            mnum:mnum,
            cdistribution:cdistribution,
            pdistribution:pdistribution,
            trialtype:trialtype,
            cropname:cropname,
            breedname:breedname,
            source:source,
            trialsize:trialsize,
            year:year,
            upazilla_id:user_id
        })
        .then(data => {
            console.log("final trial success",data);
        })
        .catch(err => {
            console.log(err);
        })
     
  
};
//initial trial controller ends

//Trial Progress controller 
module.exports.upazillaTrialProgress=async(req,res)=>{

    await TrialProgress.findAll({
        where: {upazilla_id: req.session.user_id}
    })
    .then(data => {

        console.log("inside");
        res.render('upazilla/upazillaTrialProgress/upazillaTrialProgress', { title: 'প্রদরশনীর অগ্রগতির প্রতিবেদন',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/upazillaTrialProgress/upazillaTrialProgress', { title: 'প্রদরশনীর অগ্রগতির প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result

};

module.exports.upazillaTrialProgressyear=async(req,res)=>{
    await TrialProgress.findAll({
        where: {year: req.body.year, upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/upazillaTrialProgress/upazillaTrialProgressTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/upazillaTrialProgress/upazillaTrialProgressyear', { title: 'প্রশিক্ষণপ্রাপ্ত কৃষকের তথ্য',success:'', records: err });
    })

};

module.exports.upazillaTrialProgressForm=async(req,res)=>{

    res.render('upazilla/upazillaTrialProgress/upazillaTrialProgressForm', { title: 'প্রদরশনীর অগ্রগতির প্রতিবেদন',msg:'' ,success:'',user_id: req.session.user_id});
    console.log("hello PD Login");
};

module.exports.upazillaTrialProgressFormPost=async(req,res)=>{
    console.log("formPost");
    var name= req.body.name;
    var boraddo= req.body.boraddo;
    var done= req.body.done;
    var breed=req.body.breed;
    var source=req.body.source;
    
    var year =req.body.year;
    var user_id =req.body.user_id;

    await TrialProgress.create({
            name: name,
            boraddo:boraddo,
            done:done,
            breed:breed,
            source:source,
            year:year,
            upazilla_id:user_id

        }).then(data => {
            res.redirect('/upazilla/upazillaTrialProgress');
        }).catch(err => {
            res.render('errorpage',err);
        });

  
};
//Trial Progress controller ends

//Final Trial controller 
module.exports.upazillafinaltrial=async(req,res)=>{
 
    await finalTrial.findAll({
        where: {upazilla_id: req.session.user_id}
    })

    .then(data => {
        console.log("inside");
        res.render('upazilla/upazillafinaltrial/upazillafinaltrial', { title: 'প্রদর্শনীর চূড়ান্ত প্রতিবেদন',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/upazillafinaltrial/upazillafinaltrial', { title: 'প্রদর্শনীর চূড়ান্ত প্রতিবেদন',success:'', records: err });
    })
     
    //  records:result


};

module.exports.upazillafinaltrialform=async(req,res)=>{
    res.locals.type="upazilla";
    await finalTrial.findAll({
        where: {
            id: req.params.id
        }
    }).then(data => {
        res.render('upazilla/upazillafinaltrial/upazillafinaltrialform', { title: 'প্রদর্শনীর চূড়ান্ত প্রতিবেদন',msg:'',success:'',records:data[0]});
    })

};

module.exports.upazillafinaltrialformpost=async(req,res)=>{

    var id = req.body.id;
    var trialdate = req.body.trialdate;
    var cdate= req.body.cdate;
    var production= req.body.production;
    var folon= req.body.folon;
    var comment= req.body.comment;

    await finalTrial.update({
        trialdate:trialdate,
        cdate: cdate,
        production:production,
        folon:folon,
        comment:comment
    },
    {
        where: {id: id}
    })
        .then(data => {
            res.redirect('/upazilla/upazillafinaltrial')
        })
        .catch(err => {
            console.log(err);
        })

};

module.exports.upazillafinaltrialyear=async(req,res)=>{
    await finalTrial.findAll({
        where: {year: req.body.year, upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/upazillafinaltrial/upazillafinaltrialTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/upazillafinaltrial/upazillafinaltrialyear', { title: 'প্রদর্শনীর চূড়ান্ত প্রতিবেদন',success:'', records: err });
    })

};
//Final Trial controller ends 

//Breed Expansion controller
module.exports.upazillaBreedExpansion=async(req,res)=>{
    await BreedExpansion.findAll({
        where: {upazilla_id: req.session.user_id}
    })
    .then(data => {

        console.log("inside");
        res.render('upazilla/upazillaBreedExpansion/upazillaBreedExpansion', { title: 'প্রকল্প এলাকার ফসলের জাত সম্প্রসারণ',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/upazillaBreedExpansion/upazillaBreedExpansion', { title: 'প্রকল্প এলাকার ফসলের জাত সম্প্রসারণ',success:'', records: err });
    })
     
    //  records:result

};

module.exports.upazillaBreedExpansionyear=async(req,res)=>{
    await BreedExpansion.findAll({
        where: {year: req.body.year, upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/upazillaBreedExpansion/upazillaBreedExpansionTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/upazillaBreedExpansion/upazillaBreedExpansionyear', { title: 'প্রকল্প এলাকার ফসলের জাত সম্প্রসারণ',success:'', records: err });
    })

};

module.exports.upazillaBreedExpansionForm=async(req,res)=>{

    res.render('upazilla/upazillaBreedExpansion/upazillaBreedExpansionForm', { title: 'প্রকল্প এলাকার ফসলের জাত সম্প্রসারণ',msg:'' ,success:'',user_id: req.session.user_id});
    console.log("hello PD Login");
};

module.exports.upazillaBreedExpansionPost=async(req,res)=>{
    console.log("formPost");
    var name= req.body.name;
    var bname= req.body.bname;
    var area= req.body.area;
    
    var year =req.body.year;

    await BreedExpansion.create({
            name: name,
            bname:bname,
            area:area,
            year:year,

        }).then(data => {
            res.redirect('/upazilla/upazillaBreedExpansion');
        }).catch(err => {
            res.render('errorpage',err);
        });

  
};
//Breed Expansion controller ends

//Technology Expansion controller
module.exports.upazillaTechnologyExpansion=async(req,res)=>{
    await TechnologyExpansion.findAll({
        where: {upazilla_id: req.session.user_id}
    })
    .then(data => {

        console.log("inside");
        res.render('upazilla/upazillaTechnologyExpansion/upazillaTechnologyExpansion', { title: 'প্রকল্প এলাকায় প্রযুক্তি সম্প্রসারণ',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/upazillaTechnologyExpansion/upazillaTechnologyExpansion', { title: 'প্রকল্প এলাকায় প্রযুক্তি সম্প্রসারণ',success:'', records: data });
    })
     
    //  records:result

};

module.exports.upazillaTechnologyExpansionyear=async(req,res)=>{
    await TechnologyExpansion.findAll({
        where: {year: req.body.year, upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/upazillaTechnologyExpansion/upazillaTechnologyExpansionTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/upazillaTechnologyExpansion/upazillaTechnologyExpansionyear', { title: '্রকল্প এলাকায় প্রযুক্তি সম্প্রসারণ',success:'', records: err });
    })

};

module.exports.upazillaTechnologyExpansionForm=async(req,res)=>{

    res.render('upazilla/upazillaTechnologyExpansion/upazillaTechnologyExpansionForm', { title: 'প্রকল্প এলাকায় প্রযুক্তি সম্প্রসারণ',msg:'' ,success:'',user_id: req.session.user_id});
    console.log("hello PD Login");
};

module.exports.upazillaTechnologyExpansionPost=async(req,res)=>{
    console.log("formPost");
    var name= req.body.name;
    var user= req.body.user;
    var area= req.body.area;
    var year =req.body.year;

    await TechnologyExpansion.create({
            name: name,
            user:user,
            area:area,
            year:year,

        }).then(data => {
            res.redirect('/upazilla/upazillaTechnologyExpansion');
        }).catch(err => {
            res.render('errorpage',err);
        });
  
};
//Technology Expansion controller ends

//Crop Expansion controller
module.exports.upazillaCropExpansion=async(req,res)=>{
    await CropExpansion.findAll({
        where: {upazilla_id: req.session.user_id}
    })
    .then(data => {

        console.log("inside");
        res.render('upazilla/upazillaCropExpansion/upazillaCropExpansion', { title: 'প্রকল্প এলাকার ফসল আবাদ অগ্রগতি',success:'', records: data });
    })
    .catch(err => {
        console.log("outside");
        res.render('upazilla/upazillaCropExpansion/upazillaCropExpansion', { title: 'প্রকল্প এলাকার ফসল আবাদ অগ্রগতি',success:'', records: err });
    })
     
    //  records:result

};

module.exports.upazillaCropExpansionyear=async(req,res)=>{
    await CropExpansion.findAll({
        where: {year: req.body.year, upazilla_id: req.session.user_id}
    })
    .then(data => {
        res.render('upazilla/upazillaCropExpansion/upazillaCropExpansionTable', {records: data} ,function(err, html) {
            res.send(html);
        });
    })
    .catch(err => {
        res.render('upazilla/upazillaCropExpansion/upazillaCropExpansionyear', { title: 'প্রকল্প এলাকার ফসল আবাদ অগ্রগতি',success:'', records: err });
    })

};

module.exports.upazillaCropExpansionForm=async(req,res)=>{

    res.render('upazilla/upazillaCropExpansion/upazillaCropExpansionForm', { title: 'প্রকল্প এলাকার ফসল আবাদ অগ্রগতি',msg:'' ,success:'',user_id: req.session.user_id});
    console.log("hello PD Login");
};

module.exports.upazillaCropExpansionPost=async(req,res)=>{
    console.log("formPost");
    var name= req.body.name;
    var area= req.body.area;
    var folon= req.body.folon;
    var year =req.body.year;
    var user_id =req.body.user_id;

    await CropExpansion.create({
            name: name,
            area:area,
            folon:folon,
            year:year,
            upazilla_id:user_id

        }).then(data => {
            res.redirect('/upazilla/upazillaCropExpansion');
        }).catch(err => {
            res.render('errorpage',err);
        });

    // await finalTrial.create({
    //         name: name,
    //         fname:fname,
    //         vname:vname,
    //         nid:nid,
    //         mnum:mnum,
    //         cdistribution:cdistribution,
    //         pdistribution:pdistribution,
    //         trialtype:trialtype,
    //         cropname:cropname,
    //         breedname:breedname,
    //         source:source,
    //         trialsize:trialsize,
    //         year:year
    //     })
    //     .then(data => {
    //         console.log("final trial success",data);
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
     
  
};
//Crop Expansion controller ends

//sao
module.exports.saoList = async (req,res) => {
    await sao.findAll()
        .then(data => {
            res.render('upazilla/upazillaSAO/saoList', { title: 'SAO List',success:'', records: data });
        })
        .catch(err => {
            console.log(err)
        })
};

module.exports.addSao = async (req,res) => {
    await sao.create({
        name: req.body.name,
        district: req.body.district,
        upazilla: req.body.upazilla,
        village: req.body.village,
        field: req.body.field,
        block: req.body.block,
        phone: req.body.phone,
        joining_date: req.body.joining_date,
        upazilla_id: req.body.upazilla_id,
    }).then(data => {
        res.redirect('/upazilla/upazillaCropExpansion');
    }).catch(err => {
        res.render('errorpage',err);
    });
};