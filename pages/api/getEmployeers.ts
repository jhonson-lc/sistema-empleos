import prisma from 'lib/prisma'

export default async function(req,res:any) {
  try {
    if(req.method === 'GET') {
      const e = await prisma.employee.findMany();
      const xp = await prisma.workExperience.findMany();
      const jb = await prisma.jobs.findMany();

      const employeers = e.map(employeer => {
        const xpp = xp.filter(exp => exp.workerId === employeer.employeeId);
        const jbb = jb.filter(job => job.workerId === employeer.employeeId);
        return {
          ...employeer,
          experience: xpp,
          job: jbb
        }
      }
      );
      return res.status(200).json(employeers);
    }
  } catch (e) {
    return res.status(500).json({ error: e.message })
  }
};