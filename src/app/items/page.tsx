import { getItemsList } from "@/utils/serverApi";
import React from "react";

const ItemsPage = async () => {
    const items = await getItemsList();
    console.log("items :>> ", items);
    return (
        <div>
            {items.map((item) => {
                return (
                    <div key={`${item.name}+${item.plaintext}`}>
                        <h3>{item.name}</h3>
                    </div>
                );
            })}
        </div>
    );
};

export default ItemsPage;
