import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import LiveMonitoring from './pages/LiveMonitoring';
import Incidents from './pages/Incidents';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import ForgotPassword from './pages/ForgotPassword';

function App() {
  const RequireRole = ({ allowed = [], children }) => {
    let role = null;
    try { role = JSON.parse(sessionStorage.getItem('user'))?.role; } catch (e) { role = null; }
    if (allowed.length === 0) return children;
    if (allowed.includes(role)) return children;
    return <Navigate to="/incidents" replace />;
  };

  return (
    <Router>
      <Routes>
        {/* Auth Routes - Outside Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Main Routes - With Layout */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<RequireRole allowed={["manager","parent"]}><Dashboard /></RequireRole>} />
                <Route path="/live" element={<RequireRole allowed={["manager","parent"]}><LiveMonitoring /></RequireRole>} />
                <Route path="/incidents" element={<RequireRole allowed={[] /* all roles */}><Incidents /></RequireRole>} />
                <Route path="/reports" element={<RequireRole allowed={["manager","parent"]}><Reports /></RequireRole>} />
                <Route path="/settings" element={<RequireRole allowed={[] /* all roles */}><Settings /></RequireRole>} />
                <Route path="/about" element={<RequireRole allowed={[] /* all roles */}><About /></RequireRole>} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;