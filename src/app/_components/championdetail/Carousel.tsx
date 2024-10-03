"use client";

import { CHAMPION_SPLASH_IMG_URL } from "@/app/constants/ddragonURL";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Skin } from "@/types/Champion";
import Autoplay from "embla-carousel-autoplay";

const SkinCarousel = ({ championName, skins }: { championName: string; skins: Skin[] }) => {
    return (
        <Carousel
            className="w-[1300px]"
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
                                <CardContent className=" flex flex-col  items-center justify-center p-6 gap-[10px]">
                                    <img
                                        src={`${CHAMPION_SPLASH_IMG_URL}/${championName}_${skin.num}.jpg`}
                                        alt={`${skin.name}`}
                                        className="w-[1215px] h-[717px]"
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
