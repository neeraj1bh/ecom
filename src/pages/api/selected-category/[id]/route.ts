import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { userId } = await JSON.parse(req.body);

  const userLikedCategory = await prisma.userLikedCategory.findMany({
    where: {
      userId,
    },
  });

  if (!userLikedCategory) {
    return res.status(400).send({ message: "Categories not found" });
  }
  res.status(200).json({ res: userLikedCategory });
}
