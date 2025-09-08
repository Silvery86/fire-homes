"use client"

import PropertyForm from "@/components/property-form"
import { auth } from "@/firebase/client"
import { Property } from "@/types/property"
import { PropertyDataSchema } from "@/validation/propertySchema"
import { z } from "zod"
import { updateProperty } from "./action"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type Props = Property

export default function EditPropertyForm({
    id,
    address1,
    address2,
    city,
    postcode,
    description,
    price,
    bedrooms,
    bathrooms,
    status,
}: Props) {
    const router = useRouter();
    const handleSubmit = async (data: z.infer<typeof PropertyDataSchema>) => {
         const token = await auth.currentUser?.getIdToken();
        if (!token) {
            console.error("User is not authenticated");
            return;
        }
        const res = await updateProperty({...data, id}, token)
        if (res.error) {
            toast.error("Error", { description: res.message });
            return;
        }
        toast.success("Success", { description: res.message });
        router.push("/admin-dashboard");
     }
    if (description === undefined) {
        description = ""
    }
    return (
        <div>
            <PropertyForm
                handleSubmit={handleSubmit}
                submitButtonLabel="Save Changes"
                defaultValues={{
                    address1,
                    address2,
                    city,
                    postcode,
                    description,
                    price,
                    bedrooms,
                    bathrooms,
                    status,
                    images: [],
                }}
            />
        </div>
    )
}