
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RecentClaimsTable } from "@/components/Dashboard/RecentClaimsTable";
import { Search } from "lucide-react";
import { useTranslation } from "@/contexts/TranslationContext";

const TrackClaims = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  // Mock data for claims
  const allClaims = [
    {
      id: "PA-2023-001",
      patientName: "John Smith",
      service: "MRI - Lumbar Spine",
      payor: "Blue Cross",
      dateSubmitted: "2023-05-14",
      status: "approved" as const,
    },
    {
      id: "PA-2023-002",
      patientName: "Emily Johnson",
      service: "Physical Therapy",
      payor: "Aetna",
      dateSubmitted: "2023-05-15",
      status: "pending" as const,
    },
    {
      id: "PA-2023-003",
      patientName: "Michael Brown",
      service: "CT Scan - Chest",
      payor: "Medicare",
      dateSubmitted: "2023-05-16",
      status: "additional_info" as const,
    },
    {
      id: "PA-2023-004",
      patientName: "Sarah Davis",
      service: "Outpatient Surgery",
      payor: "UnitedHealthcare",
      dateSubmitted: "2023-05-17",
      status: "denied" as const,
    },
    {
      id: "PA-2023-005",
      patientName: "Robert Wilson",
      service: "Specialist Consultation",
      payor: "Cigna",
      dateSubmitted: "2023-05-18",
      status: "pending" as const,
    },
    {
      id: "PA-2023-006",
      patientName: "Jennifer Lee",
      service: "Cardiac Rehabilitation",
      payor: "Humana",
      dateSubmitted: "2023-05-10",
      status: "approved" as const,
    },
    {
      id: "PA-2023-007",
      patientName: "David Martinez",
      service: "Sleep Study",
      payor: "Blue Cross",
      dateSubmitted: "2023-05-08",
      status: "approved" as const,
    },
    {
      id: "PA-2023-008",
      patientName: "Lisa Taylor",
      service: "Colonoscopy",
      payor: "Medicare",
      dateSubmitted: "2023-05-05",
      status: "denied" as const,
    },
  ];
  
  // Filter claims based on search query
  const filteredClaims = searchQuery
    ? allClaims.filter(
        (claim) =>
          claim.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          claim.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          claim.service.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : allClaims;
  
  // Get claims by status
  const pendingClaims = allClaims.filter(claim => claim.status === "pending" || claim.status === "additional_info");
  const approvedClaims = allClaims.filter(claim => claim.status === "approved");
  const deniedClaims = allClaims.filter(claim => claim.status === "denied");
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} />
      
      <main className="flex-1 py-8 px-6 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">{t("claims.title")}</h1>
              <p className="text-gray-600">{t("claims.subtitle")}</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button 
                className="bg-portal-purple hover:bg-portal-purple/90"
                onClick={() => navigate("/submit-claim")}
              >
                {t("claims.newAuth")}
              </Button>
            </div>
          </div>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{t("claims.search.title")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder={t("claims.search.placeholder")}
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="w-full md:w-64">
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder={t("claims.filter.payor")} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t("claims.all")}</SelectItem>
                      <SelectItem value="aetna">Aetna</SelectItem>
                      <SelectItem value="anthem">Anthem</SelectItem>
                      <SelectItem value="bcbs">Blue Cross Blue Shield</SelectItem>
                      <SelectItem value="cigna">Cigna</SelectItem>
                      <SelectItem value="uhc">United Healthcare</SelectItem>
                      <SelectItem value="medicare">Medicare</SelectItem>
                      <SelectItem value="medicaid">Medicaid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">{t("claims.tabs.all")} ({allClaims.length})</TabsTrigger>
              <TabsTrigger value="pending">{t("claims.tabs.pending")} ({pendingClaims.length})</TabsTrigger>
              <TabsTrigger value="approved">{t("claims.tabs.approved")} ({approvedClaims.length})</TabsTrigger>
              <TabsTrigger value="denied">{t("claims.tabs.denied")} ({deniedClaims.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <RecentClaimsTable claims={filteredClaims} />
            </TabsContent>
            
            <TabsContent value="pending">
              <RecentClaimsTable claims={pendingClaims} />
            </TabsContent>
            
            <TabsContent value="approved">
              <RecentClaimsTable claims={approvedClaims} />
            </TabsContent>
            
            <TabsContent value="denied">
              <RecentClaimsTable claims={deniedClaims} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default TrackClaims;
