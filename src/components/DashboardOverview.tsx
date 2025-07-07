
import { KPIMetrics } from '@/components/KPIMetrics';
import { RiskTrendsChart } from '@/components/RiskTrendsChart';
import { RiskCategoryChart } from '@/components/RiskCategoryChart';
import { VulnerabilityHeatmap } from '@/components/VulnerabilityHeatmap';
import { RecentAlerts } from '@/components/RecentAlerts';

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-navy-800">Dashboard Overview</h1>
          <p className="text-gray-600 mt-1">Monitor risk metrics and system performance in real-time</p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* KPI Metrics */}
      <KPIMetrics />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RiskTrendsChart />
        <RiskCategoryChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <VulnerabilityHeatmap />
        </div>
        <div>
          <RecentAlerts />
        </div>
      </div>
    </div>
  );
}
