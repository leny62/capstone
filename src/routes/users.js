import userController from '../controllers/user';
import { Router } from 'express';
import authMiddleware from '../middleware/auth';
import isAdmin from '../middleware/admin';
import { createAccount, login, getUsers, updateUserRole, resetPassword } from '../controllers/user';
import usersValidator from '../middleware/validators/usersValidation';

const router = Router();

router.post('/signUp', [
    usersValidator.createuserDataValidate
], createAccount);

router.post('/login',[
    usersValidator.singInUser
], login);

router.get('/',[
    isAdmin
],getUsers);

router.put('/updateRole/user/:id/role/:role',[
    isAdmin
],updateUserRole);

router.put('/resetpassword/user/:id', [isAdmin],resetPassword);


export default router;