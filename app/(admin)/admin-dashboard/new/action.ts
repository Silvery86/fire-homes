"use server";

import { auth, firestore } from "@/firebase/server";
import { PropertyDataSchema } from "@/validation/propertySchema";
import z, { property, string } from "zod";

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

export const savePropertyImage = async ({ propertyId, images }: {
    propertyId: string;
    images: string[]
}
    , authToken: string) => {
    const verifiedToken = await auth.verifyIdToken(authToken);

    if (!verifiedToken.admin) {
        return {
            error: true,
            message: "Unauthorized"
        }
    }

    const schema = z.object({
        propertyId: z.string(),
        images: z.array(z.string())
    })

    const validation = schema.safeParse({ propertyId, images });
    if (!validation.success) {
        return {
            error: true,
            message: validation.error.issues[0]?.message || "Invalid data"
        }
    }

    await firestore.collection("properties").doc(propertyId).update({
        images,
    });
}

