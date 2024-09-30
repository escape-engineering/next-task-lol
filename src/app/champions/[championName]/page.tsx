import { getChampionDetail } from "@/utils/serverApi";
import Image from "next/image";
import React from "react";

type Props = {
    params: {
        championName: string;
    };
};

export const generateMetadata = async ({ params: { championName } }: Props) => {
    return {
        title: `LIP - ${championName}`,
        description: `League of Legends Information Page - ${championName} 상세 페이지입니다.`,
    };
};

const ChampionDetailPage = async ({ params: { championName } }: Props) => {
    const cham = await getChampionDetail(championName);
    console.log("data :>> ", cham);
    return (
        <div>
            <section>
                <p>
                    챔피언 명 <span>{cham.name}</span>
                </p>
                <div>
                    <p>챔피언 초상화</p>
                    <Image
                        src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/${cham.id}.png`}
                        alt={`${cham.name}이미지`}
                        width={300}
                        height={300}
                    />
                    <p>
                        챔피언 소개 : <span>{cham.lore}</span>
                    </p>
                </div>
            </section>
            <section>
                <p>챔피언 스킬</p>
                <ul className="flex flex-row gap-[30px] w-[1000px] overflow-auto whitespace-nowrap">
                    {cham.spells.map((spell) => {
                        return (
                            <li key={`${spell.id}-${spell.name}`}>
                                <Image
                                    src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/spell/${spell.id}.png`}
                                    alt={`${spell.name}`}
                                    width={100}
                                    height={100}
                                />
                                <div>
                                    <p>{spell.name}</p>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </section>
            <section>
                <p>스킨 목록</p>
                <ul className="flex flex-row gap-[30px] w-[1000px] overflow-auto whitespace-nowrap">
                    {cham.skins.map((skin) => {
                        return (
                            <li className="w-[1000px]" key={`${skin.id}-${skin.num}`}>
                                <p>스킨명 - {skin.name}</p>
                                <Image
                                    src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_${skin.num}.jpg`}
                                    alt={`${skin.name}`}
                                    width={300}
                                    height={300}
                                />
                            </li>
                        );
                    })}
                </ul>
            </section>
        </div>
    );
};

export default ChampionDetailPage;
