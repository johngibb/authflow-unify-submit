
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { StatusTimeline } from "@/components/ClaimStatus/StatusTimeline";
import { StatusActions } from "@/components/ClaimStatus/StatusActions";

const ClaimDetail = () => {
  const { id } = useParams();
  
  // Mock data for a specific claim - in a real app, this would come from an API
  const claim = {
    id: id || "PA-2023-003",
    patientName: "Michael Brown",
    patientDOB: "1975-08-12",
    memberId: "MEM12345678",
    service: "CT Scan - Chest",
    serviceCode: "71270",
    diagnosisCode: "J98.4",
    payor: "Medicare",
    dateSubmitted: "2023-05-16",
    status: "additional_info" as const,
    providerName: "Dr. Lisa Johnson",
    facilityName: "City Medical Imaging Center",
  };
  
  // Timeline events for this claim
  const timelineEvents = [
    {
      id: "1",
      status: "submitted" as const,
      title: "Prior Authorization Submitted",
      description: "Request submitted for CT Scan - Chest",
      date: "May 16, 2023",
      isCompleted: true,
      isCurrent: false,
    },
    {
      id: "2",
      status: "in_review" as const,
      title: "In Review",
      description: "Request is being reviewed by Medicare",
      date: "May 17, 2023",
      isCompleted: true,
      isCurrent: false,
    },
    {
      id: "3",
      status: "info_requested" as const,
      title: "Additional Information Requested",
      description: "Medicare has requested additional clinical documentation",
      date: "May 18, 2023",
      isCompleted: false,
      isCurrent: true,
    },
    {
      id: "4",
      status: "approved" as const,
      title: "Decision",
      description: "Final determination by Medicare",
      date: "Pending",
      isCompleted: false,
      isCurrent: false,
    },
  ];
  
  const getStatusBadge = (status: "pending" | "approved" | "denied" | "additional_info") => {
    const styles = {
      pending: "bg-amber-100 text-amber-800 hover:bg-amber-100",
      approved: "bg-green-100 text-green-800 hover:bg-green-100",
      denied: "bg-red-100 text-red-800 hover:bg-red-100",
      additional_info: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    };
    
    const labels = {
      pending: "Pending",
      approved: "Approved",
      denied: "Denied",
      additional_info: "Additional Information Required",
    };
    
    return (
      <Badge variant="outline" className={styles[status]}>
        {labels[status]}
      </Badge>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} />
      
      <main className="flex-1 py-8 px-6 md:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Prior Authorization Details</h1>
            <div className="flex flex-wrap items-center gap-2">
              <p className="text-gray-600">Reference ID: {claim.id}</p>
              {getStatusBadge(claim.status)}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Request Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Patient Name</p>
                    <p className="font-medium">{claim.patientName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date of Birth</p>
                    <p className="font-medium">{claim.patientDOB}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Member ID</p>
                    <p className="font-medium">{claim.memberId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Insurance</p>
                    <p className="font-medium">{claim.payor}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Service</p>
                    <p className="font-medium">{claim.service}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Service Code</p>
                    <p className="font-medium">{claim.serviceCode}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Diagnosis Code</p>
                    <p className="font-medium">{claim.diagnosisCode}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Date Submitted</p>
                    <p className="font-medium">{claim.dateSubmitted}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Provider</p>
                    <p className="font-medium">{claim.providerName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Facility</p>
                    <p className="font-medium">{claim.facilityName}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <StatusActions id={claim.id} status={claim.status} />
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Request Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <StatusTimeline events={timelineEvents} />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default ClaimDetail;
