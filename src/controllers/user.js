import { UniqueId } from '../utils/uniqueId';
import hashPassword from '../utils/hashPassword';
import { pick } from 'lodash';
import { compare } from 'bcrypt';
import { users } from '../models/users';
import getCurrentDate from '../utils/date';
import jwtSigner from '../utils/jwtSigner';
import Response from '../utils/response';

const response = new Response();

export const createAccount = async(req,res) => {
  let user=await users.findOne({email:req.body.email});

    if(user){
        response.setError(409,`A User with email ${req.body.email} Already exist`);
        return response.send(res);
        }

    user = new users(pick(req.body,['name','email','password']))
    const harshed = await hashPassword(user.password)
    user.password = harshed;
    user.role = 'STANDARD_USER',
    user.createdDate = await getCurrentDate();
    await user.save();
    return res.send({
        succcess: true,
        message: 'User created',
        status: 201,
        user:  pick(user,['_id','name','email','createdDate','role'])

       }).status(201)
}

export const login = async (req,res) => {
 let user = await users.findOne({email: req.body.email});
  
    if(!user){
        return res.send({
            success: false,
            status: 401,
            message: "Invalid Email or Password"
        }).status(401)
    }

    let validPassword = await compare(req.body.password,user.password);
    if(!validPassword){
        return res.send({
            success: false,
            status: 401,
            message: "Invalid Email or Password"
        }).status(401)
    }
    let currentUser = pick(user,['_id','name','email','role'])
    return res.send({
        success: true,
        status: 200,
        user: currentUser,
        token: await jwtSigner(currentUser)

    })
 }

export const getUsers = async (req,res) => {
      await users.find().then((users)=>{
          res.send({success: true, status: 200, users: users}).status(200);
      })
}

export const updateUserRole = async (req, res) => {
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
        
        user = await users.findOne({_id: userId});
        newUser = {
            name: user.name,
            email: user.email,
            password: user.password,
            createdDate: user.createdDate,
            role: role
        }
        await users.findOneAndUpdate({_id: userId},newUser).then(()=>{
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

export const resetPassword = async (req,res) => {
    let id = req.params.id;
  let newPassword = req.body.newpassword;

    try{
        let user = await users.findOne({_id: id});
        let newUser = {
            name: user.name,
            email: user.email,
            password: await hashPassword(newPassword),
            createdDate: user.createdDate,
            role: user.role
        }

        await users.findOneAndUpdate({_id: id},newUser).then(()=>{
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
