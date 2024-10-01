import { cleanDescription } from "@/utils/cleanDescription";
import { getItemsList } from "@/utils/serverApi";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
    params: {
        itemId: string;
    };
};

const ItemDetail = async ({ params: { itemId } }: Props) => {
    const items = await getItemsList();
    const targetItem = {
        ...items[itemId],
        from: items[itemId].from?.filter((el) => Object.keys(items).some((key) => key == el)),
    };
    return (
        <div>
            <p>{targetItem.name}</p>
            <Image
                src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/item/${itemId}.png`}
                alt={targetItem.name}
                width={100}
                height={100}
            />
            <p>
                <span>{`구매 - ${targetItem.gold.total}`}</span>
                <span>{` / `}</span>
                <span>{`판매 - ${targetItem.gold.sell}`}</span>
            </p>
            <p>{cleanDescription(targetItem.description)}</p>
            <p>{targetItem.plaintext}</p>
            {targetItem?.from?.length ? (
                <div>
                    <p>from -</p>
                    <ul className="flex flex-row gap-[30px] flex-wrap">
                        {targetItem.from.map((el) => (
                            <li key={`el-${el}`}>
                                <Link href={`/items/${el}`}>
                                    <Image
                                        src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/item/${el}.png`}
                                        alt=""
                                        width={100}
                                        height={100}
                                    />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <></>
            )}
            {targetItem.into && (
                <div>
                    <p>into - </p>
                    <ul className="flex flex-row gap-[30px] flex-wrap">
                        {targetItem?.into?.length &&
                            targetItem.into.map((el) => (
                                <li key={`el-${el}`}>
                                    <Link href={`/items/${el}`}>
                                        <Image
                                            src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/item/${el}.png`}
                                            alt=""
                                            width={100}
                                            height={100}
                                        />
                                    </Link>
                                </li>
                            ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ItemDetail;
