import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function (req:any, res:any) {
  try {
    const {date,user,email,firstName,lastName,password,phone} = req.body;

    const profile = await prisma.client.create({
      data: {
        firstname: firstName,
        lastname: lastName,
        email,
        phone,
        password,
        date,
        user: { connect: {email: user.email}}
      },
    })
    return res.status(200).json(profile);

  } catch (e) {
    return res.status(500).json(e);
  }
};