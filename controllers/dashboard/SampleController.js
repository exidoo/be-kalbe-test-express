// Import express-validator
const { validationResult } = require('express-validator');

// Import Prisma client
const prisma = require('../../prisma/client');

// CREATE a new sample type
const createSampleType = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation error',
      errors: errors.array(),
    });
  }

  try {
    const sampleType = await prisma.m_ca_sample_types.create({
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
      message: 'Sample type created successfully',
      data: sampleType,
    });
  } catch (error) {
    console.error('Error creating sample type:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// READ all sample types
const getAllSampleTypes = async (req, res) => {
  try {
    const sampleTypes = await prisma.m_ca_sample_types.findMany();
    res.status(200).json({
      success: true,
      message: 'Sample types retrieved successfully',
      data: sampleTypes,
    });
  } catch (error) {
    console.error('Error getting all sample types:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// READ a single sample type by ID
const getSampleTypeById = async (req, res) => {
  const { id } = req.params;

  try {
    const sampleType = await prisma.m_ca_sample_types.findUnique({
      where: { id: parseInt(id) },
    });

    if (!sampleType) {
      return res.status(404).json({
        success: false,
        message: 'Sample type not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Sample type retrieved successfully',
      data: sampleType,
    });
  } catch (error) {
    console.error('Error getting sample type by ID:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// UPDATE a sample type by ID
const updateSampleType = async (req, res) => {
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
    const updatedSampleType = await prisma.m_ca_sample_types.update({
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
      message: 'Sample type updated successfully',
      data: updatedSampleType,
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Sample type not found',
      });
    }
    console.error('Error updating sample type:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// DELETE a sample type by ID
const deleteSampleType = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedSampleType = await prisma.m_ca_sample_types.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      success: true,
      message: 'Sample type deleted successfully',
      data: deletedSampleType,
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Sample type not found',
      });
    }
    console.error('Error deleting sample type:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

module.exports = {
  createSampleType,
  getAllSampleTypes,
  getSampleTypeById,
  updateSampleType,
  deleteSampleType,
};
