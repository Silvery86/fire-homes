"use client";

import { useMemo } from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";

type Props = {
  images: string[];
};

export default function PropertyCarousel({ images }: Props) {
  const autoplay = useMemo(() => Autoplay({ delay: 2000 }), []);
  return (
    <Carousel opts={{ loop: true, duration: 50 }} plugins={[autoplay]} className="w-full">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="relative h-[80vh] min-h-80">
              <Image
                src={`https://firebasestorage.googleapis.com/v0/b/fire-homes-47284.firebasestorage.app/o/${encodeURIComponent(image)}?alt=media`}
                alt={`Property image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {images.length > 1 && (
        <>
          <CarouselPrevious className="translate-x-24" />
          <CarouselNext className="-translate-x-24" />
        </>
      )}
    </Carousel>
  );
}
