import { getChampionList } from "@/utils/serverApi";
import Link from "next/link";
import Random from "../_components/champions/Random";
import { convertDataObjToArray } from "@/services/championServices";

const ChampionsPage = async () => {
    const championData = await getChampionList();
    const championList = convertDataObjToArray(championData);
    const sortedList = championList.sort((a, b) => (a.name < b.name ? -1 : 1));
    return (
        <div className="grid grid-cols-5 gap-[30px] px-[20px] py-[20px]">
            <Random championList={championList} />
            {sortedList.map((cham) => {
                return (
                    <Link
                        href={`/champions/${cham.id}`}
                        key={cham.key}
                        className="rounded-[30px] flex flex-col justify-center items-center transition-all  hover:translate-y-[-20px] hover:shadow-xl hover:shadow-[#79797913]"
                    >
                        <img
                            src={`https://ddragon.leagueoflegends.com/cdn/14.19.1/img/champion/${cham.id}.png`}
                            alt={`${cham.name}이미지`}
                            className="w-[300px] h-[300px]"
                        />
                        <p className="text-white font-bold text-center">{cham.name}</p>
                    </Link>
                );
            })}
        </div>
    );
};

export default ChampionsPage;
