import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function (req, res) {
  try {
    const client = await prisma.client.findMany();
    return res.json(client);
  } catch (e) {
    return res.status(500).send(e);
  }
};

