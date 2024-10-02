"use client";

import { Champion } from "@/types/Champion";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import RotationCarousel from "../_components/rotation/RotationCarousel";

const RotationPage = () => {
    const { data: rotationObj } = useSuspenseQuery({
        queryKey: ["rotation"],
        queryFn: async () => {
            const rotationRes = await fetch(`${process.env.NEXT_PUBLIC_ROUTE_API_URL}/api/rotation`);
            const { data: rotationData } = await rotationRes.json();
            console.log("rotationData :>> ", rotationData);
            const championsRes = await fetch(
                `${process.env.NEXT_PUBLIC_DDRAGON_URL}/cdn/14.19.1/data/ko_KR/champion.json`
            );
            const { data: championsData }: { data: Champion[] } = await championsRes.json();

            const freeChamps: Champion[] = [];
            const freeChampsForNewbs: Champion[] = [];
            Object.values(championsData).filter((cham) => {
                if (rotationData.freeChampionIds.some((id: number) => id == Number(cham.key))) {
                    freeChamps.push(cham);
                }
                if (rotationData.freeChampionIdsForNewPlayers.some((id: number) => id == Number(cham.key))) {
                    freeChampsForNewbs.push(cham);
                }
            });

            return { freeChamps, freeChampsForNewbs };
        },
    });
    return (
        <div className="py-[20px]">
            <Suspense fallback={<>loading...</>}>
                <section className="flex flex-col justify-center items-center">
                    <h1>챔피언 로테이션</h1>
                    <div className="flex flex-row gap-[10px]">
                        <RotationCarousel key={1} rotationChampLists={rotationObj.freeChamps} />
                    </div>
                </section>
                <section className="flex flex-col justify-center items-center">
                    <h1>신규유저를 위한 로테이션</h1>
                    <div className="flex flex-row gap-[10px]">
                        <RotationCarousel key={2} rotationChampLists={rotationObj.freeChampsForNewbs} />
                    </div>
                </section>
            </Suspense>
        </div>
    );
};

export default RotationPage;
