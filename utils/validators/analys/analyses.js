// Import { body } from 'express-validator'
const { body } = require('express-validator');

const createAnalysisValidator = [
  body('code').notEmpty().withMessage('Code is required').isString().withMessage('Code must be a string'),
  body('description').notEmpty().withMessage('Description is required').isString().withMessage('Description must be a string'),
  body('lead_time').notEmpty().withMessage('Lead time is required').isInt().withMessage('Lead time must be an integer'),
  body('parameter_id').notEmpty().withMessage('Parameter ID is required').isInt().withMessage('Parameter ID must be an integer'),
  body('method_id').notEmpty().withMessage('Method ID is required').isInt().withMessage('Method ID must be an integer'),
  body('sample_type_id').notEmpty().withMessage('Sample type ID is required').isInt().withMessage('Sample type ID must be an integer'),
  // body('created_by_id').notEmpty().withMessage('Created by ID is required').isInt().withMessage('Created by ID must be an integer'),
];

const updateAnalysisValidator = [
  body('code').optional().isString().withMessage('Code must be a string'),
  body('description').optional().isString().withMessage('Description must be a string'),
  body('lead_time').optional().isInt().withMessage('Lead time must be an integer'),
  body('parameter_id').optional().isInt().withMessage('Parameter ID must be an integer'),
  body('method_id').optional().isInt().withMessage('Method ID must be an integer'),
  body('sample_type_id').optional().isInt().withMessage('Sample type ID must be an integer'),
  body('is_active').optional().isBoolean().withMessage('Is active must be a boolean'),
  // body('last_updated_by_id').notEmpty().withMessage('Last updated by ID is required').isInt().withMessage('Last updated by ID must be an integer'),
];

module.exports = {
  createAnalysisValidator,
  updateAnalysisValidator,
};
