import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import EmployeesList from './components/EmployeesList';
import AddEmployee from './components/AddEmployee';
import ViewEmployee from './components/ViewEmployee';
import UpdateEmployee from './components/UpdateEmployee';
import NavigationBar from './components/NavigationBar';

function App() {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <Router>
      {isLoggedIn && <NavigationBar />}
      
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/employees" /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/employees" element={isLoggedIn ? <EmployeesList /> : <Navigate to="/login" />} />
        <Route path="/employees/add" element={isLoggedIn ? <AddEmployee /> : <Navigate to="/login" />} />
        <Route path="/employees/:id" element={isLoggedIn ? <ViewEmployee /> : <Navigate to="/login" />} />
        <Route path="/employees/:id/update" element={isLoggedIn ? <UpdateEmployee /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

