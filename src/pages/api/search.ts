import { nameStoneService } from "@/lib/namestone";
import { subnameSchema } from "@/lib/types/subname";
import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      console.log("received request at /api/search?q=[name]");
      const { q } = req.query;

      // parse request dynamic path
      const parsed = subnameSchema.parse(q);

      // send to namestone
      const namestoneRes = await nameStoneService.searchName(parsed);

      console.log("namestoneRes", namestoneRes);

      if (!namestoneRes) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      res.status(200).json({ message: "Success", data: namestoneRes });
    } catch (error) {
      if (error instanceof ZodError) {
        res
          .status(400)
          .json({ error: "Validation failed", details: error.errors });
      }
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      }
      res.status(500).json({ error: "Unknown error" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
