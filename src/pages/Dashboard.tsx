
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricsCard } from "@/components/Dashboard/MetricsCard";
import { StatusCard } from "@/components/Dashboard/StatusCard";
import { RecentClaimsTable } from "@/components/Dashboard/RecentClaimsTable";
import { CalendarDays, Clock, CheckCircle, AlertCircle } from "lucide-react";

const Dashboard = () => {
  // Mock data for the dashboard
  const metrics = {
    pendingCount: 8,
    avgResponseTime: "2.3 days",
    approvalRate: "76%",
    daysUntilExpiration: 30,
  };
  
  const statusData = {
    title: "Prior Authorization Status (Last 30 Days)",
    pending: 8,
    approved: 24,
    denied: 3,
    total: 35,
  };
  
  const recentClaims = [
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
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} />
      
      <main className="flex-1 py-8 px-6 md:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-1">Dashboard</h1>
              <p className="text-gray-600">Track and manage your prior authorization requests</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Link to="/submit-claim">
                <Button className="bg-portal-purple hover:bg-portal-purple/90">
                  New Prior Authorization
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricsCard
              title="Pending Requests"
              value={metrics.pendingCount}
              icon={<Clock className="h-5 w-5" />}
              trend={{ value: 12, isPositive: false }}
            />
            <MetricsCard
              title="Average Response Time"
              value={metrics.avgResponseTime}
              icon={<CalendarDays className="h-5 w-5" />}
              trend={{ value: 8, isPositive: true }}
            />
            <MetricsCard
              title="Approval Rate"
              value={metrics.approvalRate}
              icon={<CheckCircle className="h-5 w-5" />}
              trend={{ value: 5, isPositive: true }}
            />
            <MetricsCard
              title="Days Until Renewal"
              value={metrics.daysUntilExpiration}
              icon={<AlertCircle className="h-5 w-5" />}
              description="Platform subscription renewal"
            />
          </div>
          
          {/* Status Card and Recent Table */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <StatusCard
                title={statusData.title}
                pending={statusData.pending}
                approved={statusData.approved}
                denied={statusData.denied}
                total={statusData.total}
              />
            </div>
            
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Recent Prior Authorization Requests</CardTitle>
                <CardDescription>Monitor your most recent submissions</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentClaimsTable claims={recentClaims} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
