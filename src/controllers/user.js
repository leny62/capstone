import Users from '../models/users';
import Blog from '../models/users';
import bcrypt from 'bcrypt';
import {signToken} from '../helper/signToken';
import {hashPassword} from '../helper/hash';


export const createAccount = async (req, res) => {
    const user = {
            name: req.body.name,
            email:req.body.email,
            password: req.body.password
    };
    try {
        const existUser = await Users.findOne({ email: user.email });
        
        if (existUser) return res.json({err: 'User exist'}).status(400);
        const newPassword = await hashPassword(user.password);
        
        const newUser = new Users({
            name: user.name,
            email: user.email,
            password: newPassword
        });
        
        const savedUser = await newUser.save();
        
        res.json(savedUser).status(201);
    } catch (error) {
        res.json(error.message).status(400);
    }
};

export const login = async (req, res) => {
    try {
        const user = { email: req.body.email, password: req.body.password }
        const verifyUser = await Users.findOne({ email: user.email })

        if (!verifyUser) return res.json('User not found').status(404);
        const verifyPassword = await bcrypt.compare(user.password, verifyUser.password)

        if (!verifyPassword) return res.json('Password not match').status(400);
        const token = signToken(verifyUser);
        const { _id, name } = verifyUser;
        
        return res.json({User: {_id, name}, token}).status(200);
    } catch (error) {
        return res.json(error.message).status(500);
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.json({users: users}).status(200);
    } catch (error) {
        res.json(error).status(400);
    }
};

export const deleteUser = async (req, res) => {
    try {
        let {id} = req.params;
        const existUser = await Users.find({_id: id});
        
        if (existUser.length) {
            const deletedUser = await Users.deleteOne({_id: id});
            
            res.json({status: 200, 'Deleted user': existUser});
        }
        else {
            res.json('user not found').status(404);
        }
    } catch (error) {
        throw new Error(error)
    }
}

// export const updateUserRole = async (req, res) => {
    // let userId = req.params.id;
    // let user;
    // let role = req.params.role;
    
    // res.json(role)
        
    // if(role != 'ADMIN' && role != 'STANDARD_USER'){
    //     return  res.send({
    //           success: true,
    //           status: 400,
    //           message: "Invalid role"
    //       }).status(400);
    //   }

    // try{
        
        // user = await users.findOne({_id: userId});
        // newUser = {
        //     name: user.name,
        //     email: user.email,
        //     password: user.password,
        //     createdDate: user.createdDate,
        //     role: role
        // }
        // await users.findOneAndUpdate({_id: userId},newUser).then(()=>{
        //     res.send({
        //         success: true,
        //         statsu: 200,
        //         message:"user updated",
        //         user: {
        //             _id: userId,
        //             name: user.name,
        //             email: user.email,
        //             createdDate: user.createdDate,
        //             role: role
        //         }
        //     }).status(200)
        // })
    // }
    // catch(e){
    //     res.send({
    //         success: false,
    //         status: 400,
    //         message:"User not found",
    //     }).status(200)
    // }
// }

// export const resetPassword = async (req,res) => {
//     let id = req.params.id;
//   let newPassword = req.body.newpassword;

//     try{
//         let user = await users.findOne({_id: id});
//         let newUser = {
//             name: user.name,
//             email: user.email,
//             password: await hashPassword(newPassword),
//             createdDate: user.createdDate,
//             role: user.role
//         }

//         await users.findOneAndUpdate({_id: id},newUser).then(()=>{
//             console.log(" No erro")
//             res.send({
//                 success: true,
//                 status: 200,
//                 message: "Password reset"
//             }).status(200)
//         }).catch(error => {
//             res.send({
//                 success: false,
//                 status: 400,
//                 error: error
//             })
//         })

//     }
//     catch(e){
//         res.send({
//             success: false,
//             status: 404,
//             message: 'User not found'
         
//         }).status(404)
//     }
// }
