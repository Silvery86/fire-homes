import PropertyStatusBadge from "@/components/property-status-badge";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { getPropertyById } from "@/data/properties";
import { ArrowLeftIcon, BathIcon, BedIcon } from "lucide-react";
import numeral from "numeral";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Autoplay from 'embla-carousel-autoplay'
import PropertyCarousel from "@/components/property-carousel";

export default async function PropertyPage({ params }:
    { params: Promise<any> }
) {
    const paramsValue = await params;
    const property = await getPropertyById(paramsValue.propertyId);

    const addressLines = [property?.address1, property?.address2, property?.city].filter(Boolean);
    console.log(property);
    return (
        <section className="grid grid-cols-[1fr_500px]">
            <div>
                {!!property?.images &&
                    <PropertyCarousel images={property.images} />
                }
                <div className="property-description max-w-screen-md mx-auto py-10 px-4">
                    <Button variant="outline">
                        <ArrowLeftIcon />
                    </Button>
                    <ReactMarkdown>
                        {property?.description}
                    </ReactMarkdown>
                </div>
            </div>
            <div className="bg-primary/30 p-10 h-screen sticky top-0 grid place-items-center font-bold text-2xl">
                <div className="flex flex-col gap-10 w-full">
                    <PropertyStatusBadge className="mr-auto text-base" status={property?.status || "draft"} />
                    <h1 className="text-4xl font-semibold">
                        {addressLines.map((addressLine, index) => (
                            <div key={index}>
                                {addressLine}
                                {index < addressLines.length - 1 && ","}
                            </div>
                        ))}
                    </h1>
                    <h2>
                        {numeral(property?.price).format("0,0")}
                    </h2>
                    <div className="flex gap-10">
                        <div className="flex gap-2">
                            <BedIcon /> {property?.bedrooms} bedrooms
                        </div>
                        <div className="flex gap-2">
                            <BathIcon /> {property?.bathrooms} bathrooms
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}