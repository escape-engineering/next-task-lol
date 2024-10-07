"use server";

import { splitRotationArray } from "@/services/rotationServices";
import { Champion, ChampionDetail, ChampionList } from "@/types/Champion";
import { Ideal } from "@/types/Ideal";
import { ItemDetail } from "@/types/Item";

const getCurrentVersion = async () => {
    const versionRes = await fetch(`${process.env.NEXT_PUBLIC_DDRAGON_URL}/api/versions.json`);
    const versionData: string[] = await versionRes.json();
    const currentVersion = versionData[0];
    return currentVersion;
};

const getChampionList = async () => {
    const currentVersion = await getCurrentVersion();
    const championsRes = await fetch(
        `${process.env.NEXT_PUBLIC_DDRAGON_URL}/cdn/${currentVersion}/data/ko_KR/champion.json`,
        {
            next: {
                revalidate: 86400,
            },
        }
    );
    const championsData: ChampionList = await championsRes.json();
    return championsData;
};

const getChampionDetail = async (championName: string) => {
    const currentVersion = await getCurrentVersion();
    const championRes = await fetch(
        `${process.env.NEXT_PUBLIC_DDRAGON_URL}/cdn/${currentVersion}/data/ko_KR/champion/${championName}.json`
    );
    const championData: ChampionDetail = await championRes.json();
    const championValues = Object.values(championData.data)[0];
    return championValues;
};

const getItemsList = async () => {
    const currentVersion = await getCurrentVersion();
    const itemRes = await fetch(`${process.env.NEXT_PUBLIC_DDRAGON_URL}/cdn/${currentVersion}/data/ko_KR/item.json`);
    const itemData: ItemDetail = await itemRes.json();
    return itemData;
};

export { getChampionList, getCurrentVersion, getChampionDetail, getItemsList };
