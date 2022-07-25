import prisma from 'lib/prisma'

export default async function(req,res:any) {
  try {
    if(req.method === 'GET') {
      const e = await prisma.employee.findMany();
      const ref = await prisma.references.findMany();
      const hab = await prisma.skills.findMany();
      const est = await prisma.studies.findMany();
      const exp = await prisma.workExperience.findMany();
      const jb = await prisma.jobs.findMany();
      const employeers = e.map(employeer => {
        const x = exp.filter(exp => exp.workerId === employeer.employeeId);
        const s = est.filter(exp => exp.workerId === employeer.employeeId);
        const h = hab.filter(exp => exp.workerId === employeer.employeeId);
        const r = ref.filter(exp => exp.workerId === employeer.employeeId);
        const jbb = jb.filter(job => job.workerId === employeer.employeeId);
        return {
          ...employeer,
          experience: x,
          studies: s,
          skills: h,
          references: r,
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