import { Champion } from "@/types/Champion";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import Link from "next/link";

interface Props {
    refetch: (options?: RefetchOptions) => Promise<
        QueryObserverResult<
            {
                freeChamps: Champion[];
                freeChampsForNewbs: Champion[];
            },
            Error
        >
    >;
}

const RotationErrorPage = ({ refetch }: Props) => {
    return (
        <div className="flex flex-col justify-center items-center py-[20px] gap-[30px]">
            <h1 className="text-[30px] text-[#dbdbdbdd] font-bold">로테이션 데이터에 접근할 수 없습니다.</h1>
            <div className="flex flex-row gap-[30px]">
                <Link href={"/"} className="border-[1px] border-white p-[10px] rounded-[10px]">
                    홈 이동
                </Link>
                <button className="border-[1px] border-white p-[10px] rounded-[10px]" onClick={() => refetch()}>
                    재시도
                </button>
            </div>
        </div>
    );
};

export default RotationErrorPage;
