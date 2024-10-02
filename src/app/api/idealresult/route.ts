import { Ideal } from "@/types/Ideal";

export async function GET() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_RESULT_URL}`, { cache: "no-store" });
    const data: Ideal = await res.json();
    return Response.json({ data });
}
