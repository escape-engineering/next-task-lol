import { Ideal } from "@/types/Ideal";

export async function GET() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_RESULT_URL}`, { cache: "no-store" });

        if (!res.ok) {
            throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        console.log("res.ok :>> ", res.ok);

        const data: Ideal = await res.json();
        return Response.json({ data });
    } catch (error) {
        console.log("failed to Fetch Ideal Data :>> ", error);
        return new Response(
            JSON.stringify({
                message: "failed to Fetch Ideal Data",
                error: error instanceof Error ? error.message : "unknown error",
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
