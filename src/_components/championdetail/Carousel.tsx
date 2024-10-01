"use client";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skin } from "@/types/Champion";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

const SkinCarousel = ({ championName, skins }: { championName: string; skins: Skin[] }) => {
    return (
        <Carousel
            className="w-full max-w-xs"
            plugins={[
                Autoplay({
                    delay: 3000,
                }),
            ]}
        >
            <CarouselContent>
                {skins.map((skin, index) => (
                    <CarouselItem key={`${skin.id}-${index}`}>
                        <div className="p-1">
                            <Card className="bg-transparent border-0">
                                <CardContent className=" flex flex-col aspect-square items-center justify-center p-6 gap-[10px]">
                                    <Image
                                        src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_${skin.num}.jpg`}
                                        alt={`${skin.name}`}
                                        width={300}
                                        height={300}
                                    />
                                    <p className="text-white">{skin.name == "default" ? "기본스킨" : skin.name}</p>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="bg-transparent" />
            <CarouselNext className="bg-transparent" />
        </Carousel>
    );
};

export default SkinCarousel;
