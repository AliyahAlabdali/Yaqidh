import React, { useState } from 'react';
import { Activity, AlertCircle, CheckCircle } from 'lucide-react';

const CameraStatus = ({ name, status, activity }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between mb-4">
      <div>
        <h3 className="font-semibold text-slate-800">{name}</h3>
        <p className="text-sm text-slate-500 mt-1">{activity}</p>
      </div>
      {status === 'active' ? (
        // Fixed: Replaced 'text-safe' with standard Tailwind color
        <CheckCircle size={24} className="text-emerald-500" />
      ) : (
        // Fixed: Replaced 'text-danger' with standard Tailwind color
        <AlertCircle size={24} className="text-red-500" />
      )}
    </div>
    <div className="flex items-center gap-2">
      {/* Fixed: Status dots using standard colors */}
      <div className={`w-3 h-3 rounded-full ${status === 'active' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
      <span className="text-sm font-medium text-slate-600">
        {status === 'active' ? 'Active' : 'Inactive'}
      </span>
    </div>
  </div>
);

export default function LiveMonitoring() {
  const [cameras] = useState([
    { id: 1, name: 'Camera 1 - Front Gate', status: 'active', activity: 'No activity - Last 2 mins' },
    { id: 2, name: 'Camera 2 - Parking Lot', status: 'active', activity: 'Motion detected - 30 secs ago' },
    { id: 3, name: 'Camera 3 - Building Entrance', status: 'active', activity: 'No activity - Last 5 mins' },
    { id: 4, name: 'Camera 4 - Back Yard', status: 'active', activity: 'No activity - Last 10 mins' },
    { id: 5, name: 'Camera 5 - Corridor', status: 'active', activity: 'No activity - Last 1 min' },
    { id: 6, name: 'Camera 6 - Storage Room', status: 'inactive', activity: 'Offline' },
    { id: 7, name: 'Camera 7 - Lobby', status: 'active', activity: 'Person detected - 2 mins ago' },
    { id: 8, name: 'Camera 8 - Rooftop', status: 'active', activity: 'No activity - Last 3 mins' },
    { id: 9, name: 'Camera 9 - East Wing', status: 'active', activity: 'No activity - Last 4 mins' },
    { id: 10, name: 'Camera 10 - West Wing', status: 'active', activity: 'No activity - Last 1 min' },
    { id: 11, name: 'Camera 11 - North Perimeter', status: 'active', activity: 'No activity - Last 2 mins' },
    { id: 12, name: 'Camera 12 - South Perimeter', status: 'active', activity: 'No activity - Last 30 secs' },
  ]);

  return (
    <div className="space-y-6">
      <header className="mb-6">
        {/* Fixed: Replaced 'text-brand-500' with a standard color if brand is undefined */}
        <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
          <Activity size={32} className="text-blue-600" />
          Live Monitoring
        </h2>
        <p className="text-slate-500 mt-2">Real-time camera status and activity feed</p>
      </header>

      {/* Summary Bar */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-800">Active Cameras: 11/12</h3>
          <div className="flex gap-2">
            {/* Fixed: Badges now use standard Tailwind background/text classes for visibility */}
            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium">
              Active
            </span>
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
              1 Offline
            </span>
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