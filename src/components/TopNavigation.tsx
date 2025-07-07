
import { Bell, User } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

export function TopNavigation() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="text-navy-600 hover:text-navy-800" />
          <div>
            <h1 className="text-xl font-semibold text-navy-800">Risk Management Dashboard</h1>
            <p className="text-sm text-gray-600">Proactive Risk Identification and Systems Management</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-5 w-5 text-navy-600" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs flex items-center justify-center">
              <span className="text-white text-xs">3</span>
            </span>
          </Button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-navy-600 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-navy-800">Admin User</p>
              <p className="text-xs text-gray-600">admin@agency.gov</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
