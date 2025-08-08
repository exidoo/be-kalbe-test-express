// Import express-validator
const { validationResult } = require('express-validator');

// Import Prisma client
const prisma = require('../../prisma/client');

// CREATE a new analysis
const createAnalysis = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation error',
      errors: errors.array(),
    });
  }

  try {
    const { code, description, lead_time, parameter_id, method_id, sample_type_id, created_by_id, is_active } = req.body;

    const analysis = await prisma.m_ca_analyses.create({
      data: {
        code,
        description,
        lead_time: parseInt(lead_time),
        parameter_id: parseInt(parameter_id),
        method_id: parseInt(method_id),
        sample_type_id: parseInt(sample_type_id),
        created_by_id: parseInt(created_by_id),
        is_active: is_active ?? true,
        created_on: new Date(),
      },
    });

    res.status(201).json({
      success: true,
      message: 'Analysis created successfully',
      data: analysis,
    });
  } catch (error) {
    console.error('Error creating analysis:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// READ all analyses
const getAllAnalyses = async (req, res) => {
  try {
    const analyses = await prisma.m_ca_analyses.findMany({
      include: {
        parameter: true,
        method: true,
        sample_type: true,
      },
    });
    res.status(200).json({
      success: true,
      message: 'Analyses retrieved successfully',
      data: analyses,
    });
  } catch (error) {
    console.error('Error getting all analyses:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// READ a single analysis by ID
const getAnalysisById = async (req, res) => {
  const { id } = req.params;

  try {
    const analysis = await prisma.m_ca_analyses.findUnique({
      where: { id: parseInt(id) },
      include: {
        parameter: true,
        method: true,
        sample_type: true,
      },
    });

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: 'Analysis not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Analysis retrieved successfully',
      data: analysis,
    });
  } catch (error) {
    console.error('Error getting analysis by ID:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// UPDATE an analysis by ID
const updateAnalysis = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: 'Validation error',
      errors: errors.array(),
    });
  }

  const { id } = req.params;
  const { code, description, lead_time, parameter_id, method_id, sample_type_id, is_active, last_updated_by_id } = req.body;

  try {
    const updatedAnalysis = await prisma.m_ca_analyses.update({
      where: { id: parseInt(id) },
      data: {
        code,
        description,
        lead_time: lead_time ? parseInt(lead_time) : undefined,
        parameter_id: parameter_id ? parseInt(parameter_id) : undefined,
        method_id: method_id ? parseInt(method_id) : undefined,
        sample_type_id: sample_type_id ? parseInt(sample_type_id) : undefined,
        is_active,
        last_updated_by_id: parseInt(last_updated_by_id),
        last_updated_on: new Date(),
      },
    });

    res.status(200).json({
      success: true,
      message: 'Analysis updated successfully',
      data: updatedAnalysis,
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Analysis not found',
      });
    }
    console.error('Error updating analysis:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

// DELETE an analysis by ID
const deleteAnalysis = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedAnalysis = await prisma.m_ca_analyses.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      success: true,
      message: 'Analysis deleted successfully',
      data: deletedAnalysis,
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({
        success: false,
        message: 'Analysis not found',
      });
    }
    console.error('Error deleting analysis:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

module.exports = {
  createAnalysis,
  getAllAnalyses,
  getAnalysisById,
  updateAnalysis,
  deleteAnalysis,
};
