"use client";

import { Ideal } from "@/types/Ideal";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { CHAMPION_SPLASH_IMG_URL } from "../constants/ddragonURL";
import Image from "next/image";

type Props = {
    searchParams: {
        result?: string;
    };
};

type Sorted = {
    name: string;
    id: string;
    count: number;
};

const IdealResult = ({ searchParams: { result } }: Props) => {
    const { data: idealsData } = useSuspenseQuery({
        queryKey: ["ideals"],
        queryFn: async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_ROUTE_API_URL}/api/idealresult`);
            const data: Ideal = await res.json();
            return data.data;
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });

    // const resultCount: { [key: string]: number } = {};
    // idealsData?.forEach((ideal) => {
    //     const data = ideal.result;
    //     resultCount[data] = (resultCount[data] || 0) + 1;
    // });
    // // 객체를 배열로 변환
    // const resultCountArray = Object.entries(resultCount)
    //     .map(([key, value]) => ({ name: key, count: value }))
    //     .sort((a, b) => b.count - a.count);
    const countByResult = idealsData
        .reduce((acc: Sorted[], item) => {
            const existing = acc.find((entry) => entry.name === item.name);

            if (existing) {
                existing.count++;
            } else {
                acc.push({ name: item.name, count: 1, id: item.result });
            }

            return acc;
        }, [])
        .sort((a, b) => b.count - a.count);
    console.log("countByResult :>> ", countByResult);
    const totalResultCount = countByResult?.reduce((acc, cur) => acc + cur.count, 0);
    const mostSelectedChampion = idealsData?.find((el) => el.result == countByResult[0].name);
    const selectedChampionName = idealsData.filter((ideal) => ideal.name == result)[0].result;
    // console.log("idealsData :>> ", idealsData);
    // console.log("resultCountArray :>> ", resultCountArray);
    return (
        <div className="flex flex-col justify-center items-center">
            {result ? (
                <>
                    <img
                        src={`${CHAMPION_SPLASH_IMG_URL}/${result}_0.jpg`}
                        alt={`배경 이미지`}
                        className="absolute top-[64px] left-0 w-full h-full object-cover filter blur-xl z-[-2]"
                    />
                    <div className="py-[20px] flex flex-col justify-center items-center gap-[20px]">
                        <Image
                            src={`${CHAMPION_SPLASH_IMG_URL}/${result}_0.jpg`}
                            alt={`배경 이미지`}
                            width={900}
                            height={531}
                            className="rounded-[10px] border-[3px] border-black"
                        />
                        <p className="text-[30px] font-bold">{selectedChampionName}</p>
                    </div>
                </>
            ) : (
                <img
                    src={`${CHAMPION_SPLASH_IMG_URL}/${mostSelectedChampion?.name}_0.jpg`}
                    alt={`배경 이미지`}
                    className="absolute top-[64px] left-0 w-full h-full object-cover filter blur-xl z-[-2]"
                />
            )}
            <Suspense fallback={<>loading...</>}>
                <p>totalResultCount - {totalResultCount}</p>
                <div className="flex flex-col justify-center items-start gap-[10px] w-[900px]">
                    {countByResult.map((re) => {
                        return (
                            <div
                                className="flex flex-row gap-[5px] justify-start items-center p-[10px] rounded-[10px] bg-[rgba(180,180,180,0.3)] w-[900px]"
                                key={`${re.name}-${re.count}`}
                            >
                                <img
                                    className="w-[50px] h-[50px]"
                                    src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/${re.name}.png`}
                                />
                                <div
                                    className="bg-[#153e5a] h-[40px] flex justify-start items-center"
                                    style={{ width: `calc(1000px*(${re.count / totalResultCount}))` }}
                                >
                                    <p className="text-[#d1a83f] font-bold text-[20px] absolute">{`${re.id}(${re.count})`}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Suspense>
        </div>
    );
};

export default IdealResult;
