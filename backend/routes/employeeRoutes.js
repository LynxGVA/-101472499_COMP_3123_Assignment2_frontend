const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');
const empController = require('../controllers/employeeController');

router.get('/employees', verifyToken, empController.getAllEmployees);
router.get('/employees/search', verifyToken, empController.searchEmployees);
router.post('/employees', verifyToken, empController.uploadPhoto, empController.createEmployee);
router.get('/employees/:eid', verifyToken, empController.getEmployeeById);
router.put('/employees/:eid', verifyToken, empController.uploadPhoto, empController.updateEmployeeById);
router.delete('/employees/:eid', verifyToken, empController.deleteEmployeeById);

module.exports = router;

