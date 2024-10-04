import { ChampionList } from "@/types/Champion";

const convertDataObjToArray = (championObj: ChampionList) => {
    return Object.values(championObj.data);
};

export { convertDataObjToArray };
