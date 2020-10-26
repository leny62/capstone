import { verify } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const auth = (req,res,next) => {
    try{
        let header = req.headers.authorization;

        if(!header) return res.send({success: false, status: 401, message: 'Unauthorized'}).status(400);
        const decode = verify(header, process.env.JWTKEY)
        const user = decode;

        if(user){
            req.userInfo = user;
            next();
        }
        else{
            res.send({succes: false, status: 401, message: 'Invalid token'}).status(401)
        }

    }
    catch(err){
        console.log(err);
        res.send({success: false, error: err}).status(400)
    }
}

export default auth;