import React, { useState } from 'react';
import { AlertTriangle, Clock, MapPin, CheckCircle, AlertCircle, X, MessageSquare } from 'lucide-react';

const IncidentCard = ({ incident, onViewDetails }) => (
  <div 
    onClick={() => onViewDetails(incident)}
    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow cursor-pointer"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-start gap-3">
        <div className={`p-3 rounded-xl ${incident.severity === 'critical' ? 'bg-danger bg-opacity-10' : incident.severity === 'warning' ? 'bg-brand-100' : 'bg-safe bg-opacity-10'}`}>
          {incident.severity === 'critical' ? (
            <AlertTriangle size={20} className="text-danger" />
          ) : (
            <AlertCircle size={20} className={incident.severity === 'warning' ? 'text-brand-500' : 'text-safe'} />
          )}
        </div>
        <div>
          <h3 className="font-semibold text-slate-800">{incident.type}</h3>
          <p className="text-sm text-slate-500 mt-1 flex items-center gap-1">
            <MapPin size={14} /> {incident.location}
          </p>
        </div>
      </div>
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${incident.severity === 'critical' ? 'bg-danger bg-opacity-10 text-danger' : incident.severity === 'warning' ? 'bg-brand-100 text-brand-600' : 'bg-safe bg-opacity-10 text-safe'}`}>
        {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
      </span>
    </div>
    <div className="flex items-center gap-2 text-sm text-slate-600">
      <Clock size={14} />
      <span>{incident.time}</span>
    </div>
    <div className="mt-4 flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${incident.status === 'resolved' ? 'bg-safe' : 'bg-brand-500'}`}></div>
      <span className="text-sm font-medium text-slate-600">
        {incident.status === 'resolved' ? 'Resolved' : 'Active'}
      </span>
    </div>
  </div>
);

// Allowed incident types
const INCIDENT_TYPES = [
  'Fall Detected',
  'Aggressive Behavior',
  'Unattended Child',
];

