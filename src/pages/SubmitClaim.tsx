
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { PatientSection } from "@/components/PriorAuthForm/PatientSection";
import { ServiceSection } from "@/components/PriorAuthForm/ServiceSection";
import { ProviderSection } from "@/components/PriorAuthForm/ProviderSection";
import { DocumentSection } from "@/components/PriorAuthForm/DocumentSection";
import { useToast } from "@/hooks/use-toast";

const SubmitClaim = () => {
  const [formData, setFormData] = useState({
    patient: {},
    service: {},
    provider: {},
    documents: {},
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const updateFormData = (section: string, data: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: data,
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Prior Authorization Submitted",
        description: "Your request has been submitted successfully. You can track its status on the dashboard.",
      });
      navigate("/dashboard");
    }, 2000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} />
      
      <main className="flex-1 py-8 px-6 md:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">Submit Prior Authorization</h1>
            <p className="text-gray-600">Complete the form below to submit a new prior authorization request</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <PatientSection onDataChange={(data) => updateFormData("patient", data)} />
            <ServiceSection onDataChange={(data) => updateFormData("service", data)} />
            <ProviderSection onDataChange={(data) => updateFormData("provider", data)} />
            <DocumentSection onDataChange={(data) => updateFormData("documents", data)} />
            
            <div className="flex justify-end gap-4 mt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-portal-purple hover:bg-portal-purple/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Prior Authorization"}
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default SubmitClaim;
