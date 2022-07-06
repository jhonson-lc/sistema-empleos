import prisma from 'lib/prisma';

export default async function (req:any, res:any) {
  try {
    const {date,user,email,firstname,lastname,phone} = req.body.data;

    const profile = await prisma.client.create({
      data: {
        firstname,
        lastname,
        email,
        phone,
        date,
        user: { connect: {email: user.email}}
      },
    })
    return res.status(200).json(profile);

  } catch (e) {
    return res.status(500).json(e);
  }
};