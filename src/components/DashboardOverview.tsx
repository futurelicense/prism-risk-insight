
import { KPIMetrics } from '@/components/KPIMetrics';
import { RiskTrendsChart } from '@/components/RiskTrendsChart';
import { RiskCategoryChart } from '@/components/RiskCategoryChart';
import { VulnerabilityHeatmap } from '@/components/VulnerabilityHeatmap';
import { RecentAlerts } from '@/components/RecentAlerts';
import { Activity, TrendingUp, Shield, AlertTriangle, Clock, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface DashboardOverviewProps {
  onNavigate?: (tab: 'dashboard' | 'upload' | 'insights' | 'alerts' | 'reports' | 'settings') => void;
}

export function DashboardOverview({ onNavigate }: DashboardOverviewProps) {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  const formattedTime = currentDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="space-y-8 p-6 max-w-7xl mx-auto">
      {/* Enhanced Header with Glass Morphism */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-transparent rounded-3xl"></div>
        <div className="relative bg-glass backdrop-blur-lg rounded-3xl p-8 border border-white/20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glow">
                  <Activity className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-gradient-primary">Dashboard Overview</h1>
                  <p className="text-muted-foreground text-lg">Monitor risk metrics and system performance in real-time</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full">
                <Calendar className="h-4 w-4" />
                <span>{formattedDate}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full">
                <Clock className="h-4 w-4" />
                <span>Last updated: {formattedTime}</span>
              </div>
              <Badge variant="outline" className="bg-success-gradient text-white border-0">
                <div className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></div>
                System Online
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Button 
          onClick={() => onNavigate?.('reports')}
          className="h-16 bg-gradient-primary hover:scale-105 transition-all duration-300 text-white border-0 rounded-2xl shadow-lg"
        >
          <TrendingUp className="h-5 w-5 mr-2" />
          Generate Report
        </Button>
        <Button 
          onClick={() => onNavigate?.('insights')}
          variant="outline" 
          className="h-16 hover:scale-105 transition-all duration-300 rounded-2xl bg-glass backdrop-blur-sm border-white/20"
        >
          <Shield className="h-5 w-5 mr-2" />
          Risk Assessment
        </Button>
        <Button variant="outline" className="h-16 hover:scale-105 transition-all duration-300 rounded-2xl bg-glass backdrop-blur-sm border-white/20">
          <AlertTriangle className="h-5 w-5 mr-2" />
          View Alerts
        </Button>
        <Button variant="outline" className="h-16 hover:scale-105 transition-all duration-300 rounded-2xl bg-glass backdrop-blur-sm border-white/20">
          <Activity className="h-5 w-5 mr-2" />
          System Status
        </Button>
      </div>

      {/* KPI Metrics with Enhanced Styling */}
      <div className="animate-fade-in">
        <KPIMetrics />
      </div>

      {/* Charts Grid with Staggered Animation */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 animate-fade-in">
        <div className="transform hover:scale-[1.02] transition-all duration-300">
          <RiskTrendsChart />
        </div>
        <div className="transform hover:scale-[1.02] transition-all duration-300">
          <RiskCategoryChart />
        </div>
      </div>

      {/* Bottom Section with Enhanced Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 animate-fade-in">
        <div className="xl:col-span-2 transform hover:scale-[1.01] transition-all duration-300">
          <VulnerabilityHeatmap />
        </div>
        <div className="transform hover:scale-[1.02] transition-all duration-300">
          <RecentAlerts />
        </div>
      </div>

      {/* Footer Stats */}
      <div className="bg-glass backdrop-blur-lg rounded-2xl p-6 border border-white/20 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gradient-primary">99.9%</div>
            <div className="text-sm text-muted-foreground">System Uptime</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gradient-primary">24/7</div>
            <div className="text-sm text-muted-foreground">Monitoring Active</div>
          </div>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gradient-primary">Real-time</div>
            <div className="text-sm text-muted-foreground">Data Updates</div>
          </div>
        </div>
      </div>
    </div>
  );
}
