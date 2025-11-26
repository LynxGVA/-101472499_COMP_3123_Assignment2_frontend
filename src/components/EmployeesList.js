import { useEffect, useState, useCallback } from 'react';
import API from '../api/api';
import EmployeeForm from './EmployeeForm';

function EmployeesList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState({ department: '', position: '' });

  const fetchEmployees = useCallback(async () => {
    try {
      const query = new URLSearchParams(search).toString();
      const url = query ? `/emp/employees/search?${query}` : '/emp/employees';
      const res = await API.get(url);
      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [search]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this employee?')) return;
    await API.delete(`/emp/employees/${id}`);
    fetchEmployees();
  };

  return (
    <div>
      <h2>Employees</h2>
      <button onClick={() => { localStorage.removeItem('token'); window.location='/login'; }}>Logout</button>

      <div>
        <input 
          placeholder="Department" 
          value={search.department} 
          onChange={e => setSearch({...search, department: e.target.value})} 
        />
        <input 
          placeholder="Position" 
          value={search.position} 
          onChange={e => setSearch({...search, position: e.target.value})} 
        />
        <button onClick={fetchEmployees}>Search</button>
      </div>

      <EmployeeForm fetchEmployees={fetchEmployees} />

      <table border="1">
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Position</th>
            <th>Department</th><th>Salary</th><th>Date</th><th>Photo</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(e => (
            <tr key={e._id}>
              <td>{e.first_name} {e.last_name}</td>
              <td>{e.email}</td>
              <td>{e.position}</td>
              <td>{e.department}</td>
              <td>{e.salary}</td>
              <td>{new Date(e.date_of_joining).toLocaleDateString()}</td>
              <td>{e.photo && <img src={`http://localhost:8081/uploads/${e.photo}`} width="50" alt="" />}</td>
              <td>
                <button onClick={() => handleDelete(e._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeesList;




