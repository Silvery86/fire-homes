"use client";

import PropertyForm from "@/components/property-form";
import { useAuth } from "@/context/auth";
import { PropertyDataSchema } from "@/validation/propertySchema";
import { PlusCircleIcon } from "lucide-react";
import z from "zod";
import { saveNewProperty } from "./action";

export default function NewPropertyForm() {
    const auth = useAuth();

    const handleSubmit = async (data: z.infer<typeof PropertyDataSchema>) => {
        const token = await auth.currentUser?.getIdToken();
        if (!token) {
            console.error("User is not authenticated");
            return;
        }

        const response = await saveNewProperty({ ...data, token });

        console.log("Form submitted with data:", response);
    }

    return (
        <div>
            <PropertyForm handleSubmit={handleSubmit} submitButtonLabel={
                <>
                    <PlusCircleIcon /> Create Property
                </>
            } />
        </div>
    )
}