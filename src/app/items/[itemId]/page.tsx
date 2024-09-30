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
    const cleanDescription = (description: string): string => {
        let isFirstPassive = true; // 첫 passive 확인용

        return description
            .replace(/<br\s*\/?>/g, " ") // <br> 태그를 공백으로 변환
            .replace(/<passive>(.*?)<\/passive>/g, (_, p1) => {
                // 첫 번째 passive 일 경우 passive:로 변환
                const result = isFirstPassive ? `${p1}:` : p1;
                isFirstPassive = false; // 이후는 태그 제거로 변경
                return result;
            })
            .replace(/<[^>]+>/g, "") // 나머지 태그 및 내부 문자열 제거
            .replace(/\s+/g, " ") // 연속 공백을 하나로 합침
            .replace(/,+/g, ",") // 연속 쉼표를 하나로 합침
            .trim(); // 앞뒤 공백 제거함
    };
    const items = await getItemsList();
    const targetItem = items[itemId];
    return (
        <div>
            {JSON.stringify(targetItem)}
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
            {targetItem.from && (
                <div>
                    <p>from -</p>

                    <ul className="flex flex-row gap-[30px] flex-wrap">
                        {targetItem?.from?.length &&
                            targetItem.from.map((el) => (
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
