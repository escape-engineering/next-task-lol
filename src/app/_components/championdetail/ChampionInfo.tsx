import { INFO_MATCHER } from "@/app/constants/defaultConstants";

type Props = {
    info: [key: string, value: string];
};

const ChampionInfo = ({ info: [key, value] }: Props) => {
    const matched = INFO_MATCHER[key];
    return (
        <div>
            <li className="flex flex-col justify-end items-center h-[100px]">
                <div className="w-[20px] bg-[#d0e3ff]" style={{ height: `calc(100px*(${value}/10))` }} />
                <p>{matched}</p>
            </li>
        </div>
    );
};

export default ChampionInfo;
