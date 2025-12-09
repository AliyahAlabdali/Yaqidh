import React from 'react';

export default function LiveMonitor() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Live Monitoring</h2>
          <p className="text-slate-500">Real-time feed from 4 active cameras</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            System Online
          </span>
        </div>
      </div>
      
      {/* Main AI Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Primary Camera (Large) */}
        <div className="bg-black rounded-2xl overflow-hidden relative aspect-video shadow-lg ring-4 ring-brand-100">
          <div className="absolute inset-0 flex items-center justify-center text-slate-500 bg-slate-900">
            {/* Simulation of a Camera Feed */}
            <div className="text-center">
              <p className="text-slate-400 mb-2">Camera 01: Playroom Main</p>
              <p className="text-xs text-slate-600">AI Detection Active (YOLOv8)</p>
            </div>
          </div>
          
          {/* Mock Detection Box */}
          <div className="absolute top-1/4 left-1/4 w-32 h-48 border-4 border-brand-500 rounded-lg opacity-80">
            <span className="absolute -top-8 left-0 bg-brand-500 text-white text-xs px-2 py-1 rounded">
              Child (98%)
            </span>
          </div>
          
          <div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs animate-pulse font-bold shadow-sm">
            LIVE
          </div>
        </div>

        {/* Secondary Feeds Grid */}
        <div className="grid grid-cols-2 gap-4">
          {[2, 3, 4, 5].map((camId) => (
            <div key={camId} className="bg-slate-200 rounded-xl relative overflow-hidden group hover:ring-2 ring-brand-300 transition-all">
              <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">
                Feed 0{camId}
              </div>
              <div className="absolute top-2 left-2 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded backdrop-blur-sm">
                Cam 0{camId}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}