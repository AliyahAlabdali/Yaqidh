import React, { useState, useEffect } from 'react';
import { Activity, AlertCircle, CheckCircle } from 'lucide-react';

const CameraStatus = ({ name, status, activity }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="font-semibold text-slate-800">{name}</h3>
        <p className="text-sm text-slate-500 mt-1">{activity}</p>
      </div>
      {status === 'active' ? (
        <CheckCircle size={24} className="text-emerald-500" />
      ) : (
        <AlertCircle size={24} className="text-red-500" />
      )}
    </div>
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${status === 'active' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
      <span className="text-sm font-medium text-slate-600">
        {status === 'active' ? 'Active' : 'Inactive'}
      </span>
    </div>
  </div>
);

export default function LiveMonitoring() {
  const [cameras, setCameras] = useState([]);

  // Get user role from sessionStorage
  let role = 'manager';
  try {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user && user.role) role = user.role;
  } catch {}

  // Define camera sets based on role
  useEffect(() => {
    if (role === 'manager') {
      setCameras([
        { id: 1, name: 'Main Play Area Cam', status: 'active', activity: 'Motion detected - 10 secs ago' },
        { id: 2, name: 'Infant Nap Room', status: 'active', activity: 'No activity - Last 5 mins' },
        { id: 3, name: 'Dining Hall', status: 'inactive', activity: 'Connection lost' },
        { id: 4, name: 'Classroom 1 Cam', status: 'active', activity: 'Motion detected - 1 min ago' },
        { id: 5, name: 'Classroom 2 Cam', status: 'active', activity: 'No activity - Last 2 mins' },
      ]);
    } else {
      // Parent View (Home Context)
      setCameras([
        { id: 1, name: 'Living Room', status: 'active', activity: 'Motion detected - Now' },
        { id: 2, name: 'Baby\'s Bedroom', status: 'active', activity: 'No activity - Last 15 mins' },
        { id: 3, name: 'Garden / Backyard', status: 'inactive', activity: 'Offline' },
      ]);
    }
  }, [role]);

  // Dynamic calculations for the summary bar
  const totalCameras = cameras.length;
  const activeCount = cameras.filter(c => c.status === 'active').length;
  const inactiveCount = totalCameras - activeCount;

  return (
    <div className="space-y-6">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
          <Activity size={32} className="text-brand-500" />
          Live Monitoring
        </h2>
        <p className="text-slate-500 mt-2">
          {role === 'manager' ? 'Real-time Nursery surveillance feed' : 'Real-time Home monitoring feed'}
        </p>
      </header>

      {/* Summary Bar */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">
            System Status: {activeCount}/{totalCameras} Online
          </h3>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
              {activeCount} Active
            </span>
            {inactiveCount > 0 && (
              <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                {inactiveCount} Offline
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Camera Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cameras.map(camera => (
          <CameraStatus key={camera.id} {...camera} />
        ))}
      </div>
    </div>
  );
}