// Incident Details Modal
const IncidentModal = ({ incident, onClose }) => {
  const [notes, setNotes] = useState('');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-100 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">Incident Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-lg transition"
          >
            <X size={24} className="text-slate-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Incident Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-slate-600 uppercase mb-2">Incident Type</h3>
              <p className="text-lg font-semibold text-slate-800">{incident.type}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-600 uppercase mb-2">Severity</h3>
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                incident.severity === 'critical' ? 'bg-danger bg-opacity-10 text-danger' : 
                incident.severity === 'warning' ? 'bg-brand-100 text-brand-600' : 
                'bg-safe bg-opacity-10 text-safe'
              }`}>
                {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
              </span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-600 uppercase mb-2">Location</h3>
              <p className="text-lg font-semibold text-slate-800">{incident.location}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-600 uppercase mb-2">Status</h3>
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                incident.status === 'resolved' ? 'bg-safe bg-opacity-10 text-safe' : 'bg-brand-100 text-brand-600'
              }`}>
                {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
              </span>
            </div>
          </div>

          {/* Metadata */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h3 className="font-semibold text-slate-800 mb-3">Metadata</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-600">Timestamp</p>
                <p className="font-medium text-slate-800">2025-12-09 10:45:23</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Camera ID</p>
                <p className="font-medium text-slate-800">{incident.cameraId || 'CAM-001'}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Zone</p>
                <p className="font-medium text-slate-800">{incident.location}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Duration</p>
                <p className="font-medium text-slate-800">2 minutes 45 seconds</p>
              </div>
            </div>
          </div>

          {/* Evidence Placeholder */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-3">Evidence Snapshot</h3>
            <div className="bg-slate-200 rounded-xl w-full h-64 flex items-center justify-center border-2 border-dashed border-slate-300">
              <div className="text-center">
                <p className="text-slate-600 font-medium">Video/Snapshot Preview</p>
                <p className="text-sm text-slate-500 mt-1">Click to view full evidence</p>
              </div>
            </div>
          </div>

          {/* Alert Logs */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-3">Alert Logs</h3>
            <div className="space-y-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center justify-between text-sm">
                <p className="text-slate-600">10:45:23 - Motion detected</p>
                <span className="text-xs text-slate-500">System</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <p className="text-slate-600">10:45:45 - Alert triggered</p>
                <span className="text-xs text-slate-500">System</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <p className="text-slate-600">10:46:12 - Administrator notified</p>
                <span className="text-xs text-slate-500">System</span>
              </div>
            </div>
          </div>

          {/* User Notes */}
          <div>
            <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <MessageSquare size={20} className="text-brand-500" />
              User Notes
            </h3>
            <div className="space-y-3">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <p className="font-medium text-slate-800">Admin Note</p>
                <p className="text-sm text-slate-600 mt-1">False alarm - customer walking past the property line.</p>
                <p className="text-xs text-slate-500 mt-2">John Doe • 2 hours ago</p>
              </div>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Add your notes here..."
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                rows="3"
              />
              <button className="w-full bg-brand-500 hover:bg-brand-600 text-white font-semibold py-2 rounded-xl transition">
                Add Note
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 p-6 flex gap-3">
          <button className="flex-1 bg-brand-500 hover:bg-brand-600 text-white font-semibold py-3 rounded-xl transition">
            Mark as Resolved
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-3 rounded-xl transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Incidents() {
  const [incidents, setIncidents] = useState([
    {
      id: 1,
      type: 'Fall Detected',
      severity: 'critical',
      location: 'Playground',
      time: '2025-12-10 09:15',
      status: 'active',
      notes: 'Child slipped while running.',
    },
    {
      id: 2,
      type: 'Aggressive Behavior',
      severity: 'warning',
      location: 'Classroom B',
      time: '2025-12-10 10:22',
      status: 'resolved',
      notes: 'Pushing incident between children.',
    },
    {
      id: 3,
      type: 'Unattended Child',
      severity: 'critical',
      location: 'Corridor',
      time: '2025-12-10 11:05',
      status: 'active',
      notes: 'Child left unsupervised for 3 minutes.',
    },
  ]);

  const [selectedIncident, setSelectedIncident] = useState(null);

  // Read current user for greeting and role-based UI
  let currentUser = null;
  try { currentUser = JSON.parse(sessionStorage.getItem('user')); } catch (e) { currentUser = null; }
  const currentRole = currentUser?.role || null;
  const currentName = currentUser?.fullName || currentUser?.email || null;

  const activeSevere = incidents.filter(i => i.status === 'active' && i.severity === 'critical').length;
  const activeWarnings = incidents.filter(i => i.status === 'active' && i.severity === 'warning').length;

  return (
    <div className="space-y-6">
      <header className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
              <AlertTriangle size={32} className="text-danger" />
              Incidents Log
            </h2>
            <p className="text-slate-500 mt-2">Track and manage all security incidents</p>
          </div>
          {/* Teacher welcome banner */}
          {currentRole === 'teacher' && (
            <div className="ml-4 px-4 py-2 rounded-xl bg-brand-50 border border-brand-100 text-brand-700">
              <div className="text-sm font-medium">Welcome</div>
              <div className="text-sm font-semibold">{currentName ? `${currentName}` : 'Teacher'}</div>
            </div>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <p className="text-slate-500 text-sm mb-2">Total Incidents</p>
          <h3 className="text-3xl font-bold text-slate-800">{incidents.length}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-danger border-opacity-20 bg-danger bg-opacity-5">
          <p className="text-danger text-sm mb-2 font-medium">Critical Alerts</p>
          <h3 className="text-3xl font-bold text-danger">{activeSevere}</h3>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-brand-200 bg-brand-50">
          <p className="text-brand-600 text-sm mb-2 font-medium">Warnings</p>
          <h3 className="text-3xl font-bold text-brand-600">{activeWarnings}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {incidents.map(incident => (
          <IncidentCard key={incident.id} incident={incident} onViewDetails={setSelectedIncident} />
        ))}
      </div>

      {selectedIncident && (
        <IncidentModal incident={selectedIncident} onClose={() => setSelectedIncident(null)} />
      )}
    </div>
  );
}
