import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import '../style.css';

function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/user/signup', { username, email, password });
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Signup</h2>

        <form onSubmit={submit}>
          <input
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />

          <input
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button className="btn btn-add" type="submit">
            Signup
          </button>

          <button
            className="btn btn-delete"
            type="button"
            onClick={() => navigate('/login')}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default Signup;


