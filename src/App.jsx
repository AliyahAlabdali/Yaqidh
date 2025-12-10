import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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

// Component to show error message on login if redirected
const LoginWithError = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const error = params.get('error');

  return (
    <div>
      {error === "invalid" && (
        <p style={{ color: 'red' }}>Invalid credentials or access not allowed</p>
      )}
      <Login />
    </div>
  );
};

// RequireRole component
const RequireRole = ({ allowed = [], children }) => {
  let role = null;
  try {
    role = JSON.parse(sessionStorage.getItem('user'))?.role;
  } catch (e) {
    role = null;
  }

  if (allowed.length === 0) return children;

  if (role && allowed.includes(role)) return children;

  // Redirect to login with error if not allowed
  return <Navigate to="/login?error=invalid" replace />;
};

// Default redirect after login/register
const DefaultRedirect = () => {
  const role = JSON.parse(sessionStorage.getItem('user'))?.role;

  if (role === "manager" || role === "parent") return <Navigate to="/dashboard" replace />;
  if (role === "teacher") return <Navigate to="/incidents" replace />;

  return <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>

        {/* Auth Routes */}
        <Route path="/login" element={<LoginWithError />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Redirect after login/register */}
        <Route path="/" element={<DefaultRedirect />} />

        {/* Protected Routes */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>

                {/* Dashboard → Manager & Parent */}
                <Route 
                  path="/dashboard" 
                  element={
                    <RequireRole allowed={["manager", "parent"]}>
                      <Dashboard />
                    </RequireRole>
                  } 
                />

                {/* Live Monitoring → Manager & Parent */}
                <Route 
                  path="/live" 
                  element={
                    <RequireRole allowed={["manager", "parent"]}>
                      <LiveMonitoring />
                    </RequireRole>
                  } 
                />

                {/* Incidents → Teacher, Manager, Parent */}
                <Route 
                  path="/incidents" 
                  element={
                    <RequireRole allowed={["teacher", "manager", "parent"]}>
                      <Incidents />
                    </RequireRole>
                  } 
                />

                {/* Reports → Manager & Parent */}
                <Route 
                  path="/reports" 
                  element={
                    <RequireRole allowed={["manager", "parent"]}>
                      <Reports />
                    </RequireRole>
                  } 
                />

                {/* Settings → Teacher, Manager, Parent */}
                <Route 
                  path="/settings" 
                  element={
                    <RequireRole allowed={["teacher", "manager", "parent"]}>
                      <Settings />
                    </RequireRole>
                  } 
                />

                {/* About → Teacher, Manager, Parent */}
                <Route 
                  path="/about" 
                  element={
                    <RequireRole allowed={["teacher", "manager", "parent"]}>
                      <About />
                    </RequireRole>
                  } 
                />

              </Routes>
            </Layout>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
