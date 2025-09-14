"use client";

import { PropertySchema } from "@/validation/propertySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Property } from "@/types/property";
import MultiImageUploader, { ImageUpload } from "./multi-image-uploader";

type PropertyFormProps = {
    submitButtonLabel: React.ReactNode
    handleSubmit: (data: z.infer<typeof PropertySchema>) => void;
    defaultValues?: z.infer<typeof PropertySchema>;
}

export default function PropertyForm({
    handleSubmit,
    submitButtonLabel,
    defaultValues
}: PropertyFormProps) {
    const combinedDefaultValues: z.infer<typeof PropertySchema> = {
        ...{
            address1: "",
            address2: "",
            city: "",
            postcode: "",
            price: 1,
            description: "",
            bedrooms: 1,
            bathrooms: 1,
            status: "draft",
            images: [],
        },
        ...defaultValues
    }
    const form = useForm<z.infer<typeof PropertySchema>>({
        resolver: zodResolver(PropertySchema) as any,
        defaultValues: combinedDefaultValues,
    });
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <fieldset className="flex flex-col gap-4" disabled={form.formState.isSubmitting}>
                        <FormField control={form.control} name="status" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="draft">Draft</SelectItem>
                                                <SelectItem value="for-sale">For Sale</SelectItem>
                                                <SelectItem value="withdrawn">Withdrawn</SelectItem>
                                                <SelectItem value="sold">Sold</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="address1" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address Line 1</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="address2" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address Line 2</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="city" render={({ field }) => (
                            <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="postcode" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Post Code</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </fieldset>
                    <fieldset className="flex flex-col gap-4" disabled={form.formState.isSubmitting}>
                        <FormField control={form.control} name="price" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input {...field} type="number" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="bedrooms" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bedrooms</FormLabel>
                                <FormControl>
                                    <Input {...field} type="number" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="bathrooms" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bathrooms</FormLabel>
                                <FormControl>
                                    <Input {...field} type="number" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea {...field} rows={7} className="resize-none" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </fieldset>
                </div>
                <FormField control={form.control} name="images" render={({ field }) => (
                    <FormItem>
                        <FormLabel>Upload Images</FormLabel>
                        <FormControl>
                            <MultiImageUploader onImagesChange={(images: ImageUpload[]) => {
                                form.setValue("images", images);
                            }}
                                images={field.value}
                                urlFormatter={(image) => {
                                    if (image.file) {
                                        return image.url;
                                    }
                                    return `https://firebasestorage.googleapis.com/v0/b/fire-homes-47284.firebasestorage.app/o/${encodeURIComponent(image.url)}?alt=media`;
                                }}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <Button
                    type="submit"
                    className="max-w-md mx-auto mt-2 w-full flex gap-2"
                    disabled={form.formState.isSubmitting}
                >
                    {submitButtonLabel}
                </Button>
            </form>
        </Form>
    );
}