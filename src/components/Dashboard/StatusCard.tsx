
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StatusCardProps {
  title: string;
  pending: number;
  approved: number;
  denied: number;
  total: number;
}

export function StatusCard({ title, pending, approved, denied, total }: StatusCardProps) {
  const pendingPercentage = Math.round((pending / total) * 100) || 0;
  const approvedPercentage = Math.round((approved / total) * 100) || 0;
  const deniedPercentage = Math.round((denied / total) * 100) || 0;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Pending</span>
            <span className="font-medium">{pending} ({pendingPercentage}%)</span>
          </div>
          <Progress value={pendingPercentage} className="h-2 bg-gray-100" indicatorClassName="bg-amber-400" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Approved</span>
            <span className="font-medium">{approved} ({approvedPercentage}%)</span>
          </div>
          <Progress value={approvedPercentage} className="h-2 bg-gray-100" indicatorClassName="bg-green-500" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-muted-foreground">Denied</span>
            <span className="font-medium">{denied} ({deniedPercentage}%)</span>
          </div>
          <Progress value={deniedPercentage} className="h-2 bg-gray-100" indicatorClassName="bg-red-500" />
        </div>
      </CardContent>
    </Card>
  );
}
