import { nameStoneService } from "@/lib/namestone";
import { apiBodySchema } from "@/lib/types/subname-api-body";
import type { NextApiRequest, NextApiResponse } from "next";
import { verifyMessage } from "viem";
import { ZodError } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      console.log("received request", req.body);

      // parse request body
      const parsed = apiBodySchema.parse(req.body);

      // verify signature
      const valid = await verifyMessage({
        address: parsed.address,
        message: parsed.message,
        signature: parsed.signature,
      });
      if (!valid) res.status(400).json({ error: "Invalid Signature" });

      // check if username is taken
      const nameTaken = await nameStoneService.isNameTaken(parsed.name);
      if (nameTaken) res.status(409).json({ error: "Name is taken" });

      // check if user already has a name
      const existingName = await nameStoneService.getName(parsed.address);
      if (existingName) {
        await nameStoneService.revokeName(existingName.name);
      }

      // send to namestone
      const namestoneRes = await nameStoneService.setName(
        parsed.name,
        parsed.address
      );

      res.status(200).send({ message: "success", data: namestoneRes });
    } catch (error) {
      if (error instanceof ZodError) {
        res
          .status(400)
          .json({ error: "Validation failed", details: error.errors });
      }
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
      res.status(500).json({ error: "unknown error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
