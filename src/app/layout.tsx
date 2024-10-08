import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Providers from "@/store/queryProvider";

export const metadata: Metadata = {
    title: "LIP - lol 정보 페이지",
    description: "Riot Gamse API를 사용하여 리그오브레전드 정보를 제공해주는 페이지입니다.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/icon?<generated>" type="image/<generated>" sizes="<generated>" />
            </head>
            <body className={`antialiased bg-black text-white`}>
                <header>
                    <nav className="bg-[#2c2c2c] text-white font-bold flex flex-row justify-between h-54 py-[10px] px-[100px]">
                        <Link
                            href={"/"}
                            className="hover:bg-slate-500 w-[200px] px-[20px] py-[10px] items-center text-center rounded-[14px]"
                        >
                            홈
                        </Link>
                        <Link
                            href={"/champions"}
                            className="hover:bg-slate-500 w-[200px] px-[20px] py-[10px] items-center text-center rounded-[14px]"
                        >
                            챔피언 둘러보기
                        </Link>
                        <Link
                            href={"/items"}
                            className="hover:bg-slate-500 w-[200px] px-[20px] py-[10px] items-center text-center rounded-[14px]"
                        >
                            아이템 둘러보기
                        </Link>
                        <Link
                            href={"/rotation"}
                            className="hover:bg-slate-500 w-[200px] px-[20px] py-[10px] items-center text-center rounded-[14px]"
                        >
                            로테이션 확인하기
                        </Link>
                        <Link
                            href={"/ideal"}
                            className="hover:bg-slate-500 w-[230px] px-[20px] py-[10px] items-center text-center rounded-[14px]"
                        >
                            챔피언 이상형 월드컵
                        </Link>
                    </nav>
                </header>
                <Providers>
                    {children}
                    <ReactQueryDevtools />
                </Providers>
            </body>
        </html>
    );
}
