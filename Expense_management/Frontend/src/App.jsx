import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing_page from './pages/landing_page';
import AdminDashboard from './pages/AdminDashboard';
import Employee from './pages/EmployeeView';
import Manager from './pages/ManagerView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing_page />} />
        <Route path='/admin' element={<AdminDashboard />} />
        <Route path='/employee' element={<Employee />} />
        <Route path='/manager' element={<Manager />} />
      </Routes>
    </Router>
  )
}

export default App
