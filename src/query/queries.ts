import { gethRotationData, getIdealResults } from "@/utils/serverApi";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "./query.keys";
import { sortIdealResults } from "@/services/idealServices";

const useRotationQuery = () => {
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
