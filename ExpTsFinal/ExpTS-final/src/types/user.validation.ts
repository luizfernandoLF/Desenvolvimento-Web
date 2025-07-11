import Joi from 'joi';

export const createUserSchema = Joi.object({
  fullname: Joi.string().required().max(100),
  email: Joi.string().email().required().max(100),
  password: Joi.string().required().min(6),
  major_id: Joi.string().required().length(36), 
});

export const updateUserSchema = Joi.object({
  fullname: Joi.string().max(100).optional(),
  email: Joi.string().email().max(100).optional(),
  major_id: Joi.string().length(36).optional(), 
}).min(1) 
  .unknown(true);