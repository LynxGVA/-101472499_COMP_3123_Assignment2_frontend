import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import '../style.css';

function Login() {
  const [input, setInput] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post('/user/login', { email: input, username: input, password });

      if (!res.data.token) {
        alert("Login error: No token in response");
        return;
      }

      localStorage.setItem('token', res.data.token);
      navigate('/employees');
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <input 
          placeholder="Email or Username" 
          value={input} 
          onChange={e => setInput(e.target.value)} 
        />

        <input 
          placeholder="Password" 
          type="password"
          value={password} 
          onChange={e => setPassword(e.target.value)} 
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;


