"use client";

import { useEffect } from "react";
import { CHAMPION_LOADING_IMG_URL } from "../constants/ddragonURL";
import useIdealPage from "./uesIdealPage";

const IdealPage = () => {
    const { rounds, winners, displays, selectChampion, getList, isEndofSelect } = useIdealPage();
    useEffect(() => {
        getList();
    }, []);

    return (
        <>
            <div className="flex flex-col justify-center items-center py-[50px] gap-[30px]">
                <p className="flex flex-row font-bold text-[30px] gap-[5px]">
                    <span>{rounds == 2 ? "결승전" : `${rounds}강`}</span>
                    {rounds == 2 ? <></> : <span>({`${winners.length}/${rounds / 2}`})</span>}
                </p>
                <div className="flex flex-row justify-center items-center gap-[80px]">
                    {displays?.map((item, idx) => {
                        return (
                            <div key={item.id} className="flex flex-row gap-[80px] justify-center items-center">
                                <div
                                    className="cursor-pointer rounded-[20px] py-[20px] flex flex-col items-center gap-[20px] text-[30px] font-bold hover:translate-y-[-20px] hover:shadow-xl hover:shadow-[#79797913]"
                                    onClick={() => selectChampion(item)}
                                >
                                    <img
                                        src={`${CHAMPION_LOADING_IMG_URL}/${item.id}_0.jpg`}
                                        alt={`${idx + 1}번 이미지`}
                                        className="w-[308px] h-[560px]"
                                    />
                                    {item.name}
                                </div>
                                {idx == 0 && !isEndofSelect ? <p>VS</p> : <></>}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default IdealPage;
