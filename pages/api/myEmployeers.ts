import prisma from 'lib/prisma'

export default async function(req,res:any) {
  try {
    if(req.method === 'POST') {
        const c = await prisma.client.findUnique({
            where: {
                email: req.body.user.email
            }
        });
      const e = await prisma.employee.findMany();
      const jb = await prisma.jobs.findMany();
      const jobs = jb.map(job => {
        if(c.id === job.clientId) {
            const em = e.filter(employeer => employeer.employeeId === job.workerId);
            const jo = jb.filter(job => job.workerId === em[0].employeeId);
            return {
                ...job,
                employeer: {
                    ...em[0],
                    jobs: jo
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