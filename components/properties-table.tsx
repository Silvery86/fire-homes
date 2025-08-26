import { getProperties } from "@/data/properties";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

export default async function PropertiesTable() {
    const { data } = await getProperties();
    console.log(data);
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
                                <TableCell>${property.price.toLocaleString()}</TableCell>
                                <TableCell>{property.status}</TableCell>
                                <TableCell className="text-right text-primary font-bold hover:underline">View / Edit</TableCell>
                            </TableRow>
                        )})}
                    </TableBody>
                </Table>}
        </>
    );
}