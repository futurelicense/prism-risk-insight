
import { FileText } from 'lucide-react';

export function Reports() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-navy-800">Reports</h1>
        <p className="text-gray-600 mt-1">Generate comprehensive risk management reports</p>
      </div>
      
      <div className="prism-card p-8 text-center">
        <FileText className="h-16 w-16 text-navy-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-navy-800 mb-2">Report Generation</h3>
        <p className="text-gray-600">
          Create detailed reports for stakeholders, compliance documentation, and executive summaries.
        </p>
      </div>
    </div>
  );
}
