import React, { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const reportData = [
  { name: 'Mon', incidents: 3, alerts: 5 },
  { name: 'Tue', incidents: 2, alerts: 4 },
  { name: 'Wed', incidents: 5, alerts: 8 },
  { name: 'Thu', incidents: 4, alerts: 6 },
  { name: 'Fri', incidents: 6, alerts: 9 },
  { name: 'Sat', incidents: 2, alerts: 3 },
  { name: 'Sun', incidents: 1, alerts: 2 },
];

const reportStats = [
  { title: 'Total Incidents (Week)', value: '23', trend: '+15%', color: 'text-danger' },
  { title: 'Critical Alerts', value: '5', trend: '-20%', color: 'text-brand-500' },
  { title: 'Response Time (Avg)', value: '2.4m', trend: '-10%', color: 'text-safe' },
];

const ReportCard = ({ title, description, date, type }) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer group">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-start gap-3">
        <div className="p-3 rounded-xl bg-brand-100">
          <FileText size={20} className="text-brand-500" />
        </div>
        <div>
          <h3 className="font-semibold text-slate-800">{title}</h3>
          <p className="text-sm text-slate-500 mt-1">{description}</p>
        </div>
      </div>
      <Download size={20} className="text-slate-400 group-hover:text-brand-500 transition-colors" />
    </div>
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-500 flex items-center gap-1">
        <Calendar size={14} /> {date}
      </span>
      <span className="px-3 py-1 bg-brand-50 text-brand-600 rounded-full text-xs font-medium">{type}</span>
    </div>
  </div>
);

export default function Reports() {
  const [filters, setFilters] = useState({
    dateRange: { start: '', end: '' },
    alertType: '',
    incidentType: '',
  });
  const [filteredReports, setFilteredReports] = useState([]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const validateFilters = () => {
    const { dateRange, alertType, incidentType } = filters;
    if (!dateRange.start || !dateRange.end) {
      alert('Please select a valid date range.');
      return false;
    }
    if (!alertType) {
      alert('Please select an alert type.');
      return false;
    }
    if (!incidentType) {
      alert('Please select an incident type.');
      return false;
    }
    return true;
  };

  const applyFilters = () => {
    if (!validateFilters()) return;

    // Mock data retrieval based on filters
    const reports = [
      { id: 1, date: '2025-12-10', type: 'Critical', incidentType: 'Fall Detected', description: 'Fall detected' },
      { id: 2, date: '2025-12-11', type: 'Warning', incidentType: 'Aggressive Behavior', description: 'Aggressive behavior' },
    ];

    const filtered = reports.filter((report) => {
      const isDateInRange =
        new Date(report.date) >= new Date(filters.dateRange.start) &&
        new Date(report.date) <= new Date(filters.dateRange.end);
      const isTypeMatch = report.type === filters.alertType;
      const isIncidentTypeMatch = report.incidentType === filters.incidentType;
      return isDateInRange && isTypeMatch && isIncidentTypeMatch;
    });

    setFilteredReports(filtered);
  };

  return (
    <div className="space-y-6">
      <header className="mb-6">
        <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
          <FileText size={32} className="text-brand-500" />
          Reports & Analytics
        </h2>
        <p className="text-slate-500 mt-2">Comprehensive security insights and statistics</p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reportStats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <p className="text-slate-500 text-sm mb-2">{stat.title}</p>
            <div className="flex items-end justify-between">
              <h3 className={`text-3xl font-bold ${stat.color}`}>{stat.value}</h3>
              <span className="text-safe text-sm font-medium flex items-center gap-1">
                <TrendingUp size={14} /> {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-4">Incidents & Alerts Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem' }}
                labelStyle={{ color: '#1e293b' }}
              />
              <Legend />
              <Line type="monotone" dataKey="incidents" stroke="#ec4899" strokeWidth={2} dot={{ fill: '#ec4899' }} />
              <Line type="monotone" dataKey="alerts" stroke="#db2777" strokeWidth={2} dot={{ fill: '#db2777' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-semibold text-slate-800 mb-4">Weekly Incidents Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '0.75rem' }}
                labelStyle={{ color: '#1e293b' }}
              />
              <Legend />
              <Bar dataKey="incidents" fill="#ec4899" radius={[8, 8, 0, 0]} />
              <Bar dataKey="alerts" fill="#fbcfe8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Start Date</label>
            <input
              type="date"
              name="start"
              value={filters.dateRange.start}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  dateRange: { ...prev.dateRange, start: e.target.value },
                }))
              }
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">End Date</label>
            <input
              type="date"
              name="end"
              value={filters.dateRange.end}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  dateRange: { ...prev.dateRange, end: e.target.value },
                }))
              }
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Alert Type</label>
            <select
              name="alertType"
              value={filters.alertType}
              onChange={handleFilterChange}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Select Alert Type</option>
              <option value="Critical">Critical</option>
              <option value="Warning">Warning</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Incident Type</label>
            <select
              name="incidentType"
              value={filters.incidentType}
              onChange={handleFilterChange}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">Select Incident Type</option>
              <option value="Fall Detected">Fall Detected</option>
              <option value="Aggressive Behavior">Aggressive Behavior</option>
            </select>
          </div>
        </div>
        <button
          onClick={applyFilters}
          className="mt-6 w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3 rounded-xl transition"
        >
          Apply Filters
        </button>
      </div>

      {/* Available Reports */}
      <div>
        <h3 className="font-semibold text-slate-800 mb-4">Available Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ReportCard title="Weekly Security Summary" description="Complete overview of security events and incidents" date="Dec 9, 2025" type="Weekly" />
          <ReportCard title="Incident Analysis Report" description="Detailed breakdown of all security incidents" date="Dec 9, 2025" type="Monthly" />
          <ReportCard title="Camera Performance Report" description="Status and activity report for all cameras" date="Dec 8, 2025" type="Weekly" />
          <ReportCard title="Alert History Report" description="Complete log of all alerts and notifications" date="Dec 7, 2025" type="Custom" />
        </div>
      </div>

      <div className="space-y-4">
        {filteredReports.map((report) => (
          <div key={report.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
            <h4 className="font-semibold text-slate-800">{report.description}</h4>
            <p className="text-sm text-slate-600">Date: {report.date}</p>
            <p className="text-sm text-slate-600">Type: {report.type}</p>
            <p className="text-sm text-slate-600">Incident Type: {report.incidentType}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
