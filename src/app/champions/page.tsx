import { getChampionList } from "@/utils/serverApi";
import React from "react";

const ChampionsPage = async () => {
    const championList = await getChampionList();
    return (
        <div>
            {championList.map((cham) => {
                return <div key={cham.key}>{cham.name}</div>;
            })}
        </div>
    );
};

export default ChampionsPage;
