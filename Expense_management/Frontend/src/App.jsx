import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing_page from './pages/landing_page';
import AdminDashboard from './pages/AdminDashboard';
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing_page />} />
        <Route path='/admin' element={<AdminDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
