import { convertFilteredObjToTargetItem } from "@/services/itemServices";
import { cleanDescription } from "@/utils/cleanDescription";
import { getItemsList } from "@/utils/serverApi";
import Link from "next/link";

type Props = {
    params: {
        itemId: string;
    };
};

const ItemDetail = async ({ params: { itemId } }: Props) => {
    const items = await getItemsList();
    const targetItem = convertFilteredObjToTargetItem(items, itemId);
    return (
        <div className="flex flex-col gap-[50px] py-[30px]">
            <div className="flex flex-row justify-center items-center gap-[100px]">
                <div className="flex flex-col gap-[10px]">
                    <p className="text-[30px]">{targetItem.name}</p>
                    <p className="text-[23px] text-[#ecc134] max-w-[500px]">{targetItem.plaintext}</p>
                </div>
                <img
                    src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/item/${itemId}.png`}
                    alt={targetItem.name}
                    className="w-[100px] h-[100px]"
                    fetchPriority="high"
                />
            </div>
            <p className="flex flex-row justify-center items-center">{cleanDescription(targetItem.description)}</p>
            <div className="flex flex-col gap-[30px] px-[20px]">
                <p className="text-[25px] text-[#ecc134]">가격</p>
                <p>
                    <span>{`구매 - ${targetItem.gold.total}`}</span>
                    <span>{` / `}</span>
                    <span>{`판매 - ${targetItem.gold.sell}`}</span>
                </p>
            </div>
            {targetItem?.from?.length ? (
                <div className="flex flex-col gap-[30px] px-[20px]">
                    <p className="text-[25px] text-[#ecc134]">하위 아이템</p>
                    <ul className="flex flex-row gap-[30px] flex-wrap">
                        {targetItem.from.map((el) => (
                            <li key={`el-${el}`}>
                                <Link href={`/items/${el}`}>
                                    <img
                                        src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/item/${el}.png`}
                                        alt=""
                                        className="w-[100px] h-[100px]"
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
                <div className="flex flex-col gap-[30px] px-[20px]">
                    <p className="text-[25px] text-[#ecc134]">상위 아이템</p>
                    <ul className="flex flex-row gap-[30px] flex-wrap">
                        {targetItem?.into?.length &&
                            targetItem.into.map((el) => (
                                <li key={`el-${el}`}>
                                    <Link href={`/items/${el}`}>
                                        <img
                                            src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/item/${el}.png`}
                                            alt=""
                                            className="w-[100px] h-[100px]"
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
