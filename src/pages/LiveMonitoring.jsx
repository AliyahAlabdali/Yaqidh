import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  AlertCircle, 
  Wifi, 
  WifiOff, 
  Maximize2, 
  MoreVertical,
  Baby,
  Gamepad2,
  Utensils,
  BookOpen,
  Armchair,
  Trees
} from 'lucide-react';

const CameraFeed = ({ name, deviceId, status, activity, type }) => {
  // Mock current time for the video overlay
  const [time, setTime] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date().toLocaleTimeString()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Select an icon to represent the "view" of the room
  const getPlaceholderIcon = () => {
    switch (type) {
      case 'play': return <Gamepad2 size={48} className="text-slate-600 opacity-20" />;
      case 'sleep': return <Baby size={48} className="text-slate-600 opacity-20" />;
      case 'food': return <Utensils size={48} className="text-slate-600 opacity-20" />;
      case 'class': return <BookOpen size={48} className="text-slate-600 opacity-20" />;
      case 'living': return <Armchair size={48} className="text-slate-600 opacity-20" />;
      case 'garden': return <Trees size={48} className="text-slate-600 opacity-20" />;
      default: return <Activity size={48} className="text-slate-600 opacity-20" />;
    }
  };

  const isOffline = status !== 'active';

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-all group">
      
      {/* 1. Video Feed Area (The "Screen") */}
      <div className={`relative h-48 w-full flex items-center justify-center ${isOffline ? 'bg-slate-900' : 'bg-slate-800'}`}>
        
        {/* Live Overlay UI */}
        <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
          <div className={`flex items-center gap-1.5 px-2 py-1 rounded-md bg-black/40 backdrop-blur-sm border border-white/10`}>
            {isOffline ? (
               <div className="w-2 h-2 rounded-full bg-red-500"></div>
            ) : (
              <>
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-[10px] font-bold text-white tracking-wider">REC</span>
              </>
            )}
          </div>
        </div>

        <div className="absolute top-3 right-3 z-10">
           <button className="p-1.5 rounded-md bg-black/40 hover:bg-black/60 text-white/80 transition-colors">
             <Maximize2 size={14} />
           </button>
        </div>

        {/* Center Visual (Simulating the camera view) */}
        {isOffline ? (
          <div className="flex flex-col items-center gap-2 text-slate-500">
            <WifiOff size={32} />
            <span className="text-xs font-mono uppercase tracking-widest">Signal Lost</span>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-700 to-slate-800">
            {/* This icon acts as the "image" of the room */}
            {getPlaceholderIcon()}
            {/* Timestamp Overlay */}
            <div className="absolute bottom-3 right-3 font-mono text-xs text-white/70 bg-black/40 px-2 py-1 rounded">
              {new Date().toLocaleDateString()} {time}
            </div>
             {/* Bitrate/Quality Mockup */}
             <div className="absolute bottom-3 left-3 font-mono text-[10px] text-emerald-400 bg-black/40 px-2 py-1 rounded flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
              HD 1080P
            </div>
          </div>
        )}
      </div>

      {/* 2. Control Panel (Metadata) */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-slate-800">{name}</h3>
              <span className="text-[10px] font-mono text-slate-400 border border-slate-100 px-1 rounded">
                {deviceId}
              </span>
            </div>
            <p className={`text-xs font-medium mt-1 ${isOffline ? 'text-red-500' : 'text-emerald-600'}`}>
              {activity}
            </p>
          </div>
          <button className="text-slate-400 hover:text-slate-600">
            <MoreVertical size={18} />
          </button>
        </div>
        
        {/* Status Footer */}
        <div className="flex items-center justify-between pt-3 mt-2 border-t border-slate-50">
           <div className="flex items-center gap-1.5">
              <Wifi size={14} className={isOffline ? 'text-slate-300' : 'text-emerald-500'} />
              <span className="text-xs text-slate-500">
                {isOffline ? 'Offline' : 'Excellent (24ms)'}
              </span>
           </div>
           <span className="text-[10px] text-slate-400 font-mono">
             CAM-{status === 'active' ? 'ON' : 'ERR'}
           </span>
        </div>
      </div>
    </div>
  );
};

export default function LiveMonitoring() {
  const [cameras, setCameras] = useState([]);

  // Get user role from sessionStorage
  let role = 'manager';
  try {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (user && user.role) role = user.role;
  } catch {}

  useEffect(() => {
    if (role === 'manager') {
      setCameras([
        { 
          id: 1, 
          name: 'Main Play Area', 
          deviceId: 'C-01', 
          type: 'play',
          status: 'active', 
          activity: 'Motion detected' 
        },
        { 
          id: 2, 
          name: 'Infant Nap Room', 
          deviceId: 'C-02', 
          type: 'sleep',
          status: 'active', 
          activity: 'No movement detected' // CHANGED: replaced sound level
        },
        { 
          id: 3, 
          name: 'Dining Hall', 
          deviceId: 'C-03', 
          type: 'food',
          status: 'inactive', 
          activity: 'NO SIGNAL' 
        },
        { 
          id: 4, 
          name: 'Classroom 1', 
          deviceId: 'C-04', 
          type: 'class',
          status: 'active', 
          activity: 'Session in progress' 
        },
        { 
          id: 5, 
          name: 'Classroom 2', 
          deviceId: 'C-05', 
          type: 'class',
          status: 'active', 
          activity: 'Empty room' 
        },
      ]);
    } else {
      // Parent View
      setCameras([
        { 
          id: 1, 
          name: 'Living Room', 
          deviceId: 'H-01', 
          type: 'living',
          status: 'active', 
          activity: 'Motion detected' 
        },
        { 
          id: 2, 
          name: 'Baby\'s Bedroom', 
          deviceId: 'H-02', 
          type: 'sleep',
          status: 'active', 
          activity: 'Temperature: 22°C' 
        },
        { 
          id: 3, 
          name: 'Backyard', 
          deviceId: 'H-03', 
          type: 'garden',
          status: 'inactive', 
          activity: 'Device Offline' 
        },
      ]);
    }
  }, [role]);

  const activeCount = cameras.filter(c => c.status === 'active').length;

  return (
    <div className="space-y-6">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
          <Activity size={32} className="text-emerald-500" />
          Live Feeds
        </h2>
        <p className="text-slate-500 mt-2">
          System Online • {activeCount} Cameras Active
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cameras.map(camera => (
          <CameraFeed key={camera.id} {...camera} />
        ))}
      </div>
    </div>
  );
}