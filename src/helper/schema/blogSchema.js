import Joi from '@hapi/joi';

export const blogValidateSchema = Joi.object({
  title: Joi.string().regex(/^[a-zA-Z][a-zA-Z0-9',\s]*$/).required(),
  content: Joi.string(),
});
