import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  MONGODB: Joi.required(),
  PORT: Joi.number().default(3000),
  DEFAULT_LIMIT: Joi.number().default(6),
});

/**
 ** https://www.npmjs.com/package/joi
 ** https://joi.dev/
 */
