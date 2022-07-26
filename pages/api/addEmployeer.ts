import prisma from 'lib/prisma';

export default async function addEmployeer(req:any, res:any) {
  try {
    const {data,session} = req.body

    const existJobs = await prisma.jobs.findMany({
        where: {
            client: { email: session.user.email},
            employee: { email: data.email},
            state:"pendiente"
        }
    })

    if(existJobs.length > 0) {
        return res.status(400).json({
            message: 'Employeer already exists'
        })
    }

    const profile = await prisma.jobs.create({
      data: {
        state: 'pendiente',
        valoration: 0,
        description: "",
        client: { connect: {email: session.user.email}},
        employee: { connect: {email: data.email}},
      },
    })
    return res.status(200).json(profile);

  } catch (e) {
    return res.status(500).json(e);
  }
};