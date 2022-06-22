import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function (req:any, res:any) {
  try {
    const {email} = req.body;
    const r = await prisma.user.findUnique({
      where: {
        email
      }
    });
    if(!r) return res.status(200).json({message: "error"});
    return res.status(200).json({message: "success"});

  } catch (e) {
    return res.status(500).send(e);
  }
};

