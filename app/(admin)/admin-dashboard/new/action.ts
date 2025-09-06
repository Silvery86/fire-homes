"use server";

import { auth, firestore } from "@/firebase/server";
import { PropertyDataSchema } from "@/validation/propertySchema";

export const createProperty = async (
    data:
    {
        address1: string;
        address2?: string;
        city: string;
        postcode: string;
        price: number;
        bedrooms: number;
        bathrooms: number;
        description: string;
        status: "for-sale" | "sold" | "draft" | "withdrawn";
       
    }, authToken: string
) => {
    const verifiedToken = await auth.verifyIdToken(authToken);

    if (!verifiedToken.admin) {
        return {
            error: true,
            message: "Unauthorized"
        }
    }
    const validation = PropertyDataSchema.safeParse(data);
    if (!validation.success) {
        return {
            error: true,
            message: validation.error.issues[0]?.message || "Invalid data"

        }
    }

    const property = await firestore.collection("properties").add({
        ...data,
        createdBy: verifiedToken.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    });

    return {
        error: false,
        message: "Property created successfully",
        propertyId: property.id
    }

}