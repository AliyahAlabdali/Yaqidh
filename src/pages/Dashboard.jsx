import React from 'react';
import { 
  ShieldCheck, 
  AlertOctagon, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Clock 
} from 'lucide-react';

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
  // Mock Data: Updated to include a second Fall Detected case
  const recentActivity = [
    {
      id: 1,
      type: 'critical',
      message: 'Fall Detected',
      time: 'Just now',
      details: 'Child fall detected in Playroom Area A'
    },
    {
      id: 2,
      type: 'critical',
      message: 'Aggressive Interaction',
      time: '12 mins ago',
      details: 'High physical proximity detected between two children'
    },
    {
      id: 3,
      type: 'warning',
      message: 'Restricted Zone Entry',
      time: '45 mins ago',
      details: 'Child detected entering Kitchen Zone'
    },
    {
      id: 4,
      type: 'critical',
      message: 'Fall Detected',
      time: '2 hours ago',
      details: 'Child fall detected in Outdoor Playground'
    }
  ];

  // Helper to style the icons based on severity
  const getAlertStyle = (type) => {
    switch(type) {
      case 'critical': return 'bg-red-50 text-red-600 border-red-100';
      case 'warning': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'success': return 'bg-green-50 text-green-600 border-green-100';
      default: return 'bg-blue-50 text-blue-600 border-blue-100';
    }
  };

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
        {/* Updated value to reflect 4 items in the list */}
        <StatCard title="Today's Incidents" value="4" icon={AlertOctagon} color="bg-danger" />
        <StatCard title="System Load" value="14%" icon={Activity} color="bg-brand-500" />
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-slate-800">Recent System Activity</h3>
          <button className="text-sm text-brand-500 font-medium hover:text-brand-600">
            View All History
          </button>
        </div>

        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div 
              key={activity.id} 
              className="flex items-start p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all duration-200"
            >
              {/* Icon Box */}
              <div className={`p-3 rounded-lg border ${getAlertStyle(activity.type)} mr-4`}>
                {activity.type === 'critical' && <AlertOctagon size={20} />}
                {activity.type === 'warning' && <AlertTriangle size={20} />}
                {activity.type === 'success' && <CheckCircle size={20} />}
                {activity.type === 'info' && <Info size={20} />}
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-slate-800 text-sm">{activity.message}</h4>
                  <div className="flex items-center text-slate-400 text-xs">
                    <Clock size={12} className="mr-1" />
                    {activity.time}
                  </div>
                </div>
                <p className="text-slate-500 text-sm mt-1">{activity.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}