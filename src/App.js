import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import EmployeesList from './components/EmployeesList';
import AddEmployee from './components/AddEmployee';
import ViewEmployee from './components/ViewEmployee';
import UpdateEmployee from './components/UpdateEmployee';
import NavigationBar from './components/NavigationBar';
import './style.css';

function App() {
  const [logged, setLogged] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const onStorage = () => setLogged(!!localStorage.getItem('token'));
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <Router>
      {logged && <NavigationBar setLogged={setLogged} />}

      <Routes>
        <Route path="/" element={ logged ? <Navigate to="/employees" /> : <Login setLogged={setLogged} /> } />
        <Route path="/login" element={ logged ? <Navigate to="/employees" /> : <Login setLogged={setLogged} /> } />
        <Route path="/signup" element={ logged ? <Navigate to="/employees" /> : <Signup /> } />

        <Route path="/employees" element={ logged ? <EmployeesList /> : <Navigate to="/login" /> } />
        <Route path="/employees/add" element={ logged ? <AddEmployee /> : <Navigate to="/login" /> } />
        <Route path="/employees/:id" element={ logged ? <ViewEmployee /> : <Navigate to="/login" /> } />
        <Route path="/employees/:id/update" element={ logged ? <UpdateEmployee /> : <Navigate to="/login" /> } />
      </Routes>
    </Router>
  );
}

export default App;


