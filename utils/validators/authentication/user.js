//import express validator
const { body } = require('express-validator');

//import prisma
const prisma = require('../../../prisma/client');

// Validator untuk create/update user_management
const validateUser = [
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .custom(async (value, { req }) => {
      const user = await prisma.user_management.findUnique({ where: { username: value } });

      if (user && user.id !== Number(req.params.id)) {
        throw new Error('Username already exists');
      }
      return true;
    }),

  body('email')
    .optional({ nullable: true }) // email di schema bisa null
    .isEmail()
    .withMessage('Email is invalid')
    .custom(async (value, { req }) => {
      if (!value) return true;
      const user = await prisma.user_management.findUnique({ where: { email: value } });
      if (user && user.id !== Number(req.params.id)) {
        throw new Error('Email already exists');
      }
      return true;
    }),

  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  body('full_name').optional().isString().withMessage('Full name must be a string'),

  body('role')
    .optional()
    .isIn(['ADMIN', 'ANALYST', 'USER']) // sesuaikan role yang valid
    .withMessage('Role must be one of: ADMIN, ANALYST, USER'),

  body('is_active').optional().isBoolean().withMessage('is_active must be a boolean'),
];

module.exports = { validateUser };
