import { getChampionDetail } from "@/utils/serverApi";
import React from "react";

type Props = {
    params: {
        championName: string;
    };
};

const page = async ({ params: { championName } }: Props) => {
    const data = await getChampionDetail(championName);
    console.log("data :>> ", data);
    return (
        <div>
            <h1>{data.name}</h1>
        </div>
    );
};

export default page;
