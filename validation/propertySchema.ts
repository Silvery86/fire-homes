import z from "zod";

export const PropertyDataSchema = z.object({
    address1: z.string().min(1, "Address line 1 is required"),
    address2: z.string().optional(),
    city: z.string().min(3, "City must be at least 3 characters long"),
    postcode: z.string().refine((postcode) => {
        const regex = /^[A-Z0-9]{3,10}$/i;
        return regex.test(postcode);
    }, "Postcode must be between 3 and 10 alphanumeric characters"),
    price: z.number().positive("Price must be a positive number"),
    description: z.string().min(40, "Description must be at least 40 characters long"),
    bedrooms: z.number().min(1, "At least 1 bedroom is required"),
    bathrooms: z.number().min(1, "At least 1 bathroom is required"),
    status: z.enum(["draft", "for-sale", "withdrawn", "sold"]),
})