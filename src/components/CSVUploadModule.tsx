
import { useState, useCallback } from 'react';
import { Upload, FileText, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UploadedFile {
  name: string;
  size: number;
  status: 'uploading' | 'success' | 'error';
  preview?: Array<Record<string, string>>;
}

export function CSVUploadModule() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      processFiles(files);
    }
  }, []);

  const processFiles = (files: File[]) => {
    files.forEach(file => {
      if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
        const newFile: UploadedFile = {
          name: file.name,
          size: file.size,
          status: 'uploading'
        };

        setUploadedFiles(prev => [...prev, newFile]);

        // Simulate file processing
        setTimeout(() => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const text = e.target?.result as string;
            const lines = text.split('\n').slice(0, 5); // First 5 rows for preview
            const preview = lines.map(line => {
              const values = line.split(',');
              return {
                col1: values[0] || '',
                col2: values[1] || '',
                col3: values[2] || '',
                col4: values[3] || ''
              };
            });

            setUploadedFiles(prev => 
              prev.map(f => 
                f.name === file.name 
                  ? { ...f, status: 'success', preview }
                  : f
              )
            );
          };
          reader.readAsText(file);
        }, 2000);
      }
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-navy-800">CSV Data Upload</h1>
        <p className="text-gray-600 mt-1">Upload your risk management data for analysis</p>
      </div>

      {/* Upload Zone */}
      <div className="prism-card p-6">
        <div
          className={`
            prism-upload-zone
            ${isDragOver ? 'prism-upload-zone-active' : ''}
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Drag and drop your CSV files here
          </h3>
          <p className="text-gray-500 mb-4">
            or click to browse and select files
          </p>
          <input
            type="file"
            accept=".csv"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
          />
          <Button asChild>
            <label htmlFor="file-upload" className="cursor-pointer">
              Select CSV Files
            </label>
          </Button>
          <p className="text-xs text-gray-400 mt-2">
            Maximum file size: 50MB. Supported format: CSV only
          </p>
        </div>
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="prism-card p-6">
          <h3 className="text-lg font-semibold text-navy-800 mb-4">Uploaded Files</h3>
          <div className="space-y-4">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-navy-600" />
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {file.status === 'uploading' && (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-navy-600"></div>
                    )}
                    {file.status === 'success' && (
                      <CheckCircle className="h-5 w-5 text-success-600" />
                    )}
                    {file.status === 'error' && (
                      <XCircle className="h-5 w-5 text-danger-600" />
                    )}
                    <span className="text-sm font-medium capitalize">{file.status}</span>
                  </div>
                </div>

                {/* Preview Table */}
                {file.preview && file.status === 'success' && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Data Preview</h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr>
                            {Object.keys(file.preview[0] || {}).map(key => (
                              <th key={key} className="px-3 py-2 text-left font-medium text-gray-500">
                                {key}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {file.preview.slice(1).map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {Object.values(row).map((value, colIndex) => (
                                <td key={colIndex} className="px-3 py-2 text-gray-900">
                                  {value}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
