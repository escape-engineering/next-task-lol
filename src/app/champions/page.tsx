import { getChampionList } from "@/utils/serverApi";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ChampionsPage = async () => {
    const championList = await getChampionList();
    return (
        <div className="grid grid-cols-6 gap-[30px] px-[20px] py-[20px]">
            {championList
                .sort((a, b) => (a.name < b.name ? -1 : 1))
                .map((cham) => {
                    return (
                        <Link
                            href={`/champions/${cham.id}`}
                            key={cham.key}
                            className="rounded-[30px] flex flex-col justify-center items-center transition-all  hover:translate-y-[-20px] hover:shadow-xl hover:shadow-[#79797913]"
                        >
                            <Image
                                src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/${cham.id}.png`}
                                alt={`${cham.name}이미지`}
                                width={300}
                                height={300}
                            />
                            <p className="text-white font-bold text-center">{cham.name}</p>
                        </Link>
                    );
                })}
        </div>
    );
};

export default ChampionsPage;
