import { PropertyStatus } from "@/types/propertyStatus";
import { Badge } from "./ui/badge";

const statusLabel = {
    "for-sale" : "For Sale",
    "withdrawn" : "Withdrawn",
    "sold" : "Sold",
    "draft" : "Draft"
}

const variant : {[key:string] : "primary" | "success" | "destructive" | "outline" } = {
    "for-sale" : "primary",
    "sold" : "success",
    "withdrawn" : "destructive",
    "draft" : "outline"
}

export default function PropertyStatusBadge({ 
    status,
    className 
}: { 
    status: PropertyStatus,
    className?: string
 }) {
    const label = statusLabel[status] || "Unknown";
    return <Badge variant={variant[status] || "default"} className={className}>
        {label}
        </Badge>
}