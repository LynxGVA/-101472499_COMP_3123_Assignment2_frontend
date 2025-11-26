import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/api';
import '../style.css';

function ViewEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [emp, setEmp] = useState(null);

  useEffect(() => {
    API.get(`/emp/employees/${id}`).then(res => setEmp(res.data));
  }, [id]);

  if (!emp) return <div className="container">Loading...</div>;

  return (
    <div className="container">
      <div className="form-container">
        <h3>Employee Details</h3>

        <p><b>First Name:</b> {emp.first_name}</p>
        <p><b>Last Name:</b> {emp.last_name}</p>
        <p><b>Email:</b> {emp.email}</p>
        <p><b>Position:</b> {emp.position}</p>
        <p><b>Department:</b> {emp.department}</p>

        {emp.photo && (
          <img 
            src={`https://101472499-comp-3123-assignment2-backend.onrender.com/uploads/${emp.photo}`}
            width="120"
            alt="profile"
          />
        )}

        <button className="btn btn-update" onClick={() => navigate(`/employees/${id}/update`)}>Update</button>
        <button className="btn btn-delete" onClick={() => navigate('/employees')}>Back</button>
      </div>
    </div>
  );
}

export default ViewEmployee;

