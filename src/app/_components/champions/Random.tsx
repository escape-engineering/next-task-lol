"use client";

import { Champion } from "@/types/Champion";
import { generateRandomNumber } from "@/utils/generateRandomNumber";
import { useRouter } from "next/navigation";

type Props = {
    championList: Champion[];
};

const Random = ({ championList }: Props) => {
    const router = useRouter();
    const moveToRandomChamp = () => {
        const randomChamp = Object.values(championList)[generateRandomNumber()].id;
        router.push(`/champions/${randomChamp}`);
    };
    return (
        <button
            onClick={moveToRandomChamp}
            className="rounded-[30px] flex flex-col justify-center items-center transition-all  hover:translate-y-[-20px] hover:shadow-xl hover:shadow-[#79797913]"
        >
            <img src="/randomSelect.png" alt={`무작위 선택이미지`} className="w-[300px] h-[300px]" />
            <p className="text-white font-bold text-center">무작위</p>
        </button>
    );
};

export default Random;
