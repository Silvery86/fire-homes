"use client";

import { PropertyDataSchema } from "@/validation/propertySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

type PropertyFormProps = {
    handleSubmit: (data: z.infer<typeof PropertyDataSchema>) => void;
}

export default function PropertyForm({ handleSubmit }: PropertyFormProps) {
    const form = useForm<z.infer<typeof PropertyDataSchema>>({
        resolver: zodResolver(PropertyDataSchema),
        defaultValues: {
            address1: "",
            address2: "",
            city: "",
            postcode: "",
            price: 0,
            description: "",
            bedrooms: 1,
            bathrooms: 1,
            status: "draft",
        }
    });
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <fieldset>
                        <FormField control={form.control} name="status" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Status</FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger>
                                            <SelectValue/>
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
                    </fieldset>
                </div>
            </form>
        </Form>
    );
}