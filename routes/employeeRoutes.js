const express = require('express');
const router = express.Router();
const {
  getAllEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById
} = require('../controllers/employeeController');
const { verifyToken } = require('../middleware/auth');

router.get('/employees', verifyToken, getAllEmployees);

router.post('/employees', verifyToken, createEmployee);

router.get('/employees/:eid', verifyToken, getEmployeeById);

router.put('/employees/:eid', verifyToken, updateEmployeeById);

router.delete('/employees', verifyToken, deleteEmployeeById);

module.exports = router;
