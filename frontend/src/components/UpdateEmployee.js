import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/api';
import '../style.css';

function UpdateEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({});
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    API.get(`/emp/employees/${id}`).then(res => setForm(res.data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    for (let key in form) data.append(key, form[key]);
    if (photo) data.append('photo', photo);

    await API.put(`/emp/employees/${id}`, data);
    navigate('/employees');
  };

  if (!form.first_name) return null;

  return (
    <div className="container">
      <div className="form-container">
        <h3>Update Employee</h3>

        <form onSubmit={handleSubmit}>
          <input value={form.first_name} onChange={e => setForm({...form, first_name:e.target.value})} />
          <input value={form.last_name} onChange={e => setForm({...form, last_name:e.target.value})} />
          <input value={form.email} onChange={e => setForm({...form, email:e.target.value})} />
          <input value={form.position} onChange={e => setForm({...form, position:e.target.value})} />
          <input value={form.department} onChange={e => setForm({...form, department:e.target.value})} />
          <input type="number" value={form.salary} onChange={e => setForm({...form, salary:e.target.value})} />
          <input type="date" value={form.date_of_joining?.substring(0,10)} onChange={e => setForm({...form, date_of_joining:e.target.value})} />
          <input type="file" onChange={e => setPhoto(e.target.files[0])} />

          <button className="btn btn-update" type="submit">Save</button>
          <button className="btn btn-delete" type="button" onClick={() => navigate('/employees')}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default UpdateEmployee;
