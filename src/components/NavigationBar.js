function NavigationBar({ setLogged }) {
  const logout = () => {
    localStorage.removeItem('token');
    setLogged(false);
  };

  return (
    <div className="app-header">
      Employee Management App
      <button className="btn btn-add" onClick={logout} style={{ marginLeft: '20px' }}>
        Logout
      </button>
    </div>
  );
}

export default NavigationBar;
