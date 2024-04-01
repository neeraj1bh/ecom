import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const fetchedCategories = await prisma.category.findMany();

  if (!fetchedCategories) {
    return res.status(400).send({ message: "Categories not found" });
  }

  res.status(200).json({ res: fetchedCategories });
}
