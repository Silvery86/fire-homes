"use client"

import PropertyForm from "@/components/property-form"
import { auth, storage } from "@/firebase/client"
import { Property } from "@/types/property"
import { PropertySchema } from "@/validation/propertySchema"
import { z } from "zod"
import { updateProperty } from "./action"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { deleteObject, ref, uploadBytesResumable, UploadTask } from "firebase/storage"
import { savePropertyImage } from "../../action"

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
    images = []
}: Props) {
    const router = useRouter();
    const handleSubmit = async (data: z.infer<typeof PropertySchema>) => {
        const token = await auth.currentUser?.getIdToken();
        if (!token) {
            console.error("User is not authenticated");
            return;
        }
        const {images : newImages, ...rest} = data;
        const res = await updateProperty({...rest, id}, token)
        if (res.error) {
            toast.error("Error", { description: res.message });
            return;
        }

        const storageTasks: (UploadTask | Promise<void>)[] = [];
        const imagesToDelete = images.filter((image) => !newImages.find((newImage) => newImage.id === image));

        imagesToDelete.forEach((image) => {
            storageTasks.push(deleteObject(ref(storage, image)));
        })

        const paths: string[] = [];
        newImages.forEach((image, index) => {
            if(image.file){
                 const path = `properties/${id}/${Date.now()}-${index}-${image.file.name}`;
                paths.push(path);
                const storageRef = ref(storage, path);
                storageTasks.push(uploadBytesResumable(storageRef, image.file));
            }else {
                paths.push(image.id);
            }
        })
        await Promise.all(storageTasks);
        await savePropertyImage({ propertyId: id, images: paths }, token);

        toast.success("Success", { description: res.message });
        router.push("/admin-dashboard");
     }
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
                    images : images.map(image => ({
                        id: image,
                        url: image,
                    })),
                }}
            />
        </div>
    )
}