import { firestore, getTotalPages } from "@/firebase/server";
import { Property } from "@/types/property";
import { PropertyStatus } from "@/types/propertyStatus";
import "server-only";
import { da } from "zod/v4/locales";

type GetPropertiesOptions = {
    filter?: {
        minPrice?: number | null;
        maxPrice?: number | null;
        minBedrooms?: number | null;
        status?: PropertyStatus[] | null;
    },
    pagination?: {
        pageSize?: number;
        page?: number;
    },
}

export const getProperties = async (options?: GetPropertiesOptions) => {
    const page = options?.pagination?.page || 1;
    const pageSize = options?.pagination?.pageSize || 10;
    const { minPrice, maxPrice, minBedrooms, status } = options?.filter || {};

    let propertiesQuery = firestore.collection("properties").orderBy("updatedAt", "desc");

    if (minPrice !== null && minPrice !== undefined) {
        propertiesQuery = propertiesQuery.where("price", ">=", minPrice);
    }
    if (maxPrice !== null && maxPrice !== undefined) {
        propertiesQuery = propertiesQuery.where("price", "<=", maxPrice);
    }
    if (minBedrooms !== null && minBedrooms !== undefined) {
        propertiesQuery = propertiesQuery.where("bedrooms", ">=", minBedrooms);
    }
    if (status && status.length > 0) {
        propertiesQuery = propertiesQuery.where("status", "in", status);
    }

    const totalPages = await getTotalPages(propertiesQuery, pageSize);

    const propertiesSnapshot = await propertiesQuery
        .limit(pageSize)
        .offset((page - 1) * pageSize)
        .get();

    const properties = propertiesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as Property));

    return { data: properties, totalPages };
}