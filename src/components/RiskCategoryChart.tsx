
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { category: 'Cybersecurity', count: 45, severity: 'high' },
  { category: 'Operational', count: 32, severity: 'medium' },
  { category: 'Financial', count: 28, severity: 'high' },
  { category: 'Compliance', count: 22, severity: 'medium' },
  { category: 'Strategic', count: 18, severity: 'low' },
  { category: 'Reputational', count: 15, severity: 'medium' }
];

export function RiskCategoryChart() {
  return (
    <div className="prism-card p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-navy-800">Risk Category Distribution</h3>
        <p className="text-sm text-gray-600">Current risk events by category type</p>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="category" 
              stroke="#6b7280"
              fontSize={11}
              angle={-45}
              textAnchor="end"
              height={80}
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
            <Bar 
              dataKey="count" 
              fill="#334e68"
              radius={[4, 4, 0, 0]}
              name="Risk Events"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
