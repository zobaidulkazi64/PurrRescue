import { Request, Response, NextFunction } from "express";
import prisma from "@/utils/prisma";
import { emailCreateSchema } from "@/utils/schemas";
import { defaultSender, transporter } from "@/config";

const sendEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // validate input the req body
    const parsedBody = emailCreateSchema.safeParse(req.body);

    if (!parsedBody.success) {
      return res.status(400).json(parsedBody.error.errors);
    }

    // create a new email option
    const { sender, recipient, subject, body, source } = parsedBody.data;
    const from = sender || defaultSender;

    const emailOptions = {
      from,
      to: recipient,
      subject,
      text: body,
    };

    // send email

    const { rejected } = await transporter.sendMail(emailOptions);
    if (rejected.length) {
      console.log("Email not sent", rejected);
      return res.status(500).json({
        message: "Email not sent",
        rejected,
      });
    }

    await prisma.email.create({
      data: {
        sender,
        recipient,
        subject,
        body,
        source,
      },
    });

    // return success

    return res.status(200).json({
      message: "Email sent",
    });
  } catch (error) {
    next(error);
  }
};

export default sendEmail;
