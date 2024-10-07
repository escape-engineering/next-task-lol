import { Champion } from "@/types/Champion";
import { ChampionRotation } from "@/types/ChampionRotation";

const splitRotationArray = (rotationData: ChampionRotation, championsData: Champion[]) => {
    const freeChamps: Champion[] = [];
    const freeChampsForNewbs: Champion[] = [];
    Object.values(championsData).filter((cham) => {
        if (rotationData.freeChampionIds.some((id: number) => id == Number(cham.key))) {
            freeChamps.push(cham);
        }
        if (rotationData.freeChampionIdsForNewPlayers.some((id: number) => id == Number(cham.key))) {
            freeChampsForNewbs.push(cham);
        }
    });

    return { freeChamps, freeChampsForNewbs };
};

export { splitRotationArray };
