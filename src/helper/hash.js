import { parseSync } from '@babel/core';
import bcrypt from 'bcryptjs';

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(8);
    
    const hashPassword = await bcrypt.hash(password, salt);
    
    return hashPassword;
};