"use client";

// import IdealModal from "@/components/IdealModal";
import { Champion } from "@/types/Champion";
import { generateRandomNickname } from "@/utils/generateRandomNickname";
import { getChampionList } from "@/utils/serverApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const IdealPage = () => {
    const router = useRouter();
    const [champions, setChampions] = useState<Champion[]>([]);
    const [displays, setDisplays] = useState<Champion[]>([]);
    const [winners, setWinners] = useState<Champion[]>([]);

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
                    }),
                });
                setTimeout(() => {
                    router.push(`/idealresult`);
                }, 3000);
            } //NOTE 결승전이 아닌 4, 8, 16 ... 각 강의 마지막 선택일때
            else {
                const updatedChampions = [...winners, champ];
                setChampions(updatedChampions);
                setDisplays([updatedChampions[0], updatedChampions[1]]);
                setWinners([]);
            }
            // NOTE 일반적인 중간 선택일때
        } else if (champions.length > 2) {
            setWinners([...winners, champ]);
            setDisplays([champions[2], champions[3]]);
            setChampions(champions.slice(2));
        }
        console.log("displays :>> ", displays);
        console.log("winners :>> ", winners);
        console.log("champions :>> ", champions);
    };

    return (
        <>
            {/* <IdealModal /> */}
            <div>
                {displays?.map((item) => {
                    return (
                        <div onClick={() => selectChampion(item)} key={item.id}>
                            <Image
                                src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/${item.id}.png`}
                                alt={`${item.name}이미지`}
                                width={300}
                                height={300}
                            />
                            {item.name}
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default IdealPage;
