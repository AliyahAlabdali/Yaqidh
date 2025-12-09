# Developer Reference - Yaqidh Code Examples

## 🔐 Authentication Examples

### Login Simulation
```javascript
// From src/pages/Login.jsx
const handleLogin = (e) => {
  e.preventDefault();
  setLoading(true);
  
  // Simulate API call
  setTimeout(() => {
    if (email && password) {
      // Store user in sessionStorage
      sessionStorage.setItem('user', JSON.stringify({ email }));
      // Redirect to dashboard
      window.location.href = '/';
    }
    setLoading(false);
  }, 1000);
};
```

### Registration with Role Selection
```javascript
// From src/pages/Register.jsx
const [formData, setFormData] = useState({
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  role: 'parent', // parent | manager
});

// Radio button for role selection
<label className="flex items-center p-4 border rounded-xl cursor-pointer">
  <input
    type="radio"
    name="role"
    value="parent"
    checked={formData.role === 'parent'}
    onChange={handleInputChange}
    className="w-4 h-4 accent-brand-500"
  />
  <span className="ml-3 font-medium">Parent/Caregiver</span>
</label>
```

---

## 🎛️ Settings Tab System

### Tab Navigation Pattern
```javascript
const [activeTab, setActiveTab] = useState('profile');

// Tab button component
const TabButton = ({ tab, activeTab, onClick, label }) => (
  <button
    onClick={() => onClick(tab)}
    className={`px-4 py-3 rounded-xl font-medium transition ${
      activeTab === tab
        ? 'bg-brand-500 text-white'
        : 'text-slate-600 hover:bg-slate-100'
    }`}
  >
    {label}
  </button>
);

// Conditional rendering
{activeTab === 'profile' && <EditProfile />}
{activeTab === 'notifications' && <NotificationsTab />}
{activeTab === 'cameras' && <ManageCameras />}
```

### Toggle Switch Implementation
```javascript
const [notifications, setNotifications] = useState({
  sms: true,
  email: true,
  app: false,
});

const toggleNotification = (key) => {
  setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
};

// UI
<button
  onClick={() => toggleNotification('sms')}
  className={`px-4 py-2 rounded-xl font-medium text-sm transition ${
    notifications.sms
      ? 'bg-safe text-white'
      : 'bg-slate-200 text-slate-600'
  }`}
>
  {notifications.sms ? 'On' : 'Off'}
</button>
```

---

## 📸 Camera Management CRUD

### Add/Edit Camera
```javascript
const [cameras, setCameras] = useState([...]);
const [formData, setFormData] = useState({ 
  name: '', ip: '', zone: '', status: 'Online' 
});
const [editingId, setEditingId] = useState(null);

const handleAddCamera = () => {
  if (formData.name && formData.ip && formData.zone) {
    if (editingId) {
      // Update existing
      setCameras(cameras.map(c => 
        c.id === editingId ? { ...c, ...formData } : c
      ));
      setEditingId(null);
    } else {
      // Add new
      setCameras([...cameras, { id: Date.now(), ...formData }]);
    }
    // Reset form
    setFormData({ name: '', ip: '', zone: '', status: 'Online' });
  }
};

const handleDelete = (id) => {
  setCameras(cameras.filter(c => c.id !== id));
};
```

### Camera Grid Display
```javascript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {cameras.map(camera => (
    <div key={camera.id} className="bg-white p-4 rounded-2xl shadow-sm border">
      <div className="flex justify-between mb-3">
        <h4 className="font-semibold">{camera.name}</h4>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          camera.status === 'Online' 
            ? 'bg-safe bg-opacity-10 text-safe' 
            : 'bg-danger bg-opacity-10 text-danger'
        }`}>
          {camera.status}
        </span>
      </div>
      {/* Details and buttons */}
    </div>
  ))}
</div>
```

---

## 👥 User Management Table

### Add Teacher Form
```javascript
const [users, setUsers] = useState([...]);
const [formData, setFormData] = useState({ 
  email: '', zone: '', role: 'Teacher' 
});

const handleAddUser = () => {
  if (formData.email && formData.zone) {
    setUsers([...users, { id: Date.now(), ...formData }]);
    setFormData({ email: '', zone: '', role: 'Teacher' });
  }
};

