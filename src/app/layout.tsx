import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

const geistSans = localFont({
    src: "./fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
});
const geistMono = localFont({
    src: "./fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
});

export const metadata: Metadata = {
    title: "league of legends",
    description: "Riot Gamse API를 사용하여 리그오브레전드 정보를 제공해주는 페이지입니다.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <header>
                    <nav className="bg-[#2c2c2c] text-white font-bold flex flex-row justify-between py-[10px] px-[100px]">
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
                    </nav>
                </header>
                {children}
            </body>
        </html>
    );
}
