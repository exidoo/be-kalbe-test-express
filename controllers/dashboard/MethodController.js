// Import express-validator
const { validationResult } = require('express-validator');

// Import Prisma client
const prisma = require('../../prisma/client');

// CREATE a new method
const createMethod = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation error',
      errors: errors.array(),
    });
  }

  try {
    const method = await prisma.m_ca_methods.create({
      data: {
        code: req.body.code,
        description: req.body.description,
        is_active: req.body.is_active || true,
        created_by_id: req.body.created_by_id,
        created_on: new Date(),
      },
    });

    res.status(201).json({
      success: true,
      message: 'Method created successfully',
      data: method,
    });
  } catch (error) {
    console.error('Error creating method:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// READ all methods
const getAllMethods = async (req, res) => {
  try {
    const methods = await prisma.m_ca_methods.findMany();
    res.status(200).json({
      success: true,
      message: 'Methods retrieved successfully',
      data: methods,
    });
  } catch (error) {
    console.error('Error getting all methods:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// READ a single method by ID
const getMethodById = async (req, res) => {
  const { id } = req.params;

  try {
    const method = await prisma.m_ca_methods.findUnique({
      where: { id: parseInt(id) },
    });

    if (!method) {
      return res.status(404).json({
        success: false,
        message: 'Method not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Method retrieved successfully',
      data: method,
    });
  } catch (error) {
    console.error('Error getting method by ID:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// UPDATE a method by ID
const updateMethod = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation error',
      errors: errors.array(),
    });
  }

  const { id } = req.params;
  const { code, description, is_active, last_updated_by_id } = req.body;

  try {
    const updatedMethod = await prisma.m_ca_methods.update({
      where: { id: parseInt(id) },
      data: {
        code,
        description,
        is_active,
        last_updated_by_id: parseInt(last_updated_by_id),
        last_updated_on: new Date(),
      },
    });

    res.status(200).json({
      success: true,
      message: 'Method updated successfully',
      data: updatedMethod,
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Method not found',
      });
    }
    console.error('Error updating method:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// DELETE a method by ID
const deleteMethod = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMethod = await prisma.m_ca_methods.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      success: true,
      message: 'Method deleted successfully',
      data: deletedMethod,
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Method not found',
      });
    }
    console.error('Error deleting method:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

module.exports = {
  createMethod,
  getAllMethods,
  getMethodById,
  updateMethod,
  deleteMethod,
};
