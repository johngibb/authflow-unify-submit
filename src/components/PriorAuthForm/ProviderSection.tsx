
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProviderSectionProps {
  onDataChange: (data: any) => void;
}

export function ProviderSection({ onDataChange }: ProviderSectionProps) {
  const [providerData, setProviderData] = useState({
    providerName: "",
    npi: "",
    taxId: "",
    contactName: "",
    contactPhone: "",
    contactEmail: "",
    facilityName: "",
    facilityAddress: "",
    payorName: "",
  });
  
  const handleChange = (field: string, value: string) => {
    const updatedData = { ...providerData, [field]: value };
    setProviderData(updatedData);
    onDataChange(updatedData);
  };
  
  return (
    <Card className="mb-6">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-lg font-medium">Provider & Payor Information</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="providerName">Provider Name</Label>
            <Input 
              id="providerName" 
              value={providerData.providerName}
              onChange={(e) => handleChange("providerName", e.target.value)}
              placeholder="Ordering provider's name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="npi">NPI Number</Label>
            <Input 
              id="npi" 
              value={providerData.npi}
              onChange={(e) => handleChange("npi", e.target.value)}
              placeholder="Provider NPI"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="taxId">Tax ID</Label>
            <Input 
              id="taxId" 
              value={providerData.taxId}
              onChange={(e) => handleChange("taxId", e.target.value)}
              placeholder="Provider tax ID"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactName">Contact Name</Label>
            <Input 
              id="contactName" 
              value={providerData.contactName}
              onChange={(e) => handleChange("contactName", e.target.value)}
              placeholder="Contact person's name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactPhone">Contact Phone</Label>
            <Input 
              id="contactPhone" 
              type="tel"
              value={providerData.contactPhone}
              onChange={(e) => handleChange("contactPhone", e.target.value)}
              placeholder="Contact phone number"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="contactEmail">Contact Email</Label>
            <Input 
              id="contactEmail" 
              type="email"
              value={providerData.contactEmail}
              onChange={(e) => handleChange("contactEmail", e.target.value)}
              placeholder="Contact email address"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="facilityName">Facility Name</Label>
            <Input 
              id="facilityName" 
              value={providerData.facilityName}
              onChange={(e) => handleChange("facilityName", e.target.value)}
              placeholder="Facility name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="facilityAddress">Facility Address</Label>
            <Input 
              id="facilityAddress" 
              value={providerData.facilityAddress}
              onChange={(e) => handleChange("facilityAddress", e.target.value)}
              placeholder="Facility address"
              required
            />
          </div>
          
          <div className="space-y-2 col-span-full">
            <Label htmlFor="payorName">Payor / Insurance Company</Label>
            <Select 
              value={providerData.payorName} 
              onValueChange={(value) => handleChange("payorName", value)}
            >
              <SelectTrigger id="payorName" className="w-full">
                <SelectValue placeholder="Select payor" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="aetna">Aetna</SelectItem>
                <SelectItem value="anthem">Anthem</SelectItem>
                <SelectItem value="bcbs">Blue Cross Blue Shield</SelectItem>
                <SelectItem value="cigna">Cigna</SelectItem>
                <SelectItem value="humana">Humana</SelectItem>
                <SelectItem value="medicare">Medicare</SelectItem>
                <SelectItem value="medicaid">Medicaid</SelectItem>
                <SelectItem value="uhc">United Healthcare</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
