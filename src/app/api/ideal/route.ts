export async function POST(req: Request) {
    try {
        const body = await req.json();
        const res = await fetch(`${process.env.NEXT_PUBLIC_RESULT_URL}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        return Response.json({ data });
    } catch (error) {
        console.log("failed to Post idealresult Data :>> ", error);
        return new Response(
            JSON.stringify({
                message: "failed to Fetch Rotation Data",
                error: error instanceof Error ? error.message : "unknown error",
            }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
