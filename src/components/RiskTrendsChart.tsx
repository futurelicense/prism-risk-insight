
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useData } from '@/context/DataContext';

export function RiskTrendsChart() {
  const { riskData, isDataLoaded } = useData();

  const generateData = () => {
    if (!isDataLoaded || riskData.length === 0) {
      return [
        { month: 'Jan', highRisk: 12, mediumRisk: 25, lowRisk: 8 },
        { month: 'Feb', highRisk: 15, mediumRisk: 22, lowRisk: 12 },
        { month: 'Mar', highRisk: 8, mediumRisk: 28, lowRisk: 15 },
        { month: 'Apr', highRisk: 18, mediumRisk: 24, lowRisk: 10 },
        { month: 'May', highRisk: 14, mediumRisk: 30, lowRisk: 18 },
        { month: 'Jun', highRisk: 23, mediumRisk: 26, lowRisk: 14 }
      ];
    }

    // Group risks by month and severity
    const monthData = riskData.reduce((acc, risk) => {
      const date = new Date(risk.dateIdentified);
      const monthKey = date.toLocaleDateString('en-US', { month: 'short' });
      
      if (!acc[monthKey]) {
        acc[monthKey] = { month: monthKey, highRisk: 0, mediumRisk: 0, lowRisk: 0 };
      }
      
      if (risk.severityLevel === 'Critical' || risk.severityLevel === 'High') {
        acc[monthKey].highRisk++;
      } else if (risk.severityLevel === 'Medium') {
        acc[monthKey].mediumRisk++;
      } else {
        acc[monthKey].lowRisk++;
      }
      
      return acc;
    }, {} as Record<string, any>);

    return Object.values(monthData);
  };

  const data = generateData();
  return (
    <div className="prism-card p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-navy-800">Risk Trends Over Time</h3>
        <p className="text-sm text-gray-600">Monthly risk event distribution by severity level</p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="month" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              stroke="#6b7280"
              fontSize={12}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#334e68',
                border: 'none',
                borderRadius: '8px',
                color: 'white'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="highRisk" 
              stroke="#dc2626" 
              strokeWidth={3}
              name="High Risk"
              dot={{ fill: '#dc2626', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="mediumRisk" 
              stroke="#f59e0b" 
              strokeWidth={3}
              name="Medium Risk"
              dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="lowRisk" 
              stroke="#22c55e" 
              strokeWidth={3}
              name="Low Risk"
              dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
