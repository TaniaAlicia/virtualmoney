// app/api/user/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

type Ctx = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, { params }: Ctx) {
  const { id } = await params; // ⬅️ clave: await

  try {
    const res = await fetch(`${API_URL}/users/${id}`, {
      headers: {
        Authorization: req.headers.get("Authorization") ?? "",
      },
      // Opcional: evita cache en build/edge
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json({ error: data?.error ?? "Error" }, { status: res.status });
    }

    return NextResponse.json(data);
  } catch {
  return NextResponse.json({ error: "Fallo de red con el API" }, { status: 502 });
}
}


