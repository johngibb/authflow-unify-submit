
import { cn } from "@/lib/utils";
import { CheckCircle, Clock, XCircle, AlertCircle } from "lucide-react";

interface TimelineEvent {
  id: string;
  status: "submitted" | "in_review" | "approved" | "denied" | "info_requested";
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

interface StatusTimelineProps {
  events: TimelineEvent[];
}

export function StatusTimeline({ events }: StatusTimelineProps) {
  const getStatusIcon = (status: TimelineEvent["status"], isCompleted: boolean, isCurrent: boolean) => {
    if (status === "submitted" && isCompleted) return <CheckCircle className="h-6 w-6 text-green-500" />;
    if (status === "in_review" && isCurrent) return <Clock className="h-6 w-6 text-amber-500" />;
    if (status === "approved" && isCompleted) return <CheckCircle className="h-6 w-6 text-green-500" />;
    if (status === "denied" && isCompleted) return <XCircle className="h-6 w-6 text-red-500" />;
    if (status === "info_requested" && isCurrent) return <AlertCircle className="h-6 w-6 text-blue-500" />;
    return <Clock className="h-6 w-6 text-gray-300" />;
  };
  
  return (
    <div className="space-y-3">
      {events.map((event, index) => (
        <div key={event.id} className="flex">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center w-10 h-10 rounded-full z-10 relative bg-white">
              {getStatusIcon(event.status, event.isCompleted, event.isCurrent)}
            </div>
            {index < events.length - 1 && (
              <div
                className={cn(
                  "w-0.5 h-full",
                  event.isCompleted ? "bg-green-500" : "bg-gray-200"
                )}
              ></div>
            )}
          </div>
          <div
            className={cn(
              "ml-4 pb-8",
              index === events.length - 1 ? "pb-0" : ""
            )}
          >
            <div className="flex items-baseline">
              <h3
                className={cn(
                  "text-base font-medium",
                  event.isCurrent
                    ? "text-portal-purple"
                    : event.isCompleted
                    ? "text-gray-900"
                    : "text-gray-400"
                )}
              >
                {event.title}
              </h3>
              <span
                className={cn(
                  "ml-3 text-xs",
                  event.isCurrent
                    ? "text-portal-purple"
                    : event.isCompleted
                    ? "text-gray-700"
                    : "text-gray-400"
                )}
              >
                {event.date}
              </span>
            </div>
            <p
              className={cn(
                "text-sm mt-1",
                event.isCurrent
                  ? "text-gray-700"
                  : event.isCompleted
                  ? "text-gray-600"
                  : "text-gray-400"
              )}
            >
              {event.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
