import Joi from 'joi'; 

export const createMajorSchema = Joi.object({
  name: Joi.string().required().max(100), 
  code: Joi.string().required().length(4), 
  description: Joi.string().max(255).allow('').optional(), 
});

export const updateMajorSchema = Joi.object({
  name: Joi.string().max(100).optional(),
  code: Joi.string().length(4).optional(),
  description: Joi.string().max(255).allow('').optional(),
}).min(1)
.unknown(true);