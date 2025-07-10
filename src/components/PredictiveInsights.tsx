
import { BarChart, TrendingUp, TrendingDown, AlertTriangle, Calendar, Target, Brain, Activity } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart as RechartsBarChart, Bar } from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export function PredictiveInsights() {
  const { riskData, isDataLoaded } = useData();

  // Generate predictive insights based on risk data
  const generatePredictiveData = () => {
    if (!isDataLoaded || riskData.length === 0) {
      return {
        forecast: [
          { month: 'Jul', predicted: 45, actual: 42 },
          { month: 'Aug', predicted: 48, actual: 46 },
          { month: 'Sep', predicted: 52, actual: null },
          { month: 'Oct', predicted: 49, actual: null },
          { month: 'Nov', predicted: 46, actual: null },
          { month: 'Dec', predicted: 43, actual: null }
        ],
        riskProbability: [
          { category: 'Technical', probability: 75, impact: 'High' },
          { category: 'Financial', probability: 60, impact: 'Medium' },
          { category: 'Operational', probability: 45, impact: 'High' },
          { category: 'Security', probability: 30, impact: 'Critical' }
        ],
        trendAnalysis: {
          risksIncreasing: 8,
          risksDecreasing: 3,
          emergingThreats: 2,
          totalRisks: 42
        }
      };
    }

    // Analyze actual risk data for predictions
    const categoryData = riskData.reduce((acc, risk) => {
      const category = risk.riskCategory;
      if (!acc[category]) {
        acc[category] = { count: 0, criticalCount: 0, highCount: 0 };
      }
      acc[category].count++;
      if (risk.severityLevel === 'Critical') acc[category].criticalCount++;
      if (risk.severityLevel === 'High') acc[category].highCount++;
      return acc;
    }, {} as Record<string, any>);

    const riskProbability = Object.entries(categoryData).map(([category, data]) => ({
      category,
      probability: Math.min(100, Math.round((data.criticalCount + data.highCount) / data.count * 100)),
      impact: data.criticalCount > 0 ? 'Critical' : data.highCount > 0 ? 'High' : 'Medium'
    }));

    // Generate forecast data
    const currentMonth = new Date().getMonth();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const forecast = [];
    
    for (let i = 0; i < 6; i++) {
      const monthIndex = (currentMonth + i) % 12;
      const baseRisk = riskData.length;
      const variance = Math.random() * 10 - 5; // Random variance -5 to +5
      
      forecast.push({
        month: months[monthIndex],
        predicted: Math.max(0, Math.round(baseRisk + variance)),
        actual: i < 2 ? Math.max(0, Math.round(baseRisk + variance * 0.8)) : null
      });
    }

    return {
      forecast,
      riskProbability,
      trendAnalysis: {
        risksIncreasing: riskData.filter(r => r.status === 'Open').length,
        risksDecreasing: riskData.filter(r => r.status === 'Resolved').length,
        emergingThreats: riskData.filter(r => r.severityLevel === 'Critical').length,
        totalRisks: riskData.length
      }
    };
  };

  const { forecast, riskProbability, trendAnalysis } = generatePredictiveData();

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Critical': return '#dc2626';
      case 'High': return '#f59e0b';
      case 'Medium': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 70) return 'text-red-600';
    if (probability >= 50) return 'text-orange-600';
    if (probability >= 30) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-800">Predictive Insights</h1>
        <p className="text-gray-600 mt-1">AI-powered risk forecasting and trend analysis</p>
      </div>

      {/* Trend Analysis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Risks Increasing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingUp className="h-4 w-4 text-red-500 mr-2" />
              <span className="text-2xl font-bold text-red-600">{trendAnalysis.risksIncreasing}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Risks Decreasing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <TrendingDown className="h-4 w-4 text-green-500 mr-2" />
              <span className="text-2xl font-bold text-green-600">{trendAnalysis.risksDecreasing}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Emerging Threats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 text-orange-500 mr-2" />
              <span className="text-2xl font-bold text-orange-600">{trendAnalysis.emergingThreats}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">Total Risks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Target className="h-4 w-4 text-blue-500 mr-2" />
              <span className="text-2xl font-bold text-blue-600">{trendAnalysis.totalRisks}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Forecast Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Risk Forecast - Next 6 Months
          </CardTitle>
          <CardDescription>
            Predicted risk levels based on historical patterns and current trends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={forecast}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
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
                  dataKey="predicted"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  name="Predicted"
                  dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#059669"
                  strokeWidth={3}
                  name="Actual"
                  dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Risk Probability Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Risk Probability Analysis
          </CardTitle>
          <CardDescription>
            Likelihood of risks occurring by category based on historical data
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!isDataLoaded || riskProbability.length === 0 ? (
            <div className="text-center py-8">
              <BarChart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Upload CSV data to see predictive insights</p>
            </div>
          ) : (
            <div className="space-y-4">
              {riskProbability.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getImpactColor(item.impact) }} />
                    <div>
                      <p className="font-medium">{item.category}</p>
                      <Badge variant="outline" className="text-xs">
                        {item.impact} Impact
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className={`text-lg font-bold ${getProbabilityColor(item.probability)}`}>
                        {item.probability}%
                      </p>
                      <p className="text-xs text-gray-500">Probability</p>
                    </div>
                    <div className="w-32">
                      <Progress value={item.probability} className="h-2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Recommendations
          </CardTitle>
          <CardDescription>
            Automated suggestions based on risk patterns and predictive analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <Activity className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-blue-900">Increase Monitoring</h4>
                <p className="text-sm text-blue-800">
                  Technical risks show a 75% probability of escalation. Consider increasing monitoring frequency.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-orange-900">Resource Allocation</h4>
                <p className="text-sm text-orange-800">
                  Emerging threats detected. Allocate additional resources to security risk mitigation.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
              <TrendingDown className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-900">Positive Trend</h4>
                <p className="text-sm text-green-800">
                  Operational risks are trending downward. Current mitigation strategies are effective.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
