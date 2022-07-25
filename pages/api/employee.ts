import prisma from 'lib/prisma'

export default async function readEmployee(req:any,res:any) {
  try {
    const {email} = req.body;
    const e = await prisma.employee.findUnique({
        where: {
            email,
        }
    });
    const ref = await prisma.references.findMany();
    const hab = await prisma.skills.findMany();
    const est = await prisma.studies.findMany();
    const exp = await prisma.workExperience.findMany();
    const jb = await prisma.jobs.findMany();
    const emp={
        ...e,
        experience: exp.filter(exp => exp.workerId === e.employeeId),
        studies: est.filter(exp => exp.workerId === e.employeeId),
        skills: hab.filter(exp => exp.workerId === e.employeeId),
        references: ref.filter(exp => exp.workerId === e.employeeId),
        job: jb.filter(job => job.workerId === e.employeeId)
      }
    return res.status(200).json(emp);
  } catch (e) {
    return res.status(500).send(e);
  }
};