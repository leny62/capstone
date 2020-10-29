import Joi from '@hapi/joi';

export const signupValidateSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    name: Joi.string().regex(/^[a-zA-Z][a-zA-Z0-9',\s]*$/).required(),
    password: Joi.string().min(3).max(30).required().required(),
});

export const signinValidateSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(3).max(30).required().required(),
});

