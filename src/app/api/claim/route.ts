import { nameStoneService } from "@/lib/namestone";
import { apiClaimBodySchema } from "@/lib/types/api-claim-body";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { verifyMessage } from "viem";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    console.log("Received POST request at /api/claim");

    // Get body from request
    const body = await req.json();

    // Parse - throw if parsing fails
    const parsed = apiClaimBodySchema.parse(body);

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

    // Check if user already has a name - return if true
    const existingName = await nameStoneService.getName(parsed.address);
    if (existingName) {
      return NextResponse.json({ error: "Address has already claimed name" }, { status: 403 });
    }

    // Check for conflict - return if true
    const nameTaken = await nameStoneService.isNameTaken(parsed.name);
    if (nameTaken) {
      return NextResponse.json({ error: "Name is taken" }, { status: 409 });
    }

    // Run service - throw if setting fails
    const namestoneRes = await nameStoneService.setName(parsed.name, parsed.address);

    // Revalidate cache
    revalidatePath(`/name/${parsed.name}`);

    return NextResponse.json({ message: "Success", data: namestoneRes }, { status: 200 });
  } catch (error) {
    // Catch zod error
    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
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
