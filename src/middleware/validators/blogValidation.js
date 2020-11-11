import dotenv from 'dotenv';
import joiErrorTemplate from '../errorTemplate/errors';
import { blogValidateSchema } from '../../helper/schema/blogSchema';


dotenv.config();

class BlogValidator {
  static createBlogDataValidate(req, res, next) {
    const { error } = blogValidateSchema.validate(req.body);
    joiErrorTemplate(req, res, next, error);
  }

}

export default BlogValidator;
