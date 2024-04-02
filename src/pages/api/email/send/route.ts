import { PrismaClient } from "@prisma/client";
import nodemailer from "nodemailer";
import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function updatePinOrCreate(email: string, pin: number) {
  try {
    const existingUser = await prisma.pin.findUnique({
      where: { email },
    });

    if (existingUser) {
      if (existingUser.verified) {
        console.log("User already verified.");
        return { success: false, error: "User already verified." };
      } else {
        await prisma.pin.update({
          where: { email },
          data: { pin: pin.toString() },
        });
      }
    } else {
      await prisma.pin.create({
        data: {
          email,
          pin: pin.toString(),
        },
      });
    }
    console.log("User PIN updated successfully.");
    return { success: true };
  } catch (error) {
    console.error("Error updating or creating user:", error);
    return { success: false, error };
  }
}

async function sendEmailWithPin(email: any, pin: number) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    } as nodemailer.TransportOptions);

    const mailOptions = {
      from: `"${process.env.SENDER_NAME}" <${process.env.SENDER_EMAIL}>`,
      to: `${email}`,
      subject: process.env.EMAIL_SUBJECT ?? "Your Verification PIN",
      text: `
          Dear User,

          Here is your verification PIN: ${pin.toString()}

          Please use this PIN to complete your verification process.

          Thank you,
          ${process.env.SENDER_NAME}
        `,
      html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 10px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
            <div style="background-color: #007bff; color: #fff; padding: 20px; border-top-left-radius: 10px; border-top-right-radius: 10px;">
                <h1 style="margin: 0;">Verification PIN</h1>
            </div>
            <div style="padding: 20px;">
                <p>Dear User,</p>
                <p>Here is your verification PIN: <strong>${pin.toString()}</strong></p>
                <p>Please use this PIN to complete your verification process.</p>
            </div>
            <div style="background-color: #f8f9fa; padding: 20px; border-bottom-left-radius: 10px; border-bottom-right-radius: 10px; text-align: center;">
                <p>Thank you,</p>
                <p>${process.env.SENDER_NAME}</p>
            </div>
            </div>
      `,
    };

    await new Promise((resolve, reject) => {
      transporter.sendMail(mailOptions, (error: any, info: unknown) => {
        if (error) {
          console.error("Error sending email:", error);
          reject(error);
        } else {
          console.log("Email sent successfully.");
          resolve(info);
        }
      });
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending mail:", error);
    return { success: false, error };
  }
}

export default async function handleEmailRequest(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    const { name, email, password } = JSON.parse(req.body);
    const pin = Math.floor(10000000 + Math.random() * 90000000);

    const { success: updateSuccess, error: updateError } =
      await updatePinOrCreate(email, pin);

    if (!updateSuccess) {
      return res.status(400).json({ message: updateError });
    }

    const { success: emailSuccess, error: emailError } = await sendEmailWithPin(
      email,
      pin,
    );

    if (!emailSuccess) {
      return res.status(400).json({ message: emailError });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    res.status(200).json({
      message: "Email sent successfully",
    });
  }
}
