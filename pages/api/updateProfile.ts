import prisma from 'lib/prisma';

export default async function (req:any, res:any) {
  try {
    const {session,date,firstname,lastname,phone} = req.body.data;
    const profile = await prisma.client.update({
        where:{
            email:session.user.email
        },
        data: {
        firstname,
        lastname,
        phone,
        date,
        email:session.user.email,
        user: { connect: {email: session.user.email}}
      },
    })
    return res.status(200).json(profile);

  } catch (e) {
    return res.status(500).json(e);
  }
};