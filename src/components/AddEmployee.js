import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import '../style.css';

function AddEmployee() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name:'', last_name:'', email:'',
    position:'', salary:'', department:'', date_of_joining:''
  });
  const [photo, setPhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in form) data.append(key, form[key]);
    if (photo) data.append('photo', photo);

    await API.post('/emp/employees', data);
    navigate('/employees');
  };

  return (
    <div className="container">
      <div className="form-container">
        <h3>Add Employee</h3>

        <form onSubmit={handleSubmit}>
          <input placeholder="First Name" value={form.first_name} onChange={e => setForm({...form, first_name:e.target.value})} />
          <input placeholder="Last Name" value={form.last_name} onChange={e => setForm({...form, last_name:e.target.value})} />
          <input placeholder="Email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} />
          <input placeholder="Position" value={form.position} onChange={e => setForm({...form, position:e.target.value})} />
          <input placeholder="Department" value={form.department} onChange={e => setForm({...form, department:e.target.value})} />
          <input placeholder="Salary" type="number" value={form.salary} onChange={e => setForm({...form, salary:e.target.value})} />
          <input type="date" value={form.date_of_joining} onChange={e => setForm({...form, date_of_joining:e.target.value})} />
          <input type="file" onChange={e => setPhoto(e.target.files[0])} />

          <button className="btn btn-add" type="submit">Save</button>
          <button className="btn btn-delete" type="button" onClick={() => navigate('/employees')}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default AddEmployee;
