import React from 'react';
import { ShieldCheck, Users, Camera, Smartphone, Zap, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-slate-900 mb-2">About Yaqidh</h2>
        <p className="text-slate-600 text-lg">Your Trusted Security & Monitoring System</p>
      </header>

      {/* Mission Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
        <p className="text-slate-600 leading-relaxed mb-6">
          Yaqidh is a comprehensive security and monitoring system designed to provide peace of mind for homes, nurseries, schools, and childcare facilities. We combine cutting-edge technology with intuitive design to create a safe environment where parents and caregivers can monitor and manage security in real-time.
        </p>
        <p className="text-slate-600 leading-relaxed">
          Our mission is to make professional-grade security accessible to every institution that prioritizes child safety and parental peace of mind.
        </p>
      </div>

      {/* Key Features */}
      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Key Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mb-4">
              <Camera className="text-brand-600" size={24} />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">Live Monitoring</h4>
            <p className="text-slate-600 text-sm">
              Real-time video feeds from multiple cameras with instant alerts and notifications.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mb-4">
              <Smartphone className="text-brand-600" size={24} />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">Mobile Access</h4>
            <p className="text-slate-600 text-sm">
              Access your security system anytime, anywhere via our mobile app or web platform.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mb-4">
              <Zap className="text-brand-600" size={24} />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">Instant Alerts</h4>
            <p className="text-slate-600 text-sm">
              Get notified immediately via SMS, email, or in-app notifications for important incidents.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mb-4">
              <Users className="text-brand-600" size={24} />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">User Management</h4>
            <p className="text-slate-600 text-sm">
              Manage multiple users and roles with customizable permissions and access levels.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mb-4">
              <ShieldCheck className="text-brand-600" size={24} />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">Advanced Security</h4>
            <p className="text-slate-600 text-sm">
              Enterprise-grade encryption and secure authentication for complete data protection.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-brand-100 rounded-xl flex items-center justify-center mb-4">
              <Award className="text-brand-600" size={24} />
            </div>
            <h4 className="font-bold text-slate-900 mb-2">Incident Reports</h4>
            <p className="text-slate-600 text-sm">
              Detailed incident logging and reporting with analytics and trends analysis.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-gradient-to-r from-brand-50 to-slate-50 rounded-2xl border border-brand-100 p-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">How It Works</h3>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-brand-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Install Cameras</h4>
              <p className="text-slate-600">Set up high-definition cameras in key areas of your facility for comprehensive coverage.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-brand-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Connect Your Devices</h4>
              <p className="text-slate-600">Link cameras and sensors to the Yaqidh system via your secure network connection.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-brand-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Manage Access</h4>
              <p className="text-slate-600">Create user accounts and set permissions for staff, parents, and administrators.</p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-brand-500 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
            <div>
              <h4 className="font-bold text-slate-900 mb-1">Monitor in Real-Time</h4>
              <p className="text-slate-600">View live feeds, receive alerts, and access historical footage whenever you need it.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Yaqidh */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Why Choose Yaqidh?</h3>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <span className="text-brand-500 font-bold mt-1">✓</span>
            <div>
              <p className="font-semibold text-slate-900">User-Friendly Interface</p>
              <p className="text-slate-600 text-sm">Intuitive dashboard designed for easy navigation by parents and staff of all technical levels.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-brand-500 font-bold mt-1">✓</span>
            <div>
              <p className="font-semibold text-slate-900">24/7 Support</p>
              <p className="text-slate-600 text-sm">Dedicated support team available around the clock to assist with any questions or issues.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-brand-500 font-bold mt-1">✓</span>
            <div>
              <p className="font-semibold text-slate-900">Scalable Solution</p>
              <p className="text-slate-600 text-sm">From small facilities to large institutions, Yaqidh grows with your needs.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-brand-500 font-bold mt-1">✓</span>
            <div>
              <p className="font-semibold text-slate-900">Data Privacy</p>
              <p className="text-slate-600 text-sm">Compliant with international data protection regulations including GDPR and CCPA.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-brand-500 font-bold mt-1">✓</span>
            <div>
              <p className="font-semibold text-slate-900">Continuous Innovation</p>
              <p className="text-slate-600 text-sm">Regular updates and new features to keep your facility at the forefront of security technology.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
