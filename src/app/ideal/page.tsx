"use client";

import { Champion } from "@/types/Champion";
import { generateRandomNickname } from "@/utils/generateRandomNickname";
import { getChampionList } from "@/utils/serverApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { CHAMPION_LOADING_IMG_URL } from "../constants/ddragonURL";

const IdealPage = () => {
    const router = useRouter();
    const [champions, setChampions] = useState<Champion[]>([]);
    const [displays, setDisplays] = useState<Champion[]>([]);
    const [winners, setWinners] = useState<Champion[]>([]);
    const [rounds, setRounds] = useState(32);

    useEffect(() => {
        const getList = async () => {
            const res = await getChampionList();
            const randomlySorted = res.sort(() => Math.random() - 0.5).slice(0, 32);
            setChampions(randomlySorted);
            setDisplays([randomlySorted[0], randomlySorted[1]]);
        };
        getList();
    }, []);

    const selectChampion = async (champ: Champion): Promise<void> => {
        //NOTE 해당 라운드의 마지막 선택
        if (champions.length <= 2) {
            //NOTE 결승전이라면
            if (winners.length === 0) {
                const randomNickname = generateRandomNickname();
                setDisplays([champ]);
                await fetch(`${process.env.NEXT_PUBLIC_RESULT_URL}`, {
                    method: "POST",
                    body: JSON.stringify({
                        nickname: randomNickname,
                        result: champ.name,
                        name: champ.id,
                    }),
                });
                setTimeout(() => {
                    router.push(`/idealresult?result=${champ.id}`);
                }, 3000);
            } //NOTE 결승전이 아닌 4, 8, 16 ... 각 강의 마지막 선택일때
            else {
                const updatedChampions = [...winners, champ];
                setChampions(updatedChampions);
                setDisplays([updatedChampions[0], updatedChampions[1]]);
                setWinners([]);
                setRounds(rounds / 2);
            }
            // NOTE 일반적인 중간 선택일때
        } else if (champions.length > 2) {
            setWinners([...winners, champ]);
            setDisplays([champions[2], champions[3]]);
            setChampions(champions.slice(2));
        }
    };

    return (
        <div className="flex flex-col justify-center items-center py-[50px] gap-[30px]">
            <p className="flex flex-row font-bold text-[30px] gap-[5px]">
                <span>{rounds == 2 ? "결승전" : `${rounds}강`}</span>
                {rounds == 2 ? <></> : <span>({`${winners.length}/${rounds / 2}`})</span>}
            </p>
            <div className="flex flex-row justify-center items-center gap-[80px]">
                {displays?.map((item, idx) => {
                    return (
                        <>
                            <div
                                className="cursor-pointer rounded-[20px] py-[20px] flex flex-col items-center gap-[20px] text-[30px] font-bold hover:translate-y-[-20px] hover:shadow-xl hover:shadow-[#79797913]"
                                onClick={() => selectChampion(item)}
                                key={item.id}
                            >
                                <img
                                    src={`${CHAMPION_LOADING_IMG_URL}/${item.id}_0.jpg`}
                                    alt={`${idx + 1}번 이미지`}
                                    className="w-[308px] h-[560px]"
                                />
                                {item.name}
                            </div>
                            {idx == 0 ? <p>VS</p> : <></>}
                        </>
                    );
                })}
            </div>
        </div>
    );
};

export default IdealPage;
