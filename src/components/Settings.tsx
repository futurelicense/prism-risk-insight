
export function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-800">Settings</h1>
        <p className="text-gray-600 mt-1">Configure system preferences and user access</p>
      </div>
      
      <div className="prism-card p-8 text-center">
        <Settings className="h-16 w-16 text-navy-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-navy-800 mb-2">System Configuration</h3>
        <p className="text-gray-600">
          Manage user permissions, data sources, alert thresholds, and integration settings.
        </p>
      </div>
    </div>
  );
}
