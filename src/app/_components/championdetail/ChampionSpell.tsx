import { SPELL_IMG_URL } from "@/app/constants/ddragonURL";
import { SPELL_ORDER } from "@/app/constants/defaultConstants";
import { Spell } from "@/types/Champion";
import { cleanDescription } from "@/utils/cleanDescription";

type Props = {
    spell: Spell;
    idx: number;
};

const ChampionSpell = ({ spell, idx }: Props) => {
    const desc = cleanDescription(spell.description);
    return (
        <li className="flex flex-col justify-start items-center w-[300px]" key={`${spell.id}-${spell.name}`}>
            <img src={`${SPELL_IMG_URL}/${spell.id}.png`} alt={`${spell.name}`} className="w-[100px] h-[100px]" />
            <div className="my-[10px] flex flex-col gap-[10px]">
                <h4 className="font-bold">{`${spell.name} - ${SPELL_ORDER[idx]}`}</h4>
                <p className="break-words overflow-hidden whitespace-normal w-[100%]">{desc}</p>
            </div>
        </li>
    );
};

export default ChampionSpell;
