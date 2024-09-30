import { getItemsList } from "@/utils/serverApi";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
        <ul className="flex flex-row gap-[30px] flex-wrap">
            {itemValues.map((item, idx) => {
                return (
                    <li key={`${item.name}+${crypto.randomUUID()}`}>
                        <Link href={`/items/${itemKeys[idx]}`}>
                            <Image
                                src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/item/${itemKeys[idx]}.png`}
                                alt={item.name}
                                width={100}
                                height={100}
                            />
                            <h3>{item.name}</h3>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
};

export default ItemsPage;
