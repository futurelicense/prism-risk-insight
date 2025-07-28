
import { useState } from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { TopNavigation } from '@/components/TopNavigation';
import { DashboardOverview } from '@/components/DashboardOverview';
import { CSVUploadModule } from '@/components/CSVUploadModule';
import { PredictiveInsights } from '@/components/PredictiveInsights';
import { RiskAlerts } from '@/components/RiskAlerts';
import { Reports } from '@/components/Reports';
import { Settings } from '@/components/Settings';

type ActiveTab = 'dashboard' | 'upload' | 'insights' | 'alerts' | 'reports' | 'settings';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('alerts');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'upload':
        return <CSVUploadModule />;
      case 'insights':
        return <PredictiveInsights />;
      case 'alerts':
        return <RiskAlerts />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="flex-1 flex flex-col">
          <TopNavigation />
          
          <main className="flex-1 p-6 overflow-auto animate-fade-in">
            {renderActiveComponent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
