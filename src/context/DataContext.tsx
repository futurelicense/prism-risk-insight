import { createContext, useContext, useState, ReactNode } from 'react';

export interface RiskData {
  riskId: string;
  riskCategory: string;
  riskDescription: string;
  probability: string;
  impact: string;
  severityLevel: string;
  projectName: string;
  department: string;
  status: string;
  mitigationStrategy: string;
  owner: string;
  dateIdentified: string;
  dueDate: string;
}

interface DataContextType {
  riskData: RiskData[];
  setRiskData: (data: RiskData[]) => void;
  isDataLoaded: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
  const [riskData, setRiskData] = useState<RiskData[]>([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  const updateRiskData = (data: RiskData[]) => {
    setRiskData(data);
    setIsDataLoaded(true);
  };

  return (
    <DataContext.Provider value={{ 
      riskData, 
      setRiskData: updateRiskData, 
      isDataLoaded 
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}