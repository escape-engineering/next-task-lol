"use client";

import { Champion } from "@/types/Champion";
import { generateRandomNumber } from "@/utils/generateRandomNumber";
import Image from "next/image";
import randomSelect from "@/public/randomSelect.png";
import { useRouter } from "next/navigation";

type Props = {
    championList: Champion[];
};

const Random = ({ championList }: Props) => {
    const router = useRouter();
    return (
        <button
            onClick={() => {
                const randomChamp = Object.values(championList)[generateRandomNumber()].id;
                router.push(`/champions/${randomChamp}`);
            }}
            className="rounded-[30px] flex flex-col justify-center items-center transition-all  hover:translate-y-[-20px] hover:shadow-xl hover:shadow-[#79797913]"
        >
            <Image src={randomSelect} alt={`무작위 선택이미지`} width={300} height={300} />
            <p className="text-white font-bold text-center">무작위</p>
        </button>
    );
};

export default Random;
