//import express validator
const { body } = require('express-validator');

//import prisma
const prisma = require('../../../prisma/client');

// Validasi untuk register
const validateRegister = [
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .custom(async (value) => {
      const existing = await prisma.user_management.findUnique({ where: { username: value } });
      if (existing) {
        throw new Error('Username already exists');
      }
      return true;
    }),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email is invalid')
    .custom(async (value) => {
      const existing = await prisma.user_management.findUnique({ where: { email: value } });
      if (existing) {
        throw new Error('Email already exists');
      }
      return true;
    }),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('full_name').optional().isString().withMessage('Full name must be a string'),
  body('role')
    .optional()
    .isIn(['ADMIN', 'ANALYST', 'USER']) // Sesuaikan jika ada role lain
    .withMessage('Role must be one of: ADMIN, ANALYST, USER'),
];

// Validasi untuk login
const validateLogin = [body('username').notEmpty().withMessage('Username is required'), body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')];

module.exports = {
  validateRegister,
  validateLogin,
};
