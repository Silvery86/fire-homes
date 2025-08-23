"use server";

import { auth, firestore } from "@/firebase/server";
import { PropertyDataSchema } from "@/validation/propertySchema";

export const saveNewProperty = async (data:
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
        token: string;
    }
) => {
    const { token, ...propertyData } = data;
    const verifiedToken = await auth.verifyIdToken(data.token);

    if (!verifiedToken.admin) {
        return {
            error: true,
            message: "Unauthorized"
        }
    }
    const validation = PropertyDataSchema.safeParse(propertyData);
    if (!validation.success) {
        return {
            error: true,
            message: validation.error.issues[0]?.message || "Invalid data"

        }
    }

    const property = await firestore.collection("properties").add({
        ...propertyData,
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