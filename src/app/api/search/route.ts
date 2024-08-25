import { nameStoneService } from "@/lib/namestone";
import { subnameSchema } from "@/lib/types/subname";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(req: NextRequest) {
  try {
    console.log("Received GET request at /api/search");

    // Get "q" search param
    const query = req.nextUrl.searchParams.get("q");

    // Parse - throw if parsing fails
    const parsed = subnameSchema.parse(query);

    // Run service - return null if service fails
    let namestoneRes;
    try {
      namestoneRes = await nameStoneService.searchName(parsed);
    } catch (error) {
      namestoneRes = null;
    }

    return NextResponse.json({ message: "Success", data: namestoneRes }, { status: 200 });
  } catch (error) {
    // Catch zod error
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: error.errors,
        },
        { status: 400 },
      );
    }
    // Catch generic error
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    // Catch all
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
