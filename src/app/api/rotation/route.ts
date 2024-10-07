import { ChampionRotation } from "@/types/ChampionRotation";

export async function GET() {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_RIOT_ROTATION_URL}?api_key=${process.env.NEXT_PUBLIC_RIOT_API_KEY}`,
            {
                next: {
                    revalidate: 60 * 60 * 24,
                    tags: ["rotation"],
                },
            }
        );

        if (!res.ok) {
            console.log(1);
            throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        const data: ChampionRotation[] = await res.json();
        return Response.json({ data });
    } catch (error) {
        console.log("failed to Fetch Rotation Data :>> ", error);
        return new Response(
            JSON.stringify({
                message: "failed to Fetch Rotation Data",
                error: error instanceof Error ? error.message : "unknown error",
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
