
import { BarChart } from 'lucide-react';

export function PredictiveInsights() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-800">Predictive Insights</h1>
        <p className="text-gray-600 mt-1">AI-powered risk forecasting and trend analysis</p>
      </div>
      
      <div className="prism-card p-8 text-center">
        <BarChart className="h-16 w-16 text-navy-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-navy-800 mb-2">Advanced Analytics Module</h3>
        <p className="text-gray-600">
          Predictive insights and machine learning models will be displayed here once data is uploaded and processed.
        </p>
      </div>
    </div>
  );
}
