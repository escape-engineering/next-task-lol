import { getChampionList } from "@/utils/serverApi";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ChampionsPage = async () => {
    const championList = await getChampionList();
    return (
        <div className="grid grid-cols-4 gap-[30px] px-[50px] py-[20px]">
            {championList.map((cham) => {
                return (
                    <Link href={`/champions/${cham.id}`} key={cham.key}>
                        <Image
                            src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/${cham.id}.png`}
                            alt={`${cham.name}이미지`}
                            width={300}
                            height={300}
                        />
                        <p>{cham.name}</p>
                    </Link>
                );
            })}
        </div>
    );
};

export default ChampionsPage;
