import React from 'react';
import { ShieldCheck, AlertOctagon, Activity } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
    <div>
      <p className="text-slate-500 text-sm mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
    </div>
    <div className={`p-3 rounded-xl ${color}`}>
      <Icon size={24} className="text-white" />
    </div>
  </div>
);

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <header className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          Welcome back, {(() => {
            try {
              const r = JSON.parse(sessionStorage.getItem('user'))?.role;
              if (r === 'manager') return 'Nursery Manager';
              if (r === 'teacher') return 'Teacher';
              if (r === 'parent') return 'Parent/Caregiver';
            } catch (e) {}
            return 'User';
          })()}
        </h2>
        <p className="text-slate-500">System Status: <span className="text-safe font-medium">Monitoring Active</span></p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Active Cameras" value="12/12" icon={ShieldCheck} color="bg-safe" />
        <StatCard title="Today's Incidents" value="3" icon={AlertOctagon} color="bg-danger" />
        {/* Uses Brand Pink */}
        <StatCard title="System Load" value="14%" icon={Activity} color="bg-brand-500" />
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="font-bold text-slate-800 mb-4">Recent System Activity</h3>
        <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
          Waiting for alerts from Mock Backend...
        </div>
      </div>
    </div>
  );
}