import { useState } from 'react';
import API from '../api/api';

function EmployeeForm({ fetchEmployees }) {
  const [form, setForm] = useState({ first_name:'', last_name:'', email:'', position:'', salary:'', department:'', date_of_joining:'' });
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (let key in form) data.append(key, form[key]);
      if (photo) data.append('photo', photo);

      await API.post('/emp/employees', data);
      setForm({ first_name:'', last_name:'', email:'', position:'', salary:'', department:'', date_of_joining:'' });
      setPhoto(null);
      fetchEmployees();
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding employee');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Add Employee</h3>
      <input placeholder="First Name" value={form.first_name} onChange={e => setForm({...form, first_name:e.target.value})} />
      <input placeholder="Last Name" value={form.last_name} onChange={e => setForm({...form, last_name:e.target.value})} />
      <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} />
      <input placeholder="Position" value={form.position} onChange={e => setForm({...form, position:e.target.value})} />
      <input placeholder="Department" value={form.department} onChange={e => setForm({...form, department:e.target.value})} />
      <input placeholder="Salary" type="number" value={form.salary} onChange={e => setForm({...form, salary:e.target.value})} />
      <input placeholder="Date of Joining" type="date" value={form.date_of_joining} onChange={e => setForm({...form, date_of_joining:e.target.value})} />
      <input type="file" onChange={e => setPhoto(e.target.files[0])} />
      <button type="submit">Add</button>
    </form>
  );
}

export default EmployeeForm;

