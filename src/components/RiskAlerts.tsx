
import { Bell } from 'lucide-react';

export function RiskAlerts() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-800">Risk Alerts</h1>
        <p className="text-gray-600 mt-1">Real-time monitoring and alert management</p>
      </div>
      
      <div className="prism-card p-8 text-center">
        <Bell className="h-16 w-16 text-navy-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-navy-800 mb-2">Alert Management System</h3>
        <p className="text-gray-600">
          Configure and manage risk alerts, notification settings, and automated responses.
        </p>
      </div>
    </div>
  );
}
