"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Champion } from "@/types/Champion";
import Link from "next/link";
import { CHAMPION_THUMB_IMG_URL } from "@/app/constants/ddragonURL";

type Props = {
    rotationChampLists: Champion[];
};

const RotationCarousel = ({ rotationChampLists }: Props) => {
    return (
        <Carousel
            className="w-full max-w-[1000px] h-[400px] flex justify-center items-center"
            plugins={[
                Autoplay({
                    delay: 3000,
                }),
            ]}
        >
            <CarouselContent>
                {rotationChampLists.map((champ, index) => (
                    <CarouselItem className="basis-1/3" key={`${champ.id}-${index}`}>
                        <div className="p-1">
                            <Card className="bg-transparent border-0">
                                <CardContent className=" flex flex-col aspect-square items-center justify-center p-6 gap-[10px]">
                                    <Link
                                        className="flex flex-col align-center"
                                        href={`/champions/${champ.id}`}
                                        key={champ.key}
                                    >
                                        <img
                                            src={`${CHAMPION_THUMB_IMG_URL}/${champ.id}.png`}
                                            alt={`${champ.name}이미지`}
                                            className="w-[300px] h-[300px]"
                                        />
                                        <p className="text-white flex justify-center">{champ.name}</p>
                                    </Link>
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

export default RotationCarousel;
