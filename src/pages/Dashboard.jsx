import React, { useState } from 'react'; 
import { 
  ShieldCheck, 
  AlertOctagon, 
  // Activity removed
  AlertTriangle, 
  CheckCircle, 
  Info, 
  Clock,
  Filter 
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
  // 3. State for the active filter
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock Data
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

  // 4. Filter Logic: Create a derived list based on state
  const filteredActivity = activeFilter === 'all' 
    ? recentActivity 
    : recentActivity.filter(item => item.type === activeFilter);

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

      {/* Stats Grid - Updated to 2 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard title="Active Cameras" value="12/12" icon={ShieldCheck} color="bg-safe" />
        <StatCard title="Today's Incidents" value="4" icon={AlertOctagon} color="bg-danger" />
        {/* System Load Removed */}
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        
        {/* Header with Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h3 className="font-bold text-slate-800">Recent System Activity</h3>
          
          {/* 5. Filter Pills Component */}
          <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-xl border border-slate-100">
            {[
              { id: 'all', label: 'All', color: 'bg-white text-slate-700 shadow-sm' },
              { id: 'critical', label: 'Critical', color: 'bg-red-100 text-red-700' },
              { id: 'warning', label: 'Warnings', color: 'bg-orange-100 text-orange-700' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 ease-in-out ${
                  activeFilter === filter.id 
                    ? `${filter.color} shadow-sm scale-105` 
                    : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {/* 6. Render Filtered List with Empty State */}
          {filteredActivity.length > 0 ? (
            filteredActivity.map((activity) => (
              <div 
                key={activity.id} 
                className="flex items-start p-4 rounded-xl bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-md transition-all duration-200 group"
              >
                {/* Icon Box */}
                <div className={`p-3 rounded-lg border ${getAlertStyle(activity.type)} mr-4 group-hover:scale-110 transition-transform`}>
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
            ))
          ) : (
            // Empty State
            <div className="text-center py-10 text-slate-400">
              <Filter size={48} className="mx-auto mb-3 opacity-20" />
              <p>No activities found for this filter.</p>
            </div>
          )}
        </div>
        
        {/* Footer Link */}
        <div className="mt-6 text-center pt-4 border-t border-slate-50">
           <button className="text-sm text-brand-500 font-medium hover:text-brand-600 hover:underline">
            View Full Incident History
          </button>
        </div>
      </div>
    </div>
  );
}