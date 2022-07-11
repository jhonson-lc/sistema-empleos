import prisma from 'lib/prisma'

export default async function readEmployee(req:any,res:any) {
  try {
    const {email} = req.body;
    const client = await prisma.employee.findUnique({
        where: {
            email,
        }
    });
    return res.status(200).json(client);
  } catch (e) {
    return res.status(500).send(e);
  }
};