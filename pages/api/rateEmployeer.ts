import prisma from 'lib/prisma'

export default async function(req,res:any) {
  try {
    const {id,obs} = req.body.data;
    const {sliderValue} = req.body;
    if(req.method === 'POST') {
        const addUser = await prisma.jobs.update({
            where: {
                id
            },
            data: {
              state: 'finalizado',
              valoration: sliderValue,
              description: obs
            }
        });
          return res.status(200).json(addUser);
        }
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
};