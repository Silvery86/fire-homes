"use client"

import PropertyForm from "@/components/property-form"
import { Property } from "@/types/property"
import { PropertyDataSchema } from "@/validation/propertySchema"
import { z } from "zod"

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
    const handleSubmit = async (data: z.infer<typeof PropertyDataSchema>) => { }
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
                }}
            />
        </div>
    )
}