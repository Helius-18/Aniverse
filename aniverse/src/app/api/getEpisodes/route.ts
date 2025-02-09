import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("query");

  // Check if the 'query' parameter is provided
  if (!query) {
    return NextResponse.json({ error: "Query parameter is required" }, { status: 400 });
  }

  try {
    // Use fetch with async/await
    const response = await fetch(`https://api-anime-rouge.vercel.app/aniwatch/episodes/${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Check if the response is ok (status code 200-299)
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    // Parse the JSON response
    const searchResults = await response.json();

    // Return the search results as JSON
    return NextResponse.json(searchResults, { status: 200 });
  } catch (error) {
    // Handle any errors that occur during the fetch or response parsing
    return NextResponse.json({ error: `Failed to fetch anime data: ${error}` }, { status: 500 });
  }
}
