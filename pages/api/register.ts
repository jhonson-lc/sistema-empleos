import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function (req, res) {
  try {
    const {date,email,firstName,lastName,password,phone} = req.body;
    await prisma.client.create({
      data: {
        firstname: firstName,
        lastname: lastName,
        email,
        phone,
        password,
        date,
      },
    })
  } catch (e) {
    return res.status(500).send(e);
  }
};

