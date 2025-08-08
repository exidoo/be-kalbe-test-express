//import express
const express = require('express');

//init express router
const router = express.Router();

//import verifyToken
const verifyToken = require('../middlewares/auth');

// =================================== CONTROLLER ===================================
// Auth
const registerController = require('../controllers/auth/RegisterController');
const loginController = require('../controllers/auth/LoginController');

// Dashboard
const parameterController = require('../controllers/dashboard/ParameterController');
const methodController = require('../controllers/dashboard/MethodController');
const sampleController = require('../controllers/dashboard/SampleController');
const analysesController = require('../controllers/dashboard/AnalysesController');

// =================================== VALIDATE ===================================
// Auth
const { validateRegister, validateLogin } = require('../utils/validators/authentication/auth');

// Dashboard
const { createParameterValidator, updateParameterValidator } = require('../utils/validators/parameter/parameters');
const { createMethodValidator, updateMethodValidator } = require('../utils/validators/method/methods');
const { createSampleTypeValidator, updateSampleTypeValidator } = require('../utils/validators/sample/samples');
const { createAnalysisValidator, updateAnalysisValidator } = require('../utils/validators/analys/analyses');

// =================================== ROUTES ===================================
// Auth Route
router.post('/register', validateRegister, registerController.register);
router.post('/login', validateLogin, loginController.login);

// Parameter Routes
router.post('/parameters', verifyToken, createParameterValidator, parameterController.createParameter);
router.get('/parameters', verifyToken, parameterController.getAllParameters);
router.get('/parameters/:id', verifyToken, parameterController.getParameterById);
router.put('/parameters/:id', verifyToken, updateParameterValidator, parameterController.updateParameter);
router.delete('/parameters/:id', verifyToken, parameterController.deleteParameter);

// Method Routes
router.post('/methods', verifyToken, createMethodValidator, methodController.createMethod);
router.get('/methods', verifyToken, methodController.getAllMethods);
router.get('/methods/:id', verifyToken, methodController.getMethodById);
router.put('/methods/:id', verifyToken, updateMethodValidator, methodController.updateMethod);
router.delete('/methods/:id', verifyToken, methodController.deleteMethod);

// Sample Routes
router.post('/samples', verifyToken, createSampleTypeValidator, sampleController.createSampleType);
router.get('/samples', verifyToken, sampleController.getAllSampleTypes);
router.get('/samples/:id', verifyToken, sampleController.getSampleTypeById);
router.put('/samples/:id', verifyToken, updateSampleTypeValidator, sampleController.updateSampleType);
router.delete('/samples/:id', verifyToken, sampleController.deleteSampleType);

// Analys Routes
router.post('/analyses', verifyToken, createAnalysisValidator, analysesController.createAnalysis);
router.get('/analyses', verifyToken, analysesController.getAllAnalyses);
router.get('/analyses/:id', verifyToken, analysesController.getAnalysisById);
router.put('/analyses/:id', verifyToken, updateAnalysisValidator, analysesController.updateAnalysis);
router.delete('/analyses/:id', verifyToken, analysesController.deleteAnalysis);

//export router
module.exports = router;
