import { getProperties } from "@/data/properties";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./ui/table";
import Link from "next/link";
import { Button } from "./ui/button";
import { EyeIcon, PencilIcon } from "lucide-react";
import numeral from "numeral";
import PropertyStatusBadge from "./property-status-badge";

export default async function PropertiesTable(
    {
        page = 1
    }:
    {
        page?: number;
    }
) {
    const { data, totalPages } = await getProperties({
        pagination: {
            page,
            pageSize: 2
        }
    });
    console.log({data, totalPages});
    return (
        <>
            {!data && <div className="w-full text-center text-primary py-20 font-bold text-3xl">No found data</div>}
            {data &&
                <Table className="mt-6">
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                Address
                            </TableHead>
                            <TableHead>
                                Listing Price
                            </TableHead>
                            <TableHead>
                                Status
                            </TableHead>
                            <TableHead>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.map((property) => { 
                            const address = [ property.address1, property.address2, property.city, property.postcode ]
                            .filter((addressLine) => !!addressLine).join(", ");
                            return (
                            <TableRow key={property.id}>
                                <TableCell className="font-medium">{address}</TableCell>
                                <TableCell>{numeral(property.price).format("0,0[.]00 $")}</TableCell>
                                <TableCell><PropertyStatusBadge status={property.status} /></TableCell>
                                <TableCell className="flex gap-2 justify-end">
                                    <Button asChild variant="outline" size="icon" className="p-0">
                                        <Link href={`/property/${property.id}`}>
                                        <EyeIcon />
                                        </Link>
                                    </Button>
                                    <Button asChild variant="outline" size="icon" className="p-0">
                                        <Link href={`/admin-dashboard/edit/${property.id}`}>
                                        <PencilIcon />
                                        </Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )})}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">               
                                     {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (                                    
                                         <Button 
                                         disabled={pageNumber === page}
                                         key={pageNumber} 
                                         asChild={pageNumber !== page} 
                                         variant="outline" 
                                         size="sm" 
                                         className="mx-1"
                                         >
                                        <Link href={`/admin-dashboard?page=${pageNumber}`}>{pageNumber}
                                        </Link>
                                        </Button>                                   
                                ))}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>}
        </>
    );
}