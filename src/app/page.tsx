import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center gap-[10px]">
            <section className="flex flex-col justify-center items-center py-[20px]">
                <h1 className="text-[40px] text-[#b42b2b] font-bold">리그 오브 레전드 정보 앱</h1>
                <p className="text-[25px]">Riot Games API를 활용하여 챔피언과 아이템 정보를 제공합니다.</p>
            </section>
            <section className="flex flex-row gap-[10px]">
                <Link href={"/champions"} className="flex flex-col gap-[10px]">
                    <img src="/poro.jpg" alt="챔피언목록logo" className="w-[400px] h-[250px]" />
                    <p className="flex justify-center items-center font-bold text-[28px]">챔피언 목록 보기</p>
                </Link>
                <Link href={"/rotation"} className="flex flex-col gap-[10px]">
                    <img src="/poro2.png" alt="로테이션logo" className="w-[400px] h-[250px]" />
                    <p className="flex justify-center items-center font-bold text-[28px]">금주 로테이션 확인</p>
                </Link>
                <Link href={"/items"} className="flex flex-col gap-[10px]">
                    <img src="/zoe.jpg" alt="아이템목록logo" className="w-[400px] h-[250px]" />
                    <p className="flex justify-center items-center font-bold text-[28px]">아이템 목록 보기</p>
                </Link>
            </section>
        </div>
    );
}
