import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import '../style.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post('/user/login', { email, password });

      if (!res.data.token) {
        alert("No token found");
        return;
      }

      localStorage.setItem('token', res.data.token);

      navigate('/employees', { replace: true });  
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Login</h2>

        <input
          placeholder="Email or Username"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {}
        <button type="button" className="btn btn-add" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;



