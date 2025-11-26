const Employee = require('../models/employeeModel');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

exports.uploadPhoto = multer({ storage: storage }).single('photo');

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    let data = req.body;

    if (req.file) {
      data.photo = req.file.filename;
    }

    if (!data.date_of_joining || data.date_of_joining === "") {
      return res.status(400).json({ message: "Date of joining is required" });
    }

    data.date_of_joining = new Date(data.date_of_joining);

    const newEmp = new Employee(data);
    await newEmp.save();

    res.status(201).json({ message: 'Employee created', id: newEmp._id });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.eid);
    if (!emp) return res.status(404).json({ message: 'Not found' });
    res.status(200).json(emp);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateEmployeeById = async (req, res) => {
  try {
    let data = req.body;

    if (req.file) {
      data.photo = req.file.filename;
    }

    if (data.date_of_joining && data.date_of_joining !== "") {
      data.date_of_joining = new Date(data.date_of_joining);
    }

    await Employee.findByIdAndUpdate(req.params.eid, data);
    res.status(200).json({ message: 'Employee updated' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteEmployeeById = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.eid);
    res.status(200).json({ message: 'Employee deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.searchEmployees = async (req, res) => {
  try {
    const { department, position } = req.query;

    const filter = {};
    if (department) filter.department = department;
    if (position) filter.position = position;

    const employees = await Employee.find(filter);
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

