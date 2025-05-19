
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface PatientSectionProps {
  onDataChange: (data: any) => void;
}

export function PatientSection({ onDataChange }: PatientSectionProps) {
  const [patientData, setPatientData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    memberId: "",
    groupNumber: "",
    isUrgent: false,
  });
  
  const handleChange = (field: string, value: string | boolean) => {
    const updatedData = { ...patientData, [field]: value };
    setPatientData(updatedData);
    onDataChange(updatedData);
  };
  
  return (
    <Card className="mb-6">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-lg font-medium">Patient & Insurance Information</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input 
              id="firstName" 
              value={patientData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              placeholder="Patient's first name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input 
              id="lastName" 
              value={patientData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              placeholder="Patient's last name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dob">Date of Birth</Label>
            <Input 
              id="dob" 
              type="date" 
              value={patientData.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select 
              value={patientData.gender} 
              onValueChange={(value) => handleChange("gender", value)}
            >
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="memberId">Member ID</Label>
            <Input 
              id="memberId" 
              value={patientData.memberId}
              onChange={(e) => handleChange("memberId", e.target.value)}
              placeholder="Insurance member ID"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="groupNumber">Group Number</Label>
            <Input 
              id="groupNumber" 
              value={patientData.groupNumber}
              onChange={(e) => handleChange("groupNumber", e.target.value)}
              placeholder="Insurance group number"
            />
          </div>
          
          <div className="flex items-center space-x-2 col-span-full">
            <Checkbox 
              id="isUrgent" 
              checked={patientData.isUrgent} 
              onCheckedChange={(checked) => handleChange("isUrgent", !!checked)}
            />
            <label
              htmlFor="isUrgent"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              This request is urgent (needed within 72 hours)
            </label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
