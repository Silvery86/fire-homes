"use client";

import PropertyForm from "@/components/property-form";
import { useAuth } from "@/context/auth";
import { PropertySchema } from "@/validation/propertySchema";
import { PlusCircleIcon } from "lucide-react";
import z from "zod";
import { createProperty } from "./action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ref, uploadBytesResumable, UploadTask } from "firebase/storage";
import { storage } from "@/firebase/client";
import { savePropertyImage } from "../action";

export default function NewPropertyForm() {
    const auth = useAuth();
    const router = useRouter();

    const handleSubmit = async (data: z.infer<typeof PropertySchema>) => {
        const token = await auth.currentUser?.getIdToken();
        if (!token ) {
            console.error("User is not authenticated");
            return;
        }

        const {images, ...rest} = data;
   
        const response = await createProperty(rest, token);

        if (response.error || !response.propertyId) {
            toast.error("Error", { description: response.message });
            return;
        }

        const uploadTasks : UploadTask[] = [];
        const paths : string[] = [];
        images.forEach((image, index) => {
            if (image.file) {
                const path = `properties/${response.propertyId}/${Date.now()}-${index}-${image.file.name}`;
                paths.push(path);
                const storageRef = ref(storage, path);
                uploadTasks.push(uploadBytesResumable(storageRef, image.file));
            }
        });

        await Promise.all(uploadTasks);
        await savePropertyImage ({ propertyId: response.propertyId, images: paths }, token);

        toast.success("Success", { description: response.message });
        router.push("/admin-dashboard"); 
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