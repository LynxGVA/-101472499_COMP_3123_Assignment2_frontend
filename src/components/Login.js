import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import '../style.css'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/user/login', { email, password });

      if (!res.data.token) {
        alert("No token returned");
        return;
      }

      localStorage.setItem('token', res.data.token);
      navigate('/employees');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="container">
      <h2 className="app-header">Login</h2>

      <form className="form-container" onSubmit={handleSubmit}>
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

        <button className="btn btn-add" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;

