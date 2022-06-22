import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function (req:any,res:any) {
  try {
    const {email} = req.body;
    const client = await prisma.client.findUnique({
      where: {
        email,
      }
    });
    return res.status(200).json(client);
  } catch (e) {
    return res.status(500).send(e);
  }
};

