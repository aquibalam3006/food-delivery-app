import React, { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from "./pages/Login";

const App = () => {

  const url = "http://localhost:4000";
  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 FIXED AUTH CHECK
  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token && location.pathname !== "/login") {
      navigate("/login");
    }
  }, [location.pathname]);

  return (
    <div>
      <ToastContainer />

      {/* 👇 Login page pe navbar/sidebar hide */}
      {location.pathname !== "/login" && <Navbar />}
      {location.pathname !== "/login" && <hr />}

      <div className="app-content">
        {location.pathname !== "/login" && <Sidebar />}

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
        </Routes>
      </div>
    </div>
  )
}

export default App