import userController from '../controllers/user';
import { Router } from 'express';
import {loggedUser, isAdmin} from '../middleware/admin';
import { createAccount, login, getUsers, updateUserRole, resetPassword, deleteUser } from '../controllers/user';

const router = Router();

router.post('/signUp', createAccount);

router.post('/login', login);

router.get('/', [loggedUser, isAdmin], getUsers);

// router.put('/updateRole/user/:id/role/:role',[isAdmin],updateUserRole);

// router.put('/resetpassword/user/:id', [isAdmin],resetPassword);

router.delete('/deleteUser/:id', [loggedUser, isAdmin], deleteUser);

export default router;