import { nameStoneService } from "@/lib/namestone";
import { apiUpdateBodySchema } from "@/lib/types/api-update-body";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { verifyMessage } from "viem";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    console.log("Received POST request at /api/update");

    // Get body from request
    const body = await req.json();

    // Parse - throw if parsing fails
    const parsed = apiUpdateBodySchema.parse(body);

    // Verify message is as expected
    // --- TO BE IMPLEMENTED ---

    // Verify signature - return if invalid
    const valid = await verifyMessage({
      address: parsed.address,
      message: parsed.message,
      signature: parsed.signature,
    });
    if (!valid) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // Check to ensure passed name already belongs to them - throw if no user
    // found; return if name does not match
    const nameAccount = await nameStoneService.searchName(parsed.name);
    if (nameAccount.address !== parsed.address) {
      return NextResponse.json(
        { error: "Name does not belong to the given address" },
        { status: 403 }
      );
    }

    // Run service - throw if setting fails
    const namestoneRes = await nameStoneService.setName(
      parsed.name,
      parsed.address,
      { avatar_url: parsed.avatarUrl, bio: parsed.bio }
    );

    // Revalidate cache
    revalidatePath(`/name/${parsed.name}`);

    return NextResponse.json(
      { message: "Success" }, // data: namestoneRes },
      { status: 200 }
    );
  } catch (error) {
    // Catch zod error
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
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
