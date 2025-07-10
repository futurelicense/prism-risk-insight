
import { Bell, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { useData } from '@/context/DataContext';

export function RecentAlerts() {
  const { riskData, isDataLoaded } = useData();

  const generateAlerts = () => {
    if (!isDataLoaded || riskData.length === 0) {
      return [
        {
          id: 1,
          type: 'high',
          title: 'Critical Security Breach',
          description: 'Unauthorized access detected in Project Alpha',
          time: '2 minutes ago',
          icon: AlertTriangle
        },
        {
          id: 2,
          type: 'medium',
          title: 'Budget Variance Alert',
          description: 'Project Beta exceeds budget threshold by 15%',
          time: '1 hour ago',
          icon: AlertCircle
        },
        {
          id: 3,
          type: 'low',
          title: 'Compliance Review Due',
          description: 'Quarterly review scheduled for next week',
          time: '3 hours ago',
          icon: Info
        },
        {
          id: 4,
          type: 'medium',
          title: 'System Performance',
          description: 'Response time degradation in monitoring system',
          time: '1 day ago',
          icon: AlertCircle
        }
      ];
    }

    return riskData
      .filter(risk => risk.status === 'Open' || risk.status === 'In Progress')
      .slice(0, 4)
      .map((risk, index) => ({
        id: index + 1,
        type: risk.severityLevel === 'Critical' ? 'high' : 
              risk.severityLevel === 'High' ? 'medium' : 'low',
        title: `${risk.riskCategory} Risk`,
        description: risk.riskDescription,
        time: risk.dateIdentified,
        icon: risk.severityLevel === 'Critical' ? AlertTriangle : 
              risk.severityLevel === 'High' ? AlertCircle : Info
      }));
  };

  const alerts = generateAlerts();
  const getAlertStyle = (type: string) => {
    switch (type) {
      case 'high':
        return 'border-l-danger-500 bg-danger-50';
      case 'medium':
        return 'border-l-warning-500 bg-warning-50';
      case 'low':
        return 'border-l-blue-500 bg-blue-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'high':
        return 'text-danger-600';
      case 'medium':
        return 'text-warning-600';
      case 'low':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="prism-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-navy-800">Recent Alerts</h3>
        <Bell className="h-5 w-5 text-gray-400" />
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`border-l-4 p-3 rounded-r-lg ${getAlertStyle(alert.type)} transition-all duration-200 hover:shadow-md cursor-pointer`}
          >
            <div className="flex items-start space-x-3">
              <alert.icon className={`h-5 w-5 mt-0.5 ${getIconColor(alert.type)}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {alert.title}
                </p>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {alert.description}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {alert.time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4">
        <button className="w-full text-sm text-navy-600 hover:text-navy-800 font-medium">
          View All Alerts →
        </button>
      </div>
    </div>
  );
}
