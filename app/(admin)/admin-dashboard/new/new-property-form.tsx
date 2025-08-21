"use client";

import PropertyForm from "@/components/property-form";
import { PropertyDataSchema } from "@/validation/propertySchema";
import z from "zod";

export default function NewPropertyForm() {
    const handleSubmit = async (data: z.infer<typeof PropertyDataSchema>) => {

    }

    return (
        <div>
            <PropertyForm handleSubmit={handleSubmit}/>
        </div>
    )
}