import prisma from 'lib/prisma'

export default async function(req,res:any) {
  try {
    if(req.method === 'POST') {
        const e = await prisma.employee.findUnique({
            where: {
                email: req.body.user.email
            }
        });
      const c = await prisma.client.findMany();
      const jb = await prisma.jobs.findMany();
      const jobs = jb.map(job => {
        if(e.employeeId === job.workerId) {
            const em = c.filter(client => client.id === job.clientId);
            return {
                ...job,
                client: {
                    ...em[0],
                }
            }
        }
        return null;
        }
    )
      return res.status(200).json(jobs);
    }
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
};