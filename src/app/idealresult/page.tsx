"use client";

import { CHAMPION_SPLASH_IMG_URL, CHAMPION_THUMB_IMG_URL } from "../constants/ddragonURL";
import Image from "next/image";
import { useIdealQuery } from "@/query/queries";

type Props = {
    searchParams: {
        result?: string;
        name?: string;
    };
};

const IdealResult = ({ searchParams: { result, name } }: Props) => {
    const { data: idealsData } = useIdealQuery();
    const totalResultCount = idealsData?.reduce((acc, cur) => acc + cur.count, 0);
    const mostSelectedChampion = idealsData ? idealsData[0] : null;
    return (
        <div className="flex flex-col justify-center items-center py-[20px]">
            {result && name ? (
                <>
                    <img
                        src={`${CHAMPION_SPLASH_IMG_URL}/${result}_0.jpg`}
                        alt={`배경 이미지`}
                        className="absolute top-[64px] left-0 w-full h-full object-cover filter blur-xl z-[-2]"
                    />
                    <div className="py-[20px] flex flex-col justify-center items-center gap-[20px]">
                        <Image
                            src={`${CHAMPION_SPLASH_IMG_URL}/${result}_0.jpg`}
                            alt={`우승챔피언 이미지`}
                            width={900}
                            height={531}
                            className="rounded-[10px] border-[3px] border-black"
                            priority
                        />
                        <p className="text-[30px] font-bold">{name}</p>
                    </div>
                </>
            ) : (
                <img
                    src={`${CHAMPION_SPLASH_IMG_URL}/${mostSelectedChampion?.name}_0.jpg`}
                    alt={`배경 이미지 대체`}
                    className="absolute top-[64px] left-0 w-full h-full object-cover filter blur-xl z-[-2]"
                />
            )}
            <div className="flex flex-col justify-center items-start gap-[10px] w-[900px]">
                {idealsData?.length
                    ? idealsData?.map((re) => {
                          return (
                              <div
                                  className="flex flex-row gap-[5px] justify-start items-center p-[10px] rounded-[10px] bg-[rgba(180,180,180,0.3)] w-[900px]"
                                  key={`${re.name}-${re.count}`}
                              >
                                  <img className="w-[50px] h-[50px]" src={`${CHAMPION_THUMB_IMG_URL}/${re.name}.png`} />
                                  <div
                                      className="bg-[#153e5a] h-[40px] flex justify-start items-center"
                                      style={{ width: `calc(900px*(${re.count / totalResultCount}))` }}
                                  >
                                      <p className="text-[#d1a83f] font-bold text-[20px] absolute">{`${re.id}(${
                                          re.count
                                      }) ${((re.count / totalResultCount) * 100).toFixed(2)}%`}</p>
                                  </div>
                              </div>
                          );
                      })
                    : null}
            </div>
        </div>
    );
};

export default IdealResult;
