import { getItemsList } from "@/utils/serverApi";
import React from "react";

const ItemsPage = async () => {
    const items = await getItemsList();
    return (
        <div>
            {items.map((item) => {
                return (
                    <div key={`${item.name}+${crypto.randomUUID()}`}>
                        <h3>{item.name}</h3>
                    </div>
                );
            })}
        </div>
    );
};

export default ItemsPage;
