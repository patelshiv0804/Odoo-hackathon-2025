

export default function Landing_page() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-brand">
            <h1>Expense Management System</h1>
          </div>
          <div className="navbar-links">
            <button
            // className={`nav-button ${currentView === 'employee' ? 'active' : ''}`}
            // onClick={() => setCurrentView('employee')}
            >
              Employee
            </button>
            <button
            // className={`nav-button ${currentView === 'manager' ? 'active' : ''}`}
            // onClick={() => setCurrentView('manager')}
            >
              Manager
            </button>
            <button
            // className={`nav-button ${currentView === 'admin' ? 'active' : ''}`}
            // onClick={() => setCurrentView('admin')}
            >
              Admin
            </button>
          </div>
        </div>
      </nav>

      <main className="main-content">
        {/* {currentView === 'employee' && <EmployeeView />} */}
        {/* {currentView === 'manager' && <ManagerView />} */}
        {/* {currentView === 'admin' && <AdminDashboard />} */}
      </main>
    </div>
  );
}
