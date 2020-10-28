import Joi from '@hapi/joi';

export const signupValidateSchema = Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    name: Joi.string().alphanum().min(3).max(30)
.required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
});

