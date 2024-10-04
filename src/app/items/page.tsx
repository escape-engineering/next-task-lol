import { getItemsList } from "@/utils/serverApi";
import Link from "next/link";
import { ITEM_IMG_URL } from "../constants/ddragonURL";
import { convertFilteredObjToArray } from "@/services/itemServices";

const ItemsPage = async () => {
    const items = await getItemsList();
    const filteredItemsArray = convertFilteredObjToArray(items);
    return (
        <ul className="grid grid-cols-8 gap-[30px] px-[20px] py-[20px]">
            {filteredItemsArray.map((item, idx) => {
                return (
                    <li key={`${item.name}+${crypto.randomUUID()}`}>
                        <Link href={`/items/${item.id}`} className="flex flex-col justify-center items-center">
                            <img
                                src={`${ITEM_IMG_URL}/${item.id}.png`}
                                alt={item.name}
                                className="w-[100px] h-[100px]"
                            />
                            <h3 className="flex items-center justify-center">{item.name}</h3>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default ItemsPage;
