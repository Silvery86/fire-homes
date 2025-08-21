import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NewPropertyForm from "./new-property-form";

export default function NewPropertyPage() {
    return (
        <Card className="w-full mt-5">
            <CardHeader>
                <CardTitle>
                    New Property
                </CardTitle>
            </CardHeader>
            <CardContent>
                <NewPropertyForm />
            </CardContent>
        </Card>
    );
}