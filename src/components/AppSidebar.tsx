
import { BarChart, Upload, Settings, Bell, User, FileText } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

type ActiveTab = 'dashboard' | 'upload' | 'insights' | 'alerts' | 'reports' | 'settings';

interface AppSidebarProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

const navigationItems = [
  { id: 'dashboard', title: 'Dashboard', icon: BarChart },
  { id: 'upload', title: 'Upload CSV', icon: Upload },
  { id: 'insights', title: 'Predictive Insights', icon: BarChart },
  { id: 'alerts', title: 'Risk Alerts', icon: Bell },
  { id: 'reports', title: 'Reports', icon: FileText },
  { id: 'settings', title: 'Settings', icon: Settings },
];

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  const { collapsed } = useSidebar();

  return (
    <Sidebar className={`${collapsed ? 'w-14' : 'w-64'} bg-navy-800 border-r border-navy-700`}>
      <SidebarContent className="bg-navy-800">
        {/* Logo Section */}
        <div className="p-4 border-b border-navy-700">
          {!collapsed ? (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-navy-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="text-white font-bold text-lg">PRISM</span>
            </div>
          ) : (
            <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-navy-600 rounded-lg flex items-center justify-center mx-auto">
              <span className="text-white font-bold text-sm">P</span>
            </div>
          )}
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1 p-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => onTabChange(item.id as ActiveTab)}
                    className={`
                      prism-nav-item w-full justify-start
                      ${activeTab === item.id ? 'prism-nav-item-active' : 'prism-nav-item-inactive'}
                    `}
                  >
                    <item.icon className={`h-5 w-5 ${collapsed ? '' : 'mr-3'}`} />
                    {!collapsed && <span>{item.title}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Profile Section */}
        <div className="mt-auto p-4 border-t border-navy-700">
          {!collapsed ? (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-navy-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">Admin User</p>
                <p className="text-navy-300 text-xs truncate">Federal Agency</p>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 bg-navy-600 rounded-full flex items-center justify-center mx-auto">
              <User className="h-4 w-4 text-white" />
            </div>
          )}
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
