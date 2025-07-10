
import { TrendingUp, TrendingDown, Clock, DollarSign } from 'lucide-react';
import { useData } from '@/context/DataContext';

export function KPIMetrics() {
  const { riskData, isDataLoaded } = useData();

  const calculateKPIs = () => {
    if (!isDataLoaded || riskData.length === 0) {
      return {
        riskDetectionAccuracy: 87,
        mitigationTime: 12,
        budgetImpact: 8.5
      };
    }

    const totalRisks = riskData.length;
    const closedRisks = riskData.filter(r => r.status === 'Closed').length;
    const highSeverityRisks = riskData.filter(r => r.severityLevel === 'Critical' || r.severityLevel === 'High').length;
    
    return {
      riskDetectionAccuracy: Math.round((closedRisks / totalRisks) * 100),
      mitigationTime: Math.round(totalRisks * 0.8), // Simplified calculation
      budgetImpact: Math.round(highSeverityRisks * 2.5) // Simplified calculation
    };
  };

  const kpis = calculateKPIs();
  
  const metrics = [
    {
      title: 'Risk Detection Accuracy',
      value: `${kpis.riskDetectionAccuracy}%`,
      change: '+2.3%',
      trend: 'up',
      icon: TrendingUp,
      color: 'success'
    },
    {
      title: 'Avg. Mitigation Time',
      value: `${kpis.mitigationTime} days`,
      change: '-0.8 days',
      trend: 'down',
      icon: Clock,
      color: 'success'
    },
    {
      title: 'Budget Impact',
      value: `${kpis.budgetImpact}%`,
      change: '-12.3%',
      trend: 'down',
      icon: DollarSign,
      color: 'success'
    },
    {
      title: 'Active Risk Events',
      value: `${riskData.filter(r => r.status === 'Open' || r.status === 'In Progress').length}`,
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
