import { getIdealResults } from "@/utils/serverApi";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query.keys";
import { sortIdealResults } from "@/services/idealServices";
import { Champion } from "@/types/Champion";
import { splitRotationArray } from "@/services/rotationServices";

const useRotationQuery = () => {
    const gethRotationData = async () => {
        try {
            const rotationRes = await fetch(`${process.env.NEXT_PUBLIC_ROUTE_API_URL}/api/rotation`);
            if (!rotationRes.ok) {
                throw new Error(`Rotation API error: ${rotationRes.status} ${rotationRes.statusText}`);
            }
            const { data: rotationData } = await rotationRes.json();
            const championsRes = await fetch(
                `${process.env.NEXT_PUBLIC_DDRAGON_URL}/cdn/14.19.1/data/ko_KR/champion.json`
            );
            if (!championsRes.ok) {
                throw new Error(`Rotation API error: ${championsRes.status} ${championsRes.statusText}`);
            }
            const { data: championsData }: { data: Champion[] } = await championsRes.json();
            const { freeChamps, freeChampsForNewbs } = splitRotationArray(rotationData, championsData);
            return { freeChamps, freeChampsForNewbs };
        } catch (error) {
            console.log("error fetching roatationData from api/roattion :>> ", error);
            throw error;
            // new Error("failed to fetch rotation data");
        }
    };
    return useQuery({
        queryKey: queryKeys.boardController.rotation(),
        queryFn: () => gethRotationData(),
    });
};

const useIdealQuery = () => {
    const getSortedResult = async () => {
        const idealResult = await getIdealResults();
        const sortedResult = sortIdealResults(idealResult);
        return sortedResult;
    };
    return useQuery({
        queryKey: queryKeys.boardController.ideals(),
        queryFn: () => getSortedResult(),
        staleTime: 1,
    });
};

export { useRotationQuery, useIdealQuery };
