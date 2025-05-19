
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";

interface DocumentSectionProps {
  onDataChange: (data: any) => void;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
}

export function DocumentSection({ onDataChange }: DocumentSectionProps) {
  const [documents, setDocuments] = useState<Document[]>([]);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const newDocuments = Array.from(files).map(file => ({
      id: Math.random().toString(36).substring(2, 9),
      name: file.name,
      type: file.type,
      size: file.size
    }));
    
    const updatedDocuments = [...documents, ...newDocuments];
    setDocuments(updatedDocuments);
    onDataChange({ documents: updatedDocuments });
  };
  
  const removeDocument = (id: string) => {
    const updatedDocuments = documents.filter(doc => doc.id !== id);
    setDocuments(updatedDocuments);
    onDataChange({ documents: updatedDocuments });
  };
  
  // Format file size to human-readable format
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };
  
  return (
    <Card className="mb-6">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-lg font-medium">Supporting Documents</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="flex items-center justify-center w-full">
            <Label
              htmlFor="document-upload"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="mb-2 w-8 h-8 text-gray-400" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500">
                  PDF, DOC, DOCX, JPG, or PNG files (Max. 10MB each)
                </p>
              </div>
              <input
                id="document-upload"
                type="file"
                className="hidden"
                multiple
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              />
            </Label>
          </div>
          
          {documents.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Uploaded Documents</h3>
              <div className="space-y-2">
                {documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-md"
                  >
                    <div>
                      <p className="text-sm font-medium">{doc.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(doc.size)}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDocument(doc.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="text-sm text-gray-500 mt-4">
            <p>
              <strong>Required documents may include:</strong>
            </p>
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Clinical notes</li>
              <li>Test results</li>
              <li>Imaging reports</li>
              <li>Previous treatment history</li>
              <li>Failure of conservative treatment</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
