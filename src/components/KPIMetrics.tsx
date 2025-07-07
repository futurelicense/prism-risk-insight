
import { TrendingUp, TrendingDown, Clock, DollarSign } from 'lucide-react';

export function KPIMetrics() {
  const metrics = [
    {
      title: 'Risk Detection Accuracy',
      value: '94.7%',
      change: '+2.3%',
      trend: 'up',
      icon: TrendingUp,
      color: 'success'
    },
    {
      title: 'Avg. Mitigation Time',
      value: '3.2 days',
      change: '-0.8 days',
      trend: 'down',
      icon: Clock,
      color: 'success'
    },
    {
      title: 'Budget Impact',
      value: '$2.4M',
      change: '-12.3%',
      trend: 'down',
      icon: DollarSign,
      color: 'success'
    },
    {
      title: 'Active Risk Events',
      value: '23',
      change: '+5',
      trend: 'up',
      icon: TrendingUp,
      color: 'warning'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {metrics.map((metric, index) => (
        <div key={index} className="prism-metric-card group hover:shadow-enterprise-lg transition-shadow duration-300">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
              <p className="text-2xl font-bold text-navy-800">{metric.value}</p>
              <div className="flex items-center mt-2">
                {metric.trend === 'up' ? (
                  <TrendingUp className={`h-4 w-4 mr-1 ${
                    metric.color === 'success' ? 'text-success-600' : 'text-warning-600'
                  }`} />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1 text-success-600" />
                )}
                <span className={`text-sm font-medium ${
                  metric.color === 'success' ? 'text-success-600' : 'text-warning-600'
                }`}>
                  {metric.change}
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
            <div className={`p-3 rounded-lg ${
              metric.color === 'success' ? 'bg-success-50' : 'bg-warning-50'
            }`}>
              <metric.icon className={`h-6 w-6 ${
                metric.color === 'success' ? 'text-success-600' : 'text-warning-600'
              }`} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
