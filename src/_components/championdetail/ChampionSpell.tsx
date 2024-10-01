import { SPELL_IMG_URL } from "@/app/constants/ddragonURL";
import { SPELL_ORDER } from "@/app/constants/defaultConstants";
import { Spell } from "@/types/Champion";
import { cleanDescription } from "@/utils/cleanDescription";
import Image from "next/image";
import React from "react";

type Props = {
    spell: Spell;
    idx: number;
};

const ChampionSpell = ({ spell, idx }: Props) => {
    return (
        <li className="flex flex-col justify-start items-center w-[300px]" key={`${spell.id}-${spell.name}`}>
            <Image src={`${SPELL_IMG_URL}/${spell.id}.png`} alt={`${spell.name}`} width={100} height={100} />
            <div className="my-[10px] flex flex-col gap-[10px]">
                <h4 className="font-bold">{`${spell.name} - ${SPELL_ORDER[idx]}`}</h4>
                <p className="break-words overflow-hidden whitespace-normal w-[100%]">
                    {cleanDescription(spell.description)}
                </p>
            </div>
        </li>
    );
};

export default ChampionSpell;
