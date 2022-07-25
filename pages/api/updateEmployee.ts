import { parseISO } from 'date-fns';
import prisma from 'lib/prisma';

export default async function (req:any, res:any) {
  try {
    const {values:data,session} = req.body;
    const refC = data.references.filter((ref:any) => ref.id===undefined);
    const refU = data.references.filter((ref:any) => ref.id!==undefined);
    const expC = data.experience.filter((ref:any) => ref.id===undefined);
    const expU = data.experience.filter((ref:any) => ref.id!==undefined);
    const skiC = data.skills.filter((ref:any) => ref.id===undefined);
    const skiU = data.skills.filter((ref:any) => ref.id!==undefined);
    const stuC = data.studies.filter((ref:any) => ref.id===undefined);
    const stuU = data.studies.filter((ref:any) => ref.id!==undefined);
    const profile = await prisma.employee.update({
      where: {
        email: data.email
      },
      data: {
        firstname: data.firstname,
        lastname: data.lastname,
        identification: data.identification,
        email: data.email,
        phone: data.phone,
        city: data.city,
        profession: data.profession,
        date: parseISO(data.date),
        user: { connect: { email: session.user.email } },
        references: {
          update:refU.map((ref:any) => ({
            where: { id: ref.id },
            data: {
              firstname: ref.firstname,
              lastname: ref.lastname,
              phonenumber: ref.phonenumber,
              relation:ref.relation
            }})),
          create:refC
        },
        workexperience: {
          update:expU.map((ref:any) => ({
            where: { id: ref.id },
            data: {
              company: ref.company,
              position: ref.position,
              startDate: parseISO(ref.startDate),
              endDate: parseISO(ref.endDate),
              phone: ref.phone,
            }})),
          create:expC.map((ref:any) => ({
            company: ref.company,
            position: ref.position,
            startDate: parseISO(ref.startDate),
            endDate: parseISO(ref.endDate),
            phone: ref.phone,
          }))
        },
        skills: {
          update:skiU.map((ref:any) => ({
            where: { id: ref.id },
            data: {
              description: ref.description,
            }})),
          create:skiC
        },
        studies: {
          update:stuU.map((ref:any) => ({
            where: { id: ref.id },
            data: {
              level: ref.level,
              school: ref.school,
              academic: ref.academic,
            }})),
          create:stuC
        },
        },
    })
      return res.status(200).json(profile);
  } catch (e) {
    return res.status(500).json(e);
  }
};