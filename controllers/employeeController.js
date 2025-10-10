const Employee = require('../models/employeeModel');

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const newEmp = new Employee(req.body);
    await newEmp.save();
    res.status(201).json({
      message: 'Employee created successfully.',
      employee_id: newEmp._id
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.eid);
    if (!emp) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.status(200).json(emp);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateEmployeeById = async (req, res) => {
  try {
    await Employee.findByIdAndUpdate(req.params.eid, req.body);
    res.status(200).json({ message: 'Employee details updated successfully.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteEmployeeById = async (req, res) => {
  try {
    const empId = req.query.eid;
    await Employee.findByIdAndDelete(empId);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};