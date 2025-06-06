
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "@/contexts/TranslationContext";

interface Claim {
  id: string;
  patientName: string;
  service: string;
  payor: string;
  dateSubmitted: string;
  status: "pending" | "approved" | "denied" | "additional_info";
}

interface RecentClaimsTableProps {
  claims: Claim[];
}

export function RecentClaimsTable({ claims }: RecentClaimsTableProps) {
  const { t } = useTranslation();
  
  const getStatusBadge = (status: Claim["status"]) => {
    const styles = {
      pending: "bg-amber-100 text-amber-800 hover:bg-amber-100",
      approved: "bg-green-100 text-green-800 hover:bg-green-100",
      denied: "bg-red-100 text-red-800 hover:bg-red-100",
      additional_info: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    };
    
    const labels = {
      pending: t("status.pending"),
      approved: t("status.approved"),
      denied: t("status.denied"),
      additional_info: t("status.info_required"),
    };
    
    return (
      <Badge variant="outline" className={styles[status]}>
        {labels[status]}
      </Badge>
    );
  };
  
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("table.patient")}</TableHead>
            <TableHead>{t("table.service")}</TableHead>
            <TableHead>{t("table.payor")}</TableHead>
            <TableHead>{t("table.date")}</TableHead>
            <TableHead>{t("table.status")}</TableHead>
            <TableHead className="text-right">{t("table.action")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {claims.map((claim) => (
            <TableRow key={claim.id}>
              <TableCell>{claim.patientName}</TableCell>
              <TableCell>{claim.service}</TableCell>
              <TableCell>{claim.payor}</TableCell>
              <TableCell>{claim.dateSubmitted}</TableCell>
              <TableCell>{getStatusBadge(claim.status)}</TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="hover:bg-gray-100"
                >
                  <Link to={`/track-claims/${claim.id}`}>{t("table.view")}</Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
