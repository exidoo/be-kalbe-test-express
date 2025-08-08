// Import express-validator
const { validationResult } = require('express-validator');

// Import Prisma client
const prisma = require('../../prisma/client');

// CREATE a new parameter
const createParameter = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation error',
      errors: errors.array(),
    });
  }

  try {
    const parameter = await prisma.m_ca_parameters.create({
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
      message: 'Parameter created successfully',
      data: parameter,
    });
  } catch (error) {
    console.error('Error creating parameter:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// READ all parameters
const getAllParameters = async (req, res) => {
  try {
    const parameters = await prisma.m_ca_parameters.findMany();
    res.status(200).json({
      success: true,
      message: 'Parameters retrieved successfully',
      data: parameters,
    });
  } catch (error) {
    console.error('Error getting all parameters:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// READ a single parameter by ID
const getParameterById = async (req, res) => {
  const { id } = req.params;

  try {
    const parameter = await prisma.m_ca_parameters.findUnique({
      where: { id: parseInt(id) },
    });

    if (!parameter) {
      return res.status(404).json({
        success: false,
        message: 'Parameter not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Parameter retrieved successfully',
      data: parameter,
    });
  } catch (error) {
    console.error('Error getting parameter by ID:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// UPDATE a parameter by ID
const updateParameter = async (req, res) => {
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
    const updatedParameter = await prisma.m_ca_parameters.update({
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
      message: 'Parameter updated successfully',
      data: updatedParameter,
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Parameter not found',
      });
    }
    console.error('Error updating parameter:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// DELETE a parameter by ID
const deleteParameter = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedParameter = await prisma.m_ca_parameters.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      success: true,
      message: 'Parameter deleted successfully',
      data: deletedParameter,
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Parameter not found',
      });
    }
    console.error('Error deleting parameter:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

module.exports = {
  createParameter,
  getAllParameters,
  getParameterById,
  updateParameter,
  deleteParameter,
};
