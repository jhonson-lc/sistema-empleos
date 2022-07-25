import prisma from 'lib/prisma'

export default async function(req,res:any) {
  try {
    if(req.method === 'POST') {
        const addUser = await prisma.jobs.update({
            where: {
                id: req.body.id
            },
            data: {
              state: 'pendiente'
            }
        });
          return res.status(200).json(addUser);
        }
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
};