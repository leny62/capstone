let {UniqueId } = require('../utils/uniqueId');
const hashPassword  = require('../utils/hashPassword');
const _ = require('lodash');
const bcrypt = require('bcrypt')
const {User} = require('../models/users');
const getCurrentDate = require('../utils/date');
const jwtSigner = require('../utils/jwtSigner');

exports.createAccount = async (req,res) =>{
  let user=await User.findOne({email:req.body.email})
    if(user) return res.send('User already registered').status(400)

    user =new User(_.pick(req.body,['name','email','password']))
    const harshed = await hashPassword(user.password)
    user.password = harshed;
    user.role = 'STANDARD_USER',
    user.createdDate = await getCurrentDate();
    await user.save();
    return res.send({
        succcess: true,
        message: 'User created',
        status: 201,
        user:  _.pick(user,['_id','name','email','createdDate','role'])

       }).status(201)
}

exports.login = async(req,res)=>{
 let user = await User.findOne({email: req.body.email});
  
    if(!user){
        return res.send({
            success: false,
            status: 401,
            message: "Invalid Email or Password"
        }).status(401)
    }

    let validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword){
        return res.send({
            success: false,
            status: 401,
            message: "Invalid Email or Password"
        }).status(401)
    }
    let currentUser = _.pick(user,['_id','name','email','role'])
    return res.send({
        success: true,
        status: 200,
        user: currentUser,
        token: await jwtSigner(currentUser)

    })
 }

exports.getUsers = async(req,res) =>{
      await User.find().then((users)=>{
          res.send({success: true, status: 200, users: users}).status(200);
      })
}

exports.updateUserRole = async(req, res)=>{
    let userId = req.params.id;
    let user;
    let role = req.params.role;
        
    if(role != 'ADMIN' && role != 'STANDARD_USER'){
        return  res.send({
              success: true,
              status: 400,
              message: "Invalid role"
          }).status(400);
      }

    try{
        
        user = await User.findOne({_id: userId});
        newUser = {
            name: user.name,
            email: user.email,
            password: user.password,
            createdDate: user.createdDate,
            role: role
        }
        await User.findOneAndUpdate({_id: userId},newUser).then(()=>{
            res.send({
                success: true,
                statsu: 200,
                message:"user updated",
                user: {
                    _id: userId,
                    name: user.name,
                    email: user.email,
                    createdDate: user.createdDate,
                    role: role
                }
            }).status(200)
        })
    }
    catch(e){
        res.send({
            success: false,
            status: 400,
            message:"User not found",
        }).status(200)
    }
}

exports.resetPassword = async(req,res) => {
    let id = req.params.id;
  let newPassword = req.body.newpassword;

    try{
        let user = await User.findOne({_id: id});
        let newUser = {
            name: user.name,
            email: user.email,
            password: await hashPassword(newPassword),
            createdDate: user.createdDate,
            role: user.role
        }

        await User.findOneAndUpdate({_id: id},newUser).then(()=>{
            console.log(" No erro")
            res.send({
                success: true,
                status: 200,
                message: "Password reset"
            }).status(200)
        }).catch(error => {
            res.send({
                success: false,
                status: 400,
                error: error
            })
        })

    }
    catch(e){
        res.send({
            success: false,
            status: 404,
            message: 'User not found'
         
        }).status(404)
    }


}
