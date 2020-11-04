import { verify } from 'jsonwebtoken';
import config from '../config/config';

const JWTKEY = config.JWTKEY;

export const loggedUser = (req, res, next) => {
    const header = req.header('auth-token');
    
    if (!header) return res.json('No access').status(401);
    
    try {
        const decode = verify(header, JWTKEY);
        req.user = decode;
        
        return next();
    } catch (error) {
        return res.json('Token not valid').status(403);
    }
};

export const isAdmin = (req, res, next) => {
    // const  {role} = req.user;
    // console.log(role)
    
    // if (!role) return res.json('No access').status();

    return next();
}