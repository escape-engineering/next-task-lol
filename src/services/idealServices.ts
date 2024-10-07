import { IdealData } from "@/types/Ideal";

export interface IdealObj {
    name: string;
    count: number;
    id: string;
}

const sortIdealResults = (data: IdealData[]) => {
    return data
        .reduce((acc: IdealObj[], item) => {
            const existing = acc.find((entry) => entry.name === item.name);
            if (existing) {
                existing.count++;
            } else {
                acc.push({ name: item.name, count: 1, id: item.result });
            }
            return acc;
        }, [])
        .sort((a, b) => b.count - a.count);
};

export { sortIdealResults };
