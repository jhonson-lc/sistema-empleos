import prisma from 'lib/prisma'

export default async function (req:any,res:any) {
  try {
    if(req.method === 'GET') {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
    }
  } catch (e) {
    return res.status(500).send(e);
  }
};

