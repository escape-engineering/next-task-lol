import { ChampionRotation } from "@/types/ChampionRotation";

export async function GET() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_RIOT_ROTATION_URL}?api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`,
        {
            next: {
                revalidate: 60 * 60 * 24,
                tags: ["rotation"],
            },
        }
    );

    const data: ChampionRotation[] = await res.json();
    return Response.json({ data });
}
