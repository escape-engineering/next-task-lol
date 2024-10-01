import SkinCarousel from "@/_components/Carousel";
import { CHAMPION_LOADING_IMG_URL, CHAMPION_SPLASH_IMG_URL, SPELL_IMG_URL } from "@/app/constants/ddragonURL";
import { cleanDescription } from "@/utils/cleanDescription";
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
    return (
        <div className="relative min-h-screen flex flex-col justify-center items-center py-[50px] gap-[30px]">
            {/* 배경 이미지 */}
            <Image
                src={`${CHAMPION_SPLASH_IMG_URL}/${cham.id}_0.jpg`}
                alt={`${cham.name} 배경 이미지`}
                width={1920}
                height={1080}
                className="absolute top-0 left-0 w-full h-full object-cover filter blur-xl z-[-2]"
            />
            {/* 그라디언트 레이어 */}
            <div
                className="absolute z-[-1] w-full h-full inset-0"
                style={{
                    background:
                        "linear-gradient(to right, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.95) 30%, rgba(0, 0, 0, 0.8) 40%, rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0) 100%)",
                }}
            ></div>
            {/* 챔피언 정보 섹션 */}
            <section className="relative z-10 flex flex-row justify-center items-center gap-[100px]">
                <div className="flex flex-col gap-[30px] w-[500px]">
                    <h3 className="font-bold text-[25px]">{cham.name}</h3>
                    <p className="text-[#ecc134] text-[22px]">{cham.title}</p>
                    <p>{cham.lore}</p>
                </div>
                <div>
                    <Image
                        src={`${CHAMPION_LOADING_IMG_URL}/${cham.id}_0.jpg`}
                        alt={`${cham.name} 이미지`}
                        width={300}
                        height={300}
                        className="rounded-[20px]"
                    />
                </div>
            </section>
            {/* 챔피언 스킬 */}
            <section className="flex flex-col justify-center gap-[15px] relative z-10 rounded-3xl px-[10px] py-[20px] bg-[rgba(0,0,0,0.3)]">
                <h3 className="text-[25px]">챔피언 스킬</h3>
                <ul className="flex flex-row gap-[30px] w-[1000px] overflow-auto whitespace-nowrap">
                    {cham.spells.map((spell) => (
                        <li
                            className="flex flex-col justify-start items-center w-[300px]"
                            key={`${spell.id}-${spell.name}`}
                        >
                            <Image
                                src={`${SPELL_IMG_URL}/${spell.id}.png`}
                                alt={`${spell.name}`}
                                width={100}
                                height={100}
                            />
                            <div className="my-[10px] flex flex-col gap-[10px]">
                                <h4 className="font-bold">{`${spell.name} - ${spell.id.slice(-1)}`}</h4>
                                <p className="break-words overflow-hidden whitespace-normal w-[100%]">
                                    {cleanDescription(spell.description)}
                                </p>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
            {/* 스킨 목록 */}
            <section className="w-[500px] bg-[rgba(0,0,0,0.3)]">
                <SkinCarousel championName={championName} skins={cham.skins} />
            </section>
        </div>
    );
};

export default ChampionDetailPage;
