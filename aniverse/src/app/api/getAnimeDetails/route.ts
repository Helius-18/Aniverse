import { NextResponse } from "next/server";
import { ANIME } from "@consumet/extensions";

const zoro = new ANIME.Zoro();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
  }

  try {
    const searchResults = await zoro.fetchAnimeInfo(query);
    return NextResponse.json(searchResults, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch anime details" }, { status: 500 });
  }
}