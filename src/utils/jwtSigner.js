import { get } from 'config';
import { sign } from 'jsonwebtoken';
import { users } from '../models/users';

const jwtSigner=(user)=>{
    let token = sign(user, process.env.JWTKEY);
    return token;
}

export default jwtSigner;