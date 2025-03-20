const Joi = require('joi');

// Validation schema for creating a payment link
const createPaymentLinkSchema = Joi.object({
  walletAddress: Joi.string().required().trim()
    .messages({
      'string.empty': 'Wallet address cannot be empty',
      'any.required': 'Wallet address is required',
    }),
  
  blockchain: Joi.string().required()
    .valid('ethereum', 'bitcoin', 'solana', 'polygon', 'bnb', 'avalanche')
    .messages({
      'string.empty': 'Blockchain cannot be empty',
      'any.required': 'Blockchain is required',
      'any.only': 'Blockchain must be one of: ethereum, bitcoin, solana, polygon, bnb, avalanche',
    }),
  
  currency: Joi.string().required().trim()
    .messages({
      'string.empty': 'Currency cannot be empty',
      'any.required': 'Currency is required',
    }),
  
  amount: Joi.number().optional().min(0)
    .messages({
      'number.base': 'Amount must be a number',
      'number.min': 'Amount cannot be negative',
    }),
  
  memo: Joi.string().optional().trim().max(200)
    .messages({
      'string.max': 'Memo cannot be more than 200 characters',
    }),
  
  title: Joi.string().required().trim()
    .messages({
      'string.empty': 'Title cannot be empty',
      'any.required': 'Title is required',
    }),
  
  description: Joi.string().optional().trim(),
  
  expiresAt: Joi.date().optional().min('now')
    .messages({
      'date.min': 'Expiry date must be in the future',
    }),
});

// Validation schema for updating a payment link
const updatePaymentLinkSchema = Joi.object({
  walletAddress: Joi.string().optional().trim(),
  
  blockchain: Joi.string().optional()
    .valid('ethereum', 'bitcoin', 'solana', 'polygon', 'bnb', 'avalanche')
    .messages({
      'any.only': 'Blockchain must be one of: ethereum, bitcoin, solana, polygon, bnb, avalanche',
    }),
  
  currency: Joi.string().optional().trim(),
  
  amount: Joi.number().optional().min(0)
    .messages({
      'number.base': 'Amount must be a number',
      'number.min': 'Amount cannot be negative',
    }),
  
  memo: Joi.string().optional().trim().max(200)
    .messages({
      'string.max': 'Memo cannot be more than 200 characters',
    }),
  
  title: Joi.string().optional().trim(),
  
  description: Joi.string().optional().trim(),
  
  expiresAt: Joi.date().optional().min('now')
    .messages({
      'date.min': 'Expiry date must be in the future',
    }),
  
  status: Joi.string().optional()
    .valid('active', 'expired', 'disabled')
    .messages({
      'any.only': 'Status must be one of: active, expired, disabled',
    }),
});

// Middleware for validating request body
const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      const errors = error.details.map((detail) => ({
        field: detail.path[0],
        message: detail.message,
      }));
      
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors,
      });
    }
    
    next();
  };
};

module.exports = {
  validateCreatePaymentLink: validateRequest(createPaymentLinkSchema),
  validateUpdatePaymentLink: validateRequest(updatePaymentLinkSchema),
}; 