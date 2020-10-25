const {validateInquiry} = require('../helper/validators/inquiry.validator');
const {Inquiry} = require('../models/inquiry');
const getCurrentDate = require('../utils/date');


exports.sendInquiry = async(req,res) => {
    // const {error} = await validateInquiry(req.body);
    let data = req.body;
    // if(error) return res.send({
    //     success: false,
    //     stataus: 400,
    //     message: error.details[0].message
    // }).status(400)

   let inquiry = new Inquiry();
       inquiry.name = data.name;
       inquiry.email = data.email;
       inquiry.message = data.message;
       inquiry.date = await getCurrentDate();
       inquiry.save().then(inquiry => {
           res.send({
               success: true,
               status: 200,
               message: 'Inquiry sent',
               inquiry: inquiry
           }).status(200)
       }).catch(error => {
           return res.send({
               success: true,
               status: 400,
               error: error
           }).status(400)
       })
}


exports.getInquiries = async(req,res) => {
     await Inquiry.find().then(inquireis => {
         res.send({
             sucess: true,
             status: 200,
             inquires: inquireis
         }).status(200)
     }).catch(error => {
         res.send({
             succes: false,
             status: 400,
             error: error
         }).status(400)
     })
}

exports.getInquiryByStatus = async(req,res) => {
    let status = req.params.status;

    await Inquiry.findOne({status: status}).then(inquireis => {
        res.send({
            sucess: true,
            status: 200,
            inquires: inquireis
        }).status(200)
    }).catch(error => {
        res.send({
            succes: false,
            status: 400,
            error: error
        }).status(400)
    })
}

exports.getInquiryById = async(req,res) => {
    let id = req.params.id;

    await Inquiry.findOne({_id: id}).then(inquireis => {
        res.send({
            sucess: true,
            status: 200,
            inquires: inquireis
        }).status(200)
    }).catch(error => {
        res.send({
            succes: false,
            status: 400,
            error: error
        }).status(400)
    })
}

exports.updateStatus = async(req,res) => {
    let id = req.params.id;
    let status = req.params.status;
    let inquiry;
    try{
        inquiry =  await Inquiry.findOne({_id: id});

    }
    catch(error){
        return res.send({
            success: false,
            status: 404,
            mesage: 'Inquiry not found'
        }).status(404)
    }

    if(status != 0 && status != 1){
        return res.send({
            success: false,
            status: 400,
            message: 'Invalid status'
        }).status(400)
    }

    newInquiry = {
        name: inquiry.name,
        email: inquiry.email,
        message: inquiry.message,
        date: inquiry.date,
        status: status
    }

     Inquiry.findOneAndUpdate({_id: id},newInquiry).then(() => {
         res.send({
             success: true,
             status: 200,
             message: 'Inquiry updated',
             inquiry: {
                 _id: id,
                 name: newInquiry.name,
                 email: newInquiry.email,
                 message: newInquiry.message,
                 date: newInquiry.date,
                 status: status

             }
         }).status(200)
     }).catch(error => {
         res.send({
             success: false,
             status: 400,
             error: error
         })
     })
}


