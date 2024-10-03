import { getItemsList } from "@/utils/serverApi";
import Link from "next/link";
import { ITEM_IMG_URL } from "../constants/ddragonURL";

const ItemsPage = async () => {
    const items = await getItemsList();
    const itemKeys = Object.keys(items);
    const itemValues = Object.values(items).map((item) => {
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
    return (
        <ul className="grid grid-cols-8 gap-[30px] px-[20px] py-[20px]">
            {itemValues.map((item, idx) => {
                return (
                    <li key={`${item.name}+${crypto.randomUUID()}`}>
                        <Link href={`/items/${itemKeys[idx]}`} className="flex flex-col justify-center items-center">
                            <img
                                src={`${ITEM_IMG_URL}/${itemKeys[idx]}.png`}
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
