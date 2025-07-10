
import { Bell, AlertTriangle, AlertCircle, Info, Clock, User, Calendar, Filter, Search } from 'lucide-react';
import { useData } from '@/context/DataContext';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function RiskAlerts() {
  const { riskData, isDataLoaded } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return AlertTriangle;
      case 'High':
        return AlertCircle;
      case 'Medium':
        return Info;
      case 'Low':
        return Clock;
      default:
        return Info;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'bg-red-50 border-red-200 text-red-800';
      case 'High':
        return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'Medium':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      case 'Low':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-800';
    }
  };

  const getBadgeVariant = (severity: string) => {
    switch (severity) {
      case 'Critical':
        return 'destructive';
      case 'High':
        return 'destructive';
      case 'Medium':
        return 'secondary';
      case 'Low':
        return 'outline';
      default:
        return 'secondary';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
        return 'bg-red-100 text-red-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Resolved':
        return 'bg-green-100 text-green-800';
      case 'Closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredAlerts = riskData.filter(risk => {
    const matchesSearch = risk.riskDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         risk.riskCategory.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         risk.projectName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || risk.severityLevel === severityFilter;
    const matchesStatus = statusFilter === 'all' || risk.status === statusFilter;
    
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const criticalAlerts = riskData.filter(risk => risk.severityLevel === 'Critical' && risk.status !== 'Closed').length;
  const highAlerts = riskData.filter(risk => risk.severityLevel === 'High' && risk.status !== 'Closed').length;
  const activeAlerts = riskData.filter(risk => risk.status === 'Open' || risk.status === 'In Progress').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-800">Risk Alerts</h1>
        <p className="text-gray-600 mt-1">Real-time monitoring and alert management</p>
      </div>

      {/* Alert Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="prism-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Critical Alerts</p>
              <p className="text-2xl font-bold text-red-600">{criticalAlerts}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
        </div>
        <div className="prism-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-orange-600">{highAlerts}</p>
            </div>
            <AlertCircle className="h-8 w-8 text-orange-500" />
          </div>
        </div>
        <div className="prism-card p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Alerts</p>
              <p className="text-2xl font-bold text-blue-600">{activeAlerts}</p>
            </div>
            <Bell className="h-8 w-8 text-blue-500" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="prism-card p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search alerts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Select value={severityFilter} onValueChange={setSeverityFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Alerts List */}
      <div className="prism-card p-6">
        <h3 className="text-lg font-semibold text-navy-800 mb-4">Alert Details</h3>
        
        {!isDataLoaded || filteredAlerts.length === 0 ? (
          <div className="text-center py-8">
            <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              {!isDataLoaded ? 'Upload CSV data to see alerts' : 'No alerts match your filters'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAlerts.map((risk) => {
              const AlertIcon = getAlertIcon(risk.severityLevel);
              return (
                <div
                  key={risk.riskId}
                  className={`p-4 rounded-lg border-l-4 ${getAlertColor(risk.severityLevel)}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <AlertIcon className="h-5 w-5 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{risk.riskCategory}</h4>
                          <Badge variant={getBadgeVariant(risk.severityLevel)}>
                            {risk.severityLevel}
                          </Badge>
                          <Badge variant="outline" className={getStatusColor(risk.status)}>
                            {risk.status}
                          </Badge>
                        </div>
                        <p className="text-sm mb-2">{risk.riskDescription}</p>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>{risk.owner}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{risk.dateIdentified}</span>
                          </div>
                          <span>{risk.projectName}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                      <Button variant="outline" size="sm">
                        Update Status
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
