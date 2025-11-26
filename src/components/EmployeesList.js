import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import '../style.css';

function EmployeesList() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState({ department: '', position: '' });
  const navigate = useNavigate();

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
    <div className="container">

      <div>
        <input
          placeholder="Department"
          value={search.department}
          onChange={e => setSearch({ ...search, department: e.target.value })}
        />
        <input
          placeholder="Position"
          value={search.position}
          onChange={e => setSearch({ ...search, position: e.target.value })}
        />
        <button className="btn btn-view" onClick={fetchEmployees}>Search</button>
      </div>

      <button className="btn btn-add" onClick={() => navigate('/employees/add')}>
        Add Employee
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Date</th>
            <th>Photo</th>
            <th>Actions</th>
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
              <td>
                {e.photo && (
                  <img
                    src={`https://101472499-comp-3123-assignment2-backend.onrender.com/uploads/${e.photo}`}
                    width="60"
                    alt=""
                  />
                )}
              </td>

              <td>
                <button
                  className="btn btn-view"
                  onClick={() => navigate(`/employees/${e._id}`)}
                >
                  View
                </button>

                <button
                  className="btn btn-update"
                  onClick={() => navigate(`/employees/${e._id}/update`)}
                >
                  Update
                </button>

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
    </div>
  );
}

export default EmployeesList;





