import prisma from "lib/prisma";

export default async function (req, res) {
  try {
    const data = req.body.data.values;
    const session = req.body.data.session;

    const profile = await prisma.employee.create({
      data: {
        firstname: data.firstName,
        lastname: data.lastName,
        identification: data.cedula,
        email: session.user.email,
        phone: data.phone,
        city: data.ciudad,
        date: data.date,
        user: { connect: { email: session.user.email } },
        references: {
          create: [
            {
              firstname: data.firstNameRe,
              lastname: data.lastNameRe,
              phonenumber: data.phoneRe,
            },
          ],
        },
        studies: {
          create: [
            {
              level: data.nivelE,
              school: data.insti,
              academic: data.titleO,
            },
          ],
        },
        skills: {
          create: [
            {
              description: data.habilidad,
            },
          ],
        },
        workexperience: {
          create: [
            {
              company: data.nameEx,
              position: data.cargo,
              startDate: data.startDate,
              endDate: data.endDate,
              phone: data.phoneEx,
            },
          ],
        },
      },
    });
    return res.status(200).json(profile);
  } catch (e) {
    return res.status(500).json(e);
  }
}
