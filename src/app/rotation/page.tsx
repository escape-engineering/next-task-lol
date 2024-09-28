"use client";

import { Champion } from "@/types/Champion";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";

const RotationPage = () => {
    const { data: rotationObj } = useSuspenseQuery({
        queryKey: ["rotation"],
        queryFn: async () => {
            const rotationRes = await fetch(`${process.env.NEXT_PUBLIC_ROUTE_API_URL}/api/rotation`);
            const { data: rotationData } = await rotationRes.json();
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
        <div>
            <Suspense fallback={<>loading...</>}>
                <section>
                    <h1>챔피언 로테이션</h1>
                    <div className="flex flex-row gap-[10px]">
                        {rotationObj?.freeChamps.map((champ) => {
                            return <div key={champ.key}>{champ.name}</div>;
                        })}
                    </div>
                </section>
                <section>
                    <h1>신규유저를 위한 로테이션</h1>
                    <div className="flex flex-row gap-[10px]">
                        {rotationObj?.freeChampsForNewbs.map((champ) => {
                            return <div key={champ.key}>{champ.name}</div>;
                        })}
                    </div>
                </section>
            </Suspense>
        </div>
    );
};

export default RotationPage;
