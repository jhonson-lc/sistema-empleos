import { parseISO } from "date-fns";
import prisma from "lib/prisma";

export default async function (req, res) {
  try {
    const {data,session} = req.body;
    const profile = await prisma.employee.create({
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
        references: { create: data.references },
        skills: { create: data.skills },
        workexperience: { create: data.experience },
        studies: { create: data.studies },
      }
    });
    return res.status(200).json(profile);
  } catch (e) {
    return res.status(500).json(e);
  }
}
