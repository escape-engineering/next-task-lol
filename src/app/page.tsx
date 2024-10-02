import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col justify-center items-center gap-[50px]">
            <section>
                <h1>리그 오브 레전드 정보 앱</h1>
                <p>Riot Games API를 활용하여 챔피언과 아이템 정보를 제공합니다.</p>
            </section>
            <section className="flex flex-col gap-[10px]">
                <Link href={"/champions"} className="w-[300px] h-[300px]">
                    <img src="/poro.jpg" alt="챔피언목록logo" />
                    <p>챔피언 목록 보기</p>
                </Link>
                <Link href={"/rotation"} className="w-[300px] h-[300px]">
                    <img src="/poro2.png" alt="로테이션logo" />
                    <p>금주 로테이션 확인</p>
                </Link>
                <Link href={"/items"} className="w-[300px] h-[300px]">
                    <img src="/zoe.jpg" alt="아이템목록logo" />
                    <p>아이템 목록 보기</p>
                </Link>
            </section>
        </div>
    );
}
