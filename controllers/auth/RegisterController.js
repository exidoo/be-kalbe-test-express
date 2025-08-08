//import express
const express = require('express');

// Import validationResult from express-validator
const { validationResult } = require('express-validator');

//import bcrypt
const bcrypt = require('bcryptjs');

//import prisma client
const prisma = require('../../prisma/client');

//function register
const register = async (req, res) => {
  // Periksa hasil validasi
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation error',
      errors: errors.array(),
    });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  try {
    // Insert user ke dalam tabel user_management
    const user = await prisma.user_management.create({
      data: {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
        full_name: req.body.full_name || null,
        role: req.body.role || 'USER',
        is_active: req.body.is_active ?? true,
      },
    });

    res.status(201).send({
      success: true,
      message: 'Register successfully',
      data: user,
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).send({
      success: false,
      message: 'Internal server error',
    });
  }
};

module.exports = { register };
