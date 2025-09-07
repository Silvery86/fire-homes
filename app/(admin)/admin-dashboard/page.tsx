import Breadcrumbs from "@/components/breadcrmbs";
import PropertiesTable from "@/components/properties-table";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import Link from "next/link";


export default async function AdminDashboard({
    searchParams
}: {
    searchParams?: Promise<any>;
}
) {
    const searchParamsValue = await searchParams;
    return (
        <div className="w-full">
           <h1 className="text-4xl font-bold mt-6">Admin Dashboard</h1>
           <Button className="mt-4" variant="default">
            <Link href="/admin-dashboard/new" className="inline-flex pl-2 gap-2 items-center">
            <PlusCircleIcon /><span className="uppercase">New Property</span>
            </Link>
           </Button>
           <PropertiesTable 
                page = {searchParamsValue?.page ? parseInt(searchParamsValue.page) : 1}
           />
        </div>
    );
}