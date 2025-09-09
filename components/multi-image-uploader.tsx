"use client"

import { useRef } from "react";
import { Button } from "./ui/button";
import { DragDropContext, Draggable, Droppable, DropResult } from "@hello-pangea/dnd";
import Image from "next/image";
import { Badge } from "./ui/badge";
import { HandIcon, MoveIcon, XIcon } from "lucide-react";

export type ImageUpload = {
    id: string;
    url: string;
    file?: File;
}


type Props = {
    images?: ImageUpload[];
    onImagesChange: (images: ImageUpload[]) => void;
}

export default function MultiImageUploader(
    {
        images = [],
        onImagesChange
    }
        : Props
) {
    const uploadInputRef = useRef<HTMLInputElement | null>(null);
    console.log({ images });
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        const newImages = files.map((file, index) => {
            return {
                id: `${Date.now()}-${index}-${file.name}`,
                url: URL.createObjectURL(file),
                file
            }
        })
        onImagesChange([...images, ...newImages]);
    }
    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;
        const reorderedImages = Array.from(images);
        const [removed] = reorderedImages.splice(result.source.index, 1);
        reorderedImages.splice(result.destination.index, 0, removed);
        onImagesChange(reorderedImages);
    }
    const handleDeleteImage = (id: string) => {
        const filteredImages = images.filter(image => image.id !== id);
        onImagesChange(filteredImages);
    }
    return (<div className="w-full max-w-3xl mx-auto p-4">
        <input hidden ref={uploadInputRef} type="file" multiple accept="image/*" onChange={handleFileChange} />
        <Button className="w-full" variant="outline" type="button" onClick={() => uploadInputRef.current?.click()}>
            Upload Images
        </Button>
        <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="property-images" direction="vertical">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} >
                        {images.map((image, index) => (
                            <Draggable key={image.id} draggableId={image.id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="relative p-2"
                                    >
                                        <div className="bg-gray-200 rounded-2xl flex items-center gap-2">
                                            <div className="size-40 relative rounded-2xl overflow-hidden">
                                                <Image src={image.url} alt={`Property Image ${index + 1}`} className="object-cover" fill />
                                            </div>
                                            <div className="flex-grow">
                                                <p className="text-md font-medium">{`Image ${index + 1}`}</p>
                                                {
                                                    index === 0 && (
                                                        <Badge variant="primary">
                                                            Feature Image
                                                        </Badge>
                                                    )
                                                }
                                            </div>
                                            <div className="flex items-center pr-4 space-x-2">
                                                <button className="cursor-pointer p-2" onClick={() => {handleDeleteImage(image.id)}}>
                                                    <XIcon className="text-destructive" />
                                                </button>
                                                <div>
                                                    <MoveIcon />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    </div>)
}