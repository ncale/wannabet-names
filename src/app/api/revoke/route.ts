import { nameStoneService } from "@/lib/namestone";
import { subnameSchema } from "@/lib/types/subname";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log("Received POST request at /api/revoke");

    // Get "name" search param
    const name = req.nextUrl.searchParams.get("name");

    // Parse - throw if parsing fails
    const parsed = subnameSchema.parse(name);

    // Run service - throw if fails
    await nameStoneService.revokeName(parsed);

    // Revalidate cache
    revalidatePath(`/name/${parsed}`);

    return NextResponse.json({ message: "Success", data: parsed }, { status: 200 });
  } catch (error) {
    // Catch generic error
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    // Catch all
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
