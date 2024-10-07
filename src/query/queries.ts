import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query.keys";
import { IdealObj, sortIdealResults } from "@/services/idealServices";
import { Champion } from "@/types/Champion";
import { splitRotationArray } from "@/services/rotationServices";
import { Ideal } from "@/types/Ideal";

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
        }
    };
    return useQuery({
        queryKey: queryKeys.boardController.rotation(),
        queryFn: () => gethRotationData(),
    });
};

const useIdealQuery = () => {
    const getSortedResult = async () => {
        try {
            const idealResult = await fetch(`${process.env.NEXT_PUBLIC_ROUTE_API_URL}/api/idealresult`);
            console.log("idealResult.ok :>> ", idealResult.ok);
            if (!idealResult.ok) {
                throw new Error(`Ideal API error: ${idealResult.status} ${idealResult.statusText}`);
            }
            const idealData: Ideal = await idealResult.json();
            const sortedResult = sortIdealResults(idealData.data);
            return sortedResult;
        } catch (error) {
            console.log("error fetching idealData from api/ideal :>> ", error);
            return error;
        }
    };
    return useQuery({
        queryKey: queryKeys.boardController.ideals(),
        queryFn: () => getSortedResult(),
        staleTime: 1,
    });
};

export { useRotationQuery, useIdealQuery };
