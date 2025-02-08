import { NextResponse } from "next/server";
import { ANIME } from "@consumet/extensions";

const zoro = new ANIME.Zoro();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");
  const page = Number.parseInt(searchParams.get("page") || '0');

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
  }

  try {
    const searchResults = await zoro.search(query, page);
    return NextResponse.json(searchResults, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch anime data" }, { status: 500 });
  }
}
