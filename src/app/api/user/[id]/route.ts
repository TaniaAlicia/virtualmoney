import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function GET(req: NextRequest, context: any) {
  const { id } = context.params;

  const res = await fetch(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: req.headers.get("Authorization") ?? "",
    },
  });

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json({ error: data.error }, { status: res.status });
  }

  return NextResponse.json(data);
}
