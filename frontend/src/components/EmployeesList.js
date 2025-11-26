import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api/api';
import '../style.css';

function EmployeesList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState({ department: '', position: '' });

  const fetchEmployees = async () => {
    let url = '/emp/employees';
    const params = {};

    if (search.department) params.department = search.department;
    if (search.position) params.position = search.position;

    if (Object.keys(params).length > 0) {
      const query = new URLSearchParams(params).toString();
      url = `/emp/employees/search?${query}`;
    }

    const res = await API.get(url);
    setEmployees(res.data);
  };

  useEffect(() => { fetchEmployees(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete employee?")) return;
    await API.delete(`/emp/employees/${id}`);
    fetchEmployees();
  };

  return (
    <div className="container">
      <div style={{ marginBottom: '15px' }}>
        <input
          placeholder="Department"
          value={search.department}
          onChange={e => setSearch({ ...search, department: e.target.value })}
        />
        <input
          placeholder="Position"
          value={search.position}
          onChange={e => setSearch({ ...search, position: e.target.value })}
          style={{ marginLeft: '5px' }}
        />
        <button className="btn btn-view" onClick={fetchEmployees} style={{ marginLeft: '5px' }}>
          Search
        </button>
      </div>

      <Link to="/employees/add">
        <button className="btn btn-add">Add Employee</button>
      </Link>

      <table className="table">
        <thead>
          <tr>
            <th>First Name</th><th>Last Name</th><th>Email</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(e => (
            <tr key={e._id}>
              <td>{e.first_name}</td>
              <td>{e.last_name}</td>
              <td>{e.email}</td>
              <td>
                <Link to={`/employees/${e._id}`}>
                  <button className="btn btn-view">View</button>
                </Link>

                <Link to={`/employees/${e._id}/update`}>
                  <button className="btn btn-update">Update</button>
                </Link>

                <button 
                  className="btn btn-delete"
                  onClick={() => handleDelete(e._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button 
        className="btn btn-delete" 
        onClick={() => { localStorage.removeItem('token'); window.location='/login'; }}
      >
        Logout
      </button>
    </div>
  );
}

export default EmployeesList;



