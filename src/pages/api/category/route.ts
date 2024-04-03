import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { userId, limit = 6, offset = 0 } = await JSON.parse(req.body);

  try {
    const categories = await prisma.category.findMany({
      take: Number(limit),
      skip: Number(offset),
      include: {
        user: {
          where: {
            userId,
          },
        },
      },
    });

    const totalCount = await prisma.category.count();
    const totalPages = Math.ceil(totalCount / Number(limit));

    if (!categories) {
      return res.status(400).send({ message: "Categories not found" });
    }

    const likedCategories = categories
      .filter((category) => category.user.length > 0)
      .map((category) => category.id);

    res.status(200).json({ categories, likedCategories, totalPages });
  } catch (error) {
    console.error("Error fetching data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