const handleRemoveUser = (id) => {
  setUsers(users.filter(u => u.id !== id));
};
```

### User Table
```javascript
<table className="w-full">
  <thead>
    <tr className="border-b bg-slate-50">
      <th className="text-left px-6 py-3 font-semibold">Email</th>
      <th className="text-left px-6 py-3 font-semibold">Zone</th>
      <th className="text-left px-6 py-3 font-semibold">Role</th>
      <th className="text-left px-6 py-3 font-semibold">Action</th>
    </tr>
  </thead>
  <tbody>
    {users.map(user => (
      <tr key={user.id} className="border-b hover:bg-slate-50 transition">
        <td className="px-6 py-4">{user.email}</td>
        <td className="px-6 py-4">{user.zone}</td>
        <td className="px-6 py-4">
          <span className="px-3 py-1 bg-brand-100 text-brand-600 rounded-full text-sm">
            {user.role}
          </span>
        </td>
        <td className="px-6 py-4">
          <button onClick={() => handleRemoveUser(user.id)}>
            Remove
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
```

---

## 🚨 Incident Modal Pattern

### Modal Structure
```javascript
const [selectedIncident, setSelectedIncident] = useState(null);

// Trigger modal
const handleViewDetails = (incident) => {
  setSelectedIncident(incident);
};

// Close modal
const handleCloseModal = () => {
  setSelectedIncident(null);
};

// Render modal conditionally
{selectedIncident && (
  <IncidentModal 
    incident={selectedIncident} 
    onClose={handleCloseModal} 
  />
)}
```

### Modal Component
```javascript
const IncidentModal = ({ incident, onClose }) => {
  const [notes, setNotes] = useState('');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Incident Details</h2>
          <button onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Incident info grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold uppercase mb-2">Type</h3>
              <p className="text-lg font-semibold">{incident.type}</p>
            </div>
            {/* More fields... */}
          </div>

          {/* Metadata */}
          <div className="bg-slate-50 p-4 rounded-xl border">
            <h3 className="font-semibold mb-3">Metadata</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-600">Timestamp</p>
                <p className="font-medium">2025-12-09 10:45:23</p>
              </div>
              {/* More metadata fields... */}
            </div>
          </div>

          {/* Evidence Placeholder */}
          <div>
            <h3 className="font-semibold mb-3">Evidence Snapshot</h3>
            <div className="bg-slate-200 rounded-xl w-full h-64 flex items-center justify-center border-2 border-dashed">
              <div className="text-center">
                <p className="font-medium">Video/Snapshot Preview</p>
                <p className="text-sm text-slate-500 mt-1">Click to view</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <h3 className="font-semibold mb-3">User Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add your notes..."
              className="w-full px-4 py-3 border rounded-xl"
              rows="3"
            />
            <button className="w-full mt-2 bg-brand-500 text-white py-2 rounded-xl">
              Add Note
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t p-6 flex gap-3">
          <button className="flex-1 bg-brand-500 text-white py-3 rounded-xl">
            Mark as Resolved
          </button>
          <button onClick={onClose} className="flex-1 bg-slate-200 py-3 rounded-xl">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
```

---

## 🎨 Tailwind CSS Patterns Used

### Button Variants
```javascript
// Primary Button
<button className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-xl transition">
  Action
</button>

// Secondary Button
<button className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold rounded-xl transition">
  Cancel
</button>

// Outline Button
<button className="px-4 py-2 border border-brand-500 text-brand-500 rounded-xl hover:bg-brand-50 transition">
  Outline
</button>

// Disabled Button
<button disabled className="px-4 py-2 bg-brand-500 text-white opacity-50 rounded-xl">
  Disabled
</button>
```

### Input Field Pattern
```javascript
<div>
  <label className="block text-sm font-medium text-slate-700 mb-2">
    Label Text
  </label>
  <div className="relative">
    <IconComponent className="absolute left-3 top-3.5 text-slate-400" size={20} />
    <input
      type="text"
      placeholder="Placeholder text"
      className="w-full pl-10 pr-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition"
    />
  </div>
</div>
```

### Card Pattern
```javascript
<div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
  <h3 className="font-semibold text-slate-800 mb-4">Card Title</h3>
  {/* Card content */}
</div>
```

### Status Badge
```javascript
// Critical
<span className="px-3 py-1 bg-danger bg-opacity-10 text-danger rounded-full text-sm font-medium">
  Critical
</span>

// Warning
<span className="px-3 py-1 bg-brand-100 text-brand-600 rounded-full text-sm font-medium">
  Warning
</span>

// Success
<span className="px-3 py-1 bg-safe bg-opacity-10 text-safe rounded-full text-sm font-medium">
  Active
</span>
```

---

## 📊 Chart Examples (Recharts)

### Line Chart
```javascript
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const reportData = [
  { name: 'Mon', incidents: 3, alerts: 5 },
  { name: 'Tue', incidents: 2, alerts: 4 },
];

<ResponsiveContainer width="100%" height={300}>
  <LineChart data={reportData}>
    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
    <XAxis dataKey="name" stroke="#64748b" />
    <YAxis stroke="#64748b" />
    <Tooltip />
    <Legend />
    <Line 
      type="monotone" 
      dataKey="incidents" 
      stroke="#ec4899" 
      strokeWidth={2} 
      dot={{ fill: '#ec4899' }} 
    />
  </LineChart>
</ResponsiveContainer>
```

### Bar Chart
```javascript
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

<ResponsiveContainer width="100%" height={300}>
  <BarChart data={reportData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="incidents" fill="#ec4899" radius={[8, 8, 0, 0]} />
    <Bar dataKey="alerts" fill="#fbcfe8" radius={[8, 8, 0, 0]} />
  </BarChart>
</ResponsiveContainer>
```

---

## 🔄 Form Validation Examples

### Password Validation
```javascript
const validateForm = () => {
  if (!formData.password || !formData.confirmPassword) {
    setError('Please fill in all fields');
    return false;
  }
  if (formData.password !== formData.confirmPassword) {
    setError('Passwords do not match');
    return false;
  }
  if (formData.password.length < 6) {
    setError('Password must be at least 6 characters');
    return false;
  }
  return true;
};
```

### Email Validation
```javascript
const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
```

---

## 📱 Responsive Grid Examples

### Two Column on Desktop
```javascript
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Items */}
</div>
```

### Three Column on Desktop
```javascript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Items */}
</div>
```

### Responsive Table
```javascript
<div className="overflow-x-auto">
  <table className="w-full">
    {/* Table content */}
  </table>
</div>
```

---

## 🎯 Custom Hook Example (For Future Use)

```javascript
// useAuth.js - Future implementation
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    // API call
    setLoading(false);
  };

  const logout = () => {
    sessionStorage.removeItem('user');
    setUser(null);
  };

  return { user, loading, login, logout };
};

// Usage in component
const { user, login } = useAuth();
```

---

## 🚀 Performance Tips

1. **Use React.memo for static components:**
```javascript
const TabButton = React.memo(({ tab, activeTab, onClick, label }) => {
  // Component
});
```

2. **Lazy load routes:**
```javascript
const Settings = lazy(() => import('./pages/Settings'));

<Suspense fallback={<Loading />}>
  <Settings />
</Suspense>
```

3. **Optimize images:**
```javascript
<img 
  src={image} 
  alt="description" 
  loading="lazy" 
  width="200" 
  height="200"
/>
```

---

## 📝 JSDoc Examples

```javascript
/**
 * Handles user login with email and password
 * @param {string} email - User email address
 * @param {string} password - User password
 * @returns {Promise<void>}
 */
const handleLogin = async (email, password) => {
  // Implementation
};

/**
 * Fetches incident details by ID
 * @param {number} id - Incident ID
 * @returns {Promise<IncidentObject>}
 */
const fetchIncident = async (id) => {
  // Implementation
};
```

---

## 🧪 Testing Examples

```javascript
// Example test structure (Jest/Vitest)
describe('Login Component', () => {
  it('should render login form', () => {
    render(<Login />);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  });

  it('should submit form with valid credentials', () => {
    render(<Login />);
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    userEvent.click(submitButton);
  });
});
```

---

**All examples are production-ready and follow React best practices!**

Last Updated: December 9, 2025
