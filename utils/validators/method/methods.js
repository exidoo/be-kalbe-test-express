// Import { body } from 'express-validator'
const { body } = require('express-validator');

const createMethodValidator = [
  body('code').notEmpty().withMessage('Code is required').isString().withMessage('Code must be a string'),
  body('description').notEmpty().withMessage('Description is required').isString().withMessage('Description must be a string'),
  body('created_by_id').notEmpty().withMessage('Created by ID is required').isInt().withMessage('Created by ID must be an integer'),
];

const updateMethodValidator = [
  body('code').optional().isString().withMessage('Code must be a string'),
  body('description').optional().isString().withMessage('Description must be a string'),
  body('is_active').optional().isBoolean().withMessage('Is active must be a boolean'),
  body('last_updated_by_id').notEmpty().withMessage('Last updated by ID is required').isInt().withMessage('Last updated by ID must be an integer'),
];

module.exports = {
  createMethodValidator,
  updateMethodValidator,
};
