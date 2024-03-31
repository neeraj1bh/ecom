import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

type RequestBody = {
  email: string;
  pin: string;
  name: string;
  password: string;
};

type ResponseData = {
  message: string;
};

export default async function handleOTPVerification(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { email, pin, name, password }: RequestBody = JSON.parse(req.body);
    const existingUser = await prisma.pin.findUnique({
      where: { email, pin },
    });

    if (existingUser) {
      console.log("OTP verified for user:", existingUser.email);

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });

      return res.status(200).json({ message: "OTP verification successful" });
    } else {
      console.log("Invalid OTP for email:", email);
      return res.status(400).json({ message: "Invalid OTP" });
    }
  } catch (error) {
    console.error("Failed to verify OTP:", error);
    return res.status(500).json({ message: "Failed to verify OTP" });
  }
}
