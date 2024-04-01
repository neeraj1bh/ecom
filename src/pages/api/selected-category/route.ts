import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { userId, likedId } = await JSON.parse(req.body);

    const liked = await prisma.userLikedCategory.create({
      data: {
        userId,
        categoryId: likedId,
      },
    });

    if (!liked) {
      return res.status(400).send({ message: "No categories found" });
    }

    res.status(200).json({ res: liked });
  }

  if (req.method === "DELETE") {
    const { userId, likedId } = await JSON.parse(req.body);
    const deleted = await prisma.userLikedCategory.deleteMany({
      where: {
        userId,
        categoryId: likedId,
      },
    });

    if (!deleted) {
      return res.status(400).send({ message: "No categories found" });
    }
    res.status(200).json({ res: deleted });
  }
}
