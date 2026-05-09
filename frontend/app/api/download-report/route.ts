import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const backendResponse = await fetch(
            "http://127.0.0.1:8000/download-report",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        );

        if (!backendResponse.ok) {
            const errorData =
                await backendResponse.json();

            return NextResponse.json(
                errorData,
                { status: backendResponse.status }
            );
        }

        const blob =
            await backendResponse.blob();

        return new Response(blob, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition":
                    'attachment; filename="SystemForge_Architecture_Report.pdf"',
            },
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                error: "Failed to download report",
            },
            { status: 500 }
        );
    }
}