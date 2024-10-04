import { IdealData } from "@/types/Ideal";

const sortIdealResults = (data: IdealData[]) => {
    return data
        .reduce((acc: any[], item) => {
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
