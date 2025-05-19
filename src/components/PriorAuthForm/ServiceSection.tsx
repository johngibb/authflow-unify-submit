
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface ServiceSectionProps {
  onDataChange: (data: any) => void;
}

export function ServiceSection({ onDataChange }: ServiceSectionProps) {
  const [serviceData, setServiceData] = useState({
    serviceType: "",
    diagnosisCode: "",
    cptCodes: [""],
    serviceDate: "",
    serviceLocation: "",
    clinicalReason: "",
    additionalNotes: "",
  });
  
  const handleChange = (field: string, value: string | string[]) => {
    const updatedData = { ...serviceData, [field]: value };
    setServiceData(updatedData);
    onDataChange(updatedData);
  };
  
  const addCptCode = () => {
    const updatedCodes = [...serviceData.cptCodes, ""];
    handleChange("cptCodes", updatedCodes);
  };
  
  const removeCptCode = (index: number) => {
    if (serviceData.cptCodes.length <= 1) return;
    const updatedCodes = serviceData.cptCodes.filter((_, i) => i !== index);
    handleChange("cptCodes", updatedCodes);
  };
  
  const updateCptCode = (index: number, value: string) => {
    const updatedCodes = [...serviceData.cptCodes];
    updatedCodes[index] = value;
    handleChange("cptCodes", updatedCodes);
  };
  
  return (
    <Card className="mb-6">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-lg font-medium">Service Information</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="serviceType">Service Type</Label>
              <Select 
                value={serviceData.serviceType} 
                onValueChange={(value) => handleChange("serviceType", value)}
              >
                <SelectTrigger id="serviceType">
                  <SelectValue placeholder="Select service type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="diagnostic">Diagnostic</SelectItem>
                  <SelectItem value="procedure">Procedure</SelectItem>
                  <SelectItem value="therapy">Therapy</SelectItem>
                  <SelectItem value="dme">DME / Medical Equipment</SelectItem>
                  <SelectItem value="medication">Medication</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="diagnosisCode">Primary ICD-10 Diagnosis Code</Label>
              <Input 
                id="diagnosisCode" 
                value={serviceData.diagnosisCode}
                onChange={(e) => handleChange("diagnosisCode", e.target.value)}
                placeholder="e.g., J45.909"
                required
              />
            </div>
            
            <div className="space-y-2 col-span-full">
              <Label>CPT / HCPCS Codes</Label>
              {serviceData.cptCodes.map((code, index) => (
                <div key={index} className="flex items-center gap-2 mt-2">
                  <Input 
                    value={code}
                    onChange={(e) => updateCptCode(index, e.target.value)}
                    placeholder="Enter procedure code"
                    required
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    type="button"
                    onClick={() => removeCptCode(index)}
                    disabled={serviceData.cptCodes.length <= 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={addCptCode}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Code
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="serviceDate">Service Date</Label>
              <Input 
                id="serviceDate" 
                type="date" 
                value={serviceData.serviceDate}
                onChange={(e) => handleChange("serviceDate", e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="serviceLocation">Service Location</Label>
              <Select 
                value={serviceData.serviceLocation} 
                onValueChange={(value) => handleChange("serviceLocation", value)}
              >
                <SelectTrigger id="serviceLocation">
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="office">Office</SelectItem>
                  <SelectItem value="outpatient">Outpatient Hospital</SelectItem>
                  <SelectItem value="inpatient">Inpatient Hospital</SelectItem>
                  <SelectItem value="asc">Ambulatory Surgical Center</SelectItem>
                  <SelectItem value="home">Home</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="clinicalReason">Clinical Reason for Request</Label>
            <Textarea 
              id="clinicalReason" 
              value={serviceData.clinicalReason}
              onChange={(e) => handleChange("clinicalReason", e.target.value)}
              placeholder="Please provide clinical justification for the requested service"
              className="min-h-[100px]"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
            <Textarea 
              id="additionalNotes" 
              value={serviceData.additionalNotes}
              onChange={(e) => handleChange("additionalNotes", e.target.value)}
              placeholder="Any additional information for the payor"
              className="min-h-[80px]"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
