import dotenv from 'dotenv';
import joiErrorTemplate from '../errorTemplate/errors';
import { signupValidateSchema } from '../../helper/schema/usersSchema';


dotenv.config();

class usersValidator {
  static createuserDataValidate(req, res, next) {
    const { error } = signupValidateSchema.validate(req.body);
    joiErrorTemplate(req, res, next, error);
  }

}

export default usersValidator;
