
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Upload, Phone, MessageCircle, Printer, Copy } from "lucide-react";

interface ClaimDataProps {
  id: string;
  status: "pending" | "approved" | "denied" | "additional_info";
}

export function StatusActions({ id, status }: ClaimDataProps) {
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleMessageSubmit = () => {
    if (message.trim() === "") return;
    
    toast({
      title: "Message sent",
      description: "Your message has been sent to the insurance representative",
    });
    
    setMessage("");
    setIsDialogOpen(false);
  };
  
  const copyReferenceNumber = () => {
    navigator.clipboard.writeText(id);
    toast({
      title: "Reference ID Copied",
      description: `Claim reference ID ${id} copied to clipboard`,
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {status === "additional_info" && (
          <Button className="flex items-center gap-2 bg-portal-purple hover:bg-portal-purple/90">
            <Upload className="h-4 w-4" />
            <span>Upload Documents</span>
          </Button>
        )}
        
        <Button variant="outline" className="flex items-center gap-2">
          <Phone className="h-4 w-4" />
          <span>Call Representative</span>
        </Button>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span>Send Message</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send Message to Payor</DialogTitle>
              <DialogDescription>
                Send a message directly to the insurance representative regarding this claim.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <Textarea
                placeholder="Type your message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[120px]"
              />
              <Button 
                className="w-full bg-portal-purple hover:bg-portal-purple/90"
                disabled={message.trim() === ""}
                onClick={handleMessageSubmit}
              >
                Send Message
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" className="flex items-center gap-2">
          <Printer className="h-4 w-4" />
          <span>Print Details</span>
        </Button>
        
        <Button variant="outline" size="sm" className="flex items-center gap-2" onClick={copyReferenceNumber}>
          <Copy className="h-4 w-4" />
          <span>Copy Ref ID</span>
        </Button>
      </div>
    </div>
  );
}
