import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { email, password } = await JSON.parse(req.body);

    // Find user by email
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      const hash = user.password;

      console.log(password, hash);
      // Compare hashed password with input password
      bcrypt.compare(password, hash, function (err: any, result: any) {
        if (result === true) {
          // Authentication successful
          console.log("User authenticated:", user.id);
          res.status(200).json({ message: { id: user.id, name: user.name } });
        } else {
          // Password does not match
          console.error("Invalid password for user:", user.id);
          return res.status(400).send({ message: "Invalid password" });
        }
      });
    } else {
      // User not found
      console.error("User not found for email:", email);
      return res.status(400).send({ message: "User not found" });
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error("Error authenticating user:", error);
    return res.status(500).send({ message: "Internal server error" });
  }
}
