import prisma from "lib/prisma";

export default async function (req, res: any) {
  try {
    const { id, ref } = req.body;
    if (req.method === "POST") {
      if (ref === "experience") {
        const deleteRef = await prisma.workExperience.delete({
          where: {
            id,
          },
        });
        return res.status(200).json(deleteRef);
      }
      if(ref==='skills'){
        const deleteRef = await prisma.skills.delete({
            where: {
              id,
            },
          });
          return res.status(200).json(deleteRef);
      }
      if(ref==='studies'){
        const deleteRef = await prisma.studies.delete({
            where: {
              id,
            },
          });
          return res.status(200).json(deleteRef);
      }
      if(ref==='references'){
        const deleteRef = await prisma.references.delete({
            where: {
              id,
            },
          });
          return res.status(200).json(deleteRef);
      }
    }
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
