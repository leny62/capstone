import jwt from 'jsonwebtoken'
import config from '../config/config';

export const signToken = (data) => {
    const JWTKEY = config.JWTKEY;
    const { name, email, _id, role } = data;
    
    try {
        return jwt.sign(
            { name, email, _id, role},
            JWTKEY,
            { expiresIn: '1d' }
        );
    }
    catch (error) {
        throw new Error('No token');
    }
};