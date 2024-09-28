import { ChampionDetail, ChampionList } from "@/types/Champion";
import { ItemDetail } from "@/types/Item";

const getCurrentVersion = async () => {
    const versionRes = await fetch(`${process.env.NEXT_PUBLIC_DDRAGON_URL}/api/versions.json`);
    const versionData = await versionRes.json();
    const currentVersion = versionData[0];
    return currentVersion;
};

const getChampionList = async () => {
    const currentVersion = await getCurrentVersion();
    const championsRes = await fetch(
        `${process.env.NEXT_PUBLIC_DDRAGON_URL}/cdn/${currentVersion}/data/ko_KR/champion.json`
    );
    const championsData: ChampionList = await championsRes.json();
    const championsList = Object.values(championsData.data);
    return championsList;
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
    const itemList = Object.values(itemData.data).map((item) => {
        return {
            name: item.name,
            description: item.description,
            plaintext: item.plaintext,
            into: item.into,
            image: item.image,
            gold: item.gold,
            tags: item.tags,
        };
    });
    return itemList;
};

export { getChampionList, getCurrentVersion, getChampionDetail, getItemsList };
