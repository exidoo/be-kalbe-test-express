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
router.post('/parameters', createParameterValidator, parameterController.createParameter);
router.get('/parameters', parameterController.getAllParameters);
router.get('/parameters/:id', parameterController.getParameterById);
router.put('/parameters/:id', updateParameterValidator, parameterController.updateParameter);
router.delete('/parameters/:id', parameterController.deleteParameter);

// Method Routes
router.post('/methods', createMethodValidator, methodController.createMethod);
router.get('/methods', methodController.getAllMethods);
router.get('/methods/:id', methodController.getMethodById);
router.put('/methods/:id', updateMethodValidator, methodController.updateMethod);
router.delete('/methods/:id', methodController.deleteMethod);

// Sample Routes
router.post('/samples', createSampleTypeValidator, sampleController.createSampleType);
router.get('/samples', sampleController.getAllSampleTypes);
router.get('/samples/:id', sampleController.getSampleTypeById);
router.put('/samples/:id', updateSampleTypeValidator, sampleController.updateSampleType);
router.delete('/samples/:id', sampleController.deleteSampleType);

// Analys Routes
router.post('/analyses', createAnalysisValidator, analysesController.createAnalysis);
router.get('/analyses', analysesController.getAllAnalyses);
router.get('/analyses/:id', analysesController.getAnalysisById);
router.put('/analyses/:id', updateAnalysisValidator, analysesController.updateAnalysis);
router.delete('/analyses/:id', analysesController.deleteAnalysis);

//export router
module.exports = router;
