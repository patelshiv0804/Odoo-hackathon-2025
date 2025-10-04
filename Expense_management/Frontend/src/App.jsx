import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing_page from './pages/landing_page';

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing_page />} />
      </Routes>
    </Router>
  )
}

export default App
