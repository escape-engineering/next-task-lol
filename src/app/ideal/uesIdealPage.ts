"use client";

import { convertDataObjToArray } from "@/services/championServices";
import { Champion } from "@/types/Champion";
import { generateRandomNickname } from "@/utils/generateRandomNickname";
import { getChampionList } from "@/utils/serverApi";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useIdealPage = () => {
    const router = useRouter();
    const [champions, setChampions] = useState<Champion[]>([]);
    const [displays, setDisplays] = useState<Champion[]>([]);
    const [winners, setWinners] = useState<Champion[]>([]);
    const [rounds, setRounds] = useState(32);

    const getList = async () => {
        const res = await getChampionList();
        const data = convertDataObjToArray(res);
        const randomlySorted = data.sort(() => Math.random() - 0.5).slice(0, 32);
        setChampions(randomlySorted);
        setDisplays([randomlySorted[0], randomlySorted[1]]);
    };

    const isEndofSelect = champions.length === 2 && winners.length === 0 && displays.length === 1;

    const selectChampion = async (champ: Champion): Promise<void> => {
        //NOTE 최종 선택 후 클릭시 작동하지 않도록 early return
        if (isEndofSelect) return;
        //NOTE 해당 라운드의 마지막 선택
        if (champions.length <= 2) {
            //NOTE 결승전이라면
            if (winners.length === 0) {
                const randomNickname = generateRandomNickname();
                setDisplays([champ]);
                await fetch(`${process.env.NEXT_PUBLIC_ROUTE_API_URL}/api/ideal`, {
                    method: "POST",
                    body: JSON.stringify({
                        nickname: randomNickname,
                        result: champ.name,
                        name: champ.id,
                    }),
                });
                setTimeout(() => {
                    router.push(`/idealresult?result=${champ.id}&name=${champ.name}`);
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
    return { rounds, winners, displays, selectChampion, getList, isEndofSelect };
};

export default useIdealPage;
