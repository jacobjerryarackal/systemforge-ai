import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const backendResponse = await fetch(
            "http://127.0.0.1:8000/run-systemforge",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            }
        );

        const data = await backendResponse.json();

        return NextResponse.json(
            data,
            { status: backendResponse.status }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                error: "Failed to generate workflow redesign",
            },
            { status: 500 }
        );
    }
}