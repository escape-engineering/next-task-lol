import { ItemDetail } from "@/types/Item";

// Record<string, ItemDetail["data"][string]>;
interface ItemsObj {
    [key: string]: ItemDetail["data"][string];
}

const filterItemList = (items: ItemDetail) => {
    return Object.entries(items.data)
        .filter(([_, value]) => value.maps["11"] && value.gold.purchasable && (value.inStore ? value.inStore : true))
        .reduce((acc: Record<string, ItemDetail["data"][string]>, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {} as ItemsObj);
};

const convertFilteredObjToArray = (items: ItemDetail) => {
    const filteredObj = filterItemList(items);
    return Object.entries(filteredObj).map(([key, value]) => {
        return {
            id: key,
            name: value.name,
            description: value.description,
            plaintext: value.plaintext,
            into: value.into,
            image: value.image,
            gold: value.gold,
            tags: value.tags,
        };
    });
};

const convertFilteredObjToTargetItem = (items: ItemDetail, itemId: string) => {
    const filteredObj = filterItemList(items);
    return {
        ...filteredObj[itemId],
        into: filteredObj[itemId].into?.filter((el) => Object.keys(filteredObj).some((key) => key == el)),
        from: filteredObj[itemId].from?.filter((el) => Object.keys(filteredObj).some((key) => key == el)),
    };
};

export { convertFilteredObjToArray, convertFilteredObjToTargetItem };
