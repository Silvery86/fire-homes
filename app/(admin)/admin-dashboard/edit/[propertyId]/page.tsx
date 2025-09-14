import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPropertyById } from "@/data/properties";
import EditPropertyForm from "./edit-property-form";

export default async function EdirtPropertyPage({params} :
    { params: Promise<any> }
) {
    const paramsValue = await params;
    const property = await getPropertyById(paramsValue.propertyId);
    if (!property) {
        return (
            <Card className="w-full mt-5">
                <CardHeader>
                    <CardTitle>
                        Property not found
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>The property could not be found.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full mt-5">
            <CardHeader>
                <CardTitle>
                    Edit Property
                </CardTitle>
            </CardHeader>
            <CardContent>
                <EditPropertyForm 
                id = {property.id}
                address1 = {property.address1}
                address2 = {property.address2}
                city = {property.city}
                postcode = {property.postcode}
                description = {property.description} 
                price = {property.price}
                bedrooms = {property.bedrooms}
                bathrooms = {property.bathrooms}
                status = {property.status}
                images = {property.images || []}
                />
            </CardContent>
        </Card>
    );
}