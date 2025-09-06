"use server"

import { auth, firestore } from "@/firebase/server";
import { Property } from "@/types/property"
import { PropertyDataSchema } from "@/validation/propertySchema";

export const updateProperty = async (data : Property, authToken: string) => {
    const {id, ...propertyData } = data;
    const verifiedToken = await auth.verifyIdToken(authToken);

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

    await firestore.collection("properties").doc(id).update({
        ...propertyData,
        updatedAt: new Date().toISOString()
    });

     return {
        error: false,
        message: "Property updated successfully",
        propertyId: id
    }
